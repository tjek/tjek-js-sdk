'use strict';

var _Reflect$construct = require('@babel/runtime-corejs3/core-js-stable/reflect/construct');
var _slicedToArray = require('@babel/runtime-corejs3/helpers/slicedToArray');
var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _inherits = require('@babel/runtime-corejs3/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime-corejs3/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime-corejs3/helpers/getPrototypeOf');
require('core-js/modules/es.array.join.js');
require('core-js/modules/es.string.split.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.string.link.js');
var _Array$isArray = require('@babel/runtime-corejs3/core-js-stable/array/is-array');
var _forEachInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/for-each');
var _mapInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/map');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _indexOfInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/index-of');
var _trimInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/trim');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var MicroEvent = require('microevent');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Reflect$construct__default = /*#__PURE__*/_interopDefaultLegacy(_Reflect$construct);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _Array$isArray__default = /*#__PURE__*/_interopDefaultLegacy(_Array$isArray);
var _forEachInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_forEachInstanceProperty);
var _mapInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_mapInstanceProperty);
var _concatInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_concatInstanceProperty);
var _indexOfInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_indexOfInstanceProperty);
var _trimInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_trimInstanceProperty);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var MicroEvent__default = /*#__PURE__*/_interopDefaultLegacy(MicroEvent);
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
    _this.imageCount = 0;
    _this.preloadImageCount = 20;
    _this.ids = {};
    _this.sections = [];
    _this.shouldLazyload = 'IntersectionObserver' in window;
    return _this;
  }

  _createClass__default['default'](Incito, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      loadFonts(this.incito.font_assets);
      var html = this.renderHtml();
      var theme = this.incito.theme || {};
      this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
      this.el.className = 'incito';

      if (_Array$isArray__default['default'](theme.font_family)) {
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
          _forEachInstanceProperty__default['default'](entries).call(entries, function (entry) {
            if (entry.isIntersecting) {
              _this2.loadEl(entry.target);

              _this2.lazyloader.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '500px'
        });

        _forEachInstanceProperty__default['default'](_context = this.el.querySelectorAll('.incito--lazy')).call(_context, function (lazyEl) {
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

        _forEachInstanceProperty__default['default'](_context2 = el.querySelectorAll('[data-src]')).call(_context2, function (sourceEl) {
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

        if (_Array$isArray__default['default'](view.spans) && view.spans.length > 0) {
          var parsedText = parseSpans(text, view.spans);
          text = _mapInstanceProperty__default['default'](parsedText).call(parsedText, function (item) {
            var _item$span, _item$span2;

            var escapedText = escapeHTML(item.text || '');

            if (((_item$span = item.span) === null || _item$span === void 0 ? void 0 : _item$span.name) === 'link' && item.span.url != null) {
              var _context3;

              return _concatInstanceProperty__default['default'](_context3 = "<a href=\"".concat(encodeURI(item.span.url), "\" rel=\"external\" target=\"_blank\">")).call(_context3, escapedText, "</a>");
            }

            if (((_item$span2 = item.span) === null || _item$span2 === void 0 ? void 0 : _item$span2.name) != null) {
              var _context4;

              var spanName = item.span.name;
              return _concatInstanceProperty__default['default'](_context4 = "<span data-name=\"".concat(spanName, "\">")).call(_context4, escapedText, "</span>");
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
          var _context5, _context6, _context7;

          styles['text-shadow'] = _concatInstanceProperty__default['default'](_context5 = _concatInstanceProperty__default['default'](_context6 = _concatInstanceProperty__default['default'](_context7 = "".concat(textShadow.dx, "px ")).call(_context7, textShadow.dy, "px ")).call(_context6, textShadow.radius, "px ")).call(_context5, textShadow.color);
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
          contents = _concatInstanceProperty__default['default'](_context8 = "<source type=\"".concat(view.mime, "\" data-src=\"")).call(_context8, view.src, "\"/>");
        } else {
          var _context9;

          contents = _concatInstanceProperty__default['default'](_context9 = "<source type=\"".concat(view.mime, "\" src=\"")).call(_context9, view.src, "\"/>");
        }
      } else if (view.view_name === 'HTMLView') {
        if (isDefinedStr(view.style)) {
          var _context10, _context11;

          _forEachInstanceProperty__default['default'](_context10 = _trimInstanceProperty__default['default'](_context11 = view.style).call(_context11).split(';')).call(_context10, function (style) {
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
        var _context12;

        var featureLabels = _filterInstanceProperty__default['default'](_context12 = view.feature_labels).call(_context12, function (featureLabel) {
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

      if (_indexOfInstanceProperty__default['default'](_context13 = ['repeat_x', 'repeat_y', 'repeat']).call(_context13, view.background_tile_mode) !== -1) {
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

        styles['box-shadow'] = _concatInstanceProperty__default['default'](_context14 = _concatInstanceProperty__default['default'](_context15 = _concatInstanceProperty__default['default'](_context16 = "".concat(shadow.dx, "px ")).call(_context16, shadow.dy, "px ")).call(_context15, shadow.radius, "px ")).call(_context14, shadow.color);
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
            html += _concatInstanceProperty__default['default'](_context17 = " ".concat(key, "=\"")).call(_context17, value, "\"");
          }

          html += ' style="';

          for (var _key in styles) {
            var _context18;

            var _value = styles[_key];
            html += _concatInstanceProperty__default['default'](_context18 = "".concat(_key, ":")).call(_context18, _value, "; ");
          }

          html += '"';

          for (var _key2 in attrs) {
            var _context19;

            var _value2 = attrs[_key2];
            html += _concatInstanceProperty__default['default'](_context19 = " ".concat(_key2, "=\"")).call(_context19, _value2, "\"");
          }

          html += '>';

          if (_Array$isArray__default['default'](view.child_views)) {
            var _context20;

            _forEachInstanceProperty__default['default'](_context20 = view.child_views).call(_context20, function (childView) {
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
}(MicroEvent__default['default']);

module.exports = Incito;
//# sourceMappingURL=incito.cjs.js.map
