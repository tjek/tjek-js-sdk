import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _inherits from '@babel/runtime-corejs3/helpers/inherits';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _URL from '@babel/runtime-corejs3/core-js-stable/url';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.replace.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/es.array.join.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import 'core-js/modules/es.string.link.js';
import fetch from 'cross-fetch';
import MicroEvent from 'microevent';

function formatUnit(unit) {
  if (!unit) return 0;
  if (typeof unit === 'number') return unit + 'px';
  if (typeof unit === 'string') return unit.replace('dp', 'px');
  return 0;
}

function escapeAttrValue(value) {
  return typeof value === 'string' ? value.replace(/"/g, '&quot;') : value;
}

function isDefinedStr(value) {
  return typeof value === 'string' && value.length > 0;
}

function escapeHTML(unsafe) {
  return unsafe ? unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
}

function formatSpans(text, spans) {
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

  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var endIndex = span.end;
    result.push({
      text: _sliceInstanceProperty(text).call(text, span.start, endIndex),
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
  }

  return result.reduce(function (memo, item) {
    var _item$span;

    var escapedText = escapeHTML(item.text || '');

    if ((_item$span = item.span) != null && _item$span.name) {
      if (item.span.name === 'link' && item.span.url) {
        return memo + '<a href="' + encodeURI(item.span.url) + '" rel="external" target="_blank">' + escapedText + '</a>';
      }

      return memo + '<span data-name="' + item.span.name + '">' + escapedText + '</span>';
    }

    return memo + escapedText;
  }, '');
}

var matches = typeof Element !== 'undefined' && (Element.prototype.matches || // @ts-expect-error
Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);

function closest(el, s) {
  do {
    // @ts-expect-error
    if (matches.call(el, s)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);

  return null;
}

var flexAlignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
var flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
var flexDirectionModes = ['row', 'column'];
var backgroundTileModes = ['repeat_x', 'repeat_y', 'repeat'];
var strokeStyles = ['solid', 'dotted', 'dashed'];

function renderView(view, canLazyload) {
  var tagName = 'div';
  var contents;
  var classNames = ['incito__view'];
  var styles = {};
  var attrs = {};

  switch (view.view_name) {
    case 'TextView':
      {
        tagName = 'p';
        classNames.push('incito__text-view');
        var textStyles = (view.text_style || '').split('|');
        var text = view.text;
        text = Array.isArray(view.spans) && view.spans.length > 0 ? formatSpans(text, view.spans) : escapeHTML(text);

        if (view.text_prevent_widow) {
          text = text.replace(/&nbsp;([^\s]+)$/, ' $1').replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
        }

        contents = text.replace(/\n/g, '<br>');

        if (Array.isArray(view.font_family) && view.font_family.length > 0) {
          styles['font-family'] = view.font_family.join(', ');
        }

        if (view.text_size != null) {
          styles['font-size'] = "".concat(view.text_size, "px");
        }

        if (view.line_spacing_multiplier != null) {
          styles['line-height'] = view.line_spacing_multiplier;
        }

        if (view.text_color) {
          styles.color = view.text_color;
        }

        if (textStyles.indexOf('bold') !== -1) {
          styles['font-weight'] = 'bold';
        }

        if (textStyles.indexOf('italic') !== -1) {
          styles['font-style'] = 'italic';
        }

        if (Array.isArray(view.text_decoration_line)) {
          styles['text-decoration-line'] = view.text_decoration_line.join(' ');
        }

        if (isDefinedStr(view.text_shadow)) {
          styles['text-shadow'] = view.text_shadow;
        } else if (isDefinedStr(view.text_shadow_color)) {
          var dx = typeof view.text_shadow_dx === 'number' ? view.text_shadow_dx : 0;
          var dy = typeof view.text_shadow_dy === 'number' ? view.text_shadow_dy : 0;
          var radius = typeof view.text_shadow_radius === 'number' ? view.text_shadow_radius : 0;
          var color = view.text_shadow_color;
          styles['text-shadow'] = [dx, dy, radius, color].join('px ');
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

        break;
      }

    case 'ImageView':
      {
        tagName = 'img';
        classNames.push('incito__image-view');
        attrs.onerror = "this.style.display='none'";
        var src = String(new _URL(view.src));

        if (isDefinedStr(view.src)) {
          if (canLazyload) {
            classNames.push('incito--lazy');
            attrs['data-src'] = src;
          } else {
            attrs.src = src;
          }
        }

        if (isDefinedStr(view.label)) attrs['alt'] = view.label;
        break;
      }

    case 'VideoView':
      {
        tagName = 'video';
        classNames.push('incito__video-view');
        attrs.muted = '';
        attrs.playsinline = '';
        attrs.preload = 'none';
        attrs.poster = 'noposter';

        var _src = String(new _URL(view.src));

        if (canLazyload) {
          attrs['data-src'] = _src;
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
          attrs.src = _src;
          attrs.controls = '';
        }

        if (canLazyload) classNames.push('incito--lazy');
        break;
      }

    case 'HTMLView':
      {
        if (isDefinedStr(view.style)) {
          var _context;

          _trimInstanceProperty(_context = view.style).call(_context).split(';').forEach(function (style) {
            var _style$trim$split = _trimInstanceProperty(style).call(style).split(':'),
                key = _style$trim$split[0],
                value = _style$trim$split[1];

            styles[key] = value;
          });
        }

        break;
      }

    case 'VideoEmbedView':
    case 'HTMLEmbedView':
      {
        tagName = 'iframe';
        classNames.push('incito__html-embed-view');
        attrs.sandbox = 'allow-scripts allow-same-origin';
        attrs.allowfullscreen = '';

        var _src2 = String(new _URL(view.src));

        if (canLazyload) {
          classNames.push('incito--lazy');
          attrs['data-src'] = _src2;
        } else {
          attrs.src = _src2;
        }

        break;
      }

    case 'IncitoEmbedView':
      {
        classNames.push('incito__incito-embed-view');

        if (canLazyload) {
          classNames.push('incito--lazy');
          attrs['data-src'] = String(new _URL(view.src));

          if (view.method === 'get' || view.method === 'post') {
            attrs['data-method'] = view.method;
          }

          if (view.body) {
            attrs['data-body'] = encodeURIComponent(_JSON$stringify(view.body));
          }
        }

        break;
      }

    case 'AbsoluteLayout':
      {
        classNames.push('incito__absolute-layout-view');
        break;
      }

    case 'FlexLayout':
      {
        classNames.push('incito__flex-layout-view');
        styles.display = 'flex';

        if (flexAlignItemModes.indexOf(view.layout_flex_align_items) !== -1) {
          styles['align-items'] = styles['ms-align-items'] = view.layout_flex_align_items;
        }

        if (flexJustifyModes.indexOf(view.layout_flex_justify_content) !== -1) {
          styles['justify-content'] = styles['ms-flex-pack'] = view.layout_flex_justify_content;
        }

        if (flexDirectionModes.indexOf(view.layout_flex_direction) !== -1) {
          styles['flex-direction'] = styles['ms-flex-direction'] = view.layout_flex_direction;
        }

        break;
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

  if (Array.isArray(view.feature_labels)) {
    var _context2;

    var featureLabels = _filterInstanceProperty(_context2 = view.feature_labels).call(_context2, function (featureLabel) {
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
    if (canLazyload) {
      classNames.push('incito--lazy');
      attrs['data-bg'] = view.background_image;
    } else {
      styles['background-image'] = "url(".concat(view.background_image, ")");
    }
  }

  if (backgroundTileModes.indexOf(view.background_tile_mode) !== -1) {
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

  if (isDefinedStr(view.shadow_color)) {
    var _dx = typeof view.shadow_dx === 'number' ? view.shadow_dx : 0;

    var _dy = typeof view.shadow_dy === 'number' ? view.shadow_dy : 0;

    var _radius = typeof view.shadow_radius === 'number' ? view.shadow_radius : 0;

    var _color = view.shadow_color;
    styles['box-shadow'] = [_dx, _dy, _radius, _color].join('px ');
  }

  if (view.stroke_width != null) {
    styles['border-width'] = formatUnit(view.stroke_width);
  }

  if (view.stroke_color) {
    styles['border-color'] = view.stroke_color;
  }

  if (strokeStyles.indexOf(view.stroke_style) !== -1) {
    styles['border-style'] = view.stroke_style;
  }

  if (view.stroke_top_width != null) {
    styles['border-top-width'] = formatUnit(view.stroke_top_width);
  }

  if (view.stroke_top_color) {
    styles['border-top-color'] = view.stroke_top_color;
  }

  if (view.stroke_left_width != null) {
    styles['border-left-width'] = formatUnit(view.stroke_left_width);
  }

  if (view.stroke_left_color) {
    styles['border-left-color'] = view.stroke_left_color;
  }

  if (view.stroke_right_width != null) {
    styles['border-right-width'] = formatUnit(view.stroke_right_width);
  }

  if (view.stroke_right_color) {
    styles['border-right-color'] = view.stroke_right_color;
  }

  if (view.stroke_bottom_width != null) {
    styles['border-bottom-width'] = formatUnit(view.stroke_bottom_width);
  }

  if (view.stroke_bottom_color) {
    styles['border-bottom-color'] = view.stroke_bottom_color;
  }

  if (typeof view.layout_flex_shrink === 'number') {
    styles['flex-shrink'] = styles['ms-flex-shrink'] = view.layout_flex_shrink;
  }

  if (typeof view.layout_flex_grow === 'number') {
    styles['flex-grow'] = styles['ms-flex-grow'] = view.layout_flex_grow;
  }

  if (view.layout_flex_basis != null) {
    styles['flex-basis'] = styles['ms-flex-basis'] = formatUnit(view.layout_flex_basis);
  }

  var transforms = [];
  var translateX = formatUnit(view.transform_translate_x);
  var translateY = formatUnit(view.transform_translate_y);
  if (translateX !== 0) transforms.push("translateX(".concat(translateX, ")"));
  if (translateY !== 0) transforms.push("translateY(".concat(translateY, ")"));

  if (typeof view.transform_rotate === 'number' && view.transform_rotate !== 0) {
    transforms.push("rotate(".concat(view.transform_rotate, "deg)"));
  }

  if (typeof view.transform_scale === 'number' && view.transform_scale !== 1) {
    transforms.push("scale(".concat(view.transform_scale, ")"));
  }

  if (transforms.length > 0) styles.transform = transforms.join(' '); // Transform origin.

  if (Array.isArray(view.transform_origin) && view.transform_origin.length === 2) {
    styles['transform-origin'] = formatUnit(view.transform_origin[0]) + ' ' + formatUnit(view.transform_origin[1]);
  }

  attrs.style = '';

  for (var key in styles) {
    attrs.style += key + ':' + styles[key] + ';';
  }

  attrs.class = classNames.join(' ');
  return {
    tagName: tagName,
    contents: contents,
    attrs: attrs
  };
}

var Incito = /*#__PURE__*/function (_MicroEvent) {
  _inherits(Incito, _MicroEvent);

  //@ts-expect-error
  function Incito(containerEl, _temp) {
    var _this;

    var _ref = _temp === void 0 ? {} : _temp,
        incito = _ref.incito;

    _this = _MicroEvent.call(this) || this;
    _this.containerEl = void 0;
    _this.incito = void 0;
    _this.el = void 0;
    _this.ids = void 0;
    _this.sections = void 0;
    _this.canLazyload = void 0;
    _this.styleEl = void 0;
    _this.lazyObserver = void 0;
    _this.videoObserver = void 0;
    _this.containerEl = containerEl;
    _this.incito = incito;
    _this.el = document.createElement('div');
    _this.ids = {};
    _this.sections = [];
    _this.canLazyload = 'IntersectionObserver' in window;

    _this.render();

    return _this;
  }

  var _proto = Incito.prototype;

  _proto.render = function render() {
    var theme = this.incito.theme || {};

    if (this.incito.font_assets) {
      var styleEl = document.createElement('style');

      for (var key in this.incito.font_assets) {
        var _context3;

        var src = this.incito.font_assets[key].src;

        var urls = _mapInstanceProperty(src).call(src, function (item) {
          return "url(\"".concat(item[1], "\")");
        }).join(', ');

        var rule = _concatInstanceProperty(_context3 = "@font-face { font-family: \"".concat(key, "\"; font-display: swap; src: ")).call(_context3, urls, "; }");

        styleEl.appendChild(document.createTextNode(rule));
      }

      document.head.appendChild(styleEl);
    }

    this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
    this.el.className = 'incito';

    if (Array.isArray(theme.font_family)) {
      this.el.style.fontFamily = theme.font_family.join(', ');
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
      //@ts-expect-error
      this.el.style.lineHeight = theme.line_spacing_multiplier;
    } // By setting the language we help the browser with stuff like hyphenation.


    if (this.incito.locale) {
      this.el.setAttribute('lang', this.incito.locale);
    }

    this.el.innerHTML = this.renderHtml(this.incito.root_view);
    this.containerEl.appendChild(this.el);
    if (this.canLazyload) this.enableLazyloading();
  };

  _proto.start = function start() {
    this.el.addEventListener('click', function (e) {
      var el = closest(e.target, '.incito__view [data-link]');
      var link = el ? el.dataset.link : null;
      if (isDefinedStr(link)) window.open(link, '_blank');
    });
    if (this.canLazyload) this.observeElements(this.el);
    this.trigger('started', 'a', 'b', 'c');
  };

  _proto.destroy = function destroy() {
    if (this.lazyObserver) this.lazyObserver.disconnect();
    if (this.videoObserver) this.videoObserver.disconnect();
    this.containerEl.removeChild(this.el);
    if (this.styleEl) this.styleEl.parentNode.removeChild(this.styleEl);
    this.trigger('destroyed');
  };

  _proto.observeElements = function observeElements(el) {
    var _this2 = this;

    el.querySelectorAll('.incito--lazy').forEach(function (el) {
      _this2.lazyObserver.observe(el);
    });
    el.querySelectorAll('.incito__video-view[data-autoplay=true]').forEach(function (el) {
      _this2.videoObserver.observe(el);
    });
  };

  _proto.loadEl = function loadEl(el) {
    var _this3 = this;

    if (el.tagName.toLowerCase() === 'video' && !el.dataset.isLazyloaded) {
      var sourceEl = document.createElement('source');
      sourceEl.setAttribute('src', el.dataset.src);
      sourceEl.setAttribute('type', el.dataset.mime);
      el.appendChild(sourceEl);
      el.load();
      el.dataset.isLazyloaded = true;
    } else if (el.classList.contains('incito__incito-embed-view')) {
      var _el$dataset = el.dataset,
          url = _el$dataset.src,
          _el$dataset$method = _el$dataset.method,
          method = _el$dataset$method === void 0 ? 'get' : _el$dataset$method,
          body = _el$dataset.body;
      fetch(url, {
        method: method,
        body: body ? JSON.parse(decodeURIComponent(body)) : null
      }).then(function (res) {
        if (res.status === 200) return res.json();
      }).then(function (res) {
        el.innerHTML = _this3.renderHtml(res);

        _this3.observeElements(el);
      });
    } else if (el.dataset.bg) {
      el.style.backgroundImage = "url(".concat(el.dataset.bg, ")");
    } else if (el.dataset.src) {
      el.src = el.dataset.src;
    }
  };

  _proto.enableLazyloading = function enableLazyloading() {
    var _this4 = this;

    this.lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          _this4.loadEl(entry.target);

          _this4.lazyObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '500px 0px'
    });
    this.videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var autoplayState = // @ts-expect-error
          entry.target.dataset.autoplayState;

          _this4.loadEl(entry.target);

          _this4.lazyObserver.unobserve(entry.target);

          if (!autoplayState || autoplayState === 'paused') {
            // @ts-expect-error
            entry.target.dataset.autoplayState = 'playing'; // @ts-expect-error

            entry.target.play();
          } // @ts-expect-error

        } else if (!entry.target.paused) {
          // @ts-expect-error
          entry.target.dataset.autoplayState = 'paused'; // @ts-expect-error

          entry.target.pause();
        }
      });
    }, {
      threshold: 0.25
    });
  };

  _proto.renderHtml = function renderHtml(view) {
    var html = '';

    try {
      var _renderView = renderView(view, this.canLazyload),
          tagName = _renderView.tagName,
          contents = _renderView.contents,
          attrs = _renderView.attrs;

      var id = view.id,
          child_views = view.child_views,
          meta = view.meta,
          role = view.role;
      if (id != null && typeof meta === 'object') this.ids[id] = meta;
      if (role === 'section') this.sections.push({
        id: id,
        meta: meta
      });
      html += '<' + tagName;

      for (var key in attrs) {
        html += ' ' + key + '="' + attrs[key] + '"';
      }

      html += '>';

      if (Array.isArray(child_views)) {
        for (var i = 0; i < child_views.length; i++) {
          html += this.renderHtml(child_views[i]);
        }
      }

      if (contents) html += contents;
      html += '</' + tagName + '>';
    } catch (_unused) {}

    return html;
  };

  return _createClass(Incito);
}(MicroEvent);

export { Incito as default };
//# sourceMappingURL=index.es.js.map
