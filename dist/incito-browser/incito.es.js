import 'core-js/modules/es.array.join.js';
import 'core-js/modules/es.number.constructor.js';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _bindInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/bind';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _Date$now from '@babel/runtime-corejs3/core-js-stable/date/now';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.replace.js';
import _Reflect$construct from '@babel/runtime-corejs3/core-js-stable/reflect/construct';
import _inherits from '@babel/runtime-corejs3/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime-corejs3/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime-corejs3/helpers/getPrototypeOf';
import 'core-js/modules/es.string.link.js';
import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.string.split.js';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';

var formatUnit = function formatUnit(unit) {
  if (unit == null) {
    return 0;
  } else if (typeof unit === 'number') {
    return "".concat(unit, "px");
  } else if (typeof unit === 'string') {
    return unit.replace('dp', 'px');
  } else {
    return 0;
  }
};
var isDefinedStr = function isDefinedStr(value) {
  return typeof value === 'string' && value.length > 0;
};
var escapeHTML = function escapeHTML() {
  var unsafe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};
var throttle = function throttle(fn, delay) {
  if (delay === 0) {
    return fn;
  }

  var timer = false;
  return function () {
    if (timer) {
      return;
    }

    timer = true;
    return _setTimeout(function () {
      timer = false;
      fn.apply(void 0, arguments);
    }, delay);
  };
};

