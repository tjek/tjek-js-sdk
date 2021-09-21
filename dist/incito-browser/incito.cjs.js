'use strict';

var _Reflect$construct = require('@babel/runtime-corejs3/core-js-stable/reflect/construct');
var _slicedToArray = require('@babel/runtime-corejs3/helpers/slicedToArray');
var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _inherits = require('@babel/runtime-corejs3/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime-corejs3/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime-corejs3/helpers/getPrototypeOf');
require('core-js/modules/es.array.join.js');
require('core-js/modules/es.string.link.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.string.replace.js');
var _Array$isArray = require('@babel/runtime-corejs3/core-js-stable/array/is-array');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var _indexOfInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/index-of');
var _forEachInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/for-each');
var _mapInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/map');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _trimInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/trim');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
var MicroEvent = require('microevent');
var fetch = require('cross-fetch');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');
require('@babel/runtime-corejs3/core-js-stable/instance/last-index-of');
require('@babel/runtime-corejs3/core-js-stable/parse-int');
require('@babel/runtime-corejs3/core-js-stable/instance/splice');
require('@babel/runtime-corejs3/core-js-stable/set-timeout');
require('@babel/runtime-corejs3/core-js-stable/promise');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.regexp.constructor.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Reflect$construct__default = /*#__PURE__*/_interopDefaultLegacy(_Reflect$construct);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _Array$isArray__default = /*#__PURE__*/_interopDefaultLegacy(_Array$isArray);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var _indexOfInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_indexOfInstanceProperty);
var _forEachInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_forEachInstanceProperty);
var _mapInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_mapInstanceProperty);
var _concatInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_concatInstanceProperty);
var _trimInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_trimInstanceProperty);
var _JSON$stringify__default = /*#__PURE__*/_interopDefaultLegacy(_JSON$stringify);
var MicroEvent__default = /*#__PURE__*/_interopDefaultLegacy(MicroEvent);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var _sliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_sliceInstanceProperty);

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
      text: _sliceInstanceProperty__default['default'](text).call(text, 0, spans[0].start)
    });
  }

  _forEachInstanceProperty__default['default'](spans).call(spans, function (span, i) {
    var startIndex = span.start;
    var endIndex = span.end;
    result.push({
      text: _sliceInstanceProperty__default['default'](text).call(text, startIndex, endIndex),
      span: span
    });

    if (i === spans.length - 1) {
      if (endIndex < text.length) {
        result.push({
          text: _sliceInstanceProperty__default['default'](text).call(text, endIndex, text.length)
        });
      }
    } else if (endIndex < spans[i + 1].start) {
      result.push({
        text: _sliceInstanceProperty__default['default'](text).call(text, endIndex, spans[i + 1].start)
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

    var urls = _mapInstanceProperty__default['default'](_context = value.src).call(_context, function (_ref) {
      var _ref2 = _slicedToArray__default['default'](_ref, 2),
          url = _ref2[1];

      return "url('".concat(url, "')");
    }).join(', ');

    styleEl.appendChild(document.createTextNode(_concatInstanceProperty__default['default'](_context2 = "@font-face { font-family: '".concat(key, "'; font-display: swap; src: ")).call(_context2, urls, "; }")));
  }

  document.head.appendChild(styleEl);
};

function closest(el, s) {
  var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

  do {
    if (matches.call(el, s)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);

  return null;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = _Reflect$construct__default['default'](Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct__default['default']) return false; if (_Reflect$construct__default['default'].sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct__default['default'](Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Incito = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default['default'](Incito, _MicroEvent);

  var _super = _createSuper(Incito);

  function Incito(containerEl, _ref) {
    var _this;

    var _ref$incito = _ref.incito,
        incito = _ref$incito === void 0 ? {} : _ref$incito;

    _classCallCheck__default['default'](this, Incito);

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

  _createClass__default['default'](Incito, [{
    key: "render",
    value: function render() {
      var theme = this.incito.theme || {};
      loadFonts(this.incito.font_assets);
      this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
      this.el.className = 'incito';

      if (_Array$isArray__default['default'](theme.font_family)) {
        var _context;

        this.el.style.fontFamily = _filterInstanceProperty__default['default'](_context = theme.font_family).call(_context, function (v, i, a) {
          return _indexOfInstanceProperty__default['default'](a).call(a, v) === i;
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

      _forEachInstanceProperty__default['default'](_context2 = el.querySelectorAll('.incito--lazy')).call(_context2, function (el) {
        _this2.lazyObserver.observe(el);
      });

      _forEachInstanceProperty__default['default'](_context3 = el.querySelectorAll('.incito__video-view[data-autoplay=true]')).call(_context3, function (el) {
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
        fetch__default['default'](url, {
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
        _forEachInstanceProperty__default['default'](entries).call(entries, function (entry) {
          if (entry.isIntersecting) {
            _this4.loadEl(entry.target);

            _this4.lazyObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '500px 0px'
      });
      this.videoObserver = new IntersectionObserver(function (entries) {
        _forEachInstanceProperty__default['default'](entries).call(entries, function (entry) {
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

        if (_Array$isArray__default['default'](view.spans) && view.spans.length > 0) {
          var parsedText = parseSpans(text, view.spans);
          text = _mapInstanceProperty__default['default'](parsedText).call(parsedText, function (item) {
            var _item$span, _item$span2;

            var escapedText = escapeHTML(item.text || '');

            if (((_item$span = item.span) === null || _item$span === void 0 ? void 0 : _item$span.name) === 'link' && item.span.url != null) {
              var _context4;

              return _concatInstanceProperty__default['default'](_context4 = "<a href=\"".concat(encodeURI(item.span.url), "\" rel=\"external\" target=\"_blank\">")).call(_context4, escapedText, "</a>");
            }

            if (((_item$span2 = item.span) === null || _item$span2 === void 0 ? void 0 : _item$span2.name) != null) {
              var _context5;

              var spanName = item.span.name;
              return _concatInstanceProperty__default['default'](_context5 = "<span data-name=\"".concat(spanName, "\">")).call(_context5, escapedText, "</span>");
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

        if (_Array$isArray__default['default'](view.font_family) && view.font_family.length > 0) {
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

        if (_indexOfInstanceProperty__default['default'](textStyles).call(textStyles, 'bold') !== -1) {
          styles['font-weight'] = 'bold';
        }

        if (_indexOfInstanceProperty__default['default'](textStyles).call(textStyles, 'italic') !== -1) {
          styles['font-style'] = 'italic';
        }

        if (_Array$isArray__default['default'](view.text_decoration_line)) {
          styles['text-decoration-line'] = view.text_decoration_line.join(' ');
        }

        var textShadow = getTextShadow(view);

        if (isDefinedStr(view.text_shadow)) {
          styles['text-shadow'] = view.text_shadow;
        } else if (textShadow != null) {
          var _context6, _context7, _context8;

          styles['text-shadow'] = _concatInstanceProperty__default['default'](_context6 = _concatInstanceProperty__default['default'](_context7 = _concatInstanceProperty__default['default'](_context8 = "".concat(textShadow.dx, "px ")).call(_context8, textShadow.dy, "px ")).call(_context7, textShadow.radius, "px ")).call(_context6, textShadow.color);
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

          _forEachInstanceProperty__default['default'](_context9 = _trimInstanceProperty__default['default'](_context10 = view.style).call(_context10).split(';')).call(_context9, function (style) {
            var _style$trim$split = _trimInstanceProperty__default['default'](style).call(style).split(':'),
                _style$trim$split2 = _slicedToArray__default['default'](_style$trim$split, 2),
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
            attrs['data-body'] = escape(_JSON$stringify__default['default'](view.body));
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

        if (_indexOfInstanceProperty__default['default'](flexAlignItemModes).call(flexAlignItemModes, view.layout_flex_align_items) !== -1) {
          styles['align-items'] = view.layout_flex_align_items;
          styles['ms-align-items'] = view.layout_flex_align_items;
        }

        if (_indexOfInstanceProperty__default['default'](flexJustifyModes).call(flexJustifyModes, view.layout_flex_justify_content) !== -1) {
          styles['justify-content'] = view.layout_flex_justify_content;
          styles['ms-flex-pack'] = view.layout_flex_justify_content;
        }

        if (_indexOfInstanceProperty__default['default'](flexDirectionModes).call(flexDirectionModes, view.layout_flex_direction) !== -1) {
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

      if (_Array$isArray__default['default'](view.feature_labels)) {
        var _context11;

        var featureLabels = _filterInstanceProperty__default['default'](_context11 = view.feature_labels).call(_context11, function (featureLabel) {
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

      if (_indexOfInstanceProperty__default['default'](_context12 = ['repeat_x', 'repeat_y', 'repeat']).call(_context12, view.background_tile_mode) !== -1) {
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

        styles['box-shadow'] = _concatInstanceProperty__default['default'](_context13 = _concatInstanceProperty__default['default'](_context14 = _concatInstanceProperty__default['default'](_context15 = "".concat(shadow.dx, "px ")).call(_context15, shadow.dy, "px ")).call(_context14, shadow.radius, "px ")).call(_context13, shadow.color);
      }

      var strokeStyles = ['solid', 'dotted', 'dashed'];

      if (view.stroke_width != null) {
        styles['border-width'] = formatUnit(view.stroke_width);
      }

      if (view.stroke_color != null) {
        styles['border-color'] = view.stroke_color;
      }

      if (_indexOfInstanceProperty__default['default'](strokeStyles).call(strokeStyles, view.stroke_style) !== -1) {
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


      if (_Array$isArray__default['default'](view.transform_origin) && view.transform_origin.length === 2) {
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
            html += _concatInstanceProperty__default['default'](_context16 = " ".concat(key, "=\"")).call(_context16, value, "\"");
          }

          html += ' style="';

          for (var _key in styles) {
            var _context17;

            var _value = styles[_key];
            html += _concatInstanceProperty__default['default'](_context17 = "".concat(_key, ":")).call(_context17, _value, "; ");
          }

          html += '"';

          for (var _key2 in attrs) {
            var _context18;

            var _value2 = attrs[_key2];
            html += _concatInstanceProperty__default['default'](_context18 = " ".concat(_key2, "=\"")).call(_context18, _value2, "\"");
          }

          html += '>';

          if (_Array$isArray__default['default'](view.child_views)) {
            var _context19;

            _forEachInstanceProperty__default['default'](_context19 = view.child_views).call(_context19, function (childView) {
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
}(MicroEvent__default['default']);

module.exports = Incito;
//# sourceMappingURL=incito.cjs.js.map
