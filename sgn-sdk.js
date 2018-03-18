(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SGN = factory());
}(this, (function () { 'use strict';

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

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
        var context = this, names, index, lookupHit = false;

        while (context) {
          if (name.indexOf('.') > 0) {
            value = context.view;
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
             **/
            while (value != null && index < names.length) {
              if (index === names.length - 1)
                lookupHit = hasProperty(value, names[index]);

              value = value[names[index++]];
            }
          } else {
            value = context.view[name];
            lookupHit = hasProperty(context.view, name);
          }

          if (lookupHit)
            break;

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
     * Parses and caches the given `template` and returns the array of tokens
     * that is generated from the parse.
     */
    Writer.prototype.parse = function parse (template, tags) {
      var cache = this.cache;
      var tokens = cache[template];

      if (tokens == null)
        tokens = cache[template] = parseTemplate(template, tags);

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
     */
    Writer.prototype.render = function render (template, view, partials) {
      var tokens = this.parse(template);
      var context = (view instanceof Context) ? view : new Context(view);
      return this.renderTokens(tokens, context, partials, template);
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
    Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
      var buffer = '';

      var token, symbol, value;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        value = undefined;
        token = tokens[i];
        symbol = token[0];

        if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
        else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
        else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
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

    Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
      if (!partials) return;

      var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
      if (value != null)
        return this.renderTokens(this.parse(value), context, partials, value);
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
    mustache.version = '2.3.0';
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
     * default writer.
     */
    mustache.render = function render (template, view, partials) {
      if (typeof template !== 'string') {
        throw new TypeError('Invalid template! Template should be a "string" ' +
                            'but "' + typeStr(template) + '" was given as the first ' +
                            'argument for mustache#render(template, view, partials)');
      }

      return defaultWriter.render(template, view, partials);
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

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
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

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.5.3' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
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
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
  });

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});
  var _shared = function (key) {
    return store[key] || (store[key] = {});
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

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = _wks(KEY);
    var fns = exec(_defined, SYMBOL, ''[KEY]);
    var strfn = fns[0];
    var rxfn = fns[1];
    if (_fails(function () {
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    })) {
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

  // @@replace logic
  _fixReWks('replace', 2, function (defined, REPLACE, $replace) {
    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
    return [function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    }, $replace];
  });

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

  var browser = createCommonjsModule(function (module) {
  // shim for using process in browser
  var process = module.exports = {};

  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.

  var cachedSetTimeout;
  var cachedClearTimeout;

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  (function () {
      try {
          if (typeof setTimeout === 'function') {
              cachedSetTimeout = setTimeout;
          } else {
              cachedSetTimeout = defaultSetTimout;
          }
      } catch (e) {
          cachedSetTimeout = defaultSetTimout;
      }
      try {
          if (typeof clearTimeout === 'function') {
              cachedClearTimeout = clearTimeout;
          } else {
              cachedClearTimeout = defaultClearTimeout;
          }
      } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
      }
  } ());
  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }

  process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  };

  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {};

  function noop() {}

  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;

  process.listeners = function (name) { return [] };

  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };

  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };
  });

  var process, util;
  process = browser;
  util = {
    isBrowser: function isBrowser() {
      return typeof process !== 'undefined' && process.browser;
    },
    isNode: function isNode() {
      return !util.isBrowser();
    },
    error: function error(err, options) {
      var key, value;
      err.message = err.message || null;

      if (typeof options === 'string') {
        err.message = options;
      } else if (_typeof(options) === 'object' && options != null) {
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
    formatQueryParams: function formatQueryParams() {
      var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.keys(queryParams).map(function (key) {
        return key + '=' + encodeURIComponent(queryParams[key]);
      }).join('&');
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
    }
  };
  var util_1 = util;

  var Config$1, config$1, translations$1, util$1;
  Config$1 = config;
  translations$1 = translations;
  util$1 = util_1;
  config$1 = new Config$1(); // Set default values.

  config$1.set({
    locale: 'en_US',
    coreUrl: 'https://api.etilbudsavis.dk',
    graphUrl: 'https://graph.service.shopgun.com',
    eventsTrackUrl: 'https://events.service.shopgun.com/track',
    eventsPulseUrl: 'wss://events.service.shopgun.com/pulse',
    assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'
  });
  var core = {
    config: config$1,
    translations: translations$1,
    util: util$1
  };

  var sgn = core;

  var prefixKey;
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

  var prefixKey$1;
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

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // 7.2.8 IsRegExp(argument)


  var MATCH = _wks('match');
  var _isRegexp = function (it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  };

  // @@split logic
  _fixReWks('split', 2, function (defined, SPLIT, $split) {
    var isRegExp = _isRegexp;
    var _split = $split;
    var $push = [].push;
    var $SPLIT = 'split';
    var LENGTH = 'length';
    var LAST_INDEX = 'lastIndex';
    if (
      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
      'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
      'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
      '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
      '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
      ''[$SPLIT](/.?/)[LENGTH]
    ) {
      var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
      // based on es5-shim implementation, need to rework it
      $split = function (separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) return _split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var separator2, match, lastIndex, lastLength, i;
        // Doesn't need flags gy, but they don't hurt
        if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
        while (match = separatorCopy.exec(string)) {
          // `separatorCopy.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0][LENGTH];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
            // eslint-disable-next-line no-loop-func
            if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
              for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
            });
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }
          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
        }
        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
    // Chakra, V8
    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      $split = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
      };
    }
    // 21.1.3.17 String.prototype.split(separator, limit)
    return [function split(separator, limit) {
      var O = defined(this);
      var fn = separator == undefined ? undefined : separator[SPLIT];
      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
    }, $split];
  });

  var SGN$3, prefixKey$2;
  SGN$3 = sgn;
  prefixKey$2 = 'sgn-';
  var clientCookie = {
    get: function get(key) {
      var c, ca, ct, i, len, name, value;

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
        value = {};
      }

      return value;
    },
    set: function set(key, value) {
      var date, days, str;

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
      }
    }
  };

  var SGN$4;
  SGN$4 = sgn;

  var browser$1 = function browser() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    var progressCallback = arguments.length > 2 ? arguments[2] : undefined;
    var formData, header, headers, http, key, method, queryParams, ref, ref1, ref2, ref3, url, value;
    http = new XMLHttpRequest();
    method = (ref = options.method) != null ? ref : 'get';
    url = options.url;
    headers = (ref1 = options.headers) != null ? ref1 : {};

    if (options.qs != null) {
      queryParams = SGN$4.util.formatQueryParams(options.qs);

      if (url.indexOf('?') === -1) {
        url += '?' + queryParams;
      } else {
        url += '&' + queryParams;
      }
    }

    http.open(method.toUpperCase(), url);

    if (options.timeout != null) {
      http.timeout = options.timeout;
    }

    if (options.useCookies === true) {
      http.withCredentials = true;
    }

    if (options.json === true) {
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
    }

    ref2 = options.headers;

    for (header in ref2) {
      value = ref2[header];

      if (value != null) {
        http.setRequestHeader(header, value);
      }
    }

    http.addEventListener('load', function () {
      var body;
      headers = http.getAllResponseHeaders().split('\r\n');
      headers = headers.reduce(function (acc, current, i) {
        var parts;
        parts = current.split(': ');
        acc[parts[0].toLowerCase()] = parts[1];
        return acc;
      }, {});
      body = http.responseText;

      if (options.json === true) {
        body = JSON.parse(body);
      }

      callback(null, {
        statusCode: http.status,
        headers: headers,
        body: body
      });
    });
    http.addEventListener('error', function () {
      callback(new Error());
    });
    http.addEventListener('timeout', function () {
      callback(new Error());
    });
    http.addEventListener('progress', function (e) {
      if (e.lengthComputable && typeof progressCallback === 'function') {
        progressCallback(e.loaded, e.total);
      }
    });

    if (options.formData != null) {
      formData = new FormData();
      ref3 = options.formData;

      for (key in ref3) {
        value = ref3[key];
        formData.append(key, value);
      }

      http.send(formData);
    } else if (options.body != null) {
      if (options.json === true) {
        http.send(JSON.stringify(options.body));
      } else {
        http.send(options.body);
      }
    } else {
      http.send();
    }
  };

  var SGN$5;
  SGN$5 = sgn;

  var fileUpload = function fileUpload() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    var progressCallback = arguments.length > 2 ? arguments[2] : undefined;
    var timeout, url;

    if (options.file == null) {
      throw new Error('File is not defined');
    }

    url = SGN$5.config.get('assetsFileUploadUrl');
    timeout = 1000 * 60 * 60;
    SGN$5.request({
      method: 'post',
      url: url,
      headers: {
        'Accept': 'application/json'
      },
      formData: {
        file: options.file
      },
      timeout: timeout
    }, function (err, data) {
      if (err != null) {
        callback(SGN$5.util.error(new Error('Request error'), {
          code: 'RequestError'
        }));
      } else {
        if (data.statusCode === 200) {
          callback(null, JSON.parse(data.body));
        } else {
          callback(SGN$5.util.error(new Error('Request error'), {
            code: 'RequestError',
            statusCode: data.statusCode
          }));
        }
      }
    }, function (loaded, total) {
      if (typeof progressCallback === 'function') {
        progressCallback({
          progress: loaded / total,
          loaded: loaded,
          total: total
        });
      }
    });
  };

  var assets = {
    fileUpload: fileUpload
  };

  var SGN$6, Tracker, clientLocalStorage, getPool, pool;
  SGN$6 = sgn;
  clientLocalStorage = clientLocal;

  getPool = function getPool() {
    var data;
    data = clientLocalStorage.get('event-tracker-pool');

    if (Array.isArray(data) === false) {
      data = [];
    }

    return data;
  };

  pool = getPool();
  clientLocalStorage.set('event-tracker-pool', []);

  try {
    window.addEventListener('unload', function () {
      pool = pool.concat(getPool());
      clientLocalStorage.set('event-tracker-pool', pool);
    }, false);
  } catch (error) {}

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

        this.dispatching = false;
        this.session = {
          id: SGN$6.util.uuid()
        };
        this.client = {
          trackId: this.trackId,
          id: SGN$6.client.id
        };
        this.view = {
          path: [],
          previousPath: [],
          uri: null
        };
        this.location = {};
        this.application = {};
        this.identity = {}; // Dispatch events periodically.

        this.interval = setInterval(this.dispatch.bind(this), this.dispatchInterval);
        return;
      }

      _createClass(Tracker, [{
        key: "trackEvent",
        value: function trackEvent(type) {
          var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1.0.0';

          if (typeof type !== 'string') {
            throw SGN$6.util.error(new Error('Event type is required'));
          }

          if (this.trackId == null) {
            return;
          }

          pool.push({
            id: SGN$6.util.uuid(),
            type: type,
            version: version,
            recordedAt: new Date().toISOString(),
            sentAt: null,
            client: {
              id: this.client.id,
              trackId: this.client.trackId
            },
            context: this.getContext(),
            properties: properties
          });

          while (this.getPoolSize() > this.poolLimit) {
            pool.shift();
          }

          return this;
        }
      }, {
        key: "identify",
        value: function identify(id) {
          this.identity.id = id;
          return this;
        }
      }, {
        key: "setLocation",
        value: function setLocation() {
          var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var ref, ref1;
          this.location.determinedAt = new Date(location.timestamp).toISOString();
          this.location.latitude = location.latitude;
          this.location.longitude = location.longitude;
          this.location.altitude = location.altitude;
          this.location.accuracy = {
            horizontal: (ref = location.accuracy) != null ? ref.horizontal : void 0,
            vertical: (ref1 = location.accuracy) != null ? ref1.vertical : void 0
          };
          this.location.speed = location.speed;
          this.location.floor = location.floor;
          return this;
        }
      }, {
        key: "setApplication",
        value: function setApplication() {
          var application = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          this.application.name = application.name;
          this.application.version = application.version;
          this.application.build = application.build;
          return this;
        }
      }, {
        key: "setView",
        value: function setView(path) {
          this.view.previousPath = this.view.path;

          if (Array.isArray(path) === true) {
            this.view.path = path;
          }

          this.view.uri = window.location.href;
          return this;
        }
      }, {
        key: "getView",
        value: function getView() {
          var view;
          view = {};

          if (this.view.path.length > 0) {
            view.path = this.view.path;
          }

          if (this.view.previousPath.length > 0) {
            view.previousPath = this.view.previousPath;
          }

          if (this.view.uri != null) {
            view.uri = this.view.uri;
          }

          return view;
        }
      }, {
        key: "getContext",
        value: function getContext() {
          var application, campaign, context, loc, os, ref, ref1, screenDimensions;
          screenDimensions = SGN$6.util.getScreenDimensions();
          os = SGN$6.util.getOS();
          context = {
            userAgent: window.navigator.userAgent,
            locale: navigator.language,
            timeZone: {
              utcOffsetSeconds: SGN$6.util.getUtcOffsetSeconds(),
              utcDstOffsetSeconds: SGN$6.util.getUtcDstOffsetSeconds()
            },
            device: {
              screen: {
                width: screenDimensions.physical.width,
                height: screenDimensions.physical.height,
                density: screenDimensions.density
              }
            },
            session: {
              id: this.session.id
            },
            view: this.getView()
          };
          application = {
            name: this.application.name,
            version: this.application.version,
            build: this.application.build
          };
          campaign = {
            source: SGN$6.util.getQueryParam('utm_source'),
            medium: SGN$6.util.getQueryParam('utm_medium'),
            name: SGN$6.util.getQueryParam('utm_campaign'),
            term: SGN$6.util.getQueryParam('utm_term'),
            content: SGN$6.util.getQueryParam('utm_content')
          };
          loc = {
            determinedAt: this.location.determinedAt,
            latitude: this.location.latitude,
            longitude: this.location.longitude,
            altitude: this.location.altitude,
            speed: this.location.speed,
            floor: this.location.floor,
            accuracy: {
              horizontal: (ref = this.location.accuracy) != null ? ref.horizontal : void 0,
              vertical: (ref1 = this.location.accuracy) != null ? ref1.vertical : void 0
            }
          };

          if (os != null) {
            // Operating system.
            context.os = {
              name: os
            };
          }

          if (document.referrer.length > 0) {
            // Session referrer.
            context.session.referrer = document.referrer;
          } // Application.


          ['name', 'version', 'build'].forEach(function (key) {
            if (typeof application[key] !== 'string' || application[key].length === 0) {
              delete application[key];
            }
          });

          if (Object.keys(application).length > 0) {
            context.application = application;
          } // Campaign.


          ['source', 'medium', 'name', 'term', 'content'].forEach(function (key) {
            if (typeof campaign[key] !== 'string' || campaign[key].length === 0) {
              delete campaign[key];
            }
          });

          if (Object.keys(campaign).length > 0) {
            context.campaign = campaign;
          } // Location.


          ['latitude', 'longitude', 'altitude', 'speed', 'floor'].forEach(function (key) {
            if (typeof loc[key] !== 'number') {
              delete loc[key];
            }
          });

          if (typeof loc.accuracy.horizontal !== 'number') {
            delete loc.accuracy.horizontal;
          }

          if (typeof loc.accuracy.vertical !== 'number') {
            delete loc.accuracy.vertical;
          }

          if (Object.keys(loc.accuracy).length === 0) {
            delete loc.accuracy;
          }

          if (typeof loc.determinedAt !== 'string' || loc.determinedAt.length === 0) {
            delete loc.determinedAt;
          }

          if (Object.keys(loc).length > 0) {
            context.location = loc;
          }

          if (this.identity.id != null) {
            // Person identifier.
            context.personId = this.identity.id;
          }

          return context;
        }
      }, {
        key: "getPoolSize",
        value: function getPoolSize() {
          return pool.length;
        }
      }, {
        key: "dispatch",
        value: function dispatch() {
          var _this = this;

          var events, nacks;

          if (this.dispatching === true || this.getPoolSize() === 0) {
            return;
          }

          if (this.dryRun === true) {
            return pool.splice(0, this.dispatchLimit);
          }

          events = pool.slice(0, this.dispatchLimit);
          nacks = 0;
          this.dispatching = true;
          this.ship(events, function (err, response) {
            _this.dispatching = false;

            if (err == null) {
              response.events.forEach(function (resEvent) {
                if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
                  pool = pool.filter(function (poolEvent) {
                    return poolEvent.id !== resEvent.id;
                  });
                } else {
                  nacks++;
                }
              });

              if (_this.getPoolSize() >= _this.dispatchLimit && nacks === 0) {
                // Keep dispatching until the pool size reaches a sane level.
                _this.dispatch();
              }
            }
          });
          return this;
        }
      }, {
        key: "ship",
        value: function ship() {
          var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var callback = arguments.length > 1 ? arguments[1] : undefined;
          var http, payload, url;
          http = new XMLHttpRequest();
          url = SGN$6.config.get('eventsTrackUrl');
          payload = {
            events: events.map(function (event) {
              event.sentAt = new Date().toISOString();
              return event;
            })
          };
          http.open('POST', url);
          http.setRequestHeader('Content-Type', 'application/json');
          http.setRequestHeader('Accept', 'application/json');
          http.timeout = 1000 * 20;

          http.onload = function () {

            if (http.status === 200) {
              try {
                callback(null, JSON.parse(http.responseText));
              } catch (error) {
                callback(SGN$6.util.error(new Error('Could not parse JSON')));
              }
            } else {
              callback(SGN$6.util.error(new Error('Server did not accept request')));
            }
          };

          http.onerror = function () {
            callback(SGN$6.util.error(new Error('Could not perform network request')));
          };

          http.send(JSON.stringify(payload));
          return this;
        }
      }]);

      return Tracker;
    }();
    Tracker.prototype.defaultOptions = {
      trackId: null,
      dispatchInterval: 3000,
      dispatchLimit: 100,
      poolLimit: 1000,
      dryRun: false
    };
    return Tracker;
  }.call(commonjsGlobal);

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

  var SGN$7, parseCookies;
  SGN$7 = sgn;

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

  var request = function request() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    var appKey, authToken, authTokenCookieName, timeout, url;
    url = SGN$7.config.get('graphUrl');
    timeout = 1000 * 12;
    appKey = SGN$7.config.get('appKey');
    authToken = SGN$7.config.get('authToken');
    authTokenCookieName = 'shopgun-auth-token';
    options = {
      method: 'post',
      url: url,
      timeout: timeout,
      json: true,
      headers: {},
      body: {
        query: options.query,
        operationName: options.operationName,
        variables: options.variables
      }
    };

    if (appKey != null) {
      // Apply authorization header when app key is provided to avoid rate limiting.
      options.headers.Authorization = 'Basic ' + SGN$7.util.btoa("app-key:".concat(appKey));
    } // Set cookies manually in node.js.


    if (SGN$7.util.isNode() && authToken != null) {
      options.cookies = [{
        key: authTokenCookieName,
        value: authToken,
        url: url
      }];
    } else if (SGN$7.util.isBrowser()) {
      options.useCookies = true;
    }

    SGN$7.request(options, function (err, data) {
      var authCookie, cookies, ref;

      if (err != null) {
        callback(SGN$7.util.error(new Error('Graph request error'), {
          code: 'GraphRequestError'
        }));
      } else {
        // Update auth token as it might have changed.
        if (SGN$7.util.isNode()) {
          cookies = parseCookies((ref = data.headers) != null ? ref['set-cookie'] : void 0);
          authCookie = cookies[authTokenCookieName];

          if (SGN$7.config.get('authToken') !== authCookie) {
            SGN$7.config.set('authToken', authCookie);
          }
        }

        if (data.statusCode === 200) {
          callback(null, data.body);
        } else {
          callback(SGN$7.util.error(new Error('Graph API error'), {
            code: 'GraphAPIError',
            statusCode: data.statusCode
          }));
        }
      }
    });
  };

  var graph = {
    request: request
  };

  var SGN$8, _request;

  SGN$8 = sgn;

  _request = function request() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var runs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    SGN$8.CoreKit.session.ensure(function (err) {
      var appSecret, appVersion, clientId, geo, headers, json, locale, qs, ref, ref1, ref2, token, url;

      if (err != null) {
        return callback(err);
      }

      url = (ref = options.url) != null ? ref : '';
      headers = (ref1 = options.headers) != null ? ref1 : {};
      json = typeof options.json === 'boolean' ? options.json : true;
      token = SGN$8.config.get('coreSessionToken');
      clientId = SGN$8.config.get('coreSessionClientId');
      appVersion = SGN$8.config.get('appVersion');
      appSecret = SGN$8.config.get('appSecret');
      locale = SGN$8.config.get('locale');
      qs = (ref2 = options.qs) != null ? ref2 : {};
      geo = options.geolocation;
      headers['X-Token'] = token;

      if (appSecret != null) {
        headers['X-Signature'] = SGN$8.CoreKit.session.sign(appSecret, token);
      }

      if (locale != null) {
        qs.r_locale = locale;
      }

      if (appVersion != null) {
        qs.api_av = appVersion;
      }

      if (clientId != null) {
        qs.client_id = clientId;
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

      return SGN$8.request({
        method: options.method,
        url: SGN$8.config.get('coreUrl') + url,
        qs: qs,
        body: options.body,
        formData: options.formData,
        headers: headers,
        json: json,
        useCookies: false
      }, function (err, data) {
        var ref3, responseToken;

        if (err != null) {
          callback(SGN$8.util.error(new Error('Core request error'), {
            code: 'CoreRequestError'
          }));
        } else {
          token = SGN$8.config.get('coreSessionToken');
          responseToken = data.headers['x-token'];

          if (responseToken && token !== responseToken) {
            SGN$8.CoreKit.session.saveToken(responseToken);
          }

          if (data.statusCode >= 200 && data.statusCode < 300 || data.statusCode === 304) {
            callback(null, data.body);
          } else {
            if (runs === 0 && data.body != null && ((ref3 = data.body.code) === 1101 || ref3 === 1107 || ref3 === 1108)) {
              SGN$8.config.set({
                coreSessionToken: void 0
              });

              _request(options, callback, ++runs);
            } else {
              callback(SGN$8.util.error(new Error('Core API error'), {
                code: 'CoreAPIError',
                statusCode: data.statusCode
              }), data.body);
            }
          }
        }
      });
    });
  };

  var request_1 = _request;

  var convertHex = createCommonjsModule(function (module) {
  !function(globals) {

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

  function sha256(message, options) {  if (message.constructor === String) {
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

  var SGN$9, callbackQueue, clientCookieStorage, renewed, session, sha256$1;
  SGN$9 = sgn;
  sha256$1 = sha256;
  clientCookieStorage = clientCookie;
  callbackQueue = [];
  renewed = false;
  session = {
    ttl: 1 * 60 * 60 * 24 * 60,
    saveToken: function saveToken(token) {
      if (!token) {
        throw new Error('No token provided for saving');
      }

      SGN$9.config.set({
        coreSessionToken: token
      });
      session.saveCookie();
    },
    saveClientId: function saveClientId(clientId) {
      SGN$9.config.set({
        coreSessionClientId: clientId
      });
      session.saveCookie();
    },
    saveCookie: function saveCookie() {
      clientCookieStorage.set('session', {
        token: SGN$9.config.get('coreSessionToken'),
        client_id: SGN$9.config.get('coreSessionClientId')
      });
    },
    create: function create(callback) {
      SGN$9.request({
        method: 'post',
        url: SGN$9.config.get('coreUrl') + '/v2/sessions',
        json: true,
        qs: {
          api_key: SGN$9.config.get('appKey'),
          token_ttl: session.ttl
        }
      }, function (err, data) {
        if (err != null) {
          callback(err);
        } else if (data.statusCode === 201) {
          session.saveToken(data.body.token);
          session.saveClientId(data.body.client_id);
          callback(err, data.body);
        } else {
          callback(new Error('Could not create session'));
        }
      });
    },
    update: function update(callback) {
      var appSecret, headers, token;
      headers = {};
      token = SGN$9.config.get('coreSessionToken');
      appSecret = SGN$9.config.get('appSecret');
      headers['X-Token'] = token;

      if (appSecret != null) {
        headers['X-Signature'] = session.sign(appSecret, token);
      }

      SGN$9.request({
        url: SGN$9.config.get('coreUrl') + '/v2/sessions',
        headers: headers,
        json: true
      }, function (err, data) {
        if (err != null) {
          callback(err);
        } else if (data.statusCode === 200) {
          session.saveToken(data.body.token);
          session.saveClientId(data.body.client_id);
          callback(err, data.body);
        } else {
          callback(new Error('Could not update session'));
        }
      });
    },
    renew: function renew(callback) {
      var appSecret, headers, token;
      headers = {};
      token = SGN$9.config.get('coreSessionToken');
      appSecret = SGN$9.config.get('appSecret');
      headers['X-Token'] = token;

      if (appSecret != null) {
        headers['X-Signature'] = session.sign(appSecret, token);
      }

      SGN$9.request({
        method: 'put',
        url: SGN$9.config.get('coreUrl') + '/v2/sessions',
        headers: headers,
        json: true
      }, function (err, data) {
        if (err != null) {
          callback(err);
        } else if (data.statusCode === 200) {
          session.saveToken(data.body.token);
          session.saveClientId(data.body.client_id);
          callback(err, data.body);
        } else {
          callback(new Error('Could not renew session'));
        }
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
        if (SGN$9.config.get('coreSessionToken') == null) {
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

  var request$1, session$1;
  request$1 = request_1;
  session$1 = session_1;
  var core$1 = {
    request: request$1,
    session: session$1
  };

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

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
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

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  var SPECIES = _wks('species');

  var _arraySpeciesConstructor = function (original) {
    var C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES];
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

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = _wks('unscopables');
  var ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
  var _addToUnscopables = function (key) {
    ArrayProto[UNSCOPABLES][key] = true;
  };

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

  var verso = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
  	module.exports = factory();
  }(commonjsGlobal, (function () {
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

  function createCommonjsModule$$1(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _global = createCommonjsModule$$1(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
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

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var _core = createCommonjsModule$$1(function (module) {
  var core = module.exports = { version: '2.5.1' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _redefine = createCommonjsModule$$1(function (module) {
  var SRC = _uid('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
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
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
  });

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});
  var _shared = function (key) {
    return store[key] || (store[key] = {});
  };

  var _wks = createCommonjsModule$$1(function (module) {
  var store = _shared('wks');

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = _wks(KEY);
    var fns = exec(_defined, SYMBOL, ''[KEY]);
    var strfn = fns[0];
    var rxfn = fns[1];
    if (_fails(function () {
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    })) {
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

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // 7.2.8 IsRegExp(argument)


  var MATCH = _wks('match');
  var _isRegexp = function (it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  };

  // @@split logic
  _fixReWks('split', 2, function (defined, SPLIT, $split) {
    var isRegExp = _isRegexp;
    var _split = $split;
    var $push = [].push;
    var $SPLIT = 'split';
    var LENGTH = 'length';
    var LAST_INDEX = 'lastIndex';
    if (
      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
      'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
      'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
      '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
      '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
      ''[$SPLIT](/.?/)[LENGTH]
    ) {
      var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
      // based on es5-shim implementation, need to rework it
      $split = function (separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) return _split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var separator2, match, lastIndex, lastLength, i;
        // Doesn't need flags gy, but they don't hurt
        if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
        while (match = separatorCopy.exec(string)) {
          // `separatorCopy.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0][LENGTH];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
            // eslint-disable-next-line no-loop-func
            if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
              for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
            });
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }
          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
        }
        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
    // Chakra, V8
    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      $split = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
      };
    }
    // 21.1.3.17 String.prototype.split(separator, limit)
    return [function split(separator, limit) {
      var O = defined(this);
      var fn = separator == undefined ? undefined : separator[SPLIT];
      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
    }, $split];
  });

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

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  var _strictMethod = function (method, arg) {
    return !!method && _fails(function () {
      // eslint-disable-next-line no-useless-call
      arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
    });
  };

  var $sort = [].sort;
  var test = [1, 2, 3];

  _export(_export.P + _export.F * (_fails(function () {
    // IE8-
    test.sort(undefined);
  }) || !_fails(function () {
    // V8 bug
    test.sort(null);
    // Old WebKit
  }) || !_strictMethod($sort)), 'Array', {
    // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === undefined
        ? $sort.call(_toObject(this))
        : $sort.call(_toObject(this), _aFunction(comparefn));
    }
  });

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
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

  var f$1 = Object.getOwnPropertySymbols;

  var _objectGops = {
  	f: f$1
  };

  var f$2 = {}.propertyIsEnumerable;

  var _objectPie = {
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

  // @@replace logic
  _fixReWks('replace', 2, function (defined, REPLACE, $replace) {
    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
    return [function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    }, $replace];
  });

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
   * set a timeout with a given scope
   * @param {Function} fn
   * @param {Number} timeout
   * @param {Object} context
   * @returns {number}
   */

  function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
  }
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

    if (!obj) {
      return;
    }

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
   * wrap a method with a deprecation warning and stack trace
   * @param {Function} method
   * @param {String} name
   * @param {String} message
   * @returns {Function} A new function wrapping the supplied method.
   */


  function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function () {
      var e = new Error('get-stack-trace');
      var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
      var log = window.console && (window.console.warn || window.console.log);

      if (log) {
        log.call(window.console, deprecationMessage, stack);
      }

      return method.apply(this, arguments);
    };
  }
  /**
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} target
   * @param {...Object} objects_to_assign
   * @returns {Object} target
   */


  var assign;

  if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];

        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }

      return output;
    };
  } else {
    assign = Object.assign;
  }
  /**
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} dest
   * @param {Object} src
   * @param {Boolean} [merge=false]
   * @returns {Object} dest
   */


  var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;

    while (i < keys.length) {
      if (!merge || merge && dest[keys[i]] === undefined) {
        dest[keys[i]] = src[keys[i]];
      }

      i++;
    }

    return dest;
  }, 'extend', 'Use `assign`.');
  /**
   * merge the values from src in the dest.
   * means that properties that exist in dest will not be overwritten by src
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} dest
   */

  var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
  }, 'merge', 'Use `assign`.');
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

    if (properties) {
      assign(childP, properties);
    }
  }
  /**
   * simple function bind
   * @param {Function} fn
   * @param {Object} context
   * @returns {Function}
   */


  function bindFn(fn, context) {
    return function boundFn() {
      return fn.apply(context, arguments);
    };
  }
  /**
   * let a boolean value also be a function that must return a boolean
   * this first item in args will be used as the context
   * @param {Boolean|Function} val
   * @param {Array} [args]
   * @returns {Boolean}
   */


  function boolOrFn(val, args) {
    if (_typeof(val) == TYPE_FUNCTION) {
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
    each(splitStr(types), function (type) {
      target.addEventListener(type, handler, false);
    });
  }
  /**
   * removeEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function removeEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.removeEventListener(type, handler, false);
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
      if (node == parent) {
        return true;
      }

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
   * find if a array contains the object using indexOf or a simple polyFill
   * @param {Array} src
   * @param {String} find
   * @param {String} [findByKey]
   * @return {Boolean|Number} false when not found, or the index
   */


  function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
      return src.indexOf(find);
    } else {
      var i = 0;

      while (i < src.length) {
        if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
          return i;
        }

        i++;
      }

      return -1;
    }
  }
  /**
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */


  function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  }
  /**
   * unique array with objects based on a key (like 'id') or just by the array's value
   * @param {Array} src [{id:1},{id:2},{id:1}]
   * @param {String} [key]
   * @param {Boolean} [sort=False]
   * @returns {Array} [{id:1},{id:2}]
   */


  function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
      var val = key ? src[i][key] : src[i];

      if (inArray(values, val) < 0) {
        results.push(src[i]);
      }

      values[i] = val;
      i++;
    }

    if (sort) {
      if (!key) {
        results = results.sort();
      } else {
        results = results.sort(function sortUniqueArray(a, b) {
          return a[key] > b[key];
        });
      }
    }

    return results;
  }
  /**
   * get the prefixed property
   * @param {Object} obj
   * @param {String} property
   * @returns {String|Undefined} prefixed
   */


  function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);
    var i = 0;

    while (i < VENDOR_PREFIXES.length) {
      prefix = VENDOR_PREFIXES[i];
      prop = prefix ? prefix + camelProp : property;

      if (prop in obj) {
        return prop;
      }

      i++;
    }

    return undefined;
  }
  /**
   * get a unique id
   * @returns {number} uniqueId
   */


  var _uniqueId = 1;

  function uniqueId() {
    return _uniqueId++;
  }
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
    var Type;
    var inputClass = manager.options.inputClass;

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

    if (isFirst) {
      manager.session = {};
    } // source event is the normalized value of the domEvents
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

    if (!session.firstInput) {
      session.firstInput = simpleCloneInputData(input);
    } // to compute scale and rotation we need to store the multiple touches


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

    if (hasParent(input.srcEvent.target, target)) {
      target = input.srcEvent.target;
    }

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
    var pointers = [];
    var i = 0;

    while (i < input.pointers.length) {
      pointers[i] = {
        clientX: round(input.pointers[i].clientX),
        clientY: round(input.pointers[i].clientY)
      };
      i++;
    }

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

    var x = 0,
        y = 0,
        i = 0;

    while (i < pointersLength) {
      x += pointers[i].clientX;
      y += pointers[i].clientY;
      i++;
    }

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


  function getVelocity(deltaTime, x, y) {
    return {
      x: x / deltaTime || 0,
      y: y / deltaTime || 0
    };
  }
  /**
   * get the direction between two points
   * @param {Number} x
   * @param {Number} y
   * @return {Number} direction
   */


  function getDirection(x, y) {
    if (x === y) {
      return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
      return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }
  /**
   * calculate the absolute distance between two points
   * @param {Object} p1 {x, y}
   * @param {Object} p2 {x, y}
   * @param {Array} [props] containing x and y keys
   * @return {Number} distance
   */


  function getDistance(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.sqrt(x * x + y * y);
  }
  /**
   * calculate the angle between two coordinates
   * @param {Object} p1
   * @param {Object} p2
   * @param {Array} [props] containing x and y keys
   * @return {Number} angle
   */


  function getAngle(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
  }
  /**
   * calculate the rotation degrees between two pointersets
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} rotation
   */


  function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }
  /**
   * calculate the scale factor between two pointersets
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} scale
   */


  function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }

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
    handler: function MEhandler(ev) {
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
    handler: function PEhandler(ev) {
      var store = this.store;
      var removePointer = false;
      var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
      var isTouch = pointerType == INPUT_TYPE_TOUCH; // get index of the event in the store

      var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
        if (storeIndex < 0) {
          store.push(ev);
          storeIndex = store.length - 1;
        }
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        removePointer = true;
      } // it not found, so the pointer hasn't been down (so it's probably a hover)


      if (storeIndex < 0) {
        return;
      } // update the event in the store


      store[storeIndex] = ev;
      this.callback(this.manager, eventType, {
        pointers: store,
        changedPointers: [ev],
        pointerType: pointerType,
        srcEvent: ev
      });

      if (removePointer) {
        // remove from the store
        store.splice(storeIndex, 1);
      }
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
    handler: function TEhandler(ev) {
      var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

      if (type === INPUT_START) {
        this.started = true;
      }

      if (!this.started) {
        return;
      }

      var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

      if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
        this.started = false;
      }

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
    handler: function MTEhandler(ev) {
      var type = TOUCH_INPUT_MAP[ev.type];
      var touches = getTouches.call(this, ev, type);

      if (!touches) {
        return;
      }

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

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target; // get target touches from touches

    targetTouches = allTouches.filter(function (touch) {
      return hasParent(touch.target, target);
    }); // collect touches

    if (type === INPUT_START) {
      i = 0;

      while (i < targetTouches.length) {
        targetIds[targetTouches[i].identifier] = true;
        i++;
      }
    } // filter changed touches to only contain touches that exist in the collected target ids


    i = 0;

    while (i < changedTouches.length) {
      if (targetIds[changedTouches[i].identifier]) {
        changedTargetTouches.push(changedTouches[i]);
      } // cleanup removed touches


      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouches[i].identifier];
      }

      i++;
    }

    if (!changedTargetTouches.length) {
      return;
    }

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
    var handler = bindFn(this.handler, this);
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
    handler: function TMEhandler(manager, inputEvent, inputData) {
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

  function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX,
        y = eventData.srcEvent.clientY;

    for (var i = 0; i < this.lastTouches.length; i++) {
      var t = this.lastTouches[i];
      var dx = Math.abs(x - t.x),
          dy = Math.abs(y - t.y);

      if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
        return true;
      }
    }

    return false;
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
      each(this.manager.recognizers, function (recognizer) {
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
    if (inStr(actions, TOUCH_ACTION_NONE)) {
      return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning

    if (hasPanX && hasPanY) {
      return TOUCH_ACTION_NONE;
    } // pan-x OR pan-y


    if (hasPanX || hasPanY) {
      return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    } // manipulation


    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
      return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
  }

  function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION()) {
      return false;
    }

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
    this.options = assign({}, this.defaults, options || {});
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
      if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
        return this;
      }

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
      if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
        return this;
      }

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
      if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
        return this;
      }

      var requireFail = this.requireFail;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (inArray(requireFail, otherRecognizer) === -1) {
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
      if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      var index = inArray(this.requireFail, otherRecognizer);

      if (index > -1) {
        this.requireFail.splice(index, 1);
      }

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
      if (this.canEmit()) {
        return this.emit(input);
      } // it's failing anyway


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
      var inputDataClone = assign({}, inputData); // is is enabled and allow recognizing?

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


  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;

    if (manager) {
      return manager.get(otherRecognizer);
    }

    return otherRecognizer;
  }
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

      if (direction & DIRECTION_HORIZONTAL) {
        actions.push(TOUCH_ACTION_PAN_Y);
      }

      if (direction & DIRECTION_VERTICAL) {
        actions.push(TOUCH_ACTION_PAN_X);
      }

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

      if (direction) {
        input.additionalEvent = this.options.event + direction;
      }

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
        this._timer = setTimeoutContext(function () {
          this.state = STATE_RECOGNIZED;
          this.tryEmit();
        }, options.time, this);
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

      if (direction) {
        this.manager.emit(this.options.event + direction, input);
      }

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
        if (input.eventType != INPUT_END) {
          return this.failTimeout();
        }

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
            this._timer = setTimeoutContext(function () {
              this.state = STATE_RECOGNIZED;
              this.tryEmit();
            }, options.interval, this);
            return STATE_BEGAN;
          }
        }
      }

      return STATE_FAILED;
    },
    failTimeout: function failTimeout() {
      this._timer = setTimeoutContext(function () {
        this.state = STATE_FAILED;
      }, this.options.interval, this);
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
    this.options = assign({}, Hammer.defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = this.add(new item[0](item[1]));
      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }

  Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function set(options) {
      assign(this.options, options); // Options that need a little more setup

      if (options.touchAction) {
        this.touchAction.update();
      }

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

      if (session.stopped) {
        return;
      } // run the touch-action polyfill


      this.touchAction.preventDefaults(inputData);
      var recognizer;
      var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
      // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
      // if no recognizer is detecting a thing, it is set to `null`

      var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
      // or when we're in a new session

      if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
        curRecognizer = session.curRecognizer = null;
      }

      var i = 0;

      while (i < recognizers.length) {
        recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
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

        i++;
      }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function get(recognizer) {
      if (recognizer instanceof Recognizer) {
        return recognizer;
      }

      var recognizers = this.recognizers;

      for (var i = 0; i < recognizers.length; i++) {
        if (recognizers[i].options.event == recognizer) {
          return recognizers[i];
        }
      }

      return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function add(recognizer) {
      if (invokeArrayArg(recognizer, 'add', this)) {
        return this;
      } // remove existing


      var existing = this.get(recognizer.options.event);

      if (existing) {
        this.remove(existing);
      }

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
      if (invokeArrayArg(recognizer, 'remove', this)) {
        return this;
      }

      recognizer = this.get(recognizer); // let's make sure this recognizer exists

      if (recognizer) {
        var recognizers = this.recognizers;
        var index = inArray(recognizers, recognizer);

        if (index !== -1) {
          recognizers.splice(index, 1);
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
      if (events === undefined) {
        return;
      }

      if (handler === undefined) {
        return;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
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
      if (events === undefined) {
        return;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        if (!handler) {
          delete handlers[event];
        } else {
          handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
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
      if (this.options.domEvents) {
        triggerDomEvent(event, data);
      } // no handlers, so skip it all


      var handlers = this.handlers[event] && this.handlers[event].slice();

      if (!handlers || !handlers.length) {
        return;
      }

      data.type = event;

      data.preventDefault = function () {
        data.srcEvent.preventDefault();
      };

      var i = 0;

      while (i < handlers.length) {
        handlers[i](data);
        i++;
      }
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

    if (!element.style) {
      return;
    }

    var prop;
    each(manager.options.cssProps, function (value, name) {
      prop = prefixed(element.style, name);

      if (add) {
        manager.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = manager.oldCssProps[prop] || '';
      }
    });

    if (!add) {
      manager.oldCssProps = {};
    }
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
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
  });
  var hammer = Hammer;

  var microevent = createCommonjsModule$$1(function (module) {
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
        var boundingClientRect, i, len, offsetLeft, offsetLeftDelta, offsetTop, offsetTopDelta, pageEl, pageRect, rect, ref, ref1, ref2, ref3, ref4;
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
          boundingClientRect = pageEl.getBoundingClientRect();
          offsetTop = pageEl.offsetTop;
          offsetLeft = pageEl.offsetLeft;
          offsetTopDelta = offsetTop - boundingClientRect.top;
          offsetLeftDelta = offsetLeft - boundingClientRect.left;
          pageRect = {
            top: boundingClientRect.top + offsetTopDelta,
            left: boundingClientRect.left + offsetLeftDelta,
            right: boundingClientRect.right + offsetLeftDelta,
            bottom: boundingClientRect.bottom + offsetTopDelta,
            width: boundingClientRect.width,
            height: boundingClientRect.height
          };

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
        transform = "translate3d(".concat(x, ", ").concat(y, ", 0px) scale3d(").concat(scale, ", ").concat(scale, ", 1)");

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
      this.scrollerEl.addEventListener('contextmenu', this.onContextmenu.bind(this));
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
      key: "onSingletap",
      value: function onSingletap(e) {
        var _this3 = this;

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
              _this3.trigger(zoomEvent, {
                position: position
              });
            });
          }
        } else {
          this.tap.count++;
          this.tap.timeout = setTimeout(function () {
            _this3.tap.count = 0;

            _this3.trigger('clicked', coordinateInfo);
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

  })));

  });

  var MicroEvent$2, PagedPublicationPageSpread, SGN$11;
  MicroEvent$2 = microevent;
  SGN$11 = sgn;

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
          SGN$11.util.loadImage(image, function (err, width, height) {
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
          SGN$11.util.loadImage(image, function (err) {
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

  var MicroEvent$3, PageSpread, PagedPublicationPageSpreads, SGN$12;
  MicroEvent$3 = microevent;
  PageSpread = pageSpread;
  SGN$12 = sgn;

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
        this.collection.forEach(function (pageSpread$$1) {
          return frag.appendChild(pageSpread$$1.el);
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
          midstPageSpreads = SGN$12.util.chunk(pages, 2);

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
          var id, pageSpread$$1;
          id = "".concat(pageMode, "-").concat(i);
          pageSpread$$1 = new PageSpread({
            width: width,
            maxZoomScale: maxZoomScale,
            pages: pages,
            id: id
          });
          pageSpread$$1.bind('pageLoaded', function (e) {
            return _this.trigger('pageLoaded', e);
          });
          pageSpread$$1.bind('pagesLoaded', function (e) {
            return _this.trigger('pagesLoaded', e);
          });
          ids[id] = pageSpread$$1;
          return pageSpread$$1;
        });
        this.ids = ids;
        return this;
      }
    }]);

    return PagedPublicationPageSpreads;
  }();

  MicroEvent$3.mixin(PagedPublicationPageSpreads);
  var pageSpreads = PagedPublicationPageSpreads;

  var MicroEvent$4, PageSpreads, PagedPublicationCore, SGN$13, Verso;
  MicroEvent$4 = microevent;
  Verso = verso;
  PageSpreads = pageSpreads;
  SGN$13 = sgn;

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
          this.visibilityChangeListener = this.visibilityChange.bind(this);
          this.resizeListener = SGN$13.util.throttle(this.resize, this.getOption('resizeDelay'), this);
          this.unloadListener = this.unload.bind(this);
          document.addEventListener('visibilitychange', this.visibilityChangeListener, false);
          window.addEventListener('resize', this.resizeListener, false);
          window.addEventListener('beforeunload', this.unloadListener, false);
          this.els.root.setAttribute('data-started', '');
          this.els.root.setAttribute('tabindex', '-1');
          this.els.root.focus();
        }
      }, {
        key: "destroy",
        value: function destroy() {
          var i, len, pageSpreadEl, pageSpreadEls, verso$$1;
          verso$$1 = this.getVerso();
          pageSpreadEls = verso$$1.el.querySelectorAll('.sgn-pp__page-spread');
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

          verso$$1.destroy();
          document.removeEventListener('visibilitychange', this.visibilityChangeListener, false);
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
          this.els.root.setAttribute('data-color-brightness', SGN$13.util.getColorBrightness(color));
          this.els.root.style.backgroundColor = color;
        }
      }, {
        key: "createVerso",
        value: function createVerso() {
          var verso$$1;
          verso$$1 = new Verso(this.els.verso, {
            pageId: this.pageId
          });
          verso$$1.pageSpreads.forEach(this.overridePageSpreadContentRect.bind(this));
          verso$$1.bind('beforeNavigation', this.beforeNavigation.bind(this));
          verso$$1.bind('afterNavigation', this.afterNavigation.bind(this));
          verso$$1.bind('attemptedNavigation', this.attemptedNavigation.bind(this));
          verso$$1.bind('clicked', this.clicked.bind(this));
          verso$$1.bind('doubleClicked', this.doubleClicked.bind(this));
          verso$$1.bind('pressed', this.pressed.bind(this));
          verso$$1.bind('contextmenu', this.contextmenu.bind(this));
          verso$$1.bind('panStart', this.panStart.bind(this));
          verso$$1.bind('panEnd', this.panEnd.bind(this));
          verso$$1.bind('zoomedIn', this.zoomedIn.bind(this));
          verso$$1.bind('zoomedOut', this.zoomedOut.bind(this));
          return verso$$1;
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
          var i, len, pageIds, pageSpreadEl, pageSpreadEls, verso$$1;

          if (this.pageMode === pageMode) {
            return this;
          }

          verso$$1 = this.getVerso();
          pageIds = verso$$1.getPageSpreadFromPosition(verso$$1.getPosition()).getPageIds();
          pageSpreadEls = this.getVerso().el.querySelectorAll('.sgn-pp__page-spread');
          this.pageMode = pageMode;
          this.pageSpreads.update(this.pageMode);

          for (i = 0, len = pageSpreadEls.length; i < len; i++) {
            pageSpreadEl = pageSpreadEls[i];
            pageSpreadEl.parentNode.removeChild(pageSpreadEl);
          }

          this.els.pages.parentNode.insertBefore(this.pageSpreads.getFrag(), this.els.pages);
          verso$$1.refresh();
          verso$$1.navigateTo(verso$$1.getPageSpreadPositionFromPageId(pageIds[0]), {
            duration: 0
          });
          verso$$1.pageSpreads.forEach(this.overridePageSpreadContentRect.bind(this));
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
        key: "visibilityChange",
        value: function visibilityChange() {
          var eventName, pageSpread;
          pageSpread = this.getVerso().getPageSpreadFromPosition(this.getVerso().getPosition());
          eventName = document.hidden === true ? 'disappeared' : 'appeared';
          this.trigger(eventName, {
            pageSpread: this.pageSpreads.get(pageSpread.id)
          });
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
        var el, height, left, ref, top, width;
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

        el.innerHTML = Mustache$1.render((ref = hotspot.template) != null ? ref : '', hotspot);
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

  var MicroEvent$6, PagedPublicationControls, SGN$14, keyCodes$1;
  MicroEvent$6 = microevent;
  SGN$14 = sgn;
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
      this.keyDownListener = SGN$14.util.throttle(this.keyDown, 150, this);

      if (this.options.keyboard === true) {
        this.els.root.addEventListener('keydown', this.keyDownListener, false);
      }

      if (this.els.prevControl != null) {
        this.els.prevControl.addEventListener('click', this.prevClicked.bind(this), false);
      }

      if (this.els.nextControl != null) {
        this.els.nextControl.addEventListener('click', this.nextClicked.bind(this), false);
      }

      if (this.els.close != null) {
        this.els.close.addEventListener('click', this.closeClicked.bind(this), false);
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
    function PagedPublicationEventTracking() {
      _classCallCheck(this, PagedPublicationEventTracking);

      this.doubleClicked = this.doubleClicked.bind(this);
      this.hidden = true;
      this.pageSpread = null;
      this.bind('appeared', this.appeared.bind(this));
      this.bind('disappeared', this.disappeared.bind(this));
      this.bind('beforeNavigation', this.beforeNavigation.bind(this));
      this.bind('afterNavigation', this.afterNavigation.bind(this));
      this.bind('attemptedNavigation', this.attemptedNavigation.bind(this));
      this.bind('clicked', this.clicked.bind(this));
      this.bind('doubleClicked', this.doubleClicked.bind(this));
      this.bind('pressed', this.pressed.bind(this));
      this.bind('panStart', this.panStart.bind(this));
      this.bind('zoomedIn', this.zoomedIn.bind(this));
      this.bind('zoomedOut', this.zoomedOut.bind(this));
      this.bind('destroyed', this.destroy.bind(this));
      return;
    }

    _createClass(PagedPublicationEventTracking, [{
      key: "destroy",
      value: function destroy() {
        this.pageSpreadDisappeared();
      }
    }, {
      key: "trackEvent",
      value: function trackEvent(type) {
        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.trigger('trackEvent', {
          type: type,
          properties: properties
        });
      }
    }, {
      key: "trackOpened",
      value: function trackOpened(properties) {
        this.trackEvent('paged-publication-opened', properties);
        return this;
      }
    }, {
      key: "trackPageClicked",
      value: function trackPageClicked(properties) {
        this.trackEvent('paged-publication-page-clicked', properties);
        return this;
      }
    }, {
      key: "trackPageDoubleClicked",
      value: function trackPageDoubleClicked(properties) {
        this.trackEvent('paged-publication-page-double-clicked', properties);
        return this;
      }
    }, {
      key: "trackPageLongPressed",
      value: function trackPageLongPressed(properties) {
        this.trackEvent('paged-publication-page-long-pressed', properties);
        return this;
      }
    }, {
      key: "trackPageHotspotsClicked",
      value: function trackPageHotspotsClicked(properties) {
        this.trackEvent('paged-publication-page-hotspots-clicked', properties);
        return this;
      }
    }, {
      key: "trackPageSpreadAppeared",
      value: function trackPageSpreadAppeared(properties) {
        this.trackEvent('paged-publication-page-spread-appeared', properties);
        return this;
      }
    }, {
      key: "trackPageSpreadDisappeared",
      value: function trackPageSpreadDisappeared(properties) {
        this.trackEvent('paged-publication-page-spread-disappeared', properties);
        return this;
      }
    }, {
      key: "trackPageSpreadZoomedIn",
      value: function trackPageSpreadZoomedIn(properties) {
        this.trackEvent('paged-publication-page-spread-zoomed-in', properties);
        return this;
      }
    }, {
      key: "trackPageSpreadZoomedOut",
      value: function trackPageSpreadZoomedOut(properties) {
        this.trackEvent('paged-publication-page-spread-zoomed-out', properties);
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
      key: "clicked",
      value: function clicked(e) {
        var properties;

        if (e.page != null) {
          properties = {
            pageNumber: e.page.pageNumber,
            x: e.verso.pageX,
            y: e.verso.pageY
          };
          this.trackPageClicked({
            pagedPublicationPage: properties
          });

          if (e.verso.overlayEls.length > 0) {
            this.trackPageHotspotsClicked({
              pagedPublicationPage: properties
            });
          }
        }
      }
    }, {
      key: "doubleClicked",
      value: function doubleClicked(e) {
        if (e.page != null) {
          this.trackPageDoubleClicked({
            pagedPublicationPage: {
              pageNumber: e.page.pageNumber,
              x: e.verso.pageX,
              y: e.verso.pageY
            }
          });
        }
      }
    }, {
      key: "pressed",
      value: function pressed(e) {
        if (e.page != null) {
          this.trackPageLongPressed({
            pagedPublicationPage: {
              pageNumber: e.page.pageNumber,
              x: e.verso.pageX,
              y: e.verso.pageY
            }
          });
        }
      }
    }, {
      key: "panStart",
      value: function panStart(e) {
        if (e.scale === 1) {
          this.pageSpreadDisappeared();
        }
      }
    }, {
      key: "zoomedIn",
      value: function zoomedIn(e) {
        if (e.pageSpread != null) {
          this.trackPageSpreadZoomedIn({
            pagedPublicationPageSpread: {
              pageNumbers: e.pageSpread.getPages().map(function (page) {
                return page.pageNumber;
              })
            }
          });
        }
      }
    }, {
      key: "zoomedOut",
      value: function zoomedOut(e) {
        if (e.pageSpread != null) {
          this.trackPageSpreadZoomedOut({
            pagedPublicationPageSpread: {
              pageNumbers: e.pageSpread.getPages().map(function (page) {
                return page.pageNumber;
              })
            }
          });
        }
      }
    }, {
      key: "pageSpreadAppeared",
      value: function pageSpreadAppeared(pageSpread) {
        if (pageSpread != null && this.hidden === true) {
          this.pageSpread = pageSpread;
          this.trackPageSpreadAppeared({
            pagedPublicationPageSpread: {
              pageNumbers: pageSpread.getPages().map(function (page) {
                return page.pageNumber;
              })
            }
          });
          this.hidden = false;
        }
      }
    }, {
      key: "pageSpreadDisappeared",
      value: function pageSpreadDisappeared() {
        if (this.pageSpread != null && this.hidden === false) {
          this.trackPageSpreadDisappeared({
            pagedPublicationPageSpread: {
              pageNumbers: this.pageSpread.getPages().map(function (page) {
                return page.pageNumber;
              })
            }
          });
          this.hidden = true;
          this.pageSpread = null;
        }
      }
    }]);

    return PagedPublicationEventTracking;
  }();

  MicroEvent$7.mixin(PagedPublicationEventTracking);
  var eventTracking = PagedPublicationEventTracking;

  var Controls, Core, EventTracking, Hotspots, MicroEvent$8, SGN$15, Viewer;
  MicroEvent$8 = microevent;
  SGN$15 = sgn;
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
      this._eventTracking = new EventTracking();
      this.viewSession = SGN$15.util.uuid();
      this.hotspots = null;
      this.hotspotQueue = [];
      this.popover = null;

      this._setupEventListeners();

      return;
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
      key: "_trackEvent",
      value: function _trackEvent(e) {
        var eventTracker, idType, key, properties, ref, type, value;
        type = e.type;
        idType = 'legacy';
        properties = {
          pagedPublication: {
            id: [idType, this.options.id],
            ownedBy: [idType, this.options.ownedBy]
          }
        };
        eventTracker = this.options.eventTracker;
        ref = e.properties;

        for (key in ref) {
          value = ref[key];
          properties[key] = value;
        }

        if (eventTracker != null) {
          eventTracker.trackEvent(type, properties);
        }
      }
    }, {
      key: "_setupEventListeners",
      value: function _setupEventListeners() {
        var _this = this;

        this._eventTracking.bind('trackEvent', function (e) {
          _this._trackEvent(e);
        });

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

        var hotspots$$1;

        if (this.hotspots == null) {
          return;
        }

        if (this.popover != null) {
          this.popover.destroy();
          this.popover = null;
        }

        hotspots$$1 = e.verso.overlayEls.map(function (overlayEl) {
          return _this2.hotspots[overlayEl.getAttribute('data-id')];
        });

        if (hotspots$$1.length === 1) {
          callback(hotspots$$1[0]);
        } else if (hotspots$$1.length > 1) {
          this.popover = SGN$15.CoreUIKit.singleChoicePopover({
            el: this.el,
            header: SGN$15.translations.t('paged_publication.hotspot_picker.header'),
            x: e.verso.x,
            y: e.verso.y,
            items: hotspots$$1.filter(function (hotspot) {
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
          var hotspot, hotspots$$1, i, id, len, page, ref, ref1, versoPageSpread;
          hotspots$$1 = {};
          versoPageSpread = _this3._core.getVerso().pageSpreads.find(function (pageSpread) {
            return pageSpread.getId() === hotspotRequest.id;
          });
          ref = _this3.hotspots;

          for (id in ref) {
            hotspot = ref[id];

            if (hotspots$$1[id] != null) {
              continue;
            }

            ref1 = hotspotRequest.pages;

            for (i = 0, len = ref1.length; i < len; i++) {
              page = ref1[i];

              if (hotspot.locations[page.pageNumber] != null) {
                hotspots$$1[id] = {
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
            hotspots: hotspots$$1
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
        var hotspots$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.hotspots = hotspots$$1;
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

  var Bootstrapper, SGN$16;
  SGN$16 = core;

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
        return new SGN$16.PagedPublicationKit.Viewer(this.options.el, {
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
        SGN$16.util.async.parallel([this.fetchDetails.bind(this), this.fetchPages.bind(this)], function (result) {
          var data;
          data = {
            details: result[0][1],
            pages: result[1][1]
          };

          if (data.details != null && data.pages != null) {
            callback(null, data);
          } else {
            callback(new Error());
          }
        });
      }
    }, {
      key: "fetchDetails",
      value: function fetchDetails(callback) {
        SGN$16.CoreKit.request({
          url: "/v2/catalogs/".concat(this.options.id)
        }, callback);
      }
    }, {
      key: "fetchPages",
      value: function fetchPages(callback) {
        SGN$16.CoreKit.request({
          url: "/v2/catalogs/".concat(this.options.id, "/pages")
        }, callback);
      }
    }, {
      key: "fetchHotspots",
      value: function fetchHotspots(callback) {
        SGN$16.CoreKit.request({
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

  var incito = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
    module.exports = factory();
  }(commonjsGlobal, (function () {
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
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

    var commonjsGlobal$$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule$$1(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var _global = createCommonjsModule$$1(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math
      ? window : typeof self != 'undefined' && self.Math == Math ? self
      // eslint-disable-next-line no-new-func
      : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
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

    var id = 0;
    var px = Math.random();
    var _uid = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };

    var _core = createCommonjsModule$$1(function (module) {
    var core = module.exports = { version: '2.5.3' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
    });
    var _core_1 = _core.version;

    var _redefine = createCommonjsModule$$1(function (module) {
    var SRC = _uid('src');
    var TO_STRING = 'toString';
    var $toString = Function[TO_STRING];
    var TPL = ('' + $toString).split(TO_STRING);

    _core.inspectSource = function (it) {
      return $toString.call(it);
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
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
    });

    // 7.2.1 RequireObjectCoercible(argument)
    var _defined = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };

    var SHARED = '__core-js_shared__';
    var store = _global[SHARED] || (_global[SHARED] = {});
    var _shared = function (key) {
      return store[key] || (store[key] = {});
    };

    var _wks = createCommonjsModule$$1(function (module) {
    var store = _shared('wks');

    var Symbol = _global.Symbol;
    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] =
        USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
    });

    var _fixReWks = function (KEY, length, exec) {
      var SYMBOL = _wks(KEY);
      var fns = exec(_defined, SYMBOL, ''[KEY]);
      var strfn = fns[0];
      var rxfn = fns[1];
      if (_fails(function () {
        var O = {};
        O[SYMBOL] = function () { return 7; };
        return ''[KEY](O) != 7;
      })) {
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

    // @@replace logic
    _fixReWks('replace', 2, function (defined, REPLACE, $replace) {
      // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
      return [function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
      }, $replace];
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

    var _meta = createCommonjsModule$$1(function (module) {
    var META = _uid('meta');


    var setDesc = _objectDp.f;
    var id = 0;
    var isExtensible = Object.isExtensible || function () {
      return true;
    };
    var FREEZE = !_fails(function () {
      return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function (it) {
      setDesc(it, META, { value: {
        i: 'O' + ++id, // object ID
        w: {}          // weak collections IDs
      } });
    };
    var fastKey = function (it, create) {
      // return primitive with prefix
      if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMeta(it);
      // return object ID
      } return it[META].i;
    };
    var getWeak = function (it, create) {
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMeta(it);
      // return hash weak collections IDs
      } return it[META].w;
    };
    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
      return it;
    };
    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    };
    });
    var _meta_1 = _meta.KEY;
    var _meta_2 = _meta.NEED;
    var _meta_3 = _meta.fastKey;
    var _meta_4 = _meta.getWeak;
    var _meta_5 = _meta.onFreeze;

    var def = _objectDp.f;

    var TAG = _wks('toStringTag');

    var _setToStringTag = function (it, tag, stat) {
      if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
    };

    var f$1 = _wks;

    var _wksExt = {
    	f: f$1
    };

    var _library = false;

    var defineProperty = _objectDp.f;
    var _wksDefine = function (name) {
      var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
      if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
    };

    var toString = {}.toString;

    var _cof = function (it) {
      return toString.call(it).slice(8, -1);
    };

    // fallback for non-array-like ES3 and non-enumerable old V8 strings

    // eslint-disable-next-line no-prototype-builtins
    var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return _cof(it) == 'String' ? it.split('') : Object(it);
    };

    // to indexed object, toObject with fallback for non-array-like ES3 strings


    var _toIobject = function (it) {
      return _iobject(_defined(it));
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

    var f$2 = Object.getOwnPropertySymbols;

    var _objectGops = {
    	f: f$2
    };

    var f$3 = {}.propertyIsEnumerable;

    var _objectPie = {
    	f: f$3
    };

    // all enumerable object keys, includes symbols



    var _enumKeys = function (it) {
      var result = _objectKeys(it);
      var getSymbols = _objectGops.f;
      if (getSymbols) {
        var symbols = getSymbols(it);
        var isEnum = _objectPie.f;
        var i = 0;
        var key;
        while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
      } return result;
    };

    // 7.2.2 IsArray(argument)

    var _isArray = Array.isArray || function isArray(arg) {
      return _cof(arg) == 'Array';
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

    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

    var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

    var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return _objectKeysInternal(O, hiddenKeys);
    };

    var _objectGopn = {
    	f: f$4
    };

    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

    var gOPN = _objectGopn.f;
    var toString$1 = {}.toString;

    var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function (it) {
      try {
        return gOPN(it);
      } catch (e) {
        return windowNames.slice();
      }
    };

    var f$5 = function getOwnPropertyNames(it) {
      return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
    };

    var _objectGopnExt = {
    	f: f$5
    };

    var gOPD = Object.getOwnPropertyDescriptor;

    var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
      O = _toIobject(O);
      P = _toPrimitive(P, true);
      if (_ie8DomDefine) try {
        return gOPD(O, P);
      } catch (e) { /* empty */ }
      if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
    };

    var _objectGopd = {
    	f: f$6
    };

    // ECMAScript 6 symbols shim





    var META = _meta.KEY;



















    var gOPD$1 = _objectGopd.f;
    var dP$1 = _objectDp.f;
    var gOPN$1 = _objectGopnExt.f;
    var $Symbol = _global.Symbol;
    var $JSON = _global.JSON;
    var _stringify = $JSON && $JSON.stringify;
    var PROTOTYPE$2 = 'prototype';
    var HIDDEN = _wks('_hidden');
    var TO_PRIMITIVE = _wks('toPrimitive');
    var isEnum = {}.propertyIsEnumerable;
    var SymbolRegistry = _shared('symbol-registry');
    var AllSymbols = _shared('symbols');
    var OPSymbols = _shared('op-symbols');
    var ObjectProto = Object[PROTOTYPE$2];
    var USE_NATIVE = typeof $Symbol == 'function';
    var QObject = _global.QObject;
    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    var setSymbolDesc = _descriptors && _fails(function () {
      return _objectCreate(dP$1({}, 'a', {
        get: function () { return dP$1(this, 'a', { value: 7 }).a; }
      })).a != 7;
    }) ? function (it, key, D) {
      var protoDesc = gOPD$1(ObjectProto, key);
      if (protoDesc) delete ObjectProto[key];
      dP$1(it, key, D);
      if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
    } : dP$1;

    var wrap = function (tag) {
      var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
      sym._k = tag;
      return sym;
    };

    var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      return it instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(it, key, D) {
      if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
      _anObject(it);
      key = _toPrimitive(key, true);
      _anObject(D);
      if (_has(AllSymbols, key)) {
        if (!D.enumerable) {
          if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
          it[HIDDEN][key] = true;
        } else {
          if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
          D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
        } return setSymbolDesc(it, key, D);
      } return dP$1(it, key, D);
    };
    var $defineProperties = function defineProperties(it, P) {
      _anObject(it);
      var keys = _enumKeys(P = _toIobject(P));
      var i = 0;
      var l = keys.length;
      var key;
      while (l > i) $defineProperty(it, key = keys[i++], P[key]);
      return it;
    };
    var $create = function create(it, P) {
      return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
    };
    var $propertyIsEnumerable = function propertyIsEnumerable(key) {
      var E = isEnum.call(this, key = _toPrimitive(key, true));
      if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
      return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
    };
    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
      it = _toIobject(it);
      key = _toPrimitive(key, true);
      if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
      var D = gOPD$1(it, key);
      if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
      return D;
    };
    var $getOwnPropertyNames = function getOwnPropertyNames(it) {
      var names = gOPN$1(_toIobject(it));
      var result = [];
      var i = 0;
      var key;
      while (names.length > i) {
        if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
      } return result;
    };
    var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
      var IS_OP = it === ObjectProto;
      var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
      var result = [];
      var i = 0;
      var key;
      while (names.length > i) {
        if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
      } return result;
    };

    // 19.4.1.1 Symbol([description])
    if (!USE_NATIVE) {
      $Symbol = function Symbol() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
        var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
        var $set = function (value) {
          if (this === ObjectProto) $set.call(OPSymbols, value);
          if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDesc(this, tag, _propertyDesc(1, value));
        };
        if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
        return wrap(tag);
      };
      _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
        return this._k;
      });

      _objectGopd.f = $getOwnPropertyDescriptor;
      _objectDp.f = $defineProperty;
      _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
      _objectPie.f = $propertyIsEnumerable;
      _objectGops.f = $getOwnPropertySymbols;

      if (_descriptors && !_library) {
        _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
      }

      _wksExt.f = function (name) {
        return wrap(_wks(name));
      };
    }

    _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

    for (var es6Symbols = (
      // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
    ).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

    for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

    _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
      // 19.4.2.1 Symbol.for(key)
      'for': function (key) {
        return _has(SymbolRegistry, key += '')
          ? SymbolRegistry[key]
          : SymbolRegistry[key] = $Symbol(key);
      },
      // 19.4.2.5 Symbol.keyFor(sym)
      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
        for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
      },
      useSetter: function () { setter = true; },
      useSimple: function () { setter = false; }
    });

    _export(_export.S + _export.F * !USE_NATIVE, 'Object', {
      // 19.1.2.2 Object.create(O [, Properties])
      create: $create,
      // 19.1.2.4 Object.defineProperty(O, P, Attributes)
      defineProperty: $defineProperty,
      // 19.1.2.3 Object.defineProperties(O, Properties)
      defineProperties: $defineProperties,
      // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
      // 19.1.2.7 Object.getOwnPropertyNames(O)
      getOwnPropertyNames: $getOwnPropertyNames,
      // 19.1.2.8 Object.getOwnPropertySymbols(O)
      getOwnPropertySymbols: $getOwnPropertySymbols
    });

    // 24.3.2 JSON.stringify(value [, replacer [, space]])
    $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
      var S = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      // WebKit converts symbol values to JSON as null
      // V8 throws on boxed symbols
      return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
    })), 'JSON', {
      stringify: function stringify(it) {
        var args = [it];
        var i = 1;
        var replacer, $replacer;
        while (arguments.length > i) args.push(arguments[i++]);
        $replacer = replacer = args[1];
        if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if (!_isArray(replacer)) replacer = function (key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return _stringify.apply($JSON, args);
      }
    });

    // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
    $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
    // 19.4.3.5 Symbol.prototype[@@toStringTag]
    _setToStringTag($Symbol, 'Symbol');
    // 20.2.1.9 Math[@@toStringTag]
    _setToStringTag(Math, 'Math', true);
    // 24.3.3 JSON[@@toStringTag]
    _setToStringTag(_global.JSON, 'JSON', true);

    // 7.1.13 ToObject(argument)

    var _toObject = function (it) {
      return Object(_defined(it));
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

    var vanillaLazyload = createCommonjsModule$$1(function (module, exports) {
      var _extends$$1 = Object.assign || function (target) {
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

      var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
        return _typeof(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };

      (function (global, factory) {
        (_typeof$$1(exports)) === 'object' && 'object' !== 'undefined' ? module.exports = factory() : typeof undefined === 'function' && undefined.amd ? undefined(factory) : global.LazyLoad = factory();
      })(commonjsGlobal$$1, function () {

        var dataPrefix = "data-";

        var getData = function getData(element, attribute) {
          return element.getAttribute(dataPrefix + attribute);
        };

        var setData = function setData(element, attribute, value) {
          return element.setAttribute(dataPrefix + attribute, value);
        };

        var purgeElements = function purgeElements(elements) {
          return elements.filter(function (element) {
            return !getData(element, "was-processed");
          });
        };

        var setSourcesForPicture = function setSourcesForPicture(element, settings) {
          var dataSrcSet = settings.data_srcset;
          var parent = element.parentNode;

          if (parent.tagName !== "PICTURE") {
            return;
          }

          for (var i = 0, pictureChild; pictureChild = parent.children[i]; i += 1) {
            if (pictureChild.tagName === "SOURCE") {
              var sourceSrcset = getData(pictureChild, dataSrcSet);

              if (sourceSrcset) {
                pictureChild.setAttribute("srcset", sourceSrcset);
              }
            }
          }
        };

        var setSources = function setSources(element, settings) {
          var dataSrc = settings.data_src,
              dataSrcSet = settings.data_srcset;
          var tagName = element.tagName;
          var elementSrc = getData(element, dataSrc);

          if (tagName === "IMG") {
            setSourcesForPicture(element, settings);
            var imgSrcset = getData(element, dataSrcSet);

            if (imgSrcset) {
              element.setAttribute("srcset", imgSrcset);
            }

            if (elementSrc) {
              element.setAttribute("src", elementSrc);
            }

            return;
          }

          if (tagName === "IFRAME") {
            if (elementSrc) {
              element.setAttribute("src", elementSrc);
            }

            return;
          }

          if (elementSrc) {
            element.style.backgroundImage = 'url("' + elementSrc + '")';
          }
        };

        var supportsClassList = function supportsClassList() {
          return "classList" in document.createElement("p");
        };

        var addClass = function addClass(element, className) {
          if (supportsClassList()) {
            element.classList.add(className);
            return;
          }

          element.className += (element.className ? " " : "") + className;
        };

        var removeClass = function removeClass(element, className) {
          if (supportsClassList()) {
            element.classList.remove(className);
            return;
          }

          element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
        };

        var callCallback = function callCallback(callback, argument) {
          if (callback) {
            callback(argument);
          }
        };

        var loadString = "load";
        var errorString = "error";

        var removeListeners = function removeListeners(element, loadHandler, errorHandler) {
          element.removeEventListener(loadString, loadHandler);
          element.removeEventListener(errorString, errorHandler);
        };

        var addOneShotListeners = function addOneShotListeners(element, settings) {
          var onLoad = function onLoad(event) {
            onEvent(event, true, settings);
            removeListeners(element, onLoad, onError);
          };

          var onError = function onError(event) {
            onEvent(event, false, settings);
            removeListeners(element, onLoad, onError);
          };

          element.addEventListener(loadString, onLoad);
          element.addEventListener(errorString, onError);
        };

        var onEvent = function onEvent(event, success, settings) {
          var element = event.target;
          removeClass(element, settings.class_loading);
          addClass(element, success ? settings.class_loaded : settings.class_error); // Setting loaded or error class

          callCallback(success ? settings.callback_load : settings.callback_error, element); // Calling loaded or error callback
        };

        var revealElement = function revealElement(element, settings) {
          callCallback(settings.callback_enter, element);

          if (["IMG", "IFRAME"].indexOf(element.tagName) > -1) {
            addOneShotListeners(element, settings);
            addClass(element, settings.class_loading);
          }

          setSources(element, settings);
          setData(element, "was-processed", true);
          callCallback(settings.callback_set, element);
        };

        var LazyLoad = function LazyLoad(instanceSettings, elements) {
          this._settings = _extends$$1({}, {
            elements_selector: "img",
            container: document,
            threshold: 300,
            data_src: "src",
            data_srcset: "srcset",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            callback_load: null,
            callback_error: null,
            callback_set: null,
            callback_enter: null
          }, instanceSettings);

          this._setObserver();

          this.update(elements);
        };

        LazyLoad.prototype = {
          _setObserver: function _setObserver() {
            var _this = this;

            if (!("IntersectionObserver" in window)) {
              return;
            }

            var settings = this._settings;

            var onIntersection = function onIntersection(entries) {
              entries.forEach(function (entry) {
                // entry.isIntersecting is null on some versions of MS Edge
                // entry.intersectionRatio can be 0 on some intersecting elements
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                  var element = entry.target;
                  revealElement(element, settings);

                  _this._observer.unobserve(element);
                }
              });
              _this._elements = purgeElements(_this._elements);
            };

            this._observer = new IntersectionObserver(onIntersection, {
              root: settings.container === document ? null : settings.container,
              rootMargin: settings.threshold + "px"
            });
          },
          update: function update(elements) {
            var _this2 = this;

            var settings = this._settings;
            var nodeSet = elements || settings.container.querySelectorAll(settings.elements_selector);
            this._elements = purgeElements(Array.prototype.slice.call(nodeSet)); // nodeset to array for IE compatibility

            if (this._observer) {
              this._elements.forEach(function (element) {
                _this2._observer.observe(element);
              });

              return;
            } // Fallback: load all elements at once


            this._elements.forEach(function (element) {
              revealElement(element, settings);
            });

            this._elements = purgeElements(this._elements);
          },
          destroy: function destroy() {
            var _this3 = this;

            if (this._observer) {
              purgeElements(this._elements).forEach(function (element) {
                _this3._observer.unobserve(element);
              });
              this._observer = null;
            }

            this._elements = null;
            this._settings = null;
          }
        };
        return LazyLoad;
      });
    });

    var lazyloadLegacy = createCommonjsModule$$1(function (module, exports) {
      var _extends$$1 = Object.assign || function (target) {
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

      var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
        return _typeof(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };

      (function (global, factory) {
        (_typeof$$1(exports)) === 'object' && 'object' !== 'undefined' ? module.exports = factory() : typeof undefined === 'function' && undefined.amd ? undefined(factory) : global.LazyLoad = factory();
      })(commonjsGlobal$$1, function () {

        var isBot = function isBot() {
          return !("onscroll" in window) || /glebot/.test(navigator.userAgent);
        };

        var callCallback = function callCallback(callback, argument) {
          if (callback) {
            callback(argument);
          }
        };

        var getTopOffset = function getTopOffset(element) {
          return element.getBoundingClientRect().top + window.pageYOffset - element.ownerDocument.documentElement.clientTop;
        };

        var isBelowViewport = function isBelowViewport(element, container, threshold) {
          var fold = container === window ? window.innerHeight + window.pageYOffset : getTopOffset(container) + container.offsetHeight;
          return fold <= getTopOffset(element) - threshold;
        };

        var getLeftOffset = function getLeftOffset(element) {
          return element.getBoundingClientRect().left + window.pageXOffset - element.ownerDocument.documentElement.clientLeft;
        };

        var isAtRightOfViewport = function isAtRightOfViewport(element, container, threshold) {
          var documentWidth = window.innerWidth;
          var fold = container === window ? documentWidth + window.pageXOffset : getLeftOffset(container) + documentWidth;
          return fold <= getLeftOffset(element) - threshold;
        };

        var isAboveViewport = function isAboveViewport(element, container, threshold) {
          var fold = container === window ? window.pageYOffset : getTopOffset(container);
          return fold >= getTopOffset(element) + threshold + element.offsetHeight;
        };

        var isAtLeftOfViewport = function isAtLeftOfViewport(element, container, threshold) {
          var fold = container === window ? window.pageXOffset : getLeftOffset(container);
          return fold >= getLeftOffset(element) + threshold + element.offsetWidth;
        };

        var isInsideViewport = function isInsideViewport(element, container, threshold) {
          return !isBelowViewport(element, container, threshold) && !isAboveViewport(element, container, threshold) && !isAtRightOfViewport(element, container, threshold) && !isAtLeftOfViewport(element, container, threshold);
        };

        var dataPrefix = "data-";

        var getData = function getData(element, attribute) {
          return element.getAttribute(dataPrefix + attribute);
        };

        var setData = function setData(element, attribute, value) {
          return element.setAttribute(dataPrefix + attribute, value);
        };

        var setSourcesForPicture = function setSourcesForPicture(element, srcsetDataAttribute) {
          var parent = element.parentNode;

          if (parent.tagName !== "PICTURE") {
            return;
          }

          for (var i = 0; i < parent.children.length; i++) {
            var pictureChild = parent.children[i];

            if (pictureChild.tagName === "SOURCE") {
              var sourceSrcset = getData(pictureChild, srcsetDataAttribute);

              if (sourceSrcset) {
                pictureChild.setAttribute("srcset", sourceSrcset);
              }
            }
          }
        };

        var setSources = function setSources(element, srcsetDataAttribute, srcDataAttribute) {
          var tagName = element.tagName;
          var elementSrc = getData(element, srcDataAttribute);

          if (tagName === "IMG") {
            setSourcesForPicture(element, srcsetDataAttribute);
            var imgSrcset = getData(element, srcsetDataAttribute);

            if (imgSrcset) {
              element.setAttribute("srcset", imgSrcset);
            }

            if (elementSrc) {
              element.setAttribute("src", elementSrc);
            }

            return;
          }

          if (tagName === "IFRAME") {
            if (elementSrc) {
              element.setAttribute("src", elementSrc);
            }

            return;
          }

          if (elementSrc) {
            element.style.backgroundImage = 'url("' + elementSrc + '")';
          }
        };

        var supportsClassList = function supportsClassList() {
          return "classList" in document.createElement("p");
        };

        var addClass = function addClass(element, className) {
          if (supportsClassList()) {
            element.classList.add(className);
            return;
          }

          element.className += (element.className ? " " : "") + className;
        };

        var removeClass = function removeClass(element, className) {
          if (supportsClassList()) {
            element.classList.remove(className);
            return;
          }

          element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
        };
        /*
         * Constructor
         */


        var LazyLoad = function LazyLoad(instanceSettings) {
          this._settings = _extends$$1({}, {
            elements_selector: "img",
            container: window,
            threshold: 300,
            throttle: 150,
            data_src: "src",
            data_srcset: "srcset",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            class_initial: "initial",
            skip_invisible: true,
            callback_load: null,
            callback_error: null,
            callback_set: null,
            callback_processed: null,
            callback_enter: null
          }, instanceSettings);
          this._queryOriginNode = this._settings.container === window ? document : this._settings.container;
          this._previousLoopTime = 0;
          this._loopTimeout = null;
          this._boundHandleScroll = this.handleScroll.bind(this);
          this._isFirstLoop = true;
          window.addEventListener("resize", this._boundHandleScroll);
          this.update();
        };

        LazyLoad.prototype = {
          /*
           * Private methods
           */
          _reveal: function _reveal(element) {
            var settings = this._settings;

            var errorCallback = function errorCallback() {
              /* As this method is asynchronous, it must be protected against external destroy() calls */
              if (!settings) {
                return;
              }

              element.removeEventListener("load", loadCallback);
              element.removeEventListener("error", errorCallback);
              removeClass(element, settings.class_loading);
              addClass(element, settings.class_error);
              callCallback(settings.callback_error, element);
            };

            var loadCallback = function loadCallback() {
              /* As this method is asynchronous, it must be protected against external destroy() calls */
              if (!settings) {
                return;
              }

              removeClass(element, settings.class_loading);
              addClass(element, settings.class_loaded);
              element.removeEventListener("load", loadCallback);
              element.removeEventListener("error", errorCallback);
              callCallback(settings.callback_load, element);
            };

            callCallback(settings.callback_enter, element);

            if (element.tagName === "IMG" || element.tagName === "IFRAME") {
              element.addEventListener("load", loadCallback);
              element.addEventListener("error", errorCallback);
              addClass(element, settings.class_loading);
            }

            setSources(element, settings.data_srcset, settings.data_src);
            callCallback(settings.callback_set, element);
          },
          _loopThroughElements: function _loopThroughElements() {
            var settings = this._settings,
                elements = this._elements,
                elementsLength = !elements ? 0 : elements.length;
            var i = void 0,
                processedIndexes = [],
                firstLoop = this._isFirstLoop;

            for (i = 0; i < elementsLength; i++) {
              var element = elements[i];
              /* If must skip_invisible and element is invisible, skip it */

              if (settings.skip_invisible && element.offsetParent === null) {
                continue;
              }

              if (isBot() || isInsideViewport(element, settings.container, settings.threshold)) {
                if (firstLoop) {
                  addClass(element, settings.class_initial);
                }
                /* Start loading the image */


                this._reveal(element);
                /* Marking the element as processed. */


                processedIndexes.push(i);
                setData(element, "was-processed", true);
              }
            }
            /* Removing processed elements from this._elements. */


            while (processedIndexes.length) {
              elements.splice(processedIndexes.pop(), 1);
              callCallback(settings.callback_processed, elements.length);
            }
            /* Stop listening to scroll event when 0 elements remains */


            if (elementsLength === 0) {
              this._stopScrollHandler();
            }
            /* Sets isFirstLoop to false */


            if (firstLoop) {
              this._isFirstLoop = false;
            }
          },
          _purgeElements: function _purgeElements() {
            var elements = this._elements,
                elementsLength = elements.length;
            var i = void 0,
                elementsToPurge = [];

            for (i = 0; i < elementsLength; i++) {
              var element = elements[i];
              /* If the element has already been processed, skip it */

              if (getData(element, "was-processed")) {
                elementsToPurge.push(i);
              }
            }
            /* Removing elements to purge from this._elements. */


            while (elementsToPurge.length > 0) {
              elements.splice(elementsToPurge.pop(), 1);
            }
          },
          _startScrollHandler: function _startScrollHandler() {
            if (!this._isHandlingScroll) {
              this._isHandlingScroll = true;

              this._settings.container.addEventListener("scroll", this._boundHandleScroll);
            }
          },
          _stopScrollHandler: function _stopScrollHandler() {
            if (this._isHandlingScroll) {
              this._isHandlingScroll = false;

              this._settings.container.removeEventListener("scroll", this._boundHandleScroll);
            }
          },

          /* 
           * Public methods
           */
          handleScroll: function handleScroll() {
            var throttle = this._settings.throttle;

            if (throttle !== 0) {
              var now = Date.now();
              var remainingTime = throttle - (now - this._previousLoopTime);

              if (remainingTime <= 0 || remainingTime > throttle) {
                if (this._loopTimeout) {
                  clearTimeout(this._loopTimeout);
                  this._loopTimeout = null;
                }

                this._previousLoopTime = now;

                this._loopThroughElements();
              } else if (!this._loopTimeout) {
                this._loopTimeout = setTimeout(function () {
                  this._previousLoopTime = Date.now();
                  this._loopTimeout = null;

                  this._loopThroughElements();
                }.bind(this), remainingTime);
              }
            } else {
              this._loopThroughElements();
            }
          },
          update: function update() {
            // Converts to array the nodeset obtained querying the DOM from _queryOriginNode with elements_selector
            this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));

            this._purgeElements();

            this._loopThroughElements();

            this._startScrollHandler();
          },
          destroy: function destroy() {
            window.removeEventListener("resize", this._boundHandleScroll);

            if (this._loopTimeout) {
              clearTimeout(this._loopTimeout);
              this._loopTimeout = null;
            }

            this._stopScrollHandler();

            this._elements = null;
            this._queryOriginNode = null;
            this._settings = null;
          }
        };
        return LazyLoad;
      });
    });

    var microevent = createCommonjsModule$$1(function (module) {
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
      }
    };
    var utils_1 = utils;

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

            var ref, ref1, ref2, ref3, ref4, ref5, shadow, strokeStyles, transforms; // Identifier.

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
              this.el.className += ' incito--lazyload';
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
            } else {
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
              }
            } // Padding.


            if (this.attrs.padding != null) {
              this.el.style.padding = utils$1.formatUnit(this.attrs.padding);
            } else {
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
              }
            } // Corner radius.


            if (this.attrs.corner_radius != null) {
              this.el.style.borderRadius = utils$1.formatUnit(this.attrs.corner_radius);
            } else {
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
              }
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

            if (ref2 = this.attrs.stroke_top_style, indexOf.call(strokeStyles, ref2) >= 0) {
              this.el.style.borderTopStyle = this.attrs.stroke_top_style;
            }

            if (this.attrs.stroke_left_width != null) {
              this.el.style.borderLeftWidth = utils$1.formatUnit(this.attrs.stroke_left_width);
            }

            if (this.attrs.stroke_left_color != null) {
              this.el.style.borderLeftColor = this.attrs.stroke_left_color;
            }

            if (ref3 = this.attrs.stroke_left_style, indexOf.call(strokeStyles, ref3) >= 0) {
              this.el.style.borderLeftStyle = this.attrs.stroke_left_style;
            }

            if (this.attrs.stroke_right_width != null) {
              this.el.style.borderRightWidth = utils$1.formatUnit(this.attrs.stroke_right_width);
            }

            if (this.attrs.stroke_right_color != null) {
              this.el.style.borderRightColor = this.attrs.stroke_right_color;
            }

            if (ref4 = this.attrs.stroke_right_style, indexOf.call(strokeStyles, ref4) >= 0) {
              this.el.style.borderRightStyle = this.attrs.stroke_right_style;
            }

            if (this.attrs.stroke_bottom_width != null) {
              this.el.style.borderBottomWidth = utils$1.formatUnit(this.attrs.stroke_bottom_width);
            }

            if (this.attrs.stroke_bottom_color != null) {
              this.el.style.borderBottomColor = this.attrs.stroke_bottom_color;
            }

            if (ref5 = this.attrs.stroke_bottom_style, indexOf.call(strokeStyles, ref5) >= 0) {
              this.el.style.borderBottomStyle = this.attrs.stroke_bottom_style;
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
    }.call(commonjsGlobal$$1);

    var view = View;

    var FragView;

    var frag = FragView =
    /*#__PURE__*/
    function () {
      function FragView() {
        _classCallCheck(this, FragView);
      }

      _createClass(FragView, [{
        key: "render",
        value: function render() {
          this.el = document.createDocumentFragment();
          return this;
        }
      }]);

      return FragView;
    }();

    var require$$0 = view;

    var Image, View$1, utils$2;
    View$1 = require$$0;
    utils$2 = utils_1;

    var image = Image = function () {
      var Image =
      /*#__PURE__*/
      function (_View) {
        _inherits(Image, _View);

        function Image() {
          _classCallCheck(this, Image);

          return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
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
      Image.prototype.className = 'incito__image-view incito--lazyload';
      return Image;
    }.call(commonjsGlobal$$1);

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

    // 7.2.8 IsRegExp(argument)


    var MATCH = _wks('match');
    var _isRegexp = function (it) {
      var isRegExp;
      return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
    };

    // @@split logic
    _fixReWks('split', 2, function (defined, SPLIT, $split) {
      var isRegExp = _isRegexp;
      var _split = $split;
      var $push = [].push;
      var $SPLIT = 'split';
      var LENGTH = 'length';
      var LAST_INDEX = 'lastIndex';
      if (
        'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
        'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
        'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
        '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
        '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
        ''[$SPLIT](/.?/)[LENGTH]
      ) {
        var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
        // based on es5-shim implementation, need to rework it
        $split = function (separator, limit) {
          var string = String(this);
          if (separator === undefined && limit === 0) return [];
          // If `separator` is not a regex, use native split
          if (!isRegExp(separator)) return _split.call(string, separator, limit);
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') +
                      (separator.multiline ? 'm' : '') +
                      (separator.unicode ? 'u' : '') +
                      (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var separator2, match, lastIndex, lastLength, i;
          // Doesn't need flags gy, but they don't hurt
          if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
          while (match = separatorCopy.exec(string)) {
            // `separatorCopy.lastIndex` is not reliable cross-browser
            lastIndex = match.index + match[0][LENGTH];
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
              // eslint-disable-next-line no-loop-func
              if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
                for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
              });
              if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
              lastLength = match[0][LENGTH];
              lastLastIndex = lastIndex;
              if (output[LENGTH] >= splitLimit) break;
            }
            if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
          }
          if (lastLastIndex === string[LENGTH]) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
        };
      // Chakra, V8
      } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
        $split = function (separator, limit) {
          return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
        };
      }
      // 21.1.3.17 String.prototype.split(separator, limit)
      return [function split(separator, limit) {
        var O = defined(this);
        var fn = separator == undefined ? undefined : separator[SPLIT];
        return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
      }, $split];
    });

    var TextView,
        View$2,
        utils$3,
        indexOf$1 = [].indexOf;
    View$2 = require$$0;
    utils$3 = utils_1;

    var text = TextView = function () {
      var TextView =
      /*#__PURE__*/
      function (_View) {
        _inherits(TextView, _View);

        function TextView() {
          _classCallCheck(this, TextView);

          return _possibleConstructorReturn(this, (TextView.__proto__ || Object.getPrototypeOf(TextView)).apply(this, arguments));
        }

        _createClass(TextView, [{
          key: "render",
          value: function render() {
            var parsedText, ref, text, textShadow, textStyles;
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
            } // Font stretch.


            if ((ref = this.attrs.font_stretch) === 'condensed' || ref === 'normal' || ref === 'expanded') {
              this.el.style.fontStretch = this.attrs.font_stretch;
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
    }.call(commonjsGlobal$$1);

    var FlexLayout,
        View$3,
        allowedHostnames,
        utils$4,
        indexOf$2 = [].indexOf;
    View$3 = require$$0;
    utils$4 = utils_1;
    allowedHostnames = ['www.youtube.com', 'www.vimeo.com', 'video.twentythree.net'];

    var videoEmbed = FlexLayout = function () {
      var FlexLayout =
      /*#__PURE__*/
      function (_View) {
        _inherits(FlexLayout, _View);

        function FlexLayout() {
          _classCallCheck(this, FlexLayout);

          return _possibleConstructorReturn(this, (FlexLayout.__proto__ || Object.getPrototypeOf(FlexLayout)).apply(this, arguments));
        }

        _createClass(FlexLayout, [{
          key: "render",
          value: function render() {
            this.el.addEventListener('incito-lazyload', this.renderIframe.bind(this));
            return this;
          }
        }, {
          key: "renderIframe",
          value: function renderIframe() {
            var iframeEl, linkEl, ref;

            if (utils$4.isDefinedStr(this.attrs.src)) {
              iframeEl = document.createElement('iframe');
              linkEl = document.createElement('a');
              linkEl.setAttribute('href', this.attrs.src);

              if (ref = linkEl.hostname, indexOf$2.call(allowedHostnames, ref) >= 0) {
                iframeEl.setAttribute('src', this.attrs.src);
                this.el.appendChild(iframeEl);
              }
            }

            return this;
          }
        }]);

        return FlexLayout;
      }(View$3);
      FlexLayout.prototype.className = 'incito__video-embed-view incito--lazyload';
      return FlexLayout;
    }.call(commonjsGlobal$$1);

    var Video, View$4, utils$5;
    View$4 = require$$0;
    utils$5 = utils_1;

    var video = Video = function () {
      var Video =
      /*#__PURE__*/
      function (_View) {
        _inherits(Video, _View);

        function Video() {
          _classCallCheck(this, Video);

          return _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).apply(this, arguments));
        }

        _createClass(Video, [{
          key: "render",
          value: function render() {
            if (!utils$5.isDefinedStr(this.attrs.src)) {
              return;
            }

            this.el.addEventListener('incito-lazyload', this.renderVideo.bind(this));

            if (this.attrs.autoplay === true) {
              this.el.setAttribute('autoplay', '');
            }

            if (this.attrs.loop === true) {
              this.el.setAttribute('loop', '');
            }

            if (this.attrs.controls === true) {
              this.el.setAttribute('controls', '');
            }

            this.el.setAttribute('muted', 'true');
            this.el.setAttribute('preload', 'metadata');
            this.el.setAttribute('playsinline', '');
            return this;
          }
        }, {
          key: "renderVideo",
          value: function renderVideo() {
            var sourceEl;
            sourceEl = document.createElement('source');
            sourceEl.setAttribute('src', this.attrs.src);
            sourceEl.setAttribute('type', this.attrs.mime);
            this.el.appendChild(sourceEl);
            return this;
          }
        }]);

        return Video;
      }(View$4);
      Video.prototype.className = 'incito__video-view incito--lazyload';
      Video.prototype.tagName = 'video';
      return Video;
    }.call(commonjsGlobal$$1);

    var LinearLayout, View$5;
    View$5 = require$$0;

    var linearLayout = LinearLayout = function () {
      var LinearLayout =
      /*#__PURE__*/
      function (_View) {
        _inherits(LinearLayout, _View);

        function LinearLayout() {
          _classCallCheck(this, LinearLayout);

          return _possibleConstructorReturn(this, (LinearLayout.__proto__ || Object.getPrototypeOf(LinearLayout)).apply(this, arguments));
        }

        _createClass(LinearLayout, [{
          key: "render",
          value: function render() {
            return this;
          }
        }]);

        return LinearLayout;
      }(View$5);
      LinearLayout.prototype.className = 'incito__linear-layout-view';
      return LinearLayout;
    }.call(commonjsGlobal$$1);

    var AbsoluteLayout, View$6;
    View$6 = require$$0;

    var absoluteLayout = AbsoluteLayout = function () {
      var AbsoluteLayout =
      /*#__PURE__*/
      function (_View) {
        _inherits(AbsoluteLayout, _View);

        function AbsoluteLayout() {
          _classCallCheck(this, AbsoluteLayout);

          return _possibleConstructorReturn(this, (AbsoluteLayout.__proto__ || Object.getPrototypeOf(AbsoluteLayout)).apply(this, arguments));
        }

        _createClass(AbsoluteLayout, [{
          key: "render",
          value: function render() {
            return this;
          }
        }]);

        return AbsoluteLayout;
      }(View$6);
      AbsoluteLayout.prototype.className = 'incito__absolute-layout-view';
      return AbsoluteLayout;
    }.call(commonjsGlobal$$1);

    var FlexLayout$1,
        View$7,
        alignContentModes,
        alignItemModes,
        flexDirectionModes,
        flexJustifyModes,
        utils$6,
        indexOf$3 = [].indexOf;
    View$7 = require$$0;
    utils$6 = utils_1;
    alignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
    alignContentModes = ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'initial', 'inherit'];
    flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
    flexDirectionModes = ['row', 'column'];

    var flexLayout = FlexLayout$1 = function () {
      var FlexLayout =
      /*#__PURE__*/
      function (_View) {
        _inherits(FlexLayout, _View);

        function FlexLayout() {
          _classCallCheck(this, FlexLayout);

          return _possibleConstructorReturn(this, (FlexLayout.__proto__ || Object.getPrototypeOf(FlexLayout)).apply(this, arguments));
        }

        _createClass(FlexLayout, [{
          key: "render",
          value: function render() {
            var ref, ref1, ref2, ref3;

            if (ref = this.attrs.layout_flex_align_items, indexOf$3.call(alignItemModes, ref) >= 0) {
              this.el.style.alignItems = this.attrs.layout_flex_align_items;
              this.el.style.msAlignItems = this.attrs.layout_flex_align_items;
            }

            if (ref1 = this.attrs.layout_flex_align_content, indexOf$3.call(alignContentModes, ref1) >= 0) {
              this.el.style.alignContent = this.attrs.layout_flex_align_content;
              this.el.style.msAlignContent = this.attrs.layout_flex_align_content;
            }

            if (ref2 = this.attrs.layout_flex_justify_content, indexOf$3.call(flexJustifyModes, ref2) >= 0) {
              this.el.style.justifyContent = this.attrs.layout_flex_justify_content;
              this.el.style.msFlexPack = this.attrs.layout_flex_justify_content;
            }

            if (ref3 = this.attrs.layout_flex_direction, indexOf$3.call(flexDirectionModes, ref3) >= 0) {
              this.el.style.flexDirection = this.attrs.layout_flex_direction;
              this.el.style.msFlexDirection = this.attrs.layout_flex_direction;
            }

            if (typeof this.attrs.layout_flex_shrink === 'number') {
              this.el.style.flexShrink = this.attrs.layout_flex_shrink;
              this.el.style.msFlexShrink = this.attrs.layout_flex_shrink;
            }

            if (typeof this.attrs.layout_flex_grow === 'number') {
              this.el.style.flexGrow = this.attrs.layout_flex_grow;
              this.el.style.msFlexGrow = this.attrs.layout_flex_grow;
            }

            if (this.attrs.layout_flex_basis != null) {
              this.el.style.flexBasis = utils$6.parseUnit(this.attrs.layout_flex_basis);
              this.el.style.msFlexBasis = utils$6.parseUnit(this.attrs.layout_flex_basis);
            }

            return this;
          }
        }]);

        return FlexLayout;
      }(View$7);
      FlexLayout.prototype.className = 'incito__flex-layout-view';
      return FlexLayout;
    }.call(commonjsGlobal$$1);

    var AbsoluteLayout$1, FlexLayout$2, FragView$1, ImageView, Incito, LazyLoad, LazyLoadLegacy, LinearLayout$1, MicroEvent, TextView$1, VideoEmbedView, VideoView, View$8, utils$7;
    LazyLoad = vanillaLazyload;
    LazyLoadLegacy = lazyloadLegacy;
    MicroEvent = microevent;
    utils$7 = utils_1;
    View$8 = require$$0;
    FragView$1 = frag;
    ImageView = image;
    TextView$1 = text;
    VideoEmbedView = videoEmbed;
    VideoView = video;
    LinearLayout$1 = linearLayout;
    AbsoluteLayout$1 = absoluteLayout;
    FlexLayout$2 = flexLayout;

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
        return;
      }

      _createClass(Incito, [{
        key: "start",
        value: function start() {
          var incito;
          incito = this.options.incito || {};
          this.el.className = 'incito';

          if (incito.locale != null) {
            this.el.setAttribute('lang', incito.locale);
          }

          this.loadFonts(incito.font_assets);
          this.applyTheme(incito.theme);
          this.render(this.el, incito.root_view);
          this.containerEl.appendChild(this.el);
          this.lazyLoader = this.createLazyLoader();
          return this;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.containerEl.removeChild(this.el);

          if (this.lazyload != null) {
            this.lazyload.destroy();
          }

          this.trigger('destroyed');
        }
      }, {
        key: "render",
        value: function render(el) {
          var _this = this;

          var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var match, ref, view, viewName, views;
          match = null;
          viewName = attrs.view_name;
          views = {
            View: View$8,
            FragView: FragView$1,
            ImageView: ImageView,
            TextView: TextView$1,
            VideoEmbedView: VideoEmbedView,
            VideoView: VideoView,
            LinearLayout: LinearLayout$1,
            AbsoluteLayout: AbsoluteLayout$1,
            FlexLayout: FlexLayout$2
          };
          match = (ref = views[viewName]) != null ? ref : View$8;
          view = new match(attrs).render();

          if (attrs.id != null && _typeof(attrs.meta) === 'object') {
            this.ids[attrs.id] = attrs.meta;
          }

          if (Array.isArray(attrs.child_views)) {
            attrs.child_views.forEach(function (childView) {
              _this.render(view.el, childView);
            });
          }

          el.appendChild(view.el);
          return view.el;
        }
      }, {
        key: "applyTheme",
        value: function applyTheme() {
          var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (Array.isArray(theme.font_family)) {
            this.el.style.fontFamily = theme.font_family.join(', ');
          }

          if (utils$7.isDefinedStr(theme.background_color)) {
            this.el.style.backgroundColor = theme.background_color;
          }

          if (utils$7.isDefinedStr(theme.text_color)) {
            this.el.style.color = theme.text_color;
          }

          if (typeof theme.line_spacing_multiplier === 'number') {
            this.el.style.lineHeight = theme.line_spacing_multiplier;
          }
        }
      }, {
        key: "loadFonts",
        value: function loadFonts() {
          var fontAssets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var font, key, ref, ref1, styleEl, text$$1, urls, value;

          if ('FontFace' in window) {
            for (key in fontAssets) {
              value = fontAssets[key];
              urls = value.src.map(function (src) {
                return "url(".concat(src[1], ")");
              }).join(', ');
              font = new FontFace(key, urls, {
                style: (ref = value.style) != null ? ref : 'normal',
                weight: (ref1 = value.weight) != null ? ref1 : 'normal'
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
              text$$1 = "@font-face {\n    font-family: '".concat(key, "';\n    src: ").concat(urls, ";\n}");
              styleEl.appendChild(document.createTextNode(text$$1));
            }

            document.head.appendChild(styleEl);
          }
        }
      }, {
        key: "createLazyLoader",
        value: function createLazyLoader() {
          var LazyLoader, container, supportsIntersectionObserver;
          supportsIntersectionObserver = 'IntersectionObserver' in window;
          LazyLoader = supportsIntersectionObserver ? LazyLoad : LazyLoadLegacy;
          container = this.options.scrollEl;

          if (container == null) {
            container = supportsIntersectionObserver ? document : window;
          }

          return new LazyLoader({
            container: container,
            elements_selector: '.incito .incito--lazyload',
            threshold: 1000,
            callback_enter: function callback_enter(el) {
              var completeEvent, eventName;
              completeEvent = null;
              eventName = 'incito-lazyload';

              if (typeof CustomEvent === 'function') {
                completeEvent = new CustomEvent(eventName);
              } else {
                completeEvent = document.createEvent('CustomEvent');
                completeEvent.initCustomEvent(eventName, false, false, void 0);
              }

              el.dispatchEvent(completeEvent);
            }
          });
        }
      }]);

      return Incito;
    }();

    MicroEvent.mixin(Incito);
    var incito = Incito;

    return incito;

  })));

  });

  var Incito, MicroEvent$10, Viewer$1;
  Incito = incito;
  MicroEvent$10 = microevent;

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
      return;
    }

    _createClass(Viewer, [{
      key: "start",
      value: function start() {
        this.incito.start();

        this._trackEvent({
          type: 'x-incito-publication-opened',
          properties: {
            id: this.options.id
          }
        });

        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.incito.destroy();
      }
    }, {
      key: "_trackEvent",
      value: function _trackEvent(e) {
        var eventTracker, key, properties, ref, type, value;
        type = e.type;
        properties = {
          id: this.options.id
        };
        eventTracker = this.options.eventTracker;
        ref = e.properties;

        for (key in ref) {
          value = ref[key];
          properties[key] = value;
        }

        if (eventTracker != null) {
          return eventTracker.trackEvent(type, properties);
        }
      }
    }]);

    return Viewer;
  }();

  MicroEvent$10.mixin(Viewer$1);
  var viewer$1 = Viewer$1;

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

      if (this.progressEl != null) {
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
        var docHeight, progress, scrollTop, winHeight;
        scrollTop = window.scrollY;
        winHeight = window.innerHeight;
        docHeight = document.body.clientHeight;
        progress = Math.round((scrollTop + winHeight) / docHeight * 100);

        if (scrollTop < 300) {
          this.progressEl.style.opacity = 0;
        } else if (scrollTop >= docHeight - winHeight) {
          this.progressEl.textContent = '100%';
          this.progressEl.style.opacity = 1;
        } else {
          this.progressEl.textContent = "".concat(progress, " %");
          this.progressEl.style.opacity = 1;
        }
      }
    }]);

    return Controls;
  }();

  var incito$1 = "query GetIncitoPublication($id: ID!, $deviceCategory: DeviceCategory!, $orientation: Orientation!, $pixelRatio: Float!, $pointer: Pointer!, $maxWidth: Int!, $versionsSupported: [String!]!) {\n  node(id: $id) {\n    ... on IncitoPublication {\n      id\n      incito(deviceCategory: $deviceCategory, orientation: $orientation, pixelRatio: $pixelRatio, pointer: $pointer, maxWidth: $maxWidth, versionsSupported: $versionsSupported)\n    }\n  }\n}";

  var incito$2 = /*#__PURE__*/Object.freeze({
    default: incito$1
  });

  var require$$3 = ( incito$2 && incito$1 ) || incito$2;

  var Bootstrapper$1, Controls$2, SGN$17, schema, util$2;
  util$2 = util_1;
  SGN$17 = core;
  Controls$2 = controls$1;
  schema = require$$3;

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
      this.maxWidth = this.getMaxWidth();
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
      key: "getMaxWidth",
      value: function getMaxWidth() {
        if (Math.abs(window.orientation) === 90) {
          return Math.min(this.options.el.offsetWidth, screen.width);
        } else {
          return this.options.el.offsetWidth;
        }
      }
    }, {
      key: "fetch",
      value: function fetch(callback) {
        var _this = this;

        var data;
        data = SGN$17.storage.session.get(this.storageKey);

        if (data != null && data.response != null && data.width === this.maxWidth) {
          return callback(null, data.response);
        }

        SGN$17.GraphKit.request({
          query: schema,
          operationName: 'GetIncitoPublication',
          variables: {
            id: this.options.id,
            deviceCategory: 'DEVICE_CATEGORY_' + this.deviceCategory.toUpperCase(),
            pixelRatio: this.pixelRatio,
            pointer: 'POINTER_' + this.pointer.toUpperCase(),
            orientation: 'ORIENTATION_' + this.orientation.toUpperCase(),
            maxWidth: this.maxWidth,
            versionsSupported: this.versionsSupported
          }
        }, function (err, res) {
          if (err != null) {
            callback(err);
          } else if (res.errors && res.errors.length > 0) {
            callback(util$2.error(new Error(), 'graph request contained errors'));
          } else {
            callback(null, res);
            SGN$17.storage.session.set(_this.storageKey, {
              width: _this.maxWidth,
              response: res
            });
          }
        });
      }
    }, {
      key: "createViewer",
      value: function createViewer(data) {
        var controls, viewer;

        if (data.incito == null) {
          throw util$2.error(new Error(), 'you need to supply valid Incito to create a viewer');
        }

        viewer = new SGN$17.IncitoPublicationKit.Viewer(this.options.el, {
          id: this.options.id,
          incito: data.incito,
          eventTracker: this.options.eventTracker
        });
        controls = new Controls$2(viewer);
        return viewer;
      }
    }]);

    return Bootstrapper;
  }();

  var incitoPublication = {
    Viewer: viewer$1,
    Bootstrapper: bootstrapper$1
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
  (function() {
      var _matcher,
          _level = 0,
          _id = 0,
          _handlers = {},
          _gatorInstances = {};

      function _addEvent(gator, type, callback) {

          // blur and focus do not bubble up but if you use event capturing
          // then you will get them
          var useCapture = type == 'blur' || type == 'focus';
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
          }

          // if it doesn't match a native browser method
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
          if (selector == '_root') {
              return boundElement;
          }

          // if we have moved up to the element you bound the event to
          // then we have come too far
          if (element === boundElement) {
              return;
          }

          // if this is a match then we are done!
          if (_getMatcher(element).call(element, selector)) {
              return element;
          }

          // if this element did not match but has a parent we should try
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
          }

          // if there is no event type specified then remove all events
          // example: Gator(element).off()
          if (!event) {
              for (var type in _handlers[gator.id]) {
                  if (_handlers[gator.id].hasOwnProperty(type)) {
                      _handlers[gator.id][type] = {};
                  }
              }
              return;
          }

          // if no callback or selector is specified remove all events of this type
          // example: Gator(element).off('click')
          if (!callback && !selector) {
              _handlers[gator.id][event] = {};
              return;
          }

          // if a selector is specified but no callback remove all events
          // for this selector
          // example: Gator(element).off('click', '.sub-element')
          if (!callback) {
              delete _handlers[gator.id][event][selector];
              return;
          }

          // if we have specified an event type, selector, and callback then we
          // need to make sure there are callbacks tied to this selector to
          // begin with.  if there aren't then we can stop here
          if (!_handlers[gator.id][event][selector]) {
              return;
          }

          // if there are then loop through all the callbacks and if we find
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
              j = 0;

          // find all events that match
          _level = 0;
          for (selector in _handlers[id][type]) {
              if (_handlers[id][type].hasOwnProperty(selector)) {
                  match = _matchesSelector(target, selector, _gatorInstances[id].element);

                  if (match && Gator.matchesEvent(type, _gatorInstances[id].element, match, selector == '_root', e)) {
                      _level++;
                      _handlers[id][type][selector].match = match;
                      matches[_level] = _handlers[id][type][selector];
                  }
              }
          }

          // stopPropagation() fails to set cancelBubble to true in Webkit
          // @see http://code.google.com/p/chromium/issues/detail?id=162270
          e.stopPropagation = function() {
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

          if (!callback && typeof(selector) == 'function') {
              callback = selector;
              selector = '_root';
          }

          var id = this.id,
              i;

          function _getGlobalCallback(type) {
              return function(e) {
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
      Gator.prototype.on = function(events, selector, callback) {
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
      Gator.prototype.off = function(events, selector, callback) {
          return _bind.call(this, events, selector, callback, true);
      };

      Gator.matchesSelector = function() {};
      Gator.cancel = _cancel;
      Gator.addEvent = _addEvent;
      Gator.matchesEvent = function() {
          return true;
      };

      if ('object' !== 'undefined' && module.exports) {
          module.exports = Gator;
      }

      window.Gator = Gator;
  }) ();
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

  var Gator, MicroEvent$11, Mustache$2, Popover, keyCodes$2, template;
  MicroEvent$11 = microevent;
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
        var header, ref, trigger, view, width;
        width = (ref = this.options.width) != null ? ref : 100;
        header = this.options.header;

        if (this.options.template != null) {
          template = this.options.template;
        }

        trigger = this.trigger.bind(this);
        view = {
          header: header,
          singleChoiceItems: this.options.singleChoiceItems.map(function (item, i) {
            return {
              item: item,
              index: i
            };
          })
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

  MicroEvent$11.mixin(Popover);
  var popover = Popover;

  var Popover$1;
  Popover$1 = popover;

  var singleChoicePopover = function singleChoicePopover(ctx, callback) {
    var items, popover$$1;
    items = ctx.items;
    popover$$1 = null;

    if (items.length === 1) {
      callback(items[0]);
    } else if (items.length > 1) {
      popover$$1 = new Popover$1({
        header: ctx.header,
        x: ctx.x,
        y: ctx.y,
        singleChoiceItems: items
      });
      popover$$1.bind('selected', function (e) {
        callback(items[e.index]);
        popover$$1.destroy();
      });
      popover$$1.bind('destroyed', function () {
        ctx.el.focus();
      });
      ctx.el.appendChild(popover$$1.el);
      popover$$1.render().el.focus();
    }

    return {
      destroy: function destroy() {
        if (popover$$1 != null) {
          popover$$1.destroy();
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

  var SGN$18, appKey, config$2, scriptEl, session$2, trackId;
  SGN$18 = sgn; // Expose storage backends.

  SGN$18.storage = {
    local: clientLocal,
    session: clientSession,
    cookie: clientCookie
  }; // Expose request handler.

  SGN$18.request = browser$1; // Expose the different kits.

  SGN$18.AssetsKit = assets;
  SGN$18.EventsKit = events;
  SGN$18.GraphKit = graph;
  SGN$18.CoreKit = core$1;
  SGN$18.PagedPublicationKit = pagedPublication;
  SGN$18.IncitoPublicationKit = incitoPublication;
  SGN$18.CoreUIKit = coreUi; // Set the core session from the cookie store if possible.

  session$2 = SGN$18.storage.cookie.get('session');

  if (_typeof(session$2) === 'object') {
    SGN$18.config.set({
      coreSessionToken: session$2.token,
      coreSessionClientId: session$2.client_id
    });
  }

  SGN$18.client = function () {
    var firstOpen, id;
    id = SGN$18.storage.local.get('client-id');
    id = id != null ? id.data : void 0;
    firstOpen = id == null;

    if (firstOpen) {
      id = SGN$18.util.uuid();
      SGN$18.storage.local.set('client-id', id);
    }

    return {
      firstOpen: firstOpen,
      id: id
    };
  }(); // Listen for changes in the config.


  SGN$18.config.bind('change', function (changedAttributes) {
    var eventTracker;
    eventTracker = changedAttributes.eventTracker;

    if (eventTracker != null) {
      if (SGN$18.client.firstOpen === true) {
        eventTracker.trackEvent('first-client-session-opened', {}, '1.0.0');
      }

      eventTracker.trackEvent('client-session-opened', {}, '1.0.0');
    }
  }); // Autoconfigure the SDK.

  scriptEl = document.getElementById('sgn-sdk');

  if (scriptEl != null) {
    appKey = scriptEl.getAttribute('data-app-key');
    trackId = scriptEl.getAttribute('data-track-id');
    config$2 = {};

    if (appKey != null) {
      config$2.appKey = appKey;
    }

    if (trackId != null) {
      config$2.eventTracker = new SGN$18.EventsKit.Tracker({
        trackId: trackId
      });
    }

    SGN$18.config.set(config$2);
  }

  var browser$2 = SGN$18;

  return browser$2;

})));
//# sourceMappingURL=sgn-sdk.js.map