var View = /*#__PURE__*/function () {
  function View() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, View);

    this.attrs = attrs;
    this.el = this.createElement();
    this.setAttributes();
  }

  _createClass(View, [{
    key: "render",
    value: function render() {
      return this;
    }
  }, {
    key: "createElement",
    value: function createElement() {
      var _this$className;

      var el = document.createElement(this.tagName);
      var className = (_this$className = this.className) !== null && _this$className !== void 0 ? _this$className : '';
      el.className = 'incito__view ' + className;
      return el;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes() {
      var _this = this,
          _context2;

      // Identifier.
      if (isDefinedStr(this.attrs.id)) {
        this.el.setAttribute('data-id', this.attrs.id);
      } // Role.


      if (isDefinedStr(this.attrs.role)) {
        this.el.setAttribute('data-role', this.attrs.role);
      } // Accessibility label.


      if (isDefinedStr(this.attrs.accessibility_label)) {
        this.el.setAttribute('aria-label', this.attrs.accessibility_label);
      } // Accessibility visibility.


      if (this.attrs.accessibility_hidden === true) {
        this.el.setAttribute('aria-hidden', true);
      } // Feature labels.


      if (_Array$isArray(this.attrs.feature_labels)) {
        var _context;

        var featureLabels = _filterInstanceProperty(_context = this.attrs.feature_labels).call(_context, function (featureLabel) {
          return /^[a-z_-]{1,14}$/.test(featureLabel);
        });

        if (featureLabels.length) {
          this.el.setAttribute('data-feature-labels', featureLabels.join(','));
        }
      } // Title.


      if (isDefinedStr(this.attrs.title)) {
        this.el.setAttribute('title', this.attrs.title);
      } // Gravity.


      if (isDefinedStr(this.attrs.gravity)) {
        this.el.setAttribute('data-gravity', this.attrs.gravity);
      } // Link.


      if (isDefinedStr(this.attrs.link)) {
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
        this.el.style.width = formatUnit(this.attrs.layout_width);
      } // Height.


      if (this.attrs.layout_height === 'match_parent') {
        this.el.style.height = '100%';
      } else if (this.attrs.layout_height === 'wrap_content') {
        this.el.style.height = 'auto';
      } else if (this.attrs.layout_height != null) {
        this.el.style.height = formatUnit(this.attrs.layout_height);
      } // Min width.


      if (this.attrs.min_width != null) {
        this.el.style.minWidth = formatUnit(this.attrs.min_width);
      } // Max width.


      if (this.attrs.max_width != null) {
        this.el.style.maxWidth = formatUnit(this.attrs.max_width);
      } // Min height.


      if (this.attrs.min_height != null) {
        this.el.style.minHeight = formatUnit(this.attrs.min_height);
      } // Max height.


      if (this.attrs.max_height != null) {
        this.el.style.maxHeight = formatUnit(this.attrs.max_height);
      } // Position in relation to parent.


      if (this.attrs.layout_top != null) {
        this.el.style.top = formatUnit(this.attrs.layout_top);
      }

      if (this.attrs.layout_left != null) {
        this.el.style.left = formatUnit(this.attrs.layout_left);
      }

      if (this.attrs.layout_right != null) {
        this.el.style.right = formatUnit(this.attrs.layout_right);
      }

      if (this.attrs.layout_bottom != null) {
        this.el.style.bottom = formatUnit(this.attrs.layout_bottom);
      } // Background.


      if (isDefinedStr(this.attrs.background_color)) {
        this.el.style.backgroundColor = this.attrs.background_color;
      }

      if (isDefinedStr(this.attrs.background_image)) {
        this.el.setAttribute('data-src', this.attrs.background_image);
        this.lazyload = true;
      }

      if (_indexOfInstanceProperty(_context2 = ['repeat_x', 'repeat_y', 'repeat']).call(_context2, this.attrs.background_tile_mode) !== -1) {
        this.el.style.backgroundRepeat = this.attrs.background_tile_mode.replace('_', '-');
      }

      if (isDefinedStr(this.attrs.background_image_position)) {
        this.el.style.backgroundPosition = this.attrs.background_image_position.replace('_', ' ');
      }

      if (this.attrs.background_image_scale_type === 'center_crop') {
        this.el.style.backgroundSize = 'cover';
      } else if (this.attrs.background_image_scale_type === 'center_inside') {
        this.el.style.backgroundSize = 'contain';
      } // Margin.


      if (this.attrs.layout_margin != null) {
        this.el.style.margin = formatUnit(this.attrs.layout_margin);
      }

      if (this.attrs.layout_margin_top != null) {
        this.el.style.marginTop = formatUnit(this.attrs.layout_margin_top);
      }

      if (this.attrs.layout_margin_left != null) {
        this.el.style.marginLeft = formatUnit(this.attrs.layout_margin_left);
      }

      if (this.attrs.layout_margin_right != null) {
        this.el.style.marginRight = formatUnit(this.attrs.layout_margin_right);
      }

      if (this.attrs.layout_margin_bottom != null) {
        this.el.style.marginBottom = formatUnit(this.attrs.layout_margin_bottom);
      } // Padding.


      if (this.attrs.padding != null) {
        this.el.style.padding = formatUnit(this.attrs.padding);
      }

      if (this.attrs.padding_top != null) {
        this.el.style.paddingTop = formatUnit(this.attrs.padding_top);
      }

      if (this.attrs.padding_left != null) {
        this.el.style.paddingLeft = formatUnit(this.attrs.padding_left);
      }

      if (this.attrs.padding_right != null) {
        this.el.style.paddingRight = formatUnit(this.attrs.padding_right);
      }

      if (this.attrs.padding_bottom != null) {
        this.el.style.paddingBottom = formatUnit(this.attrs.padding_bottom);
      } // Corner radius.


      if (this.attrs.corner_radius != null) {
        this.el.style.borderRadius = formatUnit(this.attrs.corner_radius);
      }

      if (this.attrs.corner_top_left_radius != null) {
        this.el.style.borderTopLeftRadius = formatUnit(this.attrs.corner_top_left_radius);
      }

      if (this.attrs.corner_top_right_radius != null) {
        this.el.style.borderTopRightRadius = formatUnit(this.attrs.corner_top_right_radius);
      }

      if (this.attrs.corner_bottom_left_radius != null) {
        this.el.style.borderBottomLeftRadius = formatUnit(this.attrs.corner_bottom_left_radius);
      }

      if (this.attrs.corner_bottom_right_radius != null) {
        this.el.style.borderBottomRightRadius = formatUnit(this.attrs.corner_bottom_right_radius);
      } // Clip children.


      if (this.attrs.clip_children === false) {
        this.el.style.overflow = 'visible';
      } // Shadow.


      var shadow = this.getShadow();

      if (shadow != null) {
        var _context3, _context4, _context5;

        this.el.style.boxShadow = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = _concatInstanceProperty(_context5 = "".concat(shadow.dx, "px ")).call(_context5, shadow.dy, "px ")).call(_context4, shadow.radius, "px ")).call(_context3, shadow.color);
      } // Stroke.


      var strokeStyles = ['solid', 'dotted', 'dashed'];

      if (this.attrs.stroke_width != null) {
        this.el.style.borderWidth = formatUnit(this.attrs.stroke_width);
      }

      if (this.attrs.stroke_color != null) {
        this.el.style.borderColor = this.attrs.stroke_color;
      }

      if (_indexOfInstanceProperty(strokeStyles).call(strokeStyles, this.attrs.stroke_style) !== -1) {
        this.el.style.borderStyle = this.attrs.stroke_style;
      }

      if (this.attrs.stroke_top_width != null) {
        this.el.style.borderTopWidth = formatUnit(this.attrs.stroke_top_width);
      }

      if (this.attrs.stroke_top_color != null) {
        this.el.style.borderTopColor = this.attrs.stroke_top_color;
      }

      if (this.attrs.stroke_left_width != null) {
        this.el.style.borderLeftWidth = formatUnit(this.attrs.stroke_left_width);
      }

      if (this.attrs.stroke_left_color != null) {
        this.el.style.borderLeftColor = this.attrs.stroke_left_color;
      }

      if (this.attrs.stroke_right_width != null) {
        this.el.style.borderRightWidth = formatUnit(this.attrs.stroke_right_width);
      }

      if (this.attrs.stroke_right_color != null) {
        this.el.style.borderRightColor = this.attrs.stroke_right_color;
      }

      if (this.attrs.stroke_bottom_width != null) {
        this.el.style.borderBottomWidth = formatUnit(this.attrs.stroke_bottom_width);
      }

      if (this.attrs.stroke_bottom_color != null) {
        this.el.style.borderBottomColor = this.attrs.stroke_bottom_color;
      } // Flex.


      if (typeof this.attrs.layout_flex_shrink === 'number') {
        this.el.style.flexShrink = this.attrs.layout_flex_shrink;
        this.el.style.msFlexShrink = this.attrs.layout_flex_shrink;
      }

      if (typeof this.attrs.layout_flex_grow === 'number') {
        this.el.style.flexGrow = this.attrs.layout_flex_grow;
        this.el.style.msFlexGrow = this.attrs.layout_flex_grow;
      }

      if (this.attrs.layout_flex_basis != null) {
        this.el.style.flexBasis = formatUnit(this.attrs.layout_flex_basis);
        this.el.style.msFlexBasis = formatUnit(this.attrs.layout_flex_basis);
      } // Transforms.


      var transforms = this.getTransforms();

      if (transforms.length > 0) {
        this.el.style.transform = transforms.join(' ');
      } // Transform origin.


      if (_Array$isArray(this.attrs.transform_origin) && this.attrs.transform_origin.length === 2) {
        this.el.style.transformOrigin = [formatUnit(this.attrs.transform_origin[0]), formatUnit(this.attrs.transform_origin[1])].join(' ');
      }
    }
  }, {
    key: "getTransforms",
    value: function getTransforms() {
      var transforms = [];
      var translateX = formatUnit(this.attrs.transform_translate_x);
      var translateY = formatUnit(this.attrs.transform_translate_y);

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
      if (isDefinedStr(this.attrs.shadow_color)) {
        var dx = typeof this.attrs.shadow_dx === 'number' ? this.attrs.shadow_dx : 0;
        var dy = typeof this.attrs.shadow_dy === 'number' ? this.attrs.shadow_dy : 0;
        var radius = typeof this.attrs.shadow_radius === 'number' ? this.attrs.shadow_radius : 0;
        var color = this.attrs.shadow_color;
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AbsoluteLayout = /*#__PURE__*/function (_View) {
  _inherits(AbsoluteLayout, _View);

  var _super = _createSuper(AbsoluteLayout);

  function AbsoluteLayout() {
    _classCallCheck(this, AbsoluteLayout);

    return _super.apply(this, arguments);
  }

  return AbsoluteLayout;
}(View);

AbsoluteLayout.prototype.className = 'incito__absolute-layout-view';

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var alignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
var flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
var flexDirectionModes = ['row', 'column'];

var FlexLayout = /*#__PURE__*/function (_View) {
  _inherits(FlexLayout, _View);

  var _super = _createSuper$1(FlexLayout);

  function FlexLayout() {
    _classCallCheck(this, FlexLayout);

    return _super.apply(this, arguments);
  }

  _createClass(FlexLayout, [{
    key: "render",
    value: function render() {
      if (_indexOfInstanceProperty(alignItemModes).call(alignItemModes, this.attrs.layout_flex_align_items) !== -1) {
        this.el.style.alignItems = this.attrs.layout_flex_align_items;
        this.el.style.msAlignItems = this.attrs.layout_flex_align_items;
      }

      if (_indexOfInstanceProperty(flexJustifyModes).call(flexJustifyModes, this.attrs.layout_flex_justify_content) !== -1) {
        this.el.style.justifyContent = this.attrs.layout_flex_justify_content;
        this.el.style.msFlexPack = this.attrs.layout_flex_justify_content;
      }

      if (_indexOfInstanceProperty(flexDirectionModes).call(flexDirectionModes, this.attrs.layout_flex_direction) !== -1) {
        this.el.style.flexDirection = this.attrs.layout_flex_direction;
        this.el.style.msFlexDirection = this.attrs.layout_flex_direction;
      }

      return this;
    }
  }]);

  return FlexLayout;
}(View);

FlexLayout.prototype.className = 'incito__flex-layout-view';

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Image = /*#__PURE__*/function (_View) {
  _inherits(Image, _View);

  var _super = _createSuper$2(Image);

  function Image() {
    _classCallCheck(this, Image);

    return _super.apply(this, arguments);
  }

  _createClass(Image, [{
    key: "render",
    value: function render() {
      if (isDefinedStr(this.attrs.src)) {
        this.el.setAttribute('data-src', this.attrs.src);
      }

      if (isDefinedStr(this.attrs.label)) {
        this.el.setAttribute('alt', this.attrs.label);
      } else {
        this.el.setAttribute('alt', '');
      }

      return this;
    }
  }]);

  return Image;
}(View);

Image.prototype.tagName = 'img';
Image.prototype.className = 'incito__image-view';
Image.prototype.lazyload = true;

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var TextView = /*#__PURE__*/function (_View) {
  _inherits(TextView, _View);

  var _super = _createSuper$3(TextView);

  function TextView() {
    _classCallCheck(this, TextView);

    return _super.apply(this, arguments);
  }

  _createClass(TextView, [{
    key: "render",
    value: function render() {
      if (!isDefinedStr(this.attrs.text)) {
        return this;
      }

      var textStyles = (this.attrs.text_style || '').split('|');
      var text = this.attrs.text;

      if (_Array$isArray(this.attrs.spans) && this.attrs.spans.length > 0) {
        var parsedText = this.parseSpans(text, this.attrs.spans);
        text = _mapInstanceProperty(parsedText).call(parsedText, function (item) {
          var _item$span, _item$span2;

          var escapedText = escapeHTML(item.text || '');

          if (((_item$span = item.span) === null || _item$span === void 0 ? void 0 : _item$span.name) === 'link' && item.span.url != null) {
            var _context;

            return _concatInstanceProperty(_context = "<a href=\"".concat(encodeURI(item.span.url), "\" rel=\"external\" target=\"_blank\">")).call(_context, escapedText, "</a>");
          }

          if (((_item$span2 = item.span) === null || _item$span2 === void 0 ? void 0 : _item$span2.name) != null) {
            var _context2;

            var spanName = item.span.name;
            return _concatInstanceProperty(_context2 = "<span data-name=\"".concat(spanName, "\">")).call(_context2, escapedText, "</span>");
          }

          return escapedText;
        });
        text = text.join('');
      } else {
        text = escapeHTML(text);
      }

      if (this.attrs.text_prevent_widow) {
        text = text.replace(/&nbsp;([^\s]+)$/, ' $1').replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
      }

      this.el.innerHTML = text.replace(/\n/g, '<br>'); // Font family.

      if (_Array$isArray(this.attrs.font_family) && this.attrs.font_family.length > 0) {
        this.el.style.fontFamily = "".concat(this.attrs.font_family.join(', '), " !important");
      } else {
        this.el.style.fontFamily = 'inherit !important';
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


      if (_indexOfInstanceProperty(textStyles).call(textStyles, 'bold') !== -1) {
        this.el.style.fontWeight = 'bold';
      }

      if (_indexOfInstanceProperty(textStyles).call(textStyles, 'italic') !== -1) {
        this.el.style.fontStyle = 'italic';
      }

      if (_Array$isArray(this.attrs.text_decoration_line)) {
        this.el.style.textDecorationLine = this.attrs.text_decoration_line.join(' ');
      } // Text shadow.


      var textShadow = this.getTextShadow();

      if (isDefinedStr(this.attrs.text_shadow)) {
        this.el.style.textShadow = this.attrs.text_shadow;
      } else if (textShadow != null) {
        var _context3, _context4, _context5;

        this.el.style.textShadow = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = _concatInstanceProperty(_context5 = "".concat(textShadow.dx, "px ")).call(_context5, textShadow.dy, "px ")).call(_context4, textShadow.radius, "px ")).call(_context3, textShadow.color);
      } // Text alignment.


      if (this.attrs.text_alignment === 'left') {
        this.el.style.textAlign = 'left';
      } else if (this.attrs.text_alignment === 'center') {
        this.el.style.textAlign = 'center';
      } else if (this.attrs.text_alignment === 'right') {
        this.el.style.textAlign = 'right';
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
      var result = [];

      if (spans.length === 0) {
        result.push({
          text: text
        });
      } else if (spans[0].start > 0) {
        result.push({
          text: _sliceInstanceProperty(text).call(text, 0, spans[0].start)
        });
      }

      _forEachInstanceProperty(spans).call(spans, function (span, i) {
        var startIndex = span.start;
        var endIndex = span.end;
        result.push({
          text: _sliceInstanceProperty(text).call(text, startIndex, endIndex),
          span: span
        });

        if (i === spans.length - 1) {
          if (endIndex < text.length) {
            result.push({
              text: _sliceInstanceProperty(text).call(text, endIndex, text.length)
            });
          }
        } else if (endIndex < spans[i + 1].start) {
          result.push({
            text: _sliceInstanceProperty(text).call(text, endIndex, spans[i + 1].start)
          });
        }
      });

      return result;
    }
  }, {
    key: "getTextShadow",
    value: function getTextShadow() {
      if (isDefinedStr(this.attrs.text_shadow_color)) {
        var dx = typeof this.attrs.text_shadow_dx === 'number' ? this.attrs.text_shadow_dx : 0;
        var dy = typeof this.attrs.text_shadow_dy === 'number' ? this.attrs.text_shadow_dy : 0;
        var radius = typeof this.attrs.text_shadow_radius === 'number' ? this.attrs.text_shadow_radius : 0;
        var color = this.attrs.text_shadow_color;
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
}(View);

TextView.prototype.tagName = 'p';
TextView.prototype.className = 'incito__text-view';

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Video = /*#__PURE__*/function (_View) {
  _inherits(Video, _View);

  var _super = _createSuper$4(Video);

  function Video() {
    _classCallCheck(this, Video);

    return _super.apply(this, arguments);
  }

  _createClass(Video, [{
    key: "render",
    value: function render() {
      if (!isDefinedStr(this.attrs.src)) {
        return this;
      }

      this.el.muted = true;
      this.el.preload = 'metadata';
      this.el.setAttribute('muted', '');
      this.el.setAttribute('playsinline', 'true');
      this.el.setAttribute('webkit-playsinline', 'true');
      this.el.setAttribute('data-src', this.attrs.src);
      this.el.setAttribute('data-mime', this.attrs.mime);

      if (this.attrs.autoplay === true) {
        this.el.autoplay = true;
      }

      if (this.attrs.loop === true) {
        this.el.loop = true;
      }

      if (this.attrs.controls === true) {
        this.el.controls = true;
      }

      return this;
    }
  }]);

  return Video;
}(View);

Video.prototype.className = 'incito__video-view';
Video.prototype.tagName = 'video';
Video.prototype.lazyload = true;

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var allowedHostnames = ['.youtube.com', '.vimeo.com', '.twentythree.net'];

var FlexLayout$1 = /*#__PURE__*/function (_View) {
  _inherits(FlexLayout, _View);

  var _super = _createSuper$5(FlexLayout);

  function FlexLayout() {
    _classCallCheck(this, FlexLayout);

    return _super.apply(this, arguments);
  }

  _createClass(FlexLayout, [{
    key: "render",
    value: function render() {
      if (!isDefinedStr(this.attrs.src)) {
        return this;
      }

      var src = this.attrs.src;
      var linkEl = document.createElement('a');
      linkEl.setAttribute('href', src);

      var isSupported = _findInstanceProperty(allowedHostnames).call(allowedHostnames, function (hostname) {
        var _context;

        return _sliceInstanceProperty(_context = linkEl.hostname).call(_context, -hostname.length) === hostname;
      });

      if (isSupported) {
        this.el.setAttribute('data-src', src);
        this.lazyload = true;
      }

      return this;
    }
  }]);

  return FlexLayout;
}(View);

FlexLayout$1.prototype.className = 'incito__video-embed-view';
FlexLayout$1.prototype.lazyload = false;

var views = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AbsoluteLayout: AbsoluteLayout,
    FlexLayout: FlexLayout,
    ImageView: Image,
    TextView: TextView,
    VideoView: Video,
    VideoEmbedView: FlexLayout$1,
    View: View
});

var requestIdleCallback;

if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
  var _window = window;
  requestIdleCallback = _window.requestIdleCallback;
} else {
  requestIdleCallback = function requestIdleCallback(cb) {
    return _setTimeout(function () {
      var start = _Date$now();

      return cb({
        didTimeout: false,
        timeRemaining: function timeRemaining() {
          return Math.max(0, 50 - (_Date$now() - start));
        }
      });
    }, 1);
  };
} // like requestIdleCallback but effectively synchronous
// as we give infinite time to run


var syncIdleCallback = function syncIdleCallback(cb) {
  cb({
    timeRemaining: function timeRemaining() {
      return Number.MAX_VALUE;
    },
    didTimeout: false
  });
};

var Incito = /*#__PURE__*/function () {
  function Incito(containerEl, _ref) {
    var _context;

    var _ref$incito = _ref.incito,
        incito = _ref$incito === void 0 ? {} : _ref$incito,
        _ref$renderLaziness = _ref.renderLaziness,
        renderLaziness = _ref$renderLaziness === void 0 ? 1 : _ref$renderLaziness;

    _classCallCheck(this, Incito);

    this.containerEl = containerEl;
    this.incito = incito;
    this.renderLaziness = renderLaziness;
    this.el = document.createElement('div');
    this.ids = {};
    this.views = flattenViews([], this.incito.root_view);
    this.viewsLength = this.views.length;
    this.viewIndex = 0;
    this.lazyloadables = [];
    this.lazyloader = throttle(_bindInstanceProperty(_context = this.lazyload).call(_context, this), 150);
    this.renderedOutsideOfViewport = false;
    this._events = {};
  }

  _createClass(Incito, [{
    key: "bind",
    value: function bind(event, fn) {
      this._events[event] = this._events[event] || [];
      return this._events[event].push(fn);
    }
  }, {
    key: "unbind",
    value: function unbind(event, fn) {
      if (this._events[event]) {
        var _context2, _context3;

        return _spliceInstanceProperty(_context2 = this._events[event]).call(_context2, _indexOfInstanceProperty(_context3 = this._events[event]).call(_context3, fn), 1);
      }
    }
  }, {
    key: "trigger",
    value: function trigger(event) {
      if (this._events[event]) {
        var _context4;

        return _mapInstanceProperty(_context4 = this._events[event]).call(_context4, function (e) {
          return e.apply(this, _sliceInstanceProperty(Array.prototype).call(arguments, 1));
        });
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var triggeredVisibleRendered = false;

      var render = function render(IdleDeadline) {
        _this.render(IdleDeadline);

        if (_this.viewIndex <= _this.viewsLength - 1) {
          _this.renderCallbackHandle = requestIdleCallback(render);
        } else {
          // make sure visibleRendered gets triggered even
          // if renderedOutsideOfViewport wasn't
          _this.renderedOutsideOfViewport = true;

          _this.trigger('allRendered');
        }

        if (_this.renderedOutsideOfViewport && !triggeredVisibleRendered) {
          _this.trigger('visibleRendered');

          triggeredVisibleRendered = true;
        }

        if (_this.renderedOutsideOfViewport) {
          _this.lazyload(0);
        }
      };

      this.el.className = 'incito';

      if (this.incito.locale != null) {
        this.el.setAttribute('lang', this.incito.locale);
      }

      loadFonts(this.incito.font_assets);
      this.applyTheme(this.incito.theme);
      this.containerEl.appendChild(this.el); // do first render synchronously unless we're very lazy

      if (this.renderLaziness === 2) {
        this.renderCallbackHandle = requestIdleCallback(render);
      } else {
        syncIdleCallback(render);
      }

      document.addEventListener('scroll', this.lazyloader, true);
      window.addEventListener('resize', this.lazyloader, false);
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      cancelIdleCallback(this.renderCallbackHandle);
      this.containerEl.removeChild(this.el);
      document.removeEventListener('scroll', this.lazyloader, true);
      window.removeEventListener('resize', this.lazyloader, false);
      this.trigger('destroyed');
    }
  }, {
    key: "render",
    value: function render(IdleDeadline) {
      while (IdleDeadline.timeRemaining() > 0 && this.viewIndex <= this.viewsLength - 1) {
        var _views$attrs$view_nam, _item$parent;

        var item = this.views[this.viewIndex];
        var attrs = item.attrs;
        var match = (_views$attrs$view_nam = views[attrs.view_name]) !== null && _views$attrs$view_nam !== void 0 ? _views$attrs$view_nam : View;
        var view = new match(attrs).render();

        if (attrs.id != null && typeof attrs.meta === 'object') {
          this.ids[attrs.id] = attrs.meta;
        }

        if (view.lazyload === true) {
          this.lazyloadables.push(view.el);
        }

        item.view = view;

        if (((_item$parent = item.parent) === null || _item$parent === void 0 ? void 0 : _item$parent.view) != null) {
          item.parent.view.el.appendChild(view.el);
        } else {
          this.el.appendChild(view.el);
        }

        this.viewIndex++; // check if we rendered something out of the viewport for the first time and yield.
        // the check is expensive so it's faster to only check every few iterations, the downside is that
        // we might overrender a tiny bit but it comes out to faster than checking every iteration.

        if (this.renderLaziness && !(this.viewIndex % 20) && !this.renderedOutsideOfViewport && !isInsideViewport(view.el)) {
          this.renderedOutsideOfViewport = true;
          break;
        }
      }
    }
  }, {
    key: "applyTheme",
    value: function applyTheme() {
      var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_Array$isArray(theme.font_family)) {
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
      }
    }
  }, {
    key: "lazyload",
    value: function lazyload(threshold) {
      var _context5;

      this.lazyloadables = _filterInstanceProperty(_context5 = this.lazyloadables).call(_context5, function (el) {
        if (isInsideViewport(el, threshold)) {
          revealElement(el);
          return false;
        } else {
          return true;
        }
      });
    }
  }]);

  return Incito;
}();

var flattenViews = function flattenViews(views, attrs, parent) {
  var item = {
    attrs: attrs,
    view: null,
    parent: parent
  };
  views.push(item);

  if (_Array$isArray(attrs.child_views)) {
    var _context6;

    _forEachInstanceProperty(_context6 = attrs.child_views).call(_context6, function (childAttrs) {
      return flattenViews(views, childAttrs, item);
    });
  }

  return views;
};

var loadFonts = function loadFonts() {
  var fontAssets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key, urls, value;

  if ('FontFace' in window) {
    for (key in fontAssets) {
      var _context7, _value$style, _value$weight;

      value = fontAssets[key];
      urls = _mapInstanceProperty(_context7 = value.src).call(_context7, function (src) {
        return "url(".concat(src[1], ")");
      }).join(', ');
      var font = new FontFace(key, urls, {
        style: (_value$style = value.style) !== null && _value$style !== void 0 ? _value$style : 'normal',
        weight: (_value$weight = value.weight) !== null && _value$weight !== void 0 ? _value$weight : 'normal',
        display: 'swap'
      });
      document.fonts.add(font);
      font.load();
    }
  } else {
    var styleEl = document.createElement('style');

    for (key in fontAssets) {
      var _context8, _context10;

      value = fontAssets[key];
      urls = _mapInstanceProperty(_context8 = value.src).call(_context8, function (src) {
        var _context9;

        return _concatInstanceProperty(_context9 = "url('".concat(src[1], "') format('")).call(_context9, src[0], "')");
      }).join(', ');

      var text = _concatInstanceProperty(_context10 = "@font-face {\n    font-family: '".concat(key, "';\n    font-display: swap;\n    src: ")).call(_context10, urls, ";\n}");

      styleEl.appendChild(document.createTextNode(text));
    }

    document.head.appendChild(styleEl);
  }
};

var isInsideViewport = function isInsideViewport(el, threshold) {
  var _threshold;

  var windowHeight = window.innerHeight;
  threshold = (_threshold = threshold) !== null && _threshold !== void 0 ? _threshold : windowHeight;
  var rect = el.getBoundingClientRect();
  return rect.top <= windowHeight + threshold && rect.top + rect.height >= -threshold;
};

var revealElement = function revealElement(el) {
  var src = el.getAttribute('data-src');

  if (el.tagName.toLowerCase() === 'img') {
    el.addEventListener('load', function () {
      el.className += ' incito--loaded';
    });
    el.setAttribute('src', src);
  } else if (el.tagName.toLowerCase() === 'video') {
    var sourceEl = document.createElement('source');
    sourceEl.setAttribute('src', src);
    sourceEl.setAttribute('type', el.getAttribute('data-mime'));
    el.appendChild(sourceEl);
  } else if (/incito__video-embed-view/gi.test(el.className)) {
    var iframeEl = document.createElement('iframe');
    iframeEl.setAttribute('allow', 'fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframeEl.setAttribute('src', src);
    el.appendChild(iframeEl);
  } else {
    el.style.backgroundImage = "url(".concat(src, ")");
  }
};

export default Incito;
//# sourceMappingURL=incito.es.js.map
