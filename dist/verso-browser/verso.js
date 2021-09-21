(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Verso = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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
  var getOwnPropertyDescriptor$6 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG$1 = getOwnPropertyDescriptor$6 && !nativePropertyIsEnumerable$2.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$b = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$6(this, V);
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

  var nativeGetOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$a = descriptors$1 ? nativeGetOwnPropertyDescriptor$3 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$1(O);
    P = toPrimitive$1(P, true);
    if (ie8DomDefine$1) try {
      return nativeGetOwnPropertyDescriptor$3(O, P);
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

  var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor$1.f;






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
        descriptor = getOwnPropertyDescriptor$5(nativeSource, key);
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

  var defineProperty$7 = defineProperty_1;

  var defineProperty$6 = defineProperty$7;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      defineProperty$6(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

  var nativePropertyIsEnumerable$1 = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$4 && !nativePropertyIsEnumerable$1.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$8 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$4(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable$1;

  var objectPropertyIsEnumerable = {
  	f: f$8
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$1 = {}.toString;

  var classofRaw = function (it) {
    return toString$1.call(it).slice(8, -1);
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

  var has$2 = function (it, key) {
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

  var nativeGetOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$7 = descriptors ? nativeGetOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor$2(O, P);
    } catch (error) { /* empty */ }
    if (has$2(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$7
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty$1 = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$6 = descriptors ? nativeDefineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty$1(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f$6
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal$1 = function (key, value) {
    try {
      createNonEnumerableProperty(global$1, key, value);
    } catch (error) {
      global$1[key] = value;
    } return value;
  };

  var SHARED$1 = '__core-js_shared__';
  var store$3 = global$1[SHARED$1] || setGlobal$1(SHARED$1, {});

  var sharedStore$1 = store$3;

  var functionToString$1 = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore$1.inspectSource != 'function') {
    sharedStore$1.inspectSource = function (it) {
      return functionToString$1.call(it);
    };
  }

  var inspectSource$1 = sharedStore$1.inspectSource;

  var WeakMap$3 = global$1.WeakMap;

  var nativeWeakMap$1 = typeof WeakMap$3 === 'function' && /native code/.test(inspectSource$1(WeakMap$3));

  var shared$1 = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore$1[key] || (sharedStore$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.9.1',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id$1 = 0;
  var postfix$1 = Math.random();

  var uid$1 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
  };

  var keys$5 = shared$1('keys');

  var sharedKey$1 = function (key) {
    return keys$5[key] || (keys$5[key] = uid$1(key));
  };

  var hiddenKeys$3 = {};

  var WeakMap$2 = global$1.WeakMap;
  var set$1, get$1, has$1;

  var enforce$1 = function (it) {
    return has$1(it) ? get$1(it) : set$1(it, {});
  };

  var getterFor$1 = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get$1(it)).type !== TYPE) {
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
    has$1 = function (it) {
      return wmhas$1.call(store$2, it);
    };
  } else {
    var STATE$1 = sharedKey$1('state');
    hiddenKeys$3[STATE$1] = true;
    set$1 = function (it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE$1, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return has$2(it, STATE$1) ? it[STATE$1] : {};
    };
    has$1 = function (it) {
      return has$2(it, STATE$1);
    };
  }

  var internalState$1 = {
    set: set$1,
    get: get$1,
    has: has$1,
    enforce: enforce$1,
    getterFor: getterFor$1
  };

  var redefine$1 = createCommonjsModule(function (module) {
  var getInternalState = internalState$1.get;
  var enforceInternalState = internalState$1.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$2(value, 'name')) {
        createNonEnumerableProperty(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$1) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
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
    return typeof this == 'function' && getInternalState(this).source || inspectSource$1(this);
  });
  });

  var path = global$1;

  var aFunction$2 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$1 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$2(path[namespace]) || aFunction$2(global$1[namespace])
      : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
  };

  var ceil$1 = Math.ceil;
  var floor$2 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$1 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$2 : ceil$1)(argument);
  };

  var min$6 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$1 = function (argument) {
    return argument > 0 ? min$6(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max$4 = Math.max;
  var min$5 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toInteger$1(index);
    return integer < 0 ? max$4(integer + length, 0) : min$5(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$8 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
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

  var indexOf$4 = arrayIncludes$1.indexOf;


  var objectKeysInternal$1 = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$2(hiddenKeys$3, key) && has$2(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$2(O, key = names[i++])) {
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

  var hiddenKeys$2 = enumBugKeys$1.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal$1(O, hiddenKeys$2);
  };

  var objectGetOwnPropertyNames$1 = {
  	f: f$5
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols$1 = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys$2 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames$1.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys$2(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$2(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
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
      target = global$1[TARGET] || setGlobal$1(TARGET, {});
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
      redefine$1(target, key, sourceProperty, options);
    }
  };

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

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  var engineIsNode$1 = classofRaw(global$1.process) == 'process';

  var engineUserAgent$1 = getBuiltIn$1('navigator', 'userAgent') || '';

  var process$1 = global$1.process;
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

  var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails(function () {
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
  var Symbol$2 = global$1.Symbol;
  var createWellKnownSymbol$1 = useSymbolAsUid$1 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

  var wellKnownSymbol$1 = function (name) {
    if (!has$2(WellKnownSymbolsStore$2, name) || !(nativeSymbol$1 || typeof WellKnownSymbolsStore$2[name] == 'string')) {
      if (nativeSymbol$1 && has$2(Symbol$2, name)) {
        WellKnownSymbolsStore$2[name] = Symbol$2[name];
      } else {
        WellKnownSymbolsStore$2[name] = createWellKnownSymbol$1('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$2[name];
  };

  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES$4 = wellKnownSymbol$1('species');

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
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
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

      redefine$1(String.prototype, KEY, stringMethod);
      redefine$1(RegExp.prototype, SYMBOL, length == 2
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

  var MATCH = wellKnownSymbol$1('match');

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

  var SPECIES$3 = wellKnownSymbol$1('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$7 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
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
    codeAt: createMethod$7(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$7(true)
  };

  var charAt$1 = stringMultibyte$1.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
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
  var min$4 = Math.min;
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
            (e = min$4(toLength$1(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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

  var aPossiblePrototype$1 = function (it) {
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
      aPossiblePrototype$1(proto);
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
  var objectKeys$1 = Object.keys || function keys(O) {
    return objectKeysInternal$1(O, enumBugKeys$1);
  };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  var objectDefineProperties$1 = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html$1 = getBuiltIn$1('document', 'documentElement');

  var GT$1 = '>';
  var LT$1 = '<';
  var PROTOTYPE$2 = 'prototype';
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
    var iframe = documentCreateElement('iframe');
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

  hiddenKeys$3[IE_PROTO$2] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate$1 = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor$1[PROTOTYPE$2] = anObject(O);
      result = new EmptyConstructor$1();
      EmptyConstructor$1[PROTOTYPE$2] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$2] = O;
    } else result = NullProtoObject$1();
    return Properties === undefined ? result : objectDefineProperties$1(result, Properties);
  };

  // a string of all valid unicode whitespaces
  var whitespaces$1 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace$1 = '[' + whitespaces$1 + ']';
  var ltrim$1 = RegExp('^' + whitespace$1 + whitespace$1 + '*');
  var rtrim$1 = RegExp(whitespace$1 + whitespace$1 + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$6 = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim$1, '');
      if (TYPE & 2) string = string.replace(rtrim$1, '');
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

  var getOwnPropertyNames = objectGetOwnPropertyNames$1.f;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$5 = objectDefineProperty.f;
  var trim$3 = stringTrim$1.trim;

  var NUMBER = 'Number';
  var NativeNumber = global$1[NUMBER];
  var NumberPrototype = NativeNumber.prototype;

  // Opera ~12 has broken Object#toString
  var BROKEN_CLASSOF = classofRaw(objectCreate$1(NumberPrototype)) == NUMBER;

  // `ToNumber` abstract operation
  // https://tc39.es/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, false);
    var first, third, radix, maxCode, digits, length, index, code;
    if (typeof it == 'string' && it.length > 2) {
      it = trim$3(it);
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
    for (var keys$4 = descriptors ? getOwnPropertyNames(NativeNumber) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
      // ESNext
      'fromString,range'
    ).split(','), j = 0, key; keys$4.length > j; j++) {
      if (has$2(NativeNumber, key = keys$4[j]) && !has$2(NumberWrapper, key)) {
        defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine$1(global$1, NUMBER, NumberWrapper);
  }

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
  };

  var max$3 = Math.max;
  var min$3 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
  };

  var min$2 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min$2(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$1 = function (argument) {
    return Object(requireObjectCoercible$1(argument));
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  var isArray$5 = Array.isArray || function isArray(arg) {
    return classofRaw$1(arg) == 'Array';
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty$1(global$2, key, value);
    } catch (error) {
      global$2[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global$2[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store$1;

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.9.1',
    mode: 'pure' ,
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var engineIsNode = classofRaw$1(global$2.process) == 'process';

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path$1[namespace]) || aFunction(global$2[namespace])
      : path$1[namespace] && path$1[namespace][method] || global$2[namespace] && global$2[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

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

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$1(function () {
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

  var WellKnownSymbolsStore$1 = shared('wks');
  var Symbol$1 = global$2.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has$3(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (nativeSymbol && has$3(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore$1[name];
  };

  var SPECIES$2 = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray$5(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;
      else if (isObject$1(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive$1(key);
    if (propertyKey in object) objectDefineProperty$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
    else object[propertyKey] = value;
  };

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

  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');

  var max$2 = Math.max;
  var min$1 = Math.min;
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject$1(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$1(max$2(toInteger(deleteCount), 0), len - actualStart);
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

  var entryVirtual = function (CONSTRUCTOR) {
    return path$1[CONSTRUCTOR + 'Prototype'];
  };

  var splice$2 = entryVirtual('Array').splice;

  var ArrayPrototype$b = Array.prototype;

  var splice_1 = function (it) {
    var own = it.splice;
    return it === ArrayPrototype$b || (it instanceof Array && own === ArrayPrototype$b.splice) ? splice$2 : own;
  };

  var splice$1 = splice_1;

  var splice = splice$1;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$5 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$1($this);
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

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$1(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $indexOf = arrayIncludes.indexOf;


  var nativeIndexOf = [].indexOf;

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD$4 = arrayMethodIsStrict$1('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  _export$1({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$4 }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      return NEGATIVE_ZERO
        // convert -0 to +0
        ? nativeIndexOf.apply(this, arguments) || 0
        : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var indexOf$3 = entryVirtual('Array').indexOf;

  var ArrayPrototype$a = Array.prototype;

  var indexOf_1 = function (it) {
    var own = it.indexOf;
    return it === ArrayPrototype$a || (it instanceof Array && own === ArrayPrototype$a.indexOf) ? indexOf$3 : own;
  };

  var indexOf$2 = indexOf_1;

  var indexOf$1 = indexOf$2;

  var iterators = {};

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = global$2.WeakMap;

  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

  var keys$3 = shared('keys');

  var sharedKey = function (key) {
    return keys$3[key] || (keys$3[key] = uid(key));
  };

  var hiddenKeys$1 = {};

  var WeakMap = global$2.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
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
      createNonEnumerableProperty$1(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has$3(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return has$3(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var correctPrototypeGetter = !fails$1(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject$1(O);
    if (has$3(O, IE_PROTO$1)) return O[IE_PROTO$1];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype$1 : null;
  };

  var ITERATOR$5 = wellKnownSymbol('iterator');
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

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$3(hiddenKeys$1, key) && has$3(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$3(O, key = names[i++])) {
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
  var objectDefineProperties = descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$1(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty$1.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
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
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject$1(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var test$1 = {};

  test$1[TO_STRING_TAG$3] = 'z';

  var toStringTagSupport = String(test$1) === '[object z]';

  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
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

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  var defineProperty$4 = objectDefineProperty$1.f;





  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;
      if (!has$3(target, TO_STRING_TAG$1)) {
        defineProperty$4(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
      }
      if (SET_METHOD && !toStringTagSupport) {
        createNonEnumerableProperty$1(target, 'toString', objectToString);
      }
    }
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

  var aPossiblePrototype = function (it) {
    if (!isObject$1(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  /* eslint-disable no-proto -- safe */

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  Object.setPrototypeOf || ('__proto__' in {} ? function () {
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

  var redefine = function (target, key, value, options) {
    if (options && options.enumerable) target[key] = value;
    else createNonEnumerableProperty$1(target, key, value);
  };

  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol('iterator');
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
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$2 = internalState.set;
  var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR);

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
    setInternalState$2(this, {
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

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global$2[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    iterators[COLLECTION_NAME] = iterators.Array;
  }

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
      var length = toLength(self.length);
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


  var STRICT_METHOD$3 = arrayMethodIsStrict$1('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  } : [].forEach;

  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  _export$1({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
    forEach: arrayForEach
  });

  var forEach$2 = entryVirtual('Array').forEach;

  var forEach$1 = forEach$2;

  var ArrayPrototype$9 = Array.prototype;

  var DOMIterables = {
    DOMTokenList: true,
    NodeList: true
  };

  var forEach_1 = function (it) {
    var own = it.forEach;
    return it === ArrayPrototype$9 || (it instanceof Array && own === ArrayPrototype$9.forEach)
      // eslint-disable-next-line no-prototype-builtins -- safe
      || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
  };

  var forEach = forEach_1;

  var slice$6 = [].slice;
  var factories = {};

  var construct = function (C, argsLength, args) {
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

  var bind$2 = entryVirtual('Function').bind;

  var FunctionPrototype = Function.prototype;

  var bind_1 = function (it) {
    var own = it.bind;
    return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind$2 : own;
  };

  var bind$1 = bind_1;

  var bind = bind$1;

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible$1($this));
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

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

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
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

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

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var ArrayPrototype$8 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype$8[ITERATOR$3] === it);
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$2]
      || it['@@iterator']
      || iterators[classof(it)];
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
      length = toLength(O.length);
      result = new C(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');
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
    iteratorWithReturn[ITERATOR$1] = function () {
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
      object[ITERATOR$1] = function () {
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

  var from$4 = path$1.Array.from;

  var from$3 = from$4;

  var from$2 = from$3;

  var slice$5 = [].slice;
  var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

  var wrap$1 = function (scheduler) {
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
    setTimeout: wrap$1(global$2.setTimeout),
    // `setInterval` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
    setInterval: wrap$1(global$2.setInterval)
  });

  var setTimeout$1 = path$1.setTimeout;

  var setTimeout = setTimeout$1;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      defineProperty$6(obj, key, {
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
    return spreadable !== undefined ? !!spreadable : isArray$5(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export$1({ target: 'Array', proto: true, forced: FORCED$2 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$1(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
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

  var concat$2 = entryVirtual('Array').concat;

  var ArrayPrototype$7 = Array.prototype;

  var concat_1 = function (it) {
    var own = it.concat;
    return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.concat) ? concat$2 : own;
  };

  var concat$1 = concat_1;

  var concat = concat$1;

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

  var FAILS_ON_PRIMITIVES$1 = fails$1(function () { objectKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  _export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
    keys: function keys(it) {
      return objectKeys(toObject$1(it));
    }
  });

  var keys$2 = path$1.Object.keys;

  var keys$1 = keys$2;

  var keys = keys$1;

  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

  var toString = {}.toString;

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
  var f$2 = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]'
      ? getWindowNames(it)
      : nativeGetOwnPropertyNames$1(toIndexedObject$1(it));
  };

  var objectGetOwnPropertyNamesExternal = {
  	f: f$2
  };

  var f$1 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$1
  };

  var f = wellKnownSymbol;

  var wellKnownSymbolWrapped = {
  	f: f
  };

  var defineProperty$3 = objectDefineProperty$1.f;

  var defineWellKnownSymbol = function (NAME) {
    var Symbol = path$1.Symbol || (path$1.Symbol = {});
    if (!has$3(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  var $forEach = arrayIteration.forEach;

  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$2.Symbol;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor$1.f;
  var nativeDefineProperty = objectDefineProperty$1.f;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = objectPropertyIsEnumerable$1.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global$2.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = descriptors$1 && fails$1(function () {
    return objectCreate(nativeDefineProperty({}, 'a', {
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
    var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
    setInternalState(symbol, {
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
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$1(O);
    var key = toPrimitive$1(P, true);
    anObject$1(Attributes);
    if (has$3(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has$3(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has$3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
      } return setSymbolDescriptor(O, key, Attributes);
    } return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject$1(O);
    var properties = toIndexedObject$1(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!descriptors$1 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive$1(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has$3(AllSymbols, P) && !has$3(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has$3(this, P) || !has$3(AllSymbols, P) || has$3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject$1(O);
    var key = toPrimitive$1(P, true);
    if (it === ObjectPrototype && has$3(AllSymbols, key) && !has$3(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
    if (descriptor && has$3(AllSymbols, key) && !(has$3(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has$3(AllSymbols, key) && !has$3(hiddenKeys$1, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
    var result = [];
    $forEach(names, function (key) {
      if (has$3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$3(ObjectPrototype, key))) {
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
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has$3(this, HIDDEN) && has$3(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
      };
      if (descriptors$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
      return wrap(tag, description);
    };

    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState(this).tag;
    });

    redefine($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });

    objectPropertyIsEnumerable$1.f = $propertyIsEnumerable;
    objectDefineProperty$1.f = $defineProperty;
    objectGetOwnPropertyDescriptor$1.f = $getOwnPropertyDescriptor;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap(wellKnownSymbol(name), name);
    };

    if (descriptors$1) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });
    }
  }

  _export$1({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
    Symbol: $Symbol
  });

  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  _export$1({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
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
  _export$1({ target: 'Object', stat: true, forced: fails$1(function () { objectGetOwnPropertySymbols.f(1); }) }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols.f(toObject$1(it));
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

  hiddenKeys$1[HIDDEN] = true;

  var getOwnPropertySymbols$2 = path$1.Object.getOwnPropertySymbols;

  var getOwnPropertySymbols$1 = getOwnPropertySymbols$2;

  var getOwnPropertySymbols = getOwnPropertySymbols$1;

  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;


  var FAILS_ON_PRIMITIVES = fails$1(function () { nativeGetOwnPropertyDescriptor(1); });
  var FORCED$1 = !descriptors$1 || FAILS_ON_PRIMITIVES;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  _export$1({ target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors$1 }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor(toIndexedObject$1(it), key);
    }
  });

  var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
  var Object = path$1.Object;

  var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
    return Object.getOwnPropertyDescriptor(it, key);
  };

  if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
  });

  var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor_1;

  var getOwnPropertyDescriptor = getOwnPropertyDescriptor$1;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject$1(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
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

  var getOwnPropertyDescriptors$2 = path$1.Object.getOwnPropertyDescriptors;

  var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors$2;

  var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  _export$1({ target: 'Object', stat: true, forced: !descriptors$1, sham: !descriptors$1 }, {
    defineProperties: objectDefineProperties
  });

  var defineProperties_1 = createCommonjsModule(function (module) {
  var Object = path$1.Object;

  var defineProperties = module.exports = function defineProperties(T, D) {
    return Object.defineProperties(T, D);
  };

  if (Object.defineProperties.sham) defineProperties.sham = true;
  });

  var defineProperties$1 = defineProperties_1;

  var defineProperties = defineProperties$1;

  var defineProperty$2 = defineProperty_1;

  var defineProperty$1 = defineProperty$2;

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

  var ITERATOR = wellKnownSymbol('iterator');

  var isIterable$1 = function (it) {
    var O = Object(it);
    return O[ITERATOR] !== undefined
      || '@@iterator' in O
      // eslint-disable-next-line no-prototype-builtins -- safe
      || iterators.hasOwnProperty(classof(O));
  };

  var isIterable_1 = isIterable$1;

  var isIterable = isIterable_1;

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

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');

  var SPECIES = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$1(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$5(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray$5(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$1(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var slice$4 = entryVirtual('Array').slice;

  var ArrayPrototype$6 = Array.prototype;

  var slice_1 = function (it) {
    var own = it.slice;
    return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.slice) ? slice$4 : own;
  };

  var slice$3 = slice_1;

  var slice$2 = slice$3;

  var from$1 = from$4;

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
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$1(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max(min(toInteger$1(result.index), S.length), 0);
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

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

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

  // `Date.now` method
  // https://tc39.es/ecma262/#sec-date.now
  _export$1({ target: 'Date', stat: true }, {
    now: function now() {
      return new Date().getTime();
    }
  });

  var now$3 = path$1.Date.now;

  var now$2 = now$3;

  var now$1 = now$2;

  var isArray$1 = isArray$4;

  var isArray = isArray$1;

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

  var nativeAssign = Object.assign;
  var defineProperty = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !nativeAssign || fails$1(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors$1 && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
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
    /* global Symbol -- required for testing */
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$1(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable$1.f;
    while (argumentsLength > index) {
      var S = indexedObject$1(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
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

  var assign$2 = path$1.Object.assign;

  var assign$1 = assign$2;

  var assign = assign$1;

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
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
    start: createMethod$2(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$2(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$2(3)
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

  var trim$2 = entryVirtual('String').trim;

  var StringPrototype = String.prototype;

  var trim_1 = function (it) {
    var own = it.trim;
    return typeof it === 'string' || it === StringPrototype
      || (it instanceof String && own === StringPrototype.trim) ? trim$2 : own;
  };

  var trim$1 = trim_1;

  var trim = trim$1;

  var slice$1 = slice_1;

  var slice = slice$1;

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
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('sort');

  var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1;

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  _export$1({ target: 'Array', proto: true, forced: FORCED }, {
    sort: function sort(comparefn) {
      return comparefn === undefined
        ? nativeSort.call(toObject$1(this))
        : nativeSort.call(toObject$1(this), aFunction$3(comparefn));
    }
  });

  var sort$2 = entryVirtual('Array').sort;

  var ArrayPrototype$5 = Array.prototype;

  var sort_1 = function (it) {
    var own = it.sort;
    return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.sort) ? sort$2 : own;
  };

  var sort$1 = sort_1;

  var sort = sort$1;

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

  var find$2 = entryVirtual('Array').find;

  var ArrayPrototype$4 = Array.prototype;

  var find_1 = function (it) {
    var own = it.find;
    return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.find) ? find$2 : own;
  };

  var find$1 = find_1;

  var find = find$1;

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

  var ArrayPrototype$3 = Array.prototype;

  var map_1 = function (it) {
    var own = it.map;
    return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.map) ? map$2 : own;
  };

  var map$1 = map_1;

  var map = map$1;

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

  var findIndex$2 = entryVirtual('Array').findIndex;

  var ArrayPrototype$2 = Array.prototype;

  var findIndex_1 = function (it) {
    var own = it.findIndex;
    return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.findIndex) ? findIndex$2 : own;
  };

  var findIndex$1 = findIndex_1;

  var findIndex = findIndex$1;

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

  var filter$2 = entryVirtual('Array').filter;

  var ArrayPrototype$1 = Array.prototype;

  var filter_1 = function (it) {
    var own = it.filter;
    return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.filter) ? filter$2 : own;
  };

  var filter$1 = filter_1;

  var filter = filter$1;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$1 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$3(callbackfn);
      var O = toObject$1(that);
      var self = indexedObject$1(O);
      var length = toLength(O.length);
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
    left: createMethod$1(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$1(true)
  };

  var $reduce = arrayReduce.left;




  var STRICT_METHOD = arrayMethodIsStrict$1('reduce');
  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  _export$1({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
    reduce: function reduce(callbackfn /* , initialValue */) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var reduce$2 = entryVirtual('Array').reduce;

  var ArrayPrototype = Array.prototype;

  var reduce_1 = function (it) {
    var own = it.reduce;
    return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.reduce) ? reduce$2 : own;
  };

  var reduce$1 = reduce_1;

  var reduce = reduce$1;

  var propertyIsEnumerable = objectPropertyIsEnumerable$1.f;

  // `Object.{ entries, values }` methods implementation
  var createMethod = function (TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject$1(it);
      var keys = objectKeys(O);
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
    entries: createMethod(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod(false)
  };

  var $entries = objectToArray.entries;

  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  _export$1({ target: 'Object', stat: true }, {
    entries: function entries(O) {
      return $entries(O);
    }
  });

  var entries$2 = path$1.Object.entries;

  var entries$1 = entries$2;

  var entries = entries$1;

  /*! Hammer.JS - v2.0.7 - 2016-04-22
   * http://hammerjs.github.io/
   *
   * Copyright (c) 2016 Jorik Tangelder;
   * Licensed under the MIT license */

  function ownKeys(object, enumerableOnly) { var keys$1 = keys(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor(object, sym).enumerable; }); keys$1.push.apply(keys$1, symbols); } return keys$1; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context20; forEach(_context20 = ownKeys(Object(source), true)).call(_context20, function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { defineProperties(target, getOwnPropertyDescriptors(source)); } else { var _context21; forEach(_context21 = ownKeys(Object(source))).call(_context21, function (key) { defineProperty$1(target, key, getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
    if (isArray(arg)) {
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
    return indexOf$1(str).call(str, find) > -1;
  }
  /**
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */


  function splitStr(str) {
    return trim(str).call(str).split(/\s+/g);
  }
  /**
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */


  var toArray = function toArray(obj) {
    return slice(Array.prototype).call(obj, 0);
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
      if (indexOf$1(values).call(values, val) < 0) results.push(item);
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
    var camelProp = property[0].toUpperCase() + slice(property).call(property, 1);

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

    var handler = bind(_context4 = this.handler).call(_context4, this);

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
        var i = indexOf$1(lts).call(lts, lastTouch);

        if (i > -1) {
          splice(lts).call(lts, i, 1);
        }
      };

      setTimeout(removeLastTouch, DEDUP_TIMEOUT);
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

      this.actions = trim(_context6 = value.toLowerCase()).call(_context6);
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

      if (indexOf$1(requireFail).call(requireFail, otherRecognizer) === -1) {
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

      var index = indexOf$1(_context8 = this.requireFail).call(_context8, otherRecognizer);

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

        var index = indexOf$1(_context12 = this.recognizers).call(_context12, recognizer);

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

          splice(_context16 = handlers[event]).call(_context16, indexOf$1(_context17 = handlers[event]).call(_context17, handler), 1);
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

      var handlers = this.handlers[event] && slice(_context18 = this.handlers[event]).call(_context18); // no handlers, so skip it all


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

          return splice(_context = this._events[event]).call(_context, indexOf$1(_context2 = this._events[event]).call(_context2, fn), 1);
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
        this.hammer.on('panstart', bind(_context3 = this.onPanStart).call(_context3, this));
        this.hammer.on('panmove', bind(_context4 = this.onPanMove).call(_context4, this));
        this.hammer.on('panend', bind(_context5 = this.onPanEnd).call(_context5, this));
        this.hammer.on('pancancel', bind(_context6 = this.onPanEnd).call(_context6, this));
        this.hammer.on('singletap', bind(_context7 = this.onSingletap).call(_context7, this));
        this.hammer.on('pinchstart', bind(_context8 = this.onPinchStart).call(_context8, this));
        this.hammer.on('pinchmove', bind(_context9 = this.onPinchMove).call(_context9, this));
        this.hammer.on('pinchend', bind(_context10 = this.onPinchEnd).call(_context10, this));
        this.hammer.on('pinchcancel', bind(_context11 = this.onPinchEnd).call(_context11, this));
        this.hammer.on('press', bind(_context12 = this.onPress).call(_context12, this));
        this.scrollerEl.addEventListener('contextmenu', bind(_context13 = this.onContextmenu).call(_context13, this), false);
        this.scrollerEl.addEventListener('wheel', bind(_context14 = this.onWheel).call(_context14, this), false);
        var pageId = (_this$getPageSpreadPo = this.getPageSpreadPositionFromPageId(this.options.pageId)) !== null && _this$getPageSpreadPo !== void 0 ? _this$getPageSpreadPo : 0;
        this.hammer.set({
          enable: true
        });
        this.started = true;
        this.destroyed = false;
        this.navigateTo(pageId, {
          duration: 0
        });
        this.resizeListener = bind(_context15 = this.onResize).call(_context15, this);
        this.touchStartListener = bind(_context16 = this.onTouchStart).call(_context16, this);
        this.touchEndListener = bind(_context17 = this.onTouchEnd).call(_context17, this);
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

        this.scrollerEl.removeEventListener('contextmenu', bind(_context18 = this.onContextmenu).call(_context18, this));
        this.scrollerEl.removeEventListener('wheel', bind(_context19 = this.onWheel).call(_context19, this));
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

          if (indexOf$1(_context24 = pageSpread.options.pageIds).call(_context24, pageId) > -1) {
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
          this.tap.timeout = setTimeout(function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc28uanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZmFpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3BhdGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZmxhZ3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcmVnZXhwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtZnVuY3Rpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuc3BsaXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3doaXRlc3BhY2VzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy10cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5udW1iZXIuY29uc3RydWN0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy91aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuc3BsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW50cnktdmlydHVhbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9zcGxpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL3NwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL3NwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2luZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2h0bWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2Zvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvYXJyYXkvdmlydHVhbC9mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmZ1bmN0aW9uLmJpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2Z1bmN0aW9uL3ZpcnR1YWwvYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9iaW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvci1jbG9zZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWZyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuZnJvbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvZnJvbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9hcnJheS9mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL3dlYi50aW1lcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9zZXQtdGltZW91dC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL3NldC10aW1lb3V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2NvbmNhdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbGliL3ZlcnNvLWJyb3dzZXIvYW5pbWF0aW9uLmpzIiwiLi4vLi4vbGliL3ZlcnNvLWJyb3dzZXIvcGFnZV9zcHJlYWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2tleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9vYmplY3Qva2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vd24ta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9hcnJheS9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvYXJyYXkvaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLmhhcy1pbnN0YW5jZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaXMtY29uY2F0LXNwcmVhZGFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5tYXRjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wubWF0Y2gtYWxsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5yZXBsYWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5zZWFyY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnNwZWNpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnNwbGl0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC50by1wcmltaXRpdmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnRvLXN0cmluZy10YWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnVuc2NvcGFibGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmpzb24udG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvc3ltYm9sL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuYXN5bmMtZGlzcG9zZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLmRpc3Bvc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wucGF0dGVybi1tYXRjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLnJlcGxhY2UtYWxsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9zeW1ib2wvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL3N5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWl0ZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9pcy1pdGVyYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nZXQtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2dldC1pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9pbnN0YW5jZS9zbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvaW5zdGFuY2Uvc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5qb2luLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmRhdGUubm93LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9kYXRlL25vdy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2RhdGUvbm93LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvZGF0ZS9ub3cuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2FycmF5L2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvb2JqZWN0L2NyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmFzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2Fzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9vYmplY3QvYXNzaWduLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy10cmltLWZvcmNlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zdHJpbmcudHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvc3RyaW5nL3ZpcnR1YWwvdHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvdHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3RyaW0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS90cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2Uvc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9zbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5zb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL3NvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL3NvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2Uvc29ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5maW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2ZpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL2ZpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9maW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvZmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuZmluZC1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9maW5kLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9maW5kLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZmluZC1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2ZpbmQtaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktcmVkdWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LnJlZHVjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9yZWR1Y2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL3JlZHVjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3JlZHVjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL3JlZHVjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC10by1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZW50cmllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2VudHJpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZW50cmllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL29iamVjdC9lbnRyaWVzLmpzIiwiLi4vLi4vbGliL3ZlcnNvLWJyb3dzZXIvdmVuZG9yL2hhbW1lci5qcyIsIi4uLy4uL2xpYi92ZXJzby1icm93c2VyL3ZlcnNvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvKiBnbG9iYWwgZ2xvYmFsVGhpcyAtLSBzYWZlICovXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQpO1xuICAgIH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcblxudmFyIHdyYXBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChOYXRpdmVDb25zdHJ1Y3Rvcikge1xuICB2YXIgV3JhcHBlciA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOYXRpdmVDb25zdHJ1Y3Rvcikge1xuICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcigpO1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiKTtcbiAgICAgIH0gcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiLCBjKTtcbiAgICB9IHJldHVybiBOYXRpdmVDb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuICBXcmFwcGVyLnByb3RvdHlwZSA9IE5hdGl2ZUNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgcmV0dXJuIFdyYXBwZXI7XG59O1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIFBST1RPID0gb3B0aW9ucy5wcm90bztcblxuICB2YXIgbmF0aXZlU291cmNlID0gR0xPQkFMID8gZ2xvYmFsIDogU1RBVElDID8gZ2xvYmFsW1RBUkdFVF0gOiAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcblxuICB2YXIgdGFyZ2V0ID0gR0xPQkFMID8gcGF0aCA6IHBhdGhbVEFSR0VUXSB8fCAocGF0aFtUQVJHRVRdID0ge30pO1xuICB2YXIgdGFyZ2V0UHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcblxuICB2YXIgRk9SQ0VELCBVU0VfTkFUSVZFLCBWSVJUVUFMX1BST1RPVFlQRTtcbiAgdmFyIGtleSwgc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5LCBuYXRpdmVQcm9wZXJ0eSwgcmVzdWx0UHJvcGVydHksIGRlc2NyaXB0b3I7XG5cbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBVU0VfTkFUSVZFID0gIUZPUkNFRCAmJiBuYXRpdmVTb3VyY2UgJiYgaGFzKG5hdGl2ZVNvdXJjZSwga2V5KTtcblxuICAgIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG5cbiAgICBpZiAoVVNFX05BVElWRSkgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmF0aXZlU291cmNlLCBrZXkpO1xuICAgICAgbmF0aXZlUHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIG5hdGl2ZVByb3BlcnR5ID0gbmF0aXZlU291cmNlW2tleV07XG5cbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIGltcGxlbWVudGF0aW9uXG4gICAgc291cmNlUHJvcGVydHkgPSAoVVNFX05BVElWRSAmJiBuYXRpdmVQcm9wZXJ0eSkgPyBuYXRpdmVQcm9wZXJ0eSA6IHNvdXJjZVtrZXldO1xuXG4gICAgaWYgKFVTRV9OQVRJVkUgJiYgdHlwZW9mIHRhcmdldFByb3BlcnR5ID09PSB0eXBlb2Ygc291cmNlUHJvcGVydHkpIGNvbnRpbnVlO1xuXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBpZiAob3B0aW9ucy5iaW5kICYmIFVTRV9OQVRJVkUpIHJlc3VsdFByb3BlcnR5ID0gYmluZChzb3VyY2VQcm9wZXJ0eSwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdzIGluIHRoaXMgdmVyc2lvblxuICAgIGVsc2UgaWYgKG9wdGlvbnMud3JhcCAmJiBVU0VfTkFUSVZFKSByZXN1bHRQcm9wZXJ0eSA9IHdyYXBDb25zdHJ1Y3Rvcihzb3VyY2VQcm9wZXJ0eSk7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgZWxzZSBpZiAoUFJPVE8gJiYgdHlwZW9mIHNvdXJjZVByb3BlcnR5ID09ICdmdW5jdGlvbicpIHJlc3VsdFByb3BlcnR5ID0gYmluZChGdW5jdGlvbi5jYWxsLCBzb3VyY2VQcm9wZXJ0eSk7XG4gICAgLy8gZGVmYXVsdCBjYXNlXG4gICAgZWxzZSByZXN1bHRQcm9wZXJ0eSA9IHNvdXJjZVByb3BlcnR5O1xuXG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHNvdXJjZVByb3BlcnR5ICYmIHNvdXJjZVByb3BlcnR5LnNoYW0pIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHJlc3VsdFByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cblxuICAgIHRhcmdldFtrZXldID0gcmVzdWx0UHJvcGVydHk7XG5cbiAgICBpZiAoUFJPVE8pIHtcbiAgICAgIFZJUlRVQUxfUFJPVE9UWVBFID0gVEFSR0VUICsgJ1Byb3RvdHlwZSc7XG4gICAgICBpZiAoIWhhcyhwYXRoLCBWSVJUVUFMX1BST1RPVFlQRSkpIHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHBhdGgsIFZJUlRVQUxfUFJPVE9UWVBFLCB7fSk7XG4gICAgICB9XG4gICAgICAvLyBleHBvcnQgdmlydHVhbCBwcm90b3R5cGUgbWV0aG9kc1xuICAgICAgcGF0aFtWSVJUVUFMX1BST1RPVFlQRV1ba2V5XSA9IHNvdXJjZVByb3BlcnR5O1xuICAgICAgLy8gZXhwb3J0IHJlYWwgcHJvdG90eXBlIG1ldGhvZHNcbiAgICAgIGlmIChvcHRpb25zLnJlYWwgJiYgdGFyZ2V0UHJvdG90eXBlICYmICF0YXJnZXRQcm90b3R5cGVba2V5XSkge1xuICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodGFyZ2V0UHJvdG90eXBlLCBrZXksIHNvdXJjZVByb3BlcnR5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIG9iamVjdERlZmluZVByb3BlcnR5TW9kaWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIURFU0NSSVBUT1JTLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBkZWZpbmVQcm9wZXJ0eTogb2JqZWN0RGVmaW5lUHJvcGVydHlNb2RpbGUuZlxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxudmFyIE9iamVjdCA9IHBhdGguT2JqZWN0O1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cbmlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkuc2hhbSkgZGVmaW5lUHJvcGVydHkuc2hhbSA9IHRydWU7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpOyIsImltcG9ydCBfT2JqZWN0JGRlZmluZVByb3BlcnR5IGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblxuICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvKiBnbG9iYWwgZ2xvYmFsVGhpcyAtLSBzYWZlICovXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjkuMScsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgdmFyIHN0YXRlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICB9XG4gICAgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gICAgaWYgKCFzdGF0ZS5zb3VyY2UpIHtcbiAgICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGtleSA6ICcnKTtcbiAgICB9XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL2ZhaWxzJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSB0cmFuc3BpbGVzIFJlZ0V4cCgnYScsICd5JykgLT4gL2EveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yLFxuLy8gc28gd2UgdXNlIGFuIGludGVybWVkaWF0ZSBmdW5jdGlvbi5cbmZ1bmN0aW9uIFJFKHMsIGYpIHtcbiAgcmV0dXJuIFJlZ0V4cChzLCBmKTtcbn1cblxuZXhwb3J0cy5VTlNVUFBPUlRFRF9ZID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxuICB2YXIgcmUgPSBSRSgnYScsICd5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdhYmNkJykgIT0gbnVsbDtcbn0pO1xuXG5leHBvcnRzLkJST0tFTl9DQVJFVCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzczNjg3XG4gIHZhciByZSA9IFJFKCdecicsICdneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnc3RyJykgIT0gbnVsbDtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZ2V4cEZsYWdzID0gcmVxdWlyZSgnLi9yZWdleHAtZmxhZ3MnKTtcbnZhciBzdGlja3lIZWxwZXJzID0gcmVxdWlyZSgnLi9yZWdleHAtc3RpY2t5LWhlbHBlcnMnKTtcblxudmFyIG5hdGl2ZUV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG4vLyBUaGlzIGFsd2F5cyByZWZlcnMgdG8gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgYmVjYXVzZSB0aGVcbi8vIFN0cmluZyNyZXBsYWNlIHBvbHlmaWxsIHVzZXMgLi9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzLFxuLy8gd2hpY2ggbG9hZHMgdGhpcyBmaWxlIGJlZm9yZSBwYXRjaGluZyB0aGUgbWV0aG9kLlxudmFyIG5hdGl2ZVJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG5cbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvO1xuICB2YXIgcmUyID0gL2IqL2c7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTEsICdhJyk7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTIsICdhJyk7XG4gIHJldHVybiByZTEubGFzdEluZGV4ICE9PSAwIHx8IHJlMi5sYXN0SW5kZXggIT09IDA7XG59KSgpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWSB8fCBzdGlja3lIZWxwZXJzLkJST0tFTl9DQVJFVDtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1hc3NlcnRpb24tY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEIHx8IFVOU1VQUE9SVEVEX1k7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4LCByZUNvcHksIG1hdGNoLCBpO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSByZWdleHBGbGFncy5jYWxsKHJlKTtcbiAgICB2YXIgc291cmNlID0gcmUuc291cmNlO1xuICAgIHZhciBjaGFyc0FkZGVkID0gMDtcbiAgICB2YXIgc3RyQ29weSA9IHN0cjtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgneScsICcnKTtcbiAgICAgIGlmIChmbGFncy5pbmRleE9mKCdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IFN0cmluZyhzdHIpLnNsaWNlKHJlLmxhc3RJbmRleCk7XG4gICAgICAvLyBTdXBwb3J0IGFuY2hvcmVkIHN0aWNreSBiZWhhdmlvci5cbiAgICAgIGlmIChyZS5sYXN0SW5kZXggPiAwICYmICghcmUubXVsdGlsaW5lIHx8IHJlLm11bHRpbGluZSAmJiBzdHJbcmUubGFzdEluZGV4IC0gMV0gIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBtYXRjaC5pbnB1dC5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5leGVjYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS5leGVjXG4kKHsgdGFyZ2V0OiAnUmVnRXhwJywgcHJvdG86IHRydWUsIGZvcmNlZDogLy4vLmV4ZWMgIT09IGV4ZWMgfSwge1xuICBleGVjOiBleGVjXG59KTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzb2YoZ2xvYmFsLnByb2Nlc3MpID09ICdwcm9jZXNzJztcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgdmVyc2lvbiA9IG1hdGNoWzBdICsgbWF0Y2hbMV07XG59IGVsc2UgaWYgKHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbiAmJiArdmVyc2lvbjtcbiIsInZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbiAgcmV0dXJuICFTeW1ib2wuc2hhbSAmJlxuICAgIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAoSVNfTk9ERSA/IFY4X1ZFUlNJT04gPT09IDM4IDogVjhfVkVSU0lPTiA+IDM3ICYmIFY4X1ZFUlNJT04gPCA0MSk7XG59KTtcbiIsInZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gIC8qIGdsb2JhbCBTeW1ib2wgLS0gc2FmZSAqL1xuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSB8fCAhKE5BVElWRV9TWU1CT0wgfHwgdHlwZW9mIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9PSAnc3RyaW5nJykpIHtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXMoU3ltYm9sLCBuYW1lKSkge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gICAgfVxuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBtb3ZlZCB0byBlbnRyeSBwb2ludHNcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxudmFyIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gI3JlcGxhY2UgbmVlZHMgYnVpbHQtaW4gc3VwcG9ydCBmb3IgbmFtZWQgZ3JvdXBzLlxuICAvLyAjbWF0Y2ggd29ya3MgZmluZSBiZWNhdXNlIGl0IGp1c3QgcmV0dXJuIHRoZSBleGVjIHJlc3VsdHMsIGV2ZW4gaWYgaXQgaGFzXG4gIC8vIGEgXCJncm9wc1wiIHByb3BlcnR5LlxuICB2YXIgcmUgPSAvLi87XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHJlc3VsdC5ncm91cHMgPSB7IGE6ICc3JyB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHJldHVybiAnJy5yZXBsYWNlKHJlLCAnJDxhPicpICE9PSAnNyc7XG59KTtcblxuLy8gSUUgPD0gMTEgcmVwbGFjZXMgJDAgd2l0aCB0aGUgd2hvbGUgbWF0Y2gsIGFzIGlmIGl0IHdhcyAkJlxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjAyNDY2Ni9nZXR0aW5nLWllLXRvLXJlcGxhY2UtYS1yZWdleC13aXRoLXRoZS1saXRlcmFsLXN0cmluZy0wXG52YXIgUkVQTEFDRV9LRUVQU18kMCA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnYScucmVwbGFjZSgvLi8sICckMCcpID09PSAnJDAnO1xufSkoKTtcblxudmFyIFJFUExBQ0UgPSB3ZWxsS25vd25TeW1ib2woJ3JlcGxhY2UnKTtcbi8vIFNhZmFyaSA8PSAxMy4wLjMoPykgc3Vic3RpdHV0ZXMgbnRoIGNhcHR1cmUgd2hlcmUgbj5tIHdpdGggYW4gZW1wdHkgc3RyaW5nXG52YXIgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPSAoZnVuY3Rpb24gKCkge1xuICBpZiAoLy4vW1JFUExBQ0VdKSB7XG4gICAgcmV0dXJuIC8uL1tSRVBMQUNFXSgnYScsICckMCcpID09PSAnJztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG4vLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbi8vIFdlZXggSlMgaGFzIGZyb3plbiBidWlsdC1pbiBwcm90b3R5cGVzLCBzbyB1c2UgdHJ5IC8gY2F0Y2ggd3JhcHBlclxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjLCBzaGFtKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcblxuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFdlIGNhbid0IHVzZSByZWFsIHJlZ2V4IGhlcmUgc2luY2UgaXQgY2F1c2VzIGRlb3B0aW1pemF0aW9uXG4gICAgICAvLyBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbiBpbiBWOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMwNlxuICAgICAgcmUgPSB7fTtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICAgIHJlLmZsYWdzID0gJyc7XG4gICAgICByZVtTWU1CT0xdID0gLy4vW1NZTUJPTF07XG4gICAgfVxuXG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIShcbiAgICAgIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTICYmXG4gICAgICBSRVBMQUNFX0tFRVBTXyQwICYmXG4gICAgICAhUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICApKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgaWYgKHJlZ2V4cC5leGVjID09PSByZWdleHBFeGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0sIHtcbiAgICAgIFJFUExBQ0VfS0VFUFNfJDA6IFJFUExBQ0VfS0VFUFNfJDAsXG4gICAgICBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRTogUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICB9KTtcbiAgICB2YXIgc3RyaW5nTWV0aG9kID0gbWV0aG9kc1swXTtcbiAgICB2YXIgcmVnZXhNZXRob2QgPSBtZXRob2RzWzFdO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBzdHJpbmdNZXRob2QpO1xuICAgIHJlZGVmaW5lKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uIChzdHJpbmcsIGFyZykgeyByZXR1cm4gcmVnZXhNZXRob2QuY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbiAoc3RyaW5nKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG5cbiAgaWYgKHNoYW0pIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShSZWdFeHAucHJvdG90eXBlW1NZTUJPTF0sICdzaGFtJywgdHJ1ZSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc3JlZ2V4cFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY2xhc3NvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYFNwZWNpZXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNwZWNpZXNjb25zdHJ1Y3RvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgZGVmYXVsdENvbnN0cnVjdG9yKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IGRlZmF1bHRDb25zdHJ1Y3RvciA6IGFGdW5jdGlvbihTKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IGNvZGVQb2ludEF0LCBhdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HID8gUy5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyAyKSA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuY29kZXBvaW50YXRcbiAgY29kZUF0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5hdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbiAgY2hhckF0OiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gY2hhckF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vY2xhc3NvZi1yYXcnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwRXhlY2AgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCBleGVjIG1ldGhvZCByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKGNsYXNzb2YoUikgIT09ICdSZWdFeHAnKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cblxuICByZXR1cm4gcmVnZXhwRXhlYy5jYWxsKFIsIFMpO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY2FsbFJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIGFycmF5UHVzaCA9IFtdLnB1c2g7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgTUFYX1VJTlQzMiA9IDB4RkZGRkZGRkY7XG5cbi8vIGJhYmVsLW1pbmlmeSB0cmFuc3BpbGVzIFJlZ0V4cCgneCcsICd5JykgLT4gL3gveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgU1VQUE9SVFNfWSA9ICFmYWlscyhmdW5jdGlvbiAoKSB7IHJldHVybiAhUmVnRXhwKE1BWF9VSU5UMzIsICd5Jyk7IH0pO1xuXG4vLyBAQHNwbGl0IGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygnc3BsaXQnLCAyLCBmdW5jdGlvbiAoU1BMSVQsIG5hdGl2ZVNwbGl0LCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgdmFyIGludGVybmFsU3BsaXQ7XG4gIGlmIChcbiAgICAnYWJiYycuc3BsaXQoLyhiKSovKVsxXSA9PSAnYycgfHxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLWVtcHR5LWdyb3VwIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgJ3Rlc3QnLnNwbGl0KC8oPzopLywgLTEpLmxlbmd0aCAhPSA0IHx8XG4gICAgJ2FiJy5zcGxpdCgvKD86YWIpKi8pLmxlbmd0aCAhPSAyIHx8XG4gICAgJy4nLnNwbGl0KC8oLj8pKC4/KS8pLmxlbmd0aCAhPSA0IHx8XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1hc3NlcnRpb24tY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICAnLicuc3BsaXQoLygpKCkvKS5sZW5ndGggPiAxIHx8XG4gICAgJycuc3BsaXQoLy4/LykubGVuZ3RoXG4gICkge1xuICAgIC8vIGJhc2VkIG9uIGVzNS1zaGltIGltcGxlbWVudGF0aW9uLCBuZWVkIHRvIHJld29yayBpdFxuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW3N0cmluZ107XG4gICAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIG5hdGl2ZSBzcGxpdFxuICAgICAgaWYgKCFpc1JlZ0V4cChzZXBhcmF0b3IpKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTcGxpdC5jYWxsKHN0cmluZywgc2VwYXJhdG9yLCBsaW0pO1xuICAgICAgfVxuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgdmFyIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnN0aWNreSA/ICd5JyA6ICcnKTtcbiAgICAgIHZhciBsYXN0TGFzdEluZGV4ID0gMDtcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICB2YXIgc2VwYXJhdG9yQ29weSA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuICAgICAgdmFyIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgICB3aGlsZSAobWF0Y2ggPSByZWdleHBFeGVjLmNhbGwoc2VwYXJhdG9yQ29weSwgc3RyaW5nKSkge1xuICAgICAgICBsYXN0SW5kZXggPSBzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleDtcbiAgICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0cmluZy5sZW5ndGgpIGFycmF5UHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgaWYgKG91dHB1dC5sZW5ndGggPj0gbGltKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VwYXJhdG9yQ29weS5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSBzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgICBpZiAobGFzdExhc3RJbmRleCA9PT0gc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICBpZiAobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yQ29weS50ZXN0KCcnKSkgb3V0cHV0LnB1c2goJycpO1xuICAgICAgfSBlbHNlIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4KSk7XG4gICAgICByZXR1cm4gb3V0cHV0Lmxlbmd0aCA+IGxpbSA/IG91dHB1dC5zbGljZSgwLCBsaW0pIDogb3V0cHV0O1xuICAgIH07XG4gIC8vIENoYWtyYSwgVjhcbiAgfSBlbHNlIGlmICgnMCcuc3BsaXQodW5kZWZpbmVkLCAwKS5sZW5ndGgpIHtcbiAgICBpbnRlcm5hbFNwbGl0ID0gZnVuY3Rpb24gKHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHJldHVybiBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMCA/IFtdIDogbmF0aXZlU3BsaXQuY2FsbCh0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9O1xuICB9IGVsc2UgaW50ZXJuYWxTcGxpdCA9IG5hdGl2ZVNwbGl0O1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5zcGxpdFxuICAgIGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBzcGxpdHRlciA9IHNlcGFyYXRvciA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZXBhcmF0b3JbU1BMSVRdO1xuICAgICAgcmV0dXJuIHNwbGl0dGVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBzcGxpdHRlci5jYWxsKHNlcGFyYXRvciwgTywgbGltaXQpXG4gICAgICAgIDogaW50ZXJuYWxTcGxpdC5jYWxsKFN0cmluZyhPKSwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHNwbGl0XWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAc3BsaXRcbiAgICAvL1xuICAgIC8vIE5PVEU6IFRoaXMgY2Fubm90IGJlIHByb3Blcmx5IHBvbHlmaWxsZWQgaW4gZW5naW5lcyB0aGF0IGRvbid0IHN1cHBvcnRcbiAgICAvLyB0aGUgJ3knIGZsYWcuXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCwgbGltaXQpIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoaW50ZXJuYWxTcGxpdCwgcmVnZXhwLCB0aGlzLCBsaW1pdCwgaW50ZXJuYWxTcGxpdCAhPT0gbmF0aXZlU3BsaXQpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG4gICAgICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3RvcihyeCwgUmVnRXhwKTtcblxuICAgICAgdmFyIHVuaWNvZGVNYXRjaGluZyA9IHJ4LnVuaWNvZGU7XG4gICAgICB2YXIgZmxhZ3MgPSAocnguaWdub3JlQ2FzZSA/ICdpJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyeC51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChTVVBQT1JUU19ZID8gJ3knIDogJ2cnKTtcblxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIFMgc2xpY2luZywgdG9cbiAgICAgIC8vIHNpbXVsYXRlIHRoZSAneScgZmxhZy5cbiAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBDKFNVUFBPUlRTX1kgPyByeCA6ICdeKD86JyArIHJ4LnNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoUy5sZW5ndGggPT09IDApIHJldHVybiBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgUykgPT09IG51bGwgPyBbU10gOiBbXTtcbiAgICAgIHZhciBwID0gMDtcbiAgICAgIHZhciBxID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB3aGlsZSAocSA8IFMubGVuZ3RoKSB7XG4gICAgICAgIHNwbGl0dGVyLmxhc3RJbmRleCA9IFNVUFBPUlRTX1kgPyBxIDogMDtcbiAgICAgICAgdmFyIHogPSBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgU1VQUE9SVFNfWSA/IFMgOiBTLnNsaWNlKHEpKTtcbiAgICAgICAgdmFyIGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB6ID09PSBudWxsIHx8XG4gICAgICAgICAgKGUgPSBtaW4odG9MZW5ndGgoc3BsaXR0ZXIubGFzdEluZGV4ICsgKFNVUFBPUlRTX1kgPyAwIDogcSkpLCBTLmxlbmd0aCkpID09PSBwXG4gICAgICAgICkge1xuICAgICAgICAgIHEgPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgcSwgdW5pY29kZU1hdGNoaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBLnB1c2goUy5zbGljZShwLCBxKSk7XG4gICAgICAgICAgaWYgKEEubGVuZ3RoID09PSBsaW0pIHJldHVybiBBO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHoubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBBLnB1c2goeltpXSk7XG4gICAgICAgICAgICBpZiAoQS5sZW5ndGggPT09IGxpbSkgcmV0dXJuIEE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHEgPSBwID0gZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQS5wdXNoKFMuc2xpY2UocCkpO1xuICAgICAgcmV0dXJuIEE7XG4gICAgfVxuICBdO1xufSwgIVNVUFBPUlRTX1kpO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvIC0tIHNhZmUgKi9cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG5cbi8vIG1ha2VzIHN1YmNsYXNzaW5nIHdvcmsgY29ycmVjdCBmb3Igd3JhcHBlZCBidWlsdC1pbnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCR0aGlzLCBkdW1teSwgV3JhcHBlcikge1xuICB2YXIgTmV3VGFyZ2V0LCBOZXdUYXJnZXRQcm90b3R5cGU7XG4gIGlmIChcbiAgICAvLyBpdCBjYW4gd29yayBvbmx5IHdpdGggbmF0aXZlIGBzZXRQcm90b3R5cGVPZmBcbiAgICBzZXRQcm90b3R5cGVPZiAmJlxuICAgIC8vIHdlIGhhdmVuJ3QgY29tcGxldGVseSBjb3JyZWN0IHByZS1FUzYgd2F5IGZvciBnZXR0aW5nIGBuZXcudGFyZ2V0YCwgc28gdXNlIHRoaXNcbiAgICB0eXBlb2YgKE5ld1RhcmdldCA9IGR1bW15LmNvbnN0cnVjdG9yKSA9PSAnZnVuY3Rpb24nICYmXG4gICAgTmV3VGFyZ2V0ICE9PSBXcmFwcGVyICYmXG4gICAgaXNPYmplY3QoTmV3VGFyZ2V0UHJvdG90eXBlID0gTmV3VGFyZ2V0LnByb3RvdHlwZSkgJiZcbiAgICBOZXdUYXJnZXRQcm90b3R5cGUgIT09IFdyYXBwZXIucHJvdG90eXBlXG4gICkgc2V0UHJvdG90eXBlT2YoJHRoaXMsIE5ld1RhcmdldFByb3RvdHlwZSk7XG4gIHJldHVybiAkdGhpcztcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAtLSBvbGQgSUUgKi9cbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBkb2N1bWVudC5kb21haW4gJiYgbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IGFjdGl2ZVhEb2N1bWVudCA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCIvLyBhIHN0cmluZyBvZiBhbGwgdmFsaWQgdW5pY29kZSB3aGl0ZXNwYWNlc1xubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDInICtcbiAgJ1xcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJztcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciB3aGl0ZXNwYWNlID0gJ1snICsgd2hpdGVzcGFjZXMgKyAnXSc7XG52YXIgbHRyaW0gPSBSZWdFeHAoJ14nICsgd2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKicpO1xudmFyIHJ0cmltID0gUmVnRXhwKHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyokJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbSwgdHJpbVN0YXJ0LCB0cmltRW5kLCB0cmltTGVmdCwgdHJpbVJpZ2h0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgaWYgKFRZUEUgJiAxKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShsdHJpbSwgJycpO1xuICAgIGlmIChUWVBFICYgMikgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbUxlZnQsIHRyaW1TdGFydCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltc3RhcnRcbiAgc3RhcnQ6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltUmlnaHQsIHRyaW1FbmQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbWVuZFxuICBlbmQ6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4gIHRyaW06IGNyZWF0ZU1ldGhvZCgzKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctdHJpbScpLnRyaW07XG5cbnZhciBOVU1CRVIgPSAnTnVtYmVyJztcbnZhciBOYXRpdmVOdW1iZXIgPSBnbG9iYWxbTlVNQkVSXTtcbnZhciBOdW1iZXJQcm90b3R5cGUgPSBOYXRpdmVOdW1iZXIucHJvdG90eXBlO1xuXG4vLyBPcGVyYSB+MTIgaGFzIGJyb2tlbiBPYmplY3QjdG9TdHJpbmdcbnZhciBCUk9LRU5fQ0xBU1NPRiA9IGNsYXNzb2YoY3JlYXRlKE51bWJlclByb3RvdHlwZSkpID09IE5VTUJFUjtcblxuLy8gYFRvTnVtYmVyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9udW1iZXJcbnZhciB0b051bWJlciA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgaXQgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgZmFsc2UpO1xuICB2YXIgZmlyc3QsIHRoaXJkLCByYWRpeCwgbWF4Q29kZSwgZGlnaXRzLCBsZW5ndGgsIGluZGV4LCBjb2RlO1xuICBpZiAodHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIGl0Lmxlbmd0aCA+IDIpIHtcbiAgICBpdCA9IHRyaW0oaXQpO1xuICAgIGZpcnN0ID0gaXQuY2hhckNvZGVBdCgwKTtcbiAgICBpZiAoZmlyc3QgPT09IDQzIHx8IGZpcnN0ID09PSA0NSkge1xuICAgICAgdGhpcmQgPSBpdC5jaGFyQ29kZUF0KDIpO1xuICAgICAgaWYgKHRoaXJkID09PSA4OCB8fCB0aGlyZCA9PT0gMTIwKSByZXR1cm4gTmFOOyAvLyBOdW1iZXIoJysweDEnKSBzaG91bGQgYmUgTmFOLCBvbGQgVjggZml4XG4gICAgfSBlbHNlIGlmIChmaXJzdCA9PT0gNDgpIHtcbiAgICAgIHN3aXRjaCAoaXQuY2hhckNvZGVBdCgxKSkge1xuICAgICAgICBjYXNlIDY2OiBjYXNlIDk4OiByYWRpeCA9IDI7IG1heENvZGUgPSA0OTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgb2YgL14wYlswMV0rJC9pXG4gICAgICAgIGNhc2UgNzk6IGNhc2UgMTExOiByYWRpeCA9IDg7IG1heENvZGUgPSA1NTsgYnJlYWs7IC8vIGZhc3QgZXF1YWwgb2YgL14wb1swLTddKyQvaVxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gK2l0O1xuICAgICAgfVxuICAgICAgZGlnaXRzID0gaXQuc2xpY2UoMik7XG4gICAgICBsZW5ndGggPSBkaWdpdHMubGVuZ3RoO1xuICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvZGUgPSBkaWdpdHMuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgIC8vIHBhcnNlSW50IHBhcnNlcyBhIHN0cmluZyB0byBhIGZpcnN0IHVuYXZhaWxhYmxlIHN5bWJvbFxuICAgICAgICAvLyBidXQgVG9OdW1iZXIgc2hvdWxkIHJldHVybiBOYU4gaWYgYSBzdHJpbmcgY29udGFpbnMgdW5hdmFpbGFibGUgc3ltYm9sc1xuICAgICAgICBpZiAoY29kZSA8IDQ4IHx8IGNvZGUgPiBtYXhDb2RlKSByZXR1cm4gTmFOO1xuICAgICAgfSByZXR1cm4gcGFyc2VJbnQoZGlnaXRzLCByYWRpeCk7XG4gICAgfVxuICB9IHJldHVybiAraXQ7XG59O1xuXG4vLyBgTnVtYmVyYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1udW1iZXItY29uc3RydWN0b3JcbmlmIChpc0ZvcmNlZChOVU1CRVIsICFOYXRpdmVOdW1iZXIoJyAwbzEnKSB8fCAhTmF0aXZlTnVtYmVyKCcwYjEnKSB8fCBOYXRpdmVOdW1iZXIoJysweDEnKSkpIHtcbiAgdmFyIE51bWJlcldyYXBwZXIgPSBmdW5jdGlvbiBOdW1iZXIodmFsdWUpIHtcbiAgICB2YXIgaXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMSA/IDAgOiB2YWx1ZTtcbiAgICB2YXIgZHVtbXkgPSB0aGlzO1xuICAgIHJldHVybiBkdW1teSBpbnN0YW5jZW9mIE51bWJlcldyYXBwZXJcbiAgICAgIC8vIGNoZWNrIG9uIDEuLmNvbnN0cnVjdG9yKGZvbykgY2FzZVxuICAgICAgJiYgKEJST0tFTl9DTEFTU09GID8gZmFpbHMoZnVuY3Rpb24gKCkgeyBOdW1iZXJQcm90b3R5cGUudmFsdWVPZi5jYWxsKGR1bW15KTsgfSkgOiBjbGFzc29mKGR1bW15KSAhPSBOVU1CRVIpXG4gICAgICAgID8gaW5oZXJpdElmUmVxdWlyZWQobmV3IE5hdGl2ZU51bWJlcih0b051bWJlcihpdCkpLCBkdW1teSwgTnVtYmVyV3JhcHBlcikgOiB0b051bWJlcihpdCk7XG4gIH07XG4gIGZvciAodmFyIGtleXMgPSBERVNDUklQVE9SUyA/IGdldE93blByb3BlcnR5TmFtZXMoTmF0aXZlTnVtYmVyKSA6IChcbiAgICAvLyBFUzM6XG4gICAgJ01BWF9WQUxVRSxNSU5fVkFMVUUsTmFOLE5FR0FUSVZFX0lORklOSVRZLFBPU0lUSVZFX0lORklOSVRZLCcgK1xuICAgIC8vIEVTMjAxNSAoaW4gY2FzZSwgaWYgbW9kdWxlcyB3aXRoIEVTMjAxNSBOdW1iZXIgc3RhdGljcyByZXF1aXJlZCBiZWZvcmUpOlxuICAgICdFUFNJTE9OLGlzRmluaXRlLGlzSW50ZWdlcixpc05hTixpc1NhZmVJbnRlZ2VyLE1BWF9TQUZFX0lOVEVHRVIsJyArXG4gICAgJ01JTl9TQUZFX0lOVEVHRVIscGFyc2VGbG9hdCxwYXJzZUludCxpc0ludGVnZXIsJyArXG4gICAgLy8gRVNOZXh0XG4gICAgJ2Zyb21TdHJpbmcscmFuZ2UnXG4gICkuc3BsaXQoJywnKSwgaiA9IDAsIGtleTsga2V5cy5sZW5ndGggPiBqOyBqKyspIHtcbiAgICBpZiAoaGFzKE5hdGl2ZU51bWJlciwga2V5ID0ga2V5c1tqXSkgJiYgIWhhcyhOdW1iZXJXcmFwcGVyLCBrZXkpKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eShOdW1iZXJXcmFwcGVyLCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihOYXRpdmVOdW1iZXIsIGtleSkpO1xuICAgIH1cbiAgfVxuICBOdW1iZXJXcmFwcGVyLnByb3RvdHlwZSA9IE51bWJlclByb3RvdHlwZTtcbiAgTnVtYmVyUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTnVtYmVyV3JhcHBlcjtcbiAgcmVkZWZpbmUoZ2xvYmFsLCBOVU1CRVIsIE51bWJlcldyYXBwZXIpO1xufVxuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG4vLyBgSXNBcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY2xhc3NvZihhcmcpID09ICdBcnJheSc7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjkuMScsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgdmVyc2lvbiA9IG1hdGNoWzBdICsgbWF0Y2hbMV07XG59IGVsc2UgaWYgKHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbiAmJiArdmVyc2lvbjtcbiIsInZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbiAgcmV0dXJuICFTeW1ib2wuc2hhbSAmJlxuICAgIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAoSVNfTk9ERSA/IFY4X1ZFUlNJT04gPT09IDM4IDogVjhfVkVSU0lPTiA+IDM3ICYmIFY4X1ZFUlNJT04gPCA0MSk7XG59KTtcbiIsInZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gIC8qIGdsb2JhbCBTeW1ib2wgLS0gc2FmZSAqL1xuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSB8fCAhKE5BVElWRV9TWU1CT0wgfHwgdHlwZW9mIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9PSAnc3RyaW5nJykpIHtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXMoU3ltYm9sLCBuYW1lKSkge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gICAgfVxuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdzcGxpY2UnKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9MRU5HVEhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGxlbmd0aCBleGNlZWRlZCc7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuc3BsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNwbGljZVxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIH0sIHtcbiAgc3BsaWNlOiBmdW5jdGlvbiBzcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50IC8qICwgLi4uaXRlbXMgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGFjdHVhbFN0YXJ0ID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICAgIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBpbnNlcnRDb3VudCwgYWN0dWFsRGVsZXRlQ291bnQsIEEsIGssIGZyb20sIHRvO1xuICAgIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDApIHtcbiAgICAgIGluc2VydENvdW50ID0gYWN0dWFsRGVsZXRlQ291bnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAxKSB7XG4gICAgICBpbnNlcnRDb3VudCA9IDA7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IGxlbiAtIGFjdHVhbFN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRDb3VudCA9IGFyZ3VtZW50c0xlbmd0aCAtIDI7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IG1pbihtYXgodG9JbnRlZ2VyKGRlbGV0ZUNvdW50KSwgMCksIGxlbiAtIGFjdHVhbFN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGxlbiArIGluc2VydENvdW50IC0gYWN0dWFsRGVsZXRlQ291bnQgPiBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCk7XG4gICAgfVxuICAgIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgYWN0dWFsRGVsZXRlQ291bnQpO1xuICAgIGZvciAoayA9IDA7IGsgPCBhY3R1YWxEZWxldGVDb3VudDsgaysrKSB7XG4gICAgICBmcm9tID0gYWN0dWFsU3RhcnQgKyBrO1xuICAgICAgaWYgKGZyb20gaW4gTykgY3JlYXRlUHJvcGVydHkoQSwgaywgT1tmcm9tXSk7XG4gICAgfVxuICAgIEEubGVuZ3RoID0gYWN0dWFsRGVsZXRlQ291bnQ7XG4gICAgaWYgKGluc2VydENvdW50IDwgYWN0dWFsRGVsZXRlQ291bnQpIHtcbiAgICAgIGZvciAoayA9IGFjdHVhbFN0YXJ0OyBrIDwgbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsrKykge1xuICAgICAgICBmcm9tID0gayArIGFjdHVhbERlbGV0ZUNvdW50O1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudDtcbiAgICAgICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIH1cbiAgICAgIGZvciAoayA9IGxlbjsgayA+IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7IGstLSkgZGVsZXRlIE9bayAtIDFdO1xuICAgIH0gZWxzZSBpZiAoaW5zZXJ0Q291bnQgPiBhY3R1YWxEZWxldGVDb3VudCkge1xuICAgICAgZm9yIChrID0gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsgPiBhY3R1YWxTdGFydDsgay0tKSB7XG4gICAgICAgIGZyb20gPSBrICsgYWN0dWFsRGVsZXRlQ291bnQgLSAxO1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudCAtIDE7XG4gICAgICAgIGlmIChmcm9tIGluIE8pIE9bdG9dID0gT1tmcm9tXTtcbiAgICAgICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoayA9IDA7IGsgPCBpbnNlcnRDb3VudDsgaysrKSB7XG4gICAgICBPW2sgKyBhY3R1YWxTdGFydF0gPSBhcmd1bWVudHNbayArIDJdO1xuICAgIH1cbiAgICBPLmxlbmd0aCA9IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT05TVFJVQ1RPUikge1xuICByZXR1cm4gcGF0aFtDT05TVFJVQ1RPUiArICdQcm90b3R5cGUnXTtcbn07XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LnNwbGljZScpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLnNwbGljZTtcbiIsInZhciBzcGxpY2UgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL3NwbGljZScpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5zcGxpY2U7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5zcGxpY2UpID8gc3BsaWNlIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9zcGxpY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NwbGljZVwiKTsiLCJ2YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwsbm8tdGhyb3ctbGl0ZXJhbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG52YXIgTkVHQVRJVkVfWkVSTyA9ICEhbmF0aXZlSW5kZXhPZiAmJiAxIC8gWzFdLmluZGV4T2YoMSwgLTApIDwgMDtcbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnaW5kZXhPZicpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRCB9LCB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gTkVHQVRJVkVfWkVST1xuICAgICAgLy8gY29udmVydCAtMCB0byArMFxuICAgICAgPyBuYXRpdmVJbmRleE9mLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMFxuICAgICAgOiAkaW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZicpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmluZGV4T2Y7XG4iLCJ2YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvaW5kZXgtb2YnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuaW5kZXhPZjtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmluZGV4T2YpID8gaW5kZXhPZiA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2UvaW5kZXgtb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2luZGV4LW9mXCIpOyIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG52YXIgTkVXX0lURVJBVE9SX1BST1RPVFlQRSA9IEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXN0ID0ge307XG4gIC8vIEZGNDQtIGxlZ2FjeSBpdGVyYXRvcnMgY2FzZVxuICByZXR1cm4gSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdLmNhbGwodGVzdCkgIT09IHRlc3Q7XG59KTtcblxuaWYgKE5FV19JVEVSQVRPUl9QUk9UT1RZUEUpIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5pZiAoKCFJU19QVVJFIHx8IE5FV19JVEVSQVRPUl9QUk9UT1RZUEUpICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkge1xuICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzKGhpZGRlbktleXMsIGtleSkgJiYgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAtLSBvbGQgSUUgKi9cbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBkb2N1bWVudC5kb21haW4gJiYgbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IGFjdGl2ZVhEb2N1bWVudCA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyB7fS50b1N0cmluZyA6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG59O1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUQUcsIFNUQVRJQywgU0VUX01FVEhPRCkge1xuICBpZiAoaXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGU7XG4gICAgaWYgKCFoYXModGFyZ2V0LCBUT19TVFJJTkdfVEFHKSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBUT19TVFJJTkdfVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IFRBRyB9KTtcbiAgICB9XG4gICAgaWYgKFNFVF9NRVRIT0QgJiYgIVRPX1NUUklOR19UQUdfU1VQUE9SVCkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRhcmdldCwgJ3RvU3RyaW5nJywgdG9TdHJpbmcpO1xuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgJiYgaXQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyBTdHJpbmcoaXQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAtLSBzYWZlICovXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsInZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVudW1lcmFibGUpIHRhcmdldFtrZXldID0gdmFsdWU7XG4gIGVsc2UgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRhcmdldCwga2V5LCB2YWx1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSXRlcmF0b3JzQ29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpO1xuXG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBJdGVyYXRvcnNDb3JlLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBJdGVyYXRvcnNDb3JlLkJVR0dZX1NBRkFSSV9JVEVSQVRPUlM7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcbnZhciBFTlRSSUVTID0gJ2VudHJpZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhYmxlLCBOQU1FLCBJdGVyYXRvckNvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuXG4gIHZhciBnZXRJdGVyYXRpb25NZXRob2QgPSBmdW5jdGlvbiAoS0lORCkge1xuICAgIGlmIChLSU5EID09PSBERUZBVUxUICYmIGRlZmF1bHRJdGVyYXRvcikgcmV0dXJuIGRlZmF1bHRJdGVyYXRvcjtcbiAgICBpZiAoIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgS0lORCBpbiBJdGVyYWJsZVByb3RvdHlwZSkgcmV0dXJuIEl0ZXJhYmxlUHJvdG90eXBlW0tJTkRdO1xuICAgIHN3aXRjaCAoS0lORCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgRU5UUklFUzogcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzKTsgfTtcbiAgfTtcblxuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IGZhbHNlO1xuICB2YXIgSXRlcmFibGVQcm90b3R5cGUgPSBJdGVyYWJsZS5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVJdGVyYXRvciA9IEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXVxuICAgIHx8IEl0ZXJhYmxlUHJvdG90eXBlWydAQGl0ZXJhdG9yJ11cbiAgICB8fCBERUZBVUxUICYmIEl0ZXJhYmxlUHJvdG90eXBlW0RFRkFVTFRdO1xuICB2YXIgZGVmYXVsdEl0ZXJhdG9yID0gIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgbmF0aXZlSXRlcmF0b3IgfHwgZ2V0SXRlcmF0aW9uTWV0aG9kKERFRkFVTFQpO1xuICB2YXIgYW55TmF0aXZlSXRlcmF0b3IgPSBOQU1FID09ICdBcnJheScgPyBJdGVyYWJsZVByb3RvdHlwZS5lbnRyaWVzIHx8IG5hdGl2ZUl0ZXJhdG9yIDogbmF0aXZlSXRlcmF0b3I7XG4gIHZhciBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIG1ldGhvZHMsIEtFWTtcblxuICAvLyBmaXggbmF0aXZlXG4gIGlmIChhbnlOYXRpdmVJdGVyYXRvcikge1xuICAgIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGFueU5hdGl2ZUl0ZXJhdG9yLmNhbGwobmV3IEl0ZXJhYmxlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIGlmICghSVNfUFVSRSAmJiBnZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUpICE9PSBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICBzZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGQVVMVCA9PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICBkZWZhdWx0SXRlcmF0b3IgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuYXRpdmVJdGVyYXRvci5jYWxsKHRoaXMpOyB9O1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYWJsZVByb3RvdHlwZSwgSVRFUkFUT1IsIGRlZmF1bHRJdGVyYXRvcik7XG4gIH1cbiAgSXRlcmF0b3JzW05BTUVdID0gZGVmYXVsdEl0ZXJhdG9yO1xuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICByZWRlZmluZShJdGVyYWJsZVByb3RvdHlwZSwgS0VZLCBtZXRob2RzW0tFWV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSAkKHsgdGFyZ2V0OiBOQU1FLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB9LCBtZXRob2RzKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5lbnRyaWVzXG4vLyBgQXJyYXkucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAaXRlcmF0b3Jcbi8vIGBDcmVhdGVBcnJheUl0ZXJhdG9yYCBpbnRlcm5hbCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZXVubWFwcGVkYXJndW1lbnRzb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInJlcXVpcmUoJy4vZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlICYmIGNsYXNzb2YoQ29sbGVjdGlvblByb3RvdHlwZSkgIT09IFRPX1NUUklOR19UQUcpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgQ09MTEVDVElPTl9OQU1FKTtcbiAgfVxuICBJdGVyYXRvcnNbQ09MTEVDVElPTl9OQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cbiIsInZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcblxudmFyIHB1c2ggPSBbXS5wdXNoO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgZm9yRWFjaCwgbWFwLCBmaWx0ZXIsIHNvbWUsIGV2ZXJ5LCBmaW5kLCBmaW5kSW5kZXgsIGZpbHRlck91dCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgdmFyIElTX01BUCA9IFRZUEUgPT0gMTtcbiAgdmFyIElTX0ZJTFRFUiA9IFRZUEUgPT0gMjtcbiAgdmFyIElTX1NPTUUgPSBUWVBFID09IDM7XG4gIHZhciBJU19FVkVSWSA9IFRZUEUgPT0gNDtcbiAgdmFyIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDY7XG4gIHZhciBJU19GSUxURVJfT1VUID0gVFlQRSA9PSA3O1xuICB2YXIgTk9fSE9MRVMgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCwgc3BlY2lmaWNDcmVhdGUpIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgc2VsZiA9IEluZGV4ZWRPYmplY3QoTyk7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrZm4sIHRoYXQsIDMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgY3JlYXRlID0gc3BlY2lmaWNDcmVhdGUgfHwgYXJyYXlTcGVjaWVzQ3JlYXRlO1xuICAgIHZhciB0YXJnZXQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgfHwgSVNfRklMVEVSX09VVCA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbHVlLCByZXN1bHQ7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWx1ZSA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzdWx0ID0gYm91bmRGdW5jdGlvbih2YWx1ZSwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgdGFyZ2V0W2luZGV4XSA9IHJlc3VsdDsgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCkgc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWx1ZTsgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDQ6IHJldHVybiBmYWxzZTsgICAgICAgICAgICAgLy8gZXZlcnlcbiAgICAgICAgICBjYXNlIDc6IHB1c2guY2FsbCh0YXJnZXQsIHZhbHVlKTsgLy8gZmlsdGVyT3V0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHRhcmdldDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4gIGZvckVhY2g6IGNyZWF0ZU1ldGhvZCgwKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbiAgbWFwOiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4gIGZpbHRlcjogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb21lXG4gIHNvbWU6IGNyZWF0ZU1ldGhvZCgzKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5ldmVyeWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmV2ZXJ5XG4gIGV2ZXJ5OiBjcmVhdGVNZXRob2QoNCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiAgZmluZDogY3JlYXRlTWV0aG9kKDUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRJbmRleFxuICBmaW5kSW5kZXg6IGNyZWF0ZU1ldGhvZCg2KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJPdXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1hcnJheS1maWx0ZXJpbmdcbiAgZmlsdGVyT3V0OiBjcmVhdGVNZXRob2QoNylcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdmb3JFYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG5tb2R1bGUuZXhwb3J0cyA9ICFTVFJJQ1RfTUVUSE9EID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2gnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5mb3JFYWNoO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uLy4uL2VzL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2gnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9mb3ItZWFjaCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG52YXIgRE9NSXRlcmFibGVzID0ge1xuICBET01Ub2tlbkxpc3Q6IHRydWUsXG4gIE5vZGVMaXN0OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuZm9yRWFjaDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmZvckVhY2gpXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gICAgfHwgRE9NSXRlcmFibGVzLmhhc093blByb3BlcnR5KGNsYXNzb2YoaXQpKSA/IGZvckVhY2ggOiBvd247XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaFwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgZmFjdG9yaWVzID0ge307XG5cbnZhciBjb25zdHJ1Y3QgPSBmdW5jdGlvbiAoQywgYXJnc0xlbmd0aCwgYXJncykge1xuICBpZiAoIShhcmdzTGVuZ3RoIGluIGZhY3RvcmllcykpIHtcbiAgICBmb3IgKHZhciBsaXN0ID0gW10sIGkgPSAwOyBpIDwgYXJnc0xlbmd0aDsgaSsrKSBsaXN0W2ldID0gJ2FbJyArIGkgKyAnXSc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIHdlIGhhdmUgbm8gcHJvcGVyIGFsdGVybmF0aXZlcywgSUU4LSBvbmx5XG4gICAgZmFjdG9yaWVzW2FyZ3NMZW5ndGhdID0gRnVuY3Rpb24oJ0MsYScsICdyZXR1cm4gbmV3IEMoJyArIGxpc3Quam9pbignLCcpICsgJyknKTtcbiAgfSByZXR1cm4gZmFjdG9yaWVzW2FyZ3NMZW5ndGhdKEMsIGFyZ3MpO1xufTtcblxuLy8gYEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24uYmluZCB8fCBmdW5jdGlvbiBiaW5kKHRoYXQgLyogLCAuLi5hcmdzICovKSB7XG4gIHZhciBmbiA9IGFGdW5jdGlvbih0aGlzKTtcbiAgdmFyIHBhcnRBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB2YXIgYm91bmRGdW5jdGlvbiA9IGZ1bmN0aW9uIGJvdW5kKC8qIGFyZ3MuLi4gKi8pIHtcbiAgICB2YXIgYXJncyA9IHBhcnRBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgYm91bmRGdW5jdGlvbiA/IGNvbnN0cnVjdChmbiwgYXJncy5sZW5ndGgsIGFyZ3MpIDogZm4uYXBwbHkodGhhdCwgYXJncyk7XG4gIH07XG4gIGlmIChpc09iamVjdChmbi5wcm90b3R5cGUpKSBib3VuZEZ1bmN0aW9uLnByb3RvdHlwZSA9IGZuLnByb3RvdHlwZTtcbiAgcmV0dXJuIGJvdW5kRnVuY3Rpb247XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kJyk7XG5cbi8vIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG4kKHsgdGFyZ2V0OiAnRnVuY3Rpb24nLCBwcm90bzogdHJ1ZSB9LCB7XG4gIGJpbmQ6IGJpbmRcbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5mdW5jdGlvbi5iaW5kJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0Z1bmN0aW9uJykuYmluZDtcbiIsInZhciBiaW5kID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vdmlydHVhbC9iaW5kJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmJpbmQ7XG4gIHJldHVybiBpdCA9PT0gRnVuY3Rpb25Qcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgb3duID09PSBGdW5jdGlvblByb3RvdHlwZS5iaW5kKSA/IGJpbmQgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2JpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2JpbmRcIik7IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIFNUUklOR19JVEVSQVRPUiA9ICdTdHJpbmcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1RSSU5HX0lURVJBVE9SKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiBTdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gIHZhciByZXR1cm5NZXRob2QgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gIGlmIChyZXR1cm5NZXRob2QgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBhbk9iamVjdChyZXR1cm5NZXRob2QuY2FsbChpdGVyYXRvcikpLnZhbHVlO1xuICB9XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxuLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgRU5UUklFUykge1xuICB0cnkge1xuICAgIHJldHVybiBFTlRSSUVTID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG90eXBlW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGNhbGxXaXRoU2FmZUl0ZXJhdGlvbkNsb3NpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2FsbC13aXRoLXNhZmUtaXRlcmF0aW9uLWNsb3NpbmcnKTtcbnZhciBpc0FycmF5SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4vLyBgQXJyYXkuZnJvbWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LmZyb21cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyogLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCAqLykge1xuICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgdmFyIGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBtYXBmbiA9IGFyZ3VtZW50c0xlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gIHZhciBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZDtcbiAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gZ2V0SXRlcmF0b3JNZXRob2QoTyk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3IsIG5leHQsIHZhbHVlO1xuICBpZiAobWFwcGluZykgbWFwZm4gPSBiaW5kKG1hcGZuLCBhcmd1bWVudHNMZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgLy8gaWYgdGhlIHRhcmdldCBpcyBub3QgaXRlcmFibGUgb3IgaXQncyBhbiBhcnJheSB3aXRoIHRoZSBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIGEgc2ltcGxlIGNhc2VcbiAgaWYgKGl0ZXJhdG9yTWV0aG9kICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJhdG9yTWV0aG9kKSkpIHtcbiAgICBpdGVyYXRvciA9IGl0ZXJhdG9yTWV0aG9kLmNhbGwoTyk7XG4gICAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gICAgcmVzdWx0ID0gbmV3IEMoKTtcbiAgICBmb3IgKDshKHN0ZXAgPSBuZXh0LmNhbGwoaXRlcmF0b3IpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICB2YWx1ZSA9IG1hcHBpbmcgPyBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgcmVzdWx0ID0gbmV3IEMobGVuZ3RoKTtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgdmFsdWUgPSBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgaXRlcmF0b3JXaXRoUmV0dXJuID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6ICEhY2FsbGVkKysgfTtcbiAgICB9LFxuICAgICdyZXR1cm4nOiBmdW5jdGlvbiAoKSB7XG4gICAgICBTQUZFX0NMT1NJTkcgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgaXRlcmF0b3JXaXRoUmV0dXJuW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWwgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgQXJyYXkuZnJvbShpdGVyYXRvcldpdGhSZXR1cm4sIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIFNLSVBfQ0xPU0lORykge1xuICBpZiAoIVNLSVBfQ0xPU0lORyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBJVEVSQVRJT05fU1VQUE9SVCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICBvYmplY3RbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IGRvbmU6IElURVJBVElPTl9TVVBQT1JUID0gdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhlYyhvYmplY3QpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBJVEVSQVRJT05fU1VQUE9SVDtcbn07XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmcm9tID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZyb20nKTtcbnZhciBjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uJyk7XG5cbnZhciBJTkNPUlJFQ1RfSVRFUkFUSU9OID0gIWNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbihmdW5jdGlvbiAoaXRlcmFibGUpIHtcbiAgQXJyYXkuZnJvbShpdGVyYWJsZSk7XG59KTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5mcm9tXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElOQ09SUkVDVF9JVEVSQVRJT04gfSwge1xuICBmcm9tOiBmcm9tXG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZyb20nKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLkFycmF5LmZyb207XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvYXJyYXkvZnJvbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvYXJyYXkvZnJvbVwiKTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIE1TSUUgPSAvTVNJRSAuXFwuLy50ZXN0KHVzZXJBZ2VudCk7IC8vIDwtIGRpcnR5IGllOS0gY2hlY2tcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAoc2NoZWR1bGVyKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaGFuZGxlciwgdGltZW91dCAvKiAsIC4uLmFyZ3VtZW50cyAqLykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgICB2YXIgYXJncyA9IGJvdW5kQXJncyA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc2NoZWR1bGVyKGJvdW5kQXJncyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBzcGVjIHJlcXVpcmVtZW50XG4gICAgICAodHlwZW9mIGhhbmRsZXIgPT0gJ2Z1bmN0aW9uJyA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKSkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSA6IGhhbmRsZXIsIHRpbWVvdXQpO1xuICB9O1xufTtcblxuLy8gaWU5LSBzZXRUaW1lb3V0ICYgc2V0SW50ZXJ2YWwgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCN0aW1lcnNcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGZvcmNlZDogTVNJRSB9LCB7XG4gIC8vIGBzZXRUaW1lb3V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCNkb20tc2V0dGltZW91dFxuICBzZXRUaW1lb3V0OiB3cmFwKGdsb2JhbC5zZXRUaW1lb3V0KSxcbiAgLy8gYHNldEludGVydmFsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCNkb20tc2V0aW50ZXJ2YWxcbiAgc2V0SW50ZXJ2YWw6IHdyYXAoZ2xvYmFsLnNldEludGVydmFsKVxufSk7XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi50aW1lcnMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLnNldFRpbWVvdXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL3NldC10aW1lb3V0XCIpOyIsImltcG9ydCBfT2JqZWN0JGRlZmluZVByb3BlcnR5IGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG5cbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRSA9IHdlbGxLbm93blN5bWJvbCgnaXNDb25jYXRTcHJlYWRhYmxlJyk7XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEID0gJ01heGltdW0gYWxsb3dlZCBpbmRleCBleGNlZWRlZCc7XG5cbi8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzlcbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUID0gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgYXJyYXlbSVNfQ09OQ0FUX1NQUkVBREFCTEVdID0gZmFsc2U7XG4gIHJldHVybiBhcnJheS5jb25jYXQoKVswXSAhPT0gYXJyYXk7XG59KTtcblxudmFyIFNQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ2NvbmNhdCcpO1xuXG52YXIgaXNDb25jYXRTcHJlYWRhYmxlID0gZnVuY3Rpb24gKE8pIHtcbiAgaWYgKCFpc09iamVjdChPKSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgc3ByZWFkYWJsZSA9IE9bSVNfQ09OQ0FUX1NQUkVBREFCTEVdO1xuICByZXR1cm4gc3ByZWFkYWJsZSAhPT0gdW5kZWZpbmVkID8gISFzcHJlYWRhYmxlIDogaXNBcnJheShPKTtcbn07XG5cbnZhciBGT1JDRUQgPSAhSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCB8fCAhU1BFQ0lFU19TVVBQT1JUO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmNvbmNhdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5jb25jYXRcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBpc0NvbmNhdFNwcmVhZGFibGUgYW5kIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgY29uY2F0OiBmdW5jdGlvbiBjb25jYXQoYXJnKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCAwKTtcbiAgICB2YXIgbiA9IDA7XG4gICAgdmFyIGksIGssIGxlbmd0aCwgbGVuLCBFO1xuICAgIGZvciAoaSA9IC0xLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIEUgPSBpID09PSAtMSA/IE8gOiBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoaXNDb25jYXRTcHJlYWRhYmxlKEUpKSB7XG4gICAgICAgIGxlbiA9IHRvTGVuZ3RoKEUubGVuZ3RoKTtcbiAgICAgICAgaWYgKG4gKyBsZW4gPiBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IGxlbjsgaysrLCBuKyspIGlmIChrIGluIEUpIGNyZWF0ZVByb3BlcnR5KEEsIG4sIEVba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG4gPj0gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KEEsIG4rKywgRSk7XG4gICAgICB9XG4gICAgfVxuICAgIEEubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmNvbmNhdDtcbiIsInZhciBjb25jYXQgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2NvbmNhdCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5jb25jYXQ7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5jb25jYXQpID8gY29uY2F0IDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9jb25jYXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2NvbmNhdFwiKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb24ge1xuICAgIHJ1biA9IDA7XG4gICAgY29uc3RydWN0b3IoZWwpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgIH1cblxuICAgIGFuaW1hdGUob3B0aW9ucyA9IHt9LCBjYWxsYmFjayA9ICgpID0+IHt9KSB7XG4gICAgICAgIGNvbnN0IHggPSBvcHRpb25zLnggPz8gMDtcbiAgICAgICAgY29uc3QgeSA9IG9wdGlvbnMueSA/PyAwO1xuICAgICAgICBjb25zdCBzY2FsZSA9IG9wdGlvbnMuc2NhbGUgPz8gMTtcbiAgICAgICAgY29uc3QgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmcgPz8gJ2Vhc2Utb3V0JztcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uID8/IDA7XG4gICAgICAgIGNvbnN0IHJ1biA9ICsrdGhpcy5ydW47XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7eH0pIHRyYW5zbGF0ZVkoJHt5fSkgc2NhbGUoJHtzY2FsZX0pYDtcblxuICAgICAgICBpZiAodGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPT09IHRyYW5zZm9ybSkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSBlbHNlIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uRW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChydW4gIT09IHRoaXMucnVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0cmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdHJhbnNpdGlvbkVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zaXRpb24gPSBgdHJhbnNmb3JtICR7ZWFzaW5nfSAke2R1cmF0aW9ufW1zYDtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG5cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgJy4vcGFnZV9zcHJlYWQuc3R5bCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VTcHJlYWQge1xuICAgIHZpc2liaWxpdHkgPSAnZ29uZSc7XG4gICAgcG9zaXRpb25lZCA9IGZhbHNlO1xuICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKGVsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5vcHRpb25zLmlkO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLm9wdGlvbnMudHlwZTtcbiAgICAgICAgdGhpcy5wYWdlSWRzID0gdGhpcy5vcHRpb25zLnBhZ2VJZHM7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLm9wdGlvbnMud2lkdGg7XG4gICAgICAgIHRoaXMubGVmdCA9IHRoaXMub3B0aW9ucy5sZWZ0O1xuICAgICAgICB0aGlzLm1heFpvb21TY2FsZSA9IHRoaXMub3B0aW9ucy5tYXhab29tU2NhbGU7XG4gICAgfVxuXG4gICAgaXNab29tYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuZ2V0TWF4Wm9vbVNjYWxlKCkgPiAxICYmXG4gICAgICAgICAgICB0aGlzLmdldEVsKCkuZ2V0QXR0cmlidXRlKCdkYXRhLXpvb21hYmxlJykgIT09ICdmYWxzZSdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpc1Njcm9sbGFibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsKCkuY2xhc3NMaXN0LmNvbnRhaW5zKCd2ZXJzby0tc2Nyb2xsYWJsZScpO1xuICAgIH1cblxuICAgIGdldEVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICB9XG5cbiAgICBnZXRPdmVybGF5RWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbCgpLnF1ZXJ5U2VsZWN0b3JBbGwoJy52ZXJzb19fb3ZlcmxheScpO1xuICAgIH1cblxuICAgIGdldFBhZ2VFbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsKCkucXVlcnlTZWxlY3RvckFsbCgnLnZlcnNvX19wYWdlJyk7XG4gICAgfVxuXG4gICAgZ2V0UmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWwoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50UmVjdCgpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHtcbiAgICAgICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgICAgIGxlZnQ6IG51bGwsXG4gICAgICAgICAgICByaWdodDogbnVsbCxcbiAgICAgICAgICAgIGJvdHRvbTogbnVsbCxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgcGFnZUVsIG9mIEFycmF5LmZyb20odGhpcy5nZXRQYWdlRWxzKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlUmVjdCA9IHBhZ2VFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgaWYgKHBhZ2VSZWN0LnRvcCA8IHJlY3QudG9wIHx8IHJlY3QudG9wID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZWN0LnRvcCA9IHBhZ2VSZWN0LnRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYWdlUmVjdC5sZWZ0IDwgcmVjdC5sZWZ0IHx8IHJlY3QubGVmdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0ID0gcGFnZVJlY3QubGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYWdlUmVjdC5yaWdodCA+IHJlY3QucmlnaHQgfHwgcmVjdC5yaWdodCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVjdC5yaWdodCA9IHBhZ2VSZWN0LnJpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhZ2VSZWN0LmJvdHRvbSA+IHJlY3QuYm90dG9tIHx8IHJlY3QuYm90dG9tID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZWN0LmJvdHRvbSA9IHBhZ2VSZWN0LmJvdHRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlY3QudG9wID0gcmVjdC50b3AgPz8gMDtcbiAgICAgICAgcmVjdC5sZWZ0ID0gcmVjdC5sZWZ0ID8/IDA7XG4gICAgICAgIHJlY3QucmlnaHQgPSByZWN0LnJpZ2h0ID8/IDA7XG4gICAgICAgIHJlY3QuYm90dG9tID0gcmVjdC5ib3R0b20gPz8gMDtcbiAgICAgICAgcmVjdC53aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnQ7XG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcDtcblxuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICB9XG5cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG5cbiAgICBnZXRQYWdlSWRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlSWRzO1xuICAgIH1cblxuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBnZXRMZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICAgIH1cblxuICAgIGdldE1heFpvb21TY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4Wm9vbVNjYWxlO1xuICAgIH1cblxuICAgIGdldFZpc2liaWxpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2liaWxpdHk7XG4gICAgfVxuXG4gICAgc2V0VmlzaWJpbGl0eSh2aXNpYmlsaXR5KSB7XG4gICAgICAgIGlmICh0aGlzLnZpc2liaWxpdHkgIT09IHZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWwoKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID09PSAndmlzaWJsZScgPyAnYmxvY2snIDogJ25vbmUnO1xuXG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmdldEVsKCkuc3R5bGUubGVmdCA9IGAke3RoaXMuZ2V0TGVmdCgpfSVgO1xuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nZXRFbCgpLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnLCB0aGlzLmFjdGl2ZSk7XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRFbCgpLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnLCB0aGlzLmFjdGl2ZSk7XG4gICAgfVxufVxuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBuYXRpdmVLZXlzKDEpOyB9KTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZBSUxTX09OX1BSSU1JVElWRVMgfSwge1xuICBrZXlzOiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXModG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5rZXlzJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5PYmplY3Qua2V5cztcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3Qva2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2tleXNcIik7IiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJ1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChpdCkpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbmV4cG9ydHMuZiA9IHdlbGxLbm93blN5bWJvbDtcbiIsInZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUpIHtcbiAgdmFyIFN5bWJvbCA9IHBhdGguU3ltYm9sIHx8IChwYXRoLlN5bWJvbCA9IHt9KTtcbiAgaWYgKCFoYXMoU3ltYm9sLCBOQU1FKSkgZGVmaW5lUHJvcGVydHkoU3ltYm9sLCBOQU1FLCB7XG4gICAgdmFsdWU6IHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZihOQU1FKVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIG5hdGl2ZU9iamVjdENyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcblxudmFyIEhJRERFTiA9IHNoYXJlZEtleSgnaGlkZGVuJyk7XG52YXIgU1lNQk9MID0gJ1N5bWJvbCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1lNQk9MKTtcbnZhciBPYmplY3RQcm90b3R5cGUgPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkc3RyaW5naWZ5ID0gZ2V0QnVpbHRJbignSlNPTicsICdzdHJpbmdpZnknKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyA9IGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbC5mO1xudmFyIG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlID0gcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZjtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG90eXBlU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N0cmluZy10by1zeW1ib2wtcmVnaXN0cnknKTtcbnZhciBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtdG8tc3RyaW5nLXJlZ2lzdHJ5Jyk7XG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBRT2JqZWN0ID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBVU0VfU0VUVEVSID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdENyZWF0ZShuYXRpdmVEZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYScsIHsgdmFsdWU6IDcgfSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbiAoTywgUCwgQXR0cmlidXRlcykge1xuICB2YXIgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciA9IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIFApO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcikgZGVsZXRlIE9iamVjdFByb3RvdHlwZVtQXTtcbiAgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIGlmIChPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yICYmIE8gIT09IE9iamVjdFByb3RvdHlwZSkge1xuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZSwgUCwgT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvcik7XG4gIH1cbn0gOiBuYXRpdmVEZWZpbmVQcm9wZXJ0eTtcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAodGFnLCBkZXNjcmlwdGlvbikge1xuICB2YXIgc3ltYm9sID0gQWxsU3ltYm9sc1t0YWddID0gbmF0aXZlT2JqZWN0Q3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHNldEludGVybmFsU3RhdGUoc3ltYm9sLCB7XG4gICAgdHlwZTogU1lNQk9MLFxuICAgIHRhZzogdGFnLFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblxuICB9KTtcbiAgaWYgKCFERVNDUklQVE9SUykgc3ltYm9sLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHJldHVybiBzeW1ib2w7XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGl0KSBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBpZiAoTyA9PT0gT2JqZWN0UHJvdG90eXBlKSAkZGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCwgQXR0cmlidXRlcyk7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkpIHtcbiAgICBpZiAoIUF0dHJpYnV0ZXMuZW51bWVyYWJsZSkge1xuICAgICAgaWYgKCFoYXMoTywgSElEREVOKSkgbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgSElEREVOLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwge30pKTtcbiAgICAgIE9bSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhcyhPLCBISURERU4pICYmIE9bSElEREVOXVtrZXldKSBPW0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgQXR0cmlidXRlcyA9IG5hdGl2ZU9iamVjdENyZWF0ZShBdHRyaWJ1dGVzLCB7IGVudW1lcmFibGU6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCBmYWxzZSkgfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzY3JpcHRvcihPLCBrZXksIEF0dHJpYnV0ZXMpO1xuICB9IHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBrZXksIEF0dHJpYnV0ZXMpO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIgcHJvcGVydGllcyA9IHRvSW5kZXhlZE9iamVjdChQcm9wZXJ0aWVzKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKHByb3BlcnRpZXMpLmNvbmNhdCgkZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BlcnRpZXMpKTtcbiAgJGZvckVhY2goa2V5cywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghREVTQ1JJUFRPUlMgfHwgJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocHJvcGVydGllcywga2V5KSkgJGRlZmluZVByb3BlcnR5KE8sIGtleSwgcHJvcGVydGllc1trZXldKTtcbiAgfSk7XG4gIHJldHVybiBPO1xufTtcblxudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gbmF0aXZlT2JqZWN0Q3JlYXRlKE8pIDogJGRlZmluZVByb3BlcnRpZXMobmF0aXZlT2JqZWN0Q3JlYXRlKE8pLCBQcm9wZXJ0aWVzKTtcbn07XG5cbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBQID0gdG9QcmltaXRpdmUoViwgdHJ1ZSk7XG4gIHZhciBlbnVtZXJhYmxlID0gbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0aGlzLCBQKTtcbiAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywgUCkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBQKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZW51bWVyYWJsZSB8fCAhaGFzKHRoaXMsIFApIHx8ICFoYXMoQWxsU3ltYm9scywgUCkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW1BdID8gZW51bWVyYWJsZSA6IHRydWU7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIHZhciBpdCA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvdHlwZSAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIGtleSkpIHJldHVybjtcbiAgdmFyIGRlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG4gIGlmIChkZXNjcmlwdG9yICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpIHtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSB0cnVlO1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9yO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXModG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmICghaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhoaWRkZW5LZXlzLCBrZXkpKSByZXN1bHQucHVzaChrZXkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pIHtcbiAgdmFyIElTX09CSkVDVF9QUk9UT1RZUEUgPSBPID09PSBPYmplY3RQcm90b3R5cGU7XG4gIHZhciBuYW1lcyA9IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMoSVNfT0JKRUNUX1BST1RPVFlQRSA/IE9iamVjdFByb3RvdHlwZVN5bWJvbHMgOiB0b0luZGV4ZWRPYmplY3QoTykpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gICRmb3JFYWNoKG5hbWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICghSVNfT0JKRUNUX1BST1RPVFlQRSB8fCBoYXMoT2JqZWN0UHJvdG90eXBlLCBrZXkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gYFN5bWJvbGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLWNvbnN0cnVjdG9yXG5pZiAoIU5BVElWRV9TWU1CT0wpIHtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpIHRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gIWFyZ3VtZW50cy5sZW5ndGggfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBTdHJpbmcoYXJndW1lbnRzWzBdKTtcbiAgICB2YXIgdGFnID0gdWlkKGRlc2NyaXB0aW9uKTtcbiAgICB2YXIgc2V0dGVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG90eXBlKSBzZXR0ZXIuY2FsbChPYmplY3RQcm90b3R5cGVTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2NyaXB0b3IodGhpcywgdGFnLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmIChERVNDUklQVE9SUyAmJiBVU0VfU0VUVEVSKSBzZXRTeW1ib2xEZXNjcmlwdG9yKE9iamVjdFByb3RvdHlwZSwgdGFnLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiBzZXR0ZXIgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnLCBkZXNjcmlwdGlvbik7XG4gIH07XG5cbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS50YWc7XG4gIH0pO1xuXG4gIHJlZGVmaW5lKCRTeW1ib2wsICd3aXRob3V0U2V0dGVyJywgZnVuY3Rpb24gKGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIHdyYXAodWlkKGRlc2NyaXB0aW9uKSwgZGVzY3JpcHRpb24pO1xuICB9KTtcblxuICBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mID0gJGRlZmluZVByb3BlcnR5O1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZiA9IGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB3cmFwKHdlbGxLbm93blN5bWJvbChuYW1lKSwgbmFtZSk7XG4gIH07XG5cbiAgaWYgKERFU0NSSVBUT1JTKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtU3ltYm9sLWRlc2NyaXB0aW9uXG4gICAgbmF0aXZlRGVmaW5lUHJvcGVydHkoJFN5bWJvbFtQUk9UT1RZUEVdLCAnZGVzY3JpcHRpb24nLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGRlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIUlTX1BVUkUpIHtcbiAgICAgIHJlZGVmaW5lKE9iamVjdFByb3RvdHlwZSwgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB7IHVuc2FmZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbn1cblxuJCh7IGdsb2JhbDogdHJ1ZSwgd3JhcDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIU5BVElWRV9TWU1CT0wgfSwge1xuICBTeW1ib2w6ICRTeW1ib2xcbn0pO1xuXG4kZm9yRWFjaChvYmplY3RLZXlzKFdlbGxLbm93blN5bWJvbHNTdG9yZSksIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlZmluZVdlbGxLbm93blN5bWJvbChuYW1lKTtcbn0pO1xuXG4kKHsgdGFyZ2V0OiBTWU1CT0wsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICAvLyBgU3ltYm9sLmZvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmZvclxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcoa2V5KTtcbiAgICBpZiAoaGFzKFN0cmluZ1RvU3ltYm9sUmVnaXN0cnksIHN0cmluZykpIHJldHVybiBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ107XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woc3RyaW5nKTtcbiAgICBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5W3N0cmluZ10gPSBzeW1ib2w7XG4gICAgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1ib2xdID0gc3RyaW5nO1xuICAgIHJldHVybiBzeW1ib2w7XG4gIH0sXG4gIC8vIGBTeW1ib2wua2V5Rm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wua2V5Zm9yXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKHN5bSkge1xuICAgIGlmICghaXNTeW1ib2woc3ltKSkgdGhyb3cgVHlwZUVycm9yKHN5bSArICcgaXMgbm90IGEgc3ltYm9sJyk7XG4gICAgaWYgKGhhcyhTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5LCBzeW0pKSByZXR1cm4gU3ltYm9sVG9TdHJpbmdSZWdpc3RyeVtzeW1dO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24gKCkgeyBVU0VfU0VUVEVSID0gZmFsc2U7IH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JzXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvclxufSk7XG5cbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eXN5bWJvbHNcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gQ2hyb21lIDM4IGFuZCAzOSBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgZmFpbHMgb24gcHJpbWl0aXZlc1xuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzQ0M1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogZmFpbHMoZnVuY3Rpb24gKCkgeyBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZigxKTsgfSkgfSwge1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkge1xuICAgIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuLy8gYEpTT04uc3RyaW5naWZ5YCBtZXRob2QgYmVoYXZpb3Igd2l0aCBzeW1ib2xzXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWpzb24uc3RyaW5naWZ5XG5pZiAoJHN0cmluZ2lmeSkge1xuICB2YXIgRk9SQ0VEX0pTT05fU1RSSU5HSUZZID0gIU5BVElWRV9TWU1CT0wgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBzeW1ib2wgPSAkU3ltYm9sKCk7XG4gICAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgICByZXR1cm4gJHN0cmluZ2lmeShbc3ltYm9sXSkgIT0gJ1tudWxsXSdcbiAgICAgIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAgICAgfHwgJHN0cmluZ2lmeSh7IGE6IHN5bWJvbCB9KSAhPSAne30nXG4gICAgICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICAgICAgfHwgJHN0cmluZ2lmeShPYmplY3Qoc3ltYm9sKSkgIT0gJ3t9JztcbiAgfSk7XG5cbiAgJCh7IHRhcmdldDogJ0pTT04nLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRF9KU09OX1NUUklOR0lGWSB9LCB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgICB2YXIgaW5kZXggPSAxO1xuICAgICAgdmFyICRyZXBsYWNlcjtcbiAgICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaW5kZXgpIGFyZ3MucHVzaChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgICAgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgICAgcmV0dXJuICRzdHJpbmdpZnkuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9wcmltaXRpdmVcbmlmICghJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0pIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG59XG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvc3RyaW5ndGFnXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCBTWU1CT0wpO1xuXG5oaWRkZW5LZXlzW0hJRERFTl0gPSB0cnVlO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktc3ltYm9sc1wiKTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xuXG52YXIgRkFJTFNfT05fUFJJTUlUSVZFUyA9IGZhaWxzKGZ1bmN0aW9uICgpIHsgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKDEpOyB9KTtcbnZhciBGT1JDRUQgPSAhREVTQ1JJUFRPUlMgfHwgRkFJTFNfT05fUFJJTUlUSVZFUztcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRvSW5kZXhlZE9iamVjdChpdCksIGtleSk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbnZhciBPYmplY3QgPSBwYXRoLk9iamVjdDtcblxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59O1xuXG5pZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvci5zaGFtKSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iuc2hhbSA9IHRydWU7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKTsiLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnM6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqZWN0KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gICAgdmFyIGtleXMgPSBvd25LZXlzKE8pO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBrZXksIGRlc2NyaXB0b3I7XG4gICAgd2hpbGUgKGtleXMubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywga2V5ID0ga2V5c1tpbmRleCsrXSk7XG4gICAgICBpZiAoZGVzY3JpcHRvciAhPT0gdW5kZWZpbmVkKSBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JzXCIpOyIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFERVNDUklQVE9SUywgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgZGVmaW5lUHJvcGVydGllczogZGVmaW5lUHJvcGVydGllc1xufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG52YXIgT2JqZWN0ID0gcGF0aC5PYmplY3Q7XG5cbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKFQsIEQpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFQsIEQpO1xufTtcblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLnNoYW0pIGRlZmluZVByb3BlcnRpZXMuc2hhbSA9IHRydWU7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZGVmaW5lLXByb3BlcnRpZXNcIik7IiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xuXG4vLyBgQXJyYXkuaXNBcnJheWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LmlzYXJyYXlcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHN0YXQ6IHRydWUgfSwge1xuICBpc0FycmF5OiBpc0FycmF5XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuaXMtYXJyYXknKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLkFycmF5LmlzQXJyYXk7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvYXJyYXkvaXMtYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvaXMtYXJyYXlcIik7IiwiaW1wb3J0IF9BcnJheSRpc0FycmF5IGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvYXJyYXkvaXMtYXJyYXlcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKF9BcnJheSRpc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5hc3luY0l0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuYXN5bmNpdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdhc3luY0l0ZXJhdG9yJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmhhc0luc3RhbmNlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuaGFzaW5zdGFuY2VcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnaGFzSW5zdGFuY2UnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuaXNjb25jYXRzcHJlYWRhYmxlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5pdGVyYXRvcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLml0ZXJhdG9yXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLm1hdGNoYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wubWF0Y2hcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnbWF0Y2gnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wubWF0Y2hBbGxgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5tYXRjaGFsbFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdtYXRjaEFsbCcpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5yZXBsYWNlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucmVwbGFjZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnNlYXJjaGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnNlYXJjaFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdzZWFyY2gnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuc3BlY2llc2Agd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnNwZWNpZXNcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5zcGxpdGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnNwbGl0XG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3NwbGl0Jyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnRvUHJpbWl0aXZlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wudG9wcmltaXRpdmVcbmRlZmluZVdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wudG9TdHJpbmdUYWdgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC50b3N0cmluZ3RhZ1xuZGVmaW5lV2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC51bnNjb3BhYmxlc2Agd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnVuc2NvcGFibGVzXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3Vuc2NvcGFibGVzJyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG5cbi8vIEpTT05bQEB0b1N0cmluZ1RhZ10gcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtanNvbi1AQHRvc3RyaW5ndGFnXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0Jyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuZGVzY3JpcHRpb24nKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmhhcy1pbnN0YW5jZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuaXMtY29uY2F0LXNwcmVhZGFibGUnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5tYXRjaCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wubWF0Y2gtYWxsJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5yZXBsYWNlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zZWFyY2gnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLnNwZWNpZXMnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLnNwbGl0Jyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC50by1wcmltaXRpdmUnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLnRvLXN0cmluZy10YWcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLnVuc2NvcGFibGVzJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmpzb24udG8tc3RyaW5nLXRhZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5tYXRoLnRvLXN0cmluZy10YWcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMucmVmbGVjdC50by1zdHJpbmctdGFnJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5TeW1ib2w7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmFzeW5jRGlzcG9zZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXVzaW5nLXN0YXRlbWVudFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdhc3luY0Rpc3Bvc2UnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuZGlzcG9zZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXVzaW5nLXN0YXRlbWVudFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdkaXNwb3NlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLm9ic2VydmFibGVgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ29ic2VydmFibGUnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wucGF0dGVybk1hdGNoYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcGF0dGVybi1tYXRjaGluZ1xuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdwYXR0ZXJuTWF0Y2gnKTtcbiIsIi8vIFRPRE86IHJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgXG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3JlcGxhY2VBbGwnKTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5hc3luYy1kaXNwb3NlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuZGlzcG9zZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLm9ic2VydmFibGUnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5wYXR0ZXJuLW1hdGNoJyk7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLnJlcGxhY2UtYWxsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL3N5bWJvbFwiKTsiLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG52YXIgaXNJdGVyYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1pdGVyYWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmFibGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvaXMtaXRlcmFibGVcIik7IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gZ2V0SXRlcmF0b3JNZXRob2QoaXQpO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yTWV0aG9kICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGl0ZXJhYmxlJyk7XG4gIH0gcmV0dXJuIGFuT2JqZWN0KGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXQpKTtcbn07XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG52YXIgZ2V0SXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SXRlcmF0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvZ2V0LWl0ZXJhdG9yXCIpOyIsImltcG9ydCBfU3ltYm9sIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvc3ltYm9sXCI7XG5pbXBvcnQgX2lzSXRlcmFibGUgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9pcy1pdGVyYWJsZVwiO1xuaW1wb3J0IF9nZXRJdGVyYXRvciBmcm9tIFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2dldC1pdGVyYXRvclwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAodHlwZW9mIF9TeW1ib2wgPT09IFwidW5kZWZpbmVkXCIgfHwgIV9pc0l0ZXJhYmxlKE9iamVjdChhcnIpKSkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBfZ2V0SXRlcmF0b3IoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnc2xpY2UnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBuYXRpdmVTbGljZSA9IFtdLnNsaWNlO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNsaWNlXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3MgYW5kIERPTSBvYmplY3RzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB9LCB7XG4gIHNsaWNlOiBmdW5jdGlvbiBzbGljZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgayA9IHRvQWJzb2x1dGVJbmRleChzdGFydCwgbGVuZ3RoKTtcbiAgICB2YXIgZmluID0gdG9BYnNvbHV0ZUluZGV4KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogZW5kLCBsZW5ndGgpO1xuICAgIC8vIGlubGluZSBgQXJyYXlTcGVjaWVzQ3JlYXRlYCBmb3IgdXNhZ2UgbmF0aXZlIGBBcnJheSNzbGljZWAgd2hlcmUgaXQncyBwb3NzaWJsZVxuICAgIHZhciBDb25zdHJ1Y3RvciwgcmVzdWx0LCBuO1xuICAgIGlmIChpc0FycmF5KE8pKSB7XG4gICAgICBDb25zdHJ1Y3RvciA9IE8uY29uc3RydWN0b3I7XG4gICAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgICAgaWYgKHR5cGVvZiBDb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIChDb25zdHJ1Y3RvciA9PT0gQXJyYXkgfHwgaXNBcnJheShDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoQ29uc3RydWN0b3IpKSB7XG4gICAgICAgIENvbnN0cnVjdG9yID0gQ29uc3RydWN0b3JbU1BFQ0lFU107XG4gICAgICAgIGlmIChDb25zdHJ1Y3RvciA9PT0gbnVsbCkgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IENvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNsaWNlLmNhbGwoTywgaywgZmluKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0gbmV3IChDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDb25zdHJ1Y3RvcikobWF4KGZpbiAtIGssIDApKTtcbiAgICBmb3IgKG4gPSAwOyBrIDwgZmluOyBrKyssIG4rKykgaWYgKGsgaW4gTykgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBuLCBPW2tdKTtcbiAgICByZXN1bHQubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuc2xpY2UnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5zbGljZTtcbiIsInZhciBzbGljZSA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvc2xpY2UnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuc2xpY2U7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5zbGljZSkgPyBzbGljZSA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2Uvc2xpY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvaW5zdGFuY2Uvc2xpY2VcIik7IiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2FycmF5L2Zyb20nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvZnJvbVwiKTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IF9zbGljZUluc3RhbmNlUHJvcGVydHkgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9pbnN0YW5jZS9zbGljZVwiO1xuaW1wb3J0IF9BcnJheSRmcm9tIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvYXJyYXkvZnJvbVwiO1xuaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICB2YXIgX2NvbnRleHQ7XG5cbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcblxuICB2YXIgbiA9IF9zbGljZUluc3RhbmNlUHJvcGVydHkoX2NvbnRleHQgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykpLmNhbGwoX2NvbnRleHQsIDgsIC0xKTtcblxuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gX0FycmF5JGZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgcmVwbGFjZSA9ICcnLnJlcGxhY2U7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFMgPSAvXFwkKFskJidgXXxcXGR7MSwyfXw8W14+XSo+KS9nO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEID0gL1xcJChbJCYnYF18XFxkezEsMn0pL2c7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0c3Vic3RpdHV0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRjaGVkLCBzdHIsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgdmFyIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRDtcbiAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFM7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2UuY2FsbChyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgIHZhciBjYXB0dXJlO1xuICAgIHN3aXRjaCAoY2guY2hhckF0KDApKSB7XG4gICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgIGNhc2UgJyYnOiByZXR1cm4gbWF0Y2hlZDtcbiAgICAgIGNhc2UgJ2AnOiByZXR1cm4gc3RyLnNsaWNlKDAsIHBvc2l0aW9uKTtcbiAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHIuc2xpY2UodGFpbFBvcyk7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FwdHVyZSA9IG5hbWVkQ2FwdHVyZXNbY2guc2xpY2UoMSwgLTEpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBcXGRcXGQ/XG4gICAgICAgIHZhciBuID0gK2NoO1xuICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICB2YXIgZiA9IGZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICBpZiAoZiA8PSBtKSByZXR1cm4gY2FwdHVyZXNbZiAtIDFdID09PSB1bmRlZmluZWQgPyBjaC5jaGFyQXQoMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaC5jaGFyQXQoMSk7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tuIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIGdldFN1YnN0aXR1dGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uJyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbnZhciBtYXliZVRvU3RyaW5nID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gaXQgOiBTdHJpbmcoaXQpO1xufTtcblxuLy8gQEByZXBsYWNlIGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygncmVwbGFjZScsIDIsIGZ1bmN0aW9uIChSRVBMQUNFLCBuYXRpdmVSZXBsYWNlLCBtYXliZUNhbGxOYXRpdmUsIHJlYXNvbikge1xuICB2YXIgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPSByZWFzb24uUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkU7XG4gIHZhciBSRVBMQUNFX0tFRVBTXyQwID0gcmVhc29uLlJFUExBQ0VfS0VFUFNfJDA7XG4gIHZhciBVTlNBRkVfU1VCU1RJVFVURSA9IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID8gJyQnIDogJyQwJztcblxuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBzZWFyY2hWYWx1ZSA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZWFyY2hWYWx1ZVtSRVBMQUNFXTtcbiAgICAgIHJldHVybiByZXBsYWNlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcmVwbGFjZXIuY2FsbChzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgICA6IG5hdGl2ZVJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAcmVwbGFjZVxuICAgIGZ1bmN0aW9uIChyZWdleHAsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgaWYgKFxuICAgICAgICAoIVJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFICYmIFJFUExBQ0VfS0VFUFNfJDApIHx8XG4gICAgICAgICh0eXBlb2YgcmVwbGFjZVZhbHVlID09PSAnc3RyaW5nJyAmJiByZXBsYWNlVmFsdWUuaW5kZXhPZihVTlNBRkVfU1VCU1RJVFVURSkgPT09IC0xKVxuICAgICAgKSB7XG4gICAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlUmVwbGFjZSwgcmVnZXhwLCB0aGlzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcblxuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gdHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IFN0cmluZyhyZXBsYWNlVmFsdWUpO1xuXG4gICAgICB2YXIgZ2xvYmFsID0gcnguZ2xvYmFsO1xuICAgICAgaWYgKGdsb2JhbCkge1xuICAgICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgICByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgYnJlYWs7XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIGlmICghZ2xvYmFsKSBicmVhaztcblxuICAgICAgICB2YXIgbWF0Y2hTdHIgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjY3VtdWxhdGVkUmVzdWx0ID0gJyc7XG4gICAgICB2YXIgbmV4dFNvdXJjZVBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG1heChtaW4odG9JbnRlZ2VyKHJlc3VsdC5pbmRleCksIFMubGVuZ3RoKSwgMCk7XG4gICAgICAgIHZhciBjYXB0dXJlcyA9IFtdO1xuICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGVxdWl2YWxlbnQgdG9cbiAgICAgICAgLy8gICBjYXB0dXJlcyA9IHJlc3VsdC5zbGljZSgxKS5tYXAobWF5YmVUb1N0cmluZylcbiAgICAgICAgLy8gYnV0IGZvciBzb21lIHJlYXNvbiBgbmF0aXZlU2xpY2UuY2FsbChyZXN1bHQsIDEsIHJlc3VsdC5sZW5ndGgpYCAoY2FsbGVkIGluXG4gICAgICAgIC8vIHRoZSBzbGljZSBwb2x5ZmlsbCB3aGVuIHNsaWNpbmcgbmF0aXZlIGFycmF5cykgXCJkb2Vzbid0IHdvcmtcIiBpbiBzYWZhcmkgOSBhbmRcbiAgICAgICAgLy8gY2F1c2VzIGEgY3Jhc2ggKGh0dHBzOi8vcGFzdGViaW4uY29tL04yMVF6ZVFBKSB3aGVuIHRyeWluZyB0byBkZWJ1ZyBpdC5cbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIGNhcHR1cmVzLnB1c2gobWF5YmVUb1N0cmluZyhyZXN1bHRbal0pKTtcbiAgICAgICAgdmFyIG5hbWVkQ2FwdHVyZXMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICBpZiAoZnVuY3Rpb25hbFJlcGxhY2UpIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZXJBcmdzID0gW21hdGNoZWRdLmNvbmNhdChjYXB0dXJlcywgcG9zaXRpb24sIFMpO1xuICAgICAgICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHJlcGxhY2VyQXJncy5wdXNoKG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IFN0cmluZyhyZXBsYWNlVmFsdWUuYXBwbHkodW5kZWZpbmVkLCByZXBsYWNlckFyZ3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IGdldFN1YnN0aXR1dGlvbihtYXRjaGVkLCBTLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IG5leHRTb3VyY2VQb3NpdGlvbikge1xuICAgICAgICAgIGFjY3VtdWxhdGVkUmVzdWx0ICs9IFMuc2xpY2UobmV4dFNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbikgKyByZXBsYWNlbWVudDtcbiAgICAgICAgICBuZXh0U291cmNlUG9zaXRpb24gPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjdW11bGF0ZWRSZXN1bHQgKyBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbik7XG4gICAgfVxuICBdO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgbmF0aXZlSm9pbiA9IFtdLmpvaW47XG5cbnZhciBFUzNfU1RSSU5HUyA9IEluZGV4ZWRPYmplY3QgIT0gT2JqZWN0O1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdqb2luJywgJywnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5qb2luYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmpvaW5cbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEVTM19TVFJJTkdTIHx8ICFTVFJJQ1RfTUVUSE9EIH0sIHtcbiAgam9pbjogZnVuY3Rpb24gam9pbihzZXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbmF0aXZlSm9pbi5jYWxsKHRvSW5kZXhlZE9iamVjdCh0aGlzKSwgc2VwYXJhdG9yID09PSB1bmRlZmluZWQgPyAnLCcgOiBzZXBhcmF0b3IpO1xuICB9XG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xuXG4vLyBgRGF0ZS5ub3dgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1kYXRlLm5vd1xuJCh7IHRhcmdldDogJ0RhdGUnLCBzdGF0OiB0cnVlIH0sIHtcbiAgbm93OiBmdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuZGF0ZS5ub3cnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLkRhdGUubm93O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2RhdGUvbm93Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9kYXRlL25vd1wiKTsiLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvYXJyYXkvaXMtYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2FycmF5L2lzLWFycmF5XCIpOyIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgY3JlYXRlOiBjcmVhdGVcbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuY3JlYXRlJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbnZhciBPYmplY3QgPSBwYXRoLk9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2NyZWF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2NyZWF0ZVwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xuXG52YXIgbmF0aXZlQXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG5tb2R1bGUuZXhwb3J0cyA9ICFuYXRpdmVBc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgbmF0aXZlQXNzaWduKHsgYjogMSB9LCBuYXRpdmVBc3NpZ24oZGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYicsIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLCB7IGI6IDIgfSkpLmIgIT09IDEpIHJldHVybiB0cnVlO1xuICAvLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1ZylcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLyogZ2xvYmFsIFN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG4gIHZhciBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbc3ltYm9sXSA9IDc7XG4gIGFscGhhYmV0LnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChjaHIpIHsgQltjaHJdID0gY2hyOyB9KTtcbiAgcmV0dXJuIG5hdGl2ZUFzc2lnbih7fSwgQSlbc3ltYm9sXSAhPSA3IHx8IG9iamVjdEtleXMobmF0aXZlQXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gYWxwaGFiZXQ7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IG9iamVjdEtleXMoUykuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogbmF0aXZlQXNzaWduO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1hc3NpZ24nKTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBPYmplY3QuYXNzaWduICE9PSBhc3NpZ24gfSwge1xuICBhc3NpZ246IGFzc2lnblxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5hc3NpZ24nKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC5hc3NpZ247XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2Fzc2lnbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvb2JqZWN0L2Fzc2lnblwiKTsiLCIvLyBhIHN0cmluZyBvZiBhbGwgdmFsaWQgdW5pY29kZSB3aGl0ZXNwYWNlc1xubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDInICtcbiAgJ1xcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJztcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciB3aGl0ZXNwYWNlID0gJ1snICsgd2hpdGVzcGFjZXMgKyAnXSc7XG52YXIgbHRyaW0gPSBSZWdFeHAoJ14nICsgd2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKicpO1xudmFyIHJ0cmltID0gUmVnRXhwKHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyokJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbSwgdHJpbVN0YXJ0LCB0cmltRW5kLCB0cmltTGVmdCwgdHJpbVJpZ2h0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgaWYgKFRZUEUgJiAxKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShsdHJpbSwgJycpO1xuICAgIGlmIChUWVBFICYgMikgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocnRyaW0sICcnKTtcbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbUxlZnQsIHRyaW1TdGFydCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltc3RhcnRcbiAgc3RhcnQ6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltUmlnaHQsIHRyaW1FbmQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbWVuZFxuICBlbmQ6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUudHJpbWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4gIHRyaW06IGNyZWF0ZU1ldGhvZCgzKVxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciBub24gPSAnXFx1MjAwQlxcdTAwODVcXHUxODBFJztcblxuLy8gY2hlY2sgdGhhdCBhIG1ldGhvZCB3b3JrcyB3aXRoIHRoZSBjb3JyZWN0IGxpc3Rcbi8vIG9mIHdoaXRlc3BhY2VzIGFuZCBoYXMgYSBjb3JyZWN0IG5hbWVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FKSB7XG4gIHJldHVybiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICEhd2hpdGVzcGFjZXNbTUVUSE9EX05BTUVdKCkgfHwgbm9uW01FVEhPRF9OQU1FXSgpICE9IG5vbiB8fCB3aGl0ZXNwYWNlc1tNRVRIT0RfTkFNRV0ubmFtZSAhPT0gTUVUSE9EX05BTUU7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICR0cmltID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltJykudHJpbTtcbnZhciBmb3JjZWRTdHJpbmdUcmltTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltLWZvcmNlZCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltXG4kKHsgdGFyZ2V0OiAnU3RyaW5nJywgcHJvdG86IHRydWUsIGZvcmNlZDogZm9yY2VkU3RyaW5nVHJpbU1ldGhvZCgndHJpbScpIH0sIHtcbiAgdHJpbTogZnVuY3Rpb24gdHJpbSgpIHtcbiAgICByZXR1cm4gJHRyaW0odGhpcyk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5zdHJpbmcudHJpbScpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdTdHJpbmcnKS50cmltO1xuIiwidmFyIHRyaW0gPSByZXF1aXJlKCcuLi9zdHJpbmcvdmlydHVhbC90cmltJyk7XG5cbnZhciBTdHJpbmdQcm90b3R5cGUgPSBTdHJpbmcucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQudHJpbTtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ3N0cmluZycgfHwgaXQgPT09IFN0cmluZ1Byb3RvdHlwZVxuICAgIHx8IChpdCBpbnN0YW5jZW9mIFN0cmluZyAmJiBvd24gPT09IFN0cmluZ1Byb3RvdHlwZS50cmltKSA/IHRyaW0gOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3RyaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3RyaW1cIik7IiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3NsaWNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zbGljZVwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciB0ZXN0ID0gW107XG52YXIgbmF0aXZlU29ydCA9IHRlc3Quc29ydDtcblxuLy8gSUU4LVxudmFyIEZBSUxTX09OX1VOREVGSU5FRCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdGVzdC5zb3J0KHVuZGVmaW5lZCk7XG59KTtcbi8vIFY4IGJ1Z1xudmFyIEZBSUxTX09OX05VTEwgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHRlc3Quc29ydChudWxsKTtcbn0pO1xuLy8gT2xkIFdlYktpdFxudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdzb3J0Jyk7XG5cbnZhciBGT1JDRUQgPSBGQUlMU19PTl9VTkRFRklORUQgfHwgIUZBSUxTX09OX05VTEwgfHwgIVNUUklDVF9NRVRIT0Q7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuc29ydGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb3J0XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBzb3J0OiBmdW5jdGlvbiBzb3J0KGNvbXBhcmVmbikge1xuICAgIHJldHVybiBjb21wYXJlZm4gPT09IHVuZGVmaW5lZFxuICAgICAgPyBuYXRpdmVTb3J0LmNhbGwodG9PYmplY3QodGhpcykpXG4gICAgICA6IG5hdGl2ZVNvcnQuY2FsbCh0b09iamVjdCh0aGlzKSwgYUZ1bmN0aW9uKGNvbXBhcmVmbikpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuc29ydCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLnNvcnQ7XG4iLCJ2YXIgc29ydCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvc29ydCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5zb3J0O1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEFycmF5ICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuc29ydCkgPyBzb3J0IDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9zb3J0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zb3J0XCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbmQ7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxudmFyIEZJTkQgPSAnZmluZCc7XG52YXIgU0tJUFNfSE9MRVMgPSB0cnVlO1xuXG4vLyBTaG91bGRuJ3Qgc2tpcCBob2xlc1xuaWYgKEZJTkQgaW4gW10pIEFycmF5KDEpW0ZJTkRdKGZ1bmN0aW9uICgpIHsgU0tJUFNfSE9MRVMgPSBmYWxzZTsgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmluZGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBTS0lQU19IT0xFUyB9LCB7XG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2tmbiAvKiAsIHRoYXQgPSB1bmRlZmluZWQgKi8pIHtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcyhGSU5EKTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZmluZCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmZpbmQ7XG4iLCJ2YXIgZmluZCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZmluZCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5maW5kO1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEFycmF5ICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuZmluZCkgPyBmaW5kIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9maW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9maW5kXCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRtYXAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykubWFwO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdtYXAnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5Lm1hcCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLm1hcDtcbiIsInZhciBtYXAgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL21hcCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5tYXA7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5tYXApID8gbWFwIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9tYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL21hcFwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkZmluZEluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbmRJbmRleDtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xuXG52YXIgRklORF9JTkRFWCA9ICdmaW5kSW5kZXgnO1xudmFyIFNLSVBTX0hPTEVTID0gdHJ1ZTtcblxuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmIChGSU5EX0lOREVYIGluIFtdKSBBcnJheSgxKVtGSU5EX0lOREVYXShmdW5jdGlvbiAoKSB7IFNLSVBTX0hPTEVTID0gZmFsc2U7IH0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kaW5kZXhcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFNLSVBTX0hPTEVTIH0sIHtcbiAgZmluZEluZGV4OiBmdW5jdGlvbiBmaW5kSW5kZXgoY2FsbGJhY2tmbiAvKiAsIHRoYXQgPSB1bmRlZmluZWQgKi8pIHtcbiAgICByZXR1cm4gJGZpbmRJbmRleCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKEZJTkRfSU5ERVgpO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5maW5kLWluZGV4Jyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuZmluZEluZGV4O1xuIiwidmFyIGZpbmRJbmRleCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZmluZC1pbmRleCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5maW5kSW5kZXg7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5maW5kSW5kZXgpID8gZmluZEluZGV4IDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9maW5kLWluZGV4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9maW5kLWluZGV4XCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaWx0ZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmlsdGVyO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdmaWx0ZXInKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkZmlsdGVyKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZpbHRlcicpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmZpbHRlcjtcbiIsInZhciBmaWx0ZXIgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2ZpbHRlcicpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5maWx0ZXI7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5maWx0ZXIpID8gZmlsdGVyIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9maWx0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbHRlclwiKTsiLCJ2YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyByZWR1Y2UsIHJlZHVjZVJpZ2h0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfUklHSFQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBjYWxsYmFja2ZuLCBhcmd1bWVudHNMZW5ndGgsIG1lbW8pIHtcbiAgICBhRnVuY3Rpb24oY2FsbGJhY2tmbik7XG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGF0KTtcbiAgICB2YXIgc2VsZiA9IEluZGV4ZWRPYmplY3QoTyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSBJU19SSUdIVCA/IGxlbmd0aCAtIDEgOiAwO1xuICAgIHZhciBpID0gSVNfUklHSFQgPyAtMSA6IDE7XG4gICAgaWYgKGFyZ3VtZW50c0xlbmd0aCA8IDIpIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgICAgICBtZW1vID0gc2VsZltpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXggKz0gaTtcbiAgICAgIGlmIChJU19SSUdIVCA/IGluZGV4IDwgMCA6IGxlbmd0aCA8PSBpbmRleCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICg7SVNfUklHSFQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpIGlmIChpbmRleCBpbiBzZWxmKSB7XG4gICAgICBtZW1vID0gY2FsbGJhY2tmbihtZW1vLCBzZWxmW2luZGV4XSwgaW5kZXgsIE8pO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnJlZHVjZVxuICBsZWZ0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucmVkdWNlcmlnaHRcbiAgcmlnaHQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRyZWR1Y2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktcmVkdWNlJykubGVmdDtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcbnZhciBDSFJPTUVfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdyZWR1Y2UnKTtcbi8vIENocm9tZSA4MC04MiBoYXMgYSBjcml0aWNhbCBidWdcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTEwNDk5ODJcbnZhciBDSFJPTUVfQlVHID0gIUlTX05PREUgJiYgQ0hST01FX1ZFUlNJT04gPiA3OSAmJiBDSFJPTUVfVkVSU0lPTiA8IDgzO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5yZWR1Y2VcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFTVFJJQ1RfTUVUSE9EIHx8IENIUk9NRV9CVUcgfSwge1xuICByZWR1Y2U6IGZ1bmN0aW9uIHJlZHVjZShjYWxsYmFja2ZuIC8qICwgaW5pdGlhbFZhbHVlICovKSB7XG4gICAgcmV0dXJuICRyZWR1Y2UodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkucmVkdWNlJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykucmVkdWNlO1xuIiwidmFyIHJlZHVjZSA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvcmVkdWNlJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LnJlZHVjZTtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLnJlZHVjZSkgPyByZWR1Y2UgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3JlZHVjZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvcmVkdWNlXCIpOyIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpLmY7XG5cbi8vIGBPYmplY3QueyBlbnRyaWVzLCB2YWx1ZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUT19FTlRSSUVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChpdCk7XG4gICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKE8pO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGkpIHtcbiAgICAgIGtleSA9IGtleXNbaSsrXTtcbiAgICAgIGlmICghREVTQ1JJUFRPUlMgfHwgcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChPLCBrZXkpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFRPX0VOVFJJRVMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgT2JqZWN0LmVudHJpZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4gIGVudHJpZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYE9iamVjdC52YWx1ZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC52YWx1ZXNcbiAgdmFsdWVzOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGVudHJpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLWFycmF5JykuZW50cmllcztcblxuLy8gYE9iamVjdC5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmVudHJpZXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlIH0sIHtcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcyhPKSB7XG4gICAgcmV0dXJuICRlbnRyaWVzKE8pO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmVudHJpZXMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC5lbnRyaWVzO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9lbnRyaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9vYmplY3QvZW50cmllc1wiKTsiLCIvKiEgSGFtbWVyLkpTIC0gdjIuMC43IC0gMjAxNi0wNC0yMlxuICogaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSm9yaWsgVGFuZ2VsZGVyO1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlICovXG4vLyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCBleHBvcnROYW1lLCB1bmRlZmluZWQpIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIFZFTkRPUl9QUkVGSVhFUyA9IFsnJywgJ3dlYmtpdCcsICdNb3onLCAnTVMnLCAnbXMnLCAnbyddO1xudmFyIFRFU1RfRUxFTUVOVCA9ICgpID0+XG4gICAgdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG52YXIgVFlQRV9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG5cbnZhciByb3VuZCA9IE1hdGgucm91bmQ7XG52YXIgYWJzID0gTWF0aC5hYnM7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCB3ZSB3YW50IHRvIGV4ZWN1dGUgdGhlIGZuIG9uIGVhY2ggZW50cnlcbiAqIGlmIGl0IGFpbnQgYW4gYXJyYXkgd2UgZG9uJ3Qgd2FudCB0byBkbyBhIHRoaW5nLlxuICogdGhpcyBpcyB1c2VkIGJ5IGFsbCB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIHNpbmdsZSBhbmQgYXJyYXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp8QXJyYXl9IGFyZ1xuICogQHBhcmFtIHtTdHJpbmd9IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHRdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW52b2tlQXJyYXlBcmcoYXJnLCBmbiwgY29udGV4dCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgZWFjaChhcmcsIGNvbnRleHRbZm5dLCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiB3YWxrIG9iamVjdHMgYW5kIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKCFvYmopIHJldHVybjtcblxuICAgIGlmIChvYmouZm9yRWFjaCkge1xuICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgb2JqLmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIHNpbXBsZSBjbGFzcyBpbmhlcml0YW5jZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGJhc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllc11cbiAqL1xuZnVuY3Rpb24gaW5oZXJpdChjaGlsZCwgYmFzZSwgcHJvcGVydGllcykge1xuICAgIHZhciBiYXNlUCA9IGJhc2UucHJvdG90eXBlLFxuICAgICAgICBjaGlsZFA7XG5cbiAgICBjaGlsZFAgPSBjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGJhc2VQKTtcbiAgICBjaGlsZFAuY29uc3RydWN0b3IgPSBjaGlsZDtcbiAgICBjaGlsZFAuX3N1cGVyID0gYmFzZVA7XG5cbiAgICBpZiAocHJvcGVydGllcykgT2JqZWN0LmFzc2lnbihjaGlsZFAsIHByb3BlcnRpZXMpO1xufVxuXG4vKipcbiAqIGxldCBhIGJvb2xlYW4gdmFsdWUgYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgbXVzdCByZXR1cm4gYSBib29sZWFuXG4gKiB0aGlzIGZpcnN0IGl0ZW0gaW4gYXJncyB3aWxsIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gdmFsXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJnc11cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBib29sT3JGbih2YWwsIGFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PSBUWVBFX0ZVTkNUSU9OKSB7XG4gICAgICAgIHJldHVybiB2YWwuYXBwbHkoYXJncyA/IGFyZ3NbMF0gfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiB1c2UgdGhlIHZhbDIgd2hlbiB2YWwxIGlzIHVuZGVmaW5lZFxuICogQHBhcmFtIHsqfSB2YWwxXG4gKiBAcGFyYW0geyp9IHZhbDJcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBpZlVuZGVmaW5lZCh2YWwxLCB2YWwyKSB7XG4gICAgcmV0dXJuIHZhbDEgPT09IHVuZGVmaW5lZCA/IHZhbDIgOiB2YWwxO1xufVxuXG4vKipcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIHNwbGl0U3RyKHR5cGVzKS5mb3JFYWNoKCh0eXBlKSA9PlxuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSlcbiAgICApO1xufVxuXG4vKipcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIHNwbGl0U3RyKHR5cGVzKS5mb3JFYWNoKCh0eXBlKSA9PlxuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSlcbiAgICApO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBub2RlIGlzIGluIHRoZSBnaXZlbiBwYXJlbnRcbiAqIEBtZXRob2QgaGFzUGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGhhc1BhcmVudChub2RlLCBwYXJlbnQpIHtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnQpIHJldHVybiB0cnVlO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogc21hbGwgaW5kZXhPZiB3cmFwcGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHJldHVybnMge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGluU3RyKHN0ciwgZmluZCkge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihmaW5kKSA+IC0xO1xufVxuXG4vKipcbiAqIHNwbGl0IHN0cmluZyBvbiB3aGl0ZXNwYWNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7QXJyYXl9IHdvcmRzXG4gKi9cbmZ1bmN0aW9uIHNwbGl0U3RyKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KC9cXHMrL2cpO1xufVxuXG4vKipcbiAqIGNvbnZlcnQgYXJyYXktbGlrZSBvYmplY3RzIHRvIHJlYWwgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAob2JqKSA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmosIDApO1xuXG4vKipcbiAqIHVuaXF1ZSBhcnJheSB3aXRoIG9iamVjdHMgYmFzZWQgb24gYSBrZXkgKGxpa2UgJ2lkJykgb3IganVzdCBieSB0aGUgYXJyYXkncyB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gc3JjIFt7aWQ6MX0se2lkOjJ9LHtpZDoxfV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuICogQHBhcmFtIHtCb29sZWFufSBbc29ydD1GYWxzZV1cbiAqIEByZXR1cm5zIHtBcnJheX0gW3tpZDoxfSx7aWQ6Mn1dXG4gKi9cbmZ1bmN0aW9uIHVuaXF1ZUFycmF5KGFycmF5LCBrZXksIHNvcnQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGFycmF5LmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgdmFyIHZhbCA9IGtleSA/IGl0ZW1ba2V5XSA6IGl0ZW07XG4gICAgICAgIGlmICh2YWx1ZXMuaW5kZXhPZih2YWwpIDwgMCkgcmVzdWx0cy5wdXNoKGl0ZW0pO1xuICAgICAgICB2YWx1ZXNbaV0gPSB2YWw7XG4gICAgfSk7XG5cbiAgICBpZiAoc29ydCkgcmVzdWx0cy5zb3J0KCFrZXkgPyB1bmRlZmluZWQgOiAoYSwgYikgPT4gYVtrZXldID4gYltrZXldKTtcblxuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG4vKipcbiAqIGdldCB0aGUgcHJlZml4ZWQgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHJldHVybnMge1N0cmluZ3xVbmRlZmluZWR9IHByZWZpeGVkXG4gKi9cbmZ1bmN0aW9uIHByZWZpeGVkKG9iaiwgcHJvcGVydHkpIHtcbiAgICBjb25zdCBjYW1lbFByb3AgPSBwcm9wZXJ0eVswXS50b1VwcGVyQ2FzZSgpICsgcHJvcGVydHkuc2xpY2UoMSk7XG5cbiAgICByZXR1cm4gVkVORE9SX1BSRUZJWEVTLmZpbmQoXG4gICAgICAgIChwcmVmaXgpID0+IChwcmVmaXggPyBwcmVmaXggKyBjYW1lbFByb3AgOiBwcm9wZXJ0eSkgaW4gb2JqXG4gICAgKTtcbn1cblxuLyoqXG4gKiBnZXQgYSB1bmlxdWUgaWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHVuaXF1ZUlkXG4gKi9cbmxldCBfdW5pcXVlSWQgPSAxO1xuY29uc3QgdW5pcXVlSWQgPSAoKSA9PiBfdW5pcXVlSWQrKztcblxuLyoqXG4gKiBnZXQgdGhlIHdpbmRvdyBvYmplY3Qgb2YgYW4gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0RvY3VtZW50Vmlld3xXaW5kb3d9XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgIHZhciBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZWxlbWVudDtcbiAgICByZXR1cm4gKFxuICAgICAgICBkb2MuZGVmYXVsdFZpZXcgfHxcbiAgICAgICAgZG9jLnBhcmVudFdpbmRvdyB8fFxuICAgICAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93KVxuICAgICk7XG59XG5cbnZhciBNT0JJTEVfUkVHRVggPSAvbW9iaWxlfHRhYmxldHxpcChhZHxob25lfG9kKXxhbmRyb2lkL2k7XG5cbnZhciBTVVBQT1JUX1RPVUNIID0gKCkgPT5cbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG52YXIgU1VQUE9SVF9QT0lOVEVSX0VWRU5UUyA9ICgpID0+XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcmVmaXhlZCh3aW5kb3csICdQb2ludGVyRXZlbnQnKSAhPT0gdW5kZWZpbmVkO1xudmFyIFNVUFBPUlRfT05MWV9UT1VDSCA9ICgpID0+XG4gICAgU1VQUE9SVF9UT1VDSCgpICYmIE1PQklMRV9SRUdFWC50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG52YXIgSU5QVVRfVFlQRV9UT1VDSCA9ICd0b3VjaCc7XG52YXIgSU5QVVRfVFlQRV9QRU4gPSAncGVuJztcbnZhciBJTlBVVF9UWVBFX01PVVNFID0gJ21vdXNlJztcbnZhciBJTlBVVF9UWVBFX0tJTkVDVCA9ICdraW5lY3QnO1xuXG52YXIgQ09NUFVURV9JTlRFUlZBTCA9IDI1O1xuXG52YXIgSU5QVVRfU1RBUlQgPSAxO1xudmFyIElOUFVUX01PVkUgPSAyO1xudmFyIElOUFVUX0VORCA9IDQ7XG52YXIgSU5QVVRfQ0FOQ0VMID0gODtcblxudmFyIERJUkVDVElPTl9OT05FID0gMTtcbnZhciBESVJFQ1RJT05fTEVGVCA9IDI7XG52YXIgRElSRUNUSU9OX1JJR0hUID0gNDtcbnZhciBESVJFQ1RJT05fVVAgPSA4O1xudmFyIERJUkVDVElPTl9ET1dOID0gMTY7XG5cbnZhciBESVJFQ1RJT05fSE9SSVpPTlRBTCA9IERJUkVDVElPTl9MRUZUIHwgRElSRUNUSU9OX1JJR0hUO1xudmFyIERJUkVDVElPTl9WRVJUSUNBTCA9IERJUkVDVElPTl9VUCB8IERJUkVDVElPTl9ET1dOO1xudmFyIERJUkVDVElPTl9BTEwgPSBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTDtcblxudmFyIFBST1BTX1hZID0gWyd4JywgJ3knXTtcbnZhciBQUk9QU19DTElFTlRfWFkgPSBbJ2NsaWVudFgnLCAnY2xpZW50WSddO1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSW5wdXQobWFuYWdlciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIHRoaXMudGFyZ2V0ID0gbWFuYWdlci5vcHRpb25zLmlucHV0VGFyZ2V0O1xuXG4gICAgLy8gc21hbGxlciB3cmFwcGVyIGFyb3VuZCB0aGUgaGFuZGxlciwgZm9yIHRoZSBzY29wZSBhbmQgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIG1hbmFnZXIsXG4gICAgLy8gc28gd2hlbiBkaXNhYmxlZCB0aGUgaW5wdXQgZXZlbnRzIGFyZSBjb21wbGV0ZWx5IGJ5cGFzc2VkLlxuICAgIHRoaXMuZG9tSGFuZGxlciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoYm9vbE9yRm4obWFuYWdlci5vcHRpb25zLmVuYWJsZSwgW21hbmFnZXJdKSkge1xuICAgICAgICAgICAgc2VsZi5oYW5kbGVyKGV2KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbn1cblxuSW5wdXQucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNob3VsZCBoYW5kbGUgdGhlIGlucHV0RXZlbnQgZGF0YSBhbmQgdHJpZ2dlciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIGhhbmRsZXIoKSB7fSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJlxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiZcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVycyhcbiAgICAgICAgICAgICAgICBnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksXG4gICAgICAgICAgICAgICAgdGhpcy5ldldpbixcbiAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXJcbiAgICAgICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJlxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiZcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKFxuICAgICAgICAgICAgICAgIGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICB0aGlzLmV2V2luLFxuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlclxuICAgICAgICAgICAgKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBjYWxsZWQgYnkgdGhlIE1hbmFnZXIgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0SW5zdGFuY2UobWFuYWdlcikge1xuICAgIGNvbnN0IGlucHV0Q2xhc3MgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRDbGFzcztcblxuICAgIGxldCBUeXBlO1xuICAgIGlmIChpbnB1dENsYXNzKSB7XG4gICAgICAgIFR5cGUgPSBpbnB1dENsYXNzO1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9QT0lOVEVSX0VWRU5UUygpKSB7XG4gICAgICAgIFR5cGUgPSBQb2ludGVyRXZlbnRJbnB1dDtcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfT05MWV9UT1VDSCgpKSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaElucHV0O1xuICAgIH0gZWxzZSBpZiAoIVNVUFBPUlRfVE9VQ0goKSkge1xuICAgICAgICBUeXBlID0gTW91c2VJbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBUeXBlID0gVG91Y2hNb3VzZUlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFR5cGUobWFuYWdlciwgaW5wdXRIYW5kbGVyKTtcbn1cblxuLyoqXG4gKiBoYW5kbGUgaW5wdXQgZXZlbnRzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIobWFuYWdlciwgZXZlbnRUeXBlLCBpbnB1dCkge1xuICAgIHZhciBwb2ludGVyc0xlbiA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgY2hhbmdlZFBvaW50ZXJzTGVuID0gaW5wdXQuY2hhbmdlZFBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgaXNGaXJzdCA9XG4gICAgICAgIGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwO1xuICAgIHZhciBpc0ZpbmFsID1cbiAgICAgICAgZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiZcbiAgICAgICAgcG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDA7XG5cbiAgICBpbnB1dC5pc0ZpcnN0ID0gISFpc0ZpcnN0O1xuICAgIGlucHV0LmlzRmluYWwgPSAhIWlzRmluYWw7XG5cbiAgICBpZiAoaXNGaXJzdCkgbWFuYWdlci5zZXNzaW9uID0ge307XG5cbiAgICAvLyBzb3VyY2UgZXZlbnQgaXMgdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGRvbUV2ZW50c1xuICAgIC8vIGxpa2UgJ3RvdWNoc3RhcnQsIG1vdXNldXAsIHBvaW50ZXJkb3duJ1xuICAgIGlucHV0LmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcblxuICAgIC8vIGNvbXB1dGUgc2NhbGUsIHJvdGF0aW9uIGV0Y1xuICAgIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpO1xuXG4gICAgLy8gZW1pdCBzZWNyZXQgZXZlbnRcbiAgICBtYW5hZ2VyLmVtaXQoJ2hhbW1lci5pbnB1dCcsIGlucHV0KTtcblxuICAgIG1hbmFnZXIucmVjb2duaXplKGlucHV0KTtcbiAgICBtYW5hZ2VyLnNlc3Npb24ucHJldklucHV0ID0gaW5wdXQ7XG59XG5cbi8qKlxuICogZXh0ZW5kIHRoZSBkYXRhIHdpdGggc29tZSB1c2FibGUgcHJvcGVydGllcyBsaWtlIHNjYWxlLCByb3RhdGUsIHZlbG9jaXR5IGV0Y1xuICogQHBhcmFtIHtPYmplY3R9IG1hbmFnZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KSB7XG4gICAgdmFyIHNlc3Npb24gPSBtYW5hZ2VyLnNlc3Npb247XG4gICAgdmFyIHBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnM7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gc3RvcmUgdGhlIGZpcnN0IGlucHV0IHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYW5kIGRpcmVjdGlvblxuICAgIGlmICghc2Vzc2lvbi5maXJzdElucHV0KSBzZXNzaW9uLmZpcnN0SW5wdXQgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG5cbiAgICAvLyB0byBjb21wdXRlIHNjYWxlIGFuZCByb3RhdGlvbiB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBtdWx0aXBsZSB0b3VjaGVzXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID4gMSAmJiAhc2Vzc2lvbi5maXJzdE11bHRpcGxlKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaXJzdElucHV0ID0gc2Vzc2lvbi5maXJzdElucHV0O1xuICAgIHZhciBmaXJzdE11bHRpcGxlID0gc2Vzc2lvbi5maXJzdE11bHRpcGxlO1xuICAgIHZhciBvZmZzZXRDZW50ZXIgPSBmaXJzdE11bHRpcGxlID8gZmlyc3RNdWx0aXBsZS5jZW50ZXIgOiBmaXJzdElucHV0LmNlbnRlcjtcblxuICAgIHZhciBjZW50ZXIgPSAoaW5wdXQuY2VudGVyID0gZ2V0Q2VudGVyKHBvaW50ZXJzKSk7XG4gICAgaW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgaW5wdXQuZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gZmlyc3RJbnB1dC50aW1lU3RhbXA7XG5cbiAgICBpbnB1dC5hbmdsZSA9IGdldEFuZ2xlKG9mZnNldENlbnRlciwgY2VudGVyKTtcbiAgICBpbnB1dC5kaXN0YW5jZSA9IGdldERpc3RhbmNlKG9mZnNldENlbnRlciwgY2VudGVyKTtcblxuICAgIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KTtcbiAgICBpbnB1dC5vZmZzZXREaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuXG4gICAgdmFyIG92ZXJhbGxWZWxvY2l0eSA9IGdldFZlbG9jaXR5KFxuICAgICAgICBpbnB1dC5kZWx0YVRpbWUsXG4gICAgICAgIGlucHV0LmRlbHRhWCxcbiAgICAgICAgaW5wdXQuZGVsdGFZXG4gICAgKTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYID0gb3ZlcmFsbFZlbG9jaXR5Lng7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WSA9IG92ZXJhbGxWZWxvY2l0eS55O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eSA9XG4gICAgICAgIGFicyhvdmVyYWxsVmVsb2NpdHkueCkgPiBhYnMob3ZlcmFsbFZlbG9jaXR5LnkpXG4gICAgICAgICAgICA/IG92ZXJhbGxWZWxvY2l0eS54XG4gICAgICAgICAgICA6IG92ZXJhbGxWZWxvY2l0eS55O1xuXG4gICAgaW5wdXQuc2NhbGUgPSBmaXJzdE11bHRpcGxlXG4gICAgICAgID8gZ2V0U2NhbGUoZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpXG4gICAgICAgIDogMTtcbiAgICBpbnB1dC5yb3RhdGlvbiA9IGZpcnN0TXVsdGlwbGVcbiAgICAgICAgPyBnZXRSb3RhdGlvbihmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycylcbiAgICAgICAgOiAwO1xuXG4gICAgaW5wdXQubWF4UG9pbnRlcnMgPSAhc2Vzc2lvbi5wcmV2SW5wdXRcbiAgICAgICAgPyBpbnB1dC5wb2ludGVycy5sZW5ndGhcbiAgICAgICAgOiBpbnB1dC5wb2ludGVycy5sZW5ndGggPiBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVyc1xuICAgICAgICA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aFxuICAgICAgICA6IHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzO1xuXG4gICAgY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KTtcblxuICAgIC8vIGZpbmQgdGhlIGNvcnJlY3QgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoaGFzUGFyZW50KGlucHV0LnNyY0V2ZW50LnRhcmdldCwgdGFyZ2V0KSlcbiAgICAgICAgdGFyZ2V0ID0gaW5wdXQuc3JjRXZlbnQudGFyZ2V0O1xuICAgIGlucHV0LnRhcmdldCA9IHRhcmdldDtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyO1xuICAgIHZhciBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldklucHV0ID0gc2Vzc2lvbi5wcmV2SW5wdXQgfHwge307XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9TVEFSVCB8fCBwcmV2SW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9FTkQpIHtcbiAgICAgICAgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBwcmV2SW5wdXQuZGVsdGFYIHx8IDAsXG4gICAgICAgICAgICB5OiBwcmV2SW5wdXQuZGVsdGFZIHx8IDBcbiAgICAgICAgfTtcblxuICAgICAgICBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhID0ge1xuICAgICAgICAgICAgeDogY2VudGVyLngsXG4gICAgICAgICAgICB5OiBjZW50ZXIueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlucHV0LmRlbHRhWCA9IHByZXZEZWx0YS54ICsgKGNlbnRlci54IC0gb2Zmc2V0LngpO1xuICAgIGlucHV0LmRlbHRhWSA9IHByZXZEZWx0YS55ICsgKGNlbnRlci55IC0gb2Zmc2V0LnkpO1xufVxuXG4vKipcbiAqIHZlbG9jaXR5IGlzIGNhbGN1bGF0ZWQgZXZlcnkgeCBtc1xuICogQHBhcmFtIHtPYmplY3R9IHNlc3Npb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgbGFzdCA9IHNlc3Npb24ubGFzdEludGVydmFsIHx8IGlucHV0LFxuICAgICAgICBkZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBsYXN0LnRpbWVTdGFtcCxcbiAgICAgICAgdmVsb2NpdHksXG4gICAgICAgIHZlbG9jaXR5WCxcbiAgICAgICAgdmVsb2NpdHlZLFxuICAgICAgICBkaXJlY3Rpb247XG5cbiAgICBpZiAoXG4gICAgICAgIGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9DQU5DRUwgJiZcbiAgICAgICAgKGRlbHRhVGltZSA+IENPTVBVVEVfSU5URVJWQUwgfHwgbGFzdC52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICkge1xuICAgICAgICB2YXIgZGVsdGFYID0gaW5wdXQuZGVsdGFYIC0gbGFzdC5kZWx0YVg7XG4gICAgICAgIHZhciBkZWx0YVkgPSBpbnB1dC5kZWx0YVkgLSBsYXN0LmRlbHRhWTtcblxuICAgICAgICB2YXIgdiA9IGdldFZlbG9jaXR5KGRlbHRhVGltZSwgZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgICB2ZWxvY2l0eVggPSB2Lng7XG4gICAgICAgIHZlbG9jaXR5WSA9IHYueTtcbiAgICAgICAgdmVsb2NpdHkgPSBhYnModi54KSA+IGFicyh2LnkpID8gdi54IDogdi55O1xuICAgICAgICBkaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIHNlc3Npb24ubGFzdEludGVydmFsID0gaW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXNlIGxhdGVzdCB2ZWxvY2l0eSBpbmZvIGlmIGl0IGRvZXNuJ3Qgb3ZlcnRha2UgYSBtaW5pbXVtIHBlcmlvZFxuICAgICAgICB2ZWxvY2l0eSA9IGxhc3QudmVsb2NpdHk7XG4gICAgICAgIHZlbG9jaXR5WCA9IGxhc3QudmVsb2NpdHlYO1xuICAgICAgICB2ZWxvY2l0eVkgPSBsYXN0LnZlbG9jaXR5WTtcbiAgICAgICAgZGlyZWN0aW9uID0gbGFzdC5kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgaW5wdXQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBpbnB1dC52ZWxvY2l0eVggPSB2ZWxvY2l0eVg7XG4gICAgaW5wdXQudmVsb2NpdHlZID0gdmVsb2NpdHlZO1xuICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBzaW1wbGUgY2xvbmUgZnJvbSB0aGUgaW5wdXQgdXNlZCBmb3Igc3RvcmFnZSBvZiBmaXJzdElucHV0IGFuZCBmaXJzdE11bHRpcGxlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9IGNsb25lZElucHV0RGF0YVxuICovXG5mdW5jdGlvbiBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCkge1xuICAgIC8vIG1ha2UgYSBzaW1wbGUgY29weSBvZiB0aGUgcG9pbnRlcnMgYmVjYXVzZSB3ZSB3aWxsIGdldCBhIHJlZmVyZW5jZSBpZiB3ZSBkb24ndFxuICAgIC8vIHdlIG9ubHkgbmVlZCBjbGllbnRYWSBmb3IgdGhlIGNhbGN1bGF0aW9uc1xuICAgIGNvbnN0IHBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubWFwKChwb2ludGVyKSA9PiAoe1xuICAgICAgICBjbGllbnRYOiByb3VuZChwb2ludGVyLmNsaWVudFgpLFxuICAgICAgICBjbGllbnRZOiByb3VuZChwb2ludGVyLmNsaWVudFkpXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGltZVN0YW1wOiBub3coKSxcbiAgICAgICAgcG9pbnRlcnM6IHBvaW50ZXJzLFxuICAgICAgICBjZW50ZXI6IGdldENlbnRlcihwb2ludGVycyksXG4gICAgICAgIGRlbHRhWDogaW5wdXQuZGVsdGFYLFxuICAgICAgICBkZWx0YVk6IGlucHV0LmRlbHRhWVxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBjZW50ZXIgb2YgYWxsIHRoZSBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gcG9pbnRlcnNcbiAqIEByZXR1cm4ge09iamVjdH0gY2VudGVyIGNvbnRhaW5zIGB4YCBhbmQgYHlgIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKHBvaW50ZXJzKSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gbm8gbmVlZCB0byBsb29wIHdoZW4gb25seSBvbmUgdG91Y2hcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFgpLFxuICAgICAgICAgICAgeTogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuICAgIHBvaW50ZXJzLmZvckVhY2goKHtjbGllbnRYLCBjbGllbnRZfSkgPT4ge1xuICAgICAgICB4ICs9IGNsaWVudFg7XG4gICAgICAgIHkgKz0gY2xpZW50WTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHJvdW5kKHggLyBwb2ludGVyc0xlbmd0aCksXG4gICAgICAgIHk6IHJvdW5kKHkgLyBwb2ludGVyc0xlbmd0aClcbiAgICB9O1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHkgYmV0d2VlbiB0d28gcG9pbnRzLiB1bml0IGlzIGluIHB4IHBlciBtcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVRpbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7T2JqZWN0fSB2ZWxvY2l0eSBgeGAgYW5kIGB5YFxuICovXG5jb25zdCBnZXRWZWxvY2l0eSA9IChkZWx0YVRpbWUsIHgsIHkpID0+ICh7XG4gICAgeDogeCAvIGRlbHRhVGltZSB8fCAwLFxuICAgIHk6IHkgLyBkZWx0YVRpbWUgfHwgMFxufSk7XG5cbi8qKlxuICogZ2V0IHRoZSBkaXJlY3Rpb24gYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge051bWJlcn0gZGlyZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgaWYgKHggPT09IHkpIHJldHVybiBESVJFQ1RJT05fTk9ORTtcblxuICAgIGlmIChhYnMoeCkgPj0gYWJzKHkpKSByZXR1cm4geCA8IDAgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcblxuICAgIHJldHVybiB5IDwgMCA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYWJzb2x1dGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gcDEge3gsIHl9XG4gKiBAcGFyYW0ge09iamVjdH0gcDIge3gsIHl9XG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpc3RhbmNlXG4gKi9cbmNvbnN0IGdldERpc3RhbmNlID0gKHAxLCBwMiwgW3hLZXksIHlLZXldID0gUFJPUFNfWFkpID0+XG4gICAgTWF0aC5zcXJ0KFxuICAgICAgICBNYXRoLnBvdyhwMlt4S2V5XSAtIHAxW3hLZXldLCAyKSArIE1hdGgucG93KHAyW3lLZXldIC0gcDFbeUtleV0sIDIpXG4gICAgKTtcblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcDFcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMlxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBhbmdsZVxuICovXG5jb25zdCBnZXRBbmdsZSA9IChwMSwgcDIsIFt4S2V5LCB5S2V5XSA9IFBST1BTX1hZKSA9PlxuICAgIChNYXRoLmF0YW4yKHAyW3lLZXldIC0gcDFbeUtleV0sIHAyW3hLZXldIC0gcDFbeEtleV0pICogMTgwKSAvIE1hdGguUEk7XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSByb3RhdGlvbiBkZWdyZWVzIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHJvdGF0aW9uXG4gKi9cbmNvbnN0IGdldFJvdGF0aW9uID0gKHN0YXJ0LCBlbmQpID0+XG4gICAgZ2V0QW5nbGUoZW5kWzFdLCBlbmRbMF0sIFBST1BTX0NMSUVOVF9YWSkgK1xuICAgIGdldEFuZ2xlKHN0YXJ0WzFdLCBzdGFydFswXSwgUFJPUFNfQ0xJRU5UX1hZKTtcblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHNjYWxlIGZhY3RvciBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogbm8gc2NhbGUgaXMgMSwgYW5kIGdvZXMgZG93biB0byAwIHdoZW4gcGluY2hlZCB0b2dldGhlciwgYW5kIGJpZ2dlciB3aGVuIHBpbmNoZWQgb3V0XG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHNjYWxlXG4gKi9cbmNvbnN0IGdldFNjYWxlID0gKHN0YXJ0LCBlbmQpID0+XG4gICAgZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0sIFBST1BTX0NMSUVOVF9YWSkgL1xuICAgIGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSwgUFJPUFNfQ0xJRU5UX1hZKTtcblxudmFyIE1PVVNFX0lOUFVUX01BUCA9IHtcbiAgICBtb3VzZWRvd246IElOUFVUX1NUQVJULFxuICAgIG1vdXNlbW92ZTogSU5QVVRfTU9WRSxcbiAgICBtb3VzZXVwOiBJTlBVVF9FTkRcbn07XG5cbnZhciBNT1VTRV9FTEVNRU5UX0VWRU5UUyA9ICdtb3VzZWRvd24nO1xudmFyIE1PVVNFX1dJTkRPV19FVkVOVFMgPSAnbW91c2Vtb3ZlIG1vdXNldXAnO1xuXG4vKipcbiAqIE1vdXNlIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBNb3VzZUlucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IE1PVVNFX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBNT1VTRV9XSU5ET1dfRVZFTlRTO1xuXG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7IC8vIG1vdXNlZG93biBzdGF0ZVxuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBNT1VTRV9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gb24gc3RhcnQgd2Ugd2FudCB0byBoYXZlIHRoZSBsZWZ0IG1vdXNlIGJ1dHRvbiBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiBldi5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfTU9WRSAmJiBldi53aGljaCAhPT0gMSkge1xuICAgICAgICAgICAgZXZlbnRUeXBlID0gSU5QVVRfRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmICghdGhpcy5wcmVzc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBQT0lOVEVSX0lOUFVUX01BUCA9IHtcbiAgICBwb2ludGVyZG93bjogSU5QVVRfU1RBUlQsXG4gICAgcG9pbnRlcm1vdmU6IElOUFVUX01PVkUsXG4gICAgcG9pbnRlcnVwOiBJTlBVVF9FTkQsXG4gICAgcG9pbnRlcmNhbmNlbDogSU5QVVRfQ0FOQ0VMLFxuICAgIHBvaW50ZXJvdXQ6IElOUFVUX0NBTkNFTFxufTtcblxuLy8gaW4gSUUxMCB0aGUgcG9pbnRlciB0eXBlcyBpcyBkZWZpbmVkIGFzIGFuIGVudW1cbnZhciBJRTEwX1BPSU5URVJfVFlQRV9FTlVNID0ge1xuICAgIDI6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgMzogSU5QVVRfVFlQRV9QRU4sXG4gICAgNDogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICA1OiBJTlBVVF9UWVBFX0tJTkVDVCAvLyBzZWUgaHR0cHM6Ly90d2l0dGVyLmNvbS9qYWNvYnJvc3NpL3N0YXR1cy80ODA1OTY0Mzg0ODk4OTA4MTZcbn07XG5cbnZhciBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ3BvaW50ZXJkb3duJztcbnZhciBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAncG9pbnRlcm1vdmUgcG9pbnRlcnVwIHBvaW50ZXJjYW5jZWwnO1xuXG4vLyBJRTEwIGhhcyBwcmVmaXhlZCBzdXBwb3J0LCBhbmQgY2FzZS1zZW5zaXRpdmVcbmlmIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHdpbmRvdy5NU1BvaW50ZXJFdmVudCAmJlxuICAgICF3aW5kb3cuUG9pbnRlckV2ZW50XG4pIHtcbiAgICBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ01TUG9pbnRlckRvd24nO1xuICAgIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdNU1BvaW50ZXJNb3ZlIE1TUG9pbnRlclVwIE1TUG9pbnRlckNhbmNlbCc7XG59XG5cbi8qKlxuICogUG9pbnRlciBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gUG9pbnRlckV2ZW50SW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gUE9JTlRFUl9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gUE9JTlRFUl9XSU5ET1dfRVZFTlRTO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RvcmUgPSB0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wb2ludGVyRXZlbnRzID0gW107XG59XG5cbmluaGVyaXQoUG9pbnRlckV2ZW50SW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICAgICAgdmFyIHJlbW92ZVBvaW50ZXIgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZXZlbnRUeXBlTm9ybWFsaXplZCA9IGV2LnR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdtcycsICcnKTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IFBPSU5URVJfSU5QVVRfTUFQW2V2ZW50VHlwZU5vcm1hbGl6ZWRdO1xuICAgICAgICB2YXIgcG9pbnRlclR5cGUgPVxuICAgICAgICAgICAgSUUxMF9QT0lOVEVSX1RZUEVfRU5VTVtldi5wb2ludGVyVHlwZV0gfHwgZXYucG9pbnRlclR5cGU7XG5cbiAgICAgICAgdmFyIGlzVG91Y2ggPSBwb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIO1xuXG4gICAgICAgIC8vIGdldCBpbmRleCBvZiB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHZhciBzdG9yZUluZGV4ID0gc3RvcmUuZmluZEluZGV4KFxuICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0ucG9pbnRlcklkID09IGV2LnBvaW50ZXJJZFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHN0YXJ0IGFuZCBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChldi5idXR0b24gPT09IDAgfHwgaXNUb3VjaCkpIHtcbiAgICAgICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1c2goZXYpO1xuICAgICAgICAgICAgICAgIHN0b3JlSW5kZXggPSBzdG9yZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICByZW1vdmVQb2ludGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0IG5vdCBmb3VuZCwgc28gdGhlIHBvaW50ZXIgaGFzbid0IGJlZW4gZG93biAoc28gaXQncyBwcm9iYWJseSBhIGhvdmVyKVxuICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHJldHVybjtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICBzdG9yZVtzdG9yZUluZGV4XSA9IGV2O1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBzdG9yZSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBwb2ludGVyVHlwZSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZW1vdmUgZnJvbSB0aGUgc3RvcmVcbiAgICAgICAgaWYgKHJlbW92ZVBvaW50ZXIpIHN0b3JlLnNwbGljZShzdG9yZUluZGV4LCAxKTtcbiAgICB9XG59KTtcblxudmFyIFNJTkdMRV9UT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQnO1xudmFyIFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBUb3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gU2luZ2xlVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTaW5nbGVUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXIoc3JjRXZlbnQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQW3NyY0V2ZW50LnR5cGVdO1xuXG4gICAgICAgIC8vIHNob3VsZCB3ZSBoYW5kbGUgdGhlIHRvdWNoIGV2ZW50cz9cbiAgICAgICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSByZXR1cm47XG5cbiAgICAgICAgdmFyIFtwb2ludGVycywgY2hhbmdlZFBvaW50ZXJzXSA9IG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMoXG4gICAgICAgICAgICBzcmNFdmVudCxcbiAgICAgICAgICAgIHR5cGVcbiAgICAgICAgKTtcblxuICAgICAgICAvLyB3aGVuIGRvbmUsIHJlc2V0IHRoZSBzdGFydGVkIHN0YXRlXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJlxuICAgICAgICAgICAgcG9pbnRlcnMubGVuZ3RoIC0gY2hhbmdlZFBvaW50ZXJzLmxlbmd0aCA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudFxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplU2luZ2xlVG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGwgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciBjaGFuZ2VkID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyk7XG5cbiAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIGFsbCA9IHVuaXF1ZUFycmF5KGFsbC5jb25jYXQoY2hhbmdlZCksICdpZGVudGlmaWVyJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFthbGwsIGNoYW5nZWRdO1xufVxuXG52YXIgVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBUT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBNdWx0aS11c2VyIHRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBUT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMudGFyZ2V0SWRzID0ge307XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFRPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBnZXRUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuICAgICAgICBpZiAoIXRvdWNoZXMpIHJldHVybjtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGxUb3VjaGVzID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgdGFyZ2V0SWRzID0gdGhpcy50YXJnZXRJZHM7XG5cbiAgICAvLyB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIHRvdWNoLCB0aGUgcHJvY2VzcyBjYW4gYmUgc2ltcGxpZmllZFxuICAgIGlmICh0eXBlICYgKElOUFVUX1NUQVJUIHwgSU5QVVRfTU9WRSkgJiYgYWxsVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGFyZ2V0SWRzW2FsbFRvdWNoZXNbMF0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gW2FsbFRvdWNoZXMsIGFsbFRvdWNoZXNdO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRUb3VjaGVzLFxuICAgICAgICBjaGFuZ2VkVG91Y2hlcyA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyA9IFtdLFxuICAgICAgICB0YXJnZXQgPSB0aGlzLnRhcmdldDtcblxuICAgIC8vIGdldCB0YXJnZXQgdG91Y2hlcyBmcm9tIHRvdWNoZXNcbiAgICB0YXJnZXRUb3VjaGVzID0gYWxsVG91Y2hlcy5maWx0ZXIoKHRvdWNoKSA9PlxuICAgICAgICBoYXNQYXJlbnQodG91Y2gudGFyZ2V0LCB0YXJnZXQpXG4gICAgKTtcblxuICAgIC8vIGNvbGxlY3QgdG91Y2hlc1xuICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICB0YXJnZXRUb3VjaGVzLmZvckVhY2goKHRhcmdldFRvdWNoKSA9PiB7XG4gICAgICAgICAgICB0YXJnZXRJZHNbdGFyZ2V0VG91Y2guaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgY2hhbmdlZCB0b3VjaGVzIHRvIG9ubHkgY29udGFpbiB0b3VjaGVzIHRoYXQgZXhpc3QgaW4gdGhlIGNvbGxlY3RlZCB0YXJnZXQgaWRzXG4gICAgY2hhbmdlZFRvdWNoZXMuZm9yRWFjaCgoY2hhbmdlZFRvdWNoKSA9PiB7XG4gICAgICAgIGlmICh0YXJnZXRJZHNbY2hhbmdlZFRvdWNoLmlkZW50aWZpZXJdKVxuICAgICAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMucHVzaChjaGFuZ2VkVG91Y2gpO1xuXG4gICAgICAgIC8vIGNsZWFudXAgcmVtb3ZlZCB0b3VjaGVzXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpXG4gICAgICAgICAgICBkZWxldGUgdGFyZ2V0SWRzW2NoYW5nZWRUb3VjaC5pZGVudGlmaWVyXTtcbiAgICB9KTtcblxuICAgIGlmICghY2hhbmdlZFRhcmdldFRvdWNoZXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICByZXR1cm4gW1xuICAgICAgICAvLyBtZXJnZSB0YXJnZXRUb3VjaGVzIHdpdGggY2hhbmdlZFRhcmdldFRvdWNoZXMgc28gaXQgY29udGFpbnMgQUxMIHRvdWNoZXMsIGluY2x1ZGluZyAnZW5kJyBhbmQgJ2NhbmNlbCdcbiAgICAgICAgdW5pcXVlQXJyYXkoXG4gICAgICAgICAgICB0YXJnZXRUb3VjaGVzLmNvbmNhdChjaGFuZ2VkVGFyZ2V0VG91Y2hlcyksXG4gICAgICAgICAgICAnaWRlbnRpZmllcicsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzXG4gICAgXTtcbn1cblxuLyoqXG4gKiBDb21iaW5lZCB0b3VjaCBhbmQgbW91c2UgaW5wdXRcbiAqXG4gKiBUb3VjaCBoYXMgYSBoaWdoZXIgcHJpb3JpdHkgdGhlbiBtb3VzZSwgYW5kIHdoaWxlIHRvdWNoaW5nIG5vIG1vdXNlIGV2ZW50cyBhcmUgYWxsb3dlZC5cbiAqIFRoaXMgYmVjYXVzZSB0b3VjaCBkZXZpY2VzIGFsc28gZW1pdCBtb3VzZSBldmVudHMgd2hpbGUgZG9pbmcgYSB0b3VjaC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cblxudmFyIERFRFVQX1RJTUVPVVQgPSAyNTAwO1xudmFyIERFRFVQX0RJU1RBTkNFID0gMjU7XG5cbmZ1bmN0aW9uIFRvdWNoTW91c2VJbnB1dCgpIHtcbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRvdWNoID0gbmV3IFRvdWNoSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcbiAgICB0aGlzLm1vdXNlID0gbmV3IE1vdXNlSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcblxuICAgIHRoaXMucHJpbWFyeVRvdWNoID0gbnVsbDtcbiAgICB0aGlzLmxhc3RUb3VjaGVzID0gW107XG59XG5cbmluaGVyaXQoVG91Y2hNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBhbmQgdG91Y2ggZXZlbnRzXG4gICAgICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRFdmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICBoYW5kbGVyKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgaXNUb3VjaCA9IGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgaXNNb3VzZSA9IGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX01PVVNFO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGlzTW91c2UgJiZcbiAgICAgICAgICAgIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMgJiZcbiAgICAgICAgICAgIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMuZmlyZXNUb3VjaEV2ZW50c1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gd2UncmUgaW4gYSB0b3VjaCBldmVudCwgcmVjb3JkIHRvdWNoZXMgdG8gIGRlLWR1cGUgc3ludGhldGljIG1vdXNlIGV2ZW50XG4gICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICByZWNvcmRUb3VjaGVzLmNhbGwodGhpcywgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc01vdXNlICYmIGlzU3ludGhldGljRXZlbnQuY2FsbCh0aGlzLCBpbnB1dERhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50b3VjaC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMubW91c2UuZGVzdHJveSgpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiByZWNvcmRUb3VjaGVzKGV2ZW50VHlwZSwgZXZlbnREYXRhKSB7XG4gICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeVRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXS5pZGVudGlmaWVyO1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldExhc3RUb3VjaChldmVudERhdGEpIHtcbiAgICB2YXIgdG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdO1xuXG4gICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMucHJpbWFyeVRvdWNoKSB7XG4gICAgICAgIHZhciBsYXN0VG91Y2ggPSB7eDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WX07XG4gICAgICAgIHRoaXMubGFzdFRvdWNoZXMucHVzaChsYXN0VG91Y2gpO1xuICAgICAgICB2YXIgbHRzID0gdGhpcy5sYXN0VG91Y2hlcztcbiAgICAgICAgdmFyIHJlbW92ZUxhc3RUb3VjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpID0gbHRzLmluZGV4T2YobGFzdFRvdWNoKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRUaW1lb3V0KHJlbW92ZUxhc3RUb3VjaCwgREVEVVBfVElNRU9VVCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bnRoZXRpY0V2ZW50KHtzcmNFdmVudDoge2NsaWVudFgsIGNsaWVudFl9fSkge1xuICAgIHJldHVybiAhIXRoaXMubGFzdFRvdWNoZXMuZmluZChcbiAgICAgICAgKGxhc3RUb3VjaCkgPT5cbiAgICAgICAgICAgIE1hdGguYWJzKGNsaWVudFggLSBsYXN0VG91Y2gueCkgPD0gREVEVVBfRElTVEFOQ0UgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGNsaWVudFkgLSBsYXN0VG91Y2gueSkgPD0gREVEVVBfRElTVEFOQ0VcbiAgICApO1xufVxuXG52YXIgUFJFRklYRURfVE9VQ0hfQUNUSU9OID0gKCkgPT4ge1xuICAgIGNvbnN0IHRlID0gVEVTVF9FTEVNRU5UKCk7XG4gICAgaWYgKHRlKSByZXR1cm4gcHJlZml4ZWQodGUuc3R5bGUsICd0b3VjaEFjdGlvbicpO1xufTtcbnZhciBOQVRJVkVfVE9VQ0hfQUNUSU9OID0gKCkgPT4gUFJFRklYRURfVE9VQ0hfQUNUSU9OKCkgIT09IHVuZGVmaW5lZDtcblxuLy8gbWFnaWNhbCB0b3VjaEFjdGlvbiB2YWx1ZVxudmFyIFRPVUNIX0FDVElPTl9DT01QVVRFID0gJ2NvbXB1dGUnO1xudmFyIFRPVUNIX0FDVElPTl9BVVRPID0gJ2F1dG8nO1xudmFyIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04gPSAnbWFuaXB1bGF0aW9uJzsgLy8gbm90IGltcGxlbWVudGVkXG52YXIgVE9VQ0hfQUNUSU9OX05PTkUgPSAnbm9uZSc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9YID0gJ3Bhbi14JztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1kgPSAncGFuLXknO1xuXG4vKipcbiAqIFRvdWNoIEFjdGlvblxuICogc2V0cyB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgb3IgdXNlcyB0aGUganMgYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVG91Y2hBY3Rpb24obWFuYWdlciwgdmFsdWUpIHtcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuc2V0KHZhbHVlKTtcbn1cblxuVG91Y2hBY3Rpb24ucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWUgb24gdGhlIGVsZW1lbnQgb3IgZW5hYmxlIHRoZSBwb2x5ZmlsbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAvLyBmaW5kIG91dCB0aGUgdG91Y2gtYWN0aW9uIGJ5IHRoZSBldmVudCBoYW5kbGVyc1xuICAgICAgICBpZiAodmFsdWUgPT0gVE9VQ0hfQUNUSU9OX0NPTVBVVEUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jb21wdXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgVE9VQ0hfQUNUSU9OX01BUCA9IGdldFRvdWNoQWN0aW9uUHJvcHMoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgTkFUSVZFX1RPVUNIX0FDVElPTigpICYmXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZSAmJlxuICAgICAgICAgICAgVE9VQ0hfQUNUSU9OX01BUFt2YWx1ZV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZVtQUkVGSVhFRF9UT1VDSF9BQ1RJT04oKV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICoganVzdCByZS1zZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLm1hbmFnZXIub3B0aW9ucy50b3VjaEFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvbXB1dGUgdGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgYmFzZWQgb24gdGhlIHJlY29nbml6ZXIncyBzZXR0aW5nc1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgY29tcHV0ZSgpIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnJlY29nbml6ZXJzLmZvckVhY2goKHJlY29nbml6ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChib29sT3JGbihyZWNvZ25pemVyLm9wdGlvbnMuZW5hYmxlLCBbcmVjb2duaXplcl0pKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IGFjdGlvbnMuY29uY2F0KHJlY29nbml6ZXIuZ2V0VG91Y2hBY3Rpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucy5qb2luKCcgJykpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgb24gZWFjaCBpbnB1dCBjeWNsZSBhbmQgcHJvdmlkZXMgdGhlIHByZXZlbnRpbmcgb2YgdGhlIGJyb3dzZXIgYmVoYXZpb3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBwcmV2ZW50RGVmYXVsdHMoaW5wdXQpIHtcbiAgICAgICAgdmFyIHNyY0V2ZW50ID0gaW5wdXQuc3JjRXZlbnQ7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5vZmZzZXREaXJlY3Rpb247XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvdWNoIGFjdGlvbiBkaWQgcHJldmVudGVkIG9uY2UgdGhpcyBzZXNzaW9uXG4gICAgICAgIGlmICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIFRPVUNIX0FDVElPTl9NQVAgPSBnZXRUb3VjaEFjdGlvblByb3BzKCk7XG4gICAgICAgIHZhciBoYXNOb25lID1cbiAgICAgICAgICAgIGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSAmJlxuICAgICAgICAgICAgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgICAgICB2YXIgaGFzUGFuWSA9XG4gICAgICAgICAgICBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpICYmXG4gICAgICAgICAgICAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1ldO1xuICAgICAgICB2YXIgaGFzUGFuWCA9XG4gICAgICAgICAgICBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpICYmXG4gICAgICAgICAgICAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1hdO1xuXG4gICAgICAgIGlmIChoYXNOb25lKSB7XG4gICAgICAgICAgICAvL2RvIG5vdCBwcmV2ZW50IGRlZmF1bHRzIGlmIHRoaXMgaXMgYSB0YXAgZ2VzdHVyZVxuXG4gICAgICAgICAgICB2YXIgaXNUYXBQb2ludGVyID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSAxO1xuICAgICAgICAgICAgdmFyIGlzVGFwTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IDI7XG4gICAgICAgICAgICB2YXIgaXNUYXBUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCAyNTA7XG5cbiAgICAgICAgICAgIGlmIChpc1RhcFBvaW50ZXIgJiYgaXNUYXBNb3ZlbWVudCAmJiBpc1RhcFRvdWNoVGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgICAgIC8vIGBwYW4teCBwYW4teWAgbWVhbnMgYnJvd3NlciBoYW5kbGVzIGFsbCBzY3JvbGxpbmcvcGFubmluZywgZG8gbm90IHByZXZlbnRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGhhc05vbmUgfHxcbiAgICAgICAgICAgIChoYXNQYW5ZICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB8fFxuICAgICAgICAgICAgKGhhc1BhblggJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnRTcmMoc3JjRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGwgcHJldmVudERlZmF1bHQgdG8gcHJldmVudCB0aGUgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3IgKHNjcm9sbGluZyBpbiBtb3N0IGNhc2VzKVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcmNFdmVudFxuICAgICAqL1xuICAgIHByZXZlbnRTcmMoc3JjRXZlbnQpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIHdoZW4gdGhlIHRvdWNoQWN0aW9ucyBhcmUgY29sbGVjdGVkIHRoZXkgYXJlIG5vdCBhIHZhbGlkIHZhbHVlLCBzbyB3ZSBuZWVkIHRvIGNsZWFuIHRoaW5ncyB1cC4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zKSB7XG4gICAgLy8gbm9uZVxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkpIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcblxuICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSk7XG5cbiAgICAvLyBpZiBib3RoIHBhbi14IGFuZCBwYW4teSBhcmUgc2V0IChkaWZmZXJlbnQgcmVjb2duaXplcnNcbiAgICAvLyBmb3IgZGlmZmVyZW50IGRpcmVjdGlvbnMsIGUuZy4gaG9yaXpvbnRhbCBwYW4gYnV0IHZlcnRpY2FsIHN3aXBlPylcbiAgICAvLyB3ZSBuZWVkIG5vbmUgKGFzIG90aGVyd2lzZSB3aXRoIHBhbi14IHBhbi15IGNvbWJpbmVkIG5vbmUgb2YgdGhlc2VcbiAgICAvLyByZWNvZ25pemVycyB3aWxsIHdvcmssIHNpbmNlIHRoZSBicm93c2VyIHdvdWxkIGhhbmRsZSBhbGwgcGFubmluZ1xuICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcblxuICAgIC8vIHBhbi14IE9SIHBhbi15XG4gICAgaWYgKGhhc1BhblggfHwgaGFzUGFuWSlcbiAgICAgICAgcmV0dXJuIGhhc1BhblggPyBUT1VDSF9BQ1RJT05fUEFOX1ggOiBUT1VDSF9BQ1RJT05fUEFOX1k7XG5cbiAgICAvLyBtYW5pcHVsYXRpb25cbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTikpXG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OO1xuXG4gICAgcmV0dXJuIFRPVUNIX0FDVElPTl9BVVRPO1xufVxuXG5jb25zdCB0b3VjaFZhbHMgPSBbXG4gICAgJ2F1dG8nLFxuICAgICdtYW5pcHVsYXRpb24nLFxuICAgICdwYW4teScsXG4gICAgJ3Bhbi14JyxcbiAgICAncGFuLXggcGFuLXknLFxuICAgICdub25lJ1xuXTtcbmZ1bmN0aW9uIGdldFRvdWNoQWN0aW9uUHJvcHMoKSB7XG4gICAgaWYgKCFOQVRJVkVfVE9VQ0hfQUNUSU9OKCkpIHJldHVybiBmYWxzZTtcbiAgICB2YXIgY3NzU3VwcG9ydHMgPVxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuQ1NTICYmIHdpbmRvdy5DU1Muc3VwcG9ydHM7XG4gICAgcmV0dXJuIHRvdWNoVmFscy5yZWR1Y2UoKHRvdWNoTWFwLCB2YWwpID0+IHtcbiAgICAgICAgLy8gSWYgY3NzLnN1cHBvcnRzIGlzIG5vdCBzdXBwb3J0ZWQgYnV0IHRoZXJlIGlzIG5hdGl2ZSB0b3VjaC1hY3Rpb24gYXNzdW1lIGl0IHN1cHBvcnRzXG4gICAgICAgIC8vIGFsbCB2YWx1ZXMuIFRoaXMgaXMgdGhlIGNhc2UgZm9yIElFIDEwIGFuZCAxMS5cbiAgICAgICAgdG91Y2hNYXBbdmFsXSA9IGNzc1N1cHBvcnRzXG4gICAgICAgICAgICA/IHdpbmRvdy5DU1Muc3VwcG9ydHMoJ3RvdWNoLWFjdGlvbicsIHZhbClcbiAgICAgICAgICAgIDogdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdG91Y2hNYXA7XG4gICAgfSwge30pO1xufVxuXG4vKipcbiAqIFJlY29nbml6ZXIgZmxvdyBleHBsYWluZWQ7ICpcbiAqIEFsbCByZWNvZ25pemVycyBoYXZlIHRoZSBpbml0aWFsIHN0YXRlIG9mIFBPU1NJQkxFIHdoZW4gYSBpbnB1dCBzZXNzaW9uIHN0YXJ0cy5cbiAqIFRoZSBkZWZpbml0aW9uIG9mIGEgaW5wdXQgc2Vzc2lvbiBpcyBmcm9tIHRoZSBmaXJzdCBpbnB1dCB1bnRpbCB0aGUgbGFzdCBpbnB1dCwgd2l0aCBhbGwgaXQncyBtb3ZlbWVudCBpbiBpdC4gKlxuICogRXhhbXBsZSBzZXNzaW9uIGZvciBtb3VzZS1pbnB1dDogbW91c2Vkb3duIC0+IG1vdXNlbW92ZSAtPiBtb3VzZXVwXG4gKlxuICogT24gZWFjaCByZWNvZ25pemluZyBjeWNsZSAoc2VlIE1hbmFnZXIucmVjb2duaXplKSB0aGUgLnJlY29nbml6ZSgpIG1ldGhvZCBpcyBleGVjdXRlZFxuICogd2hpY2ggZGV0ZXJtaW5lcyB3aXRoIHN0YXRlIGl0IHNob3VsZCBiZS5cbiAqXG4gKiBJZiB0aGUgcmVjb2duaXplciBoYXMgdGhlIHN0YXRlIEZBSUxFRCwgQ0FOQ0VMTEVEIG9yIFJFQ09HTklaRUQgKGVxdWFscyBFTkRFRCksIGl0IGlzIHJlc2V0IHRvXG4gKiBQT1NTSUJMRSB0byBnaXZlIGl0IGFub3RoZXIgY2hhbmdlIG9uIHRoZSBuZXh0IGN5Y2xlLlxuICpcbiAqICAgICAgICAgICAgICAgUG9zc2libGVcbiAqICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICArLS0tLS0rLS0tLS0tLS0tLS0tLS0tK1xuICogICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICArLS0tLS0rLS0tLS0rICAgICAgICAgICAgICAgfFxuICogICAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgICAgfFxuICogICBGYWlsZWQgICAgICBDYW5jZWxsZWQgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLStcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICBSZWNvZ25pemVkICAgICAgIEJlZ2FuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRlZC9SZWNvZ25pemVkXG4gKi9cbnZhciBTVEFURV9QT1NTSUJMRSA9IDE7XG52YXIgU1RBVEVfQkVHQU4gPSAyO1xudmFyIFNUQVRFX0NIQU5HRUQgPSA0O1xudmFyIFNUQVRFX0VOREVEID0gODtcbnZhciBTVEFURV9SRUNPR05JWkVEID0gU1RBVEVfRU5ERUQ7XG52YXIgU1RBVEVfQ0FOQ0VMTEVEID0gMTY7XG52YXIgU1RBVEVfRkFJTEVEID0gMzI7XG5cbi8qKlxuICogUmVjb2duaXplclxuICogRXZlcnkgcmVjb2duaXplciBuZWVkcyB0byBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBSZWNvZ25pemVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7Li4udGhpcy5kZWZhdWx0cywgLi4ub3B0aW9uc307XG5cbiAgICB0aGlzLmlkID0gdW5pcXVlSWQoKTtcblxuICAgIHRoaXMubWFuYWdlciA9IG51bGw7XG5cbiAgICAvLyBkZWZhdWx0IGlzIGVuYWJsZSB0cnVlXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZSA9IGlmVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5lbmFibGUsIHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuXG4gICAgdGhpcy5zaW11bHRhbmVvdXMgPSB7fTtcbiAgICB0aGlzLnJlcXVpcmVGYWlsID0gW107XG59XG5cblJlY29nbml6ZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBkZWZhdWx0czoge30sXG5cbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7UmVjb2duaXplcn1cbiAgICAgKi9cbiAgICBzZXQob3B0aW9ucykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gYWxzbyB1cGRhdGUgdGhlIHRvdWNoQWN0aW9uLCBpbiBjYXNlIHNvbWV0aGluZyBjaGFuZ2VkIGFib3V0IHRoZSBkaXJlY3Rpb25zL2VuYWJsZWQgc3RhdGVcbiAgICAgICAgdGhpcy5tYW5hZ2VyICYmIHRoaXMubWFuYWdlci50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZWNvZ25pemVXaXRoKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVjb2duaXplV2l0aCcsIHRoaXMpKSByZXR1cm4gdGhpcztcblxuICAgICAgICB2YXIgc2ltdWx0YW5lb3VzID0gdGhpcy5zaW11bHRhbmVvdXM7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKCFzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSkge1xuICAgICAgICAgICAgc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0gPSBvdGhlclJlY29nbml6ZXI7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVjb2duaXplV2l0aCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgc2ltdWx0YW5lb3VzIGxpbmsuIGl0IGRvZXNudCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZWNvZ25pemVXaXRoKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlY29nbml6ZVdpdGgnLCB0aGlzKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemVyIGNhbiBvbmx5IHJ1biB3aGVuIGFuIG90aGVyIGlzIGZhaWxpbmdcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVxdWlyZUZhaWx1cmUob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZXF1aXJlRmFpbHVyZScsIHRoaXMpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVGYWlsID0gdGhpcy5yZXF1aXJlRmFpbDtcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAocmVxdWlyZUZhaWwuaW5kZXhPZihvdGhlclJlY29nbml6ZXIpID09PSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZUZhaWwucHVzaChvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSByZXF1aXJlRmFpbHVyZSBsaW5rLiBpdCBkb2VzIG5vdCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZXF1aXJlRmFpbHVyZShvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZXF1aXJlRmFpbHVyZScsIHRoaXMpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnJlcXVpcmVGYWlsLmluZGV4T2Yob3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHRoaXMucmVxdWlyZUZhaWwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGhhcyByZXF1aXJlIGZhaWx1cmVzIGJvb2xlYW5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNSZXF1aXJlRmFpbHVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCA+IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlmIHRoZSByZWNvZ25pemVyIGNhbiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuUmVjb2duaXplV2l0aChvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogWW91IHNob3VsZCB1c2UgYHRyeUVtaXRgIGluc3RlYWQgb2YgYGVtaXRgIGRpcmVjdGx5IHRvIGNoZWNrXG4gICAgICogdGhhdCBhbGwgdGhlIG5lZWRlZCByZWNvZ25pemVycyBoYXMgZmFpbGVkIGJlZm9yZSBlbWl0dGluZy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBlbWl0KGlucHV0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLm1hbmFnZXIuZW1pdChldmVudCwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJ3BhbnN0YXJ0JyBhbmQgJ3Bhbm1vdmUnXG4gICAgICAgIGlmIChzdGF0ZSA8IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCk7IC8vIHNpbXBsZSAnZXZlbnROYW1lJyBldmVudHNcblxuICAgICAgICBpZiAoaW5wdXQuYWRkaXRpb25hbEV2ZW50KSB7XG4gICAgICAgICAgICAvLyBhZGRpdGlvbmFsIGV2ZW50KHBhbmxlZnQsIHBhbnJpZ2h0LCBwaW5jaGluLCBwaW5jaG91dC4uLilcbiAgICAgICAgICAgIGVtaXQoaW5wdXQuYWRkaXRpb25hbEV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBhbmVuZCBhbmQgcGFuY2FuY2VsXG4gICAgICAgIGlmIChzdGF0ZSA+PSBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoYXQgYWxsIHRoZSByZXF1aXJlIGZhaWx1cmUgcmVjb2duaXplcnMgaGFzIGZhaWxlZCxcbiAgICAgKiBpZiB0cnVlLCBpdCBlbWl0cyBhIGdlc3R1cmUgZXZlbnQsXG4gICAgICogb3RoZXJ3aXNlLCBzZXR1cCB0aGUgc3RhdGUgdG8gRkFJTEVELlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHRyeUVtaXQoaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuRW1pdCgpKSByZXR1cm4gdGhpcy5lbWl0KGlucHV0KTtcblxuICAgICAgICAvLyBpdCdzIGZhaWxpbmcgYW55d2F5XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbiB3ZSBlbWl0P1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNhbkVtaXQoKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEodGhpcy5yZXF1aXJlRmFpbFtpXS5zdGF0ZSAmIChTVEFURV9GQUlMRUQgfCBTVEFURV9QT1NTSUJMRSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSB0aGUgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemUoaW5wdXREYXRhKSB7XG4gICAgICAgIC8vIG1ha2UgYSBuZXcgY29weSBvZiB0aGUgaW5wdXREYXRhXG4gICAgICAgIC8vIHNvIHdlIGNhbiBjaGFuZ2UgdGhlIGlucHV0RGF0YSB3aXRob3V0IG1lc3NpbmcgdXAgdGhlIG90aGVyIHJlY29nbml6ZXJzXG4gICAgICAgIHZhciBpbnB1dERhdGFDbG9uZSA9IHsuLi5pbnB1dERhdGF9O1xuXG4gICAgICAgIC8vIGlzIGlzIGVuYWJsZWQgYW5kIGFsbG93IHJlY29nbml6aW5nP1xuICAgICAgICBpZiAoIWJvb2xPckZuKHRoaXMub3B0aW9ucy5lbmFibGUsIFt0aGlzLCBpbnB1dERhdGFDbG9uZV0pKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB3ZSd2ZSByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfUkVDT0dOSVpFRCB8IFNUQVRFX0NBTkNFTExFRCB8IFNUQVRFX0ZBSUxFRCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnByb2Nlc3MoaW5wdXREYXRhQ2xvbmUpO1xuXG4gICAgICAgIC8vIHRoZSByZWNvZ25pemVyIGhhcyByZWNvZ25pemVkIGEgZ2VzdHVyZVxuICAgICAgICAvLyBzbyB0cmlnZ2VyIGFuIGV2ZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgJlxuICAgICAgICAgICAgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEIHwgU1RBVEVfQ0FOQ0VMTEVEKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMudHJ5RW1pdChpbnB1dERhdGFDbG9uZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBzdGF0ZSBvZiB0aGUgcmVjb2duaXplclxuICAgICAqIHRoZSBhY3R1YWwgcmVjb2duaXppbmcgaGFwcGVucyBpbiB0aGlzIG1ldGhvZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqIEByZXR1cm5zIHtDb25zdH0gU1RBVEVcbiAgICAgKi9cbiAgICBwcm9jZXNzKCkge30sIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBwcmVmZXJyZWQgdG91Y2gtYWN0aW9uXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0VG91Y2hBY3Rpb24oKSB7fSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBnZXN0dXJlIGlzbid0IGFsbG93ZWQgdG8gcmVjb2duaXplXG4gICAgICogbGlrZSB3aGVuIGFub3RoZXIgaXMgYmVpbmcgcmVjb2duaXplZCBvciBpdCBpcyBkaXNhYmxlZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgcmVzZXQoKSB7fVxufTtcblxuLyoqXG4gKiBnZXQgYSB1c2FibGUgc3RyaW5nLCB1c2VkIGFzIGV2ZW50IHBvc3RmaXhcbiAqIEBwYXJhbSB7Q29uc3R9IHN0YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdGF0ZVxuICovXG5mdW5jdGlvbiBzdGF0ZVN0cihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSAmIFNUQVRFX0NBTkNFTExFRCkge1xuICAgICAgICByZXR1cm4gJ2NhbmNlbCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0VOREVEKSB7XG4gICAgICAgIHJldHVybiAnZW5kJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQ0hBTkdFRCkge1xuICAgICAgICByZXR1cm4gJ21vdmUnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9CRUdBTikge1xuICAgICAgICByZXR1cm4gJ3N0YXJ0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGRpcmVjdGlvbiBjb25zIHRvIHN0cmluZ1xuICogQHBhcmFtIHtDb25zdH0gZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBkaXJlY3Rpb25TdHIoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fRE9XTikge1xuICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9VUCkge1xuICAgICAgICByZXR1cm4gJ3VwJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fTEVGVCkge1xuICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9SSUdIVCkge1xuICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGdldCBhIHJlY29nbml6ZXIgYnkgbmFtZSBpZiBpdCBpcyBib3VuZCB0byBhIG1hbmFnZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IG90aGVyUmVjb2duaXplclxuICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gKiBAcmV0dXJucyB7UmVjb2duaXplcn1cbiAqL1xuY29uc3QgZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlciA9IChvdGhlclJlY29nbml6ZXIsIHttYW5hZ2VyfSkgPT5cbiAgICBtYW5hZ2VyID8gbWFuYWdlci5nZXQob3RoZXJSZWNvZ25pemVyKSA6IG90aGVyUmVjb2duaXplcjtcblxuLyoqXG4gKiBUaGlzIHJlY29nbml6ZXIgaXMganVzdCB1c2VkIGFzIGEgYmFzZSBmb3IgdGhlIHNpbXBsZSBhdHRyaWJ1dGUgcmVjb2duaXplcnMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gQXR0clJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KEF0dHJSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNoZWNrIGlmIGl0IHRoZSByZWNvZ25pemVyIHJlY2VpdmVzIHZhbGlkIGlucHV0LCBsaWtlIGlucHV0LmRpc3RhbmNlID4gMTAuXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHJlY29nbml6ZWRcbiAgICAgKi9cbiAgICBhdHRyVGVzdChpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9uUG9pbnRlcnMgPSB0aGlzLm9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHJldHVybiBvcHRpb25Qb2ludGVycyA9PT0gMCB8fCBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvblBvaW50ZXJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIHRoZSBpbnB1dCBhbmQgcmV0dXJuIHRoZSBzdGF0ZSBmb3IgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Kn0gU3RhdGVcbiAgICAgKi9cbiAgICBwcm9jZXNzKGlucHV0KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBpbnB1dC5ldmVudFR5cGU7XG5cbiAgICAgICAgdmFyIGlzUmVjb2duaXplZCA9IHN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5hdHRyVGVzdChpbnB1dCk7XG5cbiAgICAgICAgLy8gb24gY2FuY2VsIGlucHV0IGFuZCB3ZSd2ZSByZWNvZ25pemVkIGJlZm9yZSwgcmV0dXJuIFNUQVRFX0NBTkNFTExFRFxuICAgICAgICBpZiAoaXNSZWNvZ25pemVkICYmIChldmVudFR5cGUgJiBJTlBVVF9DQU5DRUwgfHwgIWlzVmFsaWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DQU5DRUxMRUQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNSZWNvZ25pemVkIHx8IGlzVmFsaWQpIHtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9FTkRFRDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShzdGF0ZSAmIFNUQVRFX0JFR0FOKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NIQU5HRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQYW5cbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGFuZCBtb3ZlZCBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBhblJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucFggPSBudWxsO1xuICAgIHRoaXMucFkgPSBudWxsO1xufVxuXG5pbmhlcml0KFBhblJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQYW5SZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwYW4nLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fQUxMXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uKCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcblxuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1kpO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSxcblxuICAgIGRpcmVjdGlvblRlc3QoaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciBoYXNNb3ZlZCA9IHRydWU7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGlucHV0LmRpc3RhbmNlO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgeCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdmFyIHkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgLy8gbG9jayB0byBheGlzP1xuICAgICAgICBpZiAoIShkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgeCA9PT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBESVJFQ1RJT05fTk9ORVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB4IDwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBESVJFQ1RJT05fTEVGVFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB4ICE9IHRoaXMucFg7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPVxuICAgICAgICAgICAgICAgICAgICB5ID09PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IERJUkVDVElPTl9OT05FXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHkgPCAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IERJUkVDVElPTl9VUFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBESVJFQ1RJT05fRE9XTjtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHkgIT0gdGhpcy5wWTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaGFzTW92ZWQgJiZcbiAgICAgICAgICAgIGRpc3RhbmNlID4gb3B0aW9ucy50aHJlc2hvbGQgJiZcbiAgICAgICAgICAgIGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIGF0dHJUZXN0KGlucHV0KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBBdHRyUmVjb2duaXplci5wcm90b3R5cGUuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgICh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4gfHxcbiAgICAgICAgICAgICAgICAoISh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pICYmIHRoaXMuZGlyZWN0aW9uVGVzdChpbnB1dCkpKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBlbWl0KGlucHV0KSB7XG4gICAgICAgIHRoaXMucFggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHRoaXMucFkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5kaXJlY3Rpb24pO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24pIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbjtcblxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBpbmNoXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlcnMgYXJlIG1vdmluZyB0b3dhcmQgKHpvb20taW4pIG9yIGF3YXkgZnJvbSBlYWNoIG90aGVyICh6b29tLW91dCkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBpbmNoUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFBpbmNoUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGluY2gnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3QoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQuc2NhbGUgLSAxKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIGVtaXQoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICB2YXIgaW5PdXQgPSBpbnB1dC5zY2FsZSA8IDEgPyAnaW4nIDogJ291dCc7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBpbk91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFByZXNzXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBmb3IgeCBtcyB3aXRob3V0IGFueSBtb3ZlbWVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQcmVzc1JlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbn1cblxuaW5oZXJpdChQcmVzc1JlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFByZXNzUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncHJlc3MnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGltZTogMjUxLCAvLyBtaW5pbWFsIHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgcHJlc3NlZFxuICAgICAgICB0aHJlc2hvbGQ6IDkgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX0FVVE9dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUaW1lID0gaW5wdXQuZGVsdGFUaW1lID4gb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdmFsaWRNb3ZlbWVudCB8fFxuICAgICAgICAgICAgIXZhbGlkUG9pbnRlcnMgfHxcbiAgICAgICAgICAgIChpbnB1dC5ldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAhdmFsaWRUaW1lKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdChpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0ICYmIGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgJ3VwJywgaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFJvdGF0ZVxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXIgYXJlIG1vdmluZyBpbiBhIGNpcmN1bGFyIG1vdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUm90YXRlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFJvdGF0ZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBSb3RhdGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdyb3RhdGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3QoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQucm90YXRpb24pID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTilcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBTd2lwZVxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIG1vdmluZyBmYXN0ICh2ZWxvY2l0eSksIHdpdGggZW5vdWdoIGRpc3RhbmNlIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gU3dpcGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU3dpcGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgU3dpcGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdzd2lwZScsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHZlbG9jaXR5OiAwLjMsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUGFuUmVjb2duaXplci5wcm90b3R5cGUuZ2V0VG91Y2hBY3Rpb24uY2FsbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3QoaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciB2ZWxvY2l0eTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgKERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgZGlyZWN0aW9uICYgaW5wdXQub2Zmc2V0RGlyZWN0aW9uICYmXG4gICAgICAgICAgICBpbnB1dC5kaXN0YW5jZSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgJiZcbiAgICAgICAgICAgIGlucHV0Lm1heFBvaW50ZXJzID09IHRoaXMub3B0aW9ucy5wb2ludGVycyAmJlxuICAgICAgICAgICAgYWJzKHZlbG9jaXR5KSA+IHRoaXMub3B0aW9ucy52ZWxvY2l0eSAmJlxuICAgICAgICAgICAgaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIGVtaXQoaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5vZmZzZXREaXJlY3Rpb24pO1xuICAgICAgICBpZiAoZGlyZWN0aW9uKSB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb24sIGlucHV0KTtcblxuICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBBIHRhcCBpcyBlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb2luZyBhIHNtYWxsIHRhcC9jbGljay4gTXVsdGlwbGUgdGFwcyBhcmUgcmVjb2duaXplZCBpZiB0aGV5IG9jY3VyXG4gKiBiZXR3ZWVuIHRoZSBnaXZlbiBpbnRlcnZhbCBhbmQgcG9zaXRpb24uIFRoZSBkZWxheSBvcHRpb24gY2FuIGJlIHVzZWQgdG8gcmVjb2duaXplIG11bHRpLXRhcHMgd2l0aG91dCBmaXJpbmdcbiAqIGEgc2luZ2xlIHRhcC5cbiAqXG4gKiBUaGUgZXZlbnREYXRhIGZyb20gdGhlIGVtaXR0ZWQgZXZlbnQgY29udGFpbnMgdGhlIHByb3BlcnR5IGB0YXBDb3VudGAsIHdoaWNoIGNvbnRhaW5zIHRoZSBhbW91bnQgb2ZcbiAqIG11bHRpLXRhcHMgYmVpbmcgcmVjb2duaXplZC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBUYXBSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIHByZXZpb3VzIHRpbWUgYW5kIGNlbnRlcixcbiAgICAvLyB1c2VkIGZvciB0YXAgY291bnRpbmdcbiAgICB0aGlzLnBUaW1lID0gZmFsc2U7XG4gICAgdGhpcy5wQ2VudGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xuICAgIHRoaXMuY291bnQgPSAwO1xufVxuXG5pbmhlcml0KFRhcFJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAndGFwJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRhcHM6IDEsXG4gICAgICAgIGludGVydmFsOiAzMDAsIC8vIG1heCB0aW1lIGJldHdlZW4gdGhlIG11bHRpLXRhcCB0YXBzXG4gICAgICAgIHRpbWU6IDI1MCwgLy8gbWF4IHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgZG93biAobGlrZSBmaW5nZXIgb24gdGhlIHNjcmVlbilcbiAgICAgICAgdGhyZXNob2xkOiA5LCAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgICAgICBwb3NUaHJlc2hvbGQ6IDEwIC8vIGEgbXVsdGktdGFwIGNhbiBiZSBhIGJpdCBvZmYgdGhlIGluaXRpYWwgcG9zaXRpb25cbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTl07XG4gICAgfSxcblxuICAgIHByb2Nlc3MoaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgdGhpcy5jb3VudCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAodmFsaWRNb3ZlbWVudCAmJiB2YWxpZFRvdWNoVGltZSAmJiB2YWxpZFBvaW50ZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0VORCkgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcblxuICAgICAgICAgICAgdmFyIHZhbGlkSW50ZXJ2YWwgPSB0aGlzLnBUaW1lXG4gICAgICAgICAgICAgICAgPyBpbnB1dC50aW1lU3RhbXAgLSB0aGlzLnBUaW1lIDwgb3B0aW9ucy5pbnRlcnZhbFxuICAgICAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAgICAgICAgIHZhciB2YWxpZE11bHRpVGFwID1cbiAgICAgICAgICAgICAgICAhdGhpcy5wQ2VudGVyIHx8XG4gICAgICAgICAgICAgICAgZ2V0RGlzdGFuY2UodGhpcy5wQ2VudGVyLCBpbnB1dC5jZW50ZXIpIDwgb3B0aW9ucy5wb3NUaHJlc2hvbGQ7XG5cbiAgICAgICAgICAgIHRoaXMucFRpbWUgPSBpbnB1dC50aW1lU3RhbXA7XG4gICAgICAgICAgICB0aGlzLnBDZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRNdWx0aVRhcCB8fCAhdmFsaWRJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRhcCBjb3VudCBtYXRjaGVzIHdlIGhhdmUgcmVjb2duaXplZCBpdCxcbiAgICAgICAgICAgIC8vIGVsc2UgaXQgaGFzIGJlZ2FuIHJlY29nbml6aW5nLi4uXG4gICAgICAgICAgICB2YXIgdGFwQ291bnQgPSB0aGlzLmNvdW50ICUgb3B0aW9ucy50YXBzO1xuICAgICAgICAgICAgaWYgKHRhcENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gZmFpbGluZyByZXF1aXJlbWVudHMsIGltbWVkaWF0ZWx5IHRyaWdnZXIgdGhlIHRhcCBldmVudFxuICAgICAgICAgICAgICAgIC8vIG9yIHdhaXQgYXMgbG9uZyBhcyB0aGUgbXVsdGl0YXAgaW50ZXJ2YWwgdG8gdHJpZ2dlclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNSZXF1aXJlRmFpbHVyZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9ucy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgZmFpbFRpbWVvdXQoKSB7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwpO1xuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGFwQ291bnQgPSB0aGlzLmNvdW50O1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBTaW1wbGUgd2F5IHRvIGNyZWF0ZSBhIG1hbmFnZXIgd2l0aCBhIGRlZmF1bHQgc2V0IG9mIHJlY29nbml6ZXJzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhhbW1lcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5yZWNvZ25pemVycyA9IGlmVW5kZWZpbmVkKFxuICAgICAgICBvcHRpb25zLnJlY29nbml6ZXJzLFxuICAgICAgICBIYW1tZXIuZGVmYXVsdHMucHJlc2V0XG4gICAgKTtcbiAgICByZXR1cm4gbmV3IE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQGNvbnN0IHtzdHJpbmd9XG4gKi9cbkhhbW1lci5WRVJTSU9OID0gJzIuMC43JztcblxuLyoqXG4gKiBkZWZhdWx0IHNldHRpbmdzXG4gKiBAbmFtZXNwYWNlXG4gKi9cbkhhbW1lci5kZWZhdWx0cyA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgaWYgRE9NIGV2ZW50cyBhcmUgYmVpbmcgdHJpZ2dlcmVkLlxuICAgICAqIEJ1dCB0aGlzIGlzIHNsb3dlciBhbmQgdW51c2VkIGJ5IHNpbXBsZSBpbXBsZW1lbnRhdGlvbnMsIHNvIGRpc2FibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBkb21FdmVudHM6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkvZmFsbGJhY2suXG4gICAgICogV2hlbiBzZXQgdG8gYGNvbXB1dGVgIGl0IHdpbGwgbWFnaWNhbGx5IHNldCB0aGUgY29ycmVjdCB2YWx1ZSBiYXNlZCBvbiB0aGUgYWRkZWQgcmVjb2duaXplcnMuXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBjb21wdXRlXG4gICAgICovXG4gICAgdG91Y2hBY3Rpb246IFRPVUNIX0FDVElPTl9DT01QVVRFLFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGVuYWJsZTogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIEVYUEVSSU1FTlRBTCBGRUFUVVJFIC0tIGNhbiBiZSByZW1vdmVkL2NoYW5nZWRcbiAgICAgKiBDaGFuZ2UgdGhlIHBhcmVudCBpbnB1dCB0YXJnZXQgZWxlbWVudC5cbiAgICAgKiBJZiBOdWxsLCB0aGVuIGl0IGlzIGJlaW5nIHNldCB0aGUgdG8gbWFpbiBlbGVtZW50LlxuICAgICAqIEB0eXBlIHtOdWxsfEV2ZW50VGFyZ2V0fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dFRhcmdldDogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIGZvcmNlIGFuIGlucHV0IGNsYXNzXG4gICAgICogQHR5cGUge051bGx8RnVuY3Rpb259XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0Q2xhc3M6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHJlY29nbml6ZXIgc2V0dXAgd2hlbiBjYWxsaW5nIGBIYW1tZXIoKWBcbiAgICAgKiBXaGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIgdGhlc2Ugd2lsbCBiZSBza2lwcGVkLlxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBwcmVzZXQ6IFtcbiAgICAgICAgLy8gUmVjb2duaXplckNsYXNzLCBvcHRpb25zLCBbcmVjb2duaXplV2l0aCwgLi4uXSwgW3JlcXVpcmVGYWlsdXJlLCAuLi5dXG4gICAgICAgIFtSb3RhdGVSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX1dLFxuICAgICAgICBbUGluY2hSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX0sIFsncm90YXRlJ11dLFxuICAgICAgICBbU3dpcGVSZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH1dLFxuICAgICAgICBbUGFuUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9LCBbJ3N3aXBlJ11dLFxuICAgICAgICBbVGFwUmVjb2duaXplcl0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyLCB7ZXZlbnQ6ICdkb3VibGV0YXAnLCB0YXBzOiAyfSwgWyd0YXAnXV0sXG4gICAgICAgIFtQcmVzc1JlY29nbml6ZXJdXG4gICAgXSxcblxuICAgIC8qKlxuICAgICAqIFNvbWUgQ1NTIHByb3BlcnRpZXMgY2FuIGJlIHVzZWQgdG8gaW1wcm92ZSB0aGUgd29ya2luZyBvZiBIYW1tZXIuXG4gICAgICogQWRkIHRoZW0gdG8gdGhpcyBtZXRob2QgYW5kIHRoZXkgd2lsbCBiZSBzZXQgd2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyLlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBjc3NQcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGV4dCBzZWxlY3Rpb24gdG8gaW1wcm92ZSB0aGUgZHJhZ2dpbmcgZ2VzdHVyZS4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSB0aGUgV2luZG93cyBQaG9uZSBncmlwcGVycyB3aGVuIHByZXNzaW5nIGFuIGVsZW1lbnQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGRlZmF1bHQgY2FsbG91dCBzaG93biB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldC5cbiAgICAgICAgICogT24gaU9TLCB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldCBzdWNoIGFzIGEgbGluaywgU2FmYXJpIGRpc3BsYXlzXG4gICAgICAgICAqIGEgY2FsbG91dCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBsaW5rLiBUaGlzIHByb3BlcnR5IGFsbG93cyB5b3UgdG8gZGlzYWJsZSB0aGF0IGNhbGxvdXQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHpvb21pbmcgaXMgZW5hYmxlZC4gVXNlZCBieSBJRTEwPlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnRab29taW5nOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB0aGF0IGFuIGVudGlyZSBlbGVtZW50IHNob3VsZCBiZSBkcmFnZ2FibGUgaW5zdGVhZCBvZiBpdHMgY29udGVudHMuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyRHJhZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVycmlkZXMgdGhlIGhpZ2hsaWdodCBjb2xvciBzaG93biB3aGVuIHRoZSB1c2VyIHRhcHMgYSBsaW5rIG9yIGEgSmF2YVNjcmlwdFxuICAgICAgICAgKiBjbGlja2FibGUgZWxlbWVudCBpbiBpT1MuIFRoaXMgcHJvcGVydHkgb2JleXMgdGhlIGFscGhhIHZhbHVlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdyZ2JhKDAsMCwwLDApJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGFwSGlnaGxpZ2h0Q29sb3I6ICdyZ2JhKDAsMCwwLDApJ1xuICAgIH1cbn07XG5cbnZhciBTVE9QID0gMTtcbnZhciBGT1JDRURfU1RPUCA9IDI7XG5cbi8qKlxuICogTWFuYWdlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IHsuLi5IYW1tZXIuZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuXG4gICAgdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0ID0gdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0IHx8IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgdGhpcy5yZWNvZ25pemVycyA9IFtdO1xuICAgIHRoaXMub2xkQ3NzUHJvcHMgPSB7fTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pbnB1dCA9IGNyZWF0ZUlucHV0SW5zdGFuY2UodGhpcyk7XG4gICAgdGhpcy50b3VjaEFjdGlvbiA9IG5ldyBUb3VjaEFjdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuXG4gICAgdG9nZ2xlQ3NzUHJvcHModGhpcywgdHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlY29nbml6ZXJzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5yZWNvZ25pemVycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVjb2duaXplciA9IHRoaXMuYWRkKG5ldyBpdGVtWzBdKGl0ZW1bMV0pKTtcbiAgICAgICAgICAgIGl0ZW1bMl0gJiYgcmVjb2duaXplci5yZWNvZ25pemVXaXRoKGl0ZW1bMl0pO1xuICAgICAgICAgICAgaXRlbVszXSAmJiByZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKGl0ZW1bM10pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk1hbmFnZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICBzZXQob3B0aW9ucykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gT3B0aW9ucyB0aGF0IG5lZWQgYSBsaXR0bGUgbW9yZSBzZXR1cFxuICAgICAgICBpZiAob3B0aW9ucy50b3VjaEFjdGlvbikgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5pbnB1dFRhcmdldCkge1xuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXJzIGFuZCByZWluaXRpYWxpemVcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC50YXJnZXQgPSBvcHRpb25zLmlucHV0VGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5pbml0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogc3RvcCByZWNvZ25pemluZyBmb3IgdGhpcyBzZXNzaW9uLlxuICAgICAqIFRoaXMgc2Vzc2lvbiB3aWxsIGJlIGRpc2NhcmRlZCwgd2hlbiBhIG5ldyBbaW5wdXRdc3RhcnQgZXZlbnQgaXMgZmlyZWQuXG4gICAgICogV2hlbiBmb3JjZWQsIHRoZSByZWNvZ25pemVyIGN5Y2xlIGlzIHN0b3BwZWQgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VdXG4gICAgICovXG4gICAgc3RvcChmb3JjZSkge1xuICAgICAgICB0aGlzLnNlc3Npb24uc3RvcHBlZCA9IGZvcmNlID8gRk9SQ0VEX1NUT1AgOiBTVE9QO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBydW4gdGhlIHJlY29nbml6ZXJzIVxuICAgICAqIGNhbGxlZCBieSB0aGUgaW5wdXRIYW5kbGVyIGZ1bmN0aW9uIG9uIGV2ZXJ5IG1vdmVtZW50IG9mIHRoZSBwb2ludGVycyAodG91Y2hlcylcbiAgICAgKiBpdCB3YWxrcyB0aHJvdWdoIGFsbCB0aGUgcmVjb2duaXplcnMgYW5kIHRyaWVzIHRvIGRldGVjdCB0aGUgZ2VzdHVyZSB0aGF0IGlzIGJlaW5nIG1hZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplKGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbjtcbiAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIHJ1biB0aGUgdG91Y2gtYWN0aW9uIHBvbHlmaWxsXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24ucHJldmVudERlZmF1bHRzKGlucHV0RGF0YSk7XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcblxuICAgICAgICAvLyB0aGlzIGhvbGRzIHRoZSByZWNvZ25pemVyIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgLy8gc28gdGhlIHJlY29nbml6ZXIncyBzdGF0ZSBuZWVkcyB0byBiZSBCRUdBTiwgQ0hBTkdFRCwgRU5ERUQgb3IgUkVDT0dOSVpFRFxuICAgICAgICAvLyBpZiBubyByZWNvZ25pemVyIGlzIGRldGVjdGluZyBhIHRoaW5nLCBpdCBpcyBzZXQgdG8gYG51bGxgXG4gICAgICAgIHZhciBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyO1xuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gdGhlIGxhc3QgcmVjb2duaXplciBpcyByZWNvZ25pemVkXG4gICAgICAgIC8vIG9yIHdoZW4gd2UncmUgaW4gYSBuZXcgc2Vzc2lvblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhY3VyUmVjb2duaXplciB8fFxuICAgICAgICAgICAgKGN1clJlY29nbml6ZXIgJiYgY3VyUmVjb2duaXplci5zdGF0ZSAmIFNUQVRFX1JFQ09HTklaRUQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZWNvZ25pemVycy5mb3JFYWNoKChyZWNvZ25pemVyKSA9PiB7XG4gICAgICAgICAgICAvLyBmaW5kIG91dCBpZiB3ZSBhcmUgYWxsb3dlZCB0cnkgdG8gcmVjb2duaXplIHRoZSBpbnB1dCBmb3IgdGhpcyBvbmUuXG4gICAgICAgICAgICAvLyAxLiAgIGFsbG93IGlmIHRoZSBzZXNzaW9uIGlzIE5PVCBmb3JjZWQgc3RvcHBlZCAoc2VlIHRoZSAuc3RvcCgpIG1ldGhvZClcbiAgICAgICAgICAgIC8vIDIuICAgYWxsb3cgaWYgd2Ugc3RpbGwgaGF2ZW4ndCByZWNvZ25pemVkIGEgZ2VzdHVyZSBpbiB0aGlzIHNlc3Npb24sIG9yIHRoZSB0aGlzIHJlY29nbml6ZXIgaXMgdGhlIG9uZVxuICAgICAgICAgICAgLy8gICAgICB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgICAgICAvLyAzLiAgIGFsbG93IGlmIHRoZSByZWNvZ25pemVyIGlzIGFsbG93ZWQgdG8gcnVuIHNpbXVsdGFuZW91cyB3aXRoIHRoZSBjdXJyZW50IHJlY29nbml6ZWQgcmVjb2duaXplci5cbiAgICAgICAgICAgIC8vICAgICAgdGhpcyBjYW4gYmUgc2V0dXAgd2l0aCB0aGUgYHJlY29nbml6ZVdpdGgoKWAgbWV0aG9kIG9uIHRoZSByZWNvZ25pemVyLlxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHNlc3Npb24uc3RvcHBlZCAhPT0gRk9SQ0VEX1NUT1AgJiYgLy8gMVxuICAgICAgICAgICAgICAgICghY3VyUmVjb2duaXplciB8fFxuICAgICAgICAgICAgICAgICAgICByZWNvZ25pemVyID09IGN1clJlY29nbml6ZXIgfHwgLy8gMlxuICAgICAgICAgICAgICAgICAgICByZWNvZ25pemVyLmNhblJlY29nbml6ZVdpdGgoY3VyUmVjb2duaXplcikpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyAzXG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZWNvZ25pemUoaW5wdXREYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZXNldCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVjb2duaXplciBoYXMgYmVlbiByZWNvZ25pemluZyB0aGUgaW5wdXQgYXMgYSB2YWxpZCBnZXN0dXJlLCB3ZSB3YW50IHRvIHN0b3JlIHRoaXMgb25lIGFzIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBhY3RpdmUgcmVjb2duaXplci4gYnV0IG9ubHkgaWYgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGFuIGFjdGl2ZSByZWNvZ25pemVyXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIWN1clJlY29nbml6ZXIgJiZcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IHJlY29nbml6ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXQgYSByZWNvZ25pemVyIGJ5IGl0cyBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxOdWxsfVxuICAgICAqL1xuICAgIGdldChyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChyZWNvZ25pemVyIGluc3RhbmNlb2YgUmVjb2duaXplcikgcmV0dXJuIHJlY29nbml6ZXI7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMucmVjb2duaXplcnMuZmluZCgoe29wdGlvbnN9KSA9PiBvcHRpb25zLmV2ZW50ID09IHJlY29nbml6ZXIpIHx8XG4gICAgICAgICAgICBudWxsXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGFkZCBhIHJlY29nbml6ZXIgdG8gdGhlIG1hbmFnZXJcbiAgICAgKiBleGlzdGluZyByZWNvZ25pemVycyB3aXRoIHRoZSBzYW1lIGV2ZW50IG5hbWUgd2lsbCBiZSByZW1vdmVkXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TWFuYWdlcn1cbiAgICAgKi9cbiAgICBhZGQocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ2FkZCcsIHRoaXMpKSByZXR1cm4gdGhpcztcblxuICAgICAgICAvLyByZW1vdmUgZXhpc3RpbmdcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gdGhpcy5nZXQocmVjb2duaXplci5vcHRpb25zLmV2ZW50KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB0aGlzLnJlbW92ZShleGlzdGluZyk7XG5cbiAgICAgICAgdGhpcy5yZWNvZ25pemVycy5wdXNoKHJlY29nbml6ZXIpO1xuICAgICAgICByZWNvZ25pemVyLm1hbmFnZXIgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgYSByZWNvZ25pemVyIGJ5IG5hbWUgb3IgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgcmVtb3ZlKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdyZW1vdmUnLCB0aGlzKSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgcmVjb2duaXplciA9IHRoaXMuZ2V0KHJlY29nbml6ZXIpO1xuXG4gICAgICAgIC8vIGxldCdzIG1ha2Ugc3VyZSB0aGlzIHJlY29nbml6ZXIgZXhpc3RzXG4gICAgICAgIGlmIChyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucmVjb2duaXplcnMuaW5kZXhPZihyZWNvZ25pemVyKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb2duaXplcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkIHx8IGhhbmRsZXIgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgc3BsaXRTdHIoZXZlbnRzKS5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdID0gaGFuZGxlcnNbZXZlbnRdIHx8IFtdO1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIGV2ZW50LCBsZWF2ZSBlbWl0IGJsYW5rIHRvIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2hhbmRsZXJdXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9mZihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgc3BsaXRTdHIoZXZlbnRzKS5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50XTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlcnNbZXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdLnNwbGljZShoYW5kbGVyc1tldmVudF0uaW5kZXhPZihoYW5kbGVyKSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZW1pdCBldmVudCB0byB0aGUgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBlbWl0KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIC8vIHdlIGFsc28gd2FudCB0byB0cmlnZ2VyIGRvbSBldmVudHNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb21FdmVudHMpIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSk7XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc1tldmVudF0gJiYgdGhpcy5oYW5kbGVyc1tldmVudF0uc2xpY2UoKTtcbiAgICAgICAgLy8gbm8gaGFuZGxlcnMsIHNvIHNraXAgaXQgYWxsXG4gICAgICAgIGlmICghaGFuZGxlcnMgfHwgIWhhbmRsZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGRhdGEudHlwZSA9IGV2ZW50O1xuICAgICAgICBkYXRhLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGF0YS5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIoZGF0YSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXN0cm95IHRoZSBtYW5hZ2VyIGFuZCB1bmJpbmRzIGFsbCBldmVudHNcbiAgICAgKiBpdCBkb2Vzbid0IHVuYmluZCBkb20gZXZlbnRzLCB0aGF0IGlzIHRoZSB1c2VyIG93biByZXNwb25zaWJpbGl0eVxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCAmJiB0b2dnbGVDc3NQcm9wcyh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgICAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBhZGQvcmVtb3ZlIHRoZSBjc3MgcHJvcGVydGllcyBhcyBkZWZpbmVkIGluIG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wc1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGFkZFxuICovXG5mdW5jdGlvbiB0b2dnbGVDc3NQcm9wcyhtYW5hZ2VyLCBhZGQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudC5zdHlsZSkgcmV0dXJuO1xuXG4gICAgbGV0IHByb3A7XG4gICAgT2JqZWN0LmVudHJpZXMobWFuYWdlci5vcHRpb25zLmNzc1Byb3BzKS5mb3JFYWNoKChbdmFsdWUsIG5hbWVdKSA9PiB7XG4gICAgICAgIHByb3AgPSBwcmVmaXhlZChlbGVtZW50LnN0eWxlLCBuYW1lKTtcbiAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSA9IGVsZW1lbnQuc3R5bGVbcHJvcF07XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSB8fCAnJztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghYWRkKSBtYW5hZ2VyLm9sZENzc1Byb3BzID0ge307XG59XG5cbi8qKlxuICogdHJpZ2dlciBkb20gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqL1xuZnVuY3Rpb24gdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKSB7XG4gICAgdmFyIGdlc3R1cmVFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGdlc3R1cmVFdmVudC5pbml0RXZlbnQoZXZlbnQsIHRydWUsIHRydWUpO1xuICAgIGdlc3R1cmVFdmVudC5nZXN0dXJlID0gZGF0YTtcbiAgICBkYXRhLnRhcmdldC5kaXNwYXRjaEV2ZW50KGdlc3R1cmVFdmVudCk7XG59XG5cbk9iamVjdC5hc3NpZ24oSGFtbWVyLCB7XG4gICAgSU5QVVRfU1RBUlQsXG4gICAgSU5QVVRfTU9WRSxcbiAgICBJTlBVVF9FTkQsXG4gICAgSU5QVVRfQ0FOQ0VMLFxuXG4gICAgU1RBVEVfUE9TU0lCTEUsXG4gICAgU1RBVEVfQkVHQU4sXG4gICAgU1RBVEVfQ0hBTkdFRCxcbiAgICBTVEFURV9FTkRFRCxcbiAgICBTVEFURV9SRUNPR05JWkVELFxuICAgIFNUQVRFX0NBTkNFTExFRCxcbiAgICBTVEFURV9GQUlMRUQsXG5cbiAgICBESVJFQ1RJT05fTk9ORSxcbiAgICBESVJFQ1RJT05fTEVGVCxcbiAgICBESVJFQ1RJT05fUklHSFQsXG4gICAgRElSRUNUSU9OX1VQLFxuICAgIERJUkVDVElPTl9ET1dOLFxuICAgIERJUkVDVElPTl9IT1JJWk9OVEFMLFxuICAgIERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICBESVJFQ1RJT05fQUxMLFxuXG4gICAgTWFuYWdlcixcbiAgICBJbnB1dCxcbiAgICBUb3VjaEFjdGlvbixcblxuICAgIFRvdWNoSW5wdXQsXG4gICAgTW91c2VJbnB1dCxcbiAgICBQb2ludGVyRXZlbnRJbnB1dCxcbiAgICBUb3VjaE1vdXNlSW5wdXQsXG4gICAgU2luZ2xlVG91Y2hJbnB1dCxcblxuICAgIFJlY29nbml6ZXIsXG4gICAgQXR0clJlY29nbml6ZXIsXG4gICAgVGFwOiBUYXBSZWNvZ25pemVyLFxuICAgIFBhbjogUGFuUmVjb2duaXplcixcbiAgICBTd2lwZTogU3dpcGVSZWNvZ25pemVyLFxuICAgIFBpbmNoOiBQaW5jaFJlY29nbml6ZXIsXG4gICAgUm90YXRlOiBSb3RhdGVSZWNvZ25pemVyLFxuICAgIFByZXNzOiBQcmVzc1JlY29nbml6ZXIsXG5cbiAgICBvbjogYWRkRXZlbnRMaXN0ZW5lcnMsXG4gICAgb2ZmOiByZW1vdmVFdmVudExpc3RlbmVycyxcbiAgICBlYWNoLFxuICAgIGluaGVyaXQsXG4gICAgcHJlZml4ZWRcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhbW1lcjtcbiIsImltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IFBhZ2VTcHJlYWQgZnJvbSAnLi9wYWdlX3NwcmVhZCc7XG5pbXBvcnQgSGFtbWVyIGZyb20gJy4vdmVuZG9yL2hhbW1lcic7XG5pbXBvcnQgJy4vdmVyc28uc3R5bCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnNvIHtcbiAgICBjb25zdHJ1Y3RvcihlbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuZWwgPSBlbDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5zd2lwZVZlbG9jaXR5ID0gdGhpcy5vcHRpb25zLnN3aXBlVmVsb2NpdHkgPz8gMC4zO1xuICAgICAgICB0aGlzLnN3aXBlVGhyZXNob2xkID0gdGhpcy5vcHRpb25zLnN3aXBlVGhyZXNob2xkID8/IDEwO1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25EdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5uYXZpZ2F0aW9uRHVyYXRpb24gPz8gMjQwO1xuICAgICAgICB0aGlzLm5hdmlnYXRpb25QYW5EdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5uYXZpZ2F0aW9uUGFuRHVyYXRpb24gPz8gMjAwO1xuICAgICAgICB0aGlzLnpvb21EdXJhdGlvbiA9IHRoaXMub3B0aW9ucy56b29tRHVyYXRpb24gPz8gMjAwO1xuICAgICAgICB0aGlzLmRvdWJsZVRhcERlbGF5ID0gdGhpcy5vcHRpb25zLmRvdWJsZVRhcERlbGF5ID8/IDMwMDtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gLTE7XG4gICAgICAgIHRoaXMucGluY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wYW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0ge2xlZnQ6IDAsIHRvcDogMCwgc2NhbGU6IDF9O1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNmb3JtID0ge2xlZnQ6IDAsIHRvcDogMCwgc2NhbGU6IDF9O1xuICAgICAgICB0aGlzLnRhcCA9IHtcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgICAgZGVsYXk6IHRoaXMuZG91YmxlVGFwRGVsYXlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIH1cbiAgICBiaW5kKGV2ZW50LCBmbikge1xuICAgICAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gdGhpcy5fZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmbik7XG4gICAgfVxuXG4gICAgdW5iaW5kKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodGhpcy5fZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tldmVudF0uc3BsaWNlKFxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0uaW5kZXhPZihmbiksXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyaWdnZXIoZXZlbnQsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XT8uZm9yRWFjaCgoZSkgPT4gZS5hcHBseSh0aGlzLCBhcmdzKSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsZXJFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnZlcnNvX19zY3JvbGxlcicpO1xuICAgICAgICB0aGlzLnBhZ2VTcHJlYWRFbHMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy52ZXJzb19fcGFnZS1zcHJlYWQnKTtcbiAgICAgICAgdGhpcy5wYWdlU3ByZWFkcyA9IHRoaXMudHJhdmVyc2VQYWdlU3ByZWFkcyh0aGlzLnBhZ2VTcHJlYWRFbHMpO1xuICAgICAgICB0aGlzLnBhZ2VJZHMgPSB0aGlzLmJ1aWxkUGFnZUlkcyh0aGlzLnBhZ2VTcHJlYWRzKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMuc2Nyb2xsZXJFbCk7XG4gICAgICAgIHRoaXMuaGFtbWVyID0gbmV3IEhhbW1lci5NYW5hZ2VyKHRoaXMuc2Nyb2xsZXJFbCwge1xuICAgICAgICAgICAgdG91Y2hBY3Rpb246ICdub25lJyxcbiAgICAgICAgICAgIGVuYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBpbnB1dENsYXNzOiB0aGlzLmdldEhhbW1lcklucHV0Q2xhc3MoKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmhhbW1lci5hZGQoXG4gICAgICAgICAgICBuZXcgSGFtbWVyLlBhbih7dGhyZXNob2xkOiA1LCBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fQUxMfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5oYW1tZXIuYWRkKG5ldyBIYW1tZXIuVGFwKHtldmVudDogJ3NpbmdsZXRhcCcsIGludGVydmFsOiAwfSkpO1xuICAgICAgICB0aGlzLmhhbW1lci5hZGQobmV3IEhhbW1lci5QaW5jaCgpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIuYWRkKG5ldyBIYW1tZXIuUHJlc3Moe3RpbWU6IDUwMH0pKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3BhbnN0YXJ0JywgdGhpcy5vblBhblN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhhbW1lci5vbigncGFubW92ZScsIHRoaXMub25QYW5Nb3ZlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhhbW1lci5vbigncGFuZW5kJywgdGhpcy5vblBhbkVuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3BhbmNhbmNlbCcsIHRoaXMub25QYW5FbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaGFtbWVyLm9uKCdzaW5nbGV0YXAnLCB0aGlzLm9uU2luZ2xldGFwLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhhbW1lci5vbigncGluY2hzdGFydCcsIHRoaXMub25QaW5jaFN0YXJ0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhhbW1lci5vbigncGluY2htb3ZlJywgdGhpcy5vblBpbmNoTW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oYW1tZXIub24oJ3BpbmNoZW5kJywgdGhpcy5vblBpbmNoRW5kLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhhbW1lci5vbigncGluY2hjYW5jZWwnLCB0aGlzLm9uUGluY2hFbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuaGFtbWVyLm9uKCdwcmVzcycsIHRoaXMub25QcmVzcy5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLnNjcm9sbGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdjb250ZXh0bWVudScsXG4gICAgICAgICAgICB0aGlzLm9uQ29udGV4dG1lbnUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2Nyb2xsZXJFbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3doZWVsJyxcbiAgICAgICAgICAgIHRoaXMub25XaGVlbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcGFnZUlkID1cbiAgICAgICAgICAgIHRoaXMuZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZCh0aGlzLm9wdGlvbnMucGFnZUlkKSA/PyAwO1xuXG4gICAgICAgIHRoaXMuaGFtbWVyLnNldCh7ZW5hYmxlOiB0cnVlfSk7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubmF2aWdhdGVUbyhwYWdlSWQsIHtkdXJhdGlvbjogMH0pO1xuXG4gICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uUmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydExpc3RlbmVyID0gdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50b3VjaEVuZExpc3RlbmVyID0gdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmRMaXN0ZW5lciwgZmFsc2UpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgXCJZb3UndmUgY2FsbGVkIC5kZXN0cm95KCkgb24gYSB2aWV3ZXIgdGhhdCB3YXMgbm90IHN0YXJ0ZWQgeWV0LCB0aGlzIGlzIGEgbm8tb3AuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIFwiWW91J3ZlIGNhbGxlZCAuZGVzdHJveSgpIG9uIGEgdmlld2VyIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWQgYW5kIG5vdCByZXN0YXJ0ZWQsIHRoaXMgaXMgYSBuby1vcC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjcm9sbGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdjb250ZXh0bWVudScsXG4gICAgICAgICAgICB0aGlzLm9uQ29udGV4dG1lbnUuYmluZCh0aGlzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNjcm9sbGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLm9uV2hlZWwuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5oYW1tZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydExpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmRMaXN0ZW5lcik7XG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVzaXplTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmaXJzdChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlVG8oMCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJldihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlVG8odGhpcy5nZXRQb3NpdGlvbigpIC0gMSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbmV4dChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlVG8odGhpcy5nZXRQb3NpdGlvbigpICsgMSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbGFzdChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlVG8odGhpcy5nZXRQYWdlU3ByZWFkQ291bnQoKSAtIDEsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG8ocG9zaXRpb24sIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oYFxcXG5Zb3UndmUgY2FsbGVkIGEgbmF2aWdhdGlvbiBtZXRob2Qgb24gYSB2aWV3ZXIgdGhhdCB3YXMgcHJldmlvdXNseSBkZXN0cm95ZWQsIHRoaXMgaXMgYSBuby1vcC5cblBsZWFzZSBjYWxsIHZpZXdlci5zdGFydCgpIGFnYWluLCBpZiB5b3Ugd2FudCB0byByZXVzZSB0aGlzIFZpZXdlciBpbnN0YW5jZS5cblxuWW91IG1pZ2h0IGhhdmUgZm9yZ290dGVuIHRvIHJlbW92ZSBhbiBldmVudCBoYW5kbGVyIHRoYXRcbmNhbGxzIGZpcnN0L3ByZXYvbmV4dC9sYXN0L25hdmlnYXRlVG8gb24gdGhlIHZpZXdlci5cXFxuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oYFxuWW91J3ZlIGNhbGxlZCBhIG5hdmlnYXRpb24gbWV0aG9kIG9uIGEgdmlld2VyIHRoYXQgaGFzbid0IGJlZW4gc3RhcnRlZCB5ZXQsIHRoaXMgaXMgYSBuby1vcC5cblBsZWFzZSBjYWxsIHZpZXdlci5zdGFydCgpIGZpcnN0LlxuXG5Zb3UgbWlnaHQgaGF2ZSBmb3Jnb3R0ZW4gdG8gcmVtb3ZlIGFuIGV2ZW50IGhhbmRsZXIgdGhhdFxuY2FsbHMgLmZpcnN0KCkvLnByZXYoKS8ubmV4dCgpLy5sYXN0KCkvLm5hdmlnYXRlVG8oKSBvbiB0aGUgdmlld2VyLlxuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID4gdGhpcy5nZXRQYWdlU3ByZWFkQ291bnQoKSAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2VTcHJlYWQgPSB0aGlzLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24oXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYWN0aXZlUGFnZVNwcmVhZCA9IHRoaXMuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIGxldCBjYXJvdXNlbCA9IHRoaXMuZ2V0Q2Fyb3VzZWxGcm9tUGFnZVNwcmVhZChhY3RpdmVQYWdlU3ByZWFkKTtcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSBvcHRpb25zLnZlbG9jaXR5ID8/IDE7XG4gICAgICAgIGxldCBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gPz8gdGhpcy5uYXZpZ2F0aW9uRHVyYXRpb247XG4gICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gLyBNYXRoLmFicyh2ZWxvY2l0eSk7XG4gICAgICAgIGNvbnN0IHRvdWNoQWN0aW9uID0gYWN0aXZlUGFnZVNwcmVhZC5pc1Njcm9sbGFibGUoKSA/ICdwYW4teScgOiAnbm9uZSc7XG5cbiAgICAgICAgY3VycmVudFBhZ2VTcHJlYWQ/LmRlYWN0aXZhdGUoKTtcbiAgICAgICAgYWN0aXZlUGFnZVNwcmVhZC5hY3RpdmF0ZSgpO1xuXG4gICAgICAgIGNhcm91c2VsLnZpc2libGUuZm9yRWFjaCgocGFnZVNwcmVhZCkgPT5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWQucG9zaXRpb24oKS5zZXRWaXNpYmlsaXR5KCd2aXNpYmxlJylcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmhhbW1lci5zZXQoe3RvdWNoQWN0aW9ufSk7XG5cbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ubGVmdCA9IHRoaXMuZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkKFxuICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgICBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuXG4gICAgICAgIGlmICh0aGlzLnRyYW5zZm9ybS5zY2FsZSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnRvcCA9IDA7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5zY2FsZSA9IDE7XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignem9vbWVkT3V0Jywge3Bvc2l0aW9uOiBjdXJyZW50UG9zaXRpb259KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignYmVmb3JlTmF2aWdhdGlvbicsIHtcbiAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uOiBwb3NpdGlvblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHg6IGAke3RoaXMudHJhbnNmb3JtLmxlZnR9JWAsXG4gICAgICAgICAgICAgICAgZHVyYXRpb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwgPSB0aGlzLmdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGNhcm91c2VsLmdvbmUuZm9yRWFjaCgocGFnZVNwcmVhZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZC5zZXRWaXNpYmlsaXR5KCdnb25lJylcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdhZnRlck5hdmlnYXRpb24nLCB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uOiB0aGlzLmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IGN1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICBzZXRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkKHBvc2l0aW9uLCBwYWdlU3ByZWFkKSB7XG4gICAgICAgIGxldCBsZWZ0ID0gMDtcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IHRoaXMuZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxKSB7XG4gICAgICAgICAgICBsZWZ0ID0gMTAwIC0gcGFnZVNwcmVhZC5nZXRXaWR0aCgpIC0gcGFnZVNwcmVhZC5nZXRMZWZ0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPiAwKSB7XG4gICAgICAgICAgICBsZWZ0ID0gKDEwMCAtIHBhZ2VTcHJlYWQuZ2V0V2lkdGgoKSkgLyAyIC0gcGFnZVNwcmVhZC5nZXRMZWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGVmdDtcbiAgICB9XG5cbiAgICBnZXRDYXJvdXNlbEZyb21QYWdlU3ByZWFkKHBhZ2VTcHJlYWRTdWJqZWN0KSB7XG4gICAgICAgIGNvbnN0IGNhcm91c2VsID0ge1xuICAgICAgICAgICAgdmlzaWJsZTogW10sXG4gICAgICAgICAgICBnb25lOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIElkZW50aWZ5IHRoZSBwYWdlIHNwcmVhZHMgdGhhdCBzaG91bGQgYmUgYSBwYXJ0IG9mIHRoZSBjYXJvdXNlbC5cbiAgICAgICAgdGhpcy5wYWdlU3ByZWFkcy5mb3JFYWNoKChwYWdlU3ByZWFkKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAocGFnZVNwcmVhZC5nZXRMZWZ0KCkgPD0gcGFnZVNwcmVhZFN1YmplY3QuZ2V0TGVmdCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBwYWdlU3ByZWFkLmdldExlZnQoKSArIHBhZ2VTcHJlYWQuZ2V0V2lkdGgoKSA+XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRTdWJqZWN0LmdldExlZnQoKSAtIDEwMFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkgPFxuICAgICAgICAgICAgICAgICAgICBwYWdlU3ByZWFkU3ViamVjdC5nZXRMZWZ0KCkgKyAxMDBcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNhcm91c2VsLnZpc2libGUucHVzaChwYWdlU3ByZWFkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwuZ29uZS5wdXNoKHBhZ2VTcHJlYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY2Fyb3VzZWw7XG4gICAgfVxuXG4gICAgdHJhdmVyc2VQYWdlU3ByZWFkcyhlbHMpIHtcbiAgICAgICAgY29uc3QgcGFnZVNwcmVhZHMgPSBbXTtcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGVsIG9mIEFycmF5LmZyb20oZWxzKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpO1xuICAgICAgICAgICAgY29uc3QgcGFnZUlkcyA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlLWlkcycpPy5zcGxpdCgnLCcpIHx8IFtdO1xuICAgICAgICAgICAgY29uc3QgbWF4Wm9vbVNjYWxlID0gTnVtYmVyKFxuICAgICAgICAgICAgICAgIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1tYXgtem9vbS1zY2FsZScpID8/IDFcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IE51bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnKSA/PyAxMDApO1xuICAgICAgICAgICAgY29uc3QgcGFnZVNwcmVhZCA9IG5ldyBQYWdlU3ByZWFkKGVsLCB7XG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBwYWdlSWRzLFxuICAgICAgICAgICAgICAgIG1heFpvb21TY2FsZSxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBsZWZ0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGVmdCArPSB3aWR0aDtcblxuICAgICAgICAgICAgcGFnZVNwcmVhZHMucHVzaChwYWdlU3ByZWFkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlU3ByZWFkcztcbiAgICB9XG5cbiAgICBidWlsZFBhZ2VJZHMocGFnZVNwcmVhZHMpIHtcbiAgICAgICAgY29uc3QgcGFnZUlkcyA9IHt9O1xuXG4gICAgICAgIHBhZ2VTcHJlYWRzLmZvckVhY2goKHBhZ2VTcHJlYWQpID0+IHtcbiAgICAgICAgICAgIHBhZ2VTcHJlYWQub3B0aW9ucy5wYWdlSWRzLmZvckVhY2goKHBhZ2VJZCkgPT4ge1xuICAgICAgICAgICAgICAgIHBhZ2VJZHNbcGFnZUlkXSA9IHBhZ2VTcHJlYWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBhZ2VJZHM7XG4gICAgfVxuXG4gICAgaXNDb29yZGluYXRlSW5zaWRlRWxlbWVudCh4LCB5LCBlbCkge1xuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHggPj0gcmVjdC5sZWZ0ICYmXG4gICAgICAgICAgICB4IDw9IHJlY3QucmlnaHQgJiZcbiAgICAgICAgICAgIHkgPj0gcmVjdC50b3AgJiZcbiAgICAgICAgICAgIHkgPD0gcmVjdC5ib3R0b21cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDb29yZGluYXRlSW5mbyh4LCB5LCBwYWdlU3ByZWFkKSB7XG4gICAgICAgIGxldCBwYWdlRWw7XG4gICAgICAgIHggLT0gdGhpcy5lbC5vZmZzZXRMZWZ0O1xuICAgICAgICB5IC09IHRoaXMuZWwub2Zmc2V0VG9wO1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICBjb250ZW50WDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRZOiAwLFxuICAgICAgICAgICAgcGFnZVg6IDAsXG4gICAgICAgICAgICBwYWdlWTogMCxcbiAgICAgICAgICAgIG92ZXJsYXlFbHM6IFtdLFxuICAgICAgICAgICAgcGFnZUVsOiBudWxsLFxuICAgICAgICAgICAgaXNJbnNpZGVDb250ZW50WDogZmFsc2UsXG4gICAgICAgICAgICBpc0luc2lkZUNvbnRlbnRZOiBmYWxzZSxcbiAgICAgICAgICAgIGlzSW5zaWRlQ29udGVudDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udGVudFJlY3QgPSBwYWdlU3ByZWFkLmdldENvbnRlbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlFbHMgPSBwYWdlU3ByZWFkLmdldE92ZXJsYXlFbHMoKTtcbiAgICAgICAgY29uc3QgcGFnZUVscyA9IHBhZ2VTcHJlYWQuZ2V0UGFnZUVscygpO1xuXG4gICAgICAgIGZvciAobGV0IG92ZXJsYXlFbCBvZiBBcnJheS5mcm9tKG92ZXJsYXlFbHMpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nvb3JkaW5hdGVJbnNpZGVFbGVtZW50KHgsIHksIG92ZXJsYXlFbCkpIHtcbiAgICAgICAgICAgICAgICBpbmZvLm92ZXJsYXlFbHMucHVzaChvdmVybGF5RWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChwYWdlRWwgb2YgQXJyYXkuZnJvbShwYWdlRWxzKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb29yZGluYXRlSW5zaWRlRWxlbWVudCh4LCB5LCBwYWdlRWwpKSB7XG4gICAgICAgICAgICAgICAgaW5mby5wYWdlRWwgPSBwYWdlRWw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbmZvLmNvbnRlbnRYID0gKHggLSBjb250ZW50UmVjdC5sZWZ0KSAvIE1hdGgubWF4KDEsIGNvbnRlbnRSZWN0LndpZHRoKTtcbiAgICAgICAgaW5mby5jb250ZW50WSA9ICh5IC0gY29udGVudFJlY3QudG9wKSAvIE1hdGgubWF4KDEsIGNvbnRlbnRSZWN0LmhlaWdodCk7XG5cbiAgICAgICAgaWYgKGluZm8ucGFnZUVsKSB7XG4gICAgICAgICAgICBpbmZvLmlzSW5zaWRlQ29udGVudFggPSBpbmZvLmNvbnRlbnRYID49IDAgJiYgaW5mby5jb250ZW50WCA8PSAxO1xuICAgICAgICAgICAgaW5mby5pc0luc2lkZUNvbnRlbnRZID0gaW5mby5jb250ZW50WSA+PSAwICYmIGluZm8uY29udGVudFkgPD0gMTtcbiAgICAgICAgICAgIGluZm8uaXNJbnNpZGVDb250ZW50ID1cbiAgICAgICAgICAgICAgICBpbmZvLmlzSW5zaWRlQ29udGVudFggJiYgaW5mby5pc0luc2lkZUNvbnRlbnRZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgZ2V0UGFnZVNwcmVhZENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlU3ByZWFkcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlUGFnZVNwcmVhZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uKCkpO1xuICAgIH1cblxuICAgIGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVNwcmVhZHNbcG9zaXRpb25dO1xuICAgIH1cblxuICAgIGdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQocGFnZUlkKSB7XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMucGFnZVNwcmVhZHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgY29uc3QgcGFnZVNwcmVhZCA9IHRoaXMucGFnZVNwcmVhZHNbaWR4XTtcblxuICAgICAgICAgICAgaWYgKHBhZ2VTcHJlYWQub3B0aW9ucy5wYWdlSWRzLmluZGV4T2YocGFnZUlkKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhZ2VTcHJlYWRCb3VuZHMocGFnZVNwcmVhZCkge1xuICAgICAgICBjb25zdCBwYWdlU3ByZWFkUmVjdCA9IHBhZ2VTcHJlYWQuZ2V0UmVjdCgpO1xuICAgICAgICBjb25zdCBwYWdlU3ByZWFkQ29udGVudFJlY3QgPSBwYWdlU3ByZWFkLmdldENvbnRlbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6XG4gICAgICAgICAgICAgICAgKChwYWdlU3ByZWFkQ29udGVudFJlY3QubGVmdCAtIHBhZ2VTcHJlYWRSZWN0LmxlZnQpIC9cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZFJlY3Qud2lkdGgpICpcbiAgICAgICAgICAgICAgICAxMDAsXG4gICAgICAgICAgICB0b3A6XG4gICAgICAgICAgICAgICAgKChwYWdlU3ByZWFkQ29udGVudFJlY3QudG9wIC0gcGFnZVNwcmVhZFJlY3QudG9wKSAvXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRSZWN0LmhlaWdodCkgKlxuICAgICAgICAgICAgICAgIDEwMCxcbiAgICAgICAgICAgIHdpZHRoOiAocGFnZVNwcmVhZENvbnRlbnRSZWN0LndpZHRoIC8gcGFnZVNwcmVhZFJlY3Qud2lkdGgpICogMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OlxuICAgICAgICAgICAgICAgIChwYWdlU3ByZWFkQ29udGVudFJlY3QuaGVpZ2h0IC8gcGFnZVNwcmVhZFJlY3QuaGVpZ2h0KSAqIDEwMCxcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRSZWN0LFxuICAgICAgICAgICAgcGFnZVNwcmVhZENvbnRlbnRSZWN0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2xpcENvb3JkaW5hdGUoY29vcmRpbmF0ZSwgc2NhbGUsIHNpemUsIG9mZnNldCkge1xuICAgICAgICBpZiAoc2l6ZSAqIHNjYWxlIDwgMTAwKSB7XG4gICAgICAgICAgICBjb29yZGluYXRlID0gb2Zmc2V0ICogLXNjYWxlICsgNTAgLSAoc2l6ZSAqIHNjYWxlKSAvIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb29yZGluYXRlID0gTWF0aC5taW4oY29vcmRpbmF0ZSwgb2Zmc2V0ICogLXNjYWxlKTtcbiAgICAgICAgICAgIGNvb3JkaW5hdGUgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlLFxuICAgICAgICAgICAgICAgIG9mZnNldCAqIC1zY2FsZSAtIHNpemUgKiBzY2FsZSArIDEwMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlO1xuICAgIH1cblxuICAgIHpvb21UbyhvcHRpb25zID0ge30sIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHtzY2FsZX0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBjdXJTY2FsZSA9IHRoaXMudHJhbnNmb3JtLnNjYWxlO1xuICAgICAgICBjb25zdCBhY3RpdmVQYWdlU3ByZWFkID0gdGhpcy5nZXRBY3RpdmVQYWdlU3ByZWFkKCk7XG4gICAgICAgIGNvbnN0IHBhZ2VTcHJlYWRCb3VuZHMgPSB0aGlzLmdldFBhZ2VTcHJlYWRCb3VuZHMoYWN0aXZlUGFnZVNwcmVhZCk7XG4gICAgICAgIGNvbnN0IGNhcm91c2VsT2Zmc2V0ID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRMZWZ0KCk7XG4gICAgICAgIGNvbnN0IGNhcm91c2VsU2NhbGVkT2Zmc2V0ID0gY2Fyb3VzZWxPZmZzZXQgKiBjdXJTY2FsZTtcbiAgICAgICAgbGV0IHggPSBvcHRpb25zLnggPz8gMDtcbiAgICAgICAgbGV0IHkgPSBvcHRpb25zLnkgPz8gMDtcblxuICAgICAgICBpZiAoc2NhbGUgIT09IDEpIHtcbiAgICAgICAgICAgIHggLT0gcGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC5sZWZ0O1xuICAgICAgICAgICAgeSAtPSBwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LnRvcDtcbiAgICAgICAgICAgIHggPSAoeCAvIChwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LndpZHRoIC8gY3VyU2NhbGUpKSAqIDEwMDtcbiAgICAgICAgICAgIHkgPSAoeSAvIChwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LmhlaWdodCAvIGN1clNjYWxlKSkgKiAxMDA7XG4gICAgICAgICAgICB4ID1cbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5sZWZ0ICtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbFNjYWxlZE9mZnNldCArXG4gICAgICAgICAgICAgICAgeCAtXG4gICAgICAgICAgICAgICAgKHggKiBzY2FsZSkgLyBjdXJTY2FsZTtcbiAgICAgICAgICAgIHkgPSB0aGlzLnRyYW5zZm9ybS50b3AgKyB5IC0gKHkgKiBzY2FsZSkgLyBjdXJTY2FsZTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBhbmltYXRpb24gZG9lc24ndCBleGNlZWQgdGhlIGNvbnRlbnQgYm91bmRzLlxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYm91bmRzICE9PSBmYWxzZSAmJiBzY2FsZSA+IDEpIHtcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5jbGlwQ29vcmRpbmF0ZShcbiAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMubGVmdFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuY2xpcENvb3JkaW5hdGUoXG4gICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICBwYWdlU3ByZWFkQm91bmRzLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZEJvdW5kcy50b3BcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgICAgICB5ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFjY291bnQgZm9yIHRoZSBwYWdlIHNwcmVhZHMgbGVmdCBvZiB0aGUgYWN0aXZlIG9uZS5cbiAgICAgICAgeCAtPSBjYXJvdXNlbE9mZnNldCAqIHNjYWxlO1xuXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLmxlZnQgPSB4O1xuICAgICAgICB0aGlzLnRyYW5zZm9ybS50b3AgPSB5O1xuICAgICAgICB0aGlzLnRyYW5zZm9ybS5zY2FsZSA9IHNjYWxlO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogYCR7eH0lYCxcbiAgICAgICAgICAgICAgICB5OiBgJHt5fSVgLFxuICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgIGVhc2luZzogb3B0aW9ucy5lYXNpbmcsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMucGFnZVNwcmVhZEVscyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCgnLnZlcnNvX19wYWdlLXNwcmVhZCcpO1xuICAgICAgICB0aGlzLnBhZ2VTcHJlYWRzID0gdGhpcy50cmF2ZXJzZVBhZ2VTcHJlYWRzKHRoaXMucGFnZVNwcmVhZEVscyk7XG4gICAgICAgIHRoaXMucGFnZUlkcyA9IHRoaXMuYnVpbGRQYWdlSWRzKHRoaXMucGFnZVNwcmVhZHMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldEhhbW1lcklucHV0Q2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IG1vYmlsZVJlZ2V4ID0gL21vYmlsZXx0YWJsZXR8aXAoYWR8aG9uZXxvZCl8YW5kcm9pZC9pO1xuICAgICAgICBjb25zdCBzdXBwb3J0VG91Y2ggPVxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ29udG91Y2hzdGFydCcgaW4gd2luZG93O1xuXG4gICAgICAgIGlmIChzdXBwb3J0VG91Y2ggJiYgbW9iaWxlUmVnZXgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIEhhbW1lci5Ub3VjaElucHV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyMjIyMjIyMjIyMjIyNcbiAgICAvKiBFdmVudHMgKi9cbiAgICAvLyMjIyMjIyMjIyMjIyNcblxuICAgIG9uUGFuU3RhcnQoZSkge1xuICAgICAgICAvLyBPbmx5IGFsbG93IHBhbm5pbmcgaWYgem9vbWVkIGluIG9yIGRvaW5nIGEgaG9yaXpvbnRhbCBwYW4uXG4gICAgICAgIC8vIFRoaXMgZW5zdXJlcyB2ZXJ0aWNhbCBzY3JvbGxpbmcgd29ya3MgZm9yIHNjcm9sbGFibGUgcGFnZSBzcHJlYWRzLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5zY2FsZSA+IDEgfHxcbiAgICAgICAgICAgIGUuZGlyZWN0aW9uID09PSBIYW1tZXIuRElSRUNUSU9OX0xFRlQgfHxcbiAgICAgICAgICAgIGUuZGlyZWN0aW9uID09PSBIYW1tZXIuRElSRUNUSU9OX1JJR0hUXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qge3h9ID0gZS5jZW50ZXI7XG4gICAgICAgICAgICBjb25zdCBlZGdlVGhyZXNob2xkID0gMzA7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2Nyb2xsZXJFbC5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgLy8gUHJldmVudCBwYW5uaW5nIHdoZW4gZWRnZS1zd2lwaW5nIG9uIGlPUy5cbiAgICAgICAgICAgIGlmICh4ID4gZWRnZVRocmVzaG9sZCAmJiB4IDwgd2lkdGggLSBlZGdlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zZm9ybS5sZWZ0ID0gdGhpcy50cmFuc2Zvcm0ubGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNmb3JtLnRvcCA9IHRoaXMudHJhbnNmb3JtLnRvcDtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFubmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3BhblN0YXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBhbk1vdmUoZSkge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgaWYgKHRoaXMucGluY2hpbmcgPT09IHRydWUgfHwgdGhpcy5wYW5uaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtLnNjYWxlID4gMSkge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlUGFnZVNwcmVhZCA9IHRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpO1xuICAgICAgICAgICAgY29uc3QgY2Fyb3VzZWxPZmZzZXQgPSBhY3RpdmVQYWdlU3ByZWFkLmdldExlZnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcm91c2VsU2NhbGVkT2Zmc2V0ID0gY2Fyb3VzZWxPZmZzZXQgKiB0aGlzLnRyYW5zZm9ybS5zY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VTcHJlYWRCb3VuZHMgPSB0aGlzLmdldFBhZ2VTcHJlYWRCb3VuZHMoYWN0aXZlUGFnZVNwcmVhZCk7XG4gICAgICAgICAgICBjb25zdCB7c2NhbGV9ID0gdGhpcy50cmFuc2Zvcm07XG4gICAgICAgICAgICB4ID1cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNmb3JtLmxlZnQgK1xuICAgICAgICAgICAgICAgIGNhcm91c2VsU2NhbGVkT2Zmc2V0ICtcbiAgICAgICAgICAgICAgICAoZS5kZWx0YVggLyB0aGlzLnNjcm9sbGVyRWwub2Zmc2V0V2lkdGgpICogMTAwO1xuICAgICAgICAgICAgbGV0IHkgPVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2Zvcm0udG9wICtcbiAgICAgICAgICAgICAgICAoZS5kZWx0YVkgLyB0aGlzLnNjcm9sbGVyRWwub2Zmc2V0SGVpZ2h0KSAqIDEwMDtcbiAgICAgICAgICAgIHggPSB0aGlzLmNsaXBDb29yZGluYXRlKFxuICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICAgICAgcGFnZVNwcmVhZEJvdW5kcy53aWR0aCxcbiAgICAgICAgICAgICAgICBwYWdlU3ByZWFkQm91bmRzLmxlZnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB5ID0gdGhpcy5jbGlwQ29vcmRpbmF0ZShcbiAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMudG9wXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgeCAtPSBjYXJvdXNlbFNjYWxlZE9mZnNldDtcblxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ubGVmdCA9IHg7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS50b3AgPSB5O1xuXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB4OiBgJHt4fSVgLFxuICAgICAgICAgICAgICAgIHk6IGAke3l9JWAsXG4gICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4ID1cbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5sZWZ0ICtcbiAgICAgICAgICAgICAgICAoZS5kZWx0YVggLyB0aGlzLnNjcm9sbGVyRWwub2Zmc2V0V2lkdGgpICogMTAwO1xuXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB4OiBgJHt4fSVgLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYW5FbmQoZSkge1xuICAgICAgICBpZiAodGhpcy5wYW5uaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJpZ2dlcigncGFuRW5kJyk7XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNmb3JtLnNjYWxlID09PSAxICYmIHRoaXMucGluY2hpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gZS5vdmVyYWxsVmVsb2NpdHlYO1xuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModmVsb2NpdHkpID49IHRoaXMuc3dpcGVWZWxvY2l0eSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhlLmRlbHRhWCkgPj0gdGhpcy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5vZmZzZXREaXJlY3Rpb24gPT09IEhhbW1lci5ESVJFQ1RJT05fTEVGVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5uYXZpZ2F0aW9uUGFuRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUub2Zmc2V0RGlyZWN0aW9uID09PSBIYW1tZXIuRElSRUNUSU9OX1JJR0hUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXYoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlbG9jaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm5hdmlnYXRpb25QYW5EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gdGhpcy5nZXRQb3NpdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHg6IGAke3RoaXMudHJhbnNmb3JtLmxlZnR9JWAsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm5hdmlnYXRpb25QYW5EdXJhdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdhdHRlbXB0ZWROYXZpZ2F0aW9uJywge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRQb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBpbmNoU3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRBY3RpdmVQYWdlU3ByZWFkKCkuaXNab29tYWJsZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBpbmNoaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGluY2hpbmcnLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zZm9ybS5zY2FsZSA9IHRoaXMudHJhbnNmb3JtLnNjYWxlO1xuICAgIH1cblxuICAgIG9uUGluY2hNb3ZlKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucGluY2hpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnpvb21Ubyh7XG4gICAgICAgICAgICB4OiBlLmNlbnRlci54LFxuICAgICAgICAgICAgeTogZS5jZW50ZXIueSxcbiAgICAgICAgICAgIHNjYWxlOiB0aGlzLnN0YXJ0VHJhbnNmb3JtLnNjYWxlICogZS5zY2FsZSxcbiAgICAgICAgICAgIGJvdW5kczogZmFsc2UsXG4gICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uUGluY2hFbmQoZSkge1xuICAgICAgICBpZiAodGhpcy5waW5jaGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVBhZ2VTcHJlYWQgPSB0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKTtcbiAgICAgICAgY29uc3QgbWF4Wm9vbVNjYWxlID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRNYXhab29tU2NhbGUoKTtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLm1heCgxLCBNYXRoLm1pbih0aGlzLnRyYW5zZm9ybS5zY2FsZSwgbWF4Wm9vbVNjYWxlKSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0VHJhbnNmb3JtLnNjYWxlID09PSAxICYmIHNjYWxlID4gMSkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd6b29tZWRJbicsIHtwb3NpdGlvbn0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRUcmFuc2Zvcm0uc2NhbGUgPiAxICYmIHNjYWxlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3pvb21lZE91dCcsIHtwb3NpdGlvbn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy56b29tVG8oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeDogZS5jZW50ZXIueCxcbiAgICAgICAgICAgICAgICB5OiBlLmNlbnRlci55LFxuICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnpvb21EdXJhdGlvblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpbmNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGluY2hpbmcnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb25QcmVzcyhlKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihcbiAgICAgICAgICAgICdwcmVzc2VkJyxcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29vcmRpbmF0ZUluZm8oXG4gICAgICAgICAgICAgICAgZS5jZW50ZXIueCxcbiAgICAgICAgICAgICAgICBlLmNlbnRlci55LFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb25Db250ZXh0bWVudShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoXG4gICAgICAgICAgICAnY29udGV4dG1lbnUnLFxuICAgICAgICAgICAgdGhpcy5nZXRDb29yZGluYXRlSW5mbyhcbiAgICAgICAgICAgICAgICBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG9uV2hlZWwoZSkge1xuICAgICAgICBsZXQgcG9zaXRpb24sIHNjYWxlO1xuICAgICAgICBjb25zdCBhY3RpdmVQYWdlU3ByZWFkID0gdGhpcy5nZXRBY3RpdmVQYWdlU3ByZWFkKCk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZVBhZ2VTcHJlYWQuaXNab29tYWJsZSgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMzY2ODAzNVxuICAgICAgICBsZXQge2RlbHRhWX0gPSBlO1xuXG4gICAgICAgIGlmIChldmVudC53ZWJraXREaXJlY3Rpb25JbnZlcnRlZEZyb21EZXZpY2UpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IC1kZWx0YVk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVsdGFZID4gMCAmJiB0aGlzLnRyYW5zZm9ybS5zY2FsZSA9PT0gMSkge1xuICAgICAgICAgICAgc2NhbGUgPSBhY3RpdmVQYWdlU3ByZWFkLmdldE1heFpvb21TY2FsZSgpO1xuICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIHRoaXMuem9vbVRvKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICB5OiBlLmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy56b29tRHVyYXRpb25cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd6b29tZWRJbicsIHtwb3NpdGlvbn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVsdGFZIDwgMCAmJiB0aGlzLnRyYW5zZm9ybS5zY2FsZSA+IDEpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnpvb21UbyhcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgeTogZS5jbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuem9vbUR1cmF0aW9uXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignem9vbWVkT3V0Jywge3Bvc2l0aW9ufSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2luZ2xldGFwKGUpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlUGFnZVNwcmVhZCA9IHRoaXMuZ2V0QWN0aXZlUGFnZVNwcmVhZCgpO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlSW5mbyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZUluZm8oXG4gICAgICAgICAgICBlLmNlbnRlci54LFxuICAgICAgICAgICAgZS5jZW50ZXIueSxcbiAgICAgICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgKTtcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50YXAudGltZW91dCk7XG5cbiAgICAgICAgaWYgKHRoaXMudGFwLmNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRhcC5jb3VudCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZG91YmxlQ2xpY2tlZCcsIGNvb3JkaW5hdGVJbmZvKTtcblxuICAgICAgICAgICAgaWYgKGFjdGl2ZVBhZ2VTcHJlYWQuaXNab29tYWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4Wm9vbVNjYWxlID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRNYXhab29tU2NhbGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB6b29tZWRJbiA9IHRoaXMudHJhbnNmb3JtLnNjYWxlID4gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IHpvb21lZEluID8gMSA6IG1heFpvb21TY2FsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB6b29tRXZlbnQgPSB6b29tZWRJbiA/ICd6b29tZWRPdXQnIDogJ3pvb21lZEluJztcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuem9vbVRvKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBlLmNlbnRlci54LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZS5jZW50ZXIueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuem9vbUR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcih6b29tRXZlbnQsIHtwb3NpdGlvbn0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGFwLmNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLnRhcC50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXAuY291bnQgPSAwO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdjbGlja2VkJywgY29vcmRpbmF0ZUluZm8pO1xuICAgICAgICAgICAgfSwgdGhpcy50YXAuZGVsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKS5pc1Njcm9sbGFibGUoKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaEVuZChlKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRBY3RpdmVQYWdlU3ByZWFkKCkuaXNTY3JvbGxhYmxlKCkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc2Zvcm0uc2NhbGUgPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVBhZ2VTcHJlYWQgPSB0aGlzLmdldEFjdGl2ZVBhZ2VTcHJlYWQoKTtcblxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ubGVmdCA9IHRoaXMuZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkKFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS50b3AgPSAwO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0uc2NhbGUgPSAxO1xuXG4gICAgICAgICAgICB0aGlzLnpvb21Ubyh7XG4gICAgICAgICAgICAgICAgeDogdGhpcy50cmFuc2Zvcm0ubGVmdCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnRyYW5zZm9ybS50b3AsXG4gICAgICAgICAgICAgICAgc2NhbGU6IHRoaXMudHJhbnNmb3JtLnNjYWxlLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd6b29tZWRPdXQnLCB7cG9zaXRpb259KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJjaGVjayIsImdsb2JhbCIsImZhaWxzIiwibmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJOQVNIT1JOX0JVRyIsInRvU3RyaW5nIiwic3BsaXQiLCJjbGFzc29mIiwiSW5kZXhlZE9iamVjdCIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJpc09iamVjdCIsImhhc093blByb3BlcnR5IiwiZG9jdW1lbnQiLCJFWElTVFMiLCJERVNDUklQVE9SUyIsImNyZWF0ZUVsZW1lbnQiLCJuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJ0b0luZGV4ZWRPYmplY3QiLCJ0b1ByaW1pdGl2ZSIsIklFOF9ET01fREVGSU5FIiwiaGFzIiwiY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yIiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJyZXBsYWNlbWVudCIsImlzRm9yY2VkIiwiZGF0YSIsIm5vcm1hbGl6ZSIsIlBPTFlGSUxMIiwiTkFUSVZFIiwiYUZ1bmN0aW9uIiwibmF0aXZlRGVmaW5lUHJvcGVydHkiLCJhbk9iamVjdCIsImRlZmluZVByb3BlcnR5TW9kdWxlIiwicmVxdWlyZSQkMCIsInBhdGgiLCJiaW5kIiwiY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5IiwiJCIsIm9iamVjdERlZmluZVByb3BlcnR5TW9kaWxlIiwicGFyZW50IiwiX09iamVjdCRkZWZpbmVQcm9wZXJ0eSIsIlNIQVJFRCIsInN0b3JlIiwic2V0R2xvYmFsIiwiZnVuY3Rpb25Ub1N0cmluZyIsIldlYWtNYXAiLCJpbnNwZWN0U291cmNlIiwiaWQiLCJwb3N0Zml4Iiwia2V5cyIsInNoYXJlZCIsInVpZCIsInNldCIsImdldCIsImVuZm9yY2UiLCJnZXR0ZXJGb3IiLCJOQVRJVkVfV0VBS19NQVAiLCJ3bWdldCIsIndtaGFzIiwid21zZXQiLCJTVEFURSIsInNoYXJlZEtleSIsImhpZGRlbktleXMiLCJvYmplY3RIYXMiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwiY2VpbCIsImZsb29yIiwibWluIiwidG9JbnRlZ2VyIiwibWF4IiwiY3JlYXRlTWV0aG9kIiwidG9MZW5ndGgiLCJ0b0Fic29sdXRlSW5kZXgiLCJpbmRleE9mIiwiZW51bUJ1Z0tleXMiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJnZXRCdWlsdEluIiwiZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSIsImdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJyZWRlZmluZSIsInN0aWNreUhlbHBlcnMiLCJleGVjIiwicHJvY2VzcyIsInZlcnNpb25zIiwidjgiLCJtYXRjaCIsInZlcnNpb24iLCJ1c2VyQWdlbnQiLCJJU19OT0RFIiwiVjhfVkVSU0lPTiIsIk5BVElWRV9TWU1CT0wiLCJXZWxsS25vd25TeW1ib2xzU3RvcmUiLCJTeW1ib2wiLCJjcmVhdGVXZWxsS25vd25TeW1ib2wiLCJVU0VfU1lNQk9MX0FTX1VJRCIsIlNQRUNJRVMiLCJ3ZWxsS25vd25TeW1ib2wiLCJjaGFyQXQiLCJmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyIsImlzUmVnRXhwIiwiY2FsbFJlZ0V4cEV4ZWMiLCJhUG9zc2libGVQcm90b3R5cGUiLCJzZXRQcm90b3R5cGVPZiIsIm9iamVjdEtleXMiLCJHVCIsIkxUIiwiUFJPVE9UWVBFIiwiU0NSSVBUIiwiSUVfUFJPVE8iLCJFbXB0eUNvbnN0cnVjdG9yIiwic2NyaXB0VGFnIiwiTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCIsIk51bGxQcm90b09iamVjdFZpYUlGcmFtZSIsImh0bWwiLCJhY3RpdmVYRG9jdW1lbnQiLCJOdWxsUHJvdG9PYmplY3QiLCJkZWZpbmVQcm9wZXJ0aWVzIiwid2hpdGVzcGFjZSIsIndoaXRlc3BhY2VzIiwibHRyaW0iLCJydHJpbSIsInJlcXVpcmUkJDEiLCJkZWZpbmVQcm9wZXJ0eSIsInJlcXVpcmUkJDIiLCJ0cmltIiwicmVxdWlyZSQkMyIsImNyZWF0ZSIsImlzQXJyYXkiLCJIQVNfU1BFQ0lFU19TVVBQT1JUIiwiTUFYX1NBRkVfSU5URUdFUiIsInRvT2JqZWN0IiwiQXJyYXlQcm90b3R5cGUiLCJzcGxpY2UiLCJTVFJJQ1RfTUVUSE9EIiwiYXJyYXlNZXRob2RJc1N0cmljdCIsIk9iamVjdFByb3RvdHlwZSIsIkNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiIsIklURVJBVE9SIiwiQlVHR1lfU0FGQVJJX0lURVJBVE9SUyIsInJldHVyblRoaXMiLCJJdGVyYXRvclByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwiZG9jdW1lbnRDcmVhdGVFbGVtZW50IiwiVE9fU1RSSU5HX1RBRyIsInRlc3QiLCJjbGFzc29mUmF3IiwiVE9fU1RSSU5HX1RBR19TVVBQT1JUIiwiSXRlcmF0b3JzIiwiSXRlcmF0b3JzQ29yZSIsInNldEludGVybmFsU3RhdGUiLCJnZXRJbnRlcm5hbFN0YXRlIiwiRE9NSXRlcmFibGVzIiwiJGZvckVhY2giLCJmb3JFYWNoIiwic2xpY2UiLCJmcm9tIiwid3JhcCIsIkZPUkNFRCIsImNvbmNhdCIsIkFuaW1hdGlvbiIsImVsIiwib3B0aW9ucyIsImNhbGxiYWNrIiwieCIsInkiLCJzY2FsZSIsImVhc2luZyIsImR1cmF0aW9uIiwicnVuIiwidHJhbnNmb3JtIiwic3R5bGUiLCJ0cmFuc2l0aW9uRW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRyYW5zaXRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiUGFnZVNwcmVhZCIsInR5cGUiLCJwYWdlSWRzIiwid2lkdGgiLCJsZWZ0IiwibWF4Wm9vbVNjYWxlIiwiZ2V0TWF4Wm9vbVNjYWxlIiwiZ2V0RWwiLCJnZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWN0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJoZWlnaHQiLCJfQXJyYXkkZnJvbTIiLCJnZXRQYWdlRWxzIiwicGFnZUVsIiwicGFnZVJlY3QiLCJ2aXNpYmlsaXR5IiwiZGlzcGxheSIsInBvc2l0aW9uZWQiLCJnZXRMZWZ0IiwiYWN0aXZlIiwic2V0QXR0cmlidXRlIiwiRkFJTFNfT05fUFJJTUlUSVZFUyIsIm5hdGl2ZUtleXMiLCJuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzIiwid3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSIsImdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbCIsIm5hdGl2ZU9iamVjdENyZWF0ZSIsIl9BcnJheSRpc0FycmF5IiwiaXNJdGVyYWJsZSIsImdldEl0ZXJhdG9yIiwiX1N5bWJvbCIsIl9pc0l0ZXJhYmxlIiwiX2dldEl0ZXJhdG9yIiwiYXJyYXlMaWtlVG9BcnJheSIsIl9zbGljZUluc3RhbmNlUHJvcGVydHkiLCJfQXJyYXkkZnJvbSIsImFycmF5V2l0aEhvbGVzIiwiaXRlcmFibGVUb0FycmF5TGltaXQiLCJ1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIm5vbkl0ZXJhYmxlUmVzdCIsInJlZ0V4cEV4ZWMiLCJPYmplY3QiLCJhc3NpZ24iLCJmb3JjZWRTdHJpbmdUcmltTWV0aG9kIiwic29ydCIsIlNLSVBTX0hPTEVTIiwiZmluZCIsIm1hcCIsImZpbmRJbmRleCIsImZpbHRlciIsIkNIUk9NRV9WRVJTSU9OIiwicmVkdWNlIiwiVkVORE9SX1BSRUZJWEVTIiwiVEVTVF9FTEVNRU5UIiwiVFlQRV9GVU5DVElPTiIsInJvdW5kIiwiTWF0aCIsImFicyIsIm5vdyIsImludm9rZUFycmF5QXJnIiwiYXJnIiwiZm4iLCJjb250ZXh0IiwiZWFjaCIsIm9iaiIsIml0ZXJhdG9yIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNhbGwiLCJpbmhlcml0IiwiY2hpbGQiLCJiYXNlIiwicHJvcGVydGllcyIsImJhc2VQIiwicHJvdG90eXBlIiwiY2hpbGRQIiwiX09iamVjdCRjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIl9zdXBlciIsIl9PYmplY3QkYXNzaWduIiwiYm9vbE9yRm4iLCJ2YWwiLCJhcmdzIiwiYXBwbHkiLCJpZlVuZGVmaW5lZCIsInZhbDEiLCJ2YWwyIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJ0eXBlcyIsImhhbmRsZXIiLCJzcGxpdFN0ciIsInJlbW92ZUV2ZW50TGlzdGVuZXJzIiwiaGFzUGFyZW50Iiwibm9kZSIsInBhcmVudE5vZGUiLCJpblN0ciIsInN0ciIsIl9pbmRleE9mSW5zdGFuY2VQcm9wZXJ0eSIsIl90cmltSW5zdGFuY2VQcm9wZXJ0eSIsInRvQXJyYXkiLCJBcnJheSIsInVuaXF1ZUFycmF5IiwiYXJyYXkiLCJrZXkiLCJyZXN1bHRzIiwidmFsdWVzIiwiaXRlbSIsInB1c2giLCJfc29ydEluc3RhbmNlUHJvcGVydHkiLCJhIiwiYiIsInByZWZpeGVkIiwicHJvcGVydHkiLCJjYW1lbFByb3AiLCJ0b1VwcGVyQ2FzZSIsIl9maW5kSW5zdGFuY2VQcm9wZXJ0eSIsInByZWZpeCIsIl91bmlxdWVJZCIsInVuaXF1ZUlkIiwiZ2V0V2luZG93Rm9yRWxlbWVudCIsImVsZW1lbnQiLCJkb2MiLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJwYXJlbnRXaW5kb3ciLCJ3aW5kb3ciLCJNT0JJTEVfUkVHRVgiLCJTVVBQT1JUX1RPVUNIIiwiU1VQUE9SVF9QT0lOVEVSX0VWRU5UUyIsIlNVUFBPUlRfT05MWV9UT1VDSCIsIm5hdmlnYXRvciIsIklOUFVUX1RZUEVfVE9VQ0giLCJJTlBVVF9UWVBFX1BFTiIsIklOUFVUX1RZUEVfTU9VU0UiLCJJTlBVVF9UWVBFX0tJTkVDVCIsIkNPTVBVVEVfSU5URVJWQUwiLCJJTlBVVF9TVEFSVCIsIklOUFVUX01PVkUiLCJJTlBVVF9FTkQiLCJJTlBVVF9DQU5DRUwiLCJESVJFQ1RJT05fTk9ORSIsIkRJUkVDVElPTl9MRUZUIiwiRElSRUNUSU9OX1JJR0hUIiwiRElSRUNUSU9OX1VQIiwiRElSRUNUSU9OX0RPV04iLCJESVJFQ1RJT05fSE9SSVpPTlRBTCIsIkRJUkVDVElPTl9WRVJUSUNBTCIsIkRJUkVDVElPTl9BTEwiLCJQUk9QU19YWSIsIlBST1BTX0NMSUVOVF9YWSIsIklucHV0IiwibWFuYWdlciIsInNlbGYiLCJpbnB1dFRhcmdldCIsImRvbUhhbmRsZXIiLCJldiIsImVuYWJsZSIsImluaXQiLCJldkVsIiwiZXZUYXJnZXQiLCJldldpbiIsImRlc3Ryb3kiLCJjcmVhdGVJbnB1dEluc3RhbmNlIiwiaW5wdXRDbGFzcyIsIlR5cGUiLCJQb2ludGVyRXZlbnRJbnB1dCIsIlRvdWNoSW5wdXQiLCJNb3VzZUlucHV0IiwiVG91Y2hNb3VzZUlucHV0IiwiaW5wdXRIYW5kbGVyIiwiZXZlbnRUeXBlIiwiaW5wdXQiLCJwb2ludGVyc0xlbiIsInBvaW50ZXJzIiwiY2hhbmdlZFBvaW50ZXJzTGVuIiwiY2hhbmdlZFBvaW50ZXJzIiwiaXNGaXJzdCIsImlzRmluYWwiLCJzZXNzaW9uIiwiY29tcHV0ZUlucHV0RGF0YSIsImVtaXQiLCJyZWNvZ25pemUiLCJwcmV2SW5wdXQiLCJwb2ludGVyc0xlbmd0aCIsImZpcnN0SW5wdXQiLCJzaW1wbGVDbG9uZUlucHV0RGF0YSIsImZpcnN0TXVsdGlwbGUiLCJvZmZzZXRDZW50ZXIiLCJjZW50ZXIiLCJnZXRDZW50ZXIiLCJ0aW1lU3RhbXAiLCJkZWx0YVRpbWUiLCJhbmdsZSIsImdldEFuZ2xlIiwiZGlzdGFuY2UiLCJnZXREaXN0YW5jZSIsImNvbXB1dGVEZWx0YVhZIiwib2Zmc2V0RGlyZWN0aW9uIiwiZ2V0RGlyZWN0aW9uIiwiZGVsdGFYIiwiZGVsdGFZIiwib3ZlcmFsbFZlbG9jaXR5IiwiZ2V0VmVsb2NpdHkiLCJvdmVyYWxsVmVsb2NpdHlYIiwib3ZlcmFsbFZlbG9jaXR5WSIsImdldFNjYWxlIiwicm90YXRpb24iLCJnZXRSb3RhdGlvbiIsIm1heFBvaW50ZXJzIiwiY29tcHV0ZUludGVydmFsSW5wdXREYXRhIiwic3JjRXZlbnQiLCJvZmZzZXQiLCJvZmZzZXREZWx0YSIsInByZXZEZWx0YSIsImxhc3QiLCJsYXN0SW50ZXJ2YWwiLCJ2ZWxvY2l0eSIsInZlbG9jaXR5WCIsInZlbG9jaXR5WSIsImRpcmVjdGlvbiIsInYiLCJfbWFwSW5zdGFuY2VQcm9wZXJ0eSIsInBvaW50ZXIiLCJjbGllbnRYIiwiY2xpZW50WSIsInAxIiwicDIiLCJ4S2V5IiwieUtleSIsInNxcnQiLCJwb3ciLCJhdGFuMiIsIlBJIiwic3RhcnQiLCJlbmQiLCJNT1VTRV9JTlBVVF9NQVAiLCJtb3VzZWRvd24iLCJtb3VzZW1vdmUiLCJtb3VzZXVwIiwiTU9VU0VfRUxFTUVOVF9FVkVOVFMiLCJNT1VTRV9XSU5ET1dfRVZFTlRTIiwicHJlc3NlZCIsImFyZ3VtZW50cyIsImJ1dHRvbiIsIndoaWNoIiwicG9pbnRlclR5cGUiLCJQT0lOVEVSX0lOUFVUX01BUCIsInBvaW50ZXJkb3duIiwicG9pbnRlcm1vdmUiLCJwb2ludGVydXAiLCJwb2ludGVyY2FuY2VsIiwicG9pbnRlcm91dCIsIklFMTBfUE9JTlRFUl9UWVBFX0VOVU0iLCJQT0lOVEVSX0VMRU1FTlRfRVZFTlRTIiwiUE9JTlRFUl9XSU5ET1dfRVZFTlRTIiwiTVNQb2ludGVyRXZlbnQiLCJQb2ludGVyRXZlbnQiLCJwb2ludGVyRXZlbnRzIiwicmVtb3ZlUG9pbnRlciIsImV2ZW50VHlwZU5vcm1hbGl6ZWQiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJpc1RvdWNoIiwic3RvcmVJbmRleCIsIl9maW5kSW5kZXhJbnN0YW5jZVByb3BlcnR5IiwicG9pbnRlcklkIiwiX3NwbGljZUluc3RhbmNlUHJvcGVydHkiLCJTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQIiwidG91Y2hzdGFydCIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwidG91Y2hjYW5jZWwiLCJTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUyIsIlNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTIiwiU2luZ2xlVG91Y2hJbnB1dCIsInN0YXJ0ZWQiLCJub3JtYWxpemVTaW5nbGVUb3VjaGVzIiwiYWxsIiwidG91Y2hlcyIsImNoYW5nZWQiLCJjaGFuZ2VkVG91Y2hlcyIsIl9jb25jYXRJbnN0YW5jZVByb3BlcnR5IiwiVE9VQ0hfSU5QVVRfTUFQIiwiVE9VQ0hfVEFSR0VUX0VWRU5UUyIsInRhcmdldElkcyIsImdldFRvdWNoZXMiLCJhbGxUb3VjaGVzIiwiaWRlbnRpZmllciIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVGFyZ2V0VG91Y2hlcyIsIl9maWx0ZXJJbnN0YW5jZVByb3BlcnR5IiwidG91Y2giLCJ0YXJnZXRUb3VjaCIsImNoYW5nZWRUb3VjaCIsIkRFRFVQX1RJTUVPVVQiLCJERURVUF9ESVNUQU5DRSIsIl9iaW5kSW5zdGFuY2VQcm9wZXJ0eSIsIm1vdXNlIiwicHJpbWFyeVRvdWNoIiwibGFzdFRvdWNoZXMiLCJpbnB1dEV2ZW50IiwiaW5wdXREYXRhIiwiaXNNb3VzZSIsInNvdXJjZUNhcGFiaWxpdGllcyIsImZpcmVzVG91Y2hFdmVudHMiLCJyZWNvcmRUb3VjaGVzIiwiaXNTeW50aGV0aWNFdmVudCIsImV2ZW50RGF0YSIsInNldExhc3RUb3VjaCIsImxhc3RUb3VjaCIsImx0cyIsInJlbW92ZUxhc3RUb3VjaCIsIlBSRUZJWEVEX1RPVUNIX0FDVElPTiIsInRlIiwiTkFUSVZFX1RPVUNIX0FDVElPTiIsIlRPVUNIX0FDVElPTl9DT01QVVRFIiwiVE9VQ0hfQUNUSU9OX0FVVE8iLCJUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OIiwiVE9VQ0hfQUNUSU9OX05PTkUiLCJUT1VDSF9BQ1RJT05fUEFOX1giLCJUT1VDSF9BQ1RJT05fUEFOX1kiLCJUb3VjaEFjdGlvbiIsInZhbHVlIiwiY29tcHV0ZSIsIlRPVUNIX0FDVElPTl9NQVAiLCJnZXRUb3VjaEFjdGlvblByb3BzIiwiYWN0aW9ucyIsInVwZGF0ZSIsInRvdWNoQWN0aW9uIiwicmVjb2duaXplcnMiLCJyZWNvZ25pemVyIiwiZ2V0VG91Y2hBY3Rpb24iLCJjbGVhblRvdWNoQWN0aW9ucyIsImpvaW4iLCJwcmV2ZW50RGVmYXVsdHMiLCJwcmV2ZW50ZWQiLCJwcmV2ZW50RGVmYXVsdCIsImhhc05vbmUiLCJoYXNQYW5ZIiwiaGFzUGFuWCIsImlzVGFwUG9pbnRlciIsImlzVGFwTW92ZW1lbnQiLCJpc1RhcFRvdWNoVGltZSIsInByZXZlbnRTcmMiLCJ0b3VjaFZhbHMiLCJjc3NTdXBwb3J0cyIsIkNTUyIsInN1cHBvcnRzIiwiX3JlZHVjZUluc3RhbmNlUHJvcGVydHkiLCJ0b3VjaE1hcCIsIlNUQVRFX1BPU1NJQkxFIiwiU1RBVEVfQkVHQU4iLCJTVEFURV9DSEFOR0VEIiwiU1RBVEVfRU5ERUQiLCJTVEFURV9SRUNPR05JWkVEIiwiU1RBVEVfQ0FOQ0VMTEVEIiwiU1RBVEVfRkFJTEVEIiwiUmVjb2duaXplciIsImRlZmF1bHRzIiwic3RhdGUiLCJzaW11bHRhbmVvdXMiLCJyZXF1aXJlRmFpbCIsInJlY29nbml6ZVdpdGgiLCJvdGhlclJlY29nbml6ZXIiLCJnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyIiwiZHJvcFJlY29nbml6ZVdpdGgiLCJyZXF1aXJlRmFpbHVyZSIsImRyb3BSZXF1aXJlRmFpbHVyZSIsImluZGV4IiwiaGFzUmVxdWlyZUZhaWx1cmVzIiwiY2FuUmVjb2duaXplV2l0aCIsImV2ZW50Iiwic3RhdGVTdHIiLCJhZGRpdGlvbmFsRXZlbnQiLCJ0cnlFbWl0IiwiY2FuRW1pdCIsImlucHV0RGF0YUNsb25lIiwicmVzZXQiLCJkaXJlY3Rpb25TdHIiLCJBdHRyUmVjb2duaXplciIsImF0dHJUZXN0Iiwib3B0aW9uUG9pbnRlcnMiLCJpc1JlY29nbml6ZWQiLCJpc1ZhbGlkIiwiUGFuUmVjb2duaXplciIsInBYIiwicFkiLCJ0aHJlc2hvbGQiLCJkaXJlY3Rpb25UZXN0IiwiaGFzTW92ZWQiLCJQaW5jaFJlY29nbml6ZXIiLCJpbk91dCIsIlByZXNzUmVjb2duaXplciIsIl90aW1lciIsIl9pbnB1dCIsInRpbWUiLCJ2YWxpZFBvaW50ZXJzIiwidmFsaWRNb3ZlbWVudCIsInZhbGlkVGltZSIsIl9zZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiUm90YXRlUmVjb2duaXplciIsIlN3aXBlUmVjb2duaXplciIsIlRhcFJlY29nbml6ZXIiLCJwVGltZSIsInBDZW50ZXIiLCJjb3VudCIsInRhcHMiLCJpbnRlcnZhbCIsInBvc1RocmVzaG9sZCIsInZhbGlkVG91Y2hUaW1lIiwiZmFpbFRpbWVvdXQiLCJ2YWxpZEludGVydmFsIiwidmFsaWRNdWx0aVRhcCIsInRhcENvdW50IiwiSGFtbWVyIiwicHJlc2V0IiwiTWFuYWdlciIsIlZFUlNJT04iLCJkb21FdmVudHMiLCJjc3NQcm9wcyIsInVzZXJTZWxlY3QiLCJ0b3VjaFNlbGVjdCIsInRvdWNoQ2FsbG91dCIsImNvbnRlbnRab29taW5nIiwidXNlckRyYWciLCJ0YXBIaWdobGlnaHRDb2xvciIsIlNUT1AiLCJGT1JDRURfU1RPUCIsImhhbmRsZXJzIiwib2xkQ3NzUHJvcHMiLCJ0b2dnbGVDc3NQcm9wcyIsImFkZCIsInN0b3AiLCJmb3JjZSIsInN0b3BwZWQiLCJjdXJSZWNvZ25pemVyIiwiZXhpc3RpbmciLCJyZW1vdmUiLCJvbiIsImV2ZW50cyIsIm9mZiIsInRyaWdnZXJEb21FdmVudCIsInByb3AiLCJuYW1lIiwiZ2VzdHVyZUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJnZXN0dXJlIiwiZGlzcGF0Y2hFdmVudCIsIlRhcCIsIlBhbiIsIlN3aXBlIiwiUGluY2giLCJSb3RhdGUiLCJQcmVzcyIsIlZlcnNvIiwic3dpcGVWZWxvY2l0eSIsInN3aXBlVGhyZXNob2xkIiwibmF2aWdhdGlvbkR1cmF0aW9uIiwibmF2aWdhdGlvblBhbkR1cmF0aW9uIiwiem9vbUR1cmF0aW9uIiwiZG91YmxlVGFwRGVsYXkiLCJwb3NpdGlvbiIsInBpbmNoaW5nIiwicGFubmluZyIsInN0YXJ0VHJhbnNmb3JtIiwidGFwIiwiZGVsYXkiLCJkZXN0cm95ZWQiLCJfZXZlbnRzIiwiZSIsInNjcm9sbGVyRWwiLCJxdWVyeVNlbGVjdG9yIiwicGFnZVNwcmVhZEVscyIsInBhZ2VTcHJlYWRzIiwidHJhdmVyc2VQYWdlU3ByZWFkcyIsImJ1aWxkUGFnZUlkcyIsImFuaW1hdGlvbiIsImhhbW1lciIsImdldEhhbW1lcklucHV0Q2xhc3MiLCJvblBhblN0YXJ0Iiwib25QYW5Nb3ZlIiwib25QYW5FbmQiLCJvblNpbmdsZXRhcCIsIm9uUGluY2hTdGFydCIsIm9uUGluY2hNb3ZlIiwib25QaW5jaEVuZCIsIm9uUHJlc3MiLCJvbkNvbnRleHRtZW51Iiwib25XaGVlbCIsInBhZ2VJZCIsImdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQiLCJuYXZpZ2F0ZVRvIiwicmVzaXplTGlzdGVuZXIiLCJvblJlc2l6ZSIsInRvdWNoU3RhcnRMaXN0ZW5lciIsIm9uVG91Y2hTdGFydCIsInRvdWNoRW5kTGlzdGVuZXIiLCJvblRvdWNoRW5kIiwiY29uc29sZSIsIndhcm4iLCJnZXRQb3NpdGlvbiIsImdldFBhZ2VTcHJlYWRDb3VudCIsImN1cnJlbnRQb3NpdGlvbiIsImN1cnJlbnRQYWdlU3ByZWFkIiwiZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiIsImFjdGl2ZVBhZ2VTcHJlYWQiLCJjYXJvdXNlbCIsImdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQiLCJpc1Njcm9sbGFibGUiLCJkZWFjdGl2YXRlIiwiYWN0aXZhdGUiLCJ2aXNpYmxlIiwicGFnZVNwcmVhZCIsInNldFZpc2liaWxpdHkiLCJnZXRMZWZ0VHJhbnNmb3JtRnJvbVBhZ2VTcHJlYWQiLCJzZXRQb3NpdGlvbiIsInRyaWdnZXIiLCJuZXdQb3NpdGlvbiIsImFuaW1hdGUiLCJnZXRBY3RpdmVQYWdlU3ByZWFkIiwiZ29uZSIsInByZXZpb3VzUG9zaXRpb24iLCJnZXRXaWR0aCIsInBhZ2VTcHJlYWRTdWJqZWN0IiwiZWxzIiwiTnVtYmVyIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsImluZm8iLCJjb250ZW50WCIsImNvbnRlbnRZIiwicGFnZVgiLCJwYWdlWSIsIm92ZXJsYXlFbHMiLCJpc0luc2lkZUNvbnRlbnRYIiwiaXNJbnNpZGVDb250ZW50WSIsImlzSW5zaWRlQ29udGVudCIsImNvbnRlbnRSZWN0IiwiZ2V0Q29udGVudFJlY3QiLCJnZXRPdmVybGF5RWxzIiwicGFnZUVscyIsIm92ZXJsYXlFbCIsImlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQiLCJpZHgiLCJwYWdlU3ByZWFkUmVjdCIsImdldFJlY3QiLCJwYWdlU3ByZWFkQ29udGVudFJlY3QiLCJjb29yZGluYXRlIiwic2l6ZSIsImN1clNjYWxlIiwicGFnZVNwcmVhZEJvdW5kcyIsImdldFBhZ2VTcHJlYWRCb3VuZHMiLCJjYXJvdXNlbE9mZnNldCIsImNhcm91c2VsU2NhbGVkT2Zmc2V0IiwiYm91bmRzIiwiY2xpcENvb3JkaW5hdGUiLCJtb2JpbGVSZWdleCIsInN1cHBvcnRUb3VjaCIsImVkZ2VUaHJlc2hvbGQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIm5leHQiLCJwcmV2IiwiaXNab29tYWJsZSIsInpvb21UbyIsImdldENvb3JkaW5hdGVJbmZvIiwid2Via2l0RGlyZWN0aW9uSW52ZXJ0ZWRGcm9tRGV2aWNlIiwiY29vcmRpbmF0ZUluZm8iLCJ0aW1lb3V0Iiwiem9vbWVkSW4iLCJ6b29tRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUFlLFNBQVMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7RUFDL0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxZQUFZLFdBQVcsQ0FBQyxFQUFFO0VBQzFDLElBQUksTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0VBQzdELEdBQUc7RUFDSDs7Ozs7Ozs7O0VDSkEsSUFBSUEsT0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0VBQzFCLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFD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
