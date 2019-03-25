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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Asset.ts":
/*!**********************!*\
  !*** ./src/Asset.ts ***!
  \**********************/
/*! exports provided: Asset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Asset", function() { return Asset; });
var Asset = /** @class */ (function () {
    function Asset(name) {
        this.name = name;
        this.loaded = false;
    }
    Asset.prototype.isComplete = function () {
        return this.loaded;
    };
    return Asset;
}());



/***/ }),

/***/ "./src/Controls.ts":
/*!*************************!*\
  !*** ./src/Controls.ts ***!
  \*************************/
/*! exports provided: ControlOptions, Controls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlOptions", function() { return ControlOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controls", function() { return Controls; });
var ControlOptions = /** @class */ (function () {
    function ControlOptions() {
    }
    return ControlOptions;
}());

var Controls = /** @class */ (function () {
    function Controls(options) {
        this.keysBindings = [];
        if (!!options) {
            if (options.pointerLock) {
                if (!options.canvas || !options.pointerCallback) {
                    throw "In order to utilize pointer lock, provide canvas and callback in the options!";
                }
                this.useMouse = false;
                this.bindPointer(options.canvas, options.pointerCallback);
            }
        }
        this.createEventListeners();
    }
    Controls.prototype.bindKeys = function (keys, callback) {
        for (var i = 0; i < keys.length; i++) {
            this.keysBindings[keys[i]] = callback;
        }
    };
    Controls.prototype.bindKey = function (key, callback) {
        this.keysBindings[key] = callback;
    };
    Controls.prototype.bindMousedown = function (callback) {
        this.mousedownCallback = callback;
    };
    Controls.prototype.createEventListeners = function () {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            e = e || window.event;
            if (_this.keysBindings.hasOwnProperty(e.keyCode)) {
                _this.keysBindings[e.keyCode]();
            }
        });
        document.addEventListener("mousedown", function (e) {
            e = e || window.event;
            if (_this.mousedownCallback !== undefined) {
                _this.mousedownCallback();
            }
        });
    };
    Controls.prototype.bindPointer = function (canvas, pointerCallback) {
        var _this = this;
        canvas["requestPointerLock"] = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"];
        document["exitPointerLock"] = document["exitPointerLock"] || document["mozExitPointerLock"];
        canvas.onclick = function () {
            _this.useMouse = true;
            canvas["requestPointerLock"]();
        };
        document.addEventListener("pointerlockchange", function (e) {
            _this.lockChange(canvas, pointerCallback);
        }, false);
        document.addEventListener("mozpointerlockchange", function (e) {
            _this.lockChange(canvas, pointerCallback);
        }, false);
    };
    Controls.prototype.lockChange = function (canvas, pointerCallback) {
        var _this = this;
        if (document["pointerLockElement"] === canvas ||
            document["mozPointerLockElement"] === canvas) {
            console.log("The pointer lock status is now locked");
            document.addEventListener("mousemove", function (e) {
                if (!_this.useMouse) {
                    return;
                }
                pointerCallback(e);
            }, false);
        }
        else {
            console.log("The pointer lock status is now unlocked");
            this.useMouse = false;
        }
    };
    return Controls;
}());



/***/ }),

/***/ "./src/FileLoader.ts":
/*!***************************!*\
  !*** ./src/FileLoader.ts ***!
  \***************************/
/*! exports provided: FileLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileLoader", function() { return FileLoader; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FileLoader = /** @class */ (function () {
    function FileLoader() {
    }
    FileLoader.loadJSON = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(fileName)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return FileLoader;
}());



/***/ }),

/***/ "./src/Globals.ts":
/*!************************!*\
  !*** ./src/Globals.ts ***!
  \************************/
/*! exports provided: GLOBAL_ASSETS, GetAsset, AreAllAssetsLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL_ASSETS", function() { return GLOBAL_ASSETS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAsset", function() { return GetAsset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreAllAssetsLoaded", function() { return AreAllAssetsLoaded; });
var GLOBAL_ASSETS = [];
var GetAsset = function (name) {
    var result = GLOBAL_ASSETS.filter(function (asset) {
        return asset.name === name;
    });
    if (!result || result.length === 0) {
        return null;
    }
    return result[0];
};
var AreAllAssetsLoaded = function (name) {
    return GLOBAL_ASSETS.filter(function (asset) {
        return asset.isComplete();
    }).length === GLOBAL_ASSETS.length;
};


/***/ }),

/***/ "./src/Not3D.ts":
/*!**********************!*\
  !*** ./src/Not3D.ts ***!
  \**********************/
/*! exports provided: Not3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Not3D", function() { return Not3D; });
/* harmony import */ var _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Globals */ "./src/Globals.ts");


var Not3D = /** @class */ (function () {
    function Not3D(parentElement, renderOptions, stats) {
        this.stats = stats;
        this.renderer = new _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__["Renderer"](parentElement, renderOptions);
    }
    Not3D.prototype.setLoop = function (callback) {
        this.loopCallback = callback;
    };
    Not3D.prototype.mainLoop = function () {
        var _this = this;
        if (this.stats) {
            this.stats.begin();
        }
        this.loopCallback();
        if (this.stats) {
            this.stats.end();
        }
        requestAnimationFrame(function () { _this.mainLoop(); });
    };
    Not3D.prototype.start = function (callback) {
        var _this = this;
        if (Object(_Globals__WEBPACK_IMPORTED_MODULE_1__["AreAllAssetsLoaded"])()) {
            if (!!callback) {
                callback();
            }
            this.mainLoop();
        }
        else {
            setTimeout(function () {
                _this.start(callback);
            }, 100);
        }
    };
    return Not3D;
}());



/***/ }),

/***/ "./src/Rendering/ImageAsset.ts":
/*!*************************************!*\
  !*** ./src/Rendering/ImageAsset.ts ***!
  \*************************************/
/*! exports provided: ImageAsset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageAsset", function() { return ImageAsset; });
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Asset */ "./src/Asset.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ImageAsset = /** @class */ (function (_super) {
    __extends(ImageAsset, _super);
    function ImageAsset(name, src) {
        var _this = _super.call(this, name) || this;
        _this.image = new Image();
        _this.image.src = src;
        return _this;
    }
    ImageAsset.prototype.isComplete = function () {
        this.loaded = this.image.complete;
        return this.loaded;
    };
    return ImageAsset;
}(_Asset__WEBPACK_IMPORTED_MODULE_0__["Asset"]));



/***/ }),

/***/ "./src/Rendering/Renderer.ts":
/*!***********************************!*\
  !*** ./src/Rendering/Renderer.ts ***!
  \***********************************/
/*! exports provided: RendererOptions, DrawOptions, Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RendererOptions", function() { return RendererOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawOptions", function() { return DrawOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony import */ var _VisualUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisualUtils */ "./src/Rendering/VisualUtils.ts");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Globals */ "./src/Globals.ts");


var RendererOptions = /** @class */ (function () {
    function RendererOptions() {
        this.resDecrease = 1;
        this.canvasId = "mainScreen";
    }
    return RendererOptions;
}());

var DrawOptions = /** @class */ (function () {
    function DrawOptions() {
    }
    return DrawOptions;
}());

var Renderer = /** @class */ (function () {
    function Renderer(parentElement, options) {
        this.parentElement = parentElement;
        this.options = options;
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", document.body.clientWidth.toString());
        this.canvas.setAttribute("height", document.body.scrollHeight.toString());
        this.canvas.setAttribute("id", this.options.canvasId);
        this.parentElement.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.nCeiling = 0;
        this.nFloor = 0;
        this.offScreen = false;
        this.yAngle = 0;
    }
    Renderer.prototype.getWidth = function () {
        return this.canvas.width / this.options.resDecrease;
    };
    Renderer.prototype.getHeight = function () {
        return this.canvas.height / this.options.resDecrease;
    };
    Renderer.prototype.setFillStyle = function (color) {
        if (this.context) {
            this.context.fillStyle = color;
        }
    };
    Renderer.prototype.clearAll = function () {
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    Renderer.prototype.renderGlobals = function () {
        if (!this.context) {
            return;
        }
        var middleLine = this.canvas.height / 2 + this.yAngle;
        this.context.fillStyle = "rgb(44, 107, 255)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        var linearGradient1 = this.context.createLinearGradient(0, this.canvas.height, 0, middleLine);
        linearGradient1.addColorStop(0, "rgb(147, 67, 2)");
        linearGradient1.addColorStop(0.65, _VisualUtils__WEBPACK_IMPORTED_MODULE_0__["VisualUtils"].shadeBlendConvert(-0.8, "rgb(147, 67, 2)"));
        linearGradient1.addColorStop(1, "rgb(0, 0, 0)");
        this.context.fillStyle = linearGradient1;
        this.context.fillRect(0, middleLine, this.canvas.width, this.canvas.height - middleLine);
        this.context.fillStyle = "black";
    };
    Renderer.prototype.renderImage = function (image, spaceX, spaceY, spaceWidth, spaceHeight, options) {
        var renderContext = this.getRenderContext();
        if (this.shouldImageBeRendered(options)) {
            renderContext.drawImage(Object(_Globals__WEBPACK_IMPORTED_MODULE_1__["GetAsset"])(image.i).image, image.X, image.Y, image.W, image.H, spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
        }
        if (options.shadeLevel !== 0) {
            renderContext.fillStyle = "rgba(0, 0, 0, " + options["shadeLevel"] + ")";
            renderContext.fillRect(spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
        }
    };
    Renderer.prototype.renderUnicodeAsset = function (asset, spaceX, spaceY, width, height, fMiddleOfObject, fDistanceFromPlayer, fDepthBuffer, shadeLevel) {
        var renderContext = this.getRenderContext();
        for (var ly = 0; ly < asset.rows; ly++) {
            for (var lx = 0; lx < asset.cols; lx++) {
                var proportialWidth = width / asset.cols;
                var proportialHeight = height / asset.rows;
                var nObjectColumn = Math.round(fMiddleOfObject + lx - (asset.cols / 2));
                if (nObjectColumn >= 0 && nObjectColumn < this.getWidth()) {
                    if (asset.getCharAt(ly, lx) !== "." && fDepthBuffer[nObjectColumn] >= fDistanceFromPlayer) {
                        fDepthBuffer[nObjectColumn] = fDistanceFromPlayer;
                        var renderX = spaceX + (lx * proportialWidth);
                        var renderY = spaceY + (ly * proportialHeight);
                        renderContext.fillStyle = asset.getCharAt(ly, lx);
                        renderContext.fillRect(renderX, renderY + this.yAngle, proportialWidth, proportialHeight);
                        renderContext.fillStyle = "rgba(0, 0, 0, " + shadeLevel + ")";
                        renderContext.fillRect(renderX, renderY + this.yAngle, proportialWidth, proportialHeight);
                    }
                }
            }
        }
    };
    Renderer.prototype.getRenderContext = function () {
        return this.offScreen ? this.canvas["offscreenContext"] : this.context;
    };
    Renderer.prototype.shouldImageBeRendered = function (options) {
        return !!(typeof options === "undefined"
            || (typeof options !== "undefined" && options.shadeLevel !== undefined && options.shadeLevel < 0.99));
    };
    Renderer.prototype.renderRect = function (x, y, w, h) {
        if (this.context) {
            this.context.fillRect(x, y, w, h);
        }
    };
    Renderer.prototype.renderLine = function (coordinates, lineColor) {
        if (!this.context) {
            return;
        }
        this.context.beginPath();
        this.context.moveTo(coordinates[0].x, coordinates[0].y);
        for (var i = 1; i < coordinates.length; i++) {
            this.context.lineTo(coordinates[i].x, coordinates[i].y);
        }
        this.context.strokeStyle = lineColor;
        this.context.stroke();
    };
    Renderer.prototype.beginOffScreen = function () {
        this.canvas["offscreenCanvas"] = document.createElement("canvas");
        this.canvas["offscreenCanvas"].width = this.getWidth();
        this.canvas["offscreenCanvas"].height = this.getWidth();
        this.canvas["offscreenContext"] = this.canvas["offscreenCanvas"].getContext("2d");
        this.offScreen = true;
    };
    Renderer.prototype.endOffScreen = function () {
        if (this.context) {
            this.context.drawImage(this.canvas["offscreenCanvas"], 0, 0);
            this.offScreen = false;
        }
    };
    return Renderer;
}());



/***/ }),

/***/ "./src/Rendering/UnicodeAsset.ts":
/*!***************************************!*\
  !*** ./src/Rendering/UnicodeAsset.ts ***!
  \***************************************/
/*! exports provided: UnicodeAsset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnicodeAsset", function() { return UnicodeAsset; });
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Asset */ "./src/Asset.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var UnicodeAsset = /** @class */ (function (_super) {
    __extends(UnicodeAsset, _super);
    function UnicodeAsset(name, charmap, scale) {
        var _this = _super.call(this, name) || this;
        _this.charmap = charmap;
        _this.loaded = true;
        _this.rows = _this.charmap.length;
        _this.cols = _this.charmap[0].length;
        _this.scale = scale || 10;
        return _this;
    }
    UnicodeAsset.prototype.getCharAt = function (row, col) {
        return this.charmap[row][col];
    };
    UnicodeAsset.prototype.setCharAt = function (row, col, char) {
        this.charmap[row] = this.charmap[row].substr(0, col) + char + this.charmap[row].substr(col + char.length);
    };
    UnicodeAsset.prototype.getHeight = function () {
        return this.rows * this.scale;
    };
    UnicodeAsset.prototype.getWidth = function () {
        return this.cols * this.scale;
    };
    return UnicodeAsset;
}(_Asset__WEBPACK_IMPORTED_MODULE_0__["Asset"]));



