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

  'use strict';

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

  var es_object_defineProperty = {

  };

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

  'use strict';
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

  var isPure$1 = false;

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

  'use strict';
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

  'use strict';
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

  'use strict';











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

  var es_string_split = {

  };

  var aPossiblePrototype$1 = function (it) {
    if (!isObject(it) && it !== null) {
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
      objectSetPrototypeOf$1 &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf$1($this, NewTargetPrototype);
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

  'use strict';










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

  var es_number_constructor = {

  };

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

  var isPure = true;

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
    mode: isPure ? 'pure' : 'global',
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

  'use strict';




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

  'use strict';









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

  var es_array_splice = {

  };

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

  'use strict';


  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$1(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  'use strict';

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

  var es_array_indexOf = {

  };

  var indexOf$3 = entryVirtual('Array').indexOf;

  var ArrayPrototype$a = Array.prototype;

  var indexOf_1 = function (it) {
    var own = it.indexOf;
    return it === ArrayPrototype$a || (it instanceof Array && own === ArrayPrototype$a.indexOf) ? indexOf$3 : own;
  };

  var indexOf$2 = indexOf_1;

  var indexOf$1 = indexOf$2;

  var addToUnscopables = function () { /* empty */ };

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

  'use strict';







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
  if ((!isPure || NEW_ITERATOR_PROTOTYPE) && !has$3(IteratorPrototype$2, ITERATOR$5)) {
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

  'use strict';



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

  var redefine = function (target, key, value, options) {
    if (options && options.enumerable) target[key] = value;
    else createNonEnumerableProperty$1(target, key, value);
  };

  'use strict';












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
        if (!isPure && objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
            createNonEnumerableProperty$1(CurrentIteratorPrototype, ITERATOR$4, returnThis);
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
    if ((!isPure || FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
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

  'use strict';






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
  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
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

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

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

  'use strict';
  var $forEach$1 = arrayIteration.forEach;


  var STRICT_METHOD$3 = arrayMethodIsStrict$1('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
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

  'use strict';



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

  var es_function_bind = {

  };

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

  'use strict';
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

  var es_array_from = {

  };

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

  var web_timers = {

  };

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

  var es_array_concat = {

  };

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

  var es_object_keys = {

  };

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

  'use strict';



































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
      if (!isPure) {
        redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
      }
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

  var es_symbol = {

  };

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

  var es_object_getOwnPropertyDescriptor = {

  };

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

  var es_object_getOwnPropertyDescriptors = {

  };

  var getOwnPropertyDescriptors$2 = path$1.Object.getOwnPropertyDescriptors;

  var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors$2;

  var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  _export$1({ target: 'Object', stat: true, forced: !descriptors$1, sham: !descriptors$1 }, {
    defineProperties: objectDefineProperties
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

  var defineProperty$2 = defineProperty_1;

  var defineProperty$1 = defineProperty$2;

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

  // empty

  var es_object_toString$1 = /*#__PURE__*/Object.freeze({
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

  'use strict';










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

  var es_array_slice = {

  };

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

  var es_string_replace = {

  };

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

  var isArray$1 = isArray$4;

  var isArray = isArray$1;

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

  'use strict';








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

  var es_object_assign = {

  };

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

  var slice$1 = slice_1;

  var slice = slice$1;

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

  var es_array_sort = {

  };

  var sort$2 = entryVirtual('Array').sort;

  var ArrayPrototype$5 = Array.prototype;

  var sort_1 = function (it) {
    var own = it.sort;
    return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.sort) ? sort$2 : own;
  };

  var sort$1 = sort_1;

  var sort = sort$1;

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
  addToUnscopables(FIND);

  var es_array_find = {

  };

  var find$2 = entryVirtual('Array').find;

  var ArrayPrototype$4 = Array.prototype;

  var find_1 = function (it) {
    var own = it.find;
    return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.find) ? find$2 : own;
  };

  var find$1 = find_1;

  var find = find$1;

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
  addToUnscopables(FIND_INDEX);

  var es_array_findIndex = {

  };

  var findIndex$2 = entryVirtual('Array').findIndex;

  var ArrayPrototype$2 = Array.prototype;

  var findIndex_1 = function (it) {
    var own = it.findIndex;
    return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.findIndex) ? findIndex$2 : own;
  };

  var findIndex$1 = findIndex_1;

  var findIndex = findIndex$1;

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

  'use strict';

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

  var es_array_reduce = {

  };

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
//# sourceMappingURL=verso.js.map
