/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rainbow = rainbow;
exports.monochrome = monochrome;

var _Colors = __webpack_require__(2);

var Colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function gradient(n, lambda) {
  var whiteEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var colors = [];
  var limit = whiteEnd ? n - 1 : n;
  for (var i = 0; i < limit; i++) {
    colors.push(lambda(i));
  }
  if (whiteEnd) {
    colors.push({ r: 255, g: 255, b: 255, a: 255 });
  }
  return colors;
}

function rainbow(n) {
  return gradient(n, function (i) {
    var hue = ((i + 140) % 200 + 1) / 200;
    var c = Colors.hsvToRgb(hue, 1, 1);
    return {
      r: c[0],
      g: c[1],
      b: c[2],
      a: 255
    };
  }, true);
}

function monochrome(n) {
  return gradient(n, function (i) {
    var c = Math.floor(i / n * 255);
    return {
      r: c,
      g: c,
      b: c,
      a: 255
    };
  }, true);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MandelbrotViewer = __webpack_require__(4);

var _MandelbrotViewer2 = _interopRequireDefault(_MandelbrotViewer);

var _Gradients = __webpack_require__(0);

var Gradients = _interopRequireWildcard(_Gradients);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var reset = document.getElementById('reset');
var form = document.getElementById('form');
var zoom = document.getElementById('zoom');
var precision = document.getElementById('precision');
var download = document.getElementById('download');
var colorscheme = document.getElementById('colorscheme');
var canvasSize = document.getElementById('canvasSize');
var centerR = document.getElementById('centerR');
var centerI = document.getElementById('centerI');
var width = document.getElementById('width');

document.querySelectorAll('input[type="number"]').forEach(function (i) {
  i.step = Number.MIN_VALUE;
});

Object.keys(Gradients).forEach(function (scheme) {
  var option = document.createElement('option');
  option.value = option.innerHTML = scheme;
  colorscheme.appendChild(option);
});

var view = new _MandelbrotViewer2.default();

var update = function update() {
  view.precision = Number.parseInt(precision.value);
  canvas.width = canvas.height = Number.parseInt(canvasSize.value);

  view.render(canvas, colorscheme.value);

  centerR.value = view.center.r;
  centerI.value = view.center.i;
  width.value = view.width;
};

var updateSettings = function updateSettings() {
  view.width = view.height = Number.parseFloat(width.value);
  view.center.r = Number.parseFloat(centerR.value);
  view.center.i = Number.parseFloat(centerI.value);
  update();
};

var getMousePos = function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return { x: x, y: y };
};

var magnify = function magnify() {
  var invert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var z = Number.parseInt(zoom.value);
  var value = invert ? 1 / z : z;
  return function (e) {
    view.moveTo(canvas, getMousePos(canvas, e));
    view.magnify(value);
    update();
  };
};

canvas.addEventListener('click', magnify());

canvas.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  magnify(true)(e);
});

reset.addEventListener('click', function (e) {
  view = new _MandelbrotViewer2.default();
  update();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  update();
});

form.addEventListener('change', updateSettings);

download.addEventListener('click', function (e) {
  var img = canvas.toDataURL("image/png").replace('image/octet-stream');
  download.href = img;
  var filename = 'mandelbrot_' + centerR.value + '_' + centerI.value + '_' + width.value + '.png';
  download.download = filename;
});

update();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rgbToHsl = rgbToHsl;
exports.hslToRgb = hslToRgb;
exports.rgbToHsv = rgbToHsv;
exports.hsvToRgb = hsvToRgb;
// Found at https://stackoverflow.com/a/9493060
// & http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);break;
            case g:
                h = (b - r) / d + 2;break;
            case b:
                h = (r - g) / d + 4;break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv(r, g, b) {
    r = r / 255, g = g / 255, b = b / 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);break;
            case g:
                h = (b - r) / d + 2;break;
            case b:
                h = (r - g) / d + 4;break;
        }
        h /= 6;
    }

    return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;break;
        case 1:
            r = q, g = v, b = p;break;
        case 2:
            r = p, g = v, b = t;break;
        case 3:
            r = p, g = q, b = v;break;
        case 4:
            r = t, g = p, b = v;break;
        case 5:
            r = v, g = p, b = q;break;
    }

    return [r * 255, g * 255, b * 255];
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Complex = function () {
  function Complex(r, i) {
    _classCallCheck(this, Complex);

    this.r = r;
    this.i = i;
  }

  _createClass(Complex, [{
    key: "add",
    value: function add(other) {
      return new Complex(this.r + other.r, this.i + other.i);
    }
  }, {
    key: "square",
    value: function square() {
      return new Complex(this.r * this.r - this.i * this.i, 2 * this.r * this.i);
    }
  }, {
    key: "squareAbs",
    value: function squareAbs() {
      return this.r * this.r + this.i * this.i;
    }
  }]);

  return Complex;
}();

exports.default = Complex;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Complex = __webpack_require__(3);

var _Complex2 = _interopRequireDefault(_Complex);

var _Gradients = __webpack_require__(0);

var Gradients = _interopRequireWildcard(_Gradients);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MandelbrotViewer = function () {
  function MandelbrotViewer() {
    _classCallCheck(this, MandelbrotViewer);

    this.center = { r: -0.75, i: 0.0 };
    this.width = 2.5;
    this.height = 2.5;
    this.precision = 100;
  }

  _createClass(MandelbrotViewer, [{
    key: 'render',
    value: function render(canvas, colorscheme) {
      var ctx = canvas.getContext('2d');
      var data = ctx.createImageData(canvas.width, canvas.height);
      var colors = this.constructor.getColors(this.precision, colorscheme);
      var step = {
        r: this.width / canvas.width,
        i: this.height / canvas.height
      };
      var start = {
        r: this.center.r - this.width / 2,
        i: this.center.i - this.height / 2
      };

      for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.width; y++) {
          var point = new _Complex2.default(start.r + step.r * x, start.i + step.i * y);
          var offset = (x + y * canvas.width) * 4;
          var level = this.constructor.getLevel(point, this.precision - 1);
          var color = colors[level];

          data.data[offset] = color.r;
          data.data[offset + 1] = color.g;
          data.data[offset + 2] = color.b;
          data.data[offset + 3] = color.a;
        }
      }

      ctx.putImageData(data, 0, 0);
    }
  }, {
    key: 'magnify',
    value: function magnify(magnitude) {
      this.width /= magnitude;
      this.height /= magnitude;
    }
  }, {
    key: 'moveTo',
    value: function moveTo(canvas, pos) {
      pos = { x: pos.x - canvas.width / 2, y: pos.y - canvas.height / 2 };
      var trans = {
        r: pos.x / (canvas.width / 2) * (this.width / 2),
        i: pos.y / (canvas.height / 2) * (this.height / 2)
      };
      this.center.r += trans.r;
      this.center.i += trans.i;
    }
  }], [{
    key: 'getColors',
    value: function getColors(amount, colorscheme) {
      return Gradients[colorscheme](amount);
    }
  }, {
    key: 'getLevel',
    value: function getLevel(point, maxLevel) {
      var result = new _Complex2.default(0, 0);
      var i = void 0;
      for (i = 0; i < maxLevel && result.squareAbs() < 4; i++) {
        result = result.square().add(point);
      }
      return i;
    }
  }]);

  return MandelbrotViewer;
}();

exports.default = MandelbrotViewer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
(function webpackMissingModule() { throw new Error("Cannot find module \"build\""); }());


/***/ })
/******/ ]);