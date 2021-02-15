(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Verso = factory());
}(this, (function () { 'use strict';

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

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
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
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
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

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
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

  var path = global$1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace])
      : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
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

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$1
  };

  'use strict';
  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$2 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$2
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$3 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$3
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
        defineProperty(NumberWrapper, key, getOwnPropertyDescriptor$1(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global$1, NUMBER, NumberWrapper);
  }

  var es_number_constructor = {

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

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;






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
        descriptor = getOwnPropertyDescriptor$2(target, key);
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

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  'use strict';
  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES = wellKnownSymbol('species');

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
        re.constructor[SPECIES] = function () { return re; };
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

  var aFunction$1 = function (it) {
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
    return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$2 = function (CONVERT_TO_STRING) {
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
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
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
  var min$2 = Math.min;
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
            (e = min$2(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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

  var aFunction$2 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$2(fn);
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

  var aFunction$3 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$1 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$3(path$1[namespace]) || aFunction$3(global$2[namespace])
      : path$1[namespace] && path$1[namespace][method] || global$2[namespace] && global$2[namespace][method];
  };

  var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

  var slice = [].slice;
  var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

  var wrap = function (scheduler) {
    return function (handler, timeout /* , ...arguments */) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? slice.call(arguments, 2) : undefined;
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

  var ceil$1 = Math.ceil;
  var floor$1 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$1 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil$1)(argument);
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

  var isPure$1 = true;

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

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible$1(argument));
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

  var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$1(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid$1 = nativeSymbol$1
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore$1 = shared$1('wks');
  var Symbol$2 = global$2.Symbol;
  var createWellKnownSymbol$1 = useSymbolAsUid$1 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

  var wellKnownSymbol$1 = function (name) {
    if (!has$2(WellKnownSymbolsStore$1, name)) {
      if (nativeSymbol$1 && has$2(Symbol$2, name)) WellKnownSymbolsStore$1[name] = Symbol$2[name];
      else WellKnownSymbolsStore$1[name] = createWellKnownSymbol$1('Symbol.' + name);
    } return WellKnownSymbolsStore$1[name];
  };

  'use strict';







  var ITERATOR = wellKnownSymbol$1('iterator');
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

  var min$3 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$1 = function (argument) {
    return argument > 0 ? min$3(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max$1 = Math.max;
  var min$4 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toInteger$1(index);
    return integer < 0 ? max$1(integer + length, 0) : min$4(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$4 = function (IS_INCLUDES) {
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
    includes: createMethod$4(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$4(false)
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

  var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');
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





  var TO_STRING_TAG$2 = wellKnownSymbol$1('toStringTag');

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

  var iterators = {};

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
  var ITERATOR$1 = wellKnownSymbol$1('iterator');
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

  var ITERATOR$2 = wellKnownSymbol$1('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  'use strict';




  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive$1(key);
    if (propertyKey in object) objectDefineProperty$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
    else object[propertyKey] = value;
  };

  var ITERATOR$3 = wellKnownSymbol$1('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  'use strict';








  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
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

  var ITERATOR$4 = wellKnownSymbol$1('iterator');
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
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
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

  var from = path$1.Array.from;

  var from$1 = from;

  var from$2 = from$1;

  'use strict';



  var slice$1 = [].slice;
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
    var fn = aFunction$2(this);
    var partArgs = slice$1.call(arguments, 1);
    var boundFunction = function bound(/* args... */) {
      var args = partArgs.concat(slice$1.call(arguments));
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

  var entryVirtual = function (CONSTRUCTOR) {
    return path$1[CONSTRUCTOR + 'Prototype'];
  };

  var bind = entryVirtual('Function').bind;

  var FunctionPrototype = Function.prototype;

  var bind_1 = function (it) {
    var own = it.bind;
    return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind : own;
  };

  var bind$1 = bind_1;

  var bind$2 = bind$1;

  var addToUnscopables = function () { /* empty */ };

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

  var TO_STRING_TAG$3 = wellKnownSymbol$1('toStringTag');

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

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw$1(arg) == 'Array';
  };

  var SPECIES$2 = wellKnownSymbol$1('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject$1(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod$5 = function (TYPE) {
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
    forEach: createMethod$5(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$5(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$5(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$5(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$5(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$5(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$5(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$5(7)
  };

  'use strict';


  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
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



  var STRICT_METHOD = arrayMethodIsStrict('forEach');
  var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
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

  var $indexOf = arrayIncludes$1.indexOf;



  var nativeIndexOf = [].indexOf;

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  _export$1({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$1 }, {
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

  var ArrayPrototype$2 = Array.prototype;

  var indexOf_1 = function (it) {
    var own = it.indexOf;
    return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.indexOf) ? indexOf$2 : own;
  };

  var indexOf$3 = indexOf_1;

  var indexOf$4 = indexOf$3;

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

  var SPECIES$3 = wellKnownSymbol$1('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails$1(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$3] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  'use strict';










  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
  var USES_TO_LENGTH$2 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

  var max$2 = Math.max;
  var min$5 = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$2 }, {
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
        actualDeleteCount = min$5(max$2(toInteger$1(deleteCount), 0), len - actualStart);
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

  var splice = entryVirtual('Array').splice;

  var ArrayPrototype$3 = Array.prototype;

  var splice_1 = function (it) {
    var own = it.splice;
    return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.splice) ? splice : own;
  };

  var splice$1 = splice_1;

  var splice$2 = splice$1;

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

  'use strict';












  var IS_CONCAT_SPREADABLE = wellKnownSymbol$1('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
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

  var concat = entryVirtual('Array').concat;

  var ArrayPrototype$4 = Array.prototype;

  var concat_1 = function (it) {
    var own = it.concat;
    return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.concat) ? concat : own;
  };

  var concat$1 = concat_1;

  var concat$2 = concat$1;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      defineProperty$4(obj, key, {
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

  var defineProperty$5 = _defineProperty;

  var Animation = /*#__PURE__*/function () {
    function Animation(el) {
      classCallCheck(this, Animation);

      defineProperty$5(this, "run", 0);

      this.el = el;
    }

    createClass(Animation, [{
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

        var transform = concat$2(_context = concat$2(_context2 = "translateX(".concat(x, ") translateY(")).call(_context2, y, ") scale(")).call(_context, scale, ")");

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
          this.el.style.transition = concat$2(_context3 = "transform ".concat(easing, " ")).call(_context3, duration, "ms");
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

      classCallCheck(this, PageSpread);

      defineProperty$5(this, "visibility", 'gone');

      defineProperty$5(this, "positioned", false);

      defineProperty$5(this, "active", false);

      this.el = el;
      this.options = options;
      this.id = this.options.id;
      this.type = this.options.type;
      this.pageIds = this.options.pageIds;
      this.width = this.options.width;
      this.left = this.options.left;
      this.maxZoomScale = this.options.maxZoomScale;
    }

    createClass(PageSpread, [{
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

        for (var _i = 0, _Array$from = from$2(this.getPageEls()); _i < _Array$from.length; _i++) {
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

  var defineProperty$6 = defineProperty_1;

  var defineProperty$7 = defineProperty$6;

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

  var defineProperties = defineProperties_1;

  var defineProperties$1 = defineProperties;

  var hiddenKeys$3 = enumBugKeys$1.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  var f$8 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal$1(O, hiddenKeys$3);
  };

  var objectGetOwnPropertyNames$1 = {
  	f: f$8
  };

  var f$9 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols$1 = {
  	f: f$9
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames$1.f(anObject$1(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  _export$1({ target: 'Object', stat: true, sham: !descriptors$1 }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject$1(object);
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
      var keys = ownKeys$1(O);
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

  var getOwnPropertyDescriptors = path$1.Object.getOwnPropertyDescriptors;

  var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

  var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

  var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor$1.f;


  var FAILS_ON_PRIMITIVES = fails$1(function () { nativeGetOwnPropertyDescriptor$2(1); });
  var FORCED$1 = !descriptors$1 || FAILS_ON_PRIMITIVES;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  _export$1({ target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors$1 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor$2(toIndexedObject$1(it), key);
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

  var getOwnPropertyDescriptor$5 = getOwnPropertyDescriptor_1;

  var getOwnPropertyDescriptor$6 = getOwnPropertyDescriptor$5;

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

  var f$b = wellKnownSymbol$1;

  var wellKnownSymbolWrapped = {
  	f: f$b
  };

  var defineProperty$8 = objectDefineProperty$1.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path$1.Symbol || (path$1.Symbol = {});
    if (!has$2(Symbol, NAME)) defineProperty$8(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  'use strict';



































  var $forEach$1 = arrayIteration.forEach;

  var HIDDEN = sharedKey$1('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE$2 = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol$1('toPrimitive');
  var setInternalState$2 = internalState$1.set;
  var getInternalState$2 = internalState$1.getterFor(SYMBOL);
  var ObjectPrototype$1 = Object[PROTOTYPE$2];
  var $Symbol = global$2.Symbol;
  var $stringify = getBuiltIn$1('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor$1.f;
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
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$3(ObjectPrototype$1, P);
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
    var descriptor = nativeGetOwnPropertyDescriptor$3(it, key);
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
  if (!nativeSymbol$1) {
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
      return wrap$1(wellKnownSymbol$1(name), name);
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

  _export$1({ global: true, wrap: true, forced: !nativeSymbol$1, sham: !nativeSymbol$1 }, {
    Symbol: $Symbol
  });

  $forEach$1(objectKeys$1(WellKnownSymbolsStore$2), function (name) {
    defineWellKnownSymbol(name);
  });

  _export$1({ target: SYMBOL, stat: true, forced: !nativeSymbol$1 }, {
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
      return objectGetOwnPropertySymbols$1.f(toObject(it));
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

  var getOwnPropertySymbols = path$1.Object.getOwnPropertySymbols;

  var getOwnPropertySymbols$1 = getOwnPropertySymbols;

  var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

  var FAILS_ON_PRIMITIVES$1 = fails$1(function () { objectKeys$1(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  _export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return objectKeys$1(toObject(it));
    }
  });

  var es_object_keys = {

  };

  var keys$3 = path$1.Object.keys;

  var keys$4 = keys$3;

  var keys$5 = keys$4;

  'use strict';


  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
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

  'use strict';









  var max$3 = Math.max;
  var min$6 = Math.min;

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
          var position = max$3(min$6(toInteger(result.index), S.length), 0);
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

  var propertyIsEnumerable = objectPropertyIsEnumerable$1.f;

  // `Object.{ entries, values }` methods implementation
  var createMethod$6 = function (TO_ENTRIES) {
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
    entries: createMethod$6(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod$6(false)
  };

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

  var entries = path$1.Object.entries;

  var entries$1 = entries;

  var entries$2 = entries$1;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$7 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$2(callbackfn);
      var O = toObject(that);
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
    left: createMethod$7(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$7(true)
  };

  var engineIsNode = classofRaw$1(global$2.process) == 'process';

  'use strict';

  var $reduce = arrayReduce.left;





  var STRICT_METHOD$3 = arrayMethodIsStrict('reduce');
  var USES_TO_LENGTH$3 = arrayMethodUsesToLength('reduce', { 1: 0 });
  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  _export$1({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$3 || CHROME_BUG }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var es_array_reduce = {

  };

  var reduce = entryVirtual('Array').reduce;

  var ArrayPrototype$5 = Array.prototype;

  var reduce_1 = function (it) {
    var own = it.reduce;
    return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.reduce) ? reduce : own;
  };

  var reduce$1 = reduce_1;

  var reduce$2 = reduce$1;

  'use strict';

  var $filter = arrayIteration.filter;



  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');
  // Edge 14- issue
  var USES_TO_LENGTH$4 = arrayMethodUsesToLength('filter');

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$4 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var es_array_filter = {

  };

  var filter = entryVirtual('Array').filter;

  var ArrayPrototype$6 = Array.prototype;

  var filter_1 = function (it) {
    var own = it.filter;
    return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.filter) ? filter : own;
  };

  var filter$1 = filter_1;

  var filter$2 = filter$1;

  'use strict';

  var $findIndex = arrayIteration.findIndex;



  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  var USES_TO_LENGTH$5 = arrayMethodUsesToLength(FIND_INDEX);

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findindex
  _export$1({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$5 }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

  var es_array_findIndex = {

  };

  var findIndex = entryVirtual('Array').findIndex;

  var ArrayPrototype$7 = Array.prototype;

  var findIndex_1 = function (it) {
    var own = it.findIndex;
    return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.findIndex) ? findIndex : own;
  };

  var findIndex$1 = findIndex_1;

  var findIndex$2 = findIndex$1;

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

  function _arrayWithHoles(arr) {
    if (isArray$3(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  var getIterator = function (it) {
    var iteratorMethod = getIteratorMethod(it);
    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    } return anObject$1(iteratorMethod.call(it));
  };

  var getIterator_1 = getIterator;

  var getIterator$1 = getIterator_1;

  var ITERATOR$5 = wellKnownSymbol$1('iterator');

  var isIterable = function (it) {
    var O = Object(it);
    return O[ITERATOR$5] !== undefined
      || '@@iterator' in O
      // eslint-disable-next-line no-prototype-builtins
      || iterators.hasOwnProperty(classof(O));
  };

  var isIterable_1 = isIterable;

  var isIterable$1 = isIterable_1;

  // empty

  var es_object_toString = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

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

  function _iterableToArrayLimit(arr, i) {
    if (typeof symbol$2 === "undefined" || !isIterable$1(Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = getIterator$1(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

  var iterableToArrayLimit = _iterableToArrayLimit;

  var from$3 = from;

  var from$4 = from$3;

  'use strict';











  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
  var USES_TO_LENGTH$6 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

  var SPECIES$4 = wellKnownSymbol$1('species');
  var nativeSlice = [].slice;
  var max$4 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$6 }, {
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
          Constructor = Constructor[SPECIES$4];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$4(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var es_array_slice = {

  };

  var slice$2 = entryVirtual('Array').slice;

  var ArrayPrototype$8 = Array.prototype;

  var slice_1 = function (it) {
    var own = it.slice;
    return it === ArrayPrototype$8 || (it instanceof Array && own === ArrayPrototype$8.slice) ? slice$2 : own;
  };

  var slice$3 = slice_1;

  var slice$4 = slice$3;

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _unsupportedIterableToArray(o, minLen) {
    var _context;

    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);

    var n = slice$4(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return from$4(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  'use strict';

  var $map = arrayIteration.map;



  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('map');
  // FF49- issue
  var USES_TO_LENGTH$7 = arrayMethodUsesToLength('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$7 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var es_array_map = {

  };

  var map = entryVirtual('Array').map;

  var ArrayPrototype$9 = Array.prototype;

  var map_1 = function (it) {
    var own = it.map;
    return it === ArrayPrototype$9 || (it instanceof Array && own === ArrayPrototype$9.map) ? map : own;
  };

  var map$1 = map_1;

  var map$2 = map$1;

  'use strict';

  var $find = arrayIteration.find;



  var FIND = 'find';
  var SKIPS_HOLES$1 = true;

  var USES_TO_LENGTH$8 = arrayMethodUsesToLength(FIND);

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  _export$1({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 || !USES_TO_LENGTH$8 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var es_array_find = {

  };

  var find = entryVirtual('Array').find;

  var ArrayPrototype$a = Array.prototype;

  var find_1 = function (it) {
    var own = it.find;
    return it === ArrayPrototype$a || (it instanceof Array && own === ArrayPrototype$a.find) ? find : own;
  };

  var find$1 = find_1;

  var find$2 = find$1;

  'use strict';






  var test$1 = [];
  var nativeSort = test$1.sort;

  // IE8-
  var FAILS_ON_UNDEFINED = fails$1(function () {
    test$1.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$1(function () {
    test$1.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD$4 = arrayMethodIsStrict('sort');

  var FORCED$2 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$4;

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  _export$1({ target: 'Array', proto: true, forced: FORCED$2 }, {
    sort: function sort(comparefn) {
      return comparefn === undefined
        ? nativeSort.call(toObject(this))
        : nativeSort.call(toObject(this), aFunction$2(comparefn));
    }
  });

  var es_array_sort = {

  };

  var sort = entryVirtual('Array').sort;

  var ArrayPrototype$b = Array.prototype;

  var sort_1 = function (it) {
    var own = it.sort;
    return it === ArrayPrototype$b || (it instanceof Array && own === ArrayPrototype$b.sort) ? sort : own;
  };

  var sort$1 = sort_1;

  var sort$2 = sort$1;

  var slice$5 = slice_1;

  var slice$6 = slice$5;

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  var whitespaces$1 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace$1 = '[' + whitespaces$1 + ']';
  var ltrim$1 = RegExp('^' + whitespace$1 + whitespace$1 + '*');
  var rtrim$1 = RegExp(whitespace$1 + whitespace$1 + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$8 = function (TYPE) {
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
    start: createMethod$8(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$8(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$8(3)
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

  var trim$1 = entryVirtual('String').trim;

  var StringPrototype = String.prototype;

  var trim_1 = function (it) {
    var own = it.trim;
    return typeof it === 'string' || it === StringPrototype
      || (it instanceof String && own === StringPrototype.trim) ? trim$1 : own;
  };

  var trim$2 = trim_1;

  var trim$3 = trim$2;

  'use strict';








  var nativeAssign = Object.assign;
  var defineProperty$9 = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !nativeAssign || fails$1(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors$1 && nativeAssign({ b: 1 }, nativeAssign(defineProperty$9({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$9(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys$1(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = toObject(target);
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

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  _export$1({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  var es_object_assign = {

  };

  var assign = path$1.Object.assign;

  var assign$1 = assign;

  var assign$2 = assign$1;

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

  var isArray$4 = isArray$1;

  var isArray$5 = isArray$4;

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

  /*! Hammer.JS - v2.0.7 - 2016-04-22
   * http://hammerjs.github.io/
   *
   * Copyright (c) 2016 Jorik Tangelder;
   * Licensed under the MIT license */
  //(function(window, document, exportName, undefined) {
  'use strict';

  function ownKeys$2(object, enumerableOnly) { var keys = keys$5(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$6(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context20; forEach$2(_context20 = ownKeys$2(Object(source), true)).call(_context20, function (key) { defineProperty$5(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context21; forEach$2(_context21 = ownKeys$2(Object(source))).call(_context21, function (key) { defineProperty$7(target, key, getOwnPropertyDescriptor$6(source, key)); }); } } return target; }

  var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];

  var TEST_ELEMENT = function TEST_ELEMENT() {
    return typeof document != 'undefined' && document.createElement('div');
  };

  var TYPE_FUNCTION = 'function';
  var round = Math.round;
  var abs = Math.abs;
  var now$3 = now$2;
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
    if (isArray$5(arg)) {
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

    if (forEach$2(obj)) {
      forEach$2(obj).call(obj, iterator, context);
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
    childP = child.prototype = create$2(baseP);
    childP.constructor = child;
    childP._super = baseP;
    if (properties) assign$2(childP, properties);
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

    forEach$2(_context = splitStr(types)).call(_context, function (type) {
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

    forEach$2(_context2 = splitStr(types)).call(_context2, function (type) {
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
    return indexOf$4(str).call(str, find) > -1;
  }
  /**
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */


  function splitStr(str) {
    return trim$3(str).call(str).split(/\s+/g);
  }
  /**
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */


  var toArray = function toArray(obj) {
    return slice$6(Array.prototype).call(obj, 0);
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

    forEach$2(array).call(array, function (item, i) {
      var val = key ? item[key] : item;
      if (indexOf$4(values).call(values, val) < 0) results.push(item);
      values[i] = val;
    });

    if (sort) sort$2(results).call(results, !key ? undefined : function (a, b) {
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
    var camelProp = property[0].toUpperCase() + slice$6(property).call(property, 1);

    return find$2(VENDOR_PREFIXES).call(VENDOR_PREFIXES, function (prefix) {
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
    input.timeStamp = now$3();
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
    var pointers = map$2(_context3 = input.pointers).call(_context3, function (pointer) {
      return {
        clientX: round(pointer.clientX),
        clientY: round(pointer.clientY)
      };
    });

    return {
      timeStamp: now$3(),
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

    forEach$2(pointers).call(pointers, function (_ref) {
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
        _ref3 = slicedToArray(_ref2, 2),
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
        _ref5 = slicedToArray(_ref4, 2),
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

      var storeIndex = findIndex$2(store).call(store, function (item) {
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

      if (removePointer) splice$2(store).call(store, storeIndex, 1);
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
          _normalizeSingleTouch2 = slicedToArray(_normalizeSingleTouch, 2),
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
      all = uniqueArray(concat$2(all).call(all, changed), 'identifier', true);
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

    targetTouches = filter$2(allTouches).call(allTouches, function (touch) {
      return hasParent(touch.target, target);
    }); // collect touches

    if (type === INPUT_START) {
      forEach$2(targetTouches).call(targetTouches, function (targetTouch) {
        targetIds[targetTouch.identifier] = true;
      });
    } // filter changed touches to only contain touches that exist in the collected target ids


    forEach$2(changedTouches).call(changedTouches, function (changedTouch) {
      if (targetIds[changedTouch.identifier]) changedTargetTouches.push(changedTouch); // cleanup removed touches

      if (type & (INPUT_END | INPUT_CANCEL)) delete targetIds[changedTouch.identifier];
    });

    if (!changedTargetTouches.length) return;
    return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
    uniqueArray(concat$2(targetTouches).call(targetTouches, changedTargetTouches), 'identifier', true), changedTargetTouches];
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
        var i = indexOf$4(lts).call(lts, lastTouch);

        if (i > -1) {
          splice$2(lts).call(lts, i, 1);
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
    return !!find$2(_context5 = this.lastTouches).call(_context5, function (lastTouch) {
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

      this.actions = trim$3(_context6 = value.toLowerCase()).call(_context6);
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

      forEach$2(_context7 = this.manager.recognizers).call(_context7, function (recognizer) {
        if (boolOrFn(recognizer.options.enable, [recognizer])) {
          actions = concat$2(actions).call(actions, recognizer.getTouchAction());
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
    return reduce$2(touchVals).call(touchVals, function (touchMap, val) {
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
    this.options = _objectSpread(_objectSpread({}, this.defaults), options);
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
      assign$2(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state


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

      if (indexOf$4(requireFail).call(requireFail, otherRecognizer) === -1) {
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

      var index = indexOf$4(_context8 = this.requireFail).call(_context8, otherRecognizer);

      if (index > -1) splice$2(_context9 = this.requireFail).call(_context9, index, 1);
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
      var inputDataClone = _objectSpread({}, inputData); // is is enabled and allow recognizing?


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
        this._input.timeStamp = now$3();
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

    this.options = _objectSpread(_objectSpread({}, Hammer.defaults), options);
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

      forEach$2(_context10 = this.options.recognizers).call(_context10, function (item) {
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
      assign$2(this.options, options); // Options that need a little more setup


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

      forEach$2(recognizers).call(recognizers, function (recognizer) {
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
      return find$2(_context11 = this.recognizers).call(_context11, function (_ref8) {
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

        var index = indexOf$4(_context12 = this.recognizers).call(_context12, recognizer);

        if (index !== -1) {
          var _context13;

          splice$2(_context13 = this.recognizers).call(_context13, index, 1);

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

      forEach$2(_context14 = splitStr(events)).call(_context14, function (event) {
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

      forEach$2(_context15 = splitStr(events)).call(_context15, function (event) {
        if (!handler) {
          delete handlers[event];
        } else if (handlers[event]) {
          var _context16, _context17;

          splice$2(_context16 = handlers[event]).call(_context16, indexOf$4(_context17 = handlers[event]).call(_context17, handler), 1);
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

      var handlers = this.handlers[event] && slice$6(_context18 = this.handlers[event]).call(_context18); // no handlers, so skip it all


      if (!handlers || !handlers.length) return;
      data.type = event;

      data.preventDefault = function () {
        data.srcEvent.preventDefault();
      };

      forEach$2(handlers).call(handlers, function (handler) {
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

    forEach$2(_context19 = entries$2(manager.options.cssProps)).call(_context19, function (_ref9) {
      var _ref10 = slicedToArray(_ref9, 2),
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

  assign$2(Hammer, {
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

      classCallCheck(this, Verso);

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

    createClass(Verso, [{
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

          return splice$2(_context = this._events[event]).call(_context, indexOf$4(_context2 = this._events[event]).call(_context2, fn), 1);
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

        (_this$_events$event = this._events[event]) === null || _this$_events$event === void 0 ? void 0 : forEach$2(_this$_events$event).call(_this$_events$event, function (e) {
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

        forEach$2(_context20 = carousel.visible).call(_context20, function (pageSpread) {
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

          forEach$2(_context21 = carousel.gone).call(_context21, function (pageSpread) {
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

        forEach$2(_context22 = this.pageSpreads).call(_context22, function (pageSpread) {
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

        for (var _i = 0, _Array$from = from$2(els); _i < _Array$from.length; _i++) {
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

        forEach$2(pageSpreads).call(pageSpreads, function (pageSpread) {
          var _context23;

          forEach$2(_context23 = pageSpread.options.pageIds).call(_context23, function (pageId) {
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

        for (var _i2 = 0, _Array$from3 = from$2(overlayEls); _i2 < _Array$from3.length; _i2++) {
          var overlayEl = _Array$from3[_i2];

          if (this.isCoordinateInsideElement(x, y, overlayEl)) {
            info.overlayEls.push(overlayEl);
          }
        }

        for (var _i3 = 0, _Array$from4 = from$2(pageEls); _i3 < _Array$from4.length; _i3++) {
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

          if (indexOf$4(_context24 = pageSpread.options.pageIds).call(_context24, pageId) > -1) {
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

  return Verso;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc28uanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLXRyaW0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLm51bWJlci5jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXJlZ2V4cC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnNwbGl0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3BhdGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL3dlYi50aW1lcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9zZXQtdGltZW91dC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL3NldC10aW1lb3V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1wdXJlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9odG1sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jYWxsLXdpdGgtc2FmZS1pdGVyYXRpb24tY2xvc2luZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS9mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvYXJyYXkvZnJvbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuZnVuY3Rpb24uYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2Z1bmN0aW9uL3ZpcnR1YWwvYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9iaW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2luZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2luZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LnNwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9zcGxpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL3NwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL3NwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2NvbmNhdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uLy4uL2xpYi92ZXJzby1icm93c2VyL2FuaW1hdGlvbi5qcyIsIi4uLy4uL2xpYi92ZXJzby1icm93c2VyL3BhZ2Vfc3ByZWFkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vd24ta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLWV4dGVybmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3Qua2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2tleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3Qva2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmpvaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1zdWJzdGl0dXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5yZXBsYWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXRvLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5lbnRyaWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvZW50cmllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9lbnRyaWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2VudHJpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1yZWR1Y2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5yZWR1Y2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvcmVkdWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9yZWR1Y2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9yZWR1Y2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9yZWR1Y2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZpbmQtaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvZmluZC1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvZmluZC1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbmQtaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9maW5kLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmlzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2FycmF5L2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvZ2V0LWl0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1pdGVyYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvaXMtaXRlcmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5kZXNjcmlwdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaGFzLWluc3RhbmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5pcy1jb25jYXQtc3ByZWFkYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5tYXRjaC1hbGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnJlcGxhY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnNlYXJjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuc3BlY2llcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuc3BsaXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnRvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wudG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wudW5zY29wYWJsZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuanNvbi50by1zdHJpbmctdGFnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm1hdGgudG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5yZWZsZWN0LnRvLXN0cmluZy10YWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL3N5bWJvbC9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLmFzeW5jLWRpc3Bvc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5kaXNwb3NlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLnBhdHRlcm4tbWF0Y2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5yZXBsYWNlLWFsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvc3ltYm9sL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9hcnJheS9mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9zbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvaW5zdGFuY2Uvc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2luc3RhbmNlL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9hcnJheUxpa2VUb0FycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5Lm1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL21hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL21hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL21hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5maW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2ZpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL2ZpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9maW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvZmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5zb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL3NvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL3NvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2Uvc29ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2Uvc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93aGl0ZXNwYWNlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy10cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3RyaW5nLXRyaW0tZm9yY2VkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN0cmluZy50cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9zdHJpbmcvdmlydHVhbC90cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS90cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvdHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL3RyaW0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtYXNzaWduLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvYXNzaWduLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2Fzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2NyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2FycmF5L2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmRhdGUubm93LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9kYXRlL25vdy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2RhdGUvbm93LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvZGF0ZS9ub3cuanMiLCIuLi8uLi9saWIvdmVyc28tYnJvd3Nlci92ZW5kb3IvaGFtbWVyLmpzIiwiLi4vLi4vbGliL3ZlcnNvLWJyb3dzZXIvdmVyc28uanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShnbG9iYWwsIGtleSwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgc2V0R2xvYmFsKFNIQVJFRCwge30pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuOC4zJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDIxIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIFN0cmluZyhrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyAoKytpZCArIHBvc3RmaXgpLnRvU3RyaW5nKDM2KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIG9iamVjdEhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQKSB7XG4gIHZhciBzdG9yZSA9IHNoYXJlZC5zdGF0ZSB8fCAoc2hhcmVkLnN0YXRlID0gbmV3IFdlYWtNYXAoKSk7XG4gIHZhciB3bWdldCA9IHN0b3JlLmdldDtcbiAgdmFyIHdtaGFzID0gc3RvcmUuaGFzO1xuICB2YXIgd21zZXQgPSBzdG9yZS5zZXQ7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICB3bXNldC5jYWxsKHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0LmNhbGwoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzLmNhbGwoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICB2YXIgc3RhdGU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIH1cbiAgICBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgICBpZiAoIXN0YXRlLnNvdXJjZSkge1xuICAgICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICAgIH1cbiAgfVxuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBzZXRHbG9iYWwoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKCF1bnNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICB9IGVsc2UgaWYgKCFub1RhcmdldEdldCAmJiBPW2tleV0pIHtcbiAgICBzaW1wbGUgPSB0cnVlO1xuICB9XG4gIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0pO1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBtYWtlcyBzdWJjbGFzc2luZyB3b3JrIGNvcnJlY3QgZm9yIHdyYXBwZWQgYnVpbHQtaW5zXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkdGhpcywgZHVtbXksIFdyYXBwZXIpIHtcbiAgdmFyIE5ld1RhcmdldCwgTmV3VGFyZ2V0UHJvdG90eXBlO1xuICBpZiAoXG4gICAgLy8gaXQgY2FuIHdvcmsgb25seSB3aXRoIG5hdGl2ZSBgc2V0UHJvdG90eXBlT2ZgXG4gICAgc2V0UHJvdG90eXBlT2YgJiZcbiAgICAvLyB3ZSBoYXZlbid0IGNvbXBsZXRlbHkgY29ycmVjdCBwcmUtRVM2IHdheSBmb3IgZ2V0dGluZyBgbmV3LnRhcmdldGAsIHNvIHVzZSB0aGlzXG4gICAgdHlwZW9mIChOZXdUYXJnZXQgPSBkdW1teS5jb25zdHJ1Y3RvcikgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIE5ld1RhcmdldCAhPT0gV3JhcHBlciAmJlxuICAgIGlzT2JqZWN0KE5ld1RhcmdldFByb3RvdHlwZSA9IE5ld1RhcmdldC5wcm90b3R5cGUpICYmXG4gICAgTmV3VGFyZ2V0UHJvdG90eXBlICE9PSBXcmFwcGVyLnByb3RvdHlwZVxuICApIHNldFByb3RvdHlwZU9mKCR0aGlzLCBOZXdUYXJnZXRQcm90b3R5cGUpO1xuICByZXR1cm4gJHRoaXM7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBUb0ludGVnZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc05hTihhcmd1bWVudCA9ICthcmd1bWVudCkgPyAwIDogKGFyZ3VtZW50ID4gMCA/IGZsb29yIDogY2VpbCkoYXJndW1lbnQpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCJ2YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzKGhpZGRlbktleXMsIGtleSkgJiYgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PSAnZnVuY3Rpb24nID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAqL1xuICAgIGFjdGl2ZVhEb2N1bWVudCA9IGRvY3VtZW50LmRvbWFpbiAmJiBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogaWdub3JlICovIH1cbiAgTnVsbFByb3RvT2JqZWN0ID0gYWN0aXZlWERvY3VtZW50ID8gTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIDogTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lKCk7XG4gIHZhciBsZW5ndGggPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIE51bGxQcm90b09iamVjdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2xlbmd0aF1dO1xuICByZXR1cm4gTnVsbFByb3RvT2JqZWN0KCk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5Q29uc3RydWN0b3IoKTtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IE51bGxQcm90b09iamVjdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsIi8vIGEgc3RyaW5nIG9mIGFsbCB2YWxpZCB1bmljb2RlIHdoaXRlc3BhY2VzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgd2hpdGVzcGFjZSA9ICdbJyArIHdoaXRlc3BhY2VzICsgJ10nO1xudmFyIGx0cmltID0gUmVnRXhwKCdeJyArIHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyonKTtcbnZhciBydHJpbSA9IFJlZ0V4cCh3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW0sIHRyaW1TdGFydCwgdHJpbUVuZCwgdHJpbUxlZnQsIHRyaW1SaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcykge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIGlmIChUWVBFICYgMSkgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgICBpZiAoVFlQRSAmIDIpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1MZWZ0LCB0cmltU3RhcnQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbXN0YXJ0XG4gIHN0YXJ0OiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbVJpZ2h0LCB0cmltRW5kIH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1lbmRcbiAgZW5kOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuICB0cmltOiBjcmVhdGVNZXRob2QoMylcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpLmY7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xuXG52YXIgTlVNQkVSID0gJ051bWJlcic7XG52YXIgTmF0aXZlTnVtYmVyID0gZ2xvYmFsW05VTUJFUl07XG52YXIgTnVtYmVyUHJvdG90eXBlID0gTmF0aXZlTnVtYmVyLnByb3RvdHlwZTtcblxuLy8gT3BlcmEgfjEyIGhhcyBicm9rZW4gT2JqZWN0I3RvU3RyaW5nXG52YXIgQlJPS0VOX0NMQVNTT0YgPSBjbGFzc29mKGNyZWF0ZShOdW1iZXJQcm90b3R5cGUpKSA9PSBOVU1CRVI7XG5cbi8vIGBUb051bWJlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbnVtYmVyXG52YXIgdG9OdW1iZXIgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGl0ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsIGZhbHNlKTtcbiAgdmFyIGZpcnN0LCB0aGlyZCwgcmFkaXgsIG1heENvZGUsIGRpZ2l0cywgbGVuZ3RoLCBpbmRleCwgY29kZTtcbiAgaWYgKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyKSB7XG4gICAgaXQgPSB0cmltKGl0KTtcbiAgICBmaXJzdCA9IGl0LmNoYXJDb2RlQXQoMCk7XG4gICAgaWYgKGZpcnN0ID09PSA0MyB8fCBmaXJzdCA9PT0gNDUpIHtcbiAgICAgIHRoaXJkID0gaXQuY2hhckNvZGVBdCgyKTtcbiAgICAgIGlmICh0aGlyZCA9PT0gODggfHwgdGhpcmQgPT09IDEyMCkgcmV0dXJuIE5hTjsgLy8gTnVtYmVyKCcrMHgxJykgc2hvdWxkIGJlIE5hTiwgb2xkIFY4IGZpeFxuICAgIH0gZWxzZSBpZiAoZmlyc3QgPT09IDQ4KSB7XG4gICAgICBzd2l0Y2ggKGl0LmNoYXJDb2RlQXQoMSkpIHtcbiAgICAgICAgY2FzZSA2NjogY2FzZSA5ODogcmFkaXggPSAyOyBtYXhDb2RlID0gNDk7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMGJbMDFdKyQvaVxuICAgICAgICBjYXNlIDc5OiBjYXNlIDExMTogcmFkaXggPSA4OyBtYXhDb2RlID0gNTU7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMG9bMC03XSskL2lcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuICtpdDtcbiAgICAgIH1cbiAgICAgIGRpZ2l0cyA9IGl0LnNsaWNlKDIpO1xuICAgICAgbGVuZ3RoID0gZGlnaXRzLmxlbmd0aDtcbiAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb2RlID0gZGlnaXRzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAvLyBwYXJzZUludCBwYXJzZXMgYSBzdHJpbmcgdG8gYSBmaXJzdCB1bmF2YWlsYWJsZSBzeW1ib2xcbiAgICAgICAgLy8gYnV0IFRvTnVtYmVyIHNob3VsZCByZXR1cm4gTmFOIGlmIGEgc3RyaW5nIGNvbnRhaW5zIHVuYXZhaWxhYmxlIHN5bWJvbHNcbiAgICAgICAgaWYgKGNvZGUgPCA0OCB8fCBjb2RlID4gbWF4Q29kZSkgcmV0dXJuIE5hTjtcbiAgICAgIH0gcmV0dXJuIHBhcnNlSW50KGRpZ2l0cywgcmFkaXgpO1xuICAgIH1cbiAgfSByZXR1cm4gK2l0O1xufTtcblxuLy8gYE51bWJlcmAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbnVtYmVyLWNvbnN0cnVjdG9yXG5pZiAoaXNGb3JjZWQoTlVNQkVSLCAhTmF0aXZlTnVtYmVyKCcgMG8xJykgfHwgIU5hdGl2ZU51bWJlcignMGIxJykgfHwgTmF0aXZlTnVtYmVyKCcrMHgxJykpKSB7XG4gIHZhciBOdW1iZXJXcmFwcGVyID0gZnVuY3Rpb24gTnVtYmVyKHZhbHVlKSB7XG4gICAgdmFyIGl0ID0gYXJndW1lbnRzLmxlbmd0aCA8IDEgPyAwIDogdmFsdWU7XG4gICAgdmFyIGR1bW15ID0gdGhpcztcbiAgICByZXR1cm4gZHVtbXkgaW5zdGFuY2VvZiBOdW1iZXJXcmFwcGVyXG4gICAgICAvLyBjaGVjayBvbiAxLi5jb25zdHJ1Y3Rvcihmb28pIGNhc2VcbiAgICAgICYmIChCUk9LRU5fQ0xBU1NPRiA/IGZhaWxzKGZ1bmN0aW9uICgpIHsgTnVtYmVyUHJvdG90eXBlLnZhbHVlT2YuY2FsbChkdW1teSk7IH0pIDogY2xhc3NvZihkdW1teSkgIT0gTlVNQkVSKVxuICAgICAgICA/IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBOYXRpdmVOdW1iZXIodG9OdW1iZXIoaXQpKSwgZHVtbXksIE51bWJlcldyYXBwZXIpIDogdG9OdW1iZXIoaXQpO1xuICB9O1xuICBmb3IgKHZhciBrZXlzID0gREVTQ1JJUFRPUlMgPyBnZXRPd25Qcm9wZXJ0eU5hbWVzKE5hdGl2ZU51bWJlcikgOiAoXG4gICAgLy8gRVMzOlxuICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAvLyBFUzIwMTUgKGluIGNhc2UsIGlmIG1vZHVsZXMgd2l0aCBFUzIwMTUgTnVtYmVyIHN0YXRpY3MgcmVxdWlyZWQgYmVmb3JlKTpcbiAgICAnRVBTSUxPTixpc0Zpbml0ZSxpc0ludGVnZXIsaXNOYU4saXNTYWZlSW50ZWdlcixNQVhfU0FGRV9JTlRFR0VSLCcgK1xuICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyLCcgK1xuICAgIC8vIEVTTmV4dFxuICAgICdmcm9tU3RyaW5nLHJhbmdlJ1xuICApLnNwbGl0KCcsJyksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajsgaisrKSB7XG4gICAgaWYgKGhhcyhOYXRpdmVOdW1iZXIsIGtleSA9IGtleXNbal0pICYmICFoYXMoTnVtYmVyV3JhcHBlciwga2V5KSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkoTnVtYmVyV3JhcHBlciwga2V5LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTmF0aXZlTnVtYmVyLCBrZXkpKTtcbiAgICB9XG4gIH1cbiAgTnVtYmVyV3JhcHBlci5wcm90b3R5cGUgPSBOdW1iZXJQcm90b3R5cGU7XG4gIE51bWJlclByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE51bWJlcldyYXBwZXI7XG4gIHJlZGVmaW5lKGdsb2JhbCwgTlVNQkVSLCBOdW1iZXJXcmFwcGVyKTtcbn1cbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMubm9UYXJnZXRHZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IHNldEdsb2JhbChUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvcixcbi8vIHNvIHdlIHVzZSBhbiBpbnRlcm1lZGlhdGUgZnVuY3Rpb24uXG5mdW5jdGlvbiBSRShzLCBmKSB7XG4gIHJldHVybiBSZWdFeHAocywgZik7XG59XG5cbmV4cG9ydHMuVU5TVVBQT1JURURfWSA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUkUoJ2EnLCAneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnYWJjZCcpICE9IG51bGw7XG59KTtcblxuZXhwb3J0cy5CUk9LRU5fQ0FSRVQgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTc3MzY4N1xuICB2YXIgcmUgPSBSRSgnXnInLCAnZ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ3N0cicpICE9IG51bGw7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWdleHBGbGFncyA9IHJlcXVpcmUoJy4vcmVnZXhwLWZsYWdzJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4vcmVnZXhwLXN0aWNreS1oZWxwZXJzJyk7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xuLy8gVGhpcyBhbHdheXMgcmVmZXJzIHRvIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIGJlY2F1c2UgdGhlXG4vLyBTdHJpbmcjcmVwbGFjZSBwb2x5ZmlsbCB1c2VzIC4vZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyxcbi8vIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBiZWZvcmUgcGF0Y2hpbmcgdGhlIG1ldGhvZC5cbnZhciBuYXRpdmVSZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xuXG52YXIgcGF0Y2hlZEV4ZWMgPSBuYXRpdmVFeGVjO1xuXG52YXIgVVBEQVRFU19MQVNUX0lOREVYX1dST05HID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlMSA9IC9hLztcbiAgdmFyIHJlMiA9IC9iKi9nO1xuICBuYXRpdmVFeGVjLmNhbGwocmUxLCAnYScpO1xuICBuYXRpdmVFeGVjLmNhbGwocmUyLCAnYScpO1xuICByZXR1cm4gcmUxLmxhc3RJbmRleCAhPT0gMCB8fCByZTIubGFzdEluZGV4ICE9PSAwO1xufSkoKTtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBzdGlja3lIZWxwZXJzLlVOU1VQUE9SVEVEX1kgfHwgc3RpY2t5SGVscGVycy5CUk9LRU5fQ0FSRVQ7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEIHx8IFVOU1VQUE9SVEVEX1k7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4LCByZUNvcHksIG1hdGNoLCBpO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSByZWdleHBGbGFncy5jYWxsKHJlKTtcbiAgICB2YXIgc291cmNlID0gcmUuc291cmNlO1xuICAgIHZhciBjaGFyc0FkZGVkID0gMDtcbiAgICB2YXIgc3RyQ29weSA9IHN0cjtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgneScsICcnKTtcbiAgICAgIGlmIChmbGFncy5pbmRleE9mKCdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IFN0cmluZyhzdHIpLnNsaWNlKHJlLmxhc3RJbmRleCk7XG4gICAgICAvLyBTdXBwb3J0IGFuY2hvcmVkIHN0aWNreSBiZWhhdmlvci5cbiAgICAgIGlmIChyZS5sYXN0SW5kZXggPiAwICYmICghcmUubXVsdGlsaW5lIHx8IHJlLm11bHRpbGluZSAmJiBzdHJbcmUubGFzdEluZGV4IC0gMV0gIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBtYXRjaC5pbnB1dC5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5leGVjYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS5leGVjXG4kKHsgdGFyZ2V0OiAnUmVnRXhwJywgcHJvdG86IHRydWUsIGZvcmNlZDogLy4vLmV4ZWMgIT09IGV4ZWMgfSwge1xuICBleGVjOiBleGVjXG59KTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgIVN5bWJvbC5zaGFtXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzKFN5bWJvbCwgbmFtZSkpIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICBlbHNlIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3MgbW92ZWQgdG8gZW50cnkgcG9pbnRzXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnJlZ2V4cC5leGVjJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbnZhciBSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vICNyZXBsYWNlIG5lZWRzIGJ1aWx0LWluIHN1cHBvcnQgZm9yIG5hbWVkIGdyb3Vwcy5cbiAgLy8gI21hdGNoIHdvcmtzIGZpbmUgYmVjYXVzZSBpdCBqdXN0IHJldHVybiB0aGUgZXhlYyByZXN1bHRzLCBldmVuIGlmIGl0IGhhc1xuICAvLyBhIFwiZ3JvcHNcIiBwcm9wZXJ0eS5cbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbi8vIElFIDw9IDExIHJlcGxhY2VzICQwIHdpdGggdGhlIHdob2xlIG1hdGNoLCBhcyBpZiBpdCB3YXMgJCZcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYwMjQ2NjYvZ2V0dGluZy1pZS10by1yZXBsYWNlLWEtcmVnZXgtd2l0aC10aGUtbGl0ZXJhbC1zdHJpbmctMFxudmFyIFJFUExBQ0VfS0VFUFNfJDAgPSAoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ2EnLnJlcGxhY2UoLy4vLCAnJDAnKSA9PT0gJyQwJztcbn0pKCk7XG5cbnZhciBSRVBMQUNFID0gd2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG4vLyBTYWZhcmkgPD0gMTMuMC4zKD8pIHN1YnN0aXR1dGVzIG50aCBjYXB0dXJlIHdoZXJlIG4+bSB3aXRoIGFuIGVtcHR5IHN0cmluZ1xudmFyIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID0gKGZ1bmN0aW9uICgpIHtcbiAgaWYgKC8uL1tSRVBMQUNFXSkge1xuICAgIHJldHVybiAvLi9bUkVQTEFDRV0oJ2EnLCAnJDAnKSA9PT0gJyc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuLy8gQ2hyb21lIDUxIGhhcyBhIGJ1Z2d5IFwic3BsaXRcIiBpbXBsZW1lbnRhdGlvbiB3aGVuIFJlZ0V4cCNleGVjICE9PSBuYXRpdmVFeGVjXG4vLyBXZWV4IEpTIGhhcyBmcm96ZW4gYnVpbHQtaW4gcHJvdG90eXBlcywgc28gdXNlIHRyeSAvIGNhdGNoIHdyYXBwZXJcbnZhciBTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAvKD86KS87XG4gIHZhciBvcmlnaW5hbEV4ZWMgPSByZS5leGVjO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gb3JpZ2luYWxFeGVjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gIHZhciByZXN1bHQgPSAnYWInLnNwbGl0KHJlKTtcbiAgcmV0dXJuIHJlc3VsdC5sZW5ndGggIT09IDIgfHwgcmVzdWx0WzBdICE9PSAnYScgfHwgcmVzdWx0WzFdICE9PSAnYic7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBsZW5ndGgsIGV4ZWMsIHNoYW0pIHtcbiAgdmFyIFNZTUJPTCA9IHdlbGxLbm93blN5bWJvbChLRVkpO1xuXG4gIHZhciBERUxFR0FURVNfVE9fU1lNQk9MID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTdHJpbmcgbWV0aG9kcyBjYWxsIHN5bWJvbC1uYW1lZCBSZWdFcCBtZXRob2RzXG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pO1xuXG4gIHZhciBERUxFR0FURVNfVE9fRVhFQyA9IERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuXG4gICAgaWYgKEtFWSA9PT0gJ3NwbGl0Jykge1xuICAgICAgLy8gV2UgY2FuJ3QgdXNlIHJlYWwgcmVnZXggaGVyZSBzaW5jZSBpdCBjYXVzZXMgZGVvcHRpbWl6YXRpb25cbiAgICAgIC8vIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uIGluIFY4XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzA2XG4gICAgICByZSA9IHt9O1xuICAgICAgLy8gUmVnRXhwW0BAc3BsaXRdIGRvZXNuJ3QgY2FsbCB0aGUgcmVnZXgncyBleGVjIG1ldGhvZCwgYnV0IGZpcnN0IGNyZWF0ZXNcbiAgICAgIC8vIGEgbmV3IG9uZS4gV2UgbmVlZCB0byByZXR1cm4gdGhlIHBhdGNoZWQgcmVnZXggd2hlbiBjcmVhdGluZyB0aGUgbmV3IG9uZS5cbiAgICAgIHJlLmNvbnN0cnVjdG9yID0ge307XG4gICAgICByZS5jb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlOyB9O1xuICAgICAgcmUuZmxhZ3MgPSAnJztcbiAgICAgIHJlW1NZTUJPTF0gPSAvLi9bU1lNQk9MXTtcbiAgICB9XG5cbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyBleGVjQ2FsbGVkID0gdHJ1ZTsgcmV0dXJuIG51bGw7IH07XG5cbiAgICByZVtTWU1CT0xdKCcnKTtcbiAgICByZXR1cm4gIWV4ZWNDYWxsZWQ7XG4gIH0pO1xuXG4gIGlmIChcbiAgICAhREVMRUdBVEVTX1RPX1NZTUJPTCB8fFxuICAgICFERUxFR0FURVNfVE9fRVhFQyB8fFxuICAgIChLRVkgPT09ICdyZXBsYWNlJyAmJiAhKFxuICAgICAgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgJiZcbiAgICAgIFJFUExBQ0VfS0VFUFNfJDAgJiZcbiAgICAgICFSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRVxuICAgICkpIHx8XG4gICAgKEtFWSA9PT0gJ3NwbGl0JyAmJiAhU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDKVxuICApIHtcbiAgICB2YXIgbmF0aXZlUmVnRXhwTWV0aG9kID0gLy4vW1NZTUJPTF07XG4gICAgdmFyIG1ldGhvZHMgPSBleGVjKFNZTUJPTCwgJydbS0VZXSwgZnVuY3Rpb24gKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICBpZiAocmVnZXhwLmV4ZWMgPT09IHJlZ2V4cEV4ZWMpIHtcbiAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZVJlZ0V4cE1ldGhvZC5jYWxsKHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVNZXRob2QuY2FsbChzdHIsIHJlZ2V4cCwgYXJnMikgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlIH07XG4gICAgfSwge1xuICAgICAgUkVQTEFDRV9LRUVQU18kMDogUkVQTEFDRV9LRUVQU18kMCxcbiAgICAgIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFOiBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRVxuICAgIH0pO1xuICAgIHZhciBzdHJpbmdNZXRob2QgPSBtZXRob2RzWzBdO1xuICAgIHZhciByZWdleE1ldGhvZCA9IG1ldGhvZHNbMV07XG5cbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmluZ01ldGhvZCk7XG4gICAgcmVkZWZpbmUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJlZ2V4TWV0aG9kLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cblxuICBpZiAoc2hhbSkgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFJlZ0V4cC5wcm90b3R5cGVbU1lNQk9MXSwgJ3NoYW0nLCB0cnVlKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG5cbi8vIGBJc1JlZ0V4cGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzcmVnZXhwXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjbGFzc29mKGl0KSA9PSAnUmVnRXhwJyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgU3BlY2llc0NvbnN0cnVjdG9yYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3BlY2llc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBkZWZhdWx0Q29uc3RydWN0b3IpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gZGVmYXVsdENvbnN0cnVjdG9yIDogYUZ1bmN0aW9uKFMpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgY29kZVBvaW50QXQsIGF0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgcG9zKSB7XG4gICAgdmFyIFMgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBzaXplID0gUy5sZW5ndGg7XG4gICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBzaXplKSByZXR1cm4gQ09OVkVSVF9UT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBmaXJzdCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpKSA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkZcbiAgICAgICAgPyBDT05WRVJUX1RPX1NUUklORyA/IFMuY2hhckF0KHBvc2l0aW9uKSA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkcgPyBTLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpIDogKGZpcnN0IC0gMHhEODAwIDw8IDEwKSArIChzZWNvbmQgLSAweERDMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcblxuLy8gYEFkdmFuY2VTdHJpbmdJbmRleGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFkdmFuY2VzdHJpbmdpbmRleFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUywgaW5kZXgsIHVuaWNvZGUpIHtcbiAgcmV0dXJuIGluZGV4ICsgKHVuaWNvZGUgPyBjaGFyQXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9jbGFzc29mLXJhdycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKHR5cGVvZiBleGVjID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHJlc3VsdCA9IGV4ZWMuY2FsbChSLCBTKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVnRXhwIGV4ZWMgbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbiAgfVxuXG4gIHJldHVybiByZWdleHBFeGVjLmNhbGwoUiwgUyk7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjYWxsUmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgYXJyYXlQdXNoID0gW10ucHVzaDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBNQVhfVUlOVDMyID0gMHhGRkZGRkZGRjtcblxuLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCd4JywgJ3knKSAtPiAveC95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciBTVVBQT1JUU19ZID0gIWZhaWxzKGZ1bmN0aW9uICgpIHsgcmV0dXJuICFSZWdFeHAoTUFYX1VJTlQzMiwgJ3knKTsgfSk7XG5cbi8vIEBAc3BsaXQgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdzcGxpdCcsIDIsIGZ1bmN0aW9uIChTUExJVCwgbmF0aXZlU3BsaXQsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgaW50ZXJuYWxTcGxpdDtcbiAgaWYgKFxuICAgICdhYmJjJy5zcGxpdCgvKGIpKi8pWzFdID09ICdjJyB8fFxuICAgICd0ZXN0Jy5zcGxpdCgvKD86KS8sIC0xKS5sZW5ndGggIT0gNCB8fFxuICAgICdhYicuc3BsaXQoLyg/OmFiKSovKS5sZW5ndGggIT0gMiB8fFxuICAgICcuJy5zcGxpdCgvKC4/KSguPykvKS5sZW5ndGggIT0gNCB8fFxuICAgICcuJy5zcGxpdCgvKCkoKS8pLmxlbmd0aCA+IDEgfHxcbiAgICAnJy5zcGxpdCgvLj8vKS5sZW5ndGhcbiAgKSB7XG4gICAgLy8gYmFzZWQgb24gZXM1LXNoaW0gaW1wbGVtZW50YXRpb24sIG5lZWQgdG8gcmV3b3JrIGl0XG4gICAgaW50ZXJuYWxTcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoc2VwYXJhdG9yID09PSB1bmRlZmluZWQpIHJldHVybiBbc3RyaW5nXTtcbiAgICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgbmF0aXZlIHNwbGl0XG4gICAgICBpZiAoIWlzUmVnRXhwKHNlcGFyYXRvcikpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbSk7XG4gICAgICB9XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4cEV4ZWMuY2FsbChzZXBhcmF0b3JDb3B5LCBzdHJpbmcpKSB7XG4gICAgICAgIGxhc3RJbmRleCA9IHNlcGFyYXRvckNvcHkubGFzdEluZGV4O1xuICAgICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nLmxlbmd0aCkgYXJyYXlQdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHNlcGFyYXRvckNvcHkubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3JDb3B5LnRlc3QoJycpKSBvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltID8gb3V0cHV0LnNsaWNlKDAsIGxpbSkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYgKCcwJy5zcGxpdCh1bmRlZmluZWQsIDApLmxlbmd0aCkge1xuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiBuYXRpdmVTcGxpdC5jYWxsKHRoaXMsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH07XG4gIH0gZWxzZSBpbnRlcm5hbFNwbGl0ID0gbmF0aXZlU3BsaXQ7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnNwbGl0XG4gICAgZnVuY3Rpb24gc3BsaXQoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgICAgdmFyIHNwbGl0dGVyID0gc2VwYXJhdG9yID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlcGFyYXRvcltTUExJVF07XG4gICAgICByZXR1cm4gc3BsaXR0ZXIgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHNwbGl0dGVyLmNhbGwoc2VwYXJhdG9yLCBPLCBsaW1pdClcbiAgICAgICAgOiBpbnRlcm5hbFNwbGl0LmNhbGwoU3RyaW5nKE8pLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEBzcGxpdFxuICAgIC8vXG4gICAgLy8gTk9URTogVGhpcyBjYW5ub3QgYmUgcHJvcGVybHkgcG9seWZpbGxlZCBpbiBlbmdpbmVzIHRoYXQgZG9uJ3Qgc3VwcG9ydFxuICAgIC8vIHRoZSAneScgZmxhZy5cbiAgICBmdW5jdGlvbiAocmVnZXhwLCBsaW1pdCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShpbnRlcm5hbFNwbGl0LCByZWdleHAsIHRoaXMsIGxpbWl0LCBpbnRlcm5hbFNwbGl0ICE9PSBuYXRpdmVTcGxpdCk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcbiAgICAgIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHJ4LCBSZWdFeHApO1xuXG4gICAgICB2YXIgdW5pY29kZU1hdGNoaW5nID0gcngudW5pY29kZTtcbiAgICAgIHZhciBmbGFncyA9IChyeC5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyeC5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJ4LnVuaWNvZGUgPyAndScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKFNVUFBPUlRTX1kgPyAneScgOiAnZycpO1xuXG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgUyBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgdmFyIHNwbGl0dGVyID0gbmV3IEMoU1VQUE9SVFNfWSA/IHJ4IDogJ14oPzonICsgcnguc291cmNlICsgJyknLCBmbGFncyk7XG4gICAgICB2YXIgbGltID0gbGltaXQgPT09IHVuZGVmaW5lZCA/IE1BWF9VSU5UMzIgOiBsaW1pdCA+Pj4gMDtcbiAgICAgIGlmIChsaW0gPT09IDApIHJldHVybiBbXTtcbiAgICAgIGlmIChTLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGNhbGxSZWdFeHBFeGVjKHNwbGl0dGVyLCBTKSA9PT0gbnVsbCA/IFtTXSA6IFtdO1xuICAgICAgdmFyIHAgPSAwO1xuICAgICAgdmFyIHEgPSAwO1xuICAgICAgdmFyIEEgPSBbXTtcbiAgICAgIHdoaWxlIChxIDwgUy5sZW5ndGgpIHtcbiAgICAgICAgc3BsaXR0ZXIubGFzdEluZGV4ID0gU1VQUE9SVFNfWSA/IHEgOiAwO1xuICAgICAgICB2YXIgeiA9IGNhbGxSZWdFeHBFeGVjKHNwbGl0dGVyLCBTVVBQT1JUU19ZID8gUyA6IFMuc2xpY2UocSkpO1xuICAgICAgICB2YXIgZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHogPT09IG51bGwgfHxcbiAgICAgICAgICAoZSA9IG1pbih0b0xlbmd0aChzcGxpdHRlci5sYXN0SW5kZXggKyAoU1VQUE9SVFNfWSA/IDAgOiBxKSksIFMubGVuZ3RoKSkgPT09IHBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcSA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCBxLCB1bmljb2RlTWF0Y2hpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEEucHVzaChTLnNsaWNlKHAsIHEpKTtcbiAgICAgICAgICBpZiAoQS5sZW5ndGggPT09IGxpbSkgcmV0dXJuIEE7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gei5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIEEucHVzaCh6W2ldKTtcbiAgICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcSA9IHAgPSBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBBLnB1c2goUy5zbGljZShwKSk7XG4gICAgICByZXR1cm4gQTtcbiAgICB9XG4gIF07XG59LCAhU1VQUE9SVFNfWSk7XG4iLCJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciBzcGxpdCA9ICcnLnNwbGl0O1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICByZXR1cm4gIU9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQuY2FsbChpdCwgJycpIDogT2JqZWN0KGl0KTtcbn0gOiBPYmplY3Q7XG4iLCIvLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgUFJFRkVSUkVEX1NUUklORykge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFBSRUZFUlJFRF9TVFJJTkcgJiYgdHlwZW9mIChmbiA9IGlucHV0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaW5wdXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVBSRUZFUlJFRF9TVFJJTkcgJiYgdHlwZW9mIChmbiA9IGlucHV0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcblxudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZURlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xuXG52YXIgd3JhcENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKE5hdGl2ZUNvbnN0cnVjdG9yKSB7XG4gIHZhciBXcmFwcGVyID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIE5hdGl2ZUNvbnN0cnVjdG9yKSB7XG4gICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKGEsIGIpO1xuICAgICAgfSByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKGEsIGIsIGMpO1xuICAgIH0gcmV0dXJuIE5hdGl2ZUNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG4gIFdyYXBwZXIucHJvdG90eXBlID0gTmF0aXZlQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICByZXR1cm4gV3JhcHBlcjtcbn07XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMubm9UYXJnZXRHZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgUFJPVE8gPSBvcHRpb25zLnByb3RvO1xuXG4gIHZhciBuYXRpdmVTb3VyY2UgPSBHTE9CQUwgPyBnbG9iYWwgOiBTVEFUSUMgPyBnbG9iYWxbVEFSR0VUXSA6IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuXG4gIHZhciB0YXJnZXQgPSBHTE9CQUwgPyBwYXRoIDogcGF0aFtUQVJHRVRdIHx8IChwYXRoW1RBUkdFVF0gPSB7fSk7XG4gIHZhciB0YXJnZXRQcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuXG4gIHZhciBGT1JDRUQsIFVTRV9OQVRJVkUsIFZJUlRVQUxfUFJPVE9UWVBFO1xuICB2YXIga2V5LCBzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHksIG5hdGl2ZVByb3BlcnR5LCByZXN1bHRQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcblxuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIFVTRV9OQVRJVkUgPSAhRk9SQ0VEICYmIG5hdGl2ZVNvdXJjZSAmJiBoYXMobmF0aXZlU291cmNlLCBrZXkpO1xuXG4gICAgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcblxuICAgIGlmIChVU0VfTkFUSVZFKSBpZiAob3B0aW9ucy5ub1RhcmdldEdldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihuYXRpdmVTb3VyY2UsIGtleSk7XG4gICAgICBuYXRpdmVQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgbmF0aXZlUHJvcGVydHkgPSBuYXRpdmVTb3VyY2Vba2V5XTtcblxuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgaW1wbGVtZW50YXRpb25cbiAgICBzb3VyY2VQcm9wZXJ0eSA9IChVU0VfTkFUSVZFICYmIG5hdGl2ZVByb3BlcnR5KSA/IG5hdGl2ZVByb3BlcnR5IDogc291cmNlW2tleV07XG5cbiAgICBpZiAoVVNFX05BVElWRSAmJiB0eXBlb2YgdGFyZ2V0UHJvcGVydHkgPT09IHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSkgY29udGludWU7XG5cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGlmIChvcHRpb25zLmJpbmQgJiYgVVNFX05BVElWRSkgcmVzdWx0UHJvcGVydHkgPSBiaW5kKHNvdXJjZVByb3BlcnR5LCBnbG9iYWwpO1xuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ3MgaW4gdGhpcyB2ZXJzaW9uXG4gICAgZWxzZSBpZiAob3B0aW9ucy53cmFwICYmIFVTRV9OQVRJVkUpIHJlc3VsdFByb3BlcnR5ID0gd3JhcENvbnN0cnVjdG9yKHNvdXJjZVByb3BlcnR5KTtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICBlbHNlIGlmIChQUk9UTyAmJiB0eXBlb2Ygc291cmNlUHJvcGVydHkgPT0gJ2Z1bmN0aW9uJykgcmVzdWx0UHJvcGVydHkgPSBiaW5kKEZ1bmN0aW9uLmNhbGwsIHNvdXJjZVByb3BlcnR5KTtcbiAgICAvLyBkZWZhdWx0IGNhc2VcbiAgICBlbHNlIHJlc3VsdFByb3BlcnR5ID0gc291cmNlUHJvcGVydHk7XG5cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAoc291cmNlUHJvcGVydHkgJiYgc291cmNlUHJvcGVydHkuc2hhbSkgfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocmVzdWx0UHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGFyZ2V0W2tleV0gPSByZXN1bHRQcm9wZXJ0eTtcblxuICAgIGlmIChQUk9UTykge1xuICAgICAgVklSVFVBTF9QUk9UT1RZUEUgPSBUQVJHRVQgKyAnUHJvdG90eXBlJztcbiAgICAgIGlmICghaGFzKHBhdGgsIFZJUlRVQUxfUFJPVE9UWVBFKSkge1xuICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocGF0aCwgVklSVFVBTF9QUk9UT1RZUEUsIHt9KTtcbiAgICAgIH1cbiAgICAgIC8vIGV4cG9ydCB2aXJ0dWFsIHByb3RvdHlwZSBtZXRob2RzXG4gICAgICBwYXRoW1ZJUlRVQUxfUFJPVE9UWVBFXVtrZXldID0gc291cmNlUHJvcGVydHk7XG4gICAgICAvLyBleHBvcnQgcmVhbCBwcm90b3R5cGUgbWV0aG9kc1xuICAgICAgaWYgKG9wdGlvbnMucmVhbCAmJiB0YXJnZXRQcm90b3R5cGUgJiYgIXRhcmdldFByb3RvdHlwZVtrZXldKSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXRQcm90b3R5cGUsIGtleSwgc291cmNlUHJvcGVydHkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YXJpYWJsZSA9PSAnZnVuY3Rpb24nID8gdmFyaWFibGUgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24ocGF0aFtuYW1lc3BhY2VdKSB8fCBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pXG4gICAgOiBwYXRoW25hbWVzcGFjZV0gJiYgcGF0aFtuYW1lc3BhY2VdW21ldGhvZF0gfHwgZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIE1TSUUgPSAvTVNJRSAuXFwuLy50ZXN0KHVzZXJBZ2VudCk7IC8vIDwtIGRpcnR5IGllOS0gY2hlY2tcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAoc2NoZWR1bGVyKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaGFuZGxlciwgdGltZW91dCAvKiAsIC4uLmFyZ3VtZW50cyAqLykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgICB2YXIgYXJncyA9IGJvdW5kQXJncyA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc2NoZWR1bGVyKGJvdW5kQXJncyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgICAgKHR5cGVvZiBoYW5kbGVyID09ICdmdW5jdGlvbicgPyBoYW5kbGVyIDogRnVuY3Rpb24oaGFuZGxlcikpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gOiBoYW5kbGVyLCB0aW1lb3V0KTtcbiAgfTtcbn07XG5cbi8vIGllOS0gc2V0VGltZW91dCAmIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3RpbWVycy1hbmQtdXNlci1wcm9tcHRzLmh0bWwjdGltZXJzXG4kKHsgZ2xvYmFsOiB0cnVlLCBiaW5kOiB0cnVlLCBmb3JjZWQ6IE1TSUUgfSwge1xuICAvLyBgc2V0VGltZW91dGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3RpbWVycy1hbmQtdXNlci1wcm9tcHRzLmh0bWwjZG9tLXNldHRpbWVvdXRcbiAgc2V0VGltZW91dDogd3JhcChnbG9iYWwuc2V0VGltZW91dCksXG4gIC8vIGBzZXRJbnRlcnZhbGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3RpbWVycy1hbmQtdXNlci1wcm9tcHRzLmh0bWwjZG9tLXNldGludGVydmFsXG4gIHNldEludGVydmFsOiB3cmFwKGdsb2JhbC5zZXRJbnRlcnZhbClcbn0pO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIudGltZXJzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5zZXRUaW1lb3V0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9zZXQtdGltZW91dFwiKTsiLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBUb0ludGVnZXJgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc05hTihhcmd1bWVudCA9ICthcmd1bWVudCkgPyAwIDogKGFyZ3VtZW50ID4gMCA/IGZsb29yIDogY2VpbCkoYXJndW1lbnQpO1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgY29kZVBvaW50QXQsIGF0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgcG9zKSB7XG4gICAgdmFyIFMgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBzaXplID0gUy5sZW5ndGg7XG4gICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBzaXplKSByZXR1cm4gQ09OVkVSVF9UT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBmaXJzdCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpKSA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkZcbiAgICAgICAgPyBDT05WRVJUX1RPX1NUUklORyA/IFMuY2hhckF0KHBvc2l0aW9uKSA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkcgPyBTLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpIDogKGZpcnN0IC0gMHhEODAwIDw8IDEwKSArIChzZWNvbmQgLSAweERDMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjguMycsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxubW9kdWxlLmV4cG9ydHMgPSBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG90eXBlIDogbnVsbDtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHJldHVybiAhU3RyaW5nKFN5bWJvbCgpKTtcbn0pO1xuIiwidmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmICFTeW1ib2wuc2hhbVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgZWxzZSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gZmFsc2U7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxuLy8gYCVJdGVyYXRvclByb3RvdHlwZSVgIG9iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxudmFyIE5FV19JVEVSQVRPUl9QUk9UT1RZUEUgPSBJdGVyYXRvclByb3RvdHlwZSA9PSB1bmRlZmluZWQgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVzdCA9IHt9O1xuICAvLyBGRjQ0LSBsZWdhY3kgaXRlcmF0b3JzIGNhc2VcbiAgcmV0dXJuIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXS5jYWxsKHRlc3QpICE9PSB0ZXN0O1xufSk7XG5cbmlmIChORVdfSVRFUkFUT1JfUFJPVE9UWVBFKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxuaWYgKCghSVNfUFVSRSB8fCBORVdfSVRFUkFUT1JfUFJPVE9UWVBFKSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJdGVyYXRvclByb3RvdHlwZTogSXRlcmF0b3JQcm90b3R5cGUsXG4gIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlM6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlNcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5ID0ga2V5c1tpbmRleCsrXSwgUHJvcGVydGllc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgKi9cbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBkb2N1bWVudC5kb21haW4gJiYgbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IGFjdGl2ZVhEb2N1bWVudCA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUQUcsIFNUQVRJQywgU0VUX01FVEhPRCkge1xuICBpZiAoaXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGU7XG4gICAgaWYgKCFoYXModGFyZ2V0LCBUT19TVFJJTkdfVEFHKSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBUT19TVFJJTkdfVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IFRBRyB9KTtcbiAgICB9XG4gICAgaWYgKFNFVF9NRVRIT0QgJiYgIVRPX1NUUklOR19UQUdfU1VQUE9SVCkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRhcmdldCwgJ3RvU3RyaW5nJywgdG9TdHJpbmcpO1xuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIEl0ZXJhdG9yQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JDb25zdHJ1Y3RvciwgVE9fU1RSSU5HX1RBRywgZmFsc2UsIHRydWUpO1xuICBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICByZXR1cm4gSXRlcmF0b3JDb25zdHJ1Y3Rvcjtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpICYmIGl0ICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKGl0KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwidmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW51bWVyYWJsZSkgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodGFyZ2V0LCBrZXksIHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJdGVyYXRvcnNDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJyk7XG5cbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EIGluIEl0ZXJhYmxlUHJvdG90eXBlKSByZXR1cm4gSXRlcmFibGVQcm90b3R5cGVbS0lORF07XG4gICAgc3dpdGNoIChLSU5EKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBFTlRSSUVTOiByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMpOyB9O1xuICB9O1xuXG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gZmFsc2U7XG4gIHZhciBJdGVyYWJsZVByb3RvdHlwZSA9IEl0ZXJhYmxlLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUl0ZXJhdG9yID0gSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgfHwgSXRlcmFibGVQcm90b3R5cGVbJ0BAaXRlcmF0b3InXVxuICAgIHx8IERFRkFVTFQgJiYgSXRlcmFibGVQcm90b3R5cGVbREVGQVVMVF07XG4gIHZhciBkZWZhdWx0SXRlcmF0b3IgPSAhQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBuYXRpdmVJdGVyYXRvciB8fCBnZXRJdGVyYXRpb25NZXRob2QoREVGQVVMVCk7XG4gIHZhciBhbnlOYXRpdmVJdGVyYXRvciA9IE5BTUUgPT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgaWYgKCFJU19QVVJFICYmIGdldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSkgIT09IEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgIHNldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZBVUxUID09IFZBTFVFUyAmJiBuYXRpdmVJdGVyYXRvciAmJiBuYXRpdmVJdGVyYXRvci5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSB0cnVlO1xuICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5hdGl2ZUl0ZXJhdG9yLmNhbGwodGhpcyk7IH07XG4gIH1cblxuICAvLyBkZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghSVNfUFVSRSB8fCBGT1JDRUQpICYmIEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gZGVmYXVsdEl0ZXJhdG9yKSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhYmxlUHJvdG90eXBlLCBJVEVSQVRPUiwgZGVmYXVsdEl0ZXJhdG9yKTtcbiAgfVxuICBJdGVyYXRvcnNbTkFNRV0gPSBkZWZhdWx0SXRlcmF0b3I7XG5cbiAgLy8gZXhwb3J0IGFkZGl0aW9uYWwgbWV0aG9kc1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gZGVmYXVsdEl0ZXJhdG9yIDogZ2V0SXRlcmF0aW9uTWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogZ2V0SXRlcmF0aW9uTWV0aG9kKEVOVFJJRVMpXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKEtFWSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfHwgIShLRVkgaW4gSXRlcmFibGVQcm90b3R5cGUpKSB7XG4gICAgICAgIHJlZGVmaW5lKEl0ZXJhYmxlUHJvdG90eXBlLCBLRVksIG1ldGhvZHNbS0VZXSk7XG4gICAgICB9XG4gICAgfSBlbHNlICQoeyB0YXJnZXQ6IE5BTUUsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIH0sIG1ldGhvZHMpO1xuICB9XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIFNUUklOR19JVEVSQVRPUiA9ICdTdHJpbmcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1RSSU5HX0lURVJBVE9SKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiBTdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gIHZhciByZXR1cm5NZXRob2QgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gIGlmIChyZXR1cm5NZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBhbk9iamVjdChyZXR1cm5NZXRob2QuY2FsbChpdGVyYXRvcikpLnZhbHVlO1xuICB9XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxuLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgRU5UUklFUykge1xuICB0cnkge1xuICAgIHJldHVybiBFTlRSSUVTID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG90eXBlW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgcHJvcGVydHlLZXkgPSB0b1ByaW1pdGl2ZShrZXkpO1xuICBpZiAocHJvcGVydHlLZXkgaW4gb2JqZWN0KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwgcHJvcGVydHlLZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtwcm9wZXJ0eUtleV0gPSB2YWx1ZTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5mcm9tXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgbWFwZm4gPSBhcmd1bWVudHNMZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKE8pO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yLCBuZXh0LCB2YWx1ZTtcbiAgaWYgKG1hcHBpbmcpIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzTGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gIC8vIGlmIHRoZSB0YXJnZXQgaXMgbm90IGl0ZXJhYmxlIG9yIGl0J3MgYW4gYXJyYXkgd2l0aCB0aGUgZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBhIHNpbXBsZSBjYXNlXG4gIGlmIChpdGVyYXRvck1ldGhvZCAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyYXRvck1ldGhvZCkpKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKE8pO1xuICAgIG5leHQgPSBpdGVyYXRvci5uZXh0O1xuICAgIHJlc3VsdCA9IG5ldyBDKCk7XG4gICAgZm9yICg7IShzdGVwID0gbmV4dC5jYWxsKGl0ZXJhdG9yKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgdmFsdWUgPSBtYXBwaW5nID8gY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyhpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgY2FsbGVkID0gMDtcbiAgdmFyIGl0ZXJhdG9yV2l0aFJldHVybiA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBkb25lOiAhIWNhbGxlZCsrIH07XG4gICAgfSxcbiAgICAncmV0dXJuJzogZnVuY3Rpb24gKCkge1xuICAgICAgU0FGRV9DTE9TSU5HID0gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIGl0ZXJhdG9yV2l0aFJldHVybltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20oaXRlcmF0b3JXaXRoUmV0dXJuLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBTS0lQX0NMT1NJTkcpIHtcbiAgaWYgKCFTS0lQX0NMT1NJTkcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgSVRFUkFUSU9OX1NVUFBPUlQgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgb2JqZWN0W0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4geyBkb25lOiBJVEVSQVRJT05fU1VQUE9SVCA9IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIGV4ZWMob2JqZWN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gSVRFUkFUSU9OX1NVUFBPUlQ7XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZnJvbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mcm9tJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xuXG52YXIgSU5DT1JSRUNUX0lURVJBVElPTiA9ICFjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XG4gIEFycmF5LmZyb20oaXRlcmFibGUpO1xufSk7XG5cbi8vIGBBcnJheS5mcm9tYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJTkNPUlJFQ1RfSVRFUkFUSU9OIH0sIHtcbiAgZnJvbTogZnJvbVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5mcm9tJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5BcnJheS5mcm9tO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2FycmF5L2Zyb20nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2FycmF5L2Zyb21cIik7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIGZhY3RvcmllcyA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24gKEMsIGFyZ3NMZW5ndGgsIGFyZ3MpIHtcbiAgaWYgKCEoYXJnc0xlbmd0aCBpbiBmYWN0b3JpZXMpKSB7XG4gICAgZm9yICh2YXIgbGlzdCA9IFtdLCBpID0gMDsgaSA8IGFyZ3NMZW5ndGg7IGkrKykgbGlzdFtpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgIGZhY3Rvcmllc1thcmdzTGVuZ3RoXSA9IEZ1bmN0aW9uKCdDLGEnLCAncmV0dXJuIG5ldyBDKCcgKyBsaXN0LmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1thcmdzTGVuZ3RoXShDLCBhcmdzKTtcbn07XG5cbi8vIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qICwgLi4uYXJncyAqLykge1xuICB2YXIgZm4gPSBhRnVuY3Rpb24odGhpcyk7XG4gIHZhciBwYXJ0QXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kRnVuY3Rpb24gPSBmdW5jdGlvbiBib3VuZCgvKiBhcmdzLi4uICovKSB7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGJvdW5kRnVuY3Rpb24gPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9O1xuICBpZiAoaXNPYmplY3QoZm4ucHJvdG90eXBlKSkgYm91bmRGdW5jdGlvbi5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZEZ1bmN0aW9uO1xufTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZCcpO1xuXG4vLyBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1mdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuJCh7IHRhcmdldDogJ0Z1bmN0aW9uJywgcHJvdG86IHRydWUgfSwge1xuICBiaW5kOiBiaW5kXG59KTtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1IpIHtcbiAgcmV0dXJuIHBhdGhbQ09OU1RSVUNUT1IgKyAnUHJvdG90eXBlJ107XG59O1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5mdW5jdGlvbi5iaW5kJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0Z1bmN0aW9uJykuYmluZDtcbiIsInZhciBiaW5kID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vdmlydHVhbC9iaW5kJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmJpbmQ7XG4gIHJldHVybiBpdCA9PT0gRnVuY3Rpb25Qcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgb3duID09PSBGdW5jdGlvblByb3RvdHlwZS5iaW5kKSA/IGJpbmQgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2JpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2JpbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvcicpO1xuXG52YXIgQVJSQVlfSVRFUkFUT1IgPSAnQXJyYXkgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoQVJSQVlfSVRFUkFUT1IpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZW50cmllc1xuLy8gYEFycmF5LnByb3RvdHlwZS5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmtleXNcbi8vIGBBcnJheS5wcm90b3R5cGUudmFsdWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnZhbHVlc1xuLy8gYEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4vLyBgQ3JlYXRlQXJyYXlJdGVyYXRvcmAgaW50ZXJuYWwgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZWFycmF5aXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lSXRlcmF0b3IoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBBUlJBWV9JVEVSQVRPUixcbiAgICB0YXJnZXQ6IHRvSW5kZXhlZE9iamVjdChpdGVyYXRlZCksIC8vIHRhcmdldFxuICAgIGluZGV4OiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICAgIGtpbmQ6IGtpbmQgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2luZFxuICB9KTtcbi8vIGAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciB0YXJnZXQgPSBzdGF0ZS50YXJnZXQ7XG4gIHZhciBraW5kID0gc3RhdGUua2luZDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4geyB2YWx1ZTogaW5kZXgsIGRvbmU6IGZhbHNlIH07XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4geyB2YWx1ZTogdGFyZ2V0W2luZGV4XSwgZG9uZTogZmFsc2UgfTtcbiAgcmV0dXJuIHsgdmFsdWU6IFtpbmRleCwgdGFyZ2V0W2luZGV4XV0sIGRvbmU6IGZhbHNlIH07XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVtYXBwZWRhcmd1bWVudHNvYmplY3Rcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuIiwiLy8gaXRlcmFibGUgRE9NIGNvbGxlY3Rpb25zXG4vLyBmbGFnIC0gYGl0ZXJhYmxlYCBpbnRlcmZhY2UgLSAnZW50cmllcycsICdrZXlzJywgJ3ZhbHVlcycsICdmb3JFYWNoJyBtZXRob2RzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ1NTUnVsZUxpc3Q6IDAsXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IDAsXG4gIENTU1ZhbHVlTGlzdDogMCxcbiAgQ2xpZW50UmVjdExpc3Q6IDAsXG4gIERPTVJlY3RMaXN0OiAwLFxuICBET01TdHJpbmdMaXN0OiAwLFxuICBET01Ub2tlbkxpc3Q6IDEsXG4gIERhdGFUcmFuc2Zlckl0ZW1MaXN0OiAwLFxuICBGaWxlTGlzdDogMCxcbiAgSFRNTEFsbENvbGxlY3Rpb246IDAsXG4gIEhUTUxDb2xsZWN0aW9uOiAwLFxuICBIVE1MRm9ybUVsZW1lbnQ6IDAsXG4gIEhUTUxTZWxlY3RFbGVtZW50OiAwLFxuICBNZWRpYUxpc3Q6IDAsXG4gIE1pbWVUeXBlQXJyYXk6IDAsXG4gIE5hbWVkTm9kZU1hcDogMCxcbiAgTm9kZUxpc3Q6IDEsXG4gIFBhaW50UmVxdWVzdExpc3Q6IDAsXG4gIFBsdWdpbjogMCxcbiAgUGx1Z2luQXJyYXk6IDAsXG4gIFNWR0xlbmd0aExpc3Q6IDAsXG4gIFNWR051bWJlckxpc3Q6IDAsXG4gIFNWR1BhdGhTZWdMaXN0OiAwLFxuICBTVkdQb2ludExpc3Q6IDAsXG4gIFNWR1N0cmluZ0xpc3Q6IDAsXG4gIFNWR1RyYW5zZm9ybUxpc3Q6IDAsXG4gIFNvdXJjZUJ1ZmZlckxpc3Q6IDAsXG4gIFN0eWxlU2hlZXRMaXN0OiAwLFxuICBUZXh0VHJhY2tDdWVMaXN0OiAwLFxuICBUZXh0VHJhY2tMaXN0OiAwLFxuICBUb3VjaExpc3Q6IDBcbn07XG4iLCJyZXF1aXJlKCcuL2VzLmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSAmJiBjbGFzc29mKENvbGxlY3Rpb25Qcm90b3R5cGUpICE9PSBUT19TVFJJTkdfVEFHKSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIENPTExFQ1RJT05fTkFNRSk7XG4gIH1cbiAgSXRlcmF0b3JzW0NPTExFQ1RJT05fTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG4vLyBgSXNBcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY2xhc3NvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gW10ucHVzaDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4LCBmaWx0ZXJPdXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgSVNfRklMVEVSX09VVCA9IFRZUEUgPT0gNztcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSIHx8IElTX0ZJTFRFUl9PVVQgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWx1ZSwgcmVzdWx0O1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsdWUgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlc3VsdCA9IGJvdW5kRnVuY3Rpb24odmFsdWUsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHRhcmdldFtpbmRleF0gPSByZXN1bHQ7IC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsdWU7ICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlclxuICAgICAgICB9IGVsc2Ugc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSA0OiByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICAgICAgY2FzZSA3OiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlck91dFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4gIG1hcDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5ldmVyeVxuICBldmVyeTogY3JlYXRlTWV0aG9kKDQpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyT3V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtYXJyYXktZmlsdGVyaW5nXG4gIGZpbHRlck91dDogY3JlYXRlTWV0aG9kKDcpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwsbm8tdGhyb3ctbGl0ZXJhbFxuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgY2FjaGUgPSB7fTtcblxudmFyIHRocm93ZXIgPSBmdW5jdGlvbiAoaXQpIHsgdGhyb3cgaXQ7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBvcHRpb25zKSB7XG4gIGlmIChoYXMoY2FjaGUsIE1FVEhPRF9OQU1FKSkgcmV0dXJuIGNhY2hlW01FVEhPRF9OQU1FXTtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHZhciBBQ0NFU1NPUlMgPSBoYXMob3B0aW9ucywgJ0FDQ0VTU09SUycpID8gb3B0aW9ucy5BQ0NFU1NPUlMgOiBmYWxzZTtcbiAgdmFyIGFyZ3VtZW50MCA9IGhhcyhvcHRpb25zLCAwKSA/IG9wdGlvbnNbMF0gOiB0aHJvd2VyO1xuICB2YXIgYXJndW1lbnQxID0gaGFzKG9wdGlvbnMsIDEpID8gb3B0aW9uc1sxXSA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gY2FjaGVbTUVUSE9EX05BTUVdID0gISFtZXRob2QgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoQUNDRVNTT1JTICYmICFERVNDUklQVE9SUykgcmV0dXJuIHRydWU7XG4gICAgdmFyIE8gPSB7IGxlbmd0aDogLTEgfTtcblxuICAgIGlmIChBQ0NFU1NPUlMpIGRlZmluZVByb3BlcnR5KE8sIDEsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiB0aHJvd2VyIH0pO1xuICAgIGVsc2UgT1sxXSA9IDE7XG5cbiAgICBtZXRob2QuY2FsbChPLCBhcmd1bWVudDAsIGFyZ3VtZW50MSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2ZvckVhY2gnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdmb3JFYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG5tb2R1bGUuZXhwb3J0cyA9ICghU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEgpID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2gnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5mb3JFYWNoO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uLy4uL2VzL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9mb3ItZWFjaCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG52YXIgRE9NSXRlcmFibGVzID0ge1xuICBET01Ub2tlbkxpc3Q6IHRydWUsXG4gIE5vZGVMaXN0OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuZm9yRWFjaDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmZvckVhY2gpXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIHx8IERPTUl0ZXJhYmxlcy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKGl0KSkgPyBmb3JFYWNoIDogb3duO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2hcIik7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgbmF0aXZlSW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbnZhciBORUdBVElWRV9aRVJPID0gISFuYXRpdmVJbmRleE9mICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdpbmRleE9mJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnaW5kZXhPZicsIHsgQUNDRVNTT1JTOiB0cnVlLCAxOiAwIH0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5pbmRleE9mO1xuIiwidmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2luZGV4LW9mJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmluZGV4T2Y7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5pbmRleE9mKSA/IGluZGV4T2YgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2luZGV4LW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9pbmRleC1vZlwiKTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSArIG1hdGNoWzFdO1xufSBlbHNlIGlmICh1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb24gJiYgK3ZlcnNpb247XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuICAvLyBkZW9wdGltaXphdGlvbiBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc3XG4gIHJldHVybiBWOF9WRVJTSU9OID49IDUxIHx8ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gYXJyYXkuY29uc3RydWN0b3IgPSB7fTtcbiAgICBjb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGZvbzogMSB9O1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5W01FVEhPRF9OQU1FXShCb29sZWFuKS5mb28gIT09IDE7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NwbGljZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NwbGljZScsIHsgQUNDRVNTT1JTOiB0cnVlLCAwOiAwLCAxOiAyIH0pO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgbGVuZ3RoIGV4Y2VlZGVkJztcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zcGxpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc3BsaWNlXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgc3BsaWNlOiBmdW5jdGlvbiBzcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50IC8qICwgLi4uaXRlbXMgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGFjdHVhbFN0YXJ0ID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICAgIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBpbnNlcnRDb3VudCwgYWN0dWFsRGVsZXRlQ291bnQsIEEsIGssIGZyb20sIHRvO1xuICAgIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDApIHtcbiAgICAgIGluc2VydENvdW50ID0gYWN0dWFsRGVsZXRlQ291bnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAxKSB7XG4gICAgICBpbnNlcnRDb3VudCA9IDA7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IGxlbiAtIGFjdHVhbFN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRDb3VudCA9IGFyZ3VtZW50c0xlbmd0aCAtIDI7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IG1pbihtYXgodG9JbnRlZ2VyKGRlbGV0ZUNvdW50KSwgMCksIGxlbiAtIGFjdHVhbFN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGxlbiArIGluc2VydENvdW50IC0gYWN0dWFsRGVsZXRlQ291bnQgPiBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCk7XG4gICAgfVxuICAgIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgYWN0dWFsRGVsZXRlQ291bnQpO1xuICAgIGZvciAoayA9IDA7IGsgPCBhY3R1YWxEZWxldGVDb3VudDsgaysrKSB7XG4gICAgICBmcm9tID0gYWN0dWFsU3RhcnQgKyBrO1xuICAgICAgaWYgKGZyb20gaW4gTykgY3JlYXRlUHJvcGVydHkoQSwgaywgT1tmcm9tXSk7XG4gICAgfVxuICAgIEEubGVuZ3RoID0gYWN0dWFsRGVsZXRlQ291bnQ7XG4gICAgaWYgKGluc2VydENvdW50IDwgYWN0dWFsRGVsZXRlQ291bnQpIHtcbiAgICAgIGZvciAoayA9IGFjdHVhbFN0YXJ0OyBrIDwgbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsrKykge1xuICAgICAgICBmcm9tID0gayArIGFjdHVhbERlbGV0ZUNvdW50O1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudDtcbiAgICAgICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIH1cbiAgICAgIGZvciAoayA9IGxlbjsgayA+IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7IGstLSkgZGVsZXRlIE9bayAtIDFdO1xuICAgIH0gZWxzZSBpZiAoaW5zZXJ0Q291bnQgPiBhY3R1YWxEZWxldGVDb3VudCkge1xuICAgICAgZm9yIChrID0gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsgPiBhY3R1YWxTdGFydDsgay0tKSB7XG4gICAgICAgIGZyb20gPSBrICsgYWN0dWFsRGVsZXRlQ291bnQgLSAxO1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudCAtIDE7XG4gICAgICAgIGlmIChmcm9tIGluIE8pIE9bdG9dID0gT1tmcm9tXTtcbiAgICAgICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoayA9IDA7IGsgPCBpbnNlcnRDb3VudDsgaysrKSB7XG4gICAgICBPW2sgKyBhY3R1YWxTdGFydF0gPSBhcmd1bWVudHNbayArIDJdO1xuICAgIH1cbiAgICBPLmxlbmd0aCA9IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zcGxpY2UnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5zcGxpY2U7XG4iLCJ2YXIgc3BsaWNlID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9zcGxpY2UnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuc3BsaWNlO1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEFycmF5ICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuc3BsaWNlKSA/IHNwbGljZSA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2Uvc3BsaWNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zcGxpY2VcIik7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBvYmplY3REZWZpbmVQcm9wZXJ0eU1vZGlsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFERVNDUklQVE9SUywgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgZGVmaW5lUHJvcGVydHk6IG9iamVjdERlZmluZVByb3BlcnR5TW9kaWxlLmZcbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbnZhciBPYmplY3QgPSBwYXRoLk9iamVjdDtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5LnNoYW0pIGRlZmluZVByb3BlcnR5LnNoYW0gPSB0cnVlO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTsiLCJ2YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICBfT2JqZWN0JGRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29uY2F0XG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAaXNDb25jYXRTcHJlYWRhYmxlIGFuZCBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KGFyZykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCAwKTtcbiAgICB2YXIgbiA9IDA7XG4gICAgdmFyIGksIGssIGxlbmd0aCwgbGVuLCBFO1xuICAgIGZvciAoaSA9IC0xLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIEUgPSBpID09PSAtMSA/IE8gOiBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoaXNDb25jYXRTcHJlYWRhYmxlKEUpKSB7XG4gICAgICAgIGxlbiA9IHRvTGVuZ3RoKEUubGVuZ3RoKTtcbiAgICAgICAgaWYgKG4gKyBsZW4gPiBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IGxlbjsgaysrLCBuKyspIGlmIChrIGluIEUpIGNyZWF0ZVByb3BlcnR5KEEsIG4sIEVba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG4gPj0gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KEEsIG4rKywgRSk7XG4gICAgICB9XG4gICAgfVxuICAgIEEubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmNvbmNhdDtcbiIsInZhciBjb25jYXQgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2NvbmNhdCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5jb25jYXQ7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5jb25jYXQpID8gY29uY2F0IDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9jb25jYXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2NvbmNhdFwiKTsiLCJ2YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb24ge1xuICAgIHJ1biA9IDA7XG4gICAgY29uc3RydWN0b3IoZWwpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgIH1cblxuICAgIGFuaW1hdGUob3B0aW9ucyA9IHt9LCBjYWxsYmFjayA9ICgpID0+IHt9KSB7XG4gICAgICAgIGNvbnN0IHggPSBvcHRpb25zLnggPz8gMDtcbiAgICAgICAgY29uc3QgeSA9IG9wdGlvbnMueSA/PyAwO1xuICAgICAgICBjb25zdCBzY2FsZSA9IG9wdGlvbnMuc2NhbGUgPz8gMTtcbiAgICAgICAgY29uc3QgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmcgPz8gJ2Vhc2Utb3V0JztcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uID8/IDA7XG4gICAgICAgIGNvbnN0IHJ1biA9ICsrdGhpcy5ydW47XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eH0pIHRyYW5zbGF0ZVkoJHt5fSkgc2NhbGUoJHtzY2FsZX0pYDtcblxuICAgICAgICBpZiAodGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPT09IHRyYW5zZm9ybSkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSBlbHNlIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChydW4gIT09IHRoaXMucnVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0cmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdHJhbnNpdGlvbkVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zaXRpb24gPSBgdHJhbnNmb3JtICR7ZWFzaW5nfSAke2R1cmF0aW9ufW1zYDtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG5cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgJy4vcGFnZV9zcHJlYWQuc3R5bCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VTcHJlYWQge1xuICAgIHZpc2liaWxpdHkgPSAnZ29uZSc7XG4gICAgcG9zaXRpb25lZCA9IGZhbHNlO1xuICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5vcHRpb25zLmlkO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLm9wdGlvbnMudHlwZTtcbiAgICAgICAgdGhpcy5wYWdlSWRzID0gdGhpcy5vcHRpb25zLnBhZ2VJZHM7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGg7XG4gICAgICAgIHRoaXMubGVmdCA9IHRoaXMub3B0aW9ucy5sZWZ0O1xuICAgICAgICB0aGlzLm1heFpvb21TY2FsZSA9IHRoaXMub3B0aW9ucy5tYXhab29tU2NhbGU7XG4gICAgfVxuXG4gICAgaXNab29tYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuZ2V0TWF4Wm9vbVNjYWxlKCkgPiAxICYmXG4gICAgICAgICAgICB0aGlzLmdldEVsKCkuZ2V0QXR0cmlidXRlKCdkYXRhLXpvb21hYmxlJykgIT09ICdmYWxzZSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpc1Njcm9sbGFibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsKCkuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJzby0tc2Nyb2xsYWJsZScpO1xuICAgIH1cblxuICAgIGdldEVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICB9XG5cbiAgICBnZXRPdmVybGF5RWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbCgpLnF1ZXJ5U2VsZWN0b3JBbGwoJy52ZXJzb19fb3ZlcmxheScpO1xuICAgIH1cblxuICAgIGdldFBhZ2VFbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsKCkucXVlcnlTZWxlY3RvckFsbCgnLnZlcnNvX19wYWdlJyk7XG4gICAgfVxuXG4gICAgZ2V0UmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWwoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50UmVjdCgpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHtcbiAgICAgICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgICAgIGxlZnQ6IG51bGwsXG4gICAgICAgICAgICByaWdodDogbnVsbCxcbiAgICAgICAgICAgIGJvdHRvbTogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgcGFnZUVsIG9mIEFycmF5LmZyb20odGhpcy5nZXRQYWdlRWxzKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlUmVjdCA9IHBhZ2VFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgaWYgKHBhZ2VSZWN0LnRvcCA8IHJlY3QudG9wIHx8IHJlY3QudG9wID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZWN0LnRvcCA9IHBhZ2VSZWN0LnRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYWdlUmVjdC5sZWZ0IDwgcmVjdC5sZWZ0IHx8IHJlY3QubGVmdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0ID0gcGFnZVJlY3QubGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYWdlUmVjdC5yaWdodCA+IHJlY3QucmlnaHQgfHwgcmVjdC5yaWdodCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVjdC5yaWdodCA9IHBhZ2VSZWN0LnJpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhZ2VSZWN0LmJvdHRvbSA+IHJlY3QuYm90dG9tIHx8IHJlY3QuYm90dG9tID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZWN0LmJvdHRvbSA9IHBhZ2VSZWN0LmJvdHRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlY3QudG9wID0gcmVjdC50b3AgPz8gMDtcbiAgICAgICAgcmVjdC5sZWZ0ID0gcmVjdC5sZWZ0ID8/IDA7XG4gICAgICAgIHJlY3QucmlnaHQgPSByZWN0LnJpZ2h0ID8/IDA7XG4gICAgICAgIHJlY3QuYm90dG9tID0gcmVjdC5ib3R0b20gPz8gMDtcbiAgICAgICAgcmVjdC53aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnQ7XG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcDtcblxuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICB9XG5cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQYWdlSWRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlSWRzO1xuICAgIH1cblxuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBnZXRMZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICAgIH1cblxuICAgIGdldE1heFpvb21TY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4Wm9vbVNjYWxlO1xuICAgIH1cblxuICAgIGdldFZpc2liaWxpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2liaWxpdHk7XG4gICAgfVxuXG4gICAgc2V0VmlzaWJpbGl0eSh2aXNpYmlsaXR5KSB7XG4gICAgICAgIGlmICh0aGlzLnZpc2liaWxpdHkgIT09IHZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWwoKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID09PSAndmlzaWJsZScgPyAnYmxvY2snIDogJ25vbmUnO1xuXG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmdldEVsKCkuc3R5bGUubGVmdCA9IGAke3RoaXMuZ2V0TGVmdCgpfSVgO1xuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nZXRFbCgpLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnLCB0aGlzLmFjdGl2ZSk7XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRFbCgpLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnLCB0aGlzLmFjdGl2ZSk7XG4gICAgfVxufVxuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIURFU0NSSVBUT1JTLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBkZWZpbmVQcm9wZXJ0aWVzOiBkZWZpbmVQcm9wZXJ0aWVzXG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbnZhciBPYmplY3QgPSBwYXRoLk9iamVjdDtcblxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoVCwgRCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVCwgRCk7XG59O1xuXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnRpZXMuc2hhbSkgZGVmaW5lUHJvcGVydGllcy5zaGFtID0gdHJ1ZTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9kZWZpbmUtcHJvcGVydGllc1wiKTsiLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb3duS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vd24ta2V5cycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmplY3QpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICAgIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgICB2YXIga2V5cyA9IG93bktleXMoTyk7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGtleSwgZGVzY3JpcHRvcjtcbiAgICB3aGlsZSAoa2V5cy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBrZXkgPSBrZXlzW2luZGV4KytdKTtcbiAgICAgIGlmIChkZXNjcmlwdG9yICE9PSB1bmRlZmluZWQpIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycztcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnNcIik7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcigxKTsgfSk7XG52YXIgRk9SQ0VEID0gIURFU0NSSVBUT1JTIHx8IEZBSUxTX09OX1BSSU1JVElWRVM7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VELCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcih0b0luZGV4ZWRPYmplY3QoaXQpLCBrZXkpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG52YXIgT2JqZWN0ID0gcGF0aC5PYmplY3Q7XG5cbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xufTtcblxuaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iuc2hhbSkgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLnNoYW0gPSB0cnVlO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIik7IiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nXG4gICAgPyBnZXRXaW5kb3dOYW1lcyhpdClcbiAgICA6IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXModG9JbmRleGVkT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG5leHBvcnRzLmYgPSB3ZWxsS25vd25TeW1ib2w7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FKSB7XG4gIHZhciBTeW1ib2wgPSBwYXRoLlN5bWJvbCB8fCAocGF0aC5TeW1ib2wgPSB7fSk7XG4gIGlmICghaGFzKFN5bWJvbCwgTkFNRSkpIGRlZmluZVByb3BlcnR5KFN5bWJvbCwgTkFNRSwge1xuICAgIHZhbHVlOiB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYoTkFNRSlcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBuYXRpdmVPYmplY3RDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLWV4dGVybmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG5cbnZhciBISURERU4gPSBzaGFyZWRLZXkoJ2hpZGRlbicpO1xudmFyIFNZTUJPTCA9ICdTeW1ib2wnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNZTUJPTCk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJHN0cmluZ2lmeSA9IGdldEJ1aWx0SW4oJ0pTT04nLCAnc3RyaW5naWZ5Jyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZjtcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvdHlwZVN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXRvLXN0cmluZy1yZWdpc3RyeScpO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgVVNFX1NFVFRFUiA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RDcmVhdGUobmF0aXZlRGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgdmFyIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCBQKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpIGRlbGV0ZSBPYmplY3RQcm90b3R5cGVbUF07XG4gIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciAmJiBPICE9PSBPYmplY3RQcm90b3R5cGUpIHtcbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90b3R5cGUsIFAsIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpO1xuICB9XG59IDogbmF0aXZlRGVmaW5lUHJvcGVydHk7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZywgZGVzY3JpcHRpb24pIHtcbiAgdmFyIHN5bWJvbCA9IEFsbFN5bWJvbHNbdGFnXSA9IG5hdGl2ZU9iamVjdENyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzZXRJbnRlcm5hbFN0YXRlKHN5bWJvbCwge1xuICAgIHR5cGU6IFNZTUJPTCxcbiAgICB0YWc6IHRhZyxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cbiAgfSk7XG4gIGlmICghREVTQ1JJUFRPUlMpIHN5bWJvbC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gc3ltYm9sO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChpdCkgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgaWYgKE8gPT09IE9iamVjdFByb3RvdHlwZSkgJGRlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFAsIEF0dHJpYnV0ZXMpO1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFBdHRyaWJ1dGVzLmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKE8sIEhJRERFTikpIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIEhJRERFTiwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHt9KSk7XG4gICAgICBPW0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoTywgSElEREVOKSAmJiBPW0hJRERFTl1ba2V5XSkgT1tISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSBuYXRpdmVPYmplY3RDcmVhdGUoQXR0cmlidXRlcywgeyBlbnVtZXJhYmxlOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2NyaXB0b3IoTywga2V5LCBBdHRyaWJ1dGVzKTtcbiAgfSByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywga2V5LCBBdHRyaWJ1dGVzKTtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIHByb3BlcnRpZXMgPSB0b0luZGV4ZWRPYmplY3QoUHJvcGVydGllcyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhwcm9wZXJ0aWVzKS5jb25jYXQoJGdldE93blByb3BlcnR5U3ltYm9scyhwcm9wZXJ0aWVzKSk7XG4gICRmb3JFYWNoKGtleXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIURFU0NSSVBUT1JTIHx8ICRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHByb3BlcnRpZXMsIGtleSkpICRkZWZpbmVQcm9wZXJ0eShPLCBrZXksIHByb3BlcnRpZXNba2V5XSk7XG4gIH0pO1xuICByZXR1cm4gTztcbn07XG5cbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IG5hdGl2ZU9iamVjdENyZWF0ZShPKSA6ICRkZWZpbmVQcm9wZXJ0aWVzKG5hdGl2ZU9iamVjdENyZWF0ZShPKSwgUHJvcGVydGllcyk7XG59O1xuXG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgUCA9IHRvUHJpbWl0aXZlKFYsIHRydWUpO1xuICB2YXIgZW51bWVyYWJsZSA9IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGhpcywgUCk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIFApICYmICFoYXMoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGVudW1lcmFibGUgfHwgIWhhcyh0aGlzLCBQKSB8fCAhaGFzKEFsbFN5bWJvbHMsIFApIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtQXSA/IGVudW1lcmFibGUgOiB0cnVlO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICB2YXIgaXQgPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBkZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvciAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSB7XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoaGlkZGVuS2V5cywga2V5KSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhPKSB7XG4gIHZhciBJU19PQkpFQ1RfUFJPVE9UWVBFID0gTyA9PT0gT2JqZWN0UHJvdG90eXBlO1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKElTX09CSkVDVF9QUk9UT1RZUEUgPyBPYmplY3RQcm90b3R5cGVTeW1ib2xzIDogdG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSAmJiAoIUlTX09CSkVDVF9QUk9UT1RZUEUgfHwgaGFzKE9iamVjdFByb3RvdHlwZSwga2V5KSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIGBTeW1ib2xgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC1jb25zdHJ1Y3RvclxuaWYgKCFOQVRJVkVfU1lNQk9MKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHZhciBkZXNjcmlwdGlvbiA9ICFhcmd1bWVudHMubGVuZ3RoIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogU3RyaW5nKGFyZ3VtZW50c1swXSk7XG4gICAgdmFyIHRhZyA9IHVpZChkZXNjcmlwdGlvbik7XG4gICAgdmFyIHNldHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSkgc2V0dGVyLmNhbGwoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjcmlwdG9yKHRoaXMsIHRhZywgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgVVNFX1NFVFRFUikgc2V0U3ltYm9sRGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogc2V0dGVyIH0pO1xuICAgIHJldHVybiB3cmFwKHRhZywgZGVzY3JpcHRpb24pO1xuICB9O1xuXG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykudGFnO1xuICB9KTtcblxuICByZWRlZmluZSgkU3ltYm9sLCAnd2l0aG91dFNldHRlcicsIGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiB3cmFwKHVpZChkZXNjcmlwdGlvbiksIGRlc2NyaXB0aW9uKTtcbiAgfSk7XG5cbiAgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3ZWxsS25vd25TeW1ib2wobmFtZSksIG5hbWUpO1xuICB9O1xuXG4gIGlmIChERVNDUklQVE9SUykge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLVN5bWJvbC1kZXNjcmlwdGlvblxuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgJ2Rlc2NyaXB0aW9uJywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBkZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykuZGVzY3JpcHRpb247XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFJU19QVVJFKSB7XG4gICAgICByZWRlZmluZShPYmplY3RQcm90b3R5cGUsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgeyB1bnNhZmU6IHRydWUgfSk7XG4gICAgfVxuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgU3ltYm9sOiAkU3ltYm9sXG59KTtcblxuJGZvckVhY2gob2JqZWN0S2V5cyhXZWxsS25vd25TeW1ib2xzU3RvcmUpLCBmdW5jdGlvbiAobmFtZSkge1xuICBkZWZpbmVXZWxsS25vd25TeW1ib2wobmFtZSk7XG59KTtcblxuJCh7IHRhcmdldDogU1lNQk9MLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYFN5bWJvbC5mb3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5mb3JcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKGtleSk7XG4gICAgaWYgKGhhcyhTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5LCBzdHJpbmcpKSByZXR1cm4gU3RyaW5nVG9TeW1ib2xSZWdpc3RyeVtzdHJpbmddO1xuICAgIHZhciBzeW1ib2wgPSAkU3ltYm9sKHN0cmluZyk7XG4gICAgU3RyaW5nVG9TeW1ib2xSZWdpc3RyeVtzdHJpbmddID0gc3ltYm9sO1xuICAgIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltYm9sXSA9IHN0cmluZztcbiAgICByZXR1cm4gc3ltYm9sO1xuICB9LFxuICAvLyBgU3ltYm9sLmtleUZvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmtleWZvclxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuICAgIGlmIChoYXMoU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSwgc3ltKSkgcmV0dXJuIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltXTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IFVTRV9TRVRURVIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IGZhbHNlOyB9XG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIC8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yc1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Jcbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlzeW1ib2xzXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIENocm9tZSAzOCBhbmQgMzkgYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIGZhaWxzIG9uIHByaW1pdGl2ZXNcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM0NDNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IGZhaWxzKGZ1bmN0aW9uICgpIHsgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYoMSk7IH0pIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYodG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG5cbi8vIGBKU09OLnN0cmluZ2lmeWAgbWV0aG9kIGJlaGF2aW9yIHdpdGggc3ltYm9sc1xuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1qc29uLnN0cmluZ2lmeVxuaWYgKCRzdHJpbmdpZnkpIHtcbiAgdmFyIEZPUkNFRF9KU09OX1NUUklOR0lGWSA9ICFOQVRJVkVfU1lNQk9MIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3ltYm9sID0gJFN5bWJvbCgpO1xuICAgIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gICAgcmV0dXJuICRzdHJpbmdpZnkoW3N5bWJvbF0pICE9ICdbbnVsbF0nXG4gICAgICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgICAgIHx8ICRzdHJpbmdpZnkoeyBhOiBzeW1ib2wgfSkgIT0gJ3t9J1xuICAgICAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgICAgIHx8ICRzdHJpbmdpZnkoT2JqZWN0KHN5bWJvbCkpICE9ICd7fSc7XG4gIH0pO1xuXG4gICQoeyB0YXJnZXQ6ICdKU09OJywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRURfSlNPTl9TVFJJTkdJRlkgfSwge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0LCByZXBsYWNlciwgc3BhY2UpIHtcbiAgICAgIHZhciBhcmdzID0gW2l0XTtcbiAgICAgIHZhciBpbmRleCA9IDE7XG4gICAgICB2YXIgJHJlcGxhY2VyO1xuICAgICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpbmRleCkgYXJncy5wdXNoKGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgICAkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICAgIGlmICghaXNBcnJheShyZXBsYWNlcikpIHJlcGxhY2VyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAkcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgICByZXR1cm4gJHN0cmluZ2lmeS5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUtQEB0b3ByaW1pdGl2ZVxuaWYgKCEkU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSkge1xuICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbn1cbi8vIGBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddYCBwcm9wZXJ0eVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsIFNZTUJPTCk7XG5cbmhpZGRlbktleXNbSElEREVOXSA9IHRydWU7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzXCIpOyIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIG5hdGl2ZUtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgRkFJTFNfT05fUFJJTUlUSVZFUyA9IGZhaWxzKGZ1bmN0aW9uICgpIHsgbmF0aXZlS2V5cygxKTsgfSk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGQUlMU19PTl9QUklNSVRJVkVTIH0sIHtcbiAga2V5czogZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3Qua2V5cycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmtleXM7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9rZXlzXCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgYXJndW1lbnQpIHtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsLG5vLXRocm93LWxpdGVyYWxcbiAgICBtZXRob2QuY2FsbChudWxsLCBhcmd1bWVudCB8fCBmdW5jdGlvbiAoKSB7IHRocm93IDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBuYXRpdmVKb2luID0gW10uam9pbjtcblxudmFyIEVTM19TVFJJTkdTID0gSW5kZXhlZE9iamVjdCAhPSBPYmplY3Q7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2pvaW4nLCAnLCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmpvaW5gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuam9pblxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRVMzX1NUUklOR1MgfHwgIVNUUklDVF9NRVRIT0QgfSwge1xuICBqb2luOiBmdW5jdGlvbiBqb2luKHNlcGFyYXRvcikge1xuICAgIHJldHVybiBuYXRpdmVKb2luLmNhbGwodG9JbmRleGVkT2JqZWN0KHRoaXMpLCBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCA/ICcsJyA6IHNlcGFyYXRvcik7XG4gIH1cbn0pO1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgcmVwbGFjZSA9ICcnLnJlcGxhY2U7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFMgPSAvXFwkKFskJidgXXxcXGRcXGQ/fDxbXj5dKj4pL2c7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQgPSAvXFwkKFskJidgXXxcXGRcXGQ/KS9nO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldHN1YnN0aXR1dGlvblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWF0Y2hlZCwgc3RyLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VtZW50KSB7XG4gIHZhciB0YWlsUG9zID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgdmFyIG0gPSBjYXB0dXJlcy5sZW5ndGg7XG4gIHZhciBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQ7XG4gIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBuYW1lZENhcHR1cmVzID0gdG9PYmplY3QobmFtZWRDYXB0dXJlcyk7XG4gICAgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTO1xuICB9XG4gIHJldHVybiByZXBsYWNlLmNhbGwocmVwbGFjZW1lbnQsIHN5bWJvbHMsIGZ1bmN0aW9uIChtYXRjaCwgY2gpIHtcbiAgICB2YXIgY2FwdHVyZTtcbiAgICBzd2l0Y2ggKGNoLmNoYXJBdCgwKSkge1xuICAgICAgY2FzZSAnJCc6IHJldHVybiAnJCc7XG4gICAgICBjYXNlICcmJzogcmV0dXJuIG1hdGNoZWQ7XG4gICAgICBjYXNlICdgJzogcmV0dXJuIHN0ci5zbGljZSgwLCBwb3NpdGlvbik7XG4gICAgICBjYXNlIFwiJ1wiOiByZXR1cm4gc3RyLnNsaWNlKHRhaWxQb3MpO1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIGNhcHR1cmUgPSBuYW1lZENhcHR1cmVzW2NoLnNsaWNlKDEsIC0xKV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gXFxkXFxkP1xuICAgICAgICB2YXIgbiA9ICtjaDtcbiAgICAgICAgaWYgKG4gPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgaWYgKG4gPiBtKSB7XG4gICAgICAgICAgdmFyIGYgPSBmbG9vcihuIC8gMTApO1xuICAgICAgICAgIGlmIChmID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgaWYgKGYgPD0gbSkgcmV0dXJuIGNhcHR1cmVzW2YgLSAxXSA9PT0gdW5kZWZpbmVkID8gY2guY2hhckF0KDEpIDogY2FwdHVyZXNbZiAtIDFdICsgY2guY2hhckF0KDEpO1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlID0gY2FwdHVyZXNbbiAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gY2FwdHVyZSA9PT0gdW5kZWZpbmVkID8gJycgOiBjYXB0dXJlO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciBnZXRTdWJzdGl0dXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LXN1YnN0aXR1dGlvbicpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ3JlcGxhY2UnLCAyLCBmdW5jdGlvbiAoUkVQTEFDRSwgbmF0aXZlUmVwbGFjZSwgbWF5YmVDYWxsTmF0aXZlLCByZWFzb24pIHtcbiAgdmFyIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID0gcmVhc29uLlJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFO1xuICB2YXIgUkVQTEFDRV9LRUVQU18kMCA9IHJlYXNvbi5SRVBMQUNFX0tFRVBTXyQwO1xuICB2YXIgVU5TQUZFX1NVQlNUSVRVVEUgPSBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA/ICckJyA6ICckMCc7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucmVwbGFjZVxuICAgIGZ1bmN0aW9uIHJlcGxhY2Uoc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgICAgdmFyIHJlcGxhY2VyID0gc2VhcmNoVmFsdWUgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VhcmNoVmFsdWVbUkVQTEFDRV07XG4gICAgICByZXR1cm4gcmVwbGFjZXIgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHJlcGxhY2VyLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgICAgOiBuYXRpdmVSZXBsYWNlLmNhbGwoU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAocmVnZXhwLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKCFSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSAmJiBSRVBMQUNFX0tFRVBTXyQwKSB8fFxuICAgICAgICAodHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVwbGFjZVZhbHVlLmluZGV4T2YoVU5TQUZFX1NVQlNUSVRVVEUpID09PSAtMSlcbiAgICAgICkge1xuICAgICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZVJlcGxhY2UsIHJlZ2V4cCwgdGhpcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG5cbiAgICAgIHZhciBmdW5jdGlvbmFsUmVwbGFjZSA9IHR5cGVvZiByZXBsYWNlVmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgICBpZiAoIWZ1bmN0aW9uYWxSZXBsYWNlKSByZXBsYWNlVmFsdWUgPSBTdHJpbmcocmVwbGFjZVZhbHVlKTtcblxuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICBpZiAoIWdsb2JhbCkgYnJlYWs7XG5cbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgICB2YXIgbWF0Y2hlZCA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBtYXgobWluKHRvSW50ZWdlcihyZXN1bHQuaW5kZXgpLCBTLmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgY2FwdHVyZXMgPSBbXTtcbiAgICAgICAgLy8gTk9URTogVGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgY2FwdHVyZXMgPSByZXN1bHQuc2xpY2UoMSkubWFwKG1heWJlVG9TdHJpbmcpXG4gICAgICAgIC8vIGJ1dCBmb3Igc29tZSByZWFzb24gYG5hdGl2ZVNsaWNlLmNhbGwocmVzdWx0LCAxLCByZXN1bHQubGVuZ3RoKWAgKGNhbGxlZCBpblxuICAgICAgICAvLyB0aGUgc2xpY2UgcG9seWZpbGwgd2hlbiBzbGljaW5nIG5hdGl2ZSBhcnJheXMpIFwiZG9lc24ndCB3b3JrXCIgaW4gc2FmYXJpIDkgYW5kXG4gICAgICAgIC8vIGNhdXNlcyBhIGNyYXNoIChodHRwczovL3Bhc3RlYmluLmNvbS9OMjFRemVRQSkgd2hlbiB0cnlpbmcgdG8gZGVidWcgaXQuXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSBjYXB0dXJlcy5wdXNoKG1heWJlVG9TdHJpbmcocmVzdWx0W2pdKSk7XG4gICAgICAgIHZhciBuYW1lZENhcHR1cmVzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgaWYgKGZ1bmN0aW9uYWxSZXBsYWNlKSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VyQXJncyA9IFttYXRjaGVkXS5jb25jYXQoY2FwdHVyZXMsIHBvc2l0aW9uLCBTKTtcbiAgICAgICAgICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSByZXBsYWNlckFyZ3MucHVzaChuYW1lZENhcHR1cmVzKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBTdHJpbmcocmVwbGFjZVZhbHVlLmFwcGx5KHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgbmV4dFNvdXJjZVBvc2l0aW9uID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3VtdWxhdGVkUmVzdWx0ICsgUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24pO1xuICAgIH1cbiAgXTtcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJykuZjtcblxuLy8gYE9iamVjdC57IGVudHJpZXMsIHZhbHVlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRPX0VOVFJJRVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IG9iamVjdEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkge1xuICAgICAga2V5ID0ga2V5c1tpKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKE8sIGtleSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goVE9fRU5UUklFUyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmVudHJpZXNcbiAgZW50cmllczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgT2JqZWN0LnZhbHVlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnZhbHVlc1xuICB2YWx1ZXM6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkZW50cmllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tYXJyYXknKS5lbnRyaWVzO1xuXG4vLyBgT2JqZWN0LmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZW50cmllc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUgfSwge1xuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKE8pIHtcbiAgICByZXR1cm4gJGVudHJpZXMoTyk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuZW50cmllcycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmVudHJpZXM7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2VudHJpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9lbnRyaWVzXCIpOyIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IHJlZHVjZSwgcmVkdWNlUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19SSUdIVCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c0xlbmd0aCwgbWVtbykge1xuICAgIGFGdW5jdGlvbihjYWxsYmFja2ZuKTtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoYXQpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IElTX1JJR0hUID8gbGVuZ3RoIC0gMSA6IDA7XG4gICAgdmFyIGkgPSBJU19SSUdIVCA/IC0xIDogMTtcbiAgICBpZiAoYXJndW1lbnRzTGVuZ3RoIDwgMikgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChpbmRleCBpbiBzZWxmKSB7XG4gICAgICAgIG1lbW8gPSBzZWxmW2luZGV4XTtcbiAgICAgICAgaW5kZXggKz0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpbmRleCArPSBpO1xuICAgICAgaWYgKElTX1JJR0hUID8gaW5kZXggPCAwIDogbGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKDtJU19SSUdIVCA/IGluZGV4ID49IDAgOiBsZW5ndGggPiBpbmRleDsgaW5kZXggKz0gaSkgaWYgKGluZGV4IGluIHNlbGYpIHtcbiAgICAgIG1lbW8gPSBjYWxsYmFja2ZuKG1lbW8sIHNlbGZbaW5kZXhdLCBpbmRleCwgTyk7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmVkdWNlXG4gIGxlZnQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5yZWR1Y2VyaWdodFxuICByaWdodDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHJlZHVjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1yZWR1Y2UnKS5sZWZ0O1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xudmFyIENIUk9NRV9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ3JlZHVjZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3JlZHVjZScsIHsgMTogMCB9KTtcbi8vIENocm9tZSA4MC04MiBoYXMgYSBjcml0aWNhbCBidWdcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTEwNDk5ODJcbnZhciBDSFJPTUVfQlVHID0gIUlTX05PREUgJiYgQ0hST01FX1ZFUlNJT04gPiA3OSAmJiBDSFJPTUVfVkVSU0lPTiA8IDgzO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5yZWR1Y2VcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFTVFJJQ1RfTUVUSE9EIHx8ICFVU0VTX1RPX0xFTkdUSCB8fCBDSFJPTUVfQlVHIH0sIHtcbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LnJlZHVjZScpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLnJlZHVjZTtcbiIsInZhciByZWR1Y2UgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL3JlZHVjZScpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5yZWR1Y2U7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5yZWR1Y2UpID8gcmVkdWNlIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9yZWR1Y2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3JlZHVjZVwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkZmlsdGVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbHRlcjtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnZmlsdGVyJyk7XG4vLyBFZGdlIDE0LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ2ZpbHRlcicpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkZmlsdGVyKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZpbHRlcicpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmZpbHRlcjtcbiIsInZhciBmaWx0ZXIgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2ZpbHRlcicpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5maWx0ZXI7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5maWx0ZXIpID8gZmlsdGVyIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9maWx0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbHRlclwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkZmluZEluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbmRJbmRleDtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgRklORF9JTkRFWCA9ICdmaW5kSW5kZXgnO1xudmFyIFNLSVBTX0hPTEVTID0gdHJ1ZTtcblxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoRklORF9JTkRFWCk7XG5cbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZiAoRklORF9JTkRFWCBpbiBbXSkgQXJyYXkoMSlbRklORF9JTkRFWF0oZnVuY3Rpb24gKCkgeyBTS0lQU19IT0xFUyA9IGZhbHNlOyB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZGluZGV4XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBTS0lQU19IT0xFUyB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgIHJldHVybiAkZmluZEluZGV4KHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoRklORF9JTkRFWCk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZpbmQtaW5kZXgnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5maW5kSW5kZXg7XG4iLCJ2YXIgZmluZEluZGV4ID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9maW5kLWluZGV4Jyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZpbmRJbmRleDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmZpbmRJbmRleCkgPyBmaW5kSW5kZXggOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2ZpbmQtaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbmQtaW5kZXhcIik7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xuXG4vLyBgQXJyYXkuaXNBcnJheWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LmlzYXJyYXlcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHN0YXQ6IHRydWUgfSwge1xuICBpc0FycmF5OiBpc0FycmF5XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuaXMtYXJyYXknKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLkFycmF5LmlzQXJyYXk7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvYXJyYXkvaXMtYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvaXMtYXJyYXlcIik7IiwidmFyIF9BcnJheSRpc0FycmF5ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9hcnJheS9pcy1hcnJheVwiKTtcblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoX0FycmF5JGlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gZ2V0SXRlcmF0b3JNZXRob2QoaXQpO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yTWV0aG9kICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGl0ZXJhYmxlJyk7XG4gIH0gcmV0dXJuIGFuT2JqZWN0KGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXQpKTtcbn07XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG52YXIgZ2V0SXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SXRlcmF0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvZ2V0LWl0ZXJhdG9yXCIpOyIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG52YXIgaXNJdGVyYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1pdGVyYWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmFibGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvaXMtaXRlcmFibGVcIik7IiwiLy8gZW1wdHlcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuYXN5bmNJdGVyYXRvcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmFzeW5jaXRlcmF0b3JcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnYXN5bmNJdGVyYXRvcicpO1xuIiwiLy8gZW1wdHlcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuaGFzSW5zdGFuY2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5oYXNpbnN0YW5jZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdoYXNJbnN0YW5jZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5pc2NvbmNhdHNwcmVhZGFibGVcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnaXNDb25jYXRTcHJlYWRhYmxlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLml0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuaXRlcmF0b3JcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wubWF0Y2hgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5tYXRjaFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5tYXRjaEFsbGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLm1hdGNoYWxsXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ21hdGNoQWxsJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnJlcGxhY2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5yZXBsYWNlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3JlcGxhY2UnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuc2VhcmNoYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuc2VhcmNoXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3NlYXJjaCcpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5zcGVjaWVzYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuc3BlY2llc1xuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnNwbGl0YCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuc3BsaXRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnc3BsaXQnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wudG9QcmltaXRpdmVgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC50b3ByaW1pdGl2ZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC50b1N0cmluZ1RhZ2Agd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnRvc3RyaW5ndGFnXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnVuc2NvcGFibGVzYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wudW5zY29wYWJsZXNcbmRlZmluZVdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcblxuLy8gSlNPTltAQHRvU3RyaW5nVGFnXSBwcm9wZXJ0eVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1qc29uLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuIiwiLy8gZW1wdHlcbiIsIi8vIGVtcHR5XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmlzLWNvbmNhdC1zcHJlYWRhYmxlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wubWF0Y2gnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLWFsbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wucmVwbGFjZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuc2VhcmNoJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGVjaWVzJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGxpdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wudG8tcHJpbWl0aXZlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC51bnNjb3BhYmxlcycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5qc29uLnRvLXN0cmluZy10YWcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMubWF0aC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnJlZmxlY3QudG8tc3RyaW5nLXRhZycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguU3ltYm9sO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5hc3luY0Rpc3Bvc2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC11c2luZy1zdGF0ZW1lbnRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnYXN5bmNEaXNwb3NlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmRpc3Bvc2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC11c2luZy1zdGF0ZW1lbnRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnZGlzcG9zZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5vYnNlcnZhYmxlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnBhdHRlcm5NYXRjaGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXBhdHRlcm4tbWF0Y2hpbmdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgncGF0dGVybk1hdGNoJyk7XG4iLCIvLyBUT0RPOiByZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdyZXBsYWNlQWxsJyk7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuYXN5bmMtZGlzcG9zZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLmRpc3Bvc2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wucGF0dGVybi1tYXRjaCcpO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGBcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5yZXBsYWNlLWFsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9zeW1ib2xcIik7IiwidmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2lzSXRlcmFibGUgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX1N5bWJvbCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvc3ltYm9sXCIpO1xuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhX2lzSXRlcmFibGUoT2JqZWN0KGFycikpKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IF9nZXRJdGVyYXRvcihhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9hcnJheS9mcm9tJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2FycmF5L2Zyb21cIik7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdzbGljZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NsaWNlJywgeyBBQ0NFU1NPUlM6IHRydWUsIDA6IDAsIDE6IDIgfSk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgbmF0aXZlU2xpY2UgPSBbXS5zbGljZTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zbGljZVxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgc2xpY2U6IGZ1bmN0aW9uIHNsaWNlKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBrID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW5ndGgpO1xuICAgIHZhciBmaW4gPSB0b0Fic29sdXRlSW5kZXgoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQsIGxlbmd0aCk7XG4gICAgLy8gaW5saW5lIGBBcnJheVNwZWNpZXNDcmVhdGVgIGZvciB1c2FnZSBuYXRpdmUgYEFycmF5I3NsaWNlYCB3aGVyZSBpdCdzIHBvc3NpYmxlXG4gICAgdmFyIENvbnN0cnVjdG9yLCByZXN1bHQsIG47XG4gICAgaWYgKGlzQXJyYXkoTykpIHtcbiAgICAgIENvbnN0cnVjdG9yID0gTy5jb25zdHJ1Y3RvcjtcbiAgICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgICBpZiAodHlwZW9mIENvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBpc0FycmF5KENvbnN0cnVjdG9yLnByb3RvdHlwZSkpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcltTUEVDSUVTXTtcbiAgICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBudWxsKSBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbmF0aXZlU2xpY2UuY2FsbChPLCBrLCBmaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBuZXcgKENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQgPyBBcnJheSA6IENvbnN0cnVjdG9yKShtYXgoZmluIC0gaywgMCkpO1xuICAgIGZvciAobiA9IDA7IGsgPCBmaW47IGsrKywgbisrKSBpZiAoayBpbiBPKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIG4sIE9ba10pO1xuICAgIHJlc3VsdC5sZW5ndGggPSBuO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zbGljZScpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLnNsaWNlO1xuIiwidmFyIHNsaWNlID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9zbGljZScpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5zbGljZTtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLnNsaWNlKSA/IHNsaWNlIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9zbGljZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9pbnN0YW5jZS9zbGljZVwiKTsiLCJmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5TGlrZVRvQXJyYXk7IiwidmFyIF9BcnJheSRmcm9tID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX3NsaWNlSW5zdGFuY2VQcm9wZXJ0eSA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvaW5zdGFuY2Uvc2xpY2VcIik7XG5cbnZhciBhcnJheUxpa2VUb0FycmF5ID0gcmVxdWlyZShcIi4vYXJyYXlMaWtlVG9BcnJheVwiKTtcblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICB2YXIgX2NvbnRleHQ7XG5cbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcblxuICB2YXIgbiA9IF9zbGljZUluc3RhbmNlUHJvcGVydHkoX2NvbnRleHQgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykpLmNhbGwoX2NvbnRleHQsIDgsIC0xKTtcblxuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gX0FycmF5JGZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkbWFwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLm1hcDtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnbWFwJyk7XG4vLyBGRjQ5LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5Lm1hcCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLm1hcDtcbiIsInZhciBtYXAgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL21hcCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5tYXA7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5tYXApID8gbWFwIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9tYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL21hcFwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkZmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maW5kO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBGSU5EID0gJ2ZpbmQnO1xudmFyIFNLSVBTX0hPTEVTID0gdHJ1ZTtcblxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoRklORCk7XG5cbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZiAoRklORCBpbiBbXSkgQXJyYXkoMSlbRklORF0oZnVuY3Rpb24gKCkgeyBTS0lQU19IT0xFUyA9IGZhbHNlOyB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFNLSVBTX0hPTEVTIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2tmbiAvKiAsIHRoYXQgPSB1bmRlZmluZWQgKi8pIHtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcyhGSU5EKTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZmluZCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmZpbmQ7XG4iLCJ2YXIgZmluZCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZmluZCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5maW5kO1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEFycmF5ICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuZmluZCkgPyBmaW5kIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9maW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9maW5kXCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIHRlc3QgPSBbXTtcbnZhciBuYXRpdmVTb3J0ID0gdGVzdC5zb3J0O1xuXG4vLyBJRTgtXG52YXIgRkFJTFNfT05fVU5ERUZJTkVEID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB0ZXN0LnNvcnQodW5kZWZpbmVkKTtcbn0pO1xuLy8gVjggYnVnXG52YXIgRkFJTFNfT05fTlVMTCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdGVzdC5zb3J0KG51bGwpO1xufSk7XG4vLyBPbGQgV2ViS2l0XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ3NvcnQnKTtcblxudmFyIEZPUkNFRCA9IEZBSUxTX09OX1VOREVGSU5FRCB8fCAhRkFJTFNfT05fTlVMTCB8fCAhU1RSSUNUX01FVEhPRDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zb3J0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvcnRcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoY29tcGFyZWZuKSB7XG4gICAgcmV0dXJuIGNvbXBhcmVmbiA9PT0gdW5kZWZpbmVkXG4gICAgICA/IG5hdGl2ZVNvcnQuY2FsbCh0b09iamVjdCh0aGlzKSlcbiAgICAgIDogbmF0aXZlU29ydC5jYWxsKHRvT2JqZWN0KHRoaXMpLCBhRnVuY3Rpb24oY29tcGFyZWZuKSk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zb3J0Jyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5Jykuc29ydDtcbiIsInZhciBzb3J0ID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9zb3J0Jyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LnNvcnQ7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5zb3J0KSA/IHNvcnQgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3NvcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NvcnRcIik7IiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3NsaWNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zbGljZVwiKTsiLCIvLyBhIHN0cmluZyBvZiBhbGwgdmFsaWQgdW5pY29kZSB3aGl0ZXNwYWNlc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbm1vZHVsZS5leHBvcnRzID0gJ1xcdTAwMDlcXHUwMDBBXFx1MDAwQlxcdTAwMENcXHUwMDBEXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnO1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIHdoaXRlc3BhY2UgPSAnWycgKyB3aGl0ZXNwYWNlcyArICddJztcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXicgKyB3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAod2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKiQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICBpZiAoVFlQRSAmIDEpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltTGVmdCwgdHJpbVN0YXJ0IH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1zdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1SaWdodCwgdHJpbUVuZCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgdHJpbTogY3JlYXRlTWV0aG9kKDMpXG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIG5vbiA9ICdcXHUyMDBCXFx1MDA4NVxcdTE4MEUnO1xuXG4vLyBjaGVjayB0aGF0IGEgbWV0aG9kIHdvcmtzIHdpdGggdGhlIGNvcnJlY3QgbGlzdFxuLy8gb2Ygd2hpdGVzcGFjZXMgYW5kIGhhcyBhIGNvcnJlY3QgbmFtZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUpIHtcbiAgcmV0dXJuIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gISF3aGl0ZXNwYWNlc1tNRVRIT0RfTkFNRV0oKSB8fCBub25bTUVUSE9EX05BTUVdKCkgIT0gbm9uIHx8IHdoaXRlc3BhY2VzW01FVEhPRF9OQU1FXS5uYW1lICE9PSBNRVRIT0RfTkFNRTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIGZvcmNlZFN0cmluZ1RyaW1NZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0tZm9yY2VkJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBmb3JjZWRTdHJpbmdUcmltTWV0aG9kKCd0cmltJykgfSwge1xuICB0cmltOiBmdW5jdGlvbiB0cmltKCkge1xuICAgIHJldHVybiAkdHJpbSh0aGlzKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLnN0cmluZy50cmltJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ1N0cmluZycpLnRyaW07XG4iLCJ2YXIgdHJpbSA9IHJlcXVpcmUoJy4uL3N0cmluZy92aXJ0dWFsL3RyaW0nKTtcblxudmFyIFN0cmluZ1Byb3RvdHlwZSA9IFN0cmluZy5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC50cmltO1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnc3RyaW5nJyB8fCBpdCA9PT0gU3RyaW5nUHJvdG90eXBlXG4gICAgfHwgKGl0IGluc3RhbmNlb2YgU3RyaW5nICYmIG93biA9PT0gU3RyaW5nUHJvdG90eXBlLnRyaW0pID8gdHJpbSA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2UvdHJpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvdHJpbVwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xuXG52YXIgbmF0aXZlQXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG5tb2R1bGUuZXhwb3J0cyA9ICFuYXRpdmVBc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgbmF0aXZlQXNzaWduKHsgYjogMSB9LCBuYXRpdmVBc3NpZ24oZGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYicsIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLCB7IGI6IDIgfSkpLmIgIT09IDEpIHJldHVybiB0cnVlO1xuICAvLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1ZylcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gbmF0aXZlQXNzaWduKHt9LCBBKVtzeW1ib2xdICE9IDcgfHwgb2JqZWN0S2V5cyhuYXRpdmVBc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1hc3NpZ24nKTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBPYmplY3QuYXNzaWduICE9PSBhc3NpZ24gfSwge1xuICBhc3NpZ246IGFzc2lnblxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5hc3NpZ24nKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC5hc3NpZ247XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2Fzc2lnbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2Fzc2lnblwiKTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGNyZWF0ZTogY3JlYXRlXG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmNyZWF0ZScpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG52YXIgT2JqZWN0ID0gcGF0aC5PYmplY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpIHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9jcmVhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9jcmVhdGVcIik7IiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2FycmF5L2lzLWFycmF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS9pcy1hcnJheVwiKTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcblxuLy8gYERhdGUubm93YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZGF0ZS5ub3dcbiQoeyB0YXJnZXQ6ICdEYXRlJywgc3RhdDogdHJ1ZSB9LCB7XG4gIG5vdzogZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmRhdGUubm93Jyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5EYXRlLm5vdztcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9kYXRlL25vdycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvZGF0ZS9ub3dcIik7IiwiLyohIEhhbW1lci5KUyAtIHYyLjAuNyAtIDIwMTYtMDQtMjJcbiAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IEpvcmlrIFRhbmdlbGRlcjtcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAqL1xuLy8oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgZXhwb3J0TmFtZSwgdW5kZWZpbmVkKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBWRU5ET1JfUFJFRklYRVMgPSBbJycsICd3ZWJraXQnLCAnTW96JywgJ01TJywgJ21zJywgJ28nXTtcbnZhciBURVNUX0VMRU1FTlQgPSAoKSA9PlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxudmFyIFRZUEVfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuXG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xudmFyIGFicyA9IE1hdGguYWJzO1xudmFyIG5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSwgd2Ugd2FudCB0byBleGVjdXRlIHRoZSBmbiBvbiBlYWNoIGVudHJ5XG4gKiBpZiBpdCBhaW50IGFuIGFycmF5IHdlIGRvbid0IHdhbnQgdG8gZG8gYSB0aGluZy5cbiAqIHRoaXMgaXMgdXNlZCBieSBhbGwgdGhlIG1ldGhvZHMgdGhhdCBhY2NlcHQgYSBzaW5nbGUgYW5kIGFycmF5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfEFycmF5fSBhcmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBmblxuICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0XVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGludm9rZUFycmF5QXJnKGFyZywgZm4sIGNvbnRleHQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgIGVhY2goYXJnLCBjb250ZXh0W2ZuXSwgY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogd2FsayBvYmplY3RzIGFuZCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICovXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmICghb2JqKSByZXR1cm47XG5cbiAgICBpZiAob2JqLmZvckVhY2gpIHtcbiAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG9iai5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBzaW1wbGUgY2xhc3MgaW5oZXJpdGFuY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoaWxkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBiYXNlXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXNdXG4gKi9cbmZ1bmN0aW9uIGluaGVyaXQoY2hpbGQsIGJhc2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgYmFzZVAgPSBiYXNlLnByb3RvdHlwZSxcbiAgICAgICAgY2hpbGRQO1xuXG4gICAgY2hpbGRQID0gY2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlUCk7XG4gICAgY2hpbGRQLmNvbnN0cnVjdG9yID0gY2hpbGQ7XG4gICAgY2hpbGRQLl9zdXBlciA9IGJhc2VQO1xuXG4gICAgaWYgKHByb3BlcnRpZXMpIE9iamVjdC5hc3NpZ24oY2hpbGRQLCBwcm9wZXJ0aWVzKTtcbn1cblxuLyoqXG4gKiBsZXQgYSBib29sZWFuIHZhbHVlIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IG11c3QgcmV0dXJuIGEgYm9vbGVhblxuICogdGhpcyBmaXJzdCBpdGVtIGluIGFyZ3Mgd2lsbCBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IHZhbFxuICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gYm9vbE9yRm4odmFsLCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT0gVFlQRV9GVU5DVElPTikge1xuICAgICAgICByZXR1cm4gdmFsLmFwcGx5KGFyZ3MgPyBhcmdzWzBdIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogdXNlIHRoZSB2YWwyIHdoZW4gdmFsMSBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSB7Kn0gdmFsMVxuICogQHBhcmFtIHsqfSB2YWwyXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gaWZVbmRlZmluZWQodmFsMSwgdmFsMikge1xuICAgIHJldHVybiB2YWwxID09PSB1bmRlZmluZWQgPyB2YWwyIDogdmFsMTtcbn1cblxuLyoqXG4gKiBhZGRFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBzcGxpdFN0cih0eXBlcykuZm9yRWFjaCgodHlwZSkgPT5cbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpXG4gICAgKTtcbn1cblxuLyoqXG4gKiByZW1vdmVFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBzcGxpdFN0cih0eXBlcykuZm9yRWFjaCgodHlwZSkgPT5cbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpXG4gICAgKTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgbm9kZSBpcyBpbiB0aGUgZ2l2ZW4gcGFyZW50XG4gKiBAbWV0aG9kIGhhc1BhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBoYXNQYXJlbnQobm9kZSwgcGFyZW50KSB7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50KSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHNtYWxsIGluZGV4T2Ygd3JhcHBlclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBpblN0cihzdHIsIGZpbmQpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2YoZmluZCkgPiAtMTtcbn1cblxuLyoqXG4gKiBzcGxpdCBzdHJpbmcgb24gd2hpdGVzcGFjZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge0FycmF5fSB3b3Jkc1xuICovXG5mdW5jdGlvbiBzcGxpdFN0cihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5zcGxpdCgvXFxzKy9nKTtcbn1cblxuLyoqXG4gKiBjb252ZXJ0IGFycmF5LWxpa2Ugb2JqZWN0cyB0byByZWFsIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybnMge0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKG9iaikgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqLCAwKTtcblxuLyoqXG4gKiB1bmlxdWUgYXJyYXkgd2l0aCBvYmplY3RzIGJhc2VkIG9uIGEga2V5IChsaWtlICdpZCcpIG9yIGp1c3QgYnkgdGhlIGFycmF5J3MgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IHNyYyBbe2lkOjF9LHtpZDoyfSx7aWQ6MX1dXG4gKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NvcnQ9RmFsc2VdXG4gKiBAcmV0dXJucyB7QXJyYXl9IFt7aWQ6MX0se2lkOjJ9XVxuICovXG5mdW5jdGlvbiB1bmlxdWVBcnJheShhcnJheSwga2V5LCBzb3J0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBhcnJheS5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIHZhciB2YWwgPSBrZXkgPyBpdGVtW2tleV0gOiBpdGVtO1xuICAgICAgICBpZiAodmFsdWVzLmluZGV4T2YodmFsKSA8IDApIHJlc3VsdHMucHVzaChpdGVtKTtcbiAgICAgICAgdmFsdWVzW2ldID0gdmFsO1xuICAgIH0pO1xuXG4gICAgaWYgKHNvcnQpIHJlc3VsdHMuc29ydCgha2V5ID8gdW5kZWZpbmVkIDogKGEsIGIpID0+IGFba2V5XSA+IGJba2V5XSk7XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHByZWZpeGVkIHByb3BlcnR5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBwcmVmaXhlZFxuICovXG5mdW5jdGlvbiBwcmVmaXhlZChvYmosIHByb3BlcnR5KSB7XG4gICAgY29uc3QgY2FtZWxQcm9wID0gcHJvcGVydHlbMF0udG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gICAgcmV0dXJuIFZFTkRPUl9QUkVGSVhFUy5maW5kKFxuICAgICAgICAocHJlZml4KSA9PiAocHJlZml4ID8gcHJlZml4ICsgY2FtZWxQcm9wIDogcHJvcGVydHkpIGluIG9ialxuICAgICk7XG59XG5cbi8qKlxuICogZ2V0IGEgdW5pcXVlIGlkXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB1bmlxdWVJZFxuICovXG5sZXQgX3VuaXF1ZUlkID0gMTtcbmNvbnN0IHVuaXF1ZUlkID0gKCkgPT4gX3VuaXF1ZUlkKys7XG5cbi8qKlxuICogZ2V0IHRoZSB3aW5kb3cgb2JqZWN0IG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtEb2N1bWVudFZpZXd8V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB2YXIgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGVsZW1lbnQ7XG4gICAgcmV0dXJuIChcbiAgICAgICAgZG9jLmRlZmF1bHRWaWV3IHx8XG4gICAgICAgIGRvYy5wYXJlbnRXaW5kb3cgfHxcbiAgICAgICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdylcbiAgICApO1xufVxuXG52YXIgTU9CSUxFX1JFR0VYID0gL21vYmlsZXx0YWJsZXR8aXAoYWR8aG9uZXxvZCl8YW5kcm9pZC9pO1xuXG52YXIgU1VQUE9SVF9UT1VDSCA9ICgpID0+XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ29udG91Y2hzdGFydCcgaW4gd2luZG93O1xudmFyIFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMgPSAoKSA9PlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgcHJlZml4ZWQod2luZG93LCAnUG9pbnRlckV2ZW50JykgIT09IHVuZGVmaW5lZDtcbnZhciBTVVBQT1JUX09OTFlfVE9VQ0ggPSAoKSA9PlxuICAgIFNVUFBPUlRfVE9VQ0goKSAmJiBNT0JJTEVfUkVHRVgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxudmFyIElOUFVUX1RZUEVfVE9VQ0ggPSAndG91Y2gnO1xudmFyIElOUFVUX1RZUEVfUEVOID0gJ3Blbic7XG52YXIgSU5QVVRfVFlQRV9NT1VTRSA9ICdtb3VzZSc7XG52YXIgSU5QVVRfVFlQRV9LSU5FQ1QgPSAna2luZWN0JztcblxudmFyIENPTVBVVEVfSU5URVJWQUwgPSAyNTtcblxudmFyIElOUFVUX1NUQVJUID0gMTtcbnZhciBJTlBVVF9NT1ZFID0gMjtcbnZhciBJTlBVVF9FTkQgPSA0O1xudmFyIElOUFVUX0NBTkNFTCA9IDg7XG5cbnZhciBESVJFQ1RJT05fTk9ORSA9IDE7XG52YXIgRElSRUNUSU9OX0xFRlQgPSAyO1xudmFyIERJUkVDVElPTl9SSUdIVCA9IDQ7XG52YXIgRElSRUNUSU9OX1VQID0gODtcbnZhciBESVJFQ1RJT05fRE9XTiA9IDE2O1xuXG52YXIgRElSRUNUSU9OX0hPUklaT05UQUwgPSBESVJFQ1RJT05fTEVGVCB8IERJUkVDVElPTl9SSUdIVDtcbnZhciBESVJFQ1RJT05fVkVSVElDQUwgPSBESVJFQ1RJT05fVVAgfCBESVJFQ1RJT05fRE9XTjtcbnZhciBESVJFQ1RJT05fQUxMID0gRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUw7XG5cbnZhciBQUk9QU19YWSA9IFsneCcsICd5J107XG52YXIgUFJPUFNfQ0xJRU5UX1hZID0gWydjbGllbnRYJywgJ2NsaWVudFknXTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0lucHV0fVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIElucHV0KG1hbmFnZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMuZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICB0aGlzLnRhcmdldCA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dFRhcmdldDtcblxuICAgIC8vIHNtYWxsZXIgd3JhcHBlciBhcm91bmQgdGhlIGhhbmRsZXIsIGZvciB0aGUgc2NvcGUgYW5kIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBtYW5hZ2VyLFxuICAgIC8vIHNvIHdoZW4gZGlzYWJsZWQgdGhlIGlucHV0IGV2ZW50cyBhcmUgY29tcGxldGVseSBieXBhc3NlZC5cbiAgICB0aGlzLmRvbUhhbmRsZXIgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgaWYgKGJvb2xPckZuKG1hbmFnZXIub3B0aW9ucy5lbmFibGUsIFttYW5hZ2VyXSkpIHtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlcihldik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbklucHV0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzaG91bGQgaGFuZGxlIHRoZSBpbnB1dEV2ZW50IGRhdGEgYW5kIHRyaWdnZXIgdGhlIGNhbGxiYWNrXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICBoYW5kbGVyKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmV2RWwgJiZcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJlxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMoXG4gICAgICAgICAgICAgICAgZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZXZXaW4sXG4gICAgICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyXG4gICAgICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJlxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiZcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyhcbiAgICAgICAgICAgICAgICBnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksXG4gICAgICAgICAgICAgICAgdGhpcy5ldldpbixcbiAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXJcbiAgICAgICAgICAgICk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogY2FsbGVkIGJ5IHRoZSBNYW5hZ2VyIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICogQHJldHVybnMge0lucHV0fVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dEluc3RhbmNlKG1hbmFnZXIpIHtcbiAgICBjb25zdCBpbnB1dENsYXNzID0gbWFuYWdlci5vcHRpb25zLmlucHV0Q2xhc3M7XG5cbiAgICBsZXQgVHlwZTtcbiAgICBpZiAoaW5wdXRDbGFzcykge1xuICAgICAgICBUeXBlID0gaW5wdXRDbGFzcztcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMoKSkge1xuICAgICAgICBUeXBlID0gUG9pbnRlckV2ZW50SW5wdXQ7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX09OTFlfVE9VQ0goKSkge1xuICAgICAgICBUeXBlID0gVG91Y2hJbnB1dDtcbiAgICB9IGVsc2UgaWYgKCFTVVBQT1JUX1RPVUNIKCkpIHtcbiAgICAgICAgVHlwZSA9IE1vdXNlSW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoTW91c2VJbnB1dDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBUeXBlKG1hbmFnZXIsIGlucHV0SGFuZGxlcik7XG59XG5cbi8qKlxuICogaGFuZGxlIGlucHV0IGV2ZW50c1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gaW5wdXRIYW5kbGVyKG1hbmFnZXIsIGV2ZW50VHlwZSwgaW5wdXQpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW4gPSBpbnB1dC5wb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGNoYW5nZWRQb2ludGVyc0xlbiA9IGlucHV0LmNoYW5nZWRQb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGlzRmlyc3QgPVxuICAgICAgICBldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiBwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMDtcbiAgICB2YXIgaXNGaW5hbCA9XG4gICAgICAgIGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmXG4gICAgICAgIHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwO1xuXG4gICAgaW5wdXQuaXNGaXJzdCA9ICEhaXNGaXJzdDtcbiAgICBpbnB1dC5pc0ZpbmFsID0gISFpc0ZpbmFsO1xuXG4gICAgaWYgKGlzRmlyc3QpIG1hbmFnZXIuc2Vzc2lvbiA9IHt9O1xuXG4gICAgLy8gc291cmNlIGV2ZW50IGlzIHRoZSBub3JtYWxpemVkIHZhbHVlIG9mIHRoZSBkb21FdmVudHNcbiAgICAvLyBsaWtlICd0b3VjaHN0YXJ0LCBtb3VzZXVwLCBwb2ludGVyZG93bidcbiAgICBpbnB1dC5ldmVudFR5cGUgPSBldmVudFR5cGU7XG5cbiAgICAvLyBjb21wdXRlIHNjYWxlLCByb3RhdGlvbiBldGNcbiAgICBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KTtcblxuICAgIC8vIGVtaXQgc2VjcmV0IGV2ZW50XG4gICAgbWFuYWdlci5lbWl0KCdoYW1tZXIuaW5wdXQnLCBpbnB1dCk7XG5cbiAgICBtYW5hZ2VyLnJlY29nbml6ZShpbnB1dCk7XG4gICAgbWFuYWdlci5zZXNzaW9uLnByZXZJbnB1dCA9IGlucHV0O1xufVxuXG4vKipcbiAqIGV4dGVuZCB0aGUgZGF0YSB3aXRoIHNvbWUgdXNhYmxlIHByb3BlcnRpZXMgbGlrZSBzY2FsZSwgcm90YXRlLCB2ZWxvY2l0eSBldGNcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYW5hZ2VyXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCkge1xuICAgIHZhciBzZXNzaW9uID0gbWFuYWdlci5zZXNzaW9uO1xuICAgIHZhciBwb2ludGVycyA9IGlucHV0LnBvaW50ZXJzO1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIHN0b3JlIHRoZSBmaXJzdCBpbnB1dCB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGFuZCBkaXJlY3Rpb25cbiAgICBpZiAoIXNlc3Npb24uZmlyc3RJbnB1dCkgc2Vzc2lvbi5maXJzdElucHV0ID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuXG4gICAgLy8gdG8gY29tcHV0ZSBzY2FsZSBhbmQgcm90YXRpb24gd2UgbmVlZCB0byBzdG9yZSB0aGUgbXVsdGlwbGUgdG91Y2hlc1xuICAgIGlmIChwb2ludGVyc0xlbmd0aCA+IDEgJiYgIXNlc3Npb24uZmlyc3RNdWx0aXBsZSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3RJbnB1dCA9IHNlc3Npb24uZmlyc3RJbnB1dDtcbiAgICB2YXIgZmlyc3RNdWx0aXBsZSA9IHNlc3Npb24uZmlyc3RNdWx0aXBsZTtcbiAgICB2YXIgb2Zmc2V0Q2VudGVyID0gZmlyc3RNdWx0aXBsZSA/IGZpcnN0TXVsdGlwbGUuY2VudGVyIDogZmlyc3RJbnB1dC5jZW50ZXI7XG5cbiAgICB2YXIgY2VudGVyID0gKGlucHV0LmNlbnRlciA9IGdldENlbnRlcihwb2ludGVycykpO1xuICAgIGlucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgIGlucHV0LmRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGZpcnN0SW5wdXQudGltZVN0YW1wO1xuXG4gICAgaW5wdXQuYW5nbGUgPSBnZXRBbmdsZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG4gICAgaW5wdXQuZGlzdGFuY2UgPSBnZXREaXN0YW5jZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG5cbiAgICBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCk7XG4gICAgaW5wdXQub2Zmc2V0RGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcblxuICAgIHZhciBvdmVyYWxsVmVsb2NpdHkgPSBnZXRWZWxvY2l0eShcbiAgICAgICAgaW5wdXQuZGVsdGFUaW1lLFxuICAgICAgICBpbnB1dC5kZWx0YVgsXG4gICAgICAgIGlucHV0LmRlbHRhWVxuICAgICk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WCA9IG92ZXJhbGxWZWxvY2l0eS54O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVkgPSBvdmVyYWxsVmVsb2NpdHkueTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHkgPVxuICAgICAgICBhYnMob3ZlcmFsbFZlbG9jaXR5LngpID4gYWJzKG92ZXJhbGxWZWxvY2l0eS55KVxuICAgICAgICAgICAgPyBvdmVyYWxsVmVsb2NpdHkueFxuICAgICAgICAgICAgOiBvdmVyYWxsVmVsb2NpdHkueTtcblxuICAgIGlucHV0LnNjYWxlID0gZmlyc3RNdWx0aXBsZVxuICAgICAgICA/IGdldFNjYWxlKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKVxuICAgICAgICA6IDE7XG4gICAgaW5wdXQucm90YXRpb24gPSBmaXJzdE11bHRpcGxlXG4gICAgICAgID8gZ2V0Um90YXRpb24oZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpXG4gICAgICAgIDogMDtcblxuICAgIGlucHV0Lm1heFBvaW50ZXJzID0gIXNlc3Npb24ucHJldklucHV0XG4gICAgICAgID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoXG4gICAgICAgIDogaW5wdXQucG9pbnRlcnMubGVuZ3RoID4gc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnNcbiAgICAgICAgPyBpbnB1dC5wb2ludGVycy5sZW5ndGhcbiAgICAgICAgOiBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycztcblxuICAgIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCk7XG5cbiAgICAvLyBmaW5kIHRoZSBjb3JyZWN0IHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKGhhc1BhcmVudChpbnB1dC5zcmNFdmVudC50YXJnZXQsIHRhcmdldCkpXG4gICAgICAgIHRhcmdldCA9IGlucHV0LnNyY0V2ZW50LnRhcmdldDtcbiAgICBpbnB1dC50YXJnZXQgPSB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlcjtcbiAgICB2YXIgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZJbnB1dCA9IHNlc3Npb24ucHJldklucHV0IHx8IHt9O1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfU1RBUlQgfHwgcHJldklucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfRU5EKSB7XG4gICAgICAgIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhID0ge1xuICAgICAgICAgICAgeDogcHJldklucHV0LmRlbHRhWCB8fCAwLFxuICAgICAgICAgICAgeTogcHJldklucHV0LmRlbHRhWSB8fCAwXG4gICAgICAgIH07XG5cbiAgICAgICAgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRlci54LFxuICAgICAgICAgICAgeTogY2VudGVyLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbnB1dC5kZWx0YVggPSBwcmV2RGVsdGEueCArIChjZW50ZXIueCAtIG9mZnNldC54KTtcbiAgICBpbnB1dC5kZWx0YVkgPSBwcmV2RGVsdGEueSArIChjZW50ZXIueSAtIG9mZnNldC55KTtcbn1cblxuLyoqXG4gKiB2ZWxvY2l0eSBpcyBjYWxjdWxhdGVkIGV2ZXJ5IHggbXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXNzaW9uXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGxhc3QgPSBzZXNzaW9uLmxhc3RJbnRlcnZhbCB8fCBpbnB1dCxcbiAgICAgICAgZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gbGFzdC50aW1lU3RhbXAsXG4gICAgICAgIHZlbG9jaXR5LFxuICAgICAgICB2ZWxvY2l0eVgsXG4gICAgICAgIHZlbG9jaXR5WSxcbiAgICAgICAgZGlyZWN0aW9uO1xuXG4gICAgaWYgKFxuICAgICAgICBpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfQ0FOQ0VMICYmXG4gICAgICAgIChkZWx0YVRpbWUgPiBDT01QVVRFX0lOVEVSVkFMIHx8IGxhc3QudmVsb2NpdHkgPT09IHVuZGVmaW5lZClcbiAgICApIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IGlucHV0LmRlbHRhWCAtIGxhc3QuZGVsdGFYO1xuICAgICAgICB2YXIgZGVsdGFZID0gaW5wdXQuZGVsdGFZIC0gbGFzdC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIHYgPSBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgICAgdmVsb2NpdHlYID0gdi54O1xuICAgICAgICB2ZWxvY2l0eVkgPSB2Lnk7XG4gICAgICAgIHZlbG9jaXR5ID0gYWJzKHYueCkgPiBhYnModi55KSA/IHYueCA6IHYueTtcbiAgICAgICAgZGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICBzZXNzaW9uLmxhc3RJbnRlcnZhbCA9IGlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVzZSBsYXRlc3QgdmVsb2NpdHkgaW5mbyBpZiBpdCBkb2Vzbid0IG92ZXJ0YWtlIGEgbWluaW11bSBwZXJpb2RcbiAgICAgICAgdmVsb2NpdHkgPSBsYXN0LnZlbG9jaXR5O1xuICAgICAgICB2ZWxvY2l0eVggPSBsYXN0LnZlbG9jaXR5WDtcbiAgICAgICAgdmVsb2NpdHlZID0gbGFzdC52ZWxvY2l0eVk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGxhc3QuZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGlucHV0LnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgaW5wdXQudmVsb2NpdHlYID0gdmVsb2NpdHlYO1xuICAgIGlucHV0LnZlbG9jaXR5WSA9IHZlbG9jaXR5WTtcbiAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG59XG5cbi8qKlxuICogY3JlYXRlIGEgc2ltcGxlIGNsb25lIGZyb20gdGhlIGlucHV0IHVzZWQgZm9yIHN0b3JhZ2Ugb2YgZmlyc3RJbnB1dCBhbmQgZmlyc3RNdWx0aXBsZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjbG9uZWRJbnB1dERhdGFcbiAqL1xuZnVuY3Rpb24gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpIHtcbiAgICAvLyBtYWtlIGEgc2ltcGxlIGNvcHkgb2YgdGhlIHBvaW50ZXJzIGJlY2F1c2Ugd2Ugd2lsbCBnZXQgYSByZWZlcmVuY2UgaWYgd2UgZG9uJ3RcbiAgICAvLyB3ZSBvbmx5IG5lZWQgY2xpZW50WFkgZm9yIHRoZSBjYWxjdWxhdGlvbnNcbiAgICBjb25zdCBwb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLm1hcCgocG9pbnRlcikgPT4gKHtcbiAgICAgICAgY2xpZW50WDogcm91bmQocG9pbnRlci5jbGllbnRYKSxcbiAgICAgICAgY2xpZW50WTogcm91bmQocG9pbnRlci5jbGllbnRZKVxuICAgIH0pKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRpbWVTdGFtcDogbm93KCksXG4gICAgICAgIHBvaW50ZXJzOiBwb2ludGVycyxcbiAgICAgICAgY2VudGVyOiBnZXRDZW50ZXIocG9pbnRlcnMpLFxuICAgICAgICBkZWx0YVg6IGlucHV0LmRlbHRhWCxcbiAgICAgICAgZGVsdGFZOiBpbnB1dC5kZWx0YVlcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgY2VudGVyIG9mIGFsbCB0aGUgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtPYmplY3R9IGNlbnRlciBjb250YWlucyBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRlcihwb2ludGVycykge1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB3aGVuIG9ubHkgb25lIHRvdWNoXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRYKSxcbiAgICAgICAgICAgIHk6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcbiAgICBwb2ludGVycy5mb3JFYWNoKCh7Y2xpZW50WCwgY2xpZW50WX0pID0+IHtcbiAgICAgICAgeCArPSBjbGllbnRYO1xuICAgICAgICB5ICs9IGNsaWVudFk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiByb3VuZCh4IC8gcG9pbnRlcnNMZW5ndGgpLFxuICAgICAgICB5OiByb3VuZCh5IC8gcG9pbnRlcnNMZW5ndGgpXG4gICAgfTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHZlbG9jaXR5IGJldHdlZW4gdHdvIHBvaW50cy4gdW5pdCBpcyBpbiBweCBwZXIgbXMuXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFUaW1lXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge09iamVjdH0gdmVsb2NpdHkgYHhgIGFuZCBgeWBcbiAqL1xuY29uc3QgZ2V0VmVsb2NpdHkgPSAoZGVsdGFUaW1lLCB4LCB5KSA9PiAoe1xuICAgIHg6IHggLyBkZWx0YVRpbWUgfHwgMCxcbiAgICB5OiB5IC8gZGVsdGFUaW1lIHx8IDBcbn0pO1xuXG4vKipcbiAqIGdldCB0aGUgZGlyZWN0aW9uIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpcmVjdGlvblxuICovXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGlmICh4ID09PSB5KSByZXR1cm4gRElSRUNUSU9OX05PTkU7XG5cbiAgICBpZiAoYWJzKHgpID49IGFicyh5KSkgcmV0dXJuIHggPCAwID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG5cbiAgICByZXR1cm4geSA8IDAgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFic29sdXRlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHAxIHt4LCB5fVxuICogQHBhcmFtIHtPYmplY3R9IHAyIHt4LCB5fVxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBkaXN0YW5jZVxuICovXG5jb25zdCBnZXREaXN0YW5jZSA9IChwMSwgcDIsIFt4S2V5LCB5S2V5XSA9IFBST1BTX1hZKSA9PlxuICAgIE1hdGguc3FydChcbiAgICAgICAgTWF0aC5wb3cocDJbeEtleV0gLSBwMVt4S2V5XSwgMikgKyBNYXRoLnBvdyhwMlt5S2V5XSAtIHAxW3lLZXldLCAyKVxuICAgICk7XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhbmdsZSBiZXR3ZWVuIHR3byBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHAxXG4gKiBAcGFyYW0ge09iamVjdH0gcDJcbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gYW5nbGVcbiAqL1xuY29uc3QgZ2V0QW5nbGUgPSAocDEsIHAyLCBbeEtleSwgeUtleV0gPSBQUk9QU19YWSkgPT5cbiAgICAoTWF0aC5hdGFuMihwMlt5S2V5XSAtIHAxW3lLZXldLCBwMlt4S2V5XSAtIHAxW3hLZXldKSAqIDE4MCkgLyBNYXRoLlBJO1xuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgcm90YXRpb24gZGVncmVlcyBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSByb3RhdGlvblxuICovXG5jb25zdCBnZXRSb3RhdGlvbiA9IChzdGFydCwgZW5kKSA9PlxuICAgIGdldEFuZ2xlKGVuZFsxXSwgZW5kWzBdLCBQUk9QU19DTElFTlRfWFkpICtcbiAgICBnZXRBbmdsZShzdGFydFsxXSwgc3RhcnRbMF0sIFBST1BTX0NMSUVOVF9YWSk7XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBzY2FsZSBmYWN0b3IgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIG5vIHNjYWxlIGlzIDEsIGFuZCBnb2VzIGRvd24gdG8gMCB3aGVuIHBpbmNoZWQgdG9nZXRoZXIsIGFuZCBiaWdnZXIgd2hlbiBwaW5jaGVkIG91dFxuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSBzY2FsZVxuICovXG5jb25zdCBnZXRTY2FsZSA9IChzdGFydCwgZW5kKSA9PlxuICAgIGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdLCBQUk9QU19DTElFTlRfWFkpIC9cbiAgICBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0sIFBST1BTX0NMSUVOVF9YWSk7XG5cbnZhciBNT1VTRV9JTlBVVF9NQVAgPSB7XG4gICAgbW91c2Vkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBtb3VzZW1vdmU6IElOUFVUX01PVkUsXG4gICAgbW91c2V1cDogSU5QVVRfRU5EXG59O1xuXG52YXIgTU9VU0VfRUxFTUVOVF9FVkVOVFMgPSAnbW91c2Vkb3duJztcbnZhciBNT1VTRV9XSU5ET1dfRVZFTlRTID0gJ21vdXNlbW92ZSBtb3VzZXVwJztcblxuLyoqXG4gKiBNb3VzZSBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gTW91c2VJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBNT1VTRV9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gTU9VU0VfV0lORE9XX0VWRU5UUztcblxuICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlOyAvLyBtb3VzZWRvd24gc3RhdGVcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcihldikge1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gTU9VU0VfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIG9uIHN0YXJ0IHdlIHdhbnQgdG8gaGF2ZSB0aGUgbGVmdCBtb3VzZSBidXR0b24gZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgZXYuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX01PVkUgJiYgZXYud2hpY2ggIT09IDEpIHtcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9IElOUFVUX0VORDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoIXRoaXMucHJlc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX01PVVNFLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG52YXIgUE9JTlRFUl9JTlBVVF9NQVAgPSB7XG4gICAgcG9pbnRlcmRvd246IElOUFVUX1NUQVJULFxuICAgIHBvaW50ZXJtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHBvaW50ZXJ1cDogSU5QVVRfRU5ELFxuICAgIHBvaW50ZXJjYW5jZWw6IElOUFVUX0NBTkNFTCxcbiAgICBwb2ludGVyb3V0OiBJTlBVVF9DQU5DRUxcbn07XG5cbi8vIGluIElFMTAgdGhlIHBvaW50ZXIgdHlwZXMgaXMgZGVmaW5lZCBhcyBhbiBlbnVtXG52YXIgSUUxMF9QT0lOVEVSX1RZUEVfRU5VTSA9IHtcbiAgICAyOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgIDM6IElOUFVUX1RZUEVfUEVOLFxuICAgIDQ6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgNTogSU5QVVRfVFlQRV9LSU5FQ1QgLy8gc2VlIGh0dHBzOi8vdHdpdHRlci5jb20vamFjb2Jyb3NzaS9zdGF0dXMvNDgwNTk2NDM4NDg5ODkwODE2XG59O1xuXG52YXIgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdwb2ludGVyZG93bic7XG52YXIgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ3BvaW50ZXJtb3ZlIHBvaW50ZXJ1cCBwb2ludGVyY2FuY2VsJztcblxuLy8gSUUxMCBoYXMgcHJlZml4ZWQgc3VwcG9ydCwgYW5kIGNhc2Utc2Vuc2l0aXZlXG5pZiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB3aW5kb3cuTVNQb2ludGVyRXZlbnQgJiZcbiAgICAhd2luZG93LlBvaW50ZXJFdmVudFxuKSB7XG4gICAgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdNU1BvaW50ZXJEb3duJztcbiAgICBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAnTVNQb2ludGVyTW92ZSBNU1BvaW50ZXJVcCBNU1BvaW50ZXJDYW5jZWwnO1xufVxuXG4vKipcbiAqIFBvaW50ZXIgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFBvaW50ZXJFdmVudElucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IFBPSU5URVJfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFBPSU5URVJfV0lORE9XX0VWRU5UUztcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnN0b3JlID0gdGhpcy5tYW5hZ2VyLnNlc3Npb24ucG9pbnRlckV2ZW50cyA9IFtdO1xufVxuXG5pbmhlcml0KFBvaW50ZXJFdmVudElucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHRoaXMuc3RvcmU7XG4gICAgICAgIHZhciByZW1vdmVQb2ludGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGV2ZW50VHlwZU5vcm1hbGl6ZWQgPSBldi50eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnbXMnLCAnJyk7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBQT0lOVEVSX0lOUFVUX01BUFtldmVudFR5cGVOb3JtYWxpemVkXTtcbiAgICAgICAgdmFyIHBvaW50ZXJUeXBlID1cbiAgICAgICAgICAgIElFMTBfUE9JTlRFUl9UWVBFX0VOVU1bZXYucG9pbnRlclR5cGVdIHx8IGV2LnBvaW50ZXJUeXBlO1xuXG4gICAgICAgIHZhciBpc1RvdWNoID0gcG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSDtcblxuICAgICAgICAvLyBnZXQgaW5kZXggb2YgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICB2YXIgc3RvcmVJbmRleCA9IHN0b3JlLmZpbmRJbmRleChcbiAgICAgICAgICAgIChpdGVtKSA9PiBpdGVtLnBvaW50ZXJJZCA9PSBldi5wb2ludGVySWRcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBzdGFydCBhbmQgbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAoZXYuYnV0dG9uID09PSAwIHx8IGlzVG91Y2gpKSB7XG4gICAgICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgICBzdG9yZUluZGV4ID0gc3RvcmUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgcmVtb3ZlUG9pbnRlciA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdCBub3QgZm91bmQsIHNvIHRoZSBwb2ludGVyIGhhc24ndCBiZWVuIGRvd24gKHNvIGl0J3MgcHJvYmFibHkgYSBob3ZlcilcbiAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSByZXR1cm47XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgc3RvcmVbc3RvcmVJbmRleF0gPSBldjtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogc3RvcmUsXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogcG9pbnRlclR5cGUsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlXG4gICAgICAgIGlmIChyZW1vdmVQb2ludGVyKSBzdG9yZS5zcGxpY2Uoc3RvcmVJbmRleCwgMSk7XG4gICAgfVxufSk7XG5cbnZhciBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0JztcbnZhciBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogVG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFNpbmdsZVRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUztcbiAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU2luZ2xlVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyKHNyY0V2ZW50KSB7XG4gICAgICAgIHZhciB0eXBlID0gU0lOR0xFX1RPVUNIX0lOUFVUX01BUFtzcmNFdmVudC50eXBlXTtcblxuICAgICAgICAvLyBzaG91bGQgd2UgaGFuZGxlIHRoZSB0b3VjaCBldmVudHM/XG4gICAgICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkgdGhpcy5zdGFydGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBbcG9pbnRlcnMsIGNoYW5nZWRQb2ludGVyc10gPSBub3JtYWxpemVTaW5nbGVUb3VjaGVzKFxuICAgICAgICAgICAgc3JjRXZlbnQsXG4gICAgICAgICAgICB0eXBlXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gd2hlbiBkb25lLCByZXNldCB0aGUgc3RhcnRlZCBzdGF0ZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiZcbiAgICAgICAgICAgIHBvaW50ZXJzLmxlbmd0aCAtIGNoYW5nZWRQb2ludGVycy5sZW5ndGggPT09IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVycyxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVycyxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnRcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgY2hhbmdlZCA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpO1xuXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBhbGwgPSB1bmlxdWVBcnJheShhbGwuY29uY2F0KGNoYW5nZWQpLCAnaWRlbnRpZmllcicsIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBbYWxsLCBjaGFuZ2VkXTtcbn1cblxudmFyIFRPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogTXVsdGktdXNlciB0b3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLnRhcmdldElkcyA9IHt9O1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBUT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG4gICAgICAgIHZhciB0b3VjaGVzID0gZ2V0VG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcbiAgICAgICAgaWYgKCF0b3VjaGVzKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsVG91Y2hlcyA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIHRhcmdldElkcyA9IHRoaXMudGFyZ2V0SWRzO1xuXG4gICAgLy8gd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSB0b3VjaCwgdGhlIHByb2Nlc3MgY2FuIGJlIHNpbXBsaWZpZWRcbiAgICBpZiAodHlwZSAmIChJTlBVVF9TVEFSVCB8IElOUFVUX01PVkUpICYmIGFsbFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRhcmdldElkc1thbGxUb3VjaGVzWzBdLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFthbGxUb3VjaGVzLCBhbGxUb3VjaGVzXTtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0VG91Y2hlcyxcbiAgICAgICAgY2hhbmdlZFRvdWNoZXMgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMgPSBbXSxcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAvLyBnZXQgdGFyZ2V0IHRvdWNoZXMgZnJvbSB0b3VjaGVzXG4gICAgdGFyZ2V0VG91Y2hlcyA9IGFsbFRvdWNoZXMuZmlsdGVyKCh0b3VjaCkgPT5cbiAgICAgICAgaGFzUGFyZW50KHRvdWNoLnRhcmdldCwgdGFyZ2V0KVxuICAgICk7XG5cbiAgICAvLyBjb2xsZWN0IHRvdWNoZXNcbiAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgdGFyZ2V0VG91Y2hlcy5mb3JFYWNoKCh0YXJnZXRUb3VjaCkgPT4ge1xuICAgICAgICAgICAgdGFyZ2V0SWRzW3RhcmdldFRvdWNoLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGNoYW5nZWQgdG91Y2hlcyB0byBvbmx5IGNvbnRhaW4gdG91Y2hlcyB0aGF0IGV4aXN0IGluIHRoZSBjb2xsZWN0ZWQgdGFyZ2V0IGlkc1xuICAgIGNoYW5nZWRUb3VjaGVzLmZvckVhY2goKGNoYW5nZWRUb3VjaCkgPT4ge1xuICAgICAgICBpZiAodGFyZ2V0SWRzW2NoYW5nZWRUb3VjaC5pZGVudGlmaWVyXSlcbiAgICAgICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzLnB1c2goY2hhbmdlZFRvdWNoKTtcblxuICAgICAgICAvLyBjbGVhbnVwIHJlbW92ZWQgdG91Y2hlc1xuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKVxuICAgICAgICAgICAgZGVsZXRlIHRhcmdldElkc1tjaGFuZ2VkVG91Y2guaWRlbnRpZmllcl07XG4gICAgfSk7XG5cbiAgICBpZiAoIWNoYW5nZWRUYXJnZXRUb3VjaGVzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLy8gbWVyZ2UgdGFyZ2V0VG91Y2hlcyB3aXRoIGNoYW5nZWRUYXJnZXRUb3VjaGVzIHNvIGl0IGNvbnRhaW5zIEFMTCB0b3VjaGVzLCBpbmNsdWRpbmcgJ2VuZCcgYW5kICdjYW5jZWwnXG4gICAgICAgIHVuaXF1ZUFycmF5KFxuICAgICAgICAgICAgdGFyZ2V0VG91Y2hlcy5jb25jYXQoY2hhbmdlZFRhcmdldFRvdWNoZXMpLFxuICAgICAgICAgICAgJ2lkZW50aWZpZXInLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICApLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlc1xuICAgIF07XG59XG5cbi8qKlxuICogQ29tYmluZWQgdG91Y2ggYW5kIG1vdXNlIGlucHV0XG4gKlxuICogVG91Y2ggaGFzIGEgaGlnaGVyIHByaW9yaXR5IHRoZW4gbW91c2UsIGFuZCB3aGlsZSB0b3VjaGluZyBubyBtb3VzZSBldmVudHMgYXJlIGFsbG93ZWQuXG4gKiBUaGlzIGJlY2F1c2UgdG91Y2ggZGV2aWNlcyBhbHNvIGVtaXQgbW91c2UgZXZlbnRzIHdoaWxlIGRvaW5nIGEgdG91Y2guXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5cbnZhciBERURVUF9USU1FT1VUID0gMjUwMDtcbnZhciBERURVUF9ESVNUQU5DRSA9IDI1O1xuXG5mdW5jdGlvbiBUb3VjaE1vdXNlSW5wdXQoKSB7XG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBoYW5kbGVyID0gdGhpcy5oYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaCA9IG5ldyBUb3VjaElucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG4gICAgdGhpcy5tb3VzZSA9IG5ldyBNb3VzZUlucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG5cbiAgICB0aGlzLnByaW1hcnlUb3VjaCA9IG51bGw7XG4gICAgdGhpcy5sYXN0VG91Y2hlcyA9IFtdO1xufVxuXG5pbmhlcml0KFRvdWNoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgYW5kIHRvdWNoIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0RXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgaGFuZGxlcihtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIGlzVG91Y2ggPSBpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIGlzTW91c2UgPSBpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9NT1VTRTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBpc01vdXNlICYmXG4gICAgICAgICAgICBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzICYmXG4gICAgICAgICAgICBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzLmZpcmVzVG91Y2hFdmVudHNcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHdlJ3JlIGluIGEgdG91Y2ggZXZlbnQsIHJlY29yZCB0b3VjaGVzIHRvICBkZS1kdXBlIHN5bnRoZXRpYyBtb3VzZSBldmVudFxuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgcmVjb3JkVG91Y2hlcy5jYWxsKHRoaXMsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNNb3VzZSAmJiBpc1N5bnRoZXRpY0V2ZW50LmNhbGwodGhpcywgaW5wdXREYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayhtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudG91Y2guZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm1vdXNlLmRlc3Ryb3koKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcmVjb3JkVG91Y2hlcyhldmVudFR5cGUsIGV2ZW50RGF0YSkge1xuICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUb3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF0uaWRlbnRpZmllcjtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRMYXN0VG91Y2goZXZlbnREYXRhKSB7XG4gICAgdmFyIHRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXTtcblxuICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnByaW1hcnlUb3VjaCkge1xuICAgICAgICB2YXIgbGFzdFRvdWNoID0ge3g6IHRvdWNoLmNsaWVudFgsIHk6IHRvdWNoLmNsaWVudFl9O1xuICAgICAgICB0aGlzLmxhc3RUb3VjaGVzLnB1c2gobGFzdFRvdWNoKTtcbiAgICAgICAgdmFyIGx0cyA9IHRoaXMubGFzdFRvdWNoZXM7XG4gICAgICAgIHZhciByZW1vdmVMYXN0VG91Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGx0cy5pbmRleE9mKGxhc3RUb3VjaCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbHRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChyZW1vdmVMYXN0VG91Y2gsIERFRFVQX1RJTUVPVVQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNTeW50aGV0aWNFdmVudCh7c3JjRXZlbnQ6IHtjbGllbnRYLCBjbGllbnRZfX0pIHtcbiAgICByZXR1cm4gISF0aGlzLmxhc3RUb3VjaGVzLmZpbmQoXG4gICAgICAgIChsYXN0VG91Y2gpID0+XG4gICAgICAgICAgICBNYXRoLmFicyhjbGllbnRYIC0gbGFzdFRvdWNoLngpIDw9IERFRFVQX0RJU1RBTkNFICYmXG4gICAgICAgICAgICBNYXRoLmFicyhjbGllbnRZIC0gbGFzdFRvdWNoLnkpIDw9IERFRFVQX0RJU1RBTkNFXG4gICAgKTtcbn1cblxudmFyIFBSRUZJWEVEX1RPVUNIX0FDVElPTiA9ICgpID0+IHtcbiAgICBjb25zdCB0ZSA9IFRFU1RfRUxFTUVOVCgpO1xuICAgIGlmICh0ZSkgcmV0dXJuIHByZWZpeGVkKHRlLnN0eWxlLCAndG91Y2hBY3Rpb24nKTtcbn07XG52YXIgTkFUSVZFX1RPVUNIX0FDVElPTiA9ICgpID0+IFBSRUZJWEVEX1RPVUNIX0FDVElPTigpICE9PSB1bmRlZmluZWQ7XG5cbi8vIG1hZ2ljYWwgdG91Y2hBY3Rpb24gdmFsdWVcbnZhciBUT1VDSF9BQ1RJT05fQ09NUFVURSA9ICdjb21wdXRlJztcbnZhciBUT1VDSF9BQ1RJT05fQVVUTyA9ICdhdXRvJztcbnZhciBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OID0gJ21hbmlwdWxhdGlvbic7IC8vIG5vdCBpbXBsZW1lbnRlZFxudmFyIFRPVUNIX0FDVElPTl9OT05FID0gJ25vbmUnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWCA9ICdwYW4teCc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9ZID0gJ3Bhbi15JztcblxuLyoqXG4gKiBUb3VjaCBBY3Rpb25cbiAqIHNldHMgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IG9yIHVzZXMgdGhlIGpzIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFRvdWNoQWN0aW9uKG1hbmFnZXIsIHZhbHVlKSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLnNldCh2YWx1ZSk7XG59XG5cblRvdWNoQWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlIG9uIHRoZSBlbGVtZW50IG9yIGVuYWJsZSB0aGUgcG9seWZpbGxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgLy8gZmluZCBvdXQgdGhlIHRvdWNoLWFjdGlvbiBieSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgaWYgKHZhbHVlID09IFRPVUNIX0FDVElPTl9DT01QVVRFKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29tcHV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIFRPVUNIX0FDVElPTl9NQVAgPSBnZXRUb3VjaEFjdGlvblByb3BzKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIE5BVElWRV9UT1VDSF9BQ1RJT04oKSAmJlxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGUgJiZcbiAgICAgICAgICAgIFRPVUNIX0FDVElPTl9NQVBbdmFsdWVdXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGVbUFJFRklYRURfVE9VQ0hfQUNUSU9OKCldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3Rpb25zID0gdmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGp1c3QgcmUtc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zZXQodGhpcy5tYW5hZ2VyLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjb21wdXRlIHRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IGJhc2VkIG9uIHRoZSByZWNvZ25pemVyJ3Mgc2V0dGluZ3NcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGNvbXB1dGUoKSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIHRoaXMubWFuYWdlci5yZWNvZ25pemVycy5mb3JFYWNoKChyZWNvZ25pemVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoYm9vbE9yRm4ocmVjb2duaXplci5vcHRpb25zLmVuYWJsZSwgW3JlY29nbml6ZXJdKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChyZWNvZ25pemVyLmdldFRvdWNoQWN0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMuam9pbignICcpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgaXMgY2FsbGVkIG9uIGVhY2ggaW5wdXQgY3ljbGUgYW5kIHByb3ZpZGVzIHRoZSBwcmV2ZW50aW5nIG9mIHRoZSBicm93c2VyIGJlaGF2aW9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgcHJldmVudERlZmF1bHRzKGlucHV0KSB7XG4gICAgICAgIHZhciBzcmNFdmVudCA9IGlucHV0LnNyY0V2ZW50O1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQub2Zmc2V0RGlyZWN0aW9uO1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b3VjaCBhY3Rpb24gZGlkIHByZXZlbnRlZCBvbmNlIHRoaXMgc2Vzc2lvblxuICAgICAgICBpZiAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkKSB7XG4gICAgICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIHZhciBUT1VDSF9BQ1RJT05fTUFQID0gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpO1xuICAgICAgICB2YXIgaGFzTm9uZSA9XG4gICAgICAgICAgICBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkgJiZcbiAgICAgICAgICAgICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICAgICAgdmFyIGhhc1BhblkgPVxuICAgICAgICAgICAgaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKSAmJlxuICAgICAgICAgICAgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9ZXTtcbiAgICAgICAgdmFyIGhhc1BhblggPVxuICAgICAgICAgICAgaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKSAmJlxuICAgICAgICAgICAgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9YXTtcblxuICAgICAgICBpZiAoaGFzTm9uZSkge1xuICAgICAgICAgICAgLy9kbyBub3QgcHJldmVudCBkZWZhdWx0cyBpZiB0aGlzIGlzIGEgdGFwIGdlc3R1cmVcblxuICAgICAgICAgICAgdmFyIGlzVGFwUG9pbnRlciA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIHZhciBpc1RhcE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCAyO1xuICAgICAgICAgICAgdmFyIGlzVGFwVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgMjUwO1xuXG4gICAgICAgICAgICBpZiAoaXNUYXBQb2ludGVyICYmIGlzVGFwTW92ZW1lbnQgJiYgaXNUYXBUb3VjaFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgICAgICAvLyBgcGFuLXggcGFuLXlgIG1lYW5zIGJyb3dzZXIgaGFuZGxlcyBhbGwgc2Nyb2xsaW5nL3Bhbm5pbmcsIGRvIG5vdCBwcmV2ZW50XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBoYXNOb25lIHx8XG4gICAgICAgICAgICAoaGFzUGFuWSAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkgfHxcbiAgICAgICAgICAgIChoYXNQYW5YICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50U3JjKHNyY0V2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsIHByZXZlbnREZWZhdWx0IHRvIHByZXZlbnQgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW9yIChzY3JvbGxpbmcgaW4gbW9zdCBjYXNlcylcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3JjRXZlbnRcbiAgICAgKi9cbiAgICBwcmV2ZW50U3JjKHNyY0V2ZW50KSB7XG4gICAgICAgIHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiB3aGVuIHRoZSB0b3VjaEFjdGlvbnMgYXJlIGNvbGxlY3RlZCB0aGV5IGFyZSBub3QgYSB2YWxpZCB2YWx1ZSwgc28gd2UgbmVlZCB0byBjbGVhbiB0aGluZ3MgdXAuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucykge1xuICAgIC8vIG5vbmVcbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpKSByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG5cbiAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpO1xuXG4gICAgLy8gaWYgYm90aCBwYW4teCBhbmQgcGFuLXkgYXJlIHNldCAoZGlmZmVyZW50IHJlY29nbml6ZXJzXG4gICAgLy8gZm9yIGRpZmZlcmVudCBkaXJlY3Rpb25zLCBlLmcuIGhvcml6b250YWwgcGFuIGJ1dCB2ZXJ0aWNhbCBzd2lwZT8pXG4gICAgLy8gd2UgbmVlZCBub25lIChhcyBvdGhlcndpc2Ugd2l0aCBwYW4teCBwYW4teSBjb21iaW5lZCBub25lIG9mIHRoZXNlXG4gICAgLy8gcmVjb2duaXplcnMgd2lsbCB3b3JrLCBzaW5jZSB0aGUgYnJvd3NlciB3b3VsZCBoYW5kbGUgYWxsIHBhbm5pbmdcbiAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG5cbiAgICAvLyBwYW4teCBPUiBwYW4teVxuICAgIGlmIChoYXNQYW5YIHx8IGhhc1BhblkpXG4gICAgICAgIHJldHVybiBoYXNQYW5YID8gVE9VQ0hfQUNUSU9OX1BBTl9YIDogVE9VQ0hfQUNUSU9OX1BBTl9ZO1xuXG4gICAgLy8gbWFuaXB1bGF0aW9uXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04pKVxuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTjtcblxuICAgIHJldHVybiBUT1VDSF9BQ1RJT05fQVVUTztcbn1cblxuY29uc3QgdG91Y2hWYWxzID0gW1xuICAgICdhdXRvJyxcbiAgICAnbWFuaXB1bGF0aW9uJyxcbiAgICAncGFuLXknLFxuICAgICdwYW4teCcsXG4gICAgJ3Bhbi14IHBhbi15JyxcbiAgICAnbm9uZSdcbl07XG5mdW5jdGlvbiBnZXRUb3VjaEFjdGlvblByb3BzKCkge1xuICAgIGlmICghTkFUSVZFX1RPVUNIX0FDVElPTigpKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGNzc1N1cHBvcnRzID1cbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkNTUyAmJiB3aW5kb3cuQ1NTLnN1cHBvcnRzO1xuICAgIHJldHVybiB0b3VjaFZhbHMucmVkdWNlKCh0b3VjaE1hcCwgdmFsKSA9PiB7XG4gICAgICAgIC8vIElmIGNzcy5zdXBwb3J0cyBpcyBub3Qgc3VwcG9ydGVkIGJ1dCB0aGVyZSBpcyBuYXRpdmUgdG91Y2gtYWN0aW9uIGFzc3VtZSBpdCBzdXBwb3J0c1xuICAgICAgICAvLyBhbGwgdmFsdWVzLiBUaGlzIGlzIHRoZSBjYXNlIGZvciBJRSAxMCBhbmQgMTEuXG4gICAgICAgIHRvdWNoTWFwW3ZhbF0gPSBjc3NTdXBwb3J0c1xuICAgICAgICAgICAgPyB3aW5kb3cuQ1NTLnN1cHBvcnRzKCd0b3VjaC1hY3Rpb24nLCB2YWwpXG4gICAgICAgICAgICA6IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRvdWNoTWFwO1xuICAgIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBSZWNvZ25pemVyIGZsb3cgZXhwbGFpbmVkOyAqXG4gKiBBbGwgcmVjb2duaXplcnMgaGF2ZSB0aGUgaW5pdGlhbCBzdGF0ZSBvZiBQT1NTSUJMRSB3aGVuIGEgaW5wdXQgc2Vzc2lvbiBzdGFydHMuXG4gKiBUaGUgZGVmaW5pdGlvbiBvZiBhIGlucHV0IHNlc3Npb24gaXMgZnJvbSB0aGUgZmlyc3QgaW5wdXQgdW50aWwgdGhlIGxhc3QgaW5wdXQsIHdpdGggYWxsIGl0J3MgbW92ZW1lbnQgaW4gaXQuICpcbiAqIEV4YW1wbGUgc2Vzc2lvbiBmb3IgbW91c2UtaW5wdXQ6IG1vdXNlZG93biAtPiBtb3VzZW1vdmUgLT4gbW91c2V1cFxuICpcbiAqIE9uIGVhY2ggcmVjb2duaXppbmcgY3ljbGUgKHNlZSBNYW5hZ2VyLnJlY29nbml6ZSkgdGhlIC5yZWNvZ25pemUoKSBtZXRob2QgaXMgZXhlY3V0ZWRcbiAqIHdoaWNoIGRldGVybWluZXMgd2l0aCBzdGF0ZSBpdCBzaG91bGQgYmUuXG4gKlxuICogSWYgdGhlIHJlY29nbml6ZXIgaGFzIHRoZSBzdGF0ZSBGQUlMRUQsIENBTkNFTExFRCBvciBSRUNPR05JWkVEIChlcXVhbHMgRU5ERUQpLCBpdCBpcyByZXNldCB0b1xuICogUE9TU0lCTEUgdG8gZ2l2ZSBpdCBhbm90aGVyIGNoYW5nZSBvbiB0aGUgbmV4dCBjeWNsZS5cbiAqXG4gKiAgICAgICAgICAgICAgIFBvc3NpYmxlXG4gKiAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgKy0tLS0tKy0tLS0tLS0tLS0tLS0tLStcbiAqICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgKy0tLS0tKy0tLS0tKyAgICAgICAgICAgICAgIHxcbiAqICAgICAgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgIHxcbiAqICAgRmFpbGVkICAgICAgQ2FuY2VsbGVkICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0rXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgUmVjb2duaXplZCAgICAgICBCZWdhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kZWQvUmVjb2duaXplZFxuICovXG52YXIgU1RBVEVfUE9TU0lCTEUgPSAxO1xudmFyIFNUQVRFX0JFR0FOID0gMjtcbnZhciBTVEFURV9DSEFOR0VEID0gNDtcbnZhciBTVEFURV9FTkRFRCA9IDg7XG52YXIgU1RBVEVfUkVDT0dOSVpFRCA9IFNUQVRFX0VOREVEO1xudmFyIFNUQVRFX0NBTkNFTExFRCA9IDE2O1xudmFyIFNUQVRFX0ZBSUxFRCA9IDMyO1xuXG4vKipcbiAqIFJlY29nbml6ZXJcbiAqIEV2ZXJ5IHJlY29nbml6ZXIgbmVlZHMgdG8gZXh0ZW5kIGZyb20gdGhpcyBjbGFzcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gUmVjb2duaXplcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gey4uLnRoaXMuZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuXG4gICAgdGhpcy5pZCA9IHVuaXF1ZUlkKCk7XG5cbiAgICB0aGlzLm1hbmFnZXIgPSBudWxsO1xuXG4gICAgLy8gZGVmYXVsdCBpcyBlbmFibGUgdHJ1ZVxuICAgIHRoaXMub3B0aW9ucy5lbmFibGUgPSBpZlVuZGVmaW5lZCh0aGlzLm9wdGlvbnMuZW5hYmxlLCB0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcblxuICAgIHRoaXMuc2ltdWx0YW5lb3VzID0ge307XG4gICAgdGhpcy5yZXF1aXJlRmFpbCA9IFtdO1xufVxuXG5SZWNvZ25pemVyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgZGVmYXVsdHM6IHt9LFxuXG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1JlY29nbml6ZXJ9XG4gICAgICovXG4gICAgc2V0KG9wdGlvbnMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGFsc28gdXBkYXRlIHRoZSB0b3VjaEFjdGlvbiwgaW4gY2FzZSBzb21ldGhpbmcgY2hhbmdlZCBhYm91dCB0aGUgZGlyZWN0aW9ucy9lbmFibGVkIHN0YXRlXG4gICAgICAgIHRoaXMubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVjb2duaXplV2l0aChvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlY29nbml6ZVdpdGgnLCB0aGlzKSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdmFyIHNpbXVsdGFuZW91cyA9IHRoaXMuc2ltdWx0YW5lb3VzO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmICghc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0pIHtcbiAgICAgICAgICAgIHNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdID0gb3RoZXJSZWNvZ25pemVyO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlY29nbml6ZVdpdGgodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHNpbXVsdGFuZW91cyBsaW5rLiBpdCBkb2VzbnQgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVjb2duaXplV2l0aChvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZWNvZ25pemVXaXRoJywgdGhpcykpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplciBjYW4gb25seSBydW4gd2hlbiBhbiBvdGhlciBpcyBmYWlsaW5nXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlcXVpcmVGYWlsdXJlKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVxdWlyZUZhaWx1cmUnLCB0aGlzKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIHZhciByZXF1aXJlRmFpbCA9IHRoaXMucmVxdWlyZUZhaWw7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKHJlcXVpcmVGYWlsLmluZGV4T2Yob3RoZXJSZWNvZ25pemVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJlcXVpcmVGYWlsLnB1c2gob3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZXF1aXJlRmFpbHVyZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgcmVxdWlyZUZhaWx1cmUgbGluay4gaXQgZG9lcyBub3QgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVxdWlyZUZhaWx1cmUob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVxdWlyZUZhaWx1cmUnLCB0aGlzKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5yZXF1aXJlRmFpbC5pbmRleE9mKG90aGVyUmVjb2duaXplcik7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLnJlcXVpcmVGYWlsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBoYXMgcmVxdWlyZSBmYWlsdXJlcyBib29sZWFuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzUmVxdWlyZUZhaWx1cmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGggPiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgcmVjb2duaXplciBjYW4gcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNhblJlY29nbml6ZVdpdGgob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFlvdSBzaG91bGQgdXNlIGB0cnlFbWl0YCBpbnN0ZWFkIG9mIGBlbWl0YCBkaXJlY3RseSB0byBjaGVja1xuICAgICAqIHRoYXQgYWxsIHRoZSBuZWVkZWQgcmVjb2duaXplcnMgaGFzIGZhaWxlZCBiZWZvcmUgZW1pdHRpbmcuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgZW1pdChpbnB1dCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5tYW5hZ2VyLmVtaXQoZXZlbnQsIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICdwYW5zdGFydCcgYW5kICdwYW5tb3ZlJ1xuICAgICAgICBpZiAoc3RhdGUgPCBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQpOyAvLyBzaW1wbGUgJ2V2ZW50TmFtZScgZXZlbnRzXG5cbiAgICAgICAgaWYgKGlucHV0LmFkZGl0aW9uYWxFdmVudCkge1xuICAgICAgICAgICAgLy8gYWRkaXRpb25hbCBldmVudChwYW5sZWZ0LCBwYW5yaWdodCwgcGluY2hpbiwgcGluY2hvdXQuLi4pXG4gICAgICAgICAgICBlbWl0KGlucHV0LmFkZGl0aW9uYWxFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYW5lbmQgYW5kIHBhbmNhbmNlbFxuICAgICAgICBpZiAoc3RhdGUgPj0gU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGF0IGFsbCB0aGUgcmVxdWlyZSBmYWlsdXJlIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQsXG4gICAgICogaWYgdHJ1ZSwgaXQgZW1pdHMgYSBnZXN0dXJlIGV2ZW50LFxuICAgICAqIG90aGVyd2lzZSwgc2V0dXAgdGhlIHN0YXRlIHRvIEZBSUxFRC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICB0cnlFbWl0KGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLmNhbkVtaXQoKSkgcmV0dXJuIHRoaXMuZW1pdChpbnB1dCk7XG5cbiAgICAgICAgLy8gaXQncyBmYWlsaW5nIGFueXdheVxuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYW4gd2UgZW1pdD9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5FbWl0KCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhKHRoaXMucmVxdWlyZUZhaWxbaV0uc3RhdGUgJiAoU1RBVEVfRkFJTEVEIHwgU1RBVEVfUE9TU0lCTEUpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplKGlucHV0RGF0YSkge1xuICAgICAgICAvLyBtYWtlIGEgbmV3IGNvcHkgb2YgdGhlIGlucHV0RGF0YVxuICAgICAgICAvLyBzbyB3ZSBjYW4gY2hhbmdlIHRoZSBpbnB1dERhdGEgd2l0aG91dCBtZXNzaW5nIHVwIHRoZSBvdGhlciByZWNvZ25pemVyc1xuICAgICAgICB2YXIgaW5wdXREYXRhQ2xvbmUgPSB7Li4uaW5wdXREYXRhfTtcblxuICAgICAgICAvLyBpcyBpcyBlbmFibGVkIGFuZCBhbGxvdyByZWNvZ25pemluZz9cbiAgICAgICAgaWYgKCFib29sT3JGbih0aGlzLm9wdGlvbnMuZW5hYmxlLCBbdGhpcywgaW5wdXREYXRhQ2xvbmVdKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gd2UndmUgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX1JFQ09HTklaRUQgfCBTVEFURV9DQU5DRUxMRUQgfCBTVEFURV9GQUlMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5wcm9jZXNzKGlucHV0RGF0YUNsb25lKTtcblxuICAgICAgICAvLyB0aGUgcmVjb2duaXplciBoYXMgcmVjb2duaXplZCBhIGdlc3R1cmVcbiAgICAgICAgLy8gc28gdHJpZ2dlciBhbiBldmVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnN0YXRlICZcbiAgICAgICAgICAgIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCB8IFNUQVRFX0NBTkNFTExFRClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnRyeUVtaXQoaW5wdXREYXRhQ2xvbmUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgc3RhdGUgb2YgdGhlIHJlY29nbml6ZXJcbiAgICAgKiB0aGUgYWN0dWFsIHJlY29nbml6aW5nIGhhcHBlbnMgaW4gdGhpcyBtZXRob2RcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKiBAcmV0dXJucyB7Q29uc3R9IFNUQVRFXG4gICAgICovXG4gICAgcHJvY2VzcygpIHt9LCAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgcHJlZmVycmVkIHRvdWNoLWFjdGlvblxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldFRvdWNoQWN0aW9uKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgZ2VzdHVyZSBpc24ndCBhbGxvd2VkIHRvIHJlY29nbml6ZVxuICAgICAqIGxpa2Ugd2hlbiBhbm90aGVyIGlzIGJlaW5nIHJlY29nbml6ZWQgb3IgaXQgaXMgZGlzYWJsZWRcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIHJlc2V0KCkge31cbn07XG5cbi8qKlxuICogZ2V0IGEgdXNhYmxlIHN0cmluZywgdXNlZCBhcyBldmVudCBwb3N0Zml4XG4gKiBAcGFyYW0ge0NvbnN0fSBzdGF0ZVxuICogQHJldHVybnMge1N0cmluZ30gc3RhdGVcbiAqL1xuZnVuY3Rpb24gc3RhdGVTdHIoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgJiBTVEFURV9DQU5DRUxMRUQpIHtcbiAgICAgICAgcmV0dXJuICdjYW5jZWwnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9FTkRFRCkge1xuICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0NIQU5HRUQpIHtcbiAgICAgICAgcmV0dXJuICdtb3ZlJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQkVHQU4pIHtcbiAgICAgICAgcmV0dXJuICdzdGFydCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBkaXJlY3Rpb24gY29ucyB0byBzdHJpbmdcbiAqIEBwYXJhbSB7Q29uc3R9IGRpcmVjdGlvblxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGlyZWN0aW9uU3RyKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0RPV04pIHtcbiAgICAgICAgcmV0dXJuICdkb3duJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fVVApIHtcbiAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0xFRlQpIHtcbiAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fUklHSFQpIHtcbiAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBnZXQgYSByZWNvZ25pemVyIGJ5IG5hbWUgaWYgaXQgaXMgYm91bmQgdG8gYSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSBvdGhlclJlY29nbml6ZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICogQHJldHVybnMge1JlY29nbml6ZXJ9XG4gKi9cbmNvbnN0IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIgPSAob3RoZXJSZWNvZ25pemVyLCB7bWFuYWdlcn0pID0+XG4gICAgbWFuYWdlciA/IG1hbmFnZXIuZ2V0KG90aGVyUmVjb2duaXplcikgOiBvdGhlclJlY29nbml6ZXI7XG5cbi8qKlxuICogVGhpcyByZWNvZ25pemVyIGlzIGp1c3QgdXNlZCBhcyBhIGJhc2UgZm9yIHRoZSBzaW1wbGUgYXR0cmlidXRlIHJlY29nbml6ZXJzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIEF0dHJSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChBdHRyUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGVjayBpZiBpdCB0aGUgcmVjb2duaXplciByZWNlaXZlcyB2YWxpZCBpbnB1dCwgbGlrZSBpbnB1dC5kaXN0YW5jZSA+IDEwLlxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSByZWNvZ25pemVkXG4gICAgICovXG4gICAgYXR0clRlc3QoaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvblBvaW50ZXJzID0gdGhpcy5vcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICByZXR1cm4gb3B0aW9uUG9pbnRlcnMgPT09IDAgfHwgaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25Qb2ludGVycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgaW5wdXQgYW5kIHJldHVybiB0aGUgc3RhdGUgZm9yIHRoZSByZWNvZ25pemVyXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMgeyp9IFN0YXRlXG4gICAgICovXG4gICAgcHJvY2VzcyhpbnB1dCkge1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gaW5wdXQuZXZlbnRUeXBlO1xuXG4gICAgICAgIHZhciBpc1JlY29nbml6ZWQgPSBzdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuYXR0clRlc3QoaW5wdXQpO1xuXG4gICAgICAgIC8vIG9uIGNhbmNlbCBpbnB1dCBhbmQgd2UndmUgcmVjb2duaXplZCBiZWZvcmUsIHJldHVybiBTVEFURV9DQU5DRUxMRURcbiAgICAgICAgaWYgKGlzUmVjb2duaXplZCAmJiAoZXZlbnRUeXBlICYgSU5QVVRfQ0FOQ0VMIHx8ICFpc1ZhbGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0FOQ0VMTEVEO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUmVjb2duaXplZCB8fCBpc1ZhbGlkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfRU5ERUQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEoc3RhdGUgJiBTVEFURV9CRUdBTikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DSEFOR0VEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGFuXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBhbmQgbW92ZWQgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQYW5SZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBYID0gbnVsbDtcbiAgICB0aGlzLnBZID0gbnVsbDtcbn1cblxuaW5oZXJpdChQYW5SZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGFuUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGFuJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0FMTFxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbigpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG5cbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH0sXG5cbiAgICBkaXJlY3Rpb25UZXN0KGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgaGFzTW92ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSBpbnB1dC5kaXN0YW5jZTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0LmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHZhciB5ID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIC8vIGxvY2sgdG8gYXhpcz9cbiAgICAgICAgaWYgKCEoZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9XG4gICAgICAgICAgICAgICAgICAgIHggPT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gRElSRUNUSU9OX05PTkVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeCA8IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gRElSRUNUSU9OX0xFRlRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogRElSRUNUSU9OX1JJR0hUO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geCAhPSB0aGlzLnBYO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFYKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgeSA9PT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBESVJFQ1RJT05fTk9ORVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB5IDwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBESVJFQ1RJT05fVVBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogRElSRUNUSU9OX0RPV047XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB5ICE9IHRoaXMucFk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGhhc01vdmVkICYmXG4gICAgICAgICAgICBkaXN0YW5jZSA+IG9wdGlvbnMudGhyZXNob2xkICYmXG4gICAgICAgICAgICBkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvblxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdChpbnB1dCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgQXR0clJlY29nbml6ZXIucHJvdG90eXBlLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOIHx8XG4gICAgICAgICAgICAgICAgKCEodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKSAmJiB0aGlzLmRpcmVjdGlvblRlc3QoaW5wdXQpKSlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgZW1pdChpbnB1dCkge1xuICAgICAgICB0aGlzLnBYID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB0aGlzLnBZID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQuZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uKSBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQaW5jaFxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXJzIGFyZSBtb3ZpbmcgdG93YXJkICh6b29tLWluKSBvciBhd2F5IGZyb20gZWFjaCBvdGhlciAoem9vbS1vdXQpLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQaW5jaFJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChQaW5jaFJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BpbmNoJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnNjYWxlIC0gMSkgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBlbWl0KGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgdmFyIGluT3V0ID0gaW5wdXQuc2NhbGUgPCAxID8gJ2luJyA6ICdvdXQnO1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgaW5PdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQcmVzc1xuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gZm9yIHggbXMgd2l0aG91dCBhbnkgbW92ZW1lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUHJlc3NSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG59XG5cbmluaGVyaXQoUHJlc3NSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQcmVzc1JlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3ByZXNzJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRpbWU6IDI1MSwgLy8gbWluaW1hbCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIHByZXNzZWRcbiAgICAgICAgdGhyZXNob2xkOiA5IC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9BVVRPXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzcyhpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVGltZSA9IGlucHV0LmRlbHRhVGltZSA+IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXZhbGlkTW92ZW1lbnQgfHxcbiAgICAgICAgICAgICF2YWxpZFBvaW50ZXJzIHx8XG4gICAgICAgICAgICAoaW5wdXQuZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgIXZhbGlkVGltZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICB9LCBvcHRpb25zLnRpbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQoaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArICd1cCcsIGlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBSb3RhdGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVyIGFyZSBtb3ZpbmcgaW4gYSBjaXJjdWxhciBtb3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFJvdGF0ZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChSb3RhdGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUm90YXRlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncm90YXRlJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnJvdGF0aW9uKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogU3dpcGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBtb3ZpbmcgZmFzdCAodmVsb2NpdHkpLCB3aXRoIGVub3VnaCBkaXN0YW5jZSBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFN3aXBlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFN3aXBlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFN3aXBlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAnc3dpcGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICB2ZWxvY2l0eTogMC4zLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBhblJlY29nbml6ZXIucHJvdG90eXBlLmdldFRvdWNoQWN0aW9uLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHJUZXN0KGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgdmVsb2NpdHk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIChESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIGRpcmVjdGlvbiAmIGlucHV0Lm9mZnNldERpcmVjdGlvbiAmJlxuICAgICAgICAgICAgaW5wdXQuZGlzdGFuY2UgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkICYmXG4gICAgICAgICAgICBpbnB1dC5tYXhQb2ludGVycyA9PSB0aGlzLm9wdGlvbnMucG9pbnRlcnMgJiZcbiAgICAgICAgICAgIGFicyh2ZWxvY2l0eSkgPiB0aGlzLm9wdGlvbnMudmVsb2NpdHkgJiZcbiAgICAgICAgICAgIGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORFxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBlbWl0KGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQub2Zmc2V0RGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbikgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uLCBpbnB1dCk7XG5cbiAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQSB0YXAgaXMgZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG9pbmcgYSBzbWFsbCB0YXAvY2xpY2suIE11bHRpcGxlIHRhcHMgYXJlIHJlY29nbml6ZWQgaWYgdGhleSBvY2N1clxuICogYmV0d2VlbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwgYW5kIHBvc2l0aW9uLiBUaGUgZGVsYXkgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJlY29nbml6ZSBtdWx0aS10YXBzIHdpdGhvdXQgZmlyaW5nXG4gKiBhIHNpbmdsZSB0YXAuXG4gKlxuICogVGhlIGV2ZW50RGF0YSBmcm9tIHRoZSBlbWl0dGVkIGV2ZW50IGNvbnRhaW5zIHRoZSBwcm9wZXJ0eSBgdGFwQ291bnRgLCB3aGljaCBjb250YWlucyB0aGUgYW1vdW50IG9mXG4gKiBtdWx0aS10YXBzIGJlaW5nIHJlY29nbml6ZWQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gVGFwUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBwcmV2aW91cyB0aW1lIGFuZCBjZW50ZXIsXG4gICAgLy8gdXNlZCBmb3IgdGFwIGNvdW50aW5nXG4gICAgdGhpcy5wVGltZSA9IGZhbHNlO1xuICAgIHRoaXMucENlbnRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbn1cblxuaW5oZXJpdChUYXBSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3RhcCcsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0YXBzOiAxLFxuICAgICAgICBpbnRlcnZhbDogMzAwLCAvLyBtYXggdGltZSBiZXR3ZWVuIHRoZSBtdWx0aS10YXAgdGFwc1xuICAgICAgICB0aW1lOiAyNTAsIC8vIG1heCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIGRvd24gKGxpa2UgZmluZ2VyIG9uIHRoZSBzY3JlZW4pXG4gICAgICAgIHRocmVzaG9sZDogOSwgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICAgICAgcG9zVGhyZXNob2xkOiAxMCAvLyBhIG11bHRpLXRhcCBjYW4gYmUgYSBiaXQgb2ZmIHRoZSBpbml0aWFsIHBvc2l0aW9uXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9NQU5JUFVMQVRJT05dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIHRoaXMuY291bnQgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKHZhbGlkTW92ZW1lbnQgJiYgdmFsaWRUb3VjaFRpbWUgJiYgdmFsaWRQb2ludGVycykge1xuICAgICAgICAgICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9FTkQpIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG5cbiAgICAgICAgICAgIHZhciB2YWxpZEludGVydmFsID0gdGhpcy5wVGltZVxuICAgICAgICAgICAgICAgID8gaW5wdXQudGltZVN0YW1wIC0gdGhpcy5wVGltZSA8IG9wdGlvbnMuaW50ZXJ2YWxcbiAgICAgICAgICAgICAgICA6IHRydWU7XG4gICAgICAgICAgICB2YXIgdmFsaWRNdWx0aVRhcCA9XG4gICAgICAgICAgICAgICAgIXRoaXMucENlbnRlciB8fFxuICAgICAgICAgICAgICAgIGdldERpc3RhbmNlKHRoaXMucENlbnRlciwgaW5wdXQuY2VudGVyKSA8IG9wdGlvbnMucG9zVGhyZXNob2xkO1xuXG4gICAgICAgICAgICB0aGlzLnBUaW1lID0gaW5wdXQudGltZVN0YW1wO1xuICAgICAgICAgICAgdGhpcy5wQ2VudGVyID0gaW5wdXQuY2VudGVyO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkTXVsdGlUYXAgfHwgIXZhbGlkSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgICAgICAvLyBpZiB0YXAgY291bnQgbWF0Y2hlcyB3ZSBoYXZlIHJlY29nbml6ZWQgaXQsXG4gICAgICAgICAgICAvLyBlbHNlIGl0IGhhcyBiZWdhbiByZWNvZ25pemluZy4uLlxuICAgICAgICAgICAgdmFyIHRhcENvdW50ID0gdGhpcy5jb3VudCAlIG9wdGlvbnMudGFwcztcbiAgICAgICAgICAgIGlmICh0YXBDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGZhaWxpbmcgcmVxdWlyZW1lbnRzLCBpbW1lZGlhdGVseSB0cmlnZ2VyIHRoZSB0YXAgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyBvciB3YWl0IGFzIGxvbmcgYXMgdGhlIG11bHRpdGFwIGludGVydmFsIHRvIHRyaWdnZXJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzUmVxdWlyZUZhaWx1cmVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIGZhaWxUaW1lb3V0KCkge1xuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmludGVydmFsKTtcbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRhcENvdW50ID0gdGhpcy5jb3VudDtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogU2ltcGxlIHdheSB0byBjcmVhdGUgYSBtYW5hZ2VyIHdpdGggYSBkZWZhdWx0IHNldCBvZiByZWNvZ25pemVycy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIYW1tZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMucmVjb2duaXplcnMgPSBpZlVuZGVmaW5lZChcbiAgICAgICAgb3B0aW9ucy5yZWNvZ25pemVycyxcbiAgICAgICAgSGFtbWVyLmRlZmF1bHRzLnByZXNldFxuICAgICk7XG4gICAgcmV0dXJuIG5ldyBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEBjb25zdCB7c3RyaW5nfVxuICovXG5IYW1tZXIuVkVSU0lPTiA9ICcyLjAuNyc7XG5cbi8qKlxuICogZGVmYXVsdCBzZXR0aW5nc1xuICogQG5hbWVzcGFjZVxuICovXG5IYW1tZXIuZGVmYXVsdHMgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IGlmIERPTSBldmVudHMgYXJlIGJlaW5nIHRyaWdnZXJlZC5cbiAgICAgKiBCdXQgdGhpcyBpcyBzbG93ZXIgYW5kIHVudXNlZCBieSBzaW1wbGUgaW1wbGVtZW50YXRpb25zLCBzbyBkaXNhYmxlZCBieSBkZWZhdWx0LlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZG9tRXZlbnRzOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5L2ZhbGxiYWNrLlxuICAgICAqIFdoZW4gc2V0IHRvIGBjb21wdXRlYCBpdCB3aWxsIG1hZ2ljYWxseSBzZXQgdGhlIGNvcnJlY3QgdmFsdWUgYmFzZWQgb24gdGhlIGFkZGVkIHJlY29nbml6ZXJzLlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgY29tcHV0ZVxuICAgICAqL1xuICAgIHRvdWNoQWN0aW9uOiBUT1VDSF9BQ1RJT05fQ09NUFVURSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGU6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBFWFBFUklNRU5UQUwgRkVBVFVSRSAtLSBjYW4gYmUgcmVtb3ZlZC9jaGFuZ2VkXG4gICAgICogQ2hhbmdlIHRoZSBwYXJlbnQgaW5wdXQgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICogSWYgTnVsbCwgdGhlbiBpdCBpcyBiZWluZyBzZXQgdGhlIHRvIG1haW4gZWxlbWVudC5cbiAgICAgKiBAdHlwZSB7TnVsbHxFdmVudFRhcmdldH1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRUYXJnZXQ6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBmb3JjZSBhbiBpbnB1dCBjbGFzc1xuICAgICAqIEB0eXBlIHtOdWxsfEZ1bmN0aW9ufVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dENsYXNzOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCByZWNvZ25pemVyIHNldHVwIHdoZW4gY2FsbGluZyBgSGFtbWVyKClgXG4gICAgICogV2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyIHRoZXNlIHdpbGwgYmUgc2tpcHBlZC5cbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgcHJlc2V0OiBbXG4gICAgICAgIC8vIFJlY29nbml6ZXJDbGFzcywgb3B0aW9ucywgW3JlY29nbml6ZVdpdGgsIC4uLl0sIFtyZXF1aXJlRmFpbHVyZSwgLi4uXVxuICAgICAgICBbUm90YXRlUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9XSxcbiAgICAgICAgW1BpbmNoUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9LCBbJ3JvdGF0ZSddXSxcbiAgICAgICAgW1N3aXBlUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9XSxcbiAgICAgICAgW1BhblJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfSwgWydzd2lwZSddXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXJdLFxuICAgICAgICBbVGFwUmVjb2duaXplciwge2V2ZW50OiAnZG91YmxldGFwJywgdGFwczogMn0sIFsndGFwJ11dLFxuICAgICAgICBbUHJlc3NSZWNvZ25pemVyXVxuICAgIF0sXG5cbiAgICAvKipcbiAgICAgKiBTb21lIENTUyBwcm9wZXJ0aWVzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgdGhlIHdvcmtpbmcgb2YgSGFtbWVyLlxuICAgICAqIEFkZCB0aGVtIHRvIHRoaXMgbWV0aG9kIGFuZCB0aGV5IHdpbGwgYmUgc2V0IHdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlci5cbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgY3NzUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRleHQgc2VsZWN0aW9uIHRvIGltcHJvdmUgdGhlIGRyYWdnaW5nIGdlc3R1cmUuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgdGhlIFdpbmRvd3MgUGhvbmUgZ3JpcHBlcnMgd2hlbiBwcmVzc2luZyBhbiBlbGVtZW50LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRoZSBkZWZhdWx0IGNhbGxvdXQgc2hvd24gd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQuXG4gICAgICAgICAqIE9uIGlPUywgd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQgc3VjaCBhcyBhIGxpbmssIFNhZmFyaSBkaXNwbGF5c1xuICAgICAgICAgKiBhIGNhbGxvdXQgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbGluay4gVGhpcyBwcm9wZXJ0eSBhbGxvd3MgeW91IHRvIGRpc2FibGUgdGhhdCBjYWxsb3V0LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoQ2FsbG91dDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB6b29taW5nIGlzIGVuYWJsZWQuIFVzZWQgYnkgSUUxMD5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICBjb250ZW50Wm9vbWluZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgdGhhdCBhbiBlbnRpcmUgZWxlbWVudCBzaG91bGQgYmUgZHJhZ2dhYmxlIGluc3RlYWQgb2YgaXRzIGNvbnRlbnRzLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlckRyYWc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3ZlcnJpZGVzIHRoZSBoaWdobGlnaHQgY29sb3Igc2hvd24gd2hlbiB0aGUgdXNlciB0YXBzIGEgbGluayBvciBhIEphdmFTY3JpcHRcbiAgICAgICAgICogY2xpY2thYmxlIGVsZW1lbnQgaW4gaU9TLiBUaGlzIHByb3BlcnR5IG9iZXlzIHRoZSBhbHBoYSB2YWx1ZSwgaWYgc3BlY2lmaWVkLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAncmdiYSgwLDAsMCwwKSdcbiAgICAgICAgICovXG4gICAgICAgIHRhcEhpZ2hsaWdodENvbG9yOiAncmdiYSgwLDAsMCwwKSdcbiAgICB9XG59O1xuXG52YXIgU1RPUCA9IDE7XG52YXIgRk9SQ0VEX1NUT1AgPSAyO1xuXG4vKipcbiAqIE1hbmFnZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7Li4uSGFtbWVyLmRlZmF1bHRzLCAuLi5vcHRpb25zfTtcblxuICAgIHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCA9IHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCB8fCBlbGVtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgIHRoaXMucmVjb2duaXplcnMgPSBbXTtcbiAgICB0aGlzLm9sZENzc1Byb3BzID0ge307XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaW5wdXQgPSBjcmVhdGVJbnB1dEluc3RhbmNlKHRoaXMpO1xuICAgIHRoaXMudG91Y2hBY3Rpb24gPSBuZXcgVG91Y2hBY3Rpb24odGhpcywgdGhpcy5vcHRpb25zLnRvdWNoQWN0aW9uKTtcblxuICAgIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZWNvZ25pemVycykge1xuICAgICAgICB0aGlzLm9wdGlvbnMucmVjb2duaXplcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlY29nbml6ZXIgPSB0aGlzLmFkZChuZXcgaXRlbVswXShpdGVtWzFdKSk7XG4gICAgICAgICAgICBpdGVtWzJdICYmIHJlY29nbml6ZXIucmVjb2duaXplV2l0aChpdGVtWzJdKTtcbiAgICAgICAgICAgIGl0ZW1bM10gJiYgcmVjb2duaXplci5yZXF1aXJlRmFpbHVyZShpdGVtWzNdKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgc2V0KG9wdGlvbnMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIE9wdGlvbnMgdGhhdCBuZWVkIGEgbGl0dGxlIG1vcmUgc2V0dXBcbiAgICAgICAgaWYgKG9wdGlvbnMudG91Y2hBY3Rpb24pIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaW5wdXRUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vIENsZWFuIHVwIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVycyBhbmQgcmVpbml0aWFsaXplXG4gICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudGFyZ2V0ID0gb3B0aW9ucy5pbnB1dFRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHN0b3AgcmVjb2duaXppbmcgZm9yIHRoaXMgc2Vzc2lvbi5cbiAgICAgKiBUaGlzIHNlc3Npb24gd2lsbCBiZSBkaXNjYXJkZWQsIHdoZW4gYSBuZXcgW2lucHV0XXN0YXJ0IGV2ZW50IGlzIGZpcmVkLlxuICAgICAqIFdoZW4gZm9yY2VkLCB0aGUgcmVjb2duaXplciBjeWNsZSBpcyBzdG9wcGVkIGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlXVxuICAgICAqL1xuICAgIHN0b3AoZm9yY2UpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnN0b3BwZWQgPSBmb3JjZSA/IEZPUkNFRF9TVE9QIDogU1RPUDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcnVuIHRoZSByZWNvZ25pemVycyFcbiAgICAgKiBjYWxsZWQgYnkgdGhlIGlucHV0SGFuZGxlciBmdW5jdGlvbiBvbiBldmVyeSBtb3ZlbWVudCBvZiB0aGUgcG9pbnRlcnMgKHRvdWNoZXMpXG4gICAgICogaXQgd2Fsa3MgdGhyb3VnaCBhbGwgdGhlIHJlY29nbml6ZXJzIGFuZCB0cmllcyB0byBkZXRlY3QgdGhlIGdlc3R1cmUgdGhhdCBpcyBiZWluZyBtYWRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZShpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLnNlc3Npb247XG4gICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQpIHJldHVybjtcblxuICAgICAgICAvLyBydW4gdGhlIHRvdWNoLWFjdGlvbiBwb2x5ZmlsbFxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnByZXZlbnREZWZhdWx0cyhpbnB1dERhdGEpO1xuXG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG5cbiAgICAgICAgLy8gdGhpcyBob2xkcyB0aGUgcmVjb2duaXplciB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgIC8vIHNvIHRoZSByZWNvZ25pemVyJ3Mgc3RhdGUgbmVlZHMgdG8gYmUgQkVHQU4sIENIQU5HRUQsIEVOREVEIG9yIFJFQ09HTklaRURcbiAgICAgICAgLy8gaWYgbm8gcmVjb2duaXplciBpcyBkZXRlY3RpbmcgYSB0aGluZywgaXQgaXMgc2V0IHRvIGBudWxsYFxuICAgICAgICB2YXIgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplcjtcblxuICAgICAgICAvLyByZXNldCB3aGVuIHRoZSBsYXN0IHJlY29nbml6ZXIgaXMgcmVjb2duaXplZFxuICAgICAgICAvLyBvciB3aGVuIHdlJ3JlIGluIGEgbmV3IHNlc3Npb25cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWN1clJlY29nbml6ZXIgfHxcbiAgICAgICAgICAgIChjdXJSZWNvZ25pemVyICYmIGN1clJlY29nbml6ZXIuc3RhdGUgJiBTVEFURV9SRUNPR05JWkVEKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjb2duaXplcnMuZm9yRWFjaCgocmVjb2duaXplcikgPT4ge1xuICAgICAgICAgICAgLy8gZmluZCBvdXQgaWYgd2UgYXJlIGFsbG93ZWQgdHJ5IHRvIHJlY29nbml6ZSB0aGUgaW5wdXQgZm9yIHRoaXMgb25lLlxuICAgICAgICAgICAgLy8gMS4gICBhbGxvdyBpZiB0aGUgc2Vzc2lvbiBpcyBOT1QgZm9yY2VkIHN0b3BwZWQgKHNlZSB0aGUgLnN0b3AoKSBtZXRob2QpXG4gICAgICAgICAgICAvLyAyLiAgIGFsbG93IGlmIHdlIHN0aWxsIGhhdmVuJ3QgcmVjb2duaXplZCBhIGdlc3R1cmUgaW4gdGhpcyBzZXNzaW9uLCBvciB0aGUgdGhpcyByZWNvZ25pemVyIGlzIHRoZSBvbmVcbiAgICAgICAgICAgIC8vICAgICAgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAgICAgLy8gMy4gICBhbGxvdyBpZiB0aGUgcmVjb2duaXplciBpcyBhbGxvd2VkIHRvIHJ1biBzaW11bHRhbmVvdXMgd2l0aCB0aGUgY3VycmVudCByZWNvZ25pemVkIHJlY29nbml6ZXIuXG4gICAgICAgICAgICAvLyAgICAgIHRoaXMgY2FuIGJlIHNldHVwIHdpdGggdGhlIGByZWNvZ25pemVXaXRoKClgIG1ldGhvZCBvbiB0aGUgcmVjb2duaXplci5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnN0b3BwZWQgIT09IEZPUkNFRF9TVE9QICYmIC8vIDFcbiAgICAgICAgICAgICAgICAoIWN1clJlY29nbml6ZXIgfHxcbiAgICAgICAgICAgICAgICAgICAgcmVjb2duaXplciA9PSBjdXJSZWNvZ25pemVyIHx8IC8vIDJcbiAgICAgICAgICAgICAgICAgICAgcmVjb2duaXplci5jYW5SZWNvZ25pemVXaXRoKGN1clJlY29nbml6ZXIpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gM1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVjb2duaXplKGlucHV0RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIHJlY29nbml6ZXIgaGFzIGJlZW4gcmVjb2duaXppbmcgdGhlIGlucHV0IGFzIGEgdmFsaWQgZ2VzdHVyZSwgd2Ugd2FudCB0byBzdG9yZSB0aGlzIG9uZSBhcyB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgYWN0aXZlIHJlY29nbml6ZXIuIGJ1dCBvbmx5IGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhbiBhY3RpdmUgcmVjb2duaXplclxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFjdXJSZWNvZ25pemVyICYmXG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSByZWNvZ25pemVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGEgcmVjb2duaXplciBieSBpdHMgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TnVsbH1cbiAgICAgKi9cbiAgICBnZXQocmVjb2duaXplcikge1xuICAgICAgICBpZiAocmVjb2duaXplciBpbnN0YW5jZW9mIFJlY29nbml6ZXIpIHJldHVybiByZWNvZ25pemVyO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnJlY29nbml6ZXJzLmZpbmQoKHtvcHRpb25zfSkgPT4gb3B0aW9ucy5ldmVudCA9PSByZWNvZ25pemVyKSB8fFxuICAgICAgICAgICAgbnVsbFxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBhZGQgYSByZWNvZ25pemVyIHRvIHRoZSBtYW5hZ2VyXG4gICAgICogZXhpc3RpbmcgcmVjb2duaXplcnMgd2l0aCB0aGUgc2FtZSBldmVudCBuYW1lIHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE1hbmFnZXJ9XG4gICAgICovXG4gICAgYWRkKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdhZGQnLCB0aGlzKSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV4aXN0aW5nXG4gICAgICAgIHZhciBleGlzdGluZyA9IHRoaXMuZ2V0KHJlY29nbml6ZXIub3B0aW9ucy5ldmVudCk7XG4gICAgICAgIGlmIChleGlzdGluZykgdGhpcy5yZW1vdmUoZXhpc3RpbmcpO1xuXG4gICAgICAgIHRoaXMucmVjb2duaXplcnMucHVzaChyZWNvZ25pemVyKTtcbiAgICAgICAgcmVjb2duaXplci5tYW5hZ2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGEgcmVjb2duaXplciBieSBuYW1lIG9yIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHJlbW92ZShyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAncmVtb3ZlJywgdGhpcykpIHJldHVybiB0aGlzO1xuXG4gICAgICAgIHJlY29nbml6ZXIgPSB0aGlzLmdldChyZWNvZ25pemVyKTtcblxuICAgICAgICAvLyBsZXQncyBtYWtlIHN1cmUgdGhpcyByZWNvZ25pemVyIGV4aXN0c1xuICAgICAgICBpZiAocmVjb2duaXplcikge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJlY29nbml6ZXJzLmluZGV4T2YocmVjb2duaXplcik7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29nbml6ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCB8fCBoYW5kbGVyID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIHNwbGl0U3RyKGV2ZW50cykuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSA9IGhhbmRsZXJzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCBldmVudCwgbGVhdmUgZW1pdCBibGFuayB0byByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXVxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvZmYoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIHNwbGl0U3RyKGV2ZW50cykuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tldmVudF07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXJzW2V2ZW50XSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XS5zcGxpY2UoaGFuZGxlcnNbZXZlbnRdLmluZGV4T2YoaGFuZGxlciksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGVtaXQgZXZlbnQgdG8gdGhlIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgZW1pdChldmVudCwgZGF0YSkge1xuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gdHJpZ2dlciBkb20gZXZlbnRzXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG9tRXZlbnRzKSB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpO1xuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdICYmIHRoaXMuaGFuZGxlcnNbZXZlbnRdLnNsaWNlKCk7XG4gICAgICAgIC8vIG5vIGhhbmRsZXJzLCBzbyBza2lwIGl0IGFsbFxuICAgICAgICBpZiAoIWhhbmRsZXJzIHx8ICFoYW5kbGVycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBkYXRhLnR5cGUgPSBldmVudDtcbiAgICAgICAgZGF0YS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRhdGEuc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKChoYW5kbGVyKSA9PiBoYW5kbGVyKGRhdGEpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVzdHJveSB0aGUgbWFuYWdlciBhbmQgdW5iaW5kcyBhbGwgZXZlbnRzXG4gICAgICogaXQgZG9lc24ndCB1bmJpbmQgZG9tIGV2ZW50cywgdGhhdCBpcyB0aGUgdXNlciBvd24gcmVzcG9uc2liaWxpdHlcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgJiYgdG9nZ2xlQ3NzUHJvcHModGhpcywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogYWRkL3JlbW92ZSB0aGUgY3NzIHByb3BlcnRpZXMgYXMgZGVmaW5lZCBpbiBtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtCb29sZWFufSBhZGRcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlQ3NzUHJvcHMobWFuYWdlciwgYWRkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUpIHJldHVybjtcblxuICAgIGxldCBwcm9wO1xuICAgIE9iamVjdC5lbnRyaWVzKG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wcykuZm9yRWFjaCgoW3ZhbHVlLCBuYW1lXSkgPT4ge1xuICAgICAgICBwcm9wID0gcHJlZml4ZWQoZWxlbWVudC5zdHlsZSwgbmFtZSk7XG4gICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gPSBlbGVtZW50LnN0eWxlW3Byb3BdO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gfHwgJyc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFkZCkgbWFuYWdlci5vbGRDc3NQcm9wcyA9IHt9O1xufVxuXG4vKipcbiAqIHRyaWdnZXIgZG9tIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSkge1xuICAgIHZhciBnZXN0dXJlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBnZXN0dXJlRXZlbnQuaW5pdEV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlKTtcbiAgICBnZXN0dXJlRXZlbnQuZ2VzdHVyZSA9IGRhdGE7XG4gICAgZGF0YS50YXJnZXQuZGlzcGF0Y2hFdmVudChnZXN0dXJlRXZlbnQpO1xufVxuXG5PYmplY3QuYXNzaWduKEhhbW1lciwge1xuICAgIElOUFVUX1NUQVJULFxuICAgIElOUFVUX01PVkUsXG4gICAgSU5QVVRfRU5ELFxuICAgIElOUFVUX0NBTkNFTCxcblxuICAgIFNUQVRFX1BPU1NJQkxFLFxuICAgIFNUQVRFX0JFR0FOLFxuICAgIFNUQVRFX0NIQU5HRUQsXG4gICAgU1RBVEVfRU5ERUQsXG4gICAgU1RBVEVfUkVDT0dOSVpFRCxcbiAgICBTVEFURV9DQU5DRUxMRUQsXG4gICAgU1RBVEVfRkFJTEVELFxuXG4gICAgRElSRUNUSU9OX05PTkUsXG4gICAgRElSRUNUSU9OX0xFRlQsXG4gICAgRElSRUNUSU9OX1JJR0hULFxuICAgIERJUkVDVElPTl9VUCxcbiAgICBESVJFQ1RJT05fRE9XTixcbiAgICBESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgRElSRUNUSU9OX0FMTCxcblxuICAgIE1hbmFnZXIsXG4gICAgSW5wdXQsXG4gICAgVG91Y2hBY3Rpb24sXG5cbiAgICBUb3VjaElucHV0LFxuICAgIE1vdXNlSW5wdXQsXG4gICAgUG9pbnRlckV2ZW50SW5wdXQsXG4gICAgVG91Y2hNb3VzZUlucHV0LFxuICAgIFNpbmdsZVRvdWNoSW5wdXQsXG5cbiAgICBSZWNvZ25pemVyLFxuICAgIEF0dHJSZWNvZ25pemVyLFxuICAgIFRhcDogVGFwUmVjb2duaXplcixcbiAgICBQYW46IFBhblJlY29nbml6ZXIsXG4gICAgU3dpcGU6IFN3aXBlUmVjb2duaXplcixcbiAgICBQaW5jaDogUGluY2hSZWNvZ25pemVyLFxuICAgIFJvdGF0ZTogUm90YXRlUmVjb2duaXplcixcbiAgICBQcmVzczogUHJlc3NSZWNvZ25pemVyLFxuXG4gICAgb246IGFkZEV2ZW50TGlzdGVuZXJzLFxuICAgIG9mZjogcmVtb3ZlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZWFjaCxcbiAgICBpbmhlcml0LFxuICAgIHByZWZpeGVkXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIYW1tZXI7XG4iLCJpbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vYW5pbWF0aW9uJztcbmltcG9ydCBQYWdlU3ByZWFkIGZyb20gJy4vcGFnZV9zcHJlYWQnO1xuaW1wb3J0IEhhbW1lciBmcm9tICcuL3ZlbmRvci9oYW1tZXInO1xuaW1wb3J0ICcuL3ZlcnNvLnN0eWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJzbyB7XG4gICAgY29uc3RydWN0b3IoZWwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmVsID0gZWw7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuc3dpcGVWZWxvY2l0eSA9IHRoaXMub3B0aW9ucy5zd2lwZVZlbG9jaXR5ID8/IDAuMztcbiAgICAgICAgdGhpcy5zd2lwZVRocmVzaG9sZCA9IHRoaXMub3B0aW9ucy5zd2lwZVRocmVzaG9sZCA/PyAxMDtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uRHVyYXRpb24gPSB0aGlzLm9wdGlvbnMubmF2aWdhdGlvbkR1cmF0aW9uID8/IDI0MDtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uUGFuRHVyYXRpb24gPSB0aGlzLm9wdGlvbnMubmF2aWdhdGlvblBhbkR1cmF0aW9uID8/IDIwMDtcbiAgICAgICAgdGhpcy56b29tRHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuem9vbUR1cmF0aW9uID8/IDIwMDtcbiAgICAgICAgdGhpcy5kb3VibGVUYXBEZWxheSA9IHRoaXMub3B0aW9ucy5kb3VibGVUYXBEZWxheSA/PyAzMDA7XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IC0xO1xuICAgICAgICB0aGlzLnBpbmNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGFubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IHtsZWZ0OiAwLCB0b3A6IDAsIHNjYWxlOiAxfTtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zZm9ybSA9IHtsZWZ0OiAwLCB0b3A6IDAsIHNjYWxlOiAxfTtcbiAgICAgICAgdGhpcy50YXAgPSB7XG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgIGRlbGF5OiB0aGlzLmRvdWJsZVRhcERlbGF5XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB9XG4gICAgYmluZChldmVudCwgZm4pIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF0gfHwgW107XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2goZm4pO1xuICAgIH1cblxuICAgIHVuYmluZChldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudHNbZXZlbnRdLnNwbGljZShcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbZXZlbnRdLmluZGV4T2YoZm4pLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmlnZ2VyKGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0/LmZvckVhY2goKGUpID0+IGUuYXBwbHkodGhpcywgYXJncykpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNjcm9sbGVyRWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy52ZXJzb19fc2Nyb2xsZXInKTtcbiAgICAgICAgdGhpcy5wYWdlU3ByZWFkRWxzID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCcudmVyc29fX3BhZ2Utc3ByZWFkJyk7XG4gICAgICAgIHRoaXMucGFnZVNwcmVhZHMgPSB0aGlzLnRyYXZlcnNlUGFnZVNwcmVhZHModGhpcy5wYWdlU3ByZWFkRWxzKTtcbiAgICAgICAgdGhpcy5wYWdlSWRzID0gdGhpcy5idWlsZFBhZ2VJZHModGhpcy5wYWdlU3ByZWFkcyk7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbih0aGlzLnNjcm9sbGVyRWwpO1xuICAgICAgICB0aGlzLmhhbW1lciA9IG5ldyBIYW1tZXIuTWFuYWdlcih0aGlzLnNjcm9sbGVyRWwsIHtcbiAgICAgICAgICAgIHRvdWNoQWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICBlbmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgaW5wdXRDbGFzczogdGhpcy5nZXRIYW1tZXJJbnB1dENsYXNzKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oYW1tZXIuYWRkKFxuICAgICAgICAgICAgbmV3IEhhbW1lci5QYW4oe3RocmVzaG9sZDogNSwgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0FMTH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaGFtbWVyLmFkZChuZXcgSGFtbWVyLlRhcCh7ZXZlbnQ6ICdzaW5nbGV0YXAnLCBpbnRlcnZhbDogMH0pKTtcbiAgICAgICAgdGhpcy5oYW1tZXIuYWRkKG5ldyBIYW1tZXIuUGluY2goKSk7XG4gICAgICAgIHRoaXMuaGFtbWVyLmFkZChuZXcgSGFtbWVyLlByZXNzKHt0aW1lOiA1MDB9KSk7XG4gICAgICAgIHRoaXMuaGFtbWVyLm9uKCdwYW5zdGFydCcsIHRoaXMub25QYW5TdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3Bhbm1vdmUnLCB0aGlzLm9uUGFuTW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3BhbmVuZCcsIHRoaXMub25QYW5FbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaGFtbWVyLm9uKCdwYW5jYW5jZWwnLCB0aGlzLm9uUGFuRW5kLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhhbW1lci5vbignc2luZ2xldGFwJywgdGhpcy5vblNpbmdsZXRhcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3BpbmNoc3RhcnQnLCB0aGlzLm9uUGluY2hTdGFydC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3BpbmNobW92ZScsIHRoaXMub25QaW5jaE1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaGFtbWVyLm9uKCdwaW5jaGVuZCcsIHRoaXMub25QaW5jaEVuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3BpbmNoY2FuY2VsJywgdGhpcy5vblBpbmNoRW5kLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhhbW1lci5vbigncHJlc3MnLCB0aGlzLm9uUHJlc3MuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxlckVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgICAgICAgdGhpcy5vbkNvbnRleHRtZW51LmJpbmQodGhpcyksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNjcm9sbGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd3aGVlbCcsXG4gICAgICAgICAgICB0aGlzLm9uV2hlZWwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHBhZ2VJZCA9XG4gICAgICAgICAgICB0aGlzLmdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQodGhpcy5vcHRpb25zLnBhZ2VJZCkgPz8gMDtcblxuICAgICAgICB0aGlzLmhhbW1lci5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5hdmlnYXRlVG8ocGFnZUlkLCB7ZHVyYXRpb246IDB9KTtcblxuICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRMaXN0ZW5lciA9IHRoaXMub25Ub3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudG91Y2hFbmRMaXN0ZW5lciA9IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kTGlzdGVuZXIsIGZhbHNlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZXNpemVMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIFwiWW91J3ZlIGNhbGxlZCAuZGVzdHJveSgpIG9uIGEgdmlld2VyIHRoYXQgd2FzIG5vdCBzdGFydGVkIHlldCwgdGhpcyBpcyBhIG5vLW9wLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBcIllvdSd2ZSBjYWxsZWQgLmRlc3Ryb3koKSBvbiBhIHZpZXdlciB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkIGFuZCBub3QgcmVzdGFydGVkLCB0aGlzIGlzIGEgbm8tb3AuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY3JvbGxlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgICAgICAgdGhpcy5vbkNvbnRleHRtZW51LmJpbmQodGhpcylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zY3JvbGxlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5vbldoZWVsLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuaGFtbWVyLmRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kTGlzdGVuZXIpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZmlyc3Qob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZVRvKDAsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHByZXYob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuZ2V0UG9zaXRpb24oKSAtIDEsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG5leHQob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuZ2V0UG9zaXRpb24oKSArIDEsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxhc3Qob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvKHBvc2l0aW9uLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKGBcXFxuWW91J3ZlIGNhbGxlZCBhIG5hdmlnYXRpb24gbWV0aG9kIG9uIGEgdmlld2VyIHRoYXQgd2FzIHByZXZpb3VzbHkgZGVzdHJveWVkLCB0aGlzIGlzIGEgbm8tb3AuXG5QbGVhc2UgY2FsbCB2aWV3ZXIuc3RhcnQoKSBhZ2FpbiwgaWYgeW91IHdhbnQgdG8gcmV1c2UgdGhpcyBWaWV3ZXIgaW5zdGFuY2UuXG5cbllvdSBtaWdodCBoYXZlIGZvcmdvdHRlbiB0byByZW1vdmUgYW4gZXZlbnQgaGFuZGxlciB0aGF0XG5jYWxscyBmaXJzdC9wcmV2L25leHQvbGFzdC9uYXZpZ2F0ZVRvIG9uIHRoZSB2aWV3ZXIuXFxcbmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKGBcbllvdSd2ZSBjYWxsZWQgYSBuYXZpZ2F0aW9uIG1ldGhvZCBvbiBhIHZpZXdlciB0aGF0IGhhc24ndCBiZWVuIHN0YXJ0ZWQgeWV0LCB0aGlzIGlzIGEgbm8tb3AuXG5QbGVhc2UgY2FsbCB2aWV3ZXIuc3RhcnQoKSBmaXJzdC5cblxuWW91IG1pZ2h0IGhhdmUgZm9yZ290dGVuIHRvIHJlbW92ZSBhbiBldmVudCBoYW5kbGVyIHRoYXRcbmNhbGxzIC5maXJzdCgpLy5wcmV2KCkvLm5leHQoKS8ubGFzdCgpLy5uYXZpZ2F0ZVRvKCkgb24gdGhlIHZpZXdlci5cbmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+IHRoaXMuZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlU3ByZWFkID0gdGhpcy5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uKFxuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVBhZ2VTcHJlYWQgPSB0aGlzLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICBsZXQgY2Fyb3VzZWwgPSB0aGlzLmdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQoYWN0aXZlUGFnZVNwcmVhZCk7XG4gICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gb3B0aW9ucy52ZWxvY2l0eSA/PyAxO1xuICAgICAgICBsZXQgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uID8/IHRoaXMubmF2aWdhdGlvbkR1cmF0aW9uO1xuICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uIC8gTWF0aC5hYnModmVsb2NpdHkpO1xuICAgICAgICBjb25zdCB0b3VjaEFjdGlvbiA9IGFjdGl2ZVBhZ2VTcHJlYWQuaXNTY3JvbGxhYmxlKCkgPyAncGFuLXknIDogJ25vbmUnO1xuXG4gICAgICAgIGN1cnJlbnRQYWdlU3ByZWFkPy5kZWFjdGl2YXRlKCk7XG4gICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWQuYWN0aXZhdGUoKTtcblxuICAgICAgICBjYXJvdXNlbC52aXNpYmxlLmZvckVhY2goKHBhZ2VTcHJlYWQpID0+XG4gICAgICAgICAgICBwYWdlU3ByZWFkLnBvc2l0aW9uKCkuc2V0VmlzaWJpbGl0eSgndmlzaWJsZScpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5oYW1tZXIuc2V0KHt0b3VjaEFjdGlvbn0pO1xuXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLmxlZnQgPSB0aGlzLmdldExlZnRUcmFuc2Zvcm1Gcm9tUGFnZVNwcmVhZChcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcblxuICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm0uc2NhbGUgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS50b3AgPSAwO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0uc2NhbGUgPSAxO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3pvb21lZE91dCcsIHtwb3NpdGlvbjogY3VycmVudFBvc2l0aW9ufSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2JlZm9yZU5hdmlnYXRpb24nLCB7XG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24sXG4gICAgICAgICAgICBuZXdQb3NpdGlvbjogcG9zaXRpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4OiBgJHt0aGlzLnRyYW5zZm9ybS5sZWZ0fSVgLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhcm91c2VsID0gdGhpcy5nZXRDYXJvdXNlbEZyb21QYWdlU3ByZWFkKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5nb25lLmZvckVhY2goKHBhZ2VTcHJlYWQpID0+XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWQuc2V0VmlzaWJpbGl0eSgnZ29uZScpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignYWZ0ZXJOYXZpZ2F0aW9uJywge1xuICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbjogdGhpcy5nZXRQb3NpdGlvbigpLFxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1Bvc2l0aW9uOiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldExlZnRUcmFuc2Zvcm1Gcm9tUGFnZVNwcmVhZChwb3NpdGlvbiwgcGFnZVNwcmVhZCkge1xuICAgICAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSB0aGlzLmdldFBhZ2VTcHJlYWRDb3VudCgpIC0gMSkge1xuICAgICAgICAgICAgbGVmdCA9IDEwMCAtIHBhZ2VTcHJlYWQuZ2V0V2lkdGgoKSAtIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID4gMCkge1xuICAgICAgICAgICAgbGVmdCA9ICgxMDAgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkpIC8gMiAtIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgfVxuXG4gICAgZ2V0Q2Fyb3VzZWxGcm9tUGFnZVNwcmVhZChwYWdlU3ByZWFkU3ViamVjdCkge1xuICAgICAgICBjb25zdCBjYXJvdXNlbCA9IHtcbiAgICAgICAgICAgIHZpc2libGU6IFtdLFxuICAgICAgICAgICAgZ29uZTogW11cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJZGVudGlmeSB0aGUgcGFnZSBzcHJlYWRzIHRoYXQgc2hvdWxkIGJlIGEgcGFydCBvZiB0aGUgY2Fyb3VzZWwuXG4gICAgICAgIHRoaXMucGFnZVNwcmVhZHMuZm9yRWFjaCgocGFnZVNwcmVhZCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHBhZ2VTcHJlYWQuZ2V0TGVmdCgpIDw9IHBhZ2VTcHJlYWRTdWJqZWN0LmdldExlZnQoKSkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgKyBwYWdlU3ByZWFkLmdldFdpZHRoKCkgPlxuICAgICAgICAgICAgICAgICAgICBwYWdlU3ByZWFkU3ViamVjdC5nZXRMZWZ0KCkgLSAxMDBcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpIC0gcGFnZVNwcmVhZC5nZXRXaWR0aCgpIDxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZFN1YmplY3QuZ2V0TGVmdCgpICsgMTAwXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC52aXNpYmxlLnB1c2gocGFnZVNwcmVhZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcm91c2VsLmdvbmUucHVzaChwYWdlU3ByZWFkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNhcm91c2VsO1xuICAgIH1cblxuICAgIHRyYXZlcnNlUGFnZVNwcmVhZHMoZWxzKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VTcHJlYWRzID0gW107XG4gICAgICAgIGxldCBsZWZ0ID0gMDtcblxuICAgICAgICBmb3IgKGxldCBlbCBvZiBBcnJheS5mcm9tKGVscykpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnKTtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VJZHMgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZS1pZHMnKT8uc3BsaXQoJywnKSB8fCBbXTtcbiAgICAgICAgICAgIGNvbnN0IG1heFpvb21TY2FsZSA9IE51bWJlcihcbiAgICAgICAgICAgICAgICBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWF4LXpvb20tc2NhbGUnKSA/PyAxXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBOdW1iZXIoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJykgPz8gMTAwKTtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VTcHJlYWQgPSBuZXcgUGFnZVNwcmVhZChlbCwge1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgcGFnZUlkcyxcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGUsXG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgbGVmdFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGg7XG5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWRzLnB1c2gocGFnZVNwcmVhZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZVNwcmVhZHM7XG4gICAgfVxuXG4gICAgYnVpbGRQYWdlSWRzKHBhZ2VTcHJlYWRzKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VJZHMgPSB7fTtcblxuICAgICAgICBwYWdlU3ByZWFkcy5mb3JFYWNoKChwYWdlU3ByZWFkKSA9PiB7XG4gICAgICAgICAgICBwYWdlU3ByZWFkLm9wdGlvbnMucGFnZUlkcy5mb3JFYWNoKChwYWdlSWQpID0+IHtcbiAgICAgICAgICAgICAgICBwYWdlSWRzW3BhZ2VJZF0gPSBwYWdlU3ByZWFkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwYWdlSWRzO1xuICAgIH1cblxuICAgIGlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQoeCwgeSwgZWwpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB4ID49IHJlY3QubGVmdCAmJlxuICAgICAgICAgICAgeCA8PSByZWN0LnJpZ2h0ICYmXG4gICAgICAgICAgICB5ID49IHJlY3QudG9wICYmXG4gICAgICAgICAgICB5IDw9IHJlY3QuYm90dG9tXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Q29vcmRpbmF0ZUluZm8oeCwgeSwgcGFnZVNwcmVhZCkge1xuICAgICAgICBsZXQgcGFnZUVsO1xuICAgICAgICB4IC09IHRoaXMuZWwub2Zmc2V0TGVmdDtcbiAgICAgICAgeSAtPSB0aGlzLmVsLm9mZnNldFRvcDtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgY29udGVudFg6IDAsXG4gICAgICAgICAgICBjb250ZW50WTogMCxcbiAgICAgICAgICAgIHBhZ2VYOiAwLFxuICAgICAgICAgICAgcGFnZVk6IDAsXG4gICAgICAgICAgICBvdmVybGF5RWxzOiBbXSxcbiAgICAgICAgICAgIHBhZ2VFbDogbnVsbCxcbiAgICAgICAgICAgIGlzSW5zaWRlQ29udGVudFg6IGZhbHNlLFxuICAgICAgICAgICAgaXNJbnNpZGVDb250ZW50WTogZmFsc2UsXG4gICAgICAgICAgICBpc0luc2lkZUNvbnRlbnQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbnRlbnRSZWN0ID0gcGFnZVNwcmVhZC5nZXRDb250ZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBvdmVybGF5RWxzID0gcGFnZVNwcmVhZC5nZXRPdmVybGF5RWxzKCk7XG4gICAgICAgIGNvbnN0IHBhZ2VFbHMgPSBwYWdlU3ByZWFkLmdldFBhZ2VFbHMoKTtcblxuICAgICAgICBmb3IgKGxldCBvdmVybGF5RWwgb2YgQXJyYXkuZnJvbShvdmVybGF5RWxzKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb29yZGluYXRlSW5zaWRlRWxlbWVudCh4LCB5LCBvdmVybGF5RWwpKSB7XG4gICAgICAgICAgICAgICAgaW5mby5vdmVybGF5RWxzLnB1c2gob3ZlcmxheUVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAocGFnZUVsIG9mIEFycmF5LmZyb20ocGFnZUVscykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQoeCwgeSwgcGFnZUVsKSkge1xuICAgICAgICAgICAgICAgIGluZm8ucGFnZUVsID0gcGFnZUVsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5mby5jb250ZW50WCA9ICh4IC0gY29udGVudFJlY3QubGVmdCkgLyBNYXRoLm1heCgxLCBjb250ZW50UmVjdC53aWR0aCk7XG4gICAgICAgIGluZm8uY29udGVudFkgPSAoeSAtIGNvbnRlbnRSZWN0LnRvcCkgLyBNYXRoLm1heCgxLCBjb250ZW50UmVjdC5oZWlnaHQpO1xuXG4gICAgICAgIGlmIChpbmZvLnBhZ2VFbCkge1xuICAgICAgICAgICAgaW5mby5pc0luc2lkZUNvbnRlbnRYID0gaW5mby5jb250ZW50WCA+PSAwICYmIGluZm8uY29udGVudFggPD0gMTtcbiAgICAgICAgICAgIGluZm8uaXNJbnNpZGVDb250ZW50WSA9IGluZm8uY29udGVudFkgPj0gMCAmJiBpbmZvLmNvbnRlbnRZIDw9IDE7XG4gICAgICAgICAgICBpbmZvLmlzSW5zaWRlQ29udGVudCA9XG4gICAgICAgICAgICAgICAgaW5mby5pc0luc2lkZUNvbnRlbnRYICYmIGluZm8uaXNJbnNpZGVDb250ZW50WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIGdldFBhZ2VTcHJlYWRDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVNwcmVhZHMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEFjdGl2ZVBhZ2VTcHJlYWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24odGhpcy5nZXRQb3NpdGlvbigpKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VTcHJlYWRzW3Bvc2l0aW9uXTtcbiAgICB9XG5cbiAgICBnZXRQYWdlU3ByZWFkUG9zaXRpb25Gcm9tUGFnZUlkKHBhZ2VJZCkge1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLnBhZ2VTcHJlYWRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VTcHJlYWQgPSB0aGlzLnBhZ2VTcHJlYWRzW2lkeF07XG5cbiAgICAgICAgICAgIGlmIChwYWdlU3ByZWFkLm9wdGlvbnMucGFnZUlkcy5pbmRleE9mKHBhZ2VJZCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYWdlU3ByZWFkQm91bmRzKHBhZ2VTcHJlYWQpIHtcbiAgICAgICAgY29uc3QgcGFnZVNwcmVhZFJlY3QgPSBwYWdlU3ByZWFkLmdldFJlY3QoKTtcbiAgICAgICAgY29uc3QgcGFnZVNwcmVhZENvbnRlbnRSZWN0ID0gcGFnZVNwcmVhZC5nZXRDb250ZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OlxuICAgICAgICAgICAgICAgICgocGFnZVNwcmVhZENvbnRlbnRSZWN0LmxlZnQgLSBwYWdlU3ByZWFkUmVjdC5sZWZ0KSAvXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRSZWN0LndpZHRoKSAqXG4gICAgICAgICAgICAgICAgMTAwLFxuICAgICAgICAgICAgdG9wOlxuICAgICAgICAgICAgICAgICgocGFnZVNwcmVhZENvbnRlbnRSZWN0LnRvcCAtIHBhZ2VTcHJlYWRSZWN0LnRvcCkgL1xuICAgICAgICAgICAgICAgICAgICBwYWdlU3ByZWFkUmVjdC5oZWlnaHQpICpcbiAgICAgICAgICAgICAgICAxMDAsXG4gICAgICAgICAgICB3aWR0aDogKHBhZ2VTcHJlYWRDb250ZW50UmVjdC53aWR0aCAvIHBhZ2VTcHJlYWRSZWN0LndpZHRoKSAqIDEwMCxcbiAgICAgICAgICAgIGhlaWdodDpcbiAgICAgICAgICAgICAgICAocGFnZVNwcmVhZENvbnRlbnRSZWN0LmhlaWdodCAvIHBhZ2VTcHJlYWRSZWN0LmhlaWdodCkgKiAxMDAsXG4gICAgICAgICAgICBwYWdlU3ByZWFkUmVjdCxcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRDb250ZW50UmVjdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNsaXBDb29yZGluYXRlKGNvb3JkaW5hdGUsIHNjYWxlLCBzaXplLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKHNpemUgKiBzY2FsZSA8IDEwMCkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IG9mZnNldCAqIC1zY2FsZSArIDUwIC0gKHNpemUgKiBzY2FsZSkgLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IE1hdGgubWluKGNvb3JkaW5hdGUsIG9mZnNldCAqIC1zY2FsZSk7XG4gICAgICAgICAgICBjb29yZGluYXRlID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZSxcbiAgICAgICAgICAgICAgICBvZmZzZXQgKiAtc2NhbGUgLSBzaXplICogc2NhbGUgKyAxMDBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgICB9XG5cbiAgICB6b29tVG8ob3B0aW9ucyA9IHt9LCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB7c2NhbGV9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgY3VyU2NhbGUgPSB0aGlzLnRyYW5zZm9ybS5zY2FsZTtcbiAgICAgICAgY29uc3QgYWN0aXZlUGFnZVNwcmVhZCA9IHRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpO1xuICAgICAgICBjb25zdCBwYWdlU3ByZWFkQm91bmRzID0gdGhpcy5nZXRQYWdlU3ByZWFkQm91bmRzKGFjdGl2ZVBhZ2VTcHJlYWQpO1xuICAgICAgICBjb25zdCBjYXJvdXNlbE9mZnNldCA9IGFjdGl2ZVBhZ2VTcHJlYWQuZ2V0TGVmdCgpO1xuICAgICAgICBjb25zdCBjYXJvdXNlbFNjYWxlZE9mZnNldCA9IGNhcm91c2VsT2Zmc2V0ICogY3VyU2NhbGU7XG4gICAgICAgIGxldCB4ID0gb3B0aW9ucy54ID8/IDA7XG4gICAgICAgIGxldCB5ID0gb3B0aW9ucy55ID8/IDA7XG5cbiAgICAgICAgaWYgKHNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICB4IC09IHBhZ2VTcHJlYWRCb3VuZHMucGFnZVNwcmVhZFJlY3QubGVmdDtcbiAgICAgICAgICAgIHkgLT0gcGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC50b3A7XG4gICAgICAgICAgICB4ID0gKHggLyAocGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC53aWR0aCAvIGN1clNjYWxlKSkgKiAxMDA7XG4gICAgICAgICAgICB5ID0gKHkgLyAocGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC5oZWlnaHQgLyBjdXJTY2FsZSkpICogMTAwO1xuICAgICAgICAgICAgeCA9XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ubGVmdCArXG4gICAgICAgICAgICAgICAgY2Fyb3VzZWxTY2FsZWRPZmZzZXQgK1xuICAgICAgICAgICAgICAgIHggLVxuICAgICAgICAgICAgICAgICh4ICogc2NhbGUpIC8gY3VyU2NhbGU7XG4gICAgICAgICAgICB5ID0gdGhpcy50cmFuc2Zvcm0udG9wICsgeSAtICh5ICogc2NhbGUpIC8gY3VyU2NhbGU7XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgYW5pbWF0aW9uIGRvZXNuJ3QgZXhjZWVkIHRoZSBjb250ZW50IGJvdW5kcy5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJvdW5kcyAhPT0gZmFsc2UgJiYgc2NhbGUgPiAxKSB7XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuY2xpcENvb3JkaW5hdGUoXG4gICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICBwYWdlU3ByZWFkQm91bmRzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBwYWdlU3ByZWFkQm91bmRzLmxlZnRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmNsaXBDb29yZGluYXRlKFxuICAgICAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZEJvdW5kcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMudG9wXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHggPSAwO1xuICAgICAgICAgICAgeSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBY2NvdW50IGZvciB0aGUgcGFnZSBzcHJlYWRzIGxlZnQgb2YgdGhlIGFjdGl2ZSBvbmUuXG4gICAgICAgIHggLT0gY2Fyb3VzZWxPZmZzZXQgKiBzY2FsZTtcblxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5sZWZ0ID0geDtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0udG9wID0geTtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0uc2NhbGUgPSBzY2FsZTtcblxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IGAke3h9JWAsXG4gICAgICAgICAgICAgICAgeTogYCR7eX0lYCxcbiAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICBlYXNpbmc6IG9wdGlvbnMuZWFzaW5nLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLnBhZ2VTcHJlYWRFbHMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy52ZXJzb19fcGFnZS1zcHJlYWQnKTtcbiAgICAgICAgdGhpcy5wYWdlU3ByZWFkcyA9IHRoaXMudHJhdmVyc2VQYWdlU3ByZWFkcyh0aGlzLnBhZ2VTcHJlYWRFbHMpO1xuICAgICAgICB0aGlzLnBhZ2VJZHMgPSB0aGlzLmJ1aWxkUGFnZUlkcyh0aGlzLnBhZ2VTcHJlYWRzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXRIYW1tZXJJbnB1dENsYXNzKCkge1xuICAgICAgICBjb25zdCBtb2JpbGVSZWdleCA9IC9tb2JpbGV8dGFibGV0fGlwKGFkfGhvbmV8b2QpfGFuZHJvaWQvaTtcbiAgICAgICAgY29uc3Qgc3VwcG9ydFRvdWNoID1cbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcblxuICAgICAgICBpZiAoc3VwcG9ydFRvdWNoICYmIG1vYmlsZVJlZ2V4LnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBIYW1tZXIuVG91Y2hJbnB1dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8jIyMjIyMjIyMjIyMjXG4gICAgLyogRXZlbnRzICovXG4gICAgLy8jIyMjIyMjIyMjIyMjXG5cbiAgICBvblBhblN0YXJ0KGUpIHtcbiAgICAgICAgLy8gT25seSBhbGxvdyBwYW5uaW5nIGlmIHpvb21lZCBpbiBvciBkb2luZyBhIGhvcml6b250YWwgcGFuLlxuICAgICAgICAvLyBUaGlzIGVuc3VyZXMgdmVydGljYWwgc2Nyb2xsaW5nIHdvcmtzIGZvciBzY3JvbGxhYmxlIHBhZ2Ugc3ByZWFkcy5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0uc2NhbGUgPiAxIHx8XG4gICAgICAgICAgICBlLmRpcmVjdGlvbiA9PT0gSGFtbWVyLkRJUkVDVElPTl9MRUZUIHx8XG4gICAgICAgICAgICBlLmRpcmVjdGlvbiA9PT0gSGFtbWVyLkRJUkVDVElPTl9SSUdIVFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHt4fSA9IGUuY2VudGVyO1xuICAgICAgICAgICAgY29uc3QgZWRnZVRocmVzaG9sZCA9IDMwO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLnNjcm9sbGVyRWwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgIC8vIFByZXZlbnQgcGFubmluZyB3aGVuIGVkZ2Utc3dpcGluZyBvbiBpT1MuXG4gICAgICAgICAgICBpZiAoeCA+IGVkZ2VUaHJlc2hvbGQgJiYgeCA8IHdpZHRoIC0gZWRnZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2Zvcm0ubGVmdCA9IHRoaXMudHJhbnNmb3JtLmxlZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zZm9ybS50b3AgPSB0aGlzLnRyYW5zZm9ybS50b3A7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBhbm5pbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdwYW5TdGFydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYW5Nb3ZlKGUpIHtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGlmICh0aGlzLnBpbmNoaW5nID09PSB0cnVlIHx8IHRoaXMucGFubmluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybS5zY2FsZSA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVBhZ2VTcHJlYWQgPSB0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcm91c2VsT2Zmc2V0ID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRMZWZ0KCk7XG4gICAgICAgICAgICBjb25zdCBjYXJvdXNlbFNjYWxlZE9mZnNldCA9IGNhcm91c2VsT2Zmc2V0ICogdGhpcy50cmFuc2Zvcm0uc2NhbGU7XG4gICAgICAgICAgICBjb25zdCBwYWdlU3ByZWFkQm91bmRzID0gdGhpcy5nZXRQYWdlU3ByZWFkQm91bmRzKGFjdGl2ZVBhZ2VTcHJlYWQpO1xuICAgICAgICAgICAgY29uc3Qge3NjYWxlfSA9IHRoaXMudHJhbnNmb3JtO1xuICAgICAgICAgICAgeCA9XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zZm9ybS5sZWZ0ICtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbFNjYWxlZE9mZnNldCArXG4gICAgICAgICAgICAgICAgKGUuZGVsdGFYIC8gdGhpcy5zY3JvbGxlckVsLm9mZnNldFdpZHRoKSAqIDEwMDtcbiAgICAgICAgICAgIGxldCB5ID1cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNmb3JtLnRvcCArXG4gICAgICAgICAgICAgICAgKGUuZGVsdGFZIC8gdGhpcy5zY3JvbGxlckVsLm9mZnNldEhlaWdodCkgKiAxMDA7XG4gICAgICAgICAgICB4ID0gdGhpcy5jbGlwQ29vcmRpbmF0ZShcbiAgICAgICAgICAgICAgICB4LFxuICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMud2lkdGgsXG4gICAgICAgICAgICAgICAgcGFnZVNwcmVhZEJvdW5kcy5sZWZ0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgeSA9IHRoaXMuY2xpcENvb3JkaW5hdGUoXG4gICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICBwYWdlU3ByZWFkQm91bmRzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBwYWdlU3ByZWFkQm91bmRzLnRvcFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHggLT0gY2Fyb3VzZWxTY2FsZWRPZmZzZXQ7XG5cbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLmxlZnQgPSB4O1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0udG9wID0geTtcblxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgeDogYCR7eH0lYCxcbiAgICAgICAgICAgICAgICB5OiBgJHt5fSVgLFxuICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ubGVmdCArXG4gICAgICAgICAgICAgICAgKGUuZGVsdGFYIC8gdGhpcy5zY3JvbGxlckVsLm9mZnNldFdpZHRoKSAqIDEwMDtcblxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgeDogYCR7eH0lYCxcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGFuRW5kKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucGFubmluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ3BhbkVuZCcpO1xuXG4gICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybS5zY2FsZSA9PT0gMSAmJiB0aGlzLnBpbmNoaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCB2ZWxvY2l0eSA9IGUub3ZlcmFsbFZlbG9jaXR5WDtcblxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHZlbG9jaXR5KSA+PSB0aGlzLnN3aXBlVmVsb2NpdHkpIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZS5kZWx0YVgpID49IHRoaXMuc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUub2Zmc2V0RGlyZWN0aW9uID09PSBIYW1tZXIuRElSRUNUSU9OX0xFRlQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMubmF2aWdhdGlvblBhbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLm9mZnNldERpcmVjdGlvbiA9PT0gSGFtbWVyLkRJUkVDVElPTl9SSUdIVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5uYXZpZ2F0aW9uUGFuRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IHRoaXMuZ2V0UG9zaXRpb24oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICB4OiBgJHt0aGlzLnRyYW5zZm9ybS5sZWZ0fSVgLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5uYXZpZ2F0aW9uUGFuRHVyYXRpb25cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignYXR0ZW1wdGVkTmF2aWdhdGlvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QaW5jaFN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpLmlzWm9vbWFibGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5waW5jaGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLXBpbmNoaW5nJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2Zvcm0uc2NhbGUgPSB0aGlzLnRyYW5zZm9ybS5zY2FsZTtcbiAgICB9XG5cbiAgICBvblBpbmNoTW92ZShlKSB7XG4gICAgICAgIGlmICh0aGlzLnBpbmNoaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy56b29tVG8oe1xuICAgICAgICAgICAgeDogZS5jZW50ZXIueCxcbiAgICAgICAgICAgIHk6IGUuY2VudGVyLnksXG4gICAgICAgICAgICBzY2FsZTogdGhpcy5zdGFydFRyYW5zZm9ybS5zY2FsZSAqIGUuc2NhbGUsXG4gICAgICAgICAgICBib3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblBpbmNoRW5kKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucGluY2hpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhY3RpdmVQYWdlU3ByZWFkID0gdGhpcy5nZXRBY3RpdmVQYWdlU3ByZWFkKCk7XG4gICAgICAgIGNvbnN0IG1heFpvb21TY2FsZSA9IGFjdGl2ZVBhZ2VTcHJlYWQuZ2V0TWF4Wm9vbVNjYWxlKCk7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gTWF0aC5tYXgoMSwgTWF0aC5taW4odGhpcy50cmFuc2Zvcm0uc2NhbGUsIG1heFpvb21TY2FsZSkpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5zdGFydFRyYW5zZm9ybS5zY2FsZSA9PT0gMSAmJiBzY2FsZSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignem9vbWVkSW4nLCB7cG9zaXRpb259KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXJ0VHJhbnNmb3JtLnNjYWxlID4gMSAmJiBzY2FsZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd6b29tZWRPdXQnLCB7cG9zaXRpb259KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuem9vbVRvKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IGUuY2VudGVyLngsXG4gICAgICAgICAgICAgICAgeTogZS5jZW50ZXIueSxcbiAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy56b29tRHVyYXRpb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5waW5jaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLXBpbmNoaW5nJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uUHJlc3MoZSkge1xuICAgICAgICB0aGlzLnRyaWdnZXIoXG4gICAgICAgICAgICAncHJlc3NlZCcsXG4gICAgICAgICAgICB0aGlzLmdldENvb3JkaW5hdGVJbmZvKFxuICAgICAgICAgICAgICAgIGUuY2VudGVyLngsXG4gICAgICAgICAgICAgICAgZS5jZW50ZXIueSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uQ29udGV4dG1lbnUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKFxuICAgICAgICAgICAgJ2NvbnRleHRtZW51JyxcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29vcmRpbmF0ZUluZm8oXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBvbldoZWVsKGUpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uLCBzY2FsZTtcbiAgICAgICAgY29uc3QgYWN0aXZlUGFnZVNwcmVhZCA9IHRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpO1xuXG4gICAgICAgIGlmIChhY3RpdmVQYWdlU3ByZWFkLmlzWm9vbWFibGUoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjM2NjgwMzVcbiAgICAgICAgbGV0IHtkZWx0YVl9ID0gZTtcblxuICAgICAgICBpZiAoZXZlbnQud2Via2l0RGlyZWN0aW9uSW52ZXJ0ZWRGcm9tRGV2aWNlKSB7XG4gICAgICAgICAgICBkZWx0YVkgPSAtZGVsdGFZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbHRhWSA+IDAgJiYgdGhpcy50cmFuc2Zvcm0uc2NhbGUgPT09IDEpIHtcbiAgICAgICAgICAgIHNjYWxlID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRNYXhab29tU2NhbGUoKTtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnpvb21UbyhcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgeTogZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuem9vbUR1cmF0aW9uXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignem9vbWVkSW4nLCB7cG9zaXRpb259KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGRlbHRhWSA8IDAgJiYgdGhpcy50cmFuc2Zvcm0uc2NhbGUgPiAxKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICAgICAgdGhpcy56b29tVG8oXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4OiBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGUuY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnpvb21EdXJhdGlvblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3pvb21lZE91dCcsIHtwb3NpdGlvbn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNpbmdsZXRhcChlKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVBhZ2VTcHJlYWQgPSB0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKTtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZUluZm8gPSB0aGlzLmdldENvb3JkaW5hdGVJbmZvKFxuICAgICAgICAgICAgZS5jZW50ZXIueCxcbiAgICAgICAgICAgIGUuY2VudGVyLnksXG4gICAgICAgICAgICBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgICk7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGFwLnRpbWVvdXQpO1xuXG4gICAgICAgIGlmICh0aGlzLnRhcC5jb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50YXAuY291bnQgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2RvdWJsZUNsaWNrZWQnLCBjb29yZGluYXRlSW5mbyk7XG5cbiAgICAgICAgICAgIGlmIChhY3RpdmVQYWdlU3ByZWFkLmlzWm9vbWFibGUoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heFpvb21TY2FsZSA9IGFjdGl2ZVBhZ2VTcHJlYWQuZ2V0TWF4Wm9vbVNjYWxlKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgem9vbWVkSW4gPSB0aGlzLnRyYW5zZm9ybS5zY2FsZSA+IDE7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSB6b29tZWRJbiA/IDEgOiBtYXhab29tU2NhbGU7XG4gICAgICAgICAgICAgICAgY29uc3Qgem9vbUV2ZW50ID0gem9vbWVkSW4gPyAnem9vbWVkT3V0JyA6ICd6b29tZWRJbic7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnpvb21UbyhcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogZS5jZW50ZXIueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGUuY2VudGVyLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnpvb21EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoem9vbUV2ZW50LCB7cG9zaXRpb259KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhcC5jb3VudCsrO1xuICAgICAgICAgICAgdGhpcy50YXAudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGFwLmNvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignY2xpY2tlZCcsIGNvb3JkaW5hdGVJbmZvKTtcbiAgICAgICAgICAgIH0sIHRoaXMudGFwLmRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hTdGFydChlKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRBY3RpdmVQYWdlU3ByZWFkKCkuaXNTY3JvbGxhYmxlKCkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hFbmQoZSkge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpLmlzU2Nyb2xsYWJsZSgpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtLnNjYWxlID4gMSkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQYWdlU3ByZWFkID0gdGhpcy5nZXRBY3RpdmVQYWdlU3ByZWFkKCk7XG5cbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLmxlZnQgPSB0aGlzLmdldExlZnRUcmFuc2Zvcm1Gcm9tUGFnZVNwcmVhZChcbiAgICAgICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0udG9wID0gMDtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnNjYWxlID0gMTtcblxuICAgICAgICAgICAgdGhpcy56b29tVG8oe1xuICAgICAgICAgICAgICAgIHg6IHRoaXMudHJhbnNmb3JtLmxlZnQsXG4gICAgICAgICAgICAgICAgeTogdGhpcy50cmFuc2Zvcm0udG9wLFxuICAgICAgICAgICAgICAgIHNjYWxlOiB0aGlzLnRyYW5zZm9ybS5zY2FsZSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignem9vbWVkT3V0Jywge3Bvc2l0aW9ufSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiZG9jdW1lbnQiLCJERVNDUklQVE9SUyIsImNyZWF0ZUVsZW1lbnQiLCJJRThfRE9NX0RFRklORSIsImRlZmluZVByb3BlcnR5TW9kdWxlIiwic3RvcmUiLCJJU19QVVJFIiwiV2Vha01hcCIsImhhcyIsIk5BVElWRV9XRUFLX01BUCIsInNoYXJlZCIsIm9iamVjdEhhcyIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJzZXRQcm90b3R5cGVPZiIsImNsYXNzb2YiLCJJbmRleGVkT2JqZWN0IiwibWluIiwicmVxdWlyZSQkMCIsImludGVybmFsT2JqZWN0S2V5cyIsImRlZmluZVByb3BlcnRpZXMiLCJoaWRkZW5LZXlzIiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJjcmVhdGVNZXRob2QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJjcmVhdGUiLCJpc0ZvcmNlZCIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiVU5TVVBQT1JURURfWSIsInN0aWNreUhlbHBlcnMiLCIkIiwiZXhlYyIsIk5BVElWRV9TWU1CT0wiLCJTeW1ib2wiLCJVU0VfU1lNQk9MX0FTX1VJRCIsIlNQRUNJRVMiLCJhRnVuY3Rpb24iLCJmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyIsImlzUmVnRXhwIiwiY2FsbFJlZ0V4cEV4ZWMiLCJjaGVjayIsImZhaWxzIiwibmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUiLCJOQVNIT1JOX0JVRyIsInRvU3RyaW5nIiwic3BsaXQiLCJyZXF1aXJlT2JqZWN0Q29lcmNpYmxlIiwiaXNPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsIkVYSVNUUyIsIm5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInRvSW5kZXhlZE9iamVjdCIsInRvUHJpbWl0aXZlIiwiY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yIiwicmVwbGFjZW1lbnQiLCJkYXRhIiwibm9ybWFsaXplIiwiUE9MWUZJTEwiLCJOQVRJVkUiLCJuYXRpdmVEZWZpbmVQcm9wZXJ0eSIsImFuT2JqZWN0IiwicGF0aCIsImJpbmQiLCJjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkiLCJnZXRCdWlsdEluIiwidXNlckFnZW50IiwiY2VpbCIsImZsb29yIiwidG9JbnRlZ2VyIiwiU0hBUkVEIiwic2V0R2xvYmFsIiwiZnVuY3Rpb25Ub1N0cmluZyIsImluc3BlY3RTb3VyY2UiLCJpZCIsInBvc3RmaXgiLCJ1aWQiLCJzZXQiLCJnZXQiLCJlbmZvcmNlIiwiZ2V0dGVyRm9yIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwiU1RBVEUiLCJzaGFyZWRLZXkiLCJJRV9QUk9UTyIsIkNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiIsIldlbGxLbm93blN5bWJvbHNTdG9yZSIsImNyZWF0ZVdlbGxLbm93blN5bWJvbCIsIndlbGxLbm93blN5bWJvbCIsImdldFByb3RvdHlwZU9mIiwibWF4IiwidG9MZW5ndGgiLCJ0b0Fic29sdXRlSW5kZXgiLCJpbmRleE9mIiwiZW51bUJ1Z0tleXMiLCJvYmplY3RLZXlzIiwiR1QiLCJMVCIsIlBST1RPVFlQRSIsIlNDUklQVCIsIkVtcHR5Q29uc3RydWN0b3IiLCJzY3JpcHRUYWciLCJOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYIiwiTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lIiwiZG9jdW1lbnRDcmVhdGVFbGVtZW50IiwiaHRtbCIsImFjdGl2ZVhEb2N1bWVudCIsIk51bGxQcm90b09iamVjdCIsIlRPX1NUUklOR19UQUciLCJjbGFzc29mUmF3IiwiVE9fU1RSSU5HX1RBR19TVVBQT1JUIiwiZGVmaW5lUHJvcGVydHkiLCJJdGVyYXRvclByb3RvdHlwZSIsInJldHVyblRoaXMiLCJJdGVyYXRvcnMiLCJhUG9zc2libGVQcm90b3R5cGUiLCJJdGVyYXRvcnNDb3JlIiwiQlVHR1lfU0FGQVJJX0lURVJBVE9SUyIsIklURVJBVE9SIiwicmVkZWZpbmUiLCJjaGFyQXQiLCJmcm9tIiwicGFyZW50Iiwic2xpY2UiLCJzZXRJbnRlcm5hbFN0YXRlIiwiZ2V0SW50ZXJuYWxTdGF0ZSIsIkRPTUl0ZXJhYmxlcyIsImZvckVhY2giLCJBcnJheVByb3RvdHlwZSIsIlNUUklDVF9NRVRIT0QiLCJVU0VTX1RPX0xFTkdUSCIsIlY4X1ZFUlNJT04iLCJvYmplY3REZWZpbmVQcm9wZXJ0eU1vZGlsZSIsIl9PYmplY3QkZGVmaW5lUHJvcGVydHkiLCJNQVhfU0FGRV9JTlRFR0VSIiwiQW5pbWF0aW9uIiwiZWwiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJ4IiwieSIsInNjYWxlIiwiZWFzaW5nIiwiZHVyYXRpb24iLCJydW4iLCJ0cmFuc2Zvcm0iLCJzdHlsZSIsInRyYW5zaXRpb25FbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidHJhbnNpdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJQYWdlU3ByZWFkIiwidHlwZSIsInBhZ2VJZHMiLCJ3aWR0aCIsImxlZnQiLCJtYXhab29tU2NhbGUiLCJnZXRNYXhab29tU2NhbGUiLCJnZXRFbCIsImdldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicXVlcnlTZWxlY3RvckFsbCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImhlaWdodCIsIl9BcnJheSRmcm9tMiIsImdldFBhZ2VFbHMiLCJwYWdlRWwiLCJwYWdlUmVjdCIsInZpc2liaWxpdHkiLCJkaXNwbGF5IiwicG9zaXRpb25lZCIsImdldExlZnQiLCJhY3RpdmUiLCJzZXRBdHRyaWJ1dGUiLCJvd25LZXlzIiwiRk9SQ0VEIiwid3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSIsIiRmb3JFYWNoIiwiT2JqZWN0UHJvdG90eXBlIiwibmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyIsImdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbCIsIm5hdGl2ZU9iamVjdENyZWF0ZSIsIndyYXAiLCJGQUlMU19PTl9QUklNSVRJVkVTIiwibmF0aXZlS2V5cyIsImFycmF5TWV0aG9kSXNTdHJpY3QiLCJ0b09iamVjdCIsInJlZ0V4cEV4ZWMiLCJJU19OT0RFIiwiQ0hST01FX1ZFUlNJT04iLCJIQVNfU1BFQ0lFU19TVVBQT1JUIiwiX0FycmF5JGlzQXJyYXkiLCJfU3ltYm9sIiwiX2lzSXRlcmFibGUiLCJfZ2V0SXRlcmF0b3IiLCJfc2xpY2VJbnN0YW5jZVByb3BlcnR5IiwiX0FycmF5JGZyb20iLCJTS0lQU19IT0xFUyIsInRlc3QiLCJ3aGl0ZXNwYWNlIiwid2hpdGVzcGFjZXMiLCJsdHJpbSIsInJ0cmltIiwiZm9yY2VkU3RyaW5nVHJpbU1ldGhvZCIsInRyaW0iLCJhc3NpZ24iLCJPYmplY3QiLCJWRU5ET1JfUFJFRklYRVMiLCJURVNUX0VMRU1FTlQiLCJUWVBFX0ZVTkNUSU9OIiwicm91bmQiLCJNYXRoIiwiYWJzIiwibm93IiwiaW52b2tlQXJyYXlBcmciLCJhcmciLCJmbiIsImNvbnRleHQiLCJlYWNoIiwib2JqIiwiaXRlcmF0b3IiLCJpIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY2FsbCIsImluaGVyaXQiLCJjaGlsZCIsImJhc2UiLCJwcm9wZXJ0aWVzIiwiYmFzZVAiLCJwcm90b3R5cGUiLCJjaGlsZFAiLCJfT2JqZWN0JGNyZWF0ZSIsImNvbnN0cnVjdG9yIiwiX3N1cGVyIiwiX09iamVjdCRhc3NpZ24iLCJib29sT3JGbiIsInZhbCIsImFyZ3MiLCJhcHBseSIsImlmVW5kZWZpbmVkIiwidmFsMSIsInZhbDIiLCJhZGRFdmVudExpc3RlbmVycyIsInRhcmdldCIsInR5cGVzIiwiaGFuZGxlciIsInNwbGl0U3RyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJoYXNQYXJlbnQiLCJub2RlIiwicGFyZW50Tm9kZSIsImluU3RyIiwic3RyIiwiZmluZCIsIl9pbmRleE9mSW5zdGFuY2VQcm9wZXJ0eSIsIl90cmltSW5zdGFuY2VQcm9wZXJ0eSIsInRvQXJyYXkiLCJBcnJheSIsInVuaXF1ZUFycmF5IiwiYXJyYXkiLCJrZXkiLCJzb3J0IiwicmVzdWx0cyIsInZhbHVlcyIsIml0ZW0iLCJwdXNoIiwiX3NvcnRJbnN0YW5jZVByb3BlcnR5IiwiYSIsImIiLCJwcmVmaXhlZCIsInByb3BlcnR5IiwiY2FtZWxQcm9wIiwidG9VcHBlckNhc2UiLCJfZmluZEluc3RhbmNlUHJvcGVydHkiLCJwcmVmaXgiLCJfdW5pcXVlSWQiLCJ1bmlxdWVJZCIsImdldFdpbmRvd0ZvckVsZW1lbnQiLCJlbGVtZW50IiwiZG9jIiwib3duZXJEb2N1bWVudCIsImRlZmF1bHRWaWV3IiwicGFyZW50V2luZG93Iiwid2luZG93IiwiTU9CSUxFX1JFR0VYIiwiU1VQUE9SVF9UT1VDSCIsIlNVUFBPUlRfUE9JTlRFUl9FVkVOVFMiLCJTVVBQT1JUX09OTFlfVE9VQ0giLCJuYXZpZ2F0b3IiLCJJTlBVVF9UWVBFX1RPVUNIIiwiSU5QVVRfVFlQRV9QRU4iLCJJTlBVVF9UWVBFX01PVVNFIiwiSU5QVVRfVFlQRV9LSU5FQ1QiLCJDT01QVVRFX0lOVEVSVkFMIiwiSU5QVVRfU1RBUlQiLCJJTlBVVF9NT1ZFIiwiSU5QVVRfRU5EIiwiSU5QVVRfQ0FOQ0VMIiwiRElSRUNUSU9OX05PTkUiLCJESVJFQ1RJT05fTEVGVCIsIkRJUkVDVElPTl9SSUdIVCIsIkRJUkVDVElPTl9VUCIsIkRJUkVDVElPTl9ET1dOIiwiRElSRUNUSU9OX0hPUklaT05UQUwiLCJESVJFQ1RJT05fVkVSVElDQUwiLCJESVJFQ1RJT05fQUxMIiwiUFJPUFNfWFkiLCJQUk9QU19DTElFTlRfWFkiLCJJbnB1dCIsIm1hbmFnZXIiLCJzZWxmIiwiaW5wdXRUYXJnZXQiLCJkb21IYW5kbGVyIiwiZXYiLCJlbmFibGUiLCJpbml0IiwiZXZFbCIsImV2VGFyZ2V0IiwiZXZXaW4iLCJkZXN0cm95IiwiY3JlYXRlSW5wdXRJbnN0YW5jZSIsImlucHV0Q2xhc3MiLCJUeXBlIiwiUG9pbnRlckV2ZW50SW5wdXQiLCJUb3VjaElucHV0IiwiTW91c2VJbnB1dCIsIlRvdWNoTW91c2VJbnB1dCIsImlucHV0SGFuZGxlciIsImV2ZW50VHlwZSIsImlucHV0IiwicG9pbnRlcnNMZW4iLCJwb2ludGVycyIsImNoYW5nZWRQb2ludGVyc0xlbiIsImNoYW5nZWRQb2ludGVycyIsImlzRmlyc3QiLCJpc0ZpbmFsIiwic2Vzc2lvbiIsImNvbXB1dGVJbnB1dERhdGEiLCJlbWl0IiwicmVjb2duaXplIiwicHJldklucHV0IiwicG9pbnRlcnNMZW5ndGgiLCJmaXJzdElucHV0Iiwic2ltcGxlQ2xvbmVJbnB1dERhdGEiLCJmaXJzdE11bHRpcGxlIiwib2Zmc2V0Q2VudGVyIiwiY2VudGVyIiwiZ2V0Q2VudGVyIiwidGltZVN0YW1wIiwiZGVsdGFUaW1lIiwiYW5nbGUiLCJnZXRBbmdsZSIsImRpc3RhbmNlIiwiZ2V0RGlzdGFuY2UiLCJjb21wdXRlRGVsdGFYWSIsIm9mZnNldERpcmVjdGlvbiIsImdldERpcmVjdGlvbiIsImRlbHRhWCIsImRlbHRhWSIsIm92ZXJhbGxWZWxvY2l0eSIsImdldFZlbG9jaXR5Iiwib3ZlcmFsbFZlbG9jaXR5WCIsIm92ZXJhbGxWZWxvY2l0eVkiLCJnZXRTY2FsZSIsInJvdGF0aW9uIiwiZ2V0Um90YXRpb24iLCJtYXhQb2ludGVycyIsImNvbXB1dGVJbnRlcnZhbElucHV0RGF0YSIsInNyY0V2ZW50Iiwib2Zmc2V0Iiwib2Zmc2V0RGVsdGEiLCJwcmV2RGVsdGEiLCJsYXN0IiwibGFzdEludGVydmFsIiwidmVsb2NpdHkiLCJ2ZWxvY2l0eVgiLCJ2ZWxvY2l0eVkiLCJkaXJlY3Rpb24iLCJ2IiwiX21hcEluc3RhbmNlUHJvcGVydHkiLCJwb2ludGVyIiwiY2xpZW50WCIsImNsaWVudFkiLCJwMSIsInAyIiwieEtleSIsInlLZXkiLCJzcXJ0IiwicG93IiwiYXRhbjIiLCJQSSIsInN0YXJ0IiwiZW5kIiwiTU9VU0VfSU5QVVRfTUFQIiwibW91c2Vkb3duIiwibW91c2Vtb3ZlIiwibW91c2V1cCIsIk1PVVNFX0VMRU1FTlRfRVZFTlRTIiwiTU9VU0VfV0lORE9XX0VWRU5UUyIsInByZXNzZWQiLCJhcmd1bWVudHMiLCJidXR0b24iLCJ3aGljaCIsInBvaW50ZXJUeXBlIiwiUE9JTlRFUl9JTlBVVF9NQVAiLCJwb2ludGVyZG93biIsInBvaW50ZXJtb3ZlIiwicG9pbnRlcnVwIiwicG9pbnRlcmNhbmNlbCIsInBvaW50ZXJvdXQiLCJJRTEwX1BPSU5URVJfVFlQRV9FTlVNIiwiUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyIsIlBPSU5URVJfV0lORE9XX0VWRU5UUyIsIk1TUG9pbnRlckV2ZW50IiwiUG9pbnRlckV2ZW50IiwicG9pbnRlckV2ZW50cyIsInJlbW92ZVBvaW50ZXIiLCJldmVudFR5cGVOb3JtYWxpemVkIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiaXNUb3VjaCIsInN0b3JlSW5kZXgiLCJfZmluZEluZGV4SW5zdGFuY2VQcm9wZXJ0eSIsInBvaW50ZXJJZCIsIl9zcGxpY2VJbnN0YW5jZVByb3BlcnR5IiwiU0lOR0xFX1RPVUNIX0lOUFVUX01BUCIsInRvdWNoc3RhcnQiLCJ0b3VjaG1vdmUiLCJ0b3VjaGVuZCIsInRvdWNoY2FuY2VsIiwiU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFMiLCJTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUyIsIlNpbmdsZVRvdWNoSW5wdXQiLCJzdGFydGVkIiwibm9ybWFsaXplU2luZ2xlVG91Y2hlcyIsImFsbCIsInRvdWNoZXMiLCJjaGFuZ2VkIiwiY2hhbmdlZFRvdWNoZXMiLCJfY29uY2F0SW5zdGFuY2VQcm9wZXJ0eSIsIlRPVUNIX0lOUFVUX01BUCIsIlRPVUNIX1RBUkdFVF9FVkVOVFMiLCJ0YXJnZXRJZHMiLCJnZXRUb3VjaGVzIiwiYWxsVG91Y2hlcyIsImlkZW50aWZpZXIiLCJ0YXJnZXRUb3VjaGVzIiwiY2hhbmdlZFRhcmdldFRvdWNoZXMiLCJfZmlsdGVySW5zdGFuY2VQcm9wZXJ0eSIsInRvdWNoIiwidGFyZ2V0VG91Y2giLCJjaGFuZ2VkVG91Y2giLCJERURVUF9USU1FT1VUIiwiREVEVVBfRElTVEFOQ0UiLCJfYmluZEluc3RhbmNlUHJvcGVydHkiLCJtb3VzZSIsInByaW1hcnlUb3VjaCIsImxhc3RUb3VjaGVzIiwiaW5wdXRFdmVudCIsImlucHV0RGF0YSIsImlzTW91c2UiLCJzb3VyY2VDYXBhYmlsaXRpZXMiLCJmaXJlc1RvdWNoRXZlbnRzIiwicmVjb3JkVG91Y2hlcyIsImlzU3ludGhldGljRXZlbnQiLCJldmVudERhdGEiLCJzZXRMYXN0VG91Y2giLCJsYXN0VG91Y2giLCJsdHMiLCJyZW1vdmVMYXN0VG91Y2giLCJQUkVGSVhFRF9UT1VDSF9BQ1RJT04iLCJ0ZSIsIk5BVElWRV9UT1VDSF9BQ1RJT04iLCJUT1VDSF9BQ1RJT05fQ09NUFVURSIsIlRPVUNIX0FDVElPTl9BVVRPIiwiVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTiIsIlRPVUNIX0FDVElPTl9OT05FIiwiVE9VQ0hfQUNUSU9OX1BBTl9YIiwiVE9VQ0hfQUNUSU9OX1BBTl9ZIiwiVG91Y2hBY3Rpb24iLCJ2YWx1ZSIsImNvbXB1dGUiLCJUT1VDSF9BQ1RJT05fTUFQIiwiZ2V0VG91Y2hBY3Rpb25Qcm9wcyIsImFjdGlvbnMiLCJ1cGRhdGUiLCJ0b3VjaEFjdGlvbiIsInJlY29nbml6ZXJzIiwicmVjb2duaXplciIsImdldFRvdWNoQWN0aW9uIiwiY2xlYW5Ub3VjaEFjdGlvbnMiLCJqb2luIiwicHJldmVudERlZmF1bHRzIiwicHJldmVudGVkIiwicHJldmVudERlZmF1bHQiLCJoYXNOb25lIiwiaGFzUGFuWSIsImhhc1BhblgiLCJpc1RhcFBvaW50ZXIiLCJpc1RhcE1vdmVtZW50IiwiaXNUYXBUb3VjaFRpbWUiLCJwcmV2ZW50U3JjIiwidG91Y2hWYWxzIiwiY3NzU3VwcG9ydHMiLCJDU1MiLCJzdXBwb3J0cyIsIl9yZWR1Y2VJbnN0YW5jZVByb3BlcnR5IiwidG91Y2hNYXAiLCJTVEFURV9QT1NTSUJMRSIsIlNUQVRFX0JFR0FOIiwiU1RBVEVfQ0hBTkdFRCIsIlNUQVRFX0VOREVEIiwiU1RBVEVfUkVDT0dOSVpFRCIsIlNUQVRFX0NBTkNFTExFRCIsIlNUQVRFX0ZBSUxFRCIsIlJlY29nbml6ZXIiLCJkZWZhdWx0cyIsInN0YXRlIiwic2ltdWx0YW5lb3VzIiwicmVxdWlyZUZhaWwiLCJyZWNvZ25pemVXaXRoIiwib3RoZXJSZWNvZ25pemVyIiwiZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlciIsImRyb3BSZWNvZ25pemVXaXRoIiwicmVxdWlyZUZhaWx1cmUiLCJkcm9wUmVxdWlyZUZhaWx1cmUiLCJpbmRleCIsImhhc1JlcXVpcmVGYWlsdXJlcyIsImNhblJlY29nbml6ZVdpdGgiLCJldmVudCIsInN0YXRlU3RyIiwiYWRkaXRpb25hbEV2ZW50IiwidHJ5RW1pdCIsImNhbkVtaXQiLCJpbnB1dERhdGFDbG9uZSIsInJlc2V0IiwicHJvY2VzcyIsImRpcmVjdGlvblN0ciIsIkF0dHJSZWNvZ25pemVyIiwiYXR0clRlc3QiLCJvcHRpb25Qb2ludGVycyIsImlzUmVjb2duaXplZCIsImlzVmFsaWQiLCJQYW5SZWNvZ25pemVyIiwicFgiLCJwWSIsInRocmVzaG9sZCIsImRpcmVjdGlvblRlc3QiLCJoYXNNb3ZlZCIsIlBpbmNoUmVjb2duaXplciIsImluT3V0IiwiUHJlc3NSZWNvZ25pemVyIiwiX3RpbWVyIiwiX2lucHV0IiwidGltZSIsInZhbGlkUG9pbnRlcnMiLCJ2YWxpZE1vdmVtZW50IiwidmFsaWRUaW1lIiwiX3NldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJSb3RhdGVSZWNvZ25pemVyIiwiU3dpcGVSZWNvZ25pemVyIiwiVGFwUmVjb2duaXplciIsInBUaW1lIiwicENlbnRlciIsImNvdW50IiwidGFwcyIsImludGVydmFsIiwicG9zVGhyZXNob2xkIiwidmFsaWRUb3VjaFRpbWUiLCJmYWlsVGltZW91dCIsInZhbGlkSW50ZXJ2YWwiLCJ2YWxpZE11bHRpVGFwIiwidGFwQ291bnQiLCJIYW1tZXIiLCJwcmVzZXQiLCJNYW5hZ2VyIiwiVkVSU0lPTiIsImRvbUV2ZW50cyIsImNzc1Byb3BzIiwidXNlclNlbGVjdCIsInRvdWNoU2VsZWN0IiwidG91Y2hDYWxsb3V0IiwiY29udGVudFpvb21pbmciLCJ1c2VyRHJhZyIsInRhcEhpZ2hsaWdodENvbG9yIiwiU1RPUCIsIkZPUkNFRF9TVE9QIiwiaGFuZGxlcnMiLCJvbGRDc3NQcm9wcyIsInRvZ2dsZUNzc1Byb3BzIiwiYWRkIiwic3RvcCIsImZvcmNlIiwic3RvcHBlZCIsImN1clJlY29nbml6ZXIiLCJleGlzdGluZyIsInJlbW92ZSIsIm9uIiwiZXZlbnRzIiwib2ZmIiwidHJpZ2dlckRvbUV2ZW50IiwicHJvcCIsIm5hbWUiLCJnZXN0dXJlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImdlc3R1cmUiLCJkaXNwYXRjaEV2ZW50IiwiVGFwIiwiUGFuIiwiU3dpcGUiLCJQaW5jaCIsIlJvdGF0ZSIsIlByZXNzIiwiVmVyc28iLCJzd2lwZVZlbG9jaXR5Iiwic3dpcGVUaHJlc2hvbGQiLCJuYXZpZ2F0aW9uRHVyYXRpb24iLCJuYXZpZ2F0aW9uUGFuRHVyYXRpb24iLCJ6b29tRHVyYXRpb24iLCJkb3VibGVUYXBEZWxheSIsInBvc2l0aW9uIiwicGluY2hpbmciLCJwYW5uaW5nIiwic3RhcnRUcmFuc2Zvcm0iLCJ0YXAiLCJkZWxheSIsImRlc3Ryb3llZCIsIl9ldmVudHMiLCJlIiwic2Nyb2xsZXJFbCIsInF1ZXJ5U2VsZWN0b3IiLCJwYWdlU3ByZWFkRWxzIiwicGFnZVNwcmVhZHMiLCJ0cmF2ZXJzZVBhZ2VTcHJlYWRzIiwiYnVpbGRQYWdlSWRzIiwiYW5pbWF0aW9uIiwiaGFtbWVyIiwiZ2V0SGFtbWVySW5wdXRDbGFzcyIsIm9uUGFuU3RhcnQiLCJvblBhbk1vdmUiLCJvblBhbkVuZCIsIm9uU2luZ2xldGFwIiwib25QaW5jaFN0YXJ0Iiwib25QaW5jaE1vdmUiLCJvblBpbmNoRW5kIiwib25QcmVzcyIsIm9uQ29udGV4dG1lbnUiLCJvbldoZWVsIiwicGFnZUlkIiwiZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZCIsIm5hdmlnYXRlVG8iLCJyZXNpemVMaXN0ZW5lciIsIm9uUmVzaXplIiwidG91Y2hTdGFydExpc3RlbmVyIiwib25Ub3VjaFN0YXJ0IiwidG91Y2hFbmRMaXN0ZW5lciIsIm9uVG91Y2hFbmQiLCJjb25zb2xlIiwid2FybiIsImdldFBvc2l0aW9uIiwiZ2V0UGFnZVNwcmVhZENvdW50IiwiY3VycmVudFBvc2l0aW9uIiwiY3VycmVudFBhZ2VTcHJlYWQiLCJnZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIiwiYWN0aXZlUGFnZVNwcmVhZCIsImNhcm91c2VsIiwiZ2V0Q2Fyb3VzZWxGcm9tUGFnZVNwcmVhZCIsImlzU2Nyb2xsYWJsZSIsImRlYWN0aXZhdGUiLCJhY3RpdmF0ZSIsInZpc2libGUiLCJwYWdlU3ByZWFkIiwic2V0VmlzaWJpbGl0eSIsImdldExlZnRUcmFuc2Zvcm1Gcm9tUGFnZVNwcmVhZCIsInNldFBvc2l0aW9uIiwidHJpZ2dlciIsIm5ld1Bvc2l0aW9uIiwiYW5pbWF0ZSIsImdldEFjdGl2ZVBhZ2VTcHJlYWQiLCJnb25lIiwicHJldmlvdXNQb3NpdGlvbiIsImdldFdpZHRoIiwicGFnZVNwcmVhZFN1YmplY3QiLCJlbHMiLCJOdW1iZXIiLCJvZmZzZXRMZWZ0Iiwib2Zmc2V0VG9wIiwiaW5mbyIsImNvbnRlbnRYIiwiY29udGVudFkiLCJwYWdlWCIsInBhZ2VZIiwib3ZlcmxheUVscyIsImlzSW5zaWRlQ29udGVudFgiLCJpc0luc2lkZUNvbnRlbnRZIiwiaXNJbnNpZGVDb250ZW50IiwiY29udGVudFJlY3QiLCJnZXRDb250ZW50UmVjdCIsImdldE92ZXJsYXlFbHMiLCJwYWdlRWxzIiwib3ZlcmxheUVsIiwiaXNDb29yZGluYXRlSW5zaWRlRWxlbWVudCIsImlkeCIsInBhZ2VTcHJlYWRSZWN0IiwiZ2V0UmVjdCIsInBhZ2VTcHJlYWRDb250ZW50UmVjdCIsImNvb3JkaW5hdGUiLCJzaXplIiwiY3VyU2NhbGUiLCJwYWdlU3ByZWFkQm91bmRzIiwiZ2V0UGFnZVNwcmVhZEJvdW5kcyIsImNhcm91c2VsT2Zmc2V0IiwiY2Fyb3VzZWxTY2FsZWRPZmZzZXQiLCJib3VuZHMiLCJjbGlwQ29vcmRpbmF0ZSIsIm1vYmlsZVJlZ2V4Iiwic3VwcG9ydFRvdWNoIiwiZWRnZVRocmVzaG9sZCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwibmV4dCIsInByZXYiLCJpc1pvb21hYmxlIiwiem9vbVRvIiwiZ2V0Q29vcmRpbmF0ZUluZm8iLCJ3ZWJraXREaXJlY3Rpb25JbnZlcnRlZEZyb21EZXZpY2UiLCJjb29yZGluYXRlSW5mbyIsInRpbWVvdXQiLCJ6b29tZWRJbiIsInpvb21FdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0VBQUEsU0FBYyxHQUFHLFVBQVUsSUFBSSxFQUFFO0VBQ2pDLEVBQUUsSUFBSTtFQUNOLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDcEIsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFO0VBQ2xCLElBQUksT0FBTyxJQUFJLENBQUM7RUFDaEIsR0FBRztFQUNILENBQUM7O0VDSkQ7RUFDQSxlQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWTtFQUNwQyxFQUFFLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFD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O0VBQ2xCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0IsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtFQUN0QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUUsT0FBTyxHQUFHLENBQUM7RUFDcEQsS0FBSyxNQUFNLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtFQUM3QixNQUFNLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtFQUN6RCxRQUFRLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0VBQzFELFFBQVEsU0FBUyxPQUFPLENBQUMsRUFBRSxDQUFDO0VBQzVCLE9BQU87RUFDUCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDN0IsTUFBTSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtFQUMvQyxRQUFRLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3hDO0VBQ0E7RUFDQSxRQUFRLElBQUksSUFBSSxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0VBQ3BELE9BQU8sQ0FBQyxPQUFP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