/***/ }),

/***/ "./src/Rendering/VisualUtils.ts":
/*!**************************************!*\
  !*** ./src/Rendering/VisualUtils.ts ***!
  \**************************************/
/*! exports provided: VisualUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualUtils", function() { return VisualUtils; });
var VisualUtils = /** @class */ (function () {
    function VisualUtils() {
    }
    VisualUtils.shadeBlendConvert = function (p, from, to) {
        var i = parseInt;
        var r = Math.round;
        var h = from.length > 9;
        h = typeof to === "string" ? to.length > 9 ? true : to === "c" ? !h : false : h;
        var b = p < 0;
        p = b ? p * -1 : p;
        to = to && to !== "c" ? to : b ? "#000000" : "#FFFFFF";
        var f = VisualUtils.sbcRip(from, i, r);
        var t = VisualUtils.sbcRip(to, i, r);
        if (h) {
            return "rgb(" + r((t[0] - f[0]) * p + f[0]) +
                "," + r((t[1] - f[1]) * p + f[1]) +
                "," + r((t[2] - f[2]) * p + f[2]) +
                (f[3] < 0 && t[3] < 0 ? ")" :
                    "," + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000
                        : t[3] < 0 ? f[3] : t[3]) + ")");
        }
        else {
            // tslint:disable-next-line:max-line-length
            return "#" + (0x100000000 + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255) * 0x1000000 + r((t[0] - f[0]) * p + f[0]) * 0x10000 + r((t[1] - f[1]) * p + f[1]) * 0x100 + r((t[2] - f[2]) * p + f[2])).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
        }
    };
    VisualUtils.sbcRip = function (d, i, r) {
        var l = d.length;
        var RGB = [];
        if (l > 9) {
            var ds = d.split(",");
            RGB[0] = i(ds[0].slice(4));
            RGB[1] = i(ds[1]), RGB[2] = i(ds[2]);
            RGB[3] = ds[3] ? parseFloat(ds[3]) : -1;
        }
        else {
            if (l < 6) {
                d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + "" + d[4] : "");
            }
            var dsi = i(d.slice(1), 16);
            // tslint:disable-next-line:no-bitwise
            RGB[0] = dsi >> 16 & 255;
            // tslint:disable-next-line:no-bitwise
            RGB[1] = dsi >> 8 & 255, RGB[2] = dsi & 255;
            // tslint:disable-next-line:no-bitwise
            RGB[3] = l === 9 || l === 5 ? r(((dsi >> 24 & 255) / 255) * 10000) / 10000 : -1;
        }
        return RGB;
    };
    return VisualUtils;
}());



/***/ }),

/***/ "./src/UI.ts":
/*!*******************!*\
  !*** ./src/UI.ts ***!
  \*******************/
/*! exports provided: Point, UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
/* harmony import */ var _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
/* harmony import */ var _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rendering/ImageAsset */ "./src/Rendering/ImageAsset.ts");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Globals */ "./src/Globals.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());

var UI = /** @class */ (function () {
    function UI(map, player) {
        var container = document.getElementById("container");
        if (container === null) {
            throw ("Container element could not be found");
        }
        var rendererOptions = new _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__["RendererOptions"]();
        rendererOptions.canvasId = "uiScreen";
        this.renderer = new _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__["Renderer"](container, rendererOptions);
        this.map = map;
        this.player = player;
        this.minimapOffset = {
            x: 40,
            y: 40
        };
        this.minimapScale = 4;
        _Globals__WEBPACK_IMPORTED_MODULE_2__["GLOBAL_ASSETS"].push(new _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_1__["ImageAsset"]("gun_sprite", "./sprites/shotgun.png"));
    }
    UI.prototype.drawMiniMap = function (middleCorrdinates, units) {
        this.renderer.setFillStyle("white");
        var _loop_1 = function (nx) {
            var _loop_2 = function (ny) {
                if (this_1.map.surface[ny * this_1.map.mapWidth + nx] === "#") {
                    this_1.renderer.renderRect((nx * this_1.minimapScale) + this_1.minimapOffset.x, (ny * this_1.minimapScale) + this_1.minimapOffset.y, this_1.minimapScale, this_1.minimapScale);
                }
                if (units.filter(function (u) { return u.x === nx && u.y === ny; }).length > 0) {
                    this_1.renderer.setFillStyle("yellow");
                    this_1.renderer.renderRect((nx * this_1.minimapScale) + this_1.minimapOffset.x, (ny * this_1.minimapScale) + this_1.minimapOffset.y, this_1.minimapScale, this_1.minimapScale);
                    this_1.renderer.setFillStyle("white");
                }
            };
            for (var ny = 0; ny < this_1.map.mapHeight; ny++) {
                _loop_2(ny);
            }
        };
        var this_1 = this;
        for (var nx = 0; nx < this.map.mapWidth; nx++) {
            _loop_1(nx);
        }
        this.renderer.setFillStyle("red");
        this.renderer.renderRect((this.player.posX * this.minimapScale) + this.minimapOffset.x, (this.player.posY * this.minimapScale) + this.minimapOffset.y, 2, 2);
        this.renderer.renderLine([
            {
                x: (this.player.posX * this.minimapScale) + this.minimapOffset.x,
                y: (this.player.posY * this.minimapScale) + this.minimapOffset.y
            },
            {
                x: Math.floor(this.player.posX + middleCorrdinates.x * 5) * this.minimapScale + this.minimapOffset.x,
                y: Math.floor(this.player.posY + middleCorrdinates.y * 5) * this.minimapScale + this.minimapOffset.y,
            }
        ], "red");
        this.renderer.setFillStyle("black");
    };
    UI.prototype.drawUI = function (middleCorrdinates, units) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.renderer.clearAll();
                this.drawMiniMap(middleCorrdinates, units);
                this.renderer.setFillStyle("white");
                this.renderer.renderRect(this.renderer.getWidth() / 2 - 15, this.renderer.getHeight() / 2 - 2, 30, 4);
                this.renderer.renderRect(this.renderer.getWidth() / 2 - 2, this.renderer.getHeight() / 2 - 15, 4, 30);
                return [2 /*return*/];
            });
        });
    };
    return UI;
}());



/***/ }),

/***/ "./src/Unit.ts":
/*!*********************!*\
  !*** ./src/Unit.ts ***!
  \*********************/
/*! exports provided: Unit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unit", function() { return Unit; });
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Globals */ "./src/Globals.ts");

var Unit = /** @class */ (function () {
    function Unit(x, y, vx, vy, asset) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.remove = false;
        if (typeof asset !== "undefined" && asset !== null) {
            this.asset = Object(_Globals__WEBPACK_IMPORTED_MODULE_0__["GetAsset"])(asset);
        }
    }
    return Unit;
}());



/***/ }),

/***/ "./src/Utils/Stats.ts":
/*!****************************!*\
  !*** ./src/Utils/Stats.ts ***!
  \****************************/
/*! exports provided: Stats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stats", function() { return Stats; });
/**
 * @author mrdoob / http://mrdoob.com/
 */
var Stats = /** @class */ (function () {
    function Stats() {
        var _this = this;
        this.revision = 16;
        this.mode = 0;
        this.container = document.createElement("div");
        this.container.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
        this.container.addEventListener("click", function (event) {
            event.preventDefault();
            _this.showPanel(++_this.mode % _this.container.children.length);
        }, false);
        this.beginTime = (performance || Date).now();
        this.prevTime = this.beginTime;
        this.frames = 0;
        this.fpsPanel = this.addPanel(new Panel("FPS", "#0ff", "#002"));
        this.msPanel = this.addPanel(new Panel("MS", "#0f0", "#020"));
        this.showPanel(0);
    }
    Stats.prototype.addPanel = function (panel) {
        this.container.appendChild(panel.canvas);
        return panel;
    };
    Stats.prototype.showPanel = function (id) {
        for (var i = 0; i < this.container.children.length; i++) {
            var element = this.container.children[i];
            element.style.display = i === id ? "block" : "none";
        }
        this.mode = id;
    };
    Stats.prototype.begin = function () {
        this.beginTime = (performance || Date).now();
    };
    Stats.prototype.end = function () {
        this.frames++;
        var time = (performance || Date).now();
        this.msPanel.update(time - this.beginTime, 200);
        if (time >= this.prevTime + 1000) {
            this.fpsPanel.update((this.frames * 1000) / (time - this.prevTime), 100);
            this.prevTime = time;
            this.frames = 0;
        }
        return time;
    };
    Stats.prototype.update = function () {
        this.beginTime = this.end();
    };
    return Stats;
}());

var Panel = /** @class */ (function () {
    function Panel(name, fg, bg) {
        this.min = Infinity;
        this.max = 0;
        this.fg = fg;
        this.bg = bg;
        this.name = name;
        this.PR = Math.round(window.devicePixelRatio || 1);
        this.WIDTH = 80 * this.PR;
        this.HEIGHT = 48 * this.PR;
        this.TEXT_X = 3 * this.PR;
        this.TEXT_Y = 2 * this.PR;
        this.GRAPH_X = 3 * this.PR;
        this.GRAPH_Y = 15 * this.PR;
        this.GRAPH_WIDTH = 74 * this.PR;
        this.GRAPH_HEIGHT = 30 * this.PR;
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.canvas.style.cssText = "width:80px;height:48px";
        this.context = this.canvas.getContext("2d");
        if (this.context !== null) {
            this.context.font = "bold " + (9 * this.PR) + "px Helvetica,Arial,sans-serif";
            this.context.textBaseline = "top";
            this.context.fillStyle = bg;
            this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
            this.context.fillStyle = fg;
            this.context.fillText(name, this.TEXT_X, this.TEXT_Y);
            this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
            this.context.fillStyle = bg;
            this.context.globalAlpha = 0.9;
            this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
        }
    }
    Panel.prototype.update = function (value, maxValue) {
        if (this.context === null) {
            return;
        }
        this.min = Math.min(this.min, value);
        this.max = Math.max(this.max, value);
        this.context.fillStyle = this.bg;
        this.context.globalAlpha = 1;
        this.context.fillRect(0, 0, this.WIDTH, this.GRAPH_Y);
        this.context.fillStyle = this.fg;
        this.context.fillText(Math.round(value) + " " + this.name + " (" + Math.round(this.min) + "-" + Math.round(this.max) + ")", this.TEXT_X, this.TEXT_Y);
        this.context.drawImage(this.canvas, this.GRAPH_X + this.PR, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT, this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT);
        this.context.fillRect(this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, this.GRAPH_HEIGHT);
        this.context.fillStyle = this.bg;
        this.context.globalAlpha = 0.9;
        this.context.fillRect(this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, Math.round((1 - (value / maxValue)) * this.GRAPH_HEIGHT));
    };
    return Panel;
}());


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: map1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map1", function() { return map1; });
var map1 = {
    mapHeight: 32,
    mapWidth: 32,
    surface: ""
};
map1.surface = "#########.......#########.......";
map1.surface += "#...............#...............";
map1.surface += "#.......#########.......########";
map1.surface += "#..............##..............#";
map1.surface += "#......##......##......##......#";
map1.surface += "#......##..............##......#";
map1.surface += "#..............##..............#";
map1.surface += "###............####............#";
map1.surface += "##.............###.............#";
map1.surface += "#............####............###";
map1.surface += "#..............................#";
map1.surface += "#..............##..............#";
map1.surface += "#..............##..............#";
map1.surface += "#...........#####...........####";
map1.surface += "#..............................#";
map1.surface += "###..####....########....#######";
map1.surface += "####.####.......######..........";
map1.surface += "#...............#...............";
map1.surface += "#.......#########.......##..####";
map1.surface += "#..............##..............#";
map1.surface += "#......##......##.......#......#";
map1.surface += "#......##......##......##......#";
map1.surface += "#..............##..............#";
map1.surface += "###............####............#";
map1.surface += "##.............###.............#";
map1.surface += "#............####............###";
map1.surface += "#..............................#";
map1.surface += "#..............................#";
map1.surface += "#..............##..............#";
map1.surface += "#...........##..............####";
map1.surface += "#..............##..............#";
map1.surface += "################################";


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! exports provided: GameMap, Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameMap", function() { return GameMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controls */ "./src/Controls.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.ts");
/* harmony import */ var _Utils_Stats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/Stats */ "./src/Utils/Stats.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Rendering/ImageAsset */ "./src/Rendering/ImageAsset.ts");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Globals */ "./src/Globals.ts");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Unit */ "./src/Unit.ts");
/* harmony import */ var _Rendering_UnicodeAsset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Rendering/UnicodeAsset */ "./src/Rendering/UnicodeAsset.ts");
/* harmony import */ var _FileLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FileLoader */ "./src/FileLoader.ts");
/* harmony import */ var _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
/* harmony import */ var _Not3D__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Not3D */ "./src/Not3D.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











var GameMap = /** @class */ (function () {
    function GameMap() {
    }
    return GameMap;
}());

var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());

var Game = /** @class */ (function () {
    function Game() {
        this.stats = new _Utils_Stats__WEBPACK_IMPORTED_MODULE_2__["Stats"]();
        var container = document.getElementById("container");
        if (container == null) {
            throw ("Container element not found!");
        }
        this.engine = new _Not3D__WEBPACK_IMPORTED_MODULE_10__["Not3D"](container, new _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_9__["RendererOptions"](), this.stats);
        // benchmark script
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.container);
        this.renderer = this.engine.renderer;
        this.fFOV = Math.PI / 4.0; // field of View
        this.fSpeed = 2;
        this.fDepth = 25; // maximum rendering distance
        this.screenWidth = this.renderer.getWidth();
        this.screenHeight = this.renderer.getHeight();
        this.fDepthBuffer = [];
        this.player = {
            posX: 7.183800517628895,
            posY: 9.920172052706125,
            angle: 0.5000000000000023,
            yAngle: 0
        };
        this.map = _config__WEBPACK_IMPORTED_MODULE_3__["map1"];
        this.ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["UI"](this.map, this.player);
        this.middleCorrdinates = new _UI__WEBPACK_IMPORTED_MODULE_1__["Point"];
        this.init();
    }
    Game.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lampText, rocketText;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(new _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_4__["ImageAsset"]("wall_sprite", "./sprites/wall3.bmp"));
                        this.units = [];
                        return [4 /*yield*/, _FileLoader__WEBPACK_IMPORTED_MODULE_8__["FileLoader"].loadJSON("../assets/objects/lamp.json")];
                    case 1:
                        lampText = _a.sent();
                        _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(new _Rendering_UnicodeAsset__WEBPACK_IMPORTED_MODULE_7__["UnicodeAsset"]("lamp_cm", JSON.parse(lampText), 0.5));
                        this.units.push(new _Unit__WEBPACK_IMPORTED_MODULE_6__["Unit"](11, 14, 0, 0, "lamp_cm"));
                        return [4 /*yield*/, _FileLoader__WEBPACK_IMPORTED_MODULE_8__["FileLoader"].loadJSON("../assets/objects/rocket.json")];
                    case 2:
                        rocketText = _a.sent();
                        _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(new _Rendering_UnicodeAsset__WEBPACK_IMPORTED_MODULE_7__["UnicodeAsset"]("rocket", JSON.parse(rocketText), 0.5));
                        this.engine.setLoop(function () { _this.move(); });
                        this.engine.start(function () {
                            _this.createControls();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.move = function () {
        this.renderer.yAngle = this.player.yAngle;
        this.renderer.renderGlobals();
        this.renderer.beginOffScreen();
        this.mainScreen(0, this.screenWidth);
        this.handleObjects();
        this.renderer.endOffScreen();
        this.ui.drawUI(this.middleCorrdinates, this.units);
    };
    Game.prototype.mainScreen = function (from, to) {
        var fRayAngle = 0;
        var stepSize = 0;
        var distanceToWall = 0;
        var bHitWall = false;
        var eyeX = 0;
        var eyeY = 0;
        var nTestX = 0;
        var nTestY = 0;
        for (var i = from; i < to; i++) {
            fRayAngle = (this.player.angle - this.fFOV / 2.0) + (i / this.screenWidth) * this.fFOV;
            stepSize = 0.05;
            distanceToWall = 0.0;
            bHitWall = false; // set when ray hits wall block
            eyeX = Math.sin(fRayAngle); // unit vector for ray in player space
            eyeY = Math.cos(fRayAngle);
            if (i === to / 2) {
                this.middleCorrdinates = { x: eyeX, y: eyeY };
            }
            var fSampleX = 0.0;
            // incrementally cast ray from player, along ray angle, testing for
            // intersection with a block
            while (!bHitWall && distanceToWall < this.fDepth) {
                distanceToWall += stepSize;
                nTestX = Math.floor(this.player.posX + eyeX * distanceToWall);
                nTestY = Math.floor(this.player.posY + eyeY * distanceToWall);
                // test if ray is out of bounds
                if (nTestX < 0 || nTestX >= this.map.mapWidth || nTestY < 0 || nTestY >= this.map.mapHeight) {
                    bHitWall = true; // just set distance to maximum depth
                    distanceToWall = this.fDepth;
                }
                else {
                    // ray is inbounds so test to see if the ray cell is a wall block
                    if (this.map.surface[Math.round(nTestX * this.map.mapWidth + nTestY)] === "#") {
                        // ray has hit wall
                        bHitWall = true;
                        // determine where ray has hit wall. Break Block boundary
                        // int 4 line segments
                        var fBlockMidX = nTestX + 0.5;
                        var fBlockMidY = nTestY + 0.5;
                        var fTestPointX = this.player.posX + eyeX * distanceToWall;
                        var fTestPointY = this.player.posY + eyeY * distanceToWall;
                        var fTestAngle = Math.atan2((fTestPointY - fBlockMidY), (fTestPointX - fBlockMidX));
                        if (fTestAngle >= -3.14159 * 0.25 && fTestAngle < 3.14159 * 0.25) {
                            fSampleX = fTestPointY - nTestY;
                        }
                        if (fTestAngle >= 3.14159 * 0.25 && fTestAngle < 3.14159 * 0.75) {
                            fSampleX = fTestPointX - nTestX;
                        }
                        if (fTestAngle < -3.14159 * 0.25 && fTestAngle >= -3.14159 * 0.75) {
                            fSampleX = fTestPointX - nTestX;
                        }
                        if (fTestAngle >= 3.14159 * 0.75 || fTestAngle < -3.14159 * 0.75) {
                            fSampleX = fTestPointY - nTestY;
                        }
                    }
                }
            }
            fSampleX *= 100;
            fSampleX = Math.floor(fSampleX / (100 / 288));
            // calculate distance to ceiling and floor
            this.nCeiling = (this.screenHeight / 2.0) - (this.screenHeight / distanceToWall);
            this.nFloor = this.screenHeight - this.nCeiling;
            // shader walls based on distance
            var shadeLevel = parseFloat((distanceToWall * 0.1).toFixed(2));
            this.fDepthBuffer[i] = distanceToWall;
            var heightToDraw = 0;
            var firstY = -1;
            for (var y = 0; y < this.screenHeight; y++) {
                // each Row
                if (y <= this.nCeiling) { // roof
                }
                else if (y > this.nCeiling && y <= this.nFloor) {
                    heightToDraw += 1;
                    firstY = firstY === -1 ? y : firstY;
                }
            }
            this.renderer.renderImage({
                X: fSampleX, Y: 0,
                W: 1, H: 288,
                i: "wall_sprite"
            }, i, firstY, 1, heightToDraw, {
                shadeLevel: shadeLevel
            });
        }
    };
    Game.prototype.handleObjects = function () {
        for (var i = 0; i < this.units.length; i++) {
            var object = this.units[i];
            // update Object Physics
            object.x += object.vx * 0.5;
            object.y += object.vy * 0.5;
            // check if object is inside wall - set flag for removal
            if (this.map.surface[object.x * this.map.mapWidth + object.y] === "#") {
                object.remove = true;
            }
            // can object be seen?
            var fVecX = (object.x) - this.player.posX;
            var fVecY = (object.y) - this.player.posY;
            var fDistanceFromPlayer = Math.hypot(fVecX, fVecY);
            var fEyeX = Math.sin(this.player.angle);
            var fEyeY = Math.cos(this.player.angle);
            // calculate angle between lamp and players feet, and players looking direction
            // to determine if the lamp is in the players field of view
            var fObjectAngle = Math.atan2(fEyeY, fEyeX) - Math.atan2(fVecY, fVecX);
            if (fObjectAngle < -Math.PI) {
                fObjectAngle += 2.0 * Math.PI;
            }
            if (fObjectAngle > Math.PI) {
                fObjectAngle -= 2.0 * Math.PI;
            }
            var bInPlayerFOV = Math.abs(fObjectAngle) < (this.fFOV) / 2;
            var shadeLevel = (fDistanceFromPlayer * 0.1).toFixed(2);
            if (bInPlayerFOV && fDistanceFromPlayer >= 0.5 && fDistanceFromPlayer < this.fDepth && !object.remove) {
                // tODO: Fix this
                var fObjectCeiling = (this.screenHeight / 2.0) - this.screenHeight / (fDistanceFromPlayer);
                var fObjectFloor = this.screenHeight - fObjectCeiling;
                var fObjectHeight = fObjectFloor - fObjectCeiling;
                var fObjectAspectRatio = object.asset.getHeight() / object.asset.getWidth();
                var fObjectWidth = fObjectHeight / fObjectAspectRatio;
                var fMiddleOfObject = (0.5 * (fObjectAngle / (this.fFOV / 2.0)) + 0.5) * this.screenWidth;
                this.renderer.renderUnicodeAsset(object.asset, // the asset
                fMiddleOfObject - (fObjectWidth / 2.0), fObjectCeiling, // x and Y coordinates
                fObjectWidth, fObjectHeight, // dimentions
                fMiddleOfObject, // middle of the object
                fDistanceFromPlayer, // distance between player and object
                this.fDepthBuffer, // the depth buffer
                parseFloat(shadeLevel)); // the shade level
            }
        }
    };
    Game.prototype.createControls = function () {
        var _this = this;
        this.controls = new _Controls__WEBPACK_IMPORTED_MODULE_0__["Controls"]({
            pointerLock: true,
            canvas: this.renderer.canvas,
            pointerCallback: function (e) {
                _this.updatePosition(e);
            }
        });
        // up arrow OR "W" key
        this.controls.bindKeys(["38", "87"], function () {
            _this.player.posX += _this.calcNextPlayerPositionX();
            _this.player.posY += _this.calcNextPlayerPositionY();
            if (_this.checkForWall()) {
                _this.player.posX -= _this.calcNextPlayerPositionX();
                _this.player.posY -= _this.calcNextPlayerPositionY();
            }
        });
        // down arrow OR "S" key
        this.controls.bindKeys(["40", "83"], function () {
            _this.player.posX -= _this.calcNextPlayerPositionX();
            _this.player.posY -= _this.calcNextPlayerPositionY();
            if (_this.checkForWall()) {
                _this.player.posX += _this.calcNextPlayerPositionX();
                _this.player.posY += _this.calcNextPlayerPositionY();
            }
        });
        // left arrow OR "D" key
        this.controls.bindKeys(["37", "65"], function () {
            _this.player.posX += _this.calcNextPlayerPositionX();
            _this.player.posY -= _this.calcNextPlayerPositionY();
            if (_this.checkForWall()) {
                _this.player.posX -= _this.calcNextPlayerPositionX();
                _this.player.posY += _this.calcNextPlayerPositionY();
            }
        });
        // right arrow OR "A" key
        this.controls.bindKeys(["39", "68"], function () {
            _this.player.posX -= _this.calcNextPlayerPositionX();
            _this.player.posY += _this.calcNextPlayerPositionY();
            if (_this.checkForWall()) {
                _this.player.posX += _this.calcNextPlayerPositionX();
                _this.player.posY -= _this.calcNextPlayerPositionY();
            }
        });
        this.controls.bindMousedown(function () {
            var vx = Math.sin(_this.player.angle) * 0.8;
            var vy = Math.cos(_this.player.angle) * 0.8;
            _this.units.push(new _Unit__WEBPACK_IMPORTED_MODULE_6__["Unit"](_this.player.posX, _this.player.posX, vx, vy, "rocket"));
        });
    };
    Game.prototype.calcNextPlayerPositionX = function () {
        return Math.sin(this.player.angle) * this.fSpeed * 0.1;
    };
    Game.prototype.calcNextPlayerPositionY = function () {
        return Math.cos(this.player.angle) * this.fSpeed * 0.1;
    };
    Game.prototype.checkForWall = function () {
        return this.map.surface[Math.floor(this.player.posX) * this.map.mapWidth + Math.floor(this.player.posY)] === "#";
    };
    Game.prototype.updatePosition = function (e) {
        if (e.movementX > 0) {
            this.player.angle += (e.movementX) * 0.005;
        }
        if (e.movementX < 0) {
            this.player.angle += (e.movementX) * 0.005;
        }
        if (e.movementY > 0) {
            this.player.yAngle += (e.movementY) * 1;
        }
        if (e.movementY < 0) {
            this.player.yAngle += (e.movementY) * 1;
        }
    };
    return Game;
}());
// (() =>  {
//     window.onload = () => {
// tslint:disable-next-line:no-unused-expression
new Game();
//     };
// })();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fzc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9Db250cm9scy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2xvYmFscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90M0QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9JbWFnZUFzc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9Vbmljb2RlQXNzZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9WaXN1YWxVdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVUkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VuaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzL1N0YXRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7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R0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDekIsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUs7d0JBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSCwyQ0FBMkM7WUFDM0MsT0FBTyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4VTtJQUNMLENBQUM7SUFFTSxrQkFBTSxHQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVcsRUFBRSxDQUFXO1FBQzdDLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNQLElBQUksRUFBRSxHQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7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QUFFLEtBQUssQ0FBRSxDQUFDO1FBRXRDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBRSxLQUFLLENBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUV4SSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDaEcsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFFLENBQUM7UUFFN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBQztRQUU3RyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBRSxDQUFDLEdBQUcsQ0FBRSxLQUFLLEdBQUcsUUFBUSxDQUFFLENBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFFLENBQUUsQ0FBQztJQUVySSxDQUFDO0lBQ0YsWUFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6S0Q7QUFBQTtBQUFPLElBQU0sSUFBSSxHQUFhO0lBQzFCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsUUFBUSxFQUFFLEVBQUU7SUFDWixPQUFPLEVBQUUsRUFBRTtDQUNkLENBQUM7QUFFRixJQUFJLENBQUMsT0FBTyxHQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7Ozs7Ozs7Ozs7Ozs7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LEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUN2SCxDQUFDO0lBRUQsNkJBQWMsR0FBZCxVQUFlLENBQVk7UUFDdkIsSUFBRyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFDRCxJQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMvQztRQUNELElBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBRyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUM7QUFFRCxZQUFZO0FBQ1osOEJBQThCO0FBQ3RCLGdEQUFnRDtBQUNoRCxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ25CLFNBQVM7QUFDVCxRQUFRIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCJleHBvcnQgY2xhc3MgQXNzZXQge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbG9hZGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb250cm9sT3B0aW9ucyB7XHJcbiAgICBwb2ludGVyTG9jazogYm9vbGVhbjtcclxuICAgIHBvaW50ZXJDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBjYW52YXM6IEhUTUxFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbHMge1xyXG4gICAga2V5c0JpbmRpbmdzOiBGdW5jdGlvbltdO1xyXG4gICAgbW91c2Vkb3duQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgdXNlTW91c2U6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ29udHJvbE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmtleXNCaW5kaW5ncyA9IFtdO1xyXG5cclxuICAgICAgICBpZighIW9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9pbnRlckxvY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5jYW52YXMgfHwgIW9wdGlvbnMucG9pbnRlckNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJJbiBvcmRlciB0byB1dGlsaXplIHBvaW50ZXIgbG9jaywgcHJvdmlkZSBjYW52YXMgYW5kIGNhbGxiYWNrIGluIHRoZSBvcHRpb25zIVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VNb3VzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kUG9pbnRlcihvcHRpb25zLmNhbnZhcyBhcyBIVE1MQ2FudmFzRWxlbWVudCwgb3B0aW9ucy5wb2ludGVyQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5cyhrZXlzOiBzdHJpbmdbXSwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzQmluZGluZ3Nba2V5c1tpXV0gPSBjYWxsYmFjaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEtleShrZXk6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5rZXlzQmluZGluZ3Nba2V5XSA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNb3VzZWRvd24oY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb3VzZWRvd25DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAgICAgaWYodGhpcy5rZXlzQmluZGluZ3MuaGFzT3duUHJvcGVydHkoZS5rZXlDb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlzQmluZGluZ3NbZS5rZXlDb2RlXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdXNlZG93bkNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2Vkb3duQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBiaW5kUG9pbnRlcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBwb2ludGVyQ2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgY2FudmFzW1wicmVxdWVzdFBvaW50ZXJMb2NrXCJdID0gY2FudmFzW1wicmVxdWVzdFBvaW50ZXJMb2NrXCJdIHx8IGNhbnZhc1tcIm1velJlcXVlc3RQb2ludGVyTG9ja1wiXTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRbXCJleGl0UG9pbnRlckxvY2tcIl0gPSBkb2N1bWVudFtcImV4aXRQb2ludGVyTG9ja1wiXSB8fCBkb2N1bWVudFtcIm1vekV4aXRQb2ludGVyTG9ja1wiXTtcclxuXHJcbiAgICAgICAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlTW91c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYW52YXNbXCJyZXF1ZXN0UG9pbnRlckxvY2tcIl0oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybG9ja2NoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tDaGFuZ2UoY2FudmFzLCBwb2ludGVyQ2FsbGJhY2spO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96cG9pbnRlcmxvY2tjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2NrQ2hhbmdlKGNhbnZhcywgcG9pbnRlckNhbGxiYWNrKTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9ja0NoYW5nZShjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBwb2ludGVyQ2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50W1wicG9pbnRlckxvY2tFbGVtZW50XCJdID09PSBjYW52YXMgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnRbXCJtb3pQb2ludGVyTG9ja0VsZW1lbnRcIl0gPT09IGNhbnZhcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyBsb2NrZWRcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnVzZU1vdXNlKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgcG9pbnRlckNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgcG9pbnRlciBsb2NrIHN0YXR1cyBpcyBub3cgdW5sb2NrZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXNlTW91c2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgRmlsZUxvYWRlciB7XHJcbiAgICBzdGF0aWMgYXN5bmMgbG9hZEpTT04oZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgbGV0IHJlczogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChmaWxlTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlcy50ZXh0KCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuL0Fzc2V0XCI7XHJcblxyXG5leHBvcnQgbGV0IEdMT0JBTF9BU1NFVFM6IEFzc2V0W10gPSBbXTtcclxuXHJcbmV4cG9ydCBsZXQgR2V0QXNzZXQ6IEZ1bmN0aW9uID0gKG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgbGV0IHJlc3VsdDogQXNzZXRbXSA9IEdMT0JBTF9BU1NFVFMuZmlsdGVyKChhc3NldCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhc3NldC5uYW1lID09PSBuYW1lO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXJlc3VsdCB8fCByZXN1bHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0WzBdO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBBcmVBbGxBc3NldHNMb2FkZWQ6IEZ1bmN0aW9uID0gKG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIEdMT0JBTF9BU1NFVFMuZmlsdGVyKChhc3NldCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhc3NldC5pc0NvbXBsZXRlKCk7XHJcbiAgICB9KS5sZW5ndGggPT09IEdMT0JBTF9BU1NFVFMubGVuZ3RoO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBSZW5kZXJlciwgUmVuZGVyZXJPcHRpb25zIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IEFyZUFsbEFzc2V0c0xvYWRlZCB9IGZyb20gXCIuL0dsb2JhbHNcIjtcclxuaW1wb3J0IHsgU3RhdHMgfSBmcm9tIFwiLi9VdGlscy9TdGF0c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdDNEIHtcclxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICAgIHN0YXRzOiBTdGF0cztcclxuICAgIGxvb3BDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQsIHJlbmRlck9wdGlvbnM6IFJlbmRlcmVyT3B0aW9ucywgc3RhdHM6IFN0YXRzKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IHN0YXRzO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIocGFyZW50RWxlbWVudCwgcmVuZGVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9vcChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvb3BDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5Mb29wKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdHMpIHsgdGhpcy5zdGF0cy5iZWdpbigpOyB9XHJcbiAgICAgICAgdGhpcy5sb29wQ2FsbGJhY2soKTtcclxuICAgICAgICBpZih0aGlzLnN0YXRzKSB7IHRoaXMuc3RhdHMuZW5kKCk7IH1cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLm1haW5Mb29wKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmKEFyZUFsbEFzc2V0c0xvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmKCEhY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkxvb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4uL0Fzc2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VBc3NldCBleHRlbmRzIEFzc2V0IHtcclxuICAgIGltYWdlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHNyYztcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdGhpcy5pbWFnZS5jb21wbGV0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuLy4uL1VJXCI7XHJcbmltcG9ydCB7IFZpc3VhbFV0aWxzIH0gZnJvbSBcIi4vVmlzdWFsVXRpbHNcIjtcclxuaW1wb3J0IHsgR2V0QXNzZXQgfSBmcm9tIFwiLi4vR2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBVbmljb2RlQXNzZXQgfSBmcm9tIFwiLi9Vbmljb2RlQXNzZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlck9wdGlvbnMge1xyXG4gICAgcmVzRGVjcmVhc2U6IG51bWJlciA9IDE7XHJcbiAgICBjYW52YXNJZDogc3RyaW5nID0gXCJtYWluU2NyZWVuXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEcmF3T3B0aW9ucyB7XHJcbiAgICBzaGFkZUxldmVsOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XHJcbiAgICBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIG9wdGlvbnM6IFJlbmRlcmVyT3B0aW9ucztcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xyXG4gICAgbkNlaWxpbmc6IG51bWJlcjtcclxuICAgIG5GbG9vcjogbnVtYmVyO1xyXG4gICAgb2ZmU2NyZWVuOiBib29sZWFuO1xyXG4gICAgeUFuZ2xlOiBudW1iZXI7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcHRpb25zOiBSZW5kZXJlck9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHRcdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLnRvU3RyaW5nKCkpO1xyXG5cdFx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodC50b1N0cmluZygpKTtcclxuXHRcdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcImlkXCIsICB0aGlzLm9wdGlvbnMuY2FudmFzSWQpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm5DZWlsaW5nID0gMDtcclxuICAgICAgICB0aGlzLm5GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5vZmZTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnlBbmdsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLm9wdGlvbnMucmVzRGVjcmVhc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMub3B0aW9ucy5yZXNEZWNyZWFzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWxsU3R5bGUoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJHbG9iYWxzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1pZGRsZUxpbmU6IG51bWJlciA9IHRoaXMuY2FudmFzLmhlaWdodCAvIDIgKyB0aGlzLnlBbmdsZTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2IoNDQsIDEwNywgMjU1KVwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgbGluZWFyR3JhZGllbnQxOiBDYW52YXNHcmFkaWVudCA9IHRoaXMuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCB0aGlzLmNhbnZhcy5oZWlnaHQsIDAsIG1pZGRsZUxpbmUpO1xyXG4gICAgICAgIGxpbmVhckdyYWRpZW50MS5hZGRDb2xvclN0b3AoMCwgXCJyZ2IoMTQ3LCA2NywgMilcIik7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgwLjY1LCBWaXN1YWxVdGlscy5zaGFkZUJsZW5kQ29udmVydCgtMC44LCBcInJnYigxNDcsIDY3LCAyKVwiKSk7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgxLCBcInJnYigwLCAwLCAwKVwiKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gbGluZWFyR3JhZGllbnQxO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCBtaWRkbGVMaW5lLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gbWlkZGxlTGluZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJJbWFnZShpbWFnZTogYW55LCBzcGFjZVg6IG51bWJlciwgc3BhY2VZOiBudW1iZXIsIHNwYWNlV2lkdGg6IG51bWJlciwgc3BhY2VIZWlnaHQ6IG51bWJlciwgb3B0aW9uczogRHJhd09wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcmVuZGVyQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5nZXRSZW5kZXJDb250ZXh0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkSW1hZ2VCZVJlbmRlcmVkKG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgR2V0QXNzZXQoaW1hZ2UuaSkuaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBpbWFnZS5YLCBpbWFnZS5ZLCBpbWFnZS5XLCBpbWFnZS5ILFxyXG4gICAgICAgICAgICAgICAgc3BhY2VYLCBzcGFjZVkgKyB0aGlzLnlBbmdsZSwgc3BhY2VXaWR0aCwgc3BhY2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc2hhZGVMZXZlbCAhPT0gMCkge1xyXG4gICAgICAgICAgICByZW5kZXJDb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgwLCAwLCAwLCBcIiArIG9wdGlvbnNbXCJzaGFkZUxldmVsXCJdICsgXCIpXCI7XHJcbiAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFJlY3Qoc3BhY2VYLCBzcGFjZVkgKyB0aGlzLnlBbmdsZSwgc3BhY2VXaWR0aCwgc3BhY2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJVbmljb2RlQXNzZXQoXHJcbiAgICAgICAgYXNzZXQ6IFVuaWNvZGVBc3NldCxcclxuICAgICAgICBzcGFjZVg6IG51bWJlcixcclxuICAgICAgICBzcGFjZVk6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgIGZNaWRkbGVPZk9iamVjdDogbnVtYmVyLFxyXG4gICAgICAgIGZEaXN0YW5jZUZyb21QbGF5ZXI6IG51bWJlcixcclxuICAgICAgICBmRGVwdGhCdWZmZXI6IG51bWJlcltdLFxyXG4gICAgICAgIHNoYWRlTGV2ZWw6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCByZW5kZXJDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLmdldFJlbmRlckNvbnRleHQoKTtcclxuICAgICAgICBmb3IgKGxldCBseTogbnVtYmVyID0gMDsgbHkgPCBhc3NldC5yb3dzOyBseSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGx4OiBudW1iZXIgPSAwOyBseCA8IGFzc2V0LmNvbHM7IGx4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9wb3J0aWFsV2lkdGg6IG51bWJlciA9IHdpZHRoIC8gYXNzZXQuY29scztcclxuICAgICAgICAgICAgICAgIGxldCBwcm9wb3J0aWFsSGVpZ2h0OiBudW1iZXIgPSBoZWlnaHQgLyBhc3NldC5yb3dzO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuT2JqZWN0Q29sdW1uOiBudW1iZXIgPSBNYXRoLnJvdW5kKGZNaWRkbGVPZk9iamVjdCArIGx4IC0gKGFzc2V0LmNvbHMgLyAyKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobk9iamVjdENvbHVtbiA+PSAwICYmIG5PYmplY3RDb2x1bW4gPCB0aGlzLmdldFdpZHRoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzZXQuZ2V0Q2hhckF0KGx5LCBseCkgIT09IFwiLlwiICYmIGZEZXB0aEJ1ZmZlcltuT2JqZWN0Q29sdW1uXSA+PSBmRGlzdGFuY2VGcm9tUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZEZXB0aEJ1ZmZlcltuT2JqZWN0Q29sdW1uXSA9IGZEaXN0YW5jZUZyb21QbGF5ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVuZGVyWDogbnVtYmVyID0gc3BhY2VYICsgKGx4ICogcHJvcG9ydGlhbFdpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlclk6IG51bWJlciA9IHNwYWNlWSArIChseSAqIHByb3BvcnRpYWxIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb250ZXh0LmZpbGxTdHlsZSA9IGFzc2V0LmdldENoYXJBdChseSwgbHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb250ZXh0LmZpbGxSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyWCwgcmVuZGVyWSArIHRoaXMueUFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcG9ydGlhbFdpZHRoLCBwcm9wb3J0aWFsSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMCwgXCIgKyBzaGFkZUxldmVsICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJYLCByZW5kZXJZICsgdGhpcy55QW5nbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wb3J0aWFsV2lkdGgsIHByb3BvcnRpYWxIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRSZW5kZXJDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2ZmU2NyZWVuID8gdGhpcy5jYW52YXNbXCJvZmZzY3JlZW5Db250ZXh0XCJdIDogdGhpcy5jb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZEltYWdlQmVSZW5kZXJlZChvcHRpb25zOiBEcmF3T3B0aW9ucyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICB8fCAodHlwZW9mIG9wdGlvbnMgIT09IFwidW5kZWZpbmVkXCIgJiYgb3B0aW9ucy5zaGFkZUxldmVsICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5zaGFkZUxldmVsIDwgMC45OSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgdywgaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckxpbmUoY29vcmRpbmF0ZXM6IFBvaW50W10sIGxpbmVDb2xvcjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oY29vcmRpbmF0ZXNbMF0ueCwgY29vcmRpbmF0ZXNbMF0ueSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKFxyXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbaV0ueCxcclxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzW2ldLnlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGxpbmVDb2xvcjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmVnaW5PZmZTY3JlZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNbXCJvZmZzY3JlZW5DYW52YXNcIl0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzW1wib2Zmc2NyZWVuQ2FudmFzXCJdLndpZHRoID0gdGhpcy5nZXRXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzW1wib2Zmc2NyZWVuQ2FudmFzXCJdLmhlaWdodCA9IHRoaXMuZ2V0V2lkdGgoKTtcclxuICAgICAgICB0aGlzLmNhbnZhc1tcIm9mZnNjcmVlbkNvbnRleHRcIl0gPSB0aGlzLmNhbnZhc1tcIm9mZnNjcmVlbkNhbnZhc1wiXS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5vZmZTY3JlZW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuZE9mZlNjcmVlbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jYW52YXNbXCJvZmZzY3JlZW5DYW52YXNcIl0sIDAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLm9mZlNjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4uL0Fzc2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVW5pY29kZUFzc2V0IGV4dGVuZHMgQXNzZXQge1xyXG4gICAgY2hhcm1hcDogc3RyaW5nW107XHJcbiAgICByb3dzOiBudW1iZXI7XHJcbiAgICBjb2xzOiBudW1iZXI7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY2hhcm1hcDogc3RyaW5nW10sIHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLmNoYXJtYXAgPSBjaGFybWFwO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJvd3MgPSB0aGlzLmNoYXJtYXAubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuY29scyA9IHRoaXMuY2hhcm1hcFswXS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlIHx8IDEwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJBdChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJtYXBbcm93XVtjb2xdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJBdChyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIGNoYXI6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hhcm1hcFtyb3ddID0gdGhpcy5jaGFybWFwW3Jvd10uc3Vic3RyKDAsIGNvbCkgKyBjaGFyICsgdGhpcy5jaGFybWFwW3Jvd10uc3Vic3RyKGNvbCArIGNoYXIubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3dzICogdGhpcy5zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbHMgKiB0aGlzLnNjYWxlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZpc3VhbFV0aWxzIHtcclxuICAgIHN0YXRpYyBzaGFkZUJsZW5kQ29udmVydChwOiBudW1iZXIsIGZyb206IHN0cmluZywgdG8/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpOiBGdW5jdGlvbiA9IHBhcnNlSW50O1xyXG4gICAgICAgIGxldCByOiBGdW5jdGlvbiA9IE1hdGgucm91bmQ7XHJcbiAgICAgICAgbGV0IGg6IGJvb2xlYW4gPSBmcm9tLmxlbmd0aCA+IDk7XHJcbiAgICAgICAgaCA9IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IHRvLmxlbmd0aCA+IDkgPyB0cnVlIDogdG8gPT09IFwiY1wiID8gIWggOiBmYWxzZSA6IGg7XHJcbiAgICAgICAgbGV0IGI6IGJvb2xlYW4gPSBwIDwgMDtcclxuICAgICAgICBwID0gYiA/IHAgKiAtMSA6IHA7XHJcbiAgICAgICAgdG8gPSB0byAmJiB0byAhPT0gXCJjXCIgPyB0byA6IGIgPyBcIiMwMDAwMDBcIiA6IFwiI0ZGRkZGRlwiO1xyXG4gICAgICAgIGxldCBmOiBudW1iZXJbXSA9IFZpc3VhbFV0aWxzLnNiY1JpcChmcm9tLCBpLCByKTtcclxuICAgICAgICBsZXQgdDogbnVtYmVyW10gPSBWaXN1YWxVdGlscy5zYmNSaXAodG8sIGksIHIpO1xyXG5cclxuICAgICAgICBpZiAoaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJyZ2IoXCIgKyByKCh0WzBdIC0gZlswXSkgKiBwICsgZlswXSkgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiLFwiICsgcigodFsxXSAtIGZbMV0pICogcCArIGZbMV0pICtcclxuICAgICAgICAgICAgICAgICAgICBcIixcIiArIHIoKHRbMl0gLSBmWzJdKSAqIHAgKyBmWzJdKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmWzNdIDwgMCAmJiB0WzNdIDwgMCA/IFwiKVwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLFwiICsgKGZbM10gPiAtMSAmJiB0WzNdID4gLTEgPyByKCgodFszXSAtIGZbM10pICogcCArIGZbM10pICogMTAwMDApIC8gMTAwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRbM10gPCAwID8gZlszXSA6IHRbM10pICsgXCIpXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgcmV0dXJuIFwiI1wiICsgKDB4MTAwMDAwMDAwICsgKGZbM10gPiAtMSAmJiB0WzNdID4gLTEgPyByKCgodFszXSAtIGZbM10pICogcCArIGZbM10pICogMjU1KSA6IHRbM10gPiAtMSA/IHIodFszXSAqIDI1NSkgOiBmWzNdID4gLTEgPyByKGZbM10gKiAyNTUpIDogMjU1KSAqIDB4MTAwMDAwMCArIHIoKHRbMF0gLSBmWzBdKSAqIHAgKyBmWzBdKSAqIDB4MTAwMDAgKyByKCh0WzFdIC0gZlsxXSkgKiBwICsgZlsxXSkgKiAweDEwMCArIHIoKHRbMl0gLSBmWzJdKSAqIHAgKyBmWzJdKSkudG9TdHJpbmcoMTYpLnNsaWNlKGZbM10gPiAtMSB8fCB0WzNdID4gLTEgPyAxIDogMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzYmNSaXAoZDogc3RyaW5nLCBpOiBGdW5jdGlvbiwgcjogRnVuY3Rpb24pOiBudW1iZXJbXSB7XHJcbiAgICAgICAgdmFyIGw6IG51bWJlciA9IGQubGVuZ3RoO1xyXG4gICAgICAgIHZhciBSR0I6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgIGlmIChsID4gOSkge1xyXG4gICAgICAgICAgICB2YXIgZHM6IHN0cmluZ1tdID0gZC5zcGxpdChcIixcIik7XHJcblxyXG4gICAgICAgICAgICBSR0JbMF0gPSBpKGRzWzBdLnNsaWNlKDQpKTtcclxuICAgICAgICAgICAgUkdCWzFdID0gaShkc1sxXSksIFJHQlsyXSA9IGkoZHNbMl0pO1xyXG4gICAgICAgICAgICBSR0JbM10gPSBkc1szXSA/IHBhcnNlRmxvYXQoZHNbM10pIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChsIDwgNikge1xyXG4gICAgICAgICAgICAgICAgZCA9IFwiI1wiICsgZFsxXSArIGRbMV0gKyBkWzJdICsgZFsyXSArIGRbM10gKyBkWzNdICsgKGwgPiA0ID8gZFs0XSArIFwiXCIgKyBkWzRdIDogXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkc2k6IG51bWJlciA9IGkoZC5zbGljZSgxKSwgMTYpO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxyXG4gICAgICAgICAgICBSR0JbMF0gPSBkc2kgPj4gMTYgJiAyNTU7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXHJcbiAgICAgICAgICAgIFJHQlsxXSA9IGRzaSA+PiA4ICYgMjU1LCBSR0JbMl0gPSBkc2kgJiAyNTU7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXHJcbiAgICAgICAgICAgIFJHQlszXSA9IGwgPT09IDkgfHwgbCA9PT0gNSA/IHIoKChkc2kgPj4gMjQgJiAyNTUpIC8gMjU1KSAqIDEwMDAwKSAvIDEwMDAwIDogLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUkdCO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgR2FtZU1hcCwgUGxheWVyIH0gZnJvbSBcIi4vbWFpblwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuL1JlbmRlcmluZy9SZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcIi4vUmVuZGVyaW5nL0ltYWdlQXNzZXRcIjtcclxuaW1wb3J0IHsgR0xPQkFMX0FTU0VUUyB9IGZyb20gXCIuL0dsb2JhbHNcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXJPcHRpb25zIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVUkge1xyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gICAgbWFwOiBHYW1lTWFwO1xyXG4gICAgcGxheWVyOiBQbGF5ZXI7XHJcbiAgICBtaW5pbWFwT2Zmc2V0OiB7IHg6IG51bWJlciwgeTogbnVtYmVyfTtcclxuICAgIG1pbmltYXBTY2FsZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hcDogR2FtZU1hcCwgcGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcclxuICAgICAgICBpZiAoY29udGFpbmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93KFwiQ29udGFpbmVyIGVsZW1lbnQgY291bGQgbm90IGJlIGZvdW5kXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlbmRlcmVyT3B0aW9uczogUmVuZGVyZXJPcHRpb25zID0gbmV3IFJlbmRlcmVyT3B0aW9ucygpO1xyXG4gICAgICAgIHJlbmRlcmVyT3B0aW9ucy5jYW52YXNJZCA9IFwidWlTY3JlZW5cIjtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcihjb250YWluZXIsIHJlbmRlcmVyT3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5taW5pbWFwT2Zmc2V0ID0ge1xyXG4gICAgICAgICAgICB4OiA0MCxcclxuICAgICAgICAgICAgeTogNDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubWluaW1hcFNjYWxlID0gNDtcclxuICAgICAgICBHTE9CQUxfQVNTRVRTLnB1c2gobmV3IEltYWdlQXNzZXQoXCJndW5fc3ByaXRlXCIsIFwiLi9zcHJpdGVzL3Nob3RndW4ucG5nXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TWluaU1hcChtaWRkbGVDb3JyZGluYXRlczogUG9pbnQsIHVuaXRzOiBQb2ludFtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRGaWxsU3R5bGUoXCJ3aGl0ZVwiKTtcclxuICAgICAgICBmb3IgKGxldCBueDogbnVtYmVyID0gMDsgbnggPCB0aGlzLm1hcC5tYXBXaWR0aDsgbngrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBueTogbnVtYmVyID0gMDsgbnkgPCB0aGlzLm1hcC5tYXBIZWlnaHQ7IG55KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcC5zdXJmYWNlW255ICogdGhpcy5tYXAubWFwV2lkdGggKyBueF0gPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobnggKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG55ICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWluaW1hcFNjYWxlLCB0aGlzLm1pbmltYXBTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih1bml0cy5maWx0ZXIoKHUpID0+IHUueCA9PT0gbnggJiYgdS55ID09PSBueSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RmlsbFN0eWxlKFwieWVsbG93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUmVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG54ICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChueSAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbmltYXBTY2FsZSwgdGhpcy5taW5pbWFwU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RmlsbFN0eWxlKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRGaWxsU3R5bGUoXCJyZWRcIik7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KFxyXG4gICAgICAgICAgICAodGhpcy5wbGF5ZXIucG9zWCAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC54LFxyXG4gICAgICAgICAgICAodGhpcy5wbGF5ZXIucG9zWSAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC55LFxyXG4gICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAyKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJMaW5lKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogKHRoaXMucGxheWVyLnBvc1ggKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgIHk6ICh0aGlzLnBsYXllci5wb3NZICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LnlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NYICsgbWlkZGxlQ29ycmRpbmF0ZXMueCAqIDUpICogdGhpcy5taW5pbWFwU2NhbGUgKyB0aGlzLm1pbmltYXBPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IodGhpcy5wbGF5ZXIucG9zWSArIG1pZGRsZUNvcnJkaW5hdGVzLnkgKiA1KSAqIHRoaXMubWluaW1hcFNjYWxlICsgdGhpcy5taW5pbWFwT2Zmc2V0LnksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLCBcInJlZFwiKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZShcImJsYWNrXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRyYXdVSShtaWRkbGVDb3JyZGluYXRlczogUG9pbnQsIHVuaXRzOiBQb2ludFtdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5jbGVhckFsbCgpO1xyXG4gICAgICAgIHRoaXMuZHJhd01pbmlNYXAobWlkZGxlQ29ycmRpbmF0ZXMsIHVuaXRzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZShcIndoaXRlXCIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUmVjdCh0aGlzLnJlbmRlcmVyLmdldFdpZHRoKCkgLyAyIC0gMTUsIHRoaXMucmVuZGVyZXIuZ2V0SGVpZ2h0KCkgLyAyIC0gMiwgMzAsIDQpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUmVjdCh0aGlzLnJlbmRlcmVyLmdldFdpZHRoKCkgLyAyIC0gMiwgdGhpcy5yZW5kZXJlci5nZXRIZWlnaHQoKSAvIDIgLSAxNSwgNCwgMzApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgR2V0QXNzZXQgfSBmcm9tIFwiLi9HbG9iYWxzXCI7XHJcbmltcG9ydCB7IFVuaWNvZGVBc3NldCB9IGZyb20gXCIuL1JlbmRlcmluZy9Vbmljb2RlQXNzZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbml0IHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG5cdHZ4OiBudW1iZXI7XHJcblx0dnk6IG51bWJlcjtcclxuXHRyZW1vdmU6IGJvb2xlYW47XHJcblx0YXNzZXQ6IFVuaWNvZGVBc3NldDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgdng6IG51bWJlciwgdnk6IG51bWJlciwgYXNzZXQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cdFx0dGhpcy52eCA9IHZ4O1xyXG5cdFx0dGhpcy52eSA9IHZ5O1xyXG5cdFx0dGhpcy5yZW1vdmUgPSBmYWxzZTtcclxuXHRcdGlmKHR5cGVvZiBhc3NldCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhc3NldCAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLmFzc2V0ID0gR2V0QXNzZXQoYXNzZXQpO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsIi8qKlxyXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0cyB7XHJcblx0Y29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHRtb2RlOiBudW1iZXI7XHJcblx0cmV2aXNpb246IG51bWJlciA9IDE2O1xyXG5cdGJlZ2luVGltZTogbnVtYmVyO1xyXG5cdGZyYW1lczogbnVtYmVyO1xyXG5cdGZwc1BhbmVsOiBQYW5lbDtcclxuXHRtc1BhbmVsOiBQYW5lbDtcclxuXHRtZW1QYW5lbDogUGFuZWw7XHJcblx0cHJldlRpbWU6IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZGUgPSAwO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwXCI7XHJcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBFdmVudCkgPT4gIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5zaG93UGFuZWwoKyt0aGlzLm1vZGUgJSB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGgpO1xyXG5cdFx0fSwgZmFsc2UgKTtcclxuXHJcblx0XHR0aGlzLmJlZ2luVGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xyXG5cdFx0dGhpcy5wcmV2VGltZSA9IHRoaXMuYmVnaW5UaW1lO1xyXG5cdFx0dGhpcy5mcmFtZXMgPSAwO1xyXG5cclxuXHRcdHRoaXMuZnBzUGFuZWwgPSB0aGlzLmFkZFBhbmVsKCBuZXcgUGFuZWwoIFwiRlBTXCIsIFwiIzBmZlwiLCBcIiMwMDJcIiApICk7XHJcblx0XHR0aGlzLm1zUGFuZWwgPSB0aGlzLmFkZFBhbmVsKCBuZXcgUGFuZWwoIFwiTVNcIiwgXCIjMGYwXCIsIFwiIzAyMFwiICkgKTtcclxuXHJcblx0XHR0aGlzLnNob3dQYW5lbCgwKTtcclxuXHR9XHJcblxyXG5cdGFkZFBhbmVsKHBhbmVsOiBQYW5lbCk6IFBhbmVsIHtcclxuXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBwYW5lbC5jYW52YXMgKTtcclxuXHJcblx0XHRyZXR1cm4gcGFuZWw7XHJcblx0fVxyXG5cclxuXHRzaG93UGFuZWwoaWQ6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5jb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xyXG5cdFx0XHR2YXIgZWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5jb250YWluZXIuY2hpbGRyZW5baV07XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5tb2RlID0gaWQ7XHJcblx0fVxyXG5cclxuXHRiZWdpbigpOiB2b2lkIHtcclxuXHJcblx0XHR0aGlzLmJlZ2luVGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xyXG5cclxuXHR9XHJcblxyXG5cdGVuZCgpOiBudW1iZXIge1xyXG5cclxuXHRcdHRoaXMuZnJhbWVzKys7XHJcblxyXG5cdFx0dmFyIHRpbWU6IG51bWJlciA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xyXG5cclxuXHRcdHRoaXMubXNQYW5lbC51cGRhdGUoIHRpbWUgLSB0aGlzLmJlZ2luVGltZSwgMjAwICk7XHJcblxyXG5cdFx0aWYgKCB0aW1lID49IHRoaXMucHJldlRpbWUgKyAxMDAwICkge1xyXG5cclxuXHRcdFx0dGhpcy5mcHNQYW5lbC51cGRhdGUoICggdGhpcy5mcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSB0aGlzLnByZXZUaW1lICksIDEwMCApO1xyXG5cclxuXHRcdFx0dGhpcy5wcmV2VGltZSA9IHRpbWU7XHJcblx0XHRcdHRoaXMuZnJhbWVzID0gMDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRpbWU7XHJcblxyXG5cdH1cclxuXHJcblx0dXBkYXRlKCk6IHZvaWQge1xyXG5cclxuXHRcdHRoaXMuYmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYW5lbCB7XHJcblx0bWluOiBudW1iZXI7XHJcblx0bWF4OiBudW1iZXI7XHJcblx0Y29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbDtcclxuXHRiZzogc3RyaW5nO1xyXG5cdGZnOiBzdHJpbmc7XHJcblx0V0lEVEg6IG51bWJlcjtcclxuXHRIRUlHSFQ6IG51bWJlcjtcclxuXHRURVhUX1g6IG51bWJlcjtcclxuXHRURVhUX1k6IG51bWJlcjtcclxuXHRHUkFQSF9YOiBudW1iZXI7XHJcblx0R1JBUEhfWTogbnVtYmVyO1xyXG5cdEdSQVBIX1dJRFRIOiBudW1iZXI7XHJcblx0R1JBUEhfSEVJR0hUOiBudW1iZXI7XHJcblx0Y2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHRQUjogbnVtYmVyO1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBmZzogc3RyaW5nLCBiZzogc3RyaW5nKSB7XHJcblx0XHR0aGlzLm1pbiA9IEluZmluaXR5O1xyXG5cdFx0dGhpcy5tYXggPSAwO1xyXG5cdFx0dGhpcy5mZyA9IGZnO1xyXG5cdFx0dGhpcy5iZyA9IGJnO1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHJcblx0XHR0aGlzLlBSID0gTWF0aC5yb3VuZCggd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSApO1xyXG5cclxuXHRcdHRoaXMuV0lEVEggPSA4MCAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkhFSUdIVCA9IDQ4ICogdGhpcy5QUjtcclxuXHRcdHRoaXMuVEVYVF9YID0gMyAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLlRFWFRfWSA9IDIgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5HUkFQSF9YID0gMyAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkdSQVBIX1kgPSAxNSAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkdSQVBIX1dJRFRIID0gNzQgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5HUkFQSF9IRUlHSFQgPSAzMCAqIHRoaXMuUFI7XHJcblxyXG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImNhbnZhc1wiICk7XHJcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuV0lEVEg7XHJcblx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLkhFSUdIVDtcclxuXHRcdHRoaXMuY2FudmFzLnN0eWxlLmNzc1RleHQgPSBcIndpZHRoOjgwcHg7aGVpZ2h0OjQ4cHhcIjtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCBcIjJkXCIgKTtcclxuXHJcblx0XHRpZiAodGhpcy5jb250ZXh0ICE9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuY29udGV4dC5mb250ID0gXCJib2xkIFwiICsgKCA5ICogdGhpcy5QUiApICsgXCJweCBIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZlwiO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcclxuXHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBiZztcclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxSZWN0KCAwLCAwLCB0aGlzLldJRFRILCB0aGlzLkhFSUdIVCApO1xyXG5cclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFRleHQoIG5hbWUsIHRoaXMuVEVYVF9YLCB0aGlzLlRFWFRfWSApO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoIHRoaXMuR1JBUEhfWCwgdGhpcy5HUkFQSF9ZLCB0aGlzLkdSQVBIX1dJRFRILCB0aGlzLkdSQVBIX0hFSUdIVCApO1xyXG5cclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsUmVjdCggdGhpcy5HUkFQSF9YLCB0aGlzLkdSQVBIX1ksIHRoaXMuR1JBUEhfV0lEVEgsIHRoaXMuR1JBUEhfSEVJR0hUICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGUgKHZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmNvbnRleHQgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIHZhbHVlICk7XHJcblx0XHR0aGlzLm1heCA9IE1hdGgubWF4KHRoaXMubWF4LCB2YWx1ZSApO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJnO1xyXG5cdFx0dGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcclxuXHRcdHRoaXMuY29udGV4dC5maWxsUmVjdCggMCwgMCwgdGhpcy5XSURUSCwgdGhpcy5HUkFQSF9ZICk7XHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5mZztcclxuXHRcdHRoaXMuY29udGV4dC5maWxsVGV4dChcclxuXHRcdFx0TWF0aC5yb3VuZCggdmFsdWUgKSArIFwiIFwiICsgdGhpcy5uYW1lICsgXCIgKFwiICsgTWF0aC5yb3VuZCggdGhpcy5taW4gKSArIFwiLVwiICsgTWF0aC5yb3VuZCggdGhpcy5tYXggKSArIFwiKVwiLCB0aGlzLlRFWFRfWCwgdGhpcy5URVhUX1kgKTtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxyXG5cdFx0XHR0aGlzLmNhbnZhcywgdGhpcy5HUkFQSF9YICsgdGhpcy5QUiwgdGhpcy5HUkFQSF9ZLCB0aGlzLkdSQVBIX1dJRFRIIC0gdGhpcy5QUiwgdGhpcy5HUkFQSF9IRUlHSFQsXHJcblx0XHRcdHRoaXMuR1JBUEhfWCwgdGhpcy5HUkFQSF9ZLCB0aGlzLkdSQVBIX1dJRFRIIC0gdGhpcy5QUiwgdGhpcy5HUkFQSF9IRUlHSFQgKTtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoIHRoaXMuR1JBUEhfWCArIHRoaXMuR1JBUEhfV0lEVEggLSB0aGlzLlBSLCB0aGlzLkdSQVBIX1ksIHRoaXMuUFIsIHRoaXMuR1JBUEhfSEVJR0hUICk7XHJcblxyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmc7XHJcblx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoXHJcblx0XHRcdHRoaXMuR1JBUEhfWCArIHRoaXMuR1JBUEhfV0lEVEggLSB0aGlzLlBSLCB0aGlzLkdSQVBIX1ksIHRoaXMuUFIsIE1hdGgucm91bmQoICggMSAtICggdmFsdWUgLyBtYXhWYWx1ZSApICkgKiB0aGlzLkdSQVBIX0hFSUdIVCApICk7XHJcblxyXG5cdH1cclxufSIsImltcG9ydCB7IEdhbWVNYXAgfSBmcm9tIFwiLi9tYWluXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbWFwMSA6IEdhbWVNYXAgPSB7XHJcbiAgICBtYXBIZWlnaHQ6IDMyLFxyXG4gICAgbWFwV2lkdGg6IDMyLFxyXG4gICAgc3VyZmFjZTogXCJcIlxyXG59O1xyXG5cclxubWFwMS5zdXJmYWNlID0gIFwiIyMjIyMjIyMjLi4uLi4uLiMjIyMjIyMjIy4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLiMuLi4uLi4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4jIyMjIyMjIyMuLi4uLi4uIyMjIyMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMuLi4uLi4uLi4uLi4uIyMjLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLiMjIyMuLi4uLi4uLi4uLi4jIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uIyMjIyMuLi4uLi4uLi4uLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4jIyMjLi4uLiMjIyMjIyMjLi4uLiMjIyMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjIy4jIyMjLi4uLi4uLiMjIyMjIy4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLiMuLi4uLi4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4jIyMjIyMjIyMuLi4uLi4uIyMuLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4uIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMuLi4uLi4uLi4uLi4uIyMjLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLiMjIyMuLi4uLi4uLi4uLi4jIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcIjsiLCJpbXBvcnQgeyBDb250cm9scyB9IGZyb20gXCIuL0NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IFVJLCBQb2ludCB9IGZyb20gXCIuL1VJXCI7XHJcblxyXG5pbXBvcnQgeyBTdGF0cyB9IGZyb20gXCIuL1V0aWxzL1N0YXRzXCI7XHJcbmltcG9ydCB7IG1hcDEgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCIuL1JlbmRlcmluZy9JbWFnZUFzc2V0XCI7XHJcbmltcG9ydCB7IEdMT0JBTF9BU1NFVFMgfSBmcm9tIFwiLi9HbG9iYWxzXCI7XHJcbmltcG9ydCB7IFVuaXQgfSBmcm9tIFwiLi9Vbml0XCI7XHJcbmltcG9ydCB7IFVuaWNvZGVBc3NldCB9IGZyb20gXCIuL1JlbmRlcmluZy9Vbmljb2RlQXNzZXRcIjtcclxuaW1wb3J0IHsgRmlsZUxvYWRlciB9IGZyb20gXCIuL0ZpbGVMb2FkZXJcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIsIFJlbmRlcmVyT3B0aW9ucyB9IGZyb20gXCIuL1JlbmRlcmluZy9SZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBOb3QzRCB9IGZyb20gXCIuL05vdDNEXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb3ZlbWVudCB7XHJcbiAgICBtb3ZlbWVudFg6IG51bWJlcjtcclxuICAgIG1vdmVtZW50WTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZU1hcCB7XHJcbiAgICBtYXBIZWlnaHQ6IG51bWJlcjtcclxuICAgIG1hcFdpZHRoOiBudW1iZXI7XHJcbiAgICBzdXJmYWNlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xyXG4gICAgcG9zWDogbnVtYmVyO1xyXG4gICAgcG9zWTogbnVtYmVyO1xyXG4gICAgYW5nbGU6IG51bWJlcjtcclxuICAgIHlBbmdsZTogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAgIGVuZ2luZTogTm90M0Q7XHJcbiAgICBzdGF0czogU3RhdHM7XHJcbiAgICByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgICBmRk9WOiBudW1iZXI7XHJcbiAgICBmU3BlZWQ6IG51bWJlcjtcclxuICAgIGZEZXB0aDogbnVtYmVyO1xyXG4gICAgc2NyZWVuV2lkdGg6IG51bWJlcjtcclxuICAgIHNjcmVlbkhlaWdodDogbnVtYmVyO1xyXG4gICAgZkRlcHRoQnVmZmVyOiBudW1iZXJbXTtcclxuICAgIHBsYXllcjogUGxheWVyO1xyXG4gICAgbWFwOiBHYW1lTWFwO1xyXG4gICAgdWk6IFVJO1xyXG4gICAgbWlkZGxlQ29ycmRpbmF0ZXM6IFBvaW50O1xyXG4gICAgdW5pdHM6IFVuaXRbXTtcclxuICAgIG5DZWlsaW5nOiBudW1iZXI7XHJcbiAgICBuRmxvb3I6IG51bWJlcjtcclxuICAgIGNvbnRyb2xzOiBDb250cm9scztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKCk7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIik7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93KFwiQ29udGFpbmVyIGVsZW1lbnQgbm90IGZvdW5kIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgTm90M0QoY29udGFpbmVyLCBuZXcgUmVuZGVyZXJPcHRpb25zKCksIHRoaXMuc3RhdHMpO1xyXG4gICAgICAgIC8vIGJlbmNobWFyayBzY3JpcHRcclxuICAgICAgICB0aGlzLnN0YXRzLnNob3dQYW5lbCgwKTsgLy8gMDogZnBzLCAxOiBtcywgMjogbWIsIDMrOiBjdXN0b21cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCB0aGlzLnN0YXRzLmNvbnRhaW5lciApO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gdGhpcy5lbmdpbmUucmVuZGVyZXI7XHJcblxyXG4gICAgICAgIHRoaXMuZkZPViA9IE1hdGguUEkgLyA0LjA7XHQvLyBmaWVsZCBvZiBWaWV3XHJcbiAgICAgICAgdGhpcy5mU3BlZWQgPSAyO1xyXG4gICAgICAgIHRoaXMuZkRlcHRoID0gMjU7XHRcdFx0Ly8gbWF4aW11bSByZW5kZXJpbmcgZGlzdGFuY2VcclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5XaWR0aCA9IHRoaXMucmVuZGVyZXIuZ2V0V2lkdGgoKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkhlaWdodCA9IHRoaXMucmVuZGVyZXIuZ2V0SGVpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5mRGVwdGhCdWZmZXIgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB7XHJcbiAgICAgICAgICAgIHBvc1g6IDcuMTgzODAwNTE3NjI4ODk1LFxyXG4gICAgICAgICAgICBwb3NZOiA5LjkyMDE3MjA1MjcwNjEyNSxcclxuICAgICAgICAgICAgYW5nbGU6IDAuNTAwMDAwMDAwMDAwMDAyMyxcclxuICAgICAgICAgICAgeUFuZ2xlOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBtYXAxO1xyXG4gICAgICAgIHRoaXMudWkgPSBuZXcgVUkodGhpcy5tYXAsIHRoaXMucGxheWVyKTtcclxuICAgICAgICB0aGlzLm1pZGRsZUNvcnJkaW5hdGVzID0gbmV3IFBvaW50O1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgR0xPQkFMX0FTU0VUUy5wdXNoKG5ldyBJbWFnZUFzc2V0KFwid2FsbF9zcHJpdGVcIiwgXCIuL3Nwcml0ZXMvd2FsbDMuYm1wXCIpKTtcclxuXHJcbiAgICAgICAgdGhpcy51bml0cyA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgbGFtcFRleHQ6IHN0cmluZyA9IGF3YWl0IEZpbGVMb2FkZXIubG9hZEpTT04oXCIuLi9hc3NldHMvb2JqZWN0cy9sYW1wLmpzb25cIik7XHJcbiAgICAgICAgR0xPQkFMX0FTU0VUUy5wdXNoKG5ldyBVbmljb2RlQXNzZXQoXCJsYW1wX2NtXCIsIEpTT04ucGFyc2UobGFtcFRleHQpLCAwLjUpKTtcclxuICAgICAgICB0aGlzLnVuaXRzLnB1c2gobmV3IFVuaXQoMTEsIDE0LCAwLCAwLCBcImxhbXBfY21cIikpO1xyXG5cclxuICAgICAgICBsZXQgcm9ja2V0VGV4dDogc3RyaW5nID0gYXdhaXQgRmlsZUxvYWRlci5sb2FkSlNPTihcIi4uL2Fzc2V0cy9vYmplY3RzL3JvY2tldC5qc29uXCIpO1xyXG4gICAgICAgIEdMT0JBTF9BU1NFVFMucHVzaChuZXcgVW5pY29kZUFzc2V0KFwicm9ja2V0XCIsIEpTT04ucGFyc2Uocm9ja2V0VGV4dCksIDAuNSkpO1xyXG5cclxuICAgICAgICB0aGlzLmVuZ2luZS5zZXRMb29wKCgpID0+IHsgdGhpcy5tb3ZlKCk7IH0pO1xyXG4gICAgICAgIHRoaXMuZW5naW5lLnN0YXJ0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb250cm9scygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci55QW5nbGUgPSB0aGlzLnBsYXllci55QW5nbGU7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJHbG9iYWxzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYmVnaW5PZmZTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLm1haW5TY3JlZW4oMCwgdGhpcy5zY3JlZW5XaWR0aCk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPYmplY3RzKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5lbmRPZmZTY3JlZW4oKTtcclxuXHJcbiAgICAgICAgdGhpcy51aS5kcmF3VUkodGhpcy5taWRkbGVDb3JyZGluYXRlcywgdGhpcy51bml0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFpblNjcmVlbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIGxldCBmUmF5QW5nbGU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IHN0ZXBTaXplOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBkaXN0YW5jZVRvV2FsbDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgYkhpdFdhbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgZXllWDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgZXllWTogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgblRlc3RYOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBuVGVzdFk6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IGZyb207IGkgPCB0bzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZSYXlBbmdsZSA9ICh0aGlzLnBsYXllci5hbmdsZSAtIHRoaXMuZkZPViAvIDIuMCkgKyAoaSAvIHRoaXMuc2NyZWVuV2lkdGgpICogdGhpcy5mRk9WO1xyXG4gICAgICAgICAgICBzdGVwU2l6ZSA9IDAuMDU7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlVG9XYWxsID0gMC4wO1xyXG4gICAgICAgICAgICBiSGl0V2FsbCA9IGZhbHNlO1x0XHQvLyBzZXQgd2hlbiByYXkgaGl0cyB3YWxsIGJsb2NrXHJcbiAgICAgICAgICAgIGV5ZVggPSBNYXRoLnNpbihmUmF5QW5nbGUpOyAvLyB1bml0IHZlY3RvciBmb3IgcmF5IGluIHBsYXllciBzcGFjZVxyXG4gICAgICAgICAgICBleWVZID0gTWF0aC5jb3MoZlJheUFuZ2xlKTtcclxuICAgICAgICAgICAgaWYoaSA9PT0gdG8gLyAyKSB7IHRoaXMubWlkZGxlQ29ycmRpbmF0ZXMgPSB7eDogZXllWCwgeTogZXllWX07IH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmU2FtcGxlWDogbnVtYmVyID0gMC4wO1xyXG4gICAgICAgICAgICAvLyBpbmNyZW1lbnRhbGx5IGNhc3QgcmF5IGZyb20gcGxheWVyLCBhbG9uZyByYXkgYW5nbGUsIHRlc3RpbmcgZm9yXHJcbiAgICAgICAgICAgIC8vIGludGVyc2VjdGlvbiB3aXRoIGEgYmxvY2tcclxuICAgICAgICAgICAgd2hpbGUgKCFiSGl0V2FsbCAmJiBkaXN0YW5jZVRvV2FsbCA8IHRoaXMuZkRlcHRoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VUb1dhbGwgKz0gc3RlcFNpemU7XHJcbiAgICAgICAgICAgICAgICBuVGVzdFggPSBNYXRoLmZsb29yKHRoaXMucGxheWVyLnBvc1ggKyBleWVYICogZGlzdGFuY2VUb1dhbGwpO1xyXG4gICAgICAgICAgICAgICAgblRlc3RZID0gTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NZICsgZXllWSAqIGRpc3RhbmNlVG9XYWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0ZXN0IGlmIHJheSBpcyBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgICAgICAgICBpZiAoblRlc3RYIDwgMCB8fCBuVGVzdFggPj0gdGhpcy5tYXAubWFwV2lkdGggfHwgblRlc3RZIDwgMCB8fCBuVGVzdFkgPj0gdGhpcy5tYXAubWFwSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYkhpdFdhbGwgPSB0cnVlO1x0XHRcdC8vIGp1c3Qgc2V0IGRpc3RhbmNlIHRvIG1heGltdW0gZGVwdGhcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZVRvV2FsbCA9IHRoaXMuZkRlcHRoO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByYXkgaXMgaW5ib3VuZHMgc28gdGVzdCB0byBzZWUgaWYgdGhlIHJheSBjZWxsIGlzIGEgd2FsbCBibG9ja1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcC5zdXJmYWNlW01hdGgucm91bmQoblRlc3RYICogdGhpcy5tYXAubWFwV2lkdGggKyBuVGVzdFkpXSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmF5IGhhcyBoaXQgd2FsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiSGl0V2FsbCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZXRlcm1pbmUgd2hlcmUgcmF5IGhhcyBoaXQgd2FsbC4gQnJlYWsgQmxvY2sgYm91bmRhcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50IDQgbGluZSBzZWdtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZkJsb2NrTWlkWDogbnVtYmVyID0gblRlc3RYICsgMC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZkJsb2NrTWlkWTogbnVtYmVyID0gblRlc3RZICsgMC41O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZUZXN0UG9pbnRYOiBudW1iZXIgPSB0aGlzLnBsYXllci5wb3NYICsgZXllWCAqIGRpc3RhbmNlVG9XYWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZlRlc3RQb2ludFk6IG51bWJlciA9IHRoaXMucGxheWVyLnBvc1kgKyBleWVZICogZGlzdGFuY2VUb1dhbGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZlRlc3RBbmdsZTogbnVtYmVyID0gTWF0aC5hdGFuMigoZlRlc3RQb2ludFkgLSBmQmxvY2tNaWRZKSwgKGZUZXN0UG9pbnRYIC0gZkJsb2NrTWlkWCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZUZXN0QW5nbGUgPj0gLTMuMTQxNTkgKiAwLjI1ICYmIGZUZXN0QW5nbGUgPCAzLjE0MTU5ICogMC4yNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZlNhbXBsZVggPSBmVGVzdFBvaW50WSAtIG5UZXN0WTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZlRlc3RBbmdsZSA+PSAzLjE0MTU5ICogMC4yNSAmJiBmVGVzdEFuZ2xlIDwgMy4xNDE1OSAqIDAuNzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZTYW1wbGVYID0gZlRlc3RQb2ludFggLSBuVGVzdFg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZUZXN0QW5nbGUgPCAtMy4xNDE1OSAqIDAuMjUgJiYgZlRlc3RBbmdsZSA+PSAtMy4xNDE1OSAqIDAuNzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZTYW1wbGVYID0gZlRlc3RQb2ludFggLSBuVGVzdFg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZUZXN0QW5nbGUgPj0gMy4xNDE1OSAqIDAuNzUgfHwgZlRlc3RBbmdsZSA8IC0zLjE0MTU5ICogMC43NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZlNhbXBsZVggPSBmVGVzdFBvaW50WSAtIG5UZXN0WTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmU2FtcGxlWCAqPSAxMDA7XHJcbiAgICAgICAgICAgIGZTYW1wbGVYID0gTWF0aC5mbG9vcihmU2FtcGxlWCAvICgxMDAgLyAyODgpKTtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIGRpc3RhbmNlIHRvIGNlaWxpbmcgYW5kIGZsb29yXHJcbiAgICAgICAgICAgIHRoaXMubkNlaWxpbmcgPSAodGhpcy5zY3JlZW5IZWlnaHQgLyAyLjApIC0gKHRoaXMuc2NyZWVuSGVpZ2h0IC8gZGlzdGFuY2VUb1dhbGwpO1xyXG4gICAgICAgICAgICB0aGlzLm5GbG9vciA9IHRoaXMuc2NyZWVuSGVpZ2h0IC0gdGhpcy5uQ2VpbGluZztcclxuXHJcbiAgICAgICAgICAgIC8vIHNoYWRlciB3YWxscyBiYXNlZCBvbiBkaXN0YW5jZVxyXG4gICAgICAgICAgICBsZXQgc2hhZGVMZXZlbDogbnVtYmVyID0gcGFyc2VGbG9hdCgoZGlzdGFuY2VUb1dhbGwgKiAwLjEpLnRvRml4ZWQoMikpO1xyXG5cdFx0XHR0aGlzLmZEZXB0aEJ1ZmZlcltpXSA9IGRpc3RhbmNlVG9XYWxsO1xyXG5cclxuICAgICAgICAgICAgbGV0IGhlaWdodFRvRHJhdzogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IGZpcnN0WTogbnVtYmVyID0gLTE7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHk6IG51bWJlciA9IDA7IHkgPCB0aGlzLnNjcmVlbkhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlYWNoIFJvd1xyXG4gICAgICAgICAgICAgICAgaWYgKHkgPD0gdGhpcy5uQ2VpbGluZykgeyAvLyByb29mXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHkgPiB0aGlzLm5DZWlsaW5nICYmIHkgPD0gdGhpcy5uRmxvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHRUb0RyYXcgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdFkgPSBmaXJzdFkgPT09IC0xID8geSA6IGZpcnN0WTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgWDogZlNhbXBsZVgsIFk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgVzogMSwgSDogMjg4LFxyXG4gICAgICAgICAgICAgICAgICAgIGk6IFwid2FsbF9zcHJpdGVcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGksIGZpcnN0WSxcclxuICAgICAgICAgICAgICAgIDEsIGhlaWdodFRvRHJhdywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYWRlTGV2ZWw6IHNoYWRlTGV2ZWxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVPYmplY3RzKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnVuaXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmplY3Q6IFVuaXQgPSB0aGlzLnVuaXRzW2ldO1xyXG5cdFx0XHQvLyB1cGRhdGUgT2JqZWN0IFBoeXNpY3NcclxuXHRcdFx0b2JqZWN0LnggKz0gb2JqZWN0LnZ4ICogMC41O1xyXG5cdFx0XHRvYmplY3QueSArPSBvYmplY3QudnkgKiAwLjU7XHJcblxyXG5cdFx0XHQvLyBjaGVjayBpZiBvYmplY3QgaXMgaW5zaWRlIHdhbGwgLSBzZXQgZmxhZyBmb3IgcmVtb3ZhbFxyXG5cdFx0XHRpZiAodGhpcy5tYXAuc3VyZmFjZVtvYmplY3QueCAqIHRoaXMubWFwLm1hcFdpZHRoICsgb2JqZWN0LnldID09PSBcIiNcIikge1xyXG5cdFx0XHRcdG9iamVjdC5yZW1vdmUgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBjYW4gb2JqZWN0IGJlIHNlZW4/XHJcblx0XHRcdGxldCBmVmVjWDogbnVtYmVyID0gKG9iamVjdC54KSAtIHRoaXMucGxheWVyLnBvc1g7XHJcbiAgICAgICAgICAgIGxldCBmVmVjWTogbnVtYmVyID0gKG9iamVjdC55KSAtIHRoaXMucGxheWVyLnBvc1k7XHJcblx0XHRcdGxldCBmRGlzdGFuY2VGcm9tUGxheWVyOiBudW1iZXIgPSBNYXRoLmh5cG90KGZWZWNYLCBmVmVjWSk7XHJcblxyXG5cdFx0XHRsZXQgZkV5ZVg6IG51bWJlciA9IE1hdGguc2luKHRoaXMucGxheWVyLmFuZ2xlKTtcclxuXHRcdFx0bGV0IGZFeWVZOiBudW1iZXIgPSBNYXRoLmNvcyh0aGlzLnBsYXllci5hbmdsZSk7XHJcblxyXG5cdFx0XHQvLyBjYWxjdWxhdGUgYW5nbGUgYmV0d2VlbiBsYW1wIGFuZCBwbGF5ZXJzIGZlZXQsIGFuZCBwbGF5ZXJzIGxvb2tpbmcgZGlyZWN0aW9uXHJcblx0XHRcdC8vIHRvIGRldGVybWluZSBpZiB0aGUgbGFtcCBpcyBpbiB0aGUgcGxheWVycyBmaWVsZCBvZiB2aWV3XHJcblx0XHRcdGxldCBmT2JqZWN0QW5nbGU6IG51bWJlciA9IE1hdGguYXRhbjIoZkV5ZVksIGZFeWVYKSAtIE1hdGguYXRhbjIoZlZlY1ksIGZWZWNYKTtcclxuXHRcdFx0aWYgKGZPYmplY3RBbmdsZSA8IC1NYXRoLlBJKSB7XHJcblx0XHRcdFx0Zk9iamVjdEFuZ2xlICs9IDIuMCAqIE1hdGguUEk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGZPYmplY3RBbmdsZSA+IE1hdGguUEkpIHtcclxuICAgICAgICAgICAgICAgIGZPYmplY3RBbmdsZSAtPSAyLjAgKiBNYXRoLlBJO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgYkluUGxheWVyRk9WOiBib29sZWFuID0gTWF0aC5hYnMoZk9iamVjdEFuZ2xlKSA8ICh0aGlzLmZGT1YpIC8gMjtcclxuICAgICAgICAgICAgbGV0IHNoYWRlTGV2ZWw6IHN0cmluZyA9IChmRGlzdGFuY2VGcm9tUGxheWVyICogMC4xKS50b0ZpeGVkKDIpO1xyXG5cclxuXHRcdFx0aWYgKGJJblBsYXllckZPViAmJiBmRGlzdGFuY2VGcm9tUGxheWVyID49IDAuNSAmJiBmRGlzdGFuY2VGcm9tUGxheWVyIDwgdGhpcy5mRGVwdGggJiYgIW9iamVjdC5yZW1vdmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRPRE86IEZpeCB0aGlzXHJcbiAgICAgICAgICAgICAgICBsZXQgZk9iamVjdENlaWxpbmc6IG51bWJlciA9ICh0aGlzLnNjcmVlbkhlaWdodCAvIDIuMCkgLSB0aGlzLnNjcmVlbkhlaWdodCAvIChmRGlzdGFuY2VGcm9tUGxheWVyKTtcclxuXHRcdFx0XHRsZXQgZk9iamVjdEZsb29yOiBudW1iZXIgPSB0aGlzLnNjcmVlbkhlaWdodCAtIGZPYmplY3RDZWlsaW5nO1xyXG5cdFx0XHRcdGxldCBmT2JqZWN0SGVpZ2h0OiBudW1iZXIgPSBmT2JqZWN0Rmxvb3IgLSBmT2JqZWN0Q2VpbGluZztcclxuXHRcdFx0XHRsZXQgZk9iamVjdEFzcGVjdFJhdGlvOiBudW1iZXIgPSBvYmplY3QuYXNzZXQuZ2V0SGVpZ2h0KCkgLyBvYmplY3QuYXNzZXQuZ2V0V2lkdGgoKTtcclxuXHRcdFx0XHRsZXQgZk9iamVjdFdpZHRoOiBudW1iZXIgPSBmT2JqZWN0SGVpZ2h0IC8gZk9iamVjdEFzcGVjdFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZNaWRkbGVPZk9iamVjdDogbnVtYmVyID0gKDAuNSAqIChmT2JqZWN0QW5nbGUgLyAodGhpcy5mRk9WIC8gMi4wKSkgKyAwLjUpICogdGhpcy5zY3JlZW5XaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclVuaWNvZGVBc3NldChcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuYXNzZXQsIC8vIHRoZSBhc3NldFxyXG4gICAgICAgICAgICAgICAgICAgIGZNaWRkbGVPZk9iamVjdCAtIChmT2JqZWN0V2lkdGggLyAyLjApLCBmT2JqZWN0Q2VpbGluZywgIC8vIHggYW5kIFkgY29vcmRpbmF0ZXNcclxuICAgICAgICAgICAgICAgICAgICBmT2JqZWN0V2lkdGgsIGZPYmplY3RIZWlnaHQsIC8vIGRpbWVudGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBmTWlkZGxlT2ZPYmplY3QsIC8vIG1pZGRsZSBvZiB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgZkRpc3RhbmNlRnJvbVBsYXllciwgLy8gZGlzdGFuY2UgYmV0d2VlbiBwbGF5ZXIgYW5kIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZkRlcHRoQnVmZmVyLCAvLyB0aGUgZGVwdGggYnVmZmVyXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzaGFkZUxldmVsKSk7IC8vIHRoZSBzaGFkZSBsZXZlbFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29udHJvbHMoKTogYW55IHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IENvbnRyb2xzKHtcclxuICAgICAgICAgICAgcG9pbnRlckxvY2s6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbnZhczogdGhpcy5yZW5kZXJlci5jYW52YXMsXHJcbiAgICAgICAgICAgIHBvaW50ZXJDYWxsYmFjazogKGU6IElNb3ZlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB1cCBhcnJvdyBPUiBcIldcIiBrZXlcclxuICAgICAgICB0aGlzLmNvbnRyb2xzLmJpbmRLZXlzKFtcIjM4XCIsIFwiODdcIl0sICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0ZvcldhbGwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGRvd24gYXJyb3cgT1IgXCJTXCIga2V5XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5iaW5kS2V5cyhbXCI0MFwiLCBcIjgzXCJdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JXYWxsKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbGVmdCBhcnJvdyBPUiBcIkRcIiBrZXlcclxuICAgICAgICB0aGlzLmNvbnRyb2xzLmJpbmRLZXlzKFtcIjM3XCIsIFwiNjVcIl0sICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0ZvcldhbGwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHJpZ2h0IGFycm93IE9SIFwiQVwiIGtleVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYmluZEtleXMoW1wiMzlcIiwgXCI2OFwiXSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRm9yV2FsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYmluZE1vdXNlZG93bigoKSA9PiB7XHJcblx0XHRcdGxldCB2eDogbnVtYmVyID0gTWF0aC5zaW4odGhpcy5wbGF5ZXIuYW5nbGUpICogMC44O1xyXG5cdFx0XHRsZXQgdnk6IG51bWJlciA9IE1hdGguY29zKHRoaXMucGxheWVyLmFuZ2xlKSAqIDAuODtcclxuICAgICAgICAgICAgdGhpcy51bml0cy5wdXNoKG5ldyBVbml0KHRoaXMucGxheWVyLnBvc1gsIHRoaXMucGxheWVyLnBvc1gsIHZ4LCB2eSwgXCJyb2NrZXRcIikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKHRoaXMucGxheWVyLmFuZ2xlKSAqIHRoaXMuZlNwZWVkICogMC4xO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY29zKHRoaXMucGxheWVyLmFuZ2xlKSAqIHRoaXMuZlNwZWVkICogMC4xO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9yV2FsbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXAuc3VyZmFjZVtNYXRoLmZsb29yKHRoaXMucGxheWVyLnBvc1gpICogdGhpcy5tYXAubWFwV2lkdGggKyBNYXRoLmZsb29yKHRoaXMgIC5wbGF5ZXIucG9zWSldID09PSBcIiNcIjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQb3NpdGlvbihlOiBJTW92ZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBpZihlLm1vdmVtZW50WCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5nbGUgKz0gKGUubW92ZW1lbnRYKSAqIDAuMDA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlLm1vdmVtZW50WCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5nbGUgKz0gKCBlLm1vdmVtZW50WCkgKiAwLjAwNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS5tb3ZlbWVudFkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnlBbmdsZSArPSAoZS5tb3ZlbWVudFkpICogMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS5tb3ZlbWVudFkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnlBbmdsZSArPSAoIGUubW92ZW1lbnRZKSAqIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyAoKCkgPT4gIHtcclxuLy8gICAgIHdpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgICAgbmV3IEdhbWUoKTtcclxuLy8gICAgIH07XHJcbi8vIH0pKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==