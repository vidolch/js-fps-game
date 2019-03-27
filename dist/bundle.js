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
/*! exports provided: Controls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controls", function() { return Controls; });
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

/***/ "./src/Point.ts":
/*!**********************!*\
  !*** ./src/Point.ts ***!
  \**********************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
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
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony import */ var _VisualUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisualUtils */ "./src/Rendering/VisualUtils.ts");
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

var Renderer = /** @class */ (function () {
    function Renderer(parentElement, options) {
        this.parentElement = parentElement;
        this.options = options;
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", document.body.clientWidth.toString());
        this.canvas.setAttribute("height", document.body.scrollHeight.toString());
        this.canvas.setAttribute("id", this.options.canvasId);
        this.parentElement.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d", { alpha: options.transparent });
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
        return __awaiter(this, void 0, void 0, function () {
            var middleLine, linearGradient1;
            return __generator(this, function (_a) {
                if (!this.context) {
                    return [2 /*return*/];
                }
                middleLine = this.canvas.height / 2 + this.yAngle;
                this.context.fillStyle = "rgb(44, 107, 255)";
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                linearGradient1 = this.context.createLinearGradient(0, this.canvas.height, 0, middleLine);
                linearGradient1.addColorStop(0, "rgb(147, 67, 2)");
                linearGradient1.addColorStop(0.65, _VisualUtils__WEBPACK_IMPORTED_MODULE_0__["VisualUtils"].shadeBlendConvert(-0.8, "rgb(147, 67, 2)"));
                linearGradient1.addColorStop(1, "rgb(0, 0, 0)");
                this.context.fillStyle = linearGradient1;
                this.context.fillRect(0, middleLine, this.canvas.width, this.canvas.height - middleLine);
                this.context.fillStyle = "black";
                return [2 /*return*/];
            });
        });
    };
    Renderer.prototype.renderImage = function (image, spaceX, spaceY, spaceWidth, spaceHeight, options) {
        return __awaiter(this, void 0, void 0, function () {
            var renderContext;
            return __generator(this, function (_a) {
                renderContext = this.getRenderContext();
                if (this.shouldImageBeRendered(options)) {
                    renderContext.drawImage(image.i.image, image.X, image.Y, image.W, image.H, spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
                }
                if (options.shadeLevel !== 0) {
                    renderContext.fillStyle = "rgba(0, 0, 0, " + options["shadeLevel"] + ")";
                    renderContext.fillRect(spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
                }
                return [2 /*return*/];
            });
        });
    };
    Renderer.prototype.renderUnicodeAsset = function (asset, spaceX, spaceY, width, height, fMiddleOfObject, fDistanceFromPlayer, fDepthBuffer, shadeLevel) {
        return __awaiter(this, void 0, void 0, function () {
            var renderContext, ly, lx, proportialWidth, proportialHeight, nObjectColumn, renderX, renderY;
            return __generator(this, function (_a) {
                renderContext = this.getRenderContext();
                for (ly = 0; ly < asset.rows; ly++) {
                    for (lx = 0; lx < asset.cols; lx++) {
                        proportialWidth = width / asset.cols;
                        proportialHeight = height / asset.rows;
                        nObjectColumn = Math.round(fMiddleOfObject + lx - (asset.cols / 2));
                        if (nObjectColumn >= 0 && nObjectColumn < this.getWidth()) {
                            if (asset.getCharAt(ly, lx) !== "." && fDepthBuffer[nObjectColumn] >= fDistanceFromPlayer) {
                                fDepthBuffer[nObjectColumn] = fDistanceFromPlayer;
                                renderX = spaceX + (lx * proportialWidth);
                                renderY = spaceY + (ly * proportialHeight);
                                renderContext.fillStyle = asset.getCharAt(ly, lx);
                                renderContext.fillRect(renderX, renderY + this.yAngle, proportialWidth, proportialHeight);
                                renderContext.fillStyle = "rgba(0, 0, 0, " + shadeLevel + ")";
                                renderContext.fillRect(renderX, renderY + this.yAngle, proportialWidth, proportialHeight);
                            }
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                if (!this.context) {
                    return [2 /*return*/];
                }
                this.context.beginPath();
                this.context.moveTo(coordinates[0].x, coordinates[0].y);
                for (i = 1; i < coordinates.length; i++) {
                    this.context.lineTo(coordinates[i].x, coordinates[i].y);
                }
                this.context.strokeStyle = lineColor;
                this.context.stroke();
                return [2 /*return*/];
            });
        });
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

/***/ "./src/Rendering/RendererOptions.ts":
/*!******************************************!*\
  !*** ./src/Rendering/RendererOptions.ts ***!
  \******************************************/
/*! exports provided: RendererOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RendererOptions", function() { return RendererOptions; });
var RendererOptions = /** @class */ (function () {
    function RendererOptions() {
        this.resDecrease = 1;
        this.canvasId = "mainScreen";
        this.transparent = true;
    }
    return RendererOptions;
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
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
/* harmony import */ var _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
/* harmony import */ var _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rendering/ImageAsset */ "./src/Rendering/ImageAsset.ts");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Globals */ "./src/Globals.ts");
/* harmony import */ var _Rendering_RendererOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rendering/RendererOptions */ "./src/Rendering/RendererOptions.ts");
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




var UI = /** @class */ (function () {
    function UI(map, player) {
        var container = document.getElementById("container");
        if (container === null) {
            throw ("Container element could not be found");
        }
        var rendererOptions = new _Rendering_RendererOptions__WEBPACK_IMPORTED_MODULE_3__["RendererOptions"]();
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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controls */ "./src/Controls.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.ts");
/* harmony import */ var _Utils_Stats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/Stats */ "./src/Utils/Stats.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Rendering/ImageAsset */ "./src/Rendering/ImageAsset.ts");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Globals */ "./src/Globals.ts");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Unit */ "./src/Unit.ts");
/* harmony import */ var _Rendering_UnicodeAsset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Rendering/UnicodeAsset */ "./src/Rendering/UnicodeAsset.ts");
/* harmony import */ var _FileLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FileLoader */ "./src/FileLoader.ts");
/* harmony import */ var _Not3D__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Not3D */ "./src/Not3D.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Point */ "./src/Point.ts");
/* harmony import */ var _Rendering_RendererOptions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Rendering/RendererOptions */ "./src/Rendering/RendererOptions.ts");
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












var Game = /** @class */ (function () {
    function Game() {
        this.stats = new _Utils_Stats__WEBPACK_IMPORTED_MODULE_2__["Stats"]();
        var container = document.getElementById("container");
        if (container == null) {
            throw ("Container element not found!");
        }
        this.engine = new _Not3D__WEBPACK_IMPORTED_MODULE_9__["Not3D"](container, new _Rendering_RendererOptions__WEBPACK_IMPORTED_MODULE_11__["RendererOptions"](), this.stats);
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
        this.middleCorrdinates = new _Point__WEBPACK_IMPORTED_MODULE_10__["Point"];
        this.init();
    }
    Game.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lampText, rocketText;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.wall = new _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_4__["ImageAsset"]("wall_sprite", "./sprites/wall3.jpg");
                        _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(this.wall);
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
        this.renderer.beginOffScreen();
        this.renderer.yAngle = this.player.yAngle;
        this.renderer.renderGlobals();
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
        for (var i = from; i < to; i += 3) {
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
            this.fDepthBuffer[i + 1] = distanceToWall;
            this.fDepthBuffer[i + 2] = distanceToWall;
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
                W: 3, H: 288,
                i: this.wall
            }, i, firstY, 3, heightToDraw, {
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
            var vx = Math.sin(_this.player.angle);
            var vy = Math.cos(_this.player.angle);
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
            this.player.angle += (e.movementX) * 0.002;
        }
        if (e.movementX < 0) {
            this.player.angle += (e.movementX) * 0.002;
        }
        if (e.movementY > 0) {
            this.player.yAngle += (e.movementY) * 0.6;
        }
        if (e.movementY < 0) {
            this.player.yAngle += (e.movementY) * 0.6;
        }
    };
    return Game;
}());
// tslint:disable-next-line:no-unused-expression
new Game();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fzc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9Db250cm9scy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2xvYmFscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90M0QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvSW1hZ2VBc3NldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL1JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXJPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvVW5pY29kZUFzc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvVmlzdWFsVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VJLnRzIiwid2VicGFjazovLy8uL3NyYy9Vbml0LnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy9TdGF0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeFU7SUFDTCxDQUFDO0lBRU0sa0JBQU0sR0FBYixVQUFjLENBQVMsRUFBRSxDQUFXLEVBQUUsQ0FBVztRQUM3QyxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDUCxJQUFJLEVBQUUsR0FBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWhDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1AsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2RjtZQUVELElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BD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QyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FB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OiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEFzc2V0IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxvYWRlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb21wbGV0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb250cm9sT3B0aW9ucyB9IGZyb20gXCIuL0NvbnRyb2xPcHRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbHMge1xyXG4gICAga2V5c0JpbmRpbmdzOiBGdW5jdGlvbltdO1xyXG4gICAgbW91c2Vkb3duQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgdXNlTW91c2U6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQ29udHJvbE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmtleXNCaW5kaW5ncyA9IFtdO1xyXG5cclxuICAgICAgICBpZighIW9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9pbnRlckxvY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5jYW52YXMgfHwgIW9wdGlvbnMucG9pbnRlckNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJJbiBvcmRlciB0byB1dGlsaXplIHBvaW50ZXIgbG9jaywgcHJvdmlkZSBjYW52YXMgYW5kIGNhbGxiYWNrIGluIHRoZSBvcHRpb25zIVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VNb3VzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kUG9pbnRlcihvcHRpb25zLmNhbnZhcyBhcyBIVE1MQ2FudmFzRWxlbWVudCwgb3B0aW9ucy5wb2ludGVyQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5cyhrZXlzOiBzdHJpbmdbXSwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzQmluZGluZ3Nba2V5c1tpXV0gPSBjYWxsYmFjaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEtleShrZXk6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5rZXlzQmluZGluZ3Nba2V5XSA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNb3VzZWRvd24oY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb3VzZWRvd25DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAgICAgaWYodGhpcy5rZXlzQmluZGluZ3MuaGFzT3duUHJvcGVydHkoZS5rZXlDb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlzQmluZGluZ3NbZS5rZXlDb2RlXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdXNlZG93bkNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2Vkb3duQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBiaW5kUG9pbnRlcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBwb2ludGVyQ2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgY2FudmFzW1wicmVxdWVzdFBvaW50ZXJMb2NrXCJdID0gY2FudmFzW1wicmVxdWVzdFBvaW50ZXJMb2NrXCJdIHx8IGNhbnZhc1tcIm1velJlcXVlc3RQb2ludGVyTG9ja1wiXTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRbXCJleGl0UG9pbnRlckxvY2tcIl0gPSBkb2N1bWVudFtcImV4aXRQb2ludGVyTG9ja1wiXSB8fCBkb2N1bWVudFtcIm1vekV4aXRQb2ludGVyTG9ja1wiXTtcclxuXHJcbiAgICAgICAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlTW91c2UgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYW52YXNbXCJyZXF1ZXN0UG9pbnRlckxvY2tcIl0oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybG9ja2NoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tDaGFuZ2UoY2FudmFzLCBwb2ludGVyQ2FsbGJhY2spO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96cG9pbnRlcmxvY2tjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2NrQ2hhbmdlKGNhbnZhcywgcG9pbnRlckNhbGxiYWNrKTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9ja0NoYW5nZShjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBwb2ludGVyQ2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50W1wicG9pbnRlckxvY2tFbGVtZW50XCJdID09PSBjYW52YXMgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnRbXCJtb3pQb2ludGVyTG9ja0VsZW1lbnRcIl0gPT09IGNhbnZhcykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyBsb2NrZWRcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnVzZU1vdXNlKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgcG9pbnRlckNhbGxiYWNrKGUpO1xyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgcG9pbnRlciBsb2NrIHN0YXR1cyBpcyBub3cgdW5sb2NrZWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXNlTW91c2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgRmlsZUxvYWRlciB7XHJcbiAgICBzdGF0aWMgYXN5bmMgbG9hZEpTT04oZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgbGV0IHJlczogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChmaWxlTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlcy50ZXh0KCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuL0Fzc2V0XCI7XHJcblxyXG5leHBvcnQgbGV0IEdMT0JBTF9BU1NFVFM6IEFzc2V0W10gPSBbXTtcclxuXHJcbmV4cG9ydCBsZXQgR2V0QXNzZXQ6IEZ1bmN0aW9uID0gKG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgbGV0IHJlc3VsdDogQXNzZXRbXSA9IEdMT0JBTF9BU1NFVFMuZmlsdGVyKChhc3NldCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhc3NldC5uYW1lID09PSBuYW1lO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXJlc3VsdCB8fCByZXN1bHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0WzBdO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBBcmVBbGxBc3NldHNMb2FkZWQ6IEZ1bmN0aW9uID0gKG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgcmV0dXJuIEdMT0JBTF9BU1NFVFMuZmlsdGVyKChhc3NldCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBhc3NldC5pc0NvbXBsZXRlKCk7XHJcbiAgICB9KS5sZW5ndGggPT09IEdMT0JBTF9BU1NFVFMubGVuZ3RoO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuL1JlbmRlcmluZy9SZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBBcmVBbGxBc3NldHNMb2FkZWQgfSBmcm9tIFwiLi9HbG9iYWxzXCI7XHJcbmltcG9ydCB7IFN0YXRzIH0gZnJvbSBcIi4vVXRpbHMvU3RhdHNcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXJPcHRpb25zIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyT3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5vdDNEIHtcclxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICAgIHN0YXRzOiBTdGF0cztcclxuICAgIGxvb3BDYWxsYmFjazogRnVuY3Rpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQsIHJlbmRlck9wdGlvbnM6IFJlbmRlcmVyT3B0aW9ucywgc3RhdHM6IFN0YXRzKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IHN0YXRzO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIocGFyZW50RWxlbWVudCwgcmVuZGVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9vcChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvb3BDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5Mb29wKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdHMpIHsgdGhpcy5zdGF0cy5iZWdpbigpOyB9XHJcbiAgICAgICAgdGhpcy5sb29wQ2FsbGJhY2soKTtcclxuICAgICAgICBpZih0aGlzLnN0YXRzKSB7IHRoaXMuc3RhdHMuZW5kKCk7IH1cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLm1haW5Mb29wKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmKEFyZUFsbEFzc2V0c0xvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmKCEhY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkxvb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBQb2ludCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbn0iLCJpbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuLi9Bc3NldFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEltYWdlQXNzZXQgZXh0ZW5kcyBBc3NldCB7XHJcbiAgICBpbWFnZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc3JjOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBzcmM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb21wbGV0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRoaXMuaW1hZ2UuY29tcGxldGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmlzdWFsVXRpbHMgfSBmcm9tIFwiLi9WaXN1YWxVdGlsc1wiO1xyXG5pbXBvcnQgeyBVbmljb2RlQXNzZXQgfSBmcm9tIFwiLi9Vbmljb2RlQXNzZXRcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXJPcHRpb25zIH0gZnJvbSBcIi4vUmVuZGVyZXJPcHRpb25zXCI7XHJcbmltcG9ydCB7IERyYXdPcHRpb25zIH0gZnJvbSBcIi4vRHJhd09wdGlvbnNcIjtcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwic3JjL1BvaW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xyXG4gICAgcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBvcHRpb25zOiBSZW5kZXJlck9wdGlvbnM7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbDtcclxuICAgIG5DZWlsaW5nOiBudW1iZXI7XHJcbiAgICBuRmxvb3I6IG51bWJlcjtcclxuICAgIG9mZlNjcmVlbjogYm9vbGVhbjtcclxuICAgIHlBbmdsZTogbnVtYmVyO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCwgb3B0aW9uczogUmVuZGVyZXJPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcblx0XHR0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aC50b1N0cmluZygpKTtcclxuXHRcdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCAgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQudG9TdHJpbmcoKSk7XHJcblx0XHR0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCAgdGhpcy5vcHRpb25zLmNhbnZhc0lkKTtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiLCB7IGFscGhhOiBvcHRpb25zLnRyYW5zcGFyZW50IH0pO1xyXG5cclxuICAgICAgICB0aGlzLm5DZWlsaW5nID0gMDtcclxuICAgICAgICB0aGlzLm5GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5vZmZTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnlBbmdsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLm9wdGlvbnMucmVzRGVjcmVhc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMub3B0aW9ucy5yZXNEZWNyZWFzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWxsU3R5bGUoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZW5kZXJHbG9iYWxzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1pZGRsZUxpbmU6IG51bWJlciA9IHRoaXMuY2FudmFzLmhlaWdodCAvIDIgKyB0aGlzLnlBbmdsZTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2IoNDQsIDEwNywgMjU1KVwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgbGluZWFyR3JhZGllbnQxOiBDYW52YXNHcmFkaWVudCA9IHRoaXMuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCB0aGlzLmNhbnZhcy5oZWlnaHQsIDAsIG1pZGRsZUxpbmUpO1xyXG4gICAgICAgIGxpbmVhckdyYWRpZW50MS5hZGRDb2xvclN0b3AoMCwgXCJyZ2IoMTQ3LCA2NywgMilcIik7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgwLjY1LCBWaXN1YWxVdGlscy5zaGFkZUJsZW5kQ29udmVydCgtMC44LCBcInJnYigxNDcsIDY3LCAyKVwiKSk7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgxLCBcInJnYigwLCAwLCAwKVwiKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gbGluZWFyR3JhZGllbnQxO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCBtaWRkbGVMaW5lLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gbWlkZGxlTGluZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZW5kZXJJbWFnZShcclxuICAgICAgICBpbWFnZTogYW55LCBzcGFjZVg6IG51bWJlciwgc3BhY2VZOiBudW1iZXIsIHNwYWNlV2lkdGg6IG51bWJlciwgc3BhY2VIZWlnaHQ6IG51bWJlciwgb3B0aW9uczogRHJhd09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcmVuZGVyQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5nZXRSZW5kZXJDb250ZXh0KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNob3VsZEltYWdlQmVSZW5kZXJlZChvcHRpb25zKSkge1xyXG4gICAgICAgICAgICByZW5kZXJDb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgIGltYWdlLmkuaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBpbWFnZS5YLCBpbWFnZS5ZLCBpbWFnZS5XLCBpbWFnZS5ILFxyXG4gICAgICAgICAgICAgICAgc3BhY2VYLCBzcGFjZVkgKyB0aGlzLnlBbmdsZSwgc3BhY2VXaWR0aCwgc3BhY2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuc2hhZGVMZXZlbCAhPT0gMCkge1xyXG4gICAgICAgICAgICByZW5kZXJDb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgwLCAwLCAwLCBcIiArIG9wdGlvbnNbXCJzaGFkZUxldmVsXCJdICsgXCIpXCI7XHJcbiAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFJlY3Qoc3BhY2VYLCBzcGFjZVkgKyB0aGlzLnlBbmdsZSwgc3BhY2VXaWR0aCwgc3BhY2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZW5kZXJVbmljb2RlQXNzZXQoXHJcbiAgICAgICAgYXNzZXQ6IFVuaWNvZGVBc3NldCxcclxuICAgICAgICBzcGFjZVg6IG51bWJlcixcclxuICAgICAgICBzcGFjZVk6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgIGZNaWRkbGVPZk9iamVjdDogbnVtYmVyLFxyXG4gICAgICAgIGZEaXN0YW5jZUZyb21QbGF5ZXI6IG51bWJlcixcclxuICAgICAgICBmRGVwdGhCdWZmZXI6IG51bWJlcltdLFxyXG4gICAgICAgIHNoYWRlTGV2ZWw6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGxldCByZW5kZXJDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLmdldFJlbmRlckNvbnRleHQoKTtcclxuICAgICAgICBmb3IgKGxldCBseTogbnVtYmVyID0gMDsgbHkgPCBhc3NldC5yb3dzOyBseSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGx4OiBudW1iZXIgPSAwOyBseCA8IGFzc2V0LmNvbHM7IGx4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9wb3J0aWFsV2lkdGg6IG51bWJlciA9IHdpZHRoIC8gYXNzZXQuY29scztcclxuICAgICAgICAgICAgICAgIGxldCBwcm9wb3J0aWFsSGVpZ2h0OiBudW1iZXIgPSBoZWlnaHQgLyBhc3NldC5yb3dzO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuT2JqZWN0Q29sdW1uOiBudW1iZXIgPSBNYXRoLnJvdW5kKGZNaWRkbGVPZk9iamVjdCArIGx4IC0gKGFzc2V0LmNvbHMgLyAyKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobk9iamVjdENvbHVtbiA+PSAwICYmIG5PYmplY3RDb2x1bW4gPCB0aGlzLmdldFdpZHRoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzZXQuZ2V0Q2hhckF0KGx5LCBseCkgIT09IFwiLlwiICYmIGZEZXB0aEJ1ZmZlcltuT2JqZWN0Q29sdW1uXSA+PSBmRGlzdGFuY2VGcm9tUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZEZXB0aEJ1ZmZlcltuT2JqZWN0Q29sdW1uXSA9IGZEaXN0YW5jZUZyb21QbGF5ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVuZGVyWDogbnVtYmVyID0gc3BhY2VYICsgKGx4ICogcHJvcG9ydGlhbFdpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlclk6IG51bWJlciA9IHNwYWNlWSArIChseSAqIHByb3BvcnRpYWxIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb250ZXh0LmZpbGxTdHlsZSA9IGFzc2V0LmdldENoYXJBdChseSwgbHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb250ZXh0LmZpbGxSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyWCwgcmVuZGVyWSArIHRoaXMueUFuZ2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcG9ydGlhbFdpZHRoLCBwcm9wb3J0aWFsSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMCwgMCwgMCwgXCIgKyBzaGFkZUxldmVsICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJYLCByZW5kZXJZICsgdGhpcy55QW5nbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wb3J0aWFsV2lkdGgsIHByb3BvcnRpYWxIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRSZW5kZXJDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2ZmU2NyZWVuID8gdGhpcy5jYW52YXNbXCJvZmZzY3JlZW5Db250ZXh0XCJdIDogdGhpcy5jb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZEltYWdlQmVSZW5kZXJlZChvcHRpb25zOiBEcmF3T3B0aW9ucyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICB8fCAodHlwZW9mIG9wdGlvbnMgIT09IFwidW5kZWZpbmVkXCIgJiYgb3B0aW9ucy5zaGFkZUxldmVsICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5zaGFkZUxldmVsIDwgMC45OSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgdywgaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlbmRlckxpbmUoY29vcmRpbmF0ZXM6IFBvaW50W10sIGxpbmVDb2xvcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oY29vcmRpbmF0ZXNbMF0ueCwgY29vcmRpbmF0ZXNbMF0ueSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKFxyXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbaV0ueCxcclxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzW2ldLnlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGxpbmVDb2xvcjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmVnaW5PZmZTY3JlZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYW52YXNbXCJvZmZzY3JlZW5DYW52YXNcIl0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzW1wib2Zmc2NyZWVuQ2FudmFzXCJdLndpZHRoID0gdGhpcy5nZXRXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzW1wib2Zmc2NyZWVuQ2FudmFzXCJdLmhlaWdodCA9IHRoaXMuZ2V0V2lkdGgoKTtcclxuICAgICAgICB0aGlzLmNhbnZhc1tcIm9mZnNjcmVlbkNvbnRleHRcIl0gPSB0aGlzLmNhbnZhc1tcIm9mZnNjcmVlbkNhbnZhc1wiXS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5vZmZTY3JlZW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuZE9mZlNjcmVlbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jYW52YXNbXCJvZmZzY3JlZW5DYW52YXNcIl0sIDAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLm9mZlNjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBSZW5kZXJlck9wdGlvbnMge1xyXG4gICAgcmVzRGVjcmVhc2U6IG51bWJlciA9IDE7XHJcbiAgICBjYW52YXNJZDogc3RyaW5nID0gXCJtYWluU2NyZWVuXCI7XHJcbiAgICB0cmFuc3BhcmVudDogYm9vbGVhbiA9IHRydWU7XHJcbn0iLCJpbXBvcnQgeyBBc3NldCB9IGZyb20gXCIuLi9Bc3NldFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVuaWNvZGVBc3NldCBleHRlbmRzIEFzc2V0IHtcclxuICAgIGNoYXJtYXA6IHN0cmluZ1tdO1xyXG4gICAgcm93czogbnVtYmVyO1xyXG4gICAgY29sczogbnVtYmVyO1xyXG4gICAgc2NhbGU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNoYXJtYXA6IHN0cmluZ1tdLCBzY2FsZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5jaGFybWFwID0gY2hhcm1hcDtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yb3dzID0gdGhpcy5jaGFybWFwLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmNvbHMgPSB0aGlzLmNoYXJtYXBbMF0ubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZSB8fCAxMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyQXQocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFybWFwW3Jvd11bY29sXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDaGFyQXQocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBjaGFyOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoYXJtYXBbcm93XSA9IHRoaXMuY2hhcm1hcFtyb3ddLnN1YnN0cigwLCBjb2wpICsgY2hhciArIHRoaXMuY2hhcm1hcFtyb3ddLnN1YnN0cihjb2wgKyBjaGFyLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93cyAqIHRoaXMuc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xzICogdGhpcy5zY2FsZTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBWaXN1YWxVdGlscyB7XHJcbiAgICBzdGF0aWMgc2hhZGVCbGVuZENvbnZlcnQocDogbnVtYmVyLCBmcm9tOiBzdHJpbmcsIHRvPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaTogRnVuY3Rpb24gPSBwYXJzZUludDtcclxuICAgICAgICBsZXQgcjogRnVuY3Rpb24gPSBNYXRoLnJvdW5kO1xyXG4gICAgICAgIGxldCBoOiBib29sZWFuID0gZnJvbS5sZW5ndGggPiA5O1xyXG4gICAgICAgIGggPSB0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIgPyB0by5sZW5ndGggPiA5ID8gdHJ1ZSA6IHRvID09PSBcImNcIiA/ICFoIDogZmFsc2UgOiBoO1xyXG4gICAgICAgIGxldCBiOiBib29sZWFuID0gcCA8IDA7XHJcbiAgICAgICAgcCA9IGIgPyBwICogLTEgOiBwO1xyXG4gICAgICAgIHRvID0gdG8gJiYgdG8gIT09IFwiY1wiID8gdG8gOiBiID8gXCIjMDAwMDAwXCIgOiBcIiNGRkZGRkZcIjtcclxuICAgICAgICBsZXQgZjogbnVtYmVyW10gPSBWaXN1YWxVdGlscy5zYmNSaXAoZnJvbSwgaSwgcik7XHJcbiAgICAgICAgbGV0IHQ6IG51bWJlcltdID0gVmlzdWFsVXRpbHMuc2JjUmlwKHRvLCBpLCByKTtcclxuXHJcbiAgICAgICAgaWYgKGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmdiKFwiICsgcigodFswXSAtIGZbMF0pICogcCArIGZbMF0pICtcclxuICAgICAgICAgICAgICAgICAgICBcIixcIiArIHIoKHRbMV0gLSBmWzFdKSAqIHAgKyBmWzFdKSArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIsXCIgKyByKCh0WzJdIC0gZlsyXSkgKiBwICsgZlsyXSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZlszXSA8IDAgJiYgdFszXSA8IDAgPyBcIilcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIixcIiArIChmWzNdID4gLTEgJiYgdFszXSA+IC0xID8gcigoKHRbM10gLSBmWzNdKSAqIHAgKyBmWzNdKSAqIDEwMDAwKSAvIDEwMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0WzNdIDwgMCA/IGZbM10gOiB0WzNdKSArIFwiKVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgICAgIHJldHVybiBcIiNcIiArICgweDEwMDAwMDAwMCArIChmWzNdID4gLTEgJiYgdFszXSA+IC0xID8gcigoKHRbM10gLSBmWzNdKSAqIHAgKyBmWzNdKSAqIDI1NSkgOiB0WzNdID4gLTEgPyByKHRbM10gKiAyNTUpIDogZlszXSA+IC0xID8gcihmWzNdICogMjU1KSA6IDI1NSkgKiAweDEwMDAwMDAgKyByKCh0WzBdIC0gZlswXSkgKiBwICsgZlswXSkgKiAweDEwMDAwICsgcigodFsxXSAtIGZbMV0pICogcCArIGZbMV0pICogMHgxMDAgKyByKCh0WzJdIC0gZlsyXSkgKiBwICsgZlsyXSkpLnRvU3RyaW5nKDE2KS5zbGljZShmWzNdID4gLTEgfHwgdFszXSA+IC0xID8gMSA6IDMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2JjUmlwKGQ6IHN0cmluZywgaTogRnVuY3Rpb24sIHI6IEZ1bmN0aW9uKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHZhciBsOiBudW1iZXIgPSBkLmxlbmd0aDtcclxuICAgICAgICB2YXIgUkdCOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAobCA+IDkpIHtcclxuICAgICAgICAgICAgdmFyIGRzOiBzdHJpbmdbXSA9IGQuc3BsaXQoXCIsXCIpO1xyXG5cclxuICAgICAgICAgICAgUkdCWzBdID0gaShkc1swXS5zbGljZSg0KSk7XHJcbiAgICAgICAgICAgIFJHQlsxXSA9IGkoZHNbMV0pLCBSR0JbMl0gPSBpKGRzWzJdKTtcclxuICAgICAgICAgICAgUkdCWzNdID0gZHNbM10gPyBwYXJzZUZsb2F0KGRzWzNdKSA6IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAobCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGQgPSBcIiNcIiArIGRbMV0gKyBkWzFdICsgZFsyXSArIGRbMl0gKyBkWzNdICsgZFszXSArIChsID4gNCA/IGRbNF0gKyBcIlwiICsgZFs0XSA6IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZHNpOiBudW1iZXIgPSBpKGQuc2xpY2UoMSksIDE2KTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWJpdHdpc2VcclxuICAgICAgICAgICAgUkdCWzBdID0gZHNpID4+IDE2ICYgMjU1O1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxyXG4gICAgICAgICAgICBSR0JbMV0gPSBkc2kgPj4gOCAmIDI1NSwgUkdCWzJdID0gZHNpICYgMjU1O1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxyXG4gICAgICAgICAgICBSR0JbM10gPSBsID09PSA5IHx8IGwgPT09IDUgPyByKCgoZHNpID4+IDI0ICYgMjU1KSAvIDI1NSkgKiAxMDAwMCkgLyAxMDAwMCA6IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFJHQjtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwiLi9SZW5kZXJpbmcvSW1hZ2VBc3NldFwiO1xyXG5pbXBvcnQgeyBHTE9CQUxfQVNTRVRTIH0gZnJvbSBcIi4vR2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBSZW5kZXJlck9wdGlvbnMgfSBmcm9tIFwiLi9SZW5kZXJpbmcvUmVuZGVyZXJPcHRpb25zXCI7XHJcbmltcG9ydCB7IEdhbWVNYXAgfSBmcm9tIFwiLi9HYW1lTWFwXCI7XHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllclwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL1BvaW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVUkge1xyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gICAgbWFwOiBHYW1lTWFwO1xyXG4gICAgcGxheWVyOiBQbGF5ZXI7XHJcbiAgICBtaW5pbWFwT2Zmc2V0OiB7IHg6IG51bWJlciwgeTogbnVtYmVyfTtcclxuICAgIG1pbmltYXBTY2FsZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hcDogR2FtZU1hcCwgcGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcclxuICAgICAgICBpZiAoY29udGFpbmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93KFwiQ29udGFpbmVyIGVsZW1lbnQgY291bGQgbm90IGJlIGZvdW5kXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlbmRlcmVyT3B0aW9uczogUmVuZGVyZXJPcHRpb25zID0gbmV3IFJlbmRlcmVyT3B0aW9ucygpO1xyXG4gICAgICAgIHJlbmRlcmVyT3B0aW9ucy5jYW52YXNJZCA9IFwidWlTY3JlZW5cIjtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcihjb250YWluZXIsIHJlbmRlcmVyT3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5taW5pbWFwT2Zmc2V0ID0ge1xyXG4gICAgICAgICAgICB4OiA0MCxcclxuICAgICAgICAgICAgeTogNDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubWluaW1hcFNjYWxlID0gNDtcclxuICAgICAgICBHTE9CQUxfQVNTRVRTLnB1c2gobmV3IEltYWdlQXNzZXQoXCJndW5fc3ByaXRlXCIsIFwiLi9zcHJpdGVzL3Nob3RndW4ucG5nXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TWluaU1hcChtaWRkbGVDb3JyZGluYXRlczogUG9pbnQsIHVuaXRzOiBQb2ludFtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRGaWxsU3R5bGUoXCJ3aGl0ZVwiKTtcclxuICAgICAgICBmb3IgKGxldCBueDogbnVtYmVyID0gMDsgbnggPCB0aGlzLm1hcC5tYXBXaWR0aDsgbngrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBueTogbnVtYmVyID0gMDsgbnkgPCB0aGlzLm1hcC5tYXBIZWlnaHQ7IG55KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcC5zdXJmYWNlW255ICogdGhpcy5tYXAubWFwV2lkdGggKyBueF0gPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobnggKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG55ICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWluaW1hcFNjYWxlLCB0aGlzLm1pbmltYXBTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih1bml0cy5maWx0ZXIoKHUpID0+IHUueCA9PT0gbnggJiYgdS55ID09PSBueSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RmlsbFN0eWxlKFwieWVsbG93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUmVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG54ICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChueSAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbmltYXBTY2FsZSwgdGhpcy5taW5pbWFwU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RmlsbFN0eWxlKFwid2hpdGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRGaWxsU3R5bGUoXCJyZWRcIik7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KFxyXG4gICAgICAgICAgICAodGhpcy5wbGF5ZXIucG9zWCAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC54LFxyXG4gICAgICAgICAgICAodGhpcy5wbGF5ZXIucG9zWSAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC55LFxyXG4gICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAyKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJMaW5lKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogKHRoaXMucGxheWVyLnBvc1ggKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgIHk6ICh0aGlzLnBsYXllci5wb3NZICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LnlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NYICsgbWlkZGxlQ29ycmRpbmF0ZXMueCAqIDUpICogdGhpcy5taW5pbWFwU2NhbGUgKyB0aGlzLm1pbmltYXBPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgIHk6IE1hdGguZmxvb3IodGhpcy5wbGF5ZXIucG9zWSArIG1pZGRsZUNvcnJkaW5hdGVzLnkgKiA1KSAqIHRoaXMubWluaW1hcFNjYWxlICsgdGhpcy5taW5pbWFwT2Zmc2V0LnksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLCBcInJlZFwiKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZShcImJsYWNrXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRyYXdVSShtaWRkbGVDb3JyZGluYXRlczogUG9pbnQsIHVuaXRzOiBQb2ludFtdKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5jbGVhckFsbCgpO1xyXG4gICAgICAgIHRoaXMuZHJhd01pbmlNYXAobWlkZGxlQ29ycmRpbmF0ZXMsIHVuaXRzKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZShcIndoaXRlXCIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUmVjdCh0aGlzLnJlbmRlcmVyLmdldFdpZHRoKCkgLyAyIC0gMTUsIHRoaXMucmVuZGVyZXIuZ2V0SGVpZ2h0KCkgLyAyIC0gMiwgMzAsIDQpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUmVjdCh0aGlzLnJlbmRlcmVyLmdldFdpZHRoKCkgLyAyIC0gMiwgdGhpcy5yZW5kZXJlci5nZXRIZWlnaHQoKSAvIDIgLSAxNSwgNCwgMzApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgR2V0QXNzZXQgfSBmcm9tIFwiLi9HbG9iYWxzXCI7XHJcbmltcG9ydCB7IFVuaWNvZGVBc3NldCB9IGZyb20gXCIuL1JlbmRlcmluZy9Vbmljb2RlQXNzZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbml0IHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG5cdHZ4OiBudW1iZXI7XHJcblx0dnk6IG51bWJlcjtcclxuXHRyZW1vdmU6IGJvb2xlYW47XHJcblx0YXNzZXQ6IFVuaWNvZGVBc3NldDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgdng6IG51bWJlciwgdnk6IG51bWJlciwgYXNzZXQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cdFx0dGhpcy52eCA9IHZ4O1xyXG5cdFx0dGhpcy52eSA9IHZ5O1xyXG5cdFx0dGhpcy5yZW1vdmUgPSBmYWxzZTtcclxuXHRcdGlmKHR5cGVvZiBhc3NldCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhc3NldCAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLmFzc2V0ID0gR2V0QXNzZXQoYXNzZXQpO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsIi8qKlxyXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGF0cyB7XHJcblx0Y29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHRtb2RlOiBudW1iZXI7XHJcblx0cmV2aXNpb246IG51bWJlciA9IDE2O1xyXG5cdGJlZ2luVGltZTogbnVtYmVyO1xyXG5cdGZyYW1lczogbnVtYmVyO1xyXG5cdGZwc1BhbmVsOiBQYW5lbDtcclxuXHRtc1BhbmVsOiBQYW5lbDtcclxuXHRtZW1QYW5lbDogUGFuZWw7XHJcblx0cHJldlRpbWU6IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLm1vZGUgPSAwO1xyXG5cclxuXHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdHRoaXMuY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwXCI7XHJcblx0XHR0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBFdmVudCkgPT4gIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0dGhpcy5zaG93UGFuZWwoKyt0aGlzLm1vZGUgJSB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGgpO1xyXG5cdFx0fSwgZmFsc2UgKTtcclxuXHJcblx0XHR0aGlzLmJlZ2luVGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xyXG5cdFx0dGhpcy5wcmV2VGltZSA9IHRoaXMuYmVnaW5UaW1lO1xyXG5cdFx0dGhpcy5mcmFtZXMgPSAwO1xyXG5cclxuXHRcdHRoaXMuZnBzUGFuZWwgPSB0aGlzLmFkZFBhbmVsKCBuZXcgUGFuZWwoIFwiRlBTXCIsIFwiIzBmZlwiLCBcIiMwMDJcIiApICk7XHJcblx0XHR0aGlzLm1zUGFuZWwgPSB0aGlzLmFkZFBhbmVsKCBuZXcgUGFuZWwoIFwiTVNcIiwgXCIjMGYwXCIsIFwiIzAyMFwiICkgKTtcclxuXHJcblx0XHR0aGlzLnNob3dQYW5lbCgwKTtcclxuXHR9XHJcblxyXG5cdGFkZFBhbmVsKHBhbmVsOiBQYW5lbCk6IFBhbmVsIHtcclxuXHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKCBwYW5lbC5jYW52YXMgKTtcclxuXHJcblx0XHRyZXR1cm4gcGFuZWw7XHJcblx0fVxyXG5cclxuXHRzaG93UGFuZWwoaWQ6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgdGhpcy5jb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xyXG5cdFx0XHR2YXIgZWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5jb250YWluZXIuY2hpbGRyZW5baV07XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5tb2RlID0gaWQ7XHJcblx0fVxyXG5cclxuXHRiZWdpbigpOiB2b2lkIHtcclxuXHJcblx0XHR0aGlzLmJlZ2luVGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xyXG5cclxuXHR9XHJcblxyXG5cdGVuZCgpOiBudW1iZXIge1xyXG5cclxuXHRcdHRoaXMuZnJhbWVzKys7XHJcblxyXG5cdFx0dmFyIHRpbWU6IG51bWJlciA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xyXG5cclxuXHRcdHRoaXMubXNQYW5lbC51cGRhdGUoIHRpbWUgLSB0aGlzLmJlZ2luVGltZSwgMjAwICk7XHJcblxyXG5cdFx0aWYgKCB0aW1lID49IHRoaXMucHJldlRpbWUgKyAxMDAwICkge1xyXG5cclxuXHRcdFx0dGhpcy5mcHNQYW5lbC51cGRhdGUoICggdGhpcy5mcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSB0aGlzLnByZXZUaW1lICksIDEwMCApO1xyXG5cclxuXHRcdFx0dGhpcy5wcmV2VGltZSA9IHRpbWU7XHJcblx0XHRcdHRoaXMuZnJhbWVzID0gMDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRpbWU7XHJcblxyXG5cdH1cclxuXHJcblx0dXBkYXRlKCk6IHZvaWQge1xyXG5cclxuXHRcdHRoaXMuYmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcclxuXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBQYW5lbCB7XHJcblx0bWluOiBudW1iZXI7XHJcblx0bWF4OiBudW1iZXI7XHJcblx0Y29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbDtcclxuXHRiZzogc3RyaW5nO1xyXG5cdGZnOiBzdHJpbmc7XHJcblx0V0lEVEg6IG51bWJlcjtcclxuXHRIRUlHSFQ6IG51bWJlcjtcclxuXHRURVhUX1g6IG51bWJlcjtcclxuXHRURVhUX1k6IG51bWJlcjtcclxuXHRHUkFQSF9YOiBudW1iZXI7XHJcblx0R1JBUEhfWTogbnVtYmVyO1xyXG5cdEdSQVBIX1dJRFRIOiBudW1iZXI7XHJcblx0R1JBUEhfSEVJR0hUOiBudW1iZXI7XHJcblx0Y2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHRQUjogbnVtYmVyO1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBmZzogc3RyaW5nLCBiZzogc3RyaW5nKSB7XHJcblx0XHR0aGlzLm1pbiA9IEluZmluaXR5O1xyXG5cdFx0dGhpcy5tYXggPSAwO1xyXG5cdFx0dGhpcy5mZyA9IGZnO1xyXG5cdFx0dGhpcy5iZyA9IGJnO1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHJcblx0XHR0aGlzLlBSID0gTWF0aC5yb3VuZCggd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSApO1xyXG5cclxuXHRcdHRoaXMuV0lEVEggPSA4MCAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkhFSUdIVCA9IDQ4ICogdGhpcy5QUjtcclxuXHRcdHRoaXMuVEVYVF9YID0gMyAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLlRFWFRfWSA9IDIgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5HUkFQSF9YID0gMyAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkdSQVBIX1kgPSAxNSAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkdSQVBIX1dJRFRIID0gNzQgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5HUkFQSF9IRUlHSFQgPSAzMCAqIHRoaXMuUFI7XHJcblxyXG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImNhbnZhc1wiICk7XHJcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuV0lEVEg7XHJcblx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLkhFSUdIVDtcclxuXHRcdHRoaXMuY2FudmFzLnN0eWxlLmNzc1RleHQgPSBcIndpZHRoOjgwcHg7aGVpZ2h0OjQ4cHhcIjtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCBcIjJkXCIgKTtcclxuXHJcblx0XHRpZiAodGhpcy5jb250ZXh0ICE9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuY29udGV4dC5mb250ID0gXCJib2xkIFwiICsgKCA5ICogdGhpcy5QUiApICsgXCJweCBIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZlwiO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcclxuXHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBiZztcclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxSZWN0KCAwLCAwLCB0aGlzLldJRFRILCB0aGlzLkhFSUdIVCApO1xyXG5cclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFRleHQoIG5hbWUsIHRoaXMuVEVYVF9YLCB0aGlzLlRFWFRfWSApO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoIHRoaXMuR1JBUEhfWCwgdGhpcy5HUkFQSF9ZLCB0aGlzLkdSQVBIX1dJRFRILCB0aGlzLkdSQVBIX0hFSUdIVCApO1xyXG5cclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsUmVjdCggdGhpcy5HUkFQSF9YLCB0aGlzLkdSQVBIX1ksIHRoaXMuR1JBUEhfV0lEVEgsIHRoaXMuR1JBUEhfSEVJR0hUICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGUgKHZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmNvbnRleHQgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIHZhbHVlICk7XHJcblx0XHR0aGlzLm1heCA9IE1hdGgubWF4KHRoaXMubWF4LCB2YWx1ZSApO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJnO1xyXG5cdFx0dGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcclxuXHRcdHRoaXMuY29udGV4dC5maWxsUmVjdCggMCwgMCwgdGhpcy5XSURUSCwgdGhpcy5HUkFQSF9ZICk7XHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5mZztcclxuXHRcdHRoaXMuY29udGV4dC5maWxsVGV4dChcclxuXHRcdFx0TWF0aC5yb3VuZCggdmFsdWUgKSArIFwiIFwiICsgdGhpcy5uYW1lICsgXCIgKFwiICsgTWF0aC5yb3VuZCggdGhpcy5taW4gKSArIFwiLVwiICsgTWF0aC5yb3VuZCggdGhpcy5tYXggKSArIFwiKVwiLCB0aGlzLlRFWFRfWCwgdGhpcy5URVhUX1kgKTtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxyXG5cdFx0XHR0aGlzLmNhbnZhcywgdGhpcy5HUkFQSF9YICsgdGhpcy5QUiwgdGhpcy5HUkFQSF9ZLCB0aGlzLkdSQVBIX1dJRFRIIC0gdGhpcy5QUiwgdGhpcy5HUkFQSF9IRUlHSFQsXHJcblx0XHRcdHRoaXMuR1JBUEhfWCwgdGhpcy5HUkFQSF9ZLCB0aGlzLkdSQVBIX1dJRFRIIC0gdGhpcy5QUiwgdGhpcy5HUkFQSF9IRUlHSFQgKTtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoIHRoaXMuR1JBUEhfWCArIHRoaXMuR1JBUEhfV0lEVEggLSB0aGlzLlBSLCB0aGlzLkdSQVBIX1ksIHRoaXMuUFIsIHRoaXMuR1JBUEhfSEVJR0hUICk7XHJcblxyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmc7XHJcblx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoXHJcblx0XHRcdHRoaXMuR1JBUEhfWCArIHRoaXMuR1JBUEhfV0lEVEggLSB0aGlzLlBSLCB0aGlzLkdSQVBIX1ksIHRoaXMuUFIsIE1hdGgucm91bmQoICggMSAtICggdmFsdWUgLyBtYXhWYWx1ZSApICkgKiB0aGlzLkdSQVBIX0hFSUdIVCApICk7XHJcblxyXG5cdH1cclxufSIsImltcG9ydCB7IEdhbWVNYXAgfSBmcm9tIFwiLi9HYW1lTWFwXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbWFwMSA6IEdhbWVNYXAgPSB7XHJcbiAgICBtYXBIZWlnaHQ6IDMyLFxyXG4gICAgbWFwV2lkdGg6IDMyLFxyXG4gICAgc3VyZmFjZTogXCJcIlxyXG59O1xyXG5cclxubWFwMS5zdXJmYWNlID0gIFwiIyMjIyMjIyMjLi4uLi4uLiMjIyMjIyMjIy4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLiMuLi4uLi4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4jIyMjIyMjIyMuLi4uLi4uIyMjIyMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMuLi4uLi4uLi4uLi4uIyMjLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLiMjIyMuLi4uLi4uLi4uLi4jIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uIyMjIyMuLi4uLi4uLi4uLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4jIyMjLi4uLiMjIyMjIyMjLi4uLiMjIyMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjIy4jIyMjLi4uLi4uLiMjIyMjIy4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLiMuLi4uLi4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4jIyMjIyMjIyMuLi4uLi4uIyMuLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4uIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMuLi4uLi4uLi4uLi4uIyMjLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLiMjIyMuLi4uLi4uLi4uLi4jIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcIjsiLCJpbXBvcnQgeyBDb250cm9scyB9IGZyb20gXCIuL0NvbnRyb2xzXCI7XHJcbmltcG9ydCB7IFVJIH0gZnJvbSBcIi4vVUlcIjtcclxuXHJcbmltcG9ydCB7IFN0YXRzIH0gZnJvbSBcIi4vVXRpbHMvU3RhdHNcIjtcclxuaW1wb3J0IHsgbWFwMSB9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcIi4vUmVuZGVyaW5nL0ltYWdlQXNzZXRcIjtcclxuaW1wb3J0IHsgR0xPQkFMX0FTU0VUUyB9IGZyb20gXCIuL0dsb2JhbHNcIjtcclxuaW1wb3J0IHsgVW5pdCB9IGZyb20gXCIuL1VuaXRcIjtcclxuaW1wb3J0IHsgVW5pY29kZUFzc2V0IH0gZnJvbSBcIi4vUmVuZGVyaW5nL1VuaWNvZGVBc3NldFwiO1xyXG5pbXBvcnQgeyBGaWxlTG9hZGVyIH0gZnJvbSBcIi4vRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuL1JlbmRlcmluZy9SZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBOb3QzRCB9IGZyb20gXCIuL05vdDNEXCI7XHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllclwiO1xyXG5pbXBvcnQgeyBHYW1lTWFwIH0gZnJvbSBcIi4vR2FtZU1hcFwiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL1BvaW50XCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyT3B0aW9ucyB9IGZyb20gXCIuL1JlbmRlcmluZy9SZW5kZXJlck9wdGlvbnNcIjtcclxuaW1wb3J0IHsgSU1vdmVtZW50IH0gZnJvbSBcIi4vSU1vdmVtZW50XCI7XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAgIGVuZ2luZTogTm90M0Q7XHJcbiAgICBzdGF0czogU3RhdHM7XHJcbiAgICByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgICBmRk9WOiBudW1iZXI7XHJcbiAgICBmU3BlZWQ6IG51bWJlcjtcclxuICAgIGZEZXB0aDogbnVtYmVyO1xyXG4gICAgc2NyZWVuV2lkdGg6IG51bWJlcjtcclxuICAgIHNjcmVlbkhlaWdodDogbnVtYmVyO1xyXG4gICAgZkRlcHRoQnVmZmVyOiBudW1iZXJbXTtcclxuICAgIHBsYXllcjogUGxheWVyO1xyXG4gICAgbWFwOiBHYW1lTWFwO1xyXG4gICAgdWk6IFVJO1xyXG4gICAgbWlkZGxlQ29ycmRpbmF0ZXM6IFBvaW50O1xyXG4gICAgdW5pdHM6IFVuaXRbXTtcclxuICAgIG5DZWlsaW5nOiBudW1iZXI7XHJcbiAgICBuRmxvb3I6IG51bWJlcjtcclxuICAgIGNvbnRyb2xzOiBDb250cm9scztcclxuICAgIHdhbGw6IEltYWdlQXNzZXQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cygpO1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmIChjb250YWluZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyhcIkNvbnRhaW5lciBlbGVtZW50IG5vdCBmb3VuZCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IE5vdDNEKGNvbnRhaW5lciwgbmV3IFJlbmRlcmVyT3B0aW9ucygpLCB0aGlzLnN0YXRzKTtcclxuICAgICAgICAvLyBiZW5jaG1hcmsgc2NyaXB0XHJcbiAgICAgICAgdGhpcy5zdGF0cy5zaG93UGFuZWwoMCk7IC8vIDA6IGZwcywgMTogbXMsIDI6IG1iLCAzKzogY3VzdG9tXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggdGhpcy5zdGF0cy5jb250YWluZXIgKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IHRoaXMuZW5naW5lLnJlbmRlcmVyO1xyXG5cclxuICAgICAgICB0aGlzLmZGT1YgPSBNYXRoLlBJIC8gNC4wO1x0Ly8gZmllbGQgb2YgVmlld1xyXG4gICAgICAgIHRoaXMuZlNwZWVkID0gMjtcclxuICAgICAgICB0aGlzLmZEZXB0aCA9IDI1O1x0XHRcdC8vIG1heGltdW0gcmVuZGVyaW5nIGRpc3RhbmNlXHJcblxyXG4gICAgICAgIHRoaXMuc2NyZWVuV2lkdGggPSB0aGlzLnJlbmRlcmVyLmdldFdpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5zY3JlZW5IZWlnaHQgPSB0aGlzLnJlbmRlcmVyLmdldEhlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuZkRlcHRoQnVmZmVyID0gW107XHJcblxyXG4gICAgICAgIHRoaXMucGxheWVyID0ge1xyXG4gICAgICAgICAgICBwb3NYOiA3LjE4MzgwMDUxNzYyODg5NSxcclxuICAgICAgICAgICAgcG9zWTogOS45MjAxNzIwNTI3MDYxMjUsXHJcbiAgICAgICAgICAgIGFuZ2xlOiAwLjUwMDAwMDAwMDAwMDAwMjMsXHJcbiAgICAgICAgICAgIHlBbmdsZTogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubWFwID0gbWFwMTtcclxuICAgICAgICB0aGlzLnVpID0gbmV3IFVJKHRoaXMubWFwLCB0aGlzLnBsYXllcik7XHJcbiAgICAgICAgdGhpcy5taWRkbGVDb3JyZGluYXRlcyA9IG5ldyBQb2ludDtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMud2FsbCA9IG5ldyBJbWFnZUFzc2V0KFwid2FsbF9zcHJpdGVcIiwgXCIuL3Nwcml0ZXMvd2FsbDMuanBnXCIpO1xyXG4gICAgICAgIEdMT0JBTF9BU1NFVFMucHVzaCh0aGlzLndhbGwpO1xyXG5cclxuICAgICAgICB0aGlzLnVuaXRzID0gW107XHJcblxyXG4gICAgICAgIGxldCBsYW1wVGV4dDogc3RyaW5nID0gYXdhaXQgRmlsZUxvYWRlci5sb2FkSlNPTihcIi4uL2Fzc2V0cy9vYmplY3RzL2xhbXAuanNvblwiKTtcclxuICAgICAgICBHTE9CQUxfQVNTRVRTLnB1c2gobmV3IFVuaWNvZGVBc3NldChcImxhbXBfY21cIiwgSlNPTi5wYXJzZShsYW1wVGV4dCksIDAuNSkpO1xyXG4gICAgICAgIHRoaXMudW5pdHMucHVzaChuZXcgVW5pdCgxMSwgMTQsIDAsIDAsIFwibGFtcF9jbVwiKSk7XHJcblxyXG4gICAgICAgIGxldCByb2NrZXRUZXh0OiBzdHJpbmcgPSBhd2FpdCBGaWxlTG9hZGVyLmxvYWRKU09OKFwiLi4vYXNzZXRzL29iamVjdHMvcm9ja2V0Lmpzb25cIik7XHJcbiAgICAgICAgR0xPQkFMX0FTU0VUUy5wdXNoKG5ldyBVbmljb2RlQXNzZXQoXCJyb2NrZXRcIiwgSlNPTi5wYXJzZShyb2NrZXRUZXh0KSwgMC41KSk7XHJcblxyXG4gICAgICAgIHRoaXMuZW5naW5lLnNldExvb3AoKCkgPT4geyB0aGlzLm1vdmUoKTsgfSk7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUuc3RhcnQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmJlZ2luT2ZmU2NyZWVuKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci55QW5nbGUgPSB0aGlzLnBsYXllci55QW5nbGU7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJHbG9iYWxzKCk7XHJcblxyXG4gICAgICAgIHRoaXMubWFpblNjcmVlbigwLCB0aGlzLnNjcmVlbldpZHRoKTtcclxuICAgICAgICB0aGlzLmhhbmRsZU9iamVjdHMoKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmVuZE9mZlNjcmVlbigpO1xyXG5cclxuICAgICAgICB0aGlzLnVpLmRyYXdVSSh0aGlzLm1pZGRsZUNvcnJkaW5hdGVzLCB0aGlzLnVuaXRzKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWluU2NyZWVuKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgbGV0IGZSYXlBbmdsZTogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgc3RlcFNpemU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlVG9XYWxsOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBiSGl0V2FsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBleWVYOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBleWVZOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBuVGVzdFg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG5UZXN0WTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gZnJvbTsgaSA8IHRvOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgZlJheUFuZ2xlID0gKHRoaXMucGxheWVyLmFuZ2xlIC0gdGhpcy5mRk9WIC8gMi4wKSArIChpIC8gdGhpcy5zY3JlZW5XaWR0aCkgKiB0aGlzLmZGT1Y7XHJcbiAgICAgICAgICAgIHN0ZXBTaXplID0gMC4wNTtcclxuICAgICAgICAgICAgZGlzdGFuY2VUb1dhbGwgPSAwLjA7XHJcbiAgICAgICAgICAgIGJIaXRXYWxsID0gZmFsc2U7XHRcdC8vIHNldCB3aGVuIHJheSBoaXRzIHdhbGwgYmxvY2tcclxuICAgICAgICAgICAgZXllWCA9IE1hdGguc2luKGZSYXlBbmdsZSk7IC8vIHVuaXQgdmVjdG9yIGZvciByYXkgaW4gcGxheWVyIHNwYWNlXHJcbiAgICAgICAgICAgIGV5ZVkgPSBNYXRoLmNvcyhmUmF5QW5nbGUpO1xyXG4gICAgICAgICAgICBpZihpID09PSB0byAvIDIpIHsgdGhpcy5taWRkbGVDb3JyZGluYXRlcyA9IHt4OiBleWVYLCB5OiBleWVZfTsgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZTYW1wbGVYOiBudW1iZXIgPSAwLjA7XHJcbiAgICAgICAgICAgIC8vIGluY3JlbWVudGFsbHkgY2FzdCByYXkgZnJvbSBwbGF5ZXIsIGFsb25nIHJheSBhbmdsZSwgdGVzdGluZyBmb3JcclxuICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uIHdpdGggYSBibG9ja1xyXG4gICAgICAgICAgICB3aGlsZSAoIWJIaXRXYWxsICYmIGRpc3RhbmNlVG9XYWxsIDwgdGhpcy5mRGVwdGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZVRvV2FsbCArPSBzdGVwU2l6ZTtcclxuICAgICAgICAgICAgICAgIG5UZXN0WCA9IE1hdGguZmxvb3IodGhpcy5wbGF5ZXIucG9zWCArIGV5ZVggKiBkaXN0YW5jZVRvV2FsbCk7XHJcbiAgICAgICAgICAgICAgICBuVGVzdFkgPSBNYXRoLmZsb29yKHRoaXMucGxheWVyLnBvc1kgKyBleWVZICogZGlzdGFuY2VUb1dhbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRlc3QgaWYgcmF5IGlzIG91dCBvZiBib3VuZHNcclxuICAgICAgICAgICAgICAgIGlmIChuVGVzdFggPCAwIHx8IG5UZXN0WCA+PSB0aGlzLm1hcC5tYXBXaWR0aCB8fCBuVGVzdFkgPCAwIHx8IG5UZXN0WSA+PSB0aGlzLm1hcC5tYXBIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBiSGl0V2FsbCA9IHRydWU7XHRcdFx0Ly8ganVzdCBzZXQgZGlzdGFuY2UgdG8gbWF4aW11bSBkZXB0aFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlVG9XYWxsID0gdGhpcy5mRGVwdGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJheSBpcyBpbmJvdW5kcyBzbyB0ZXN0IHRvIHNlZSBpZiB0aGUgcmF5IGNlbGwgaXMgYSB3YWxsIGJsb2NrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwLnN1cmZhY2VbTWF0aC5yb3VuZChuVGVzdFggKiB0aGlzLm1hcC5tYXBXaWR0aCArIG5UZXN0WSldID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByYXkgaGFzIGhpdCB3YWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJIaXRXYWxsID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGVyZSByYXkgaGFzIGhpdCB3YWxsLiBCcmVhayBCbG9jayBib3VuZGFyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnQgNCBsaW5lIHNlZ21lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmQmxvY2tNaWRYOiBudW1iZXIgPSBuVGVzdFggKyAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmQmxvY2tNaWRZOiBudW1iZXIgPSBuVGVzdFkgKyAwLjU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZlRlc3RQb2ludFg6IG51bWJlciA9IHRoaXMucGxheWVyLnBvc1ggKyBleWVYICogZGlzdGFuY2VUb1dhbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmVGVzdFBvaW50WTogbnVtYmVyID0gdGhpcy5wbGF5ZXIucG9zWSArIGV5ZVkgKiBkaXN0YW5jZVRvV2FsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmVGVzdEFuZ2xlOiBudW1iZXIgPSBNYXRoLmF0YW4yKChmVGVzdFBvaW50WSAtIGZCbG9ja01pZFkpLCAoZlRlc3RQb2ludFggLSBmQmxvY2tNaWRYKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZlRlc3RBbmdsZSA+PSAtMy4xNDE1OSAqIDAuMjUgJiYgZlRlc3RBbmdsZSA8IDMuMTQxNTkgKiAwLjI1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmU2FtcGxlWCA9IGZUZXN0UG9pbnRZIC0gblRlc3RZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmVGVzdEFuZ2xlID49IDMuMTQxNTkgKiAwLjI1ICYmIGZUZXN0QW5nbGUgPCAzLjE0MTU5ICogMC43NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZlNhbXBsZVggPSBmVGVzdFBvaW50WCAtIG5UZXN0WDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZlRlc3RBbmdsZSA8IC0zLjE0MTU5ICogMC4yNSAmJiBmVGVzdEFuZ2xlID49IC0zLjE0MTU5ICogMC43NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZlNhbXBsZVggPSBmVGVzdFBvaW50WCAtIG5UZXN0WDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZlRlc3RBbmdsZSA+PSAzLjE0MTU5ICogMC43NSB8fCBmVGVzdEFuZ2xlIDwgLTMuMTQxNTkgKiAwLjc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmU2FtcGxlWCA9IGZUZXN0UG9pbnRZIC0gblRlc3RZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZTYW1wbGVYICo9IDEwMDtcclxuICAgICAgICAgICAgZlNhbXBsZVggPSBNYXRoLmZsb29yKGZTYW1wbGVYIC8gKDEwMCAvIDI4OCkpO1xyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgZGlzdGFuY2UgdG8gY2VpbGluZyBhbmQgZmxvb3JcclxuICAgICAgICAgICAgdGhpcy5uQ2VpbGluZyA9ICh0aGlzLnNjcmVlbkhlaWdodCAvIDIuMCkgLSAodGhpcy5zY3JlZW5IZWlnaHQgLyBkaXN0YW5jZVRvV2FsbCk7XHJcbiAgICAgICAgICAgIHRoaXMubkZsb29yID0gdGhpcy5zY3JlZW5IZWlnaHQgLSB0aGlzLm5DZWlsaW5nO1xyXG5cclxuICAgICAgICAgICAgLy8gc2hhZGVyIHdhbGxzIGJhc2VkIG9uIGRpc3RhbmNlXHJcbiAgICAgICAgICAgIGxldCBzaGFkZUxldmVsOiBudW1iZXIgPSBwYXJzZUZsb2F0KChkaXN0YW5jZVRvV2FsbCAqIDAuMSkudG9GaXhlZCgyKSk7XHJcblx0XHRcdHRoaXMuZkRlcHRoQnVmZmVyW2ldID0gZGlzdGFuY2VUb1dhbGw7XHJcblx0XHRcdHRoaXMuZkRlcHRoQnVmZmVyW2kgKyAxXSA9IGRpc3RhbmNlVG9XYWxsO1xyXG5cdFx0XHR0aGlzLmZEZXB0aEJ1ZmZlcltpICsgMl0gPSBkaXN0YW5jZVRvV2FsbDtcclxuXHJcbiAgICAgICAgICAgIGxldCBoZWlnaHRUb0RyYXc6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdFk6IG51bWJlciA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5OiBudW1iZXIgPSAwOyB5IDwgdGhpcy5zY3JlZW5IZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gZWFjaCBSb3dcclxuICAgICAgICAgICAgICAgIGlmICh5IDw9IHRoaXMubkNlaWxpbmcpIHsgLy8gcm9vZlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh5ID4gdGhpcy5uQ2VpbGluZyAmJiB5IDw9IHRoaXMubkZsb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0VG9EcmF3ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RZID0gZmlyc3RZID09PSAtMSA/IHkgOiBmaXJzdFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVySW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIFg6IGZTYW1wbGVYLCBZOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFc6IDMsIEg6IDI4OCxcclxuICAgICAgICAgICAgICAgICAgICBpOiB0aGlzLndhbGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpLCBmaXJzdFksXHJcbiAgICAgICAgICAgICAgICAzLCBoZWlnaHRUb0RyYXcsIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZUxldmVsOiBzaGFkZUxldmVsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT2JqZWN0cygpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy51bml0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0OiBVbml0ID0gdGhpcy51bml0c1tpXTtcclxuXHRcdFx0Ly8gdXBkYXRlIE9iamVjdCBQaHlzaWNzXHJcblx0XHRcdG9iamVjdC54ICs9IG9iamVjdC52eCAqIDAuNTtcclxuXHRcdFx0b2JqZWN0LnkgKz0gb2JqZWN0LnZ5ICogMC41O1xyXG5cclxuXHRcdFx0Ly8gY2hlY2sgaWYgb2JqZWN0IGlzIGluc2lkZSB3YWxsIC0gc2V0IGZsYWcgZm9yIHJlbW92YWxcclxuXHRcdFx0aWYgKHRoaXMubWFwLnN1cmZhY2Vbb2JqZWN0LnggKiB0aGlzLm1hcC5tYXBXaWR0aCArIG9iamVjdC55XSA9PT0gXCIjXCIpIHtcclxuXHRcdFx0XHRvYmplY3QucmVtb3ZlID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gY2FuIG9iamVjdCBiZSBzZWVuP1xyXG5cdFx0XHRsZXQgZlZlY1g6IG51bWJlciA9IChvYmplY3QueCkgLSB0aGlzLnBsYXllci5wb3NYO1xyXG4gICAgICAgICAgICBsZXQgZlZlY1k6IG51bWJlciA9IChvYmplY3QueSkgLSB0aGlzLnBsYXllci5wb3NZO1xyXG5cdFx0XHRsZXQgZkRpc3RhbmNlRnJvbVBsYXllcjogbnVtYmVyID0gTWF0aC5oeXBvdChmVmVjWCwgZlZlY1kpO1xyXG5cclxuXHRcdFx0bGV0IGZFeWVYOiBudW1iZXIgPSBNYXRoLnNpbih0aGlzLnBsYXllci5hbmdsZSk7XHJcblx0XHRcdGxldCBmRXllWTogbnVtYmVyID0gTWF0aC5jb3ModGhpcy5wbGF5ZXIuYW5nbGUpO1xyXG5cclxuXHRcdFx0Ly8gY2FsY3VsYXRlIGFuZ2xlIGJldHdlZW4gbGFtcCBhbmQgcGxheWVycyBmZWV0LCBhbmQgcGxheWVycyBsb29raW5nIGRpcmVjdGlvblxyXG5cdFx0XHQvLyB0byBkZXRlcm1pbmUgaWYgdGhlIGxhbXAgaXMgaW4gdGhlIHBsYXllcnMgZmllbGQgb2Ygdmlld1xyXG5cdFx0XHRsZXQgZk9iamVjdEFuZ2xlOiBudW1iZXIgPSBNYXRoLmF0YW4yKGZFeWVZLCBmRXllWCkgLSBNYXRoLmF0YW4yKGZWZWNZLCBmVmVjWCk7XHJcblx0XHRcdGlmIChmT2JqZWN0QW5nbGUgPCAtTWF0aC5QSSkge1xyXG5cdFx0XHRcdGZPYmplY3RBbmdsZSArPSAyLjAgKiBNYXRoLlBJO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChmT2JqZWN0QW5nbGUgPiBNYXRoLlBJKSB7XHJcbiAgICAgICAgICAgICAgICBmT2JqZWN0QW5nbGUgLT0gMi4wICogTWF0aC5QSTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGJJblBsYXllckZPVjogYm9vbGVhbiA9IE1hdGguYWJzKGZPYmplY3RBbmdsZSkgPCAodGhpcy5mRk9WKSAvIDI7XHJcbiAgICAgICAgICAgIGxldCBzaGFkZUxldmVsOiBzdHJpbmcgPSAoZkRpc3RhbmNlRnJvbVBsYXllciAqIDAuMSkudG9GaXhlZCgyKTtcclxuXHJcblx0XHRcdGlmIChiSW5QbGF5ZXJGT1YgJiYgZkRpc3RhbmNlRnJvbVBsYXllciA+PSAwLjUgJiYgZkRpc3RhbmNlRnJvbVBsYXllciA8IHRoaXMuZkRlcHRoICYmICFvYmplY3QucmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0T0RPOiBGaXggdGhpc1xyXG4gICAgICAgICAgICAgICAgbGV0IGZPYmplY3RDZWlsaW5nOiBudW1iZXIgPSAodGhpcy5zY3JlZW5IZWlnaHQgLyAyLjApIC0gdGhpcy5zY3JlZW5IZWlnaHQgLyAoZkRpc3RhbmNlRnJvbVBsYXllcik7XHJcblx0XHRcdFx0bGV0IGZPYmplY3RGbG9vcjogbnVtYmVyID0gdGhpcy5zY3JlZW5IZWlnaHQgLSBmT2JqZWN0Q2VpbGluZztcclxuXHRcdFx0XHRsZXQgZk9iamVjdEhlaWdodDogbnVtYmVyID0gZk9iamVjdEZsb29yIC0gZk9iamVjdENlaWxpbmc7XHJcblx0XHRcdFx0bGV0IGZPYmplY3RBc3BlY3RSYXRpbzogbnVtYmVyID0gb2JqZWN0LmFzc2V0LmdldEhlaWdodCgpIC8gb2JqZWN0LmFzc2V0LmdldFdpZHRoKCk7XHJcblx0XHRcdFx0bGV0IGZPYmplY3RXaWR0aDogbnVtYmVyID0gZk9iamVjdEhlaWdodCAvIGZPYmplY3RBc3BlY3RSYXRpbztcclxuICAgICAgICAgICAgICAgIGxldCBmTWlkZGxlT2ZPYmplY3Q6IG51bWJlciA9ICgwLjUgKiAoZk9iamVjdEFuZ2xlIC8gKHRoaXMuZkZPViAvIDIuMCkpICsgMC41KSAqIHRoaXMuc2NyZWVuV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJVbmljb2RlQXNzZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmFzc2V0LCAvLyB0aGUgYXNzZXRcclxuICAgICAgICAgICAgICAgICAgICBmTWlkZGxlT2ZPYmplY3QgLSAoZk9iamVjdFdpZHRoIC8gMi4wKSwgZk9iamVjdENlaWxpbmcsICAvLyB4IGFuZCBZIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgZk9iamVjdFdpZHRoLCBmT2JqZWN0SGVpZ2h0LCAvLyBkaW1lbnRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgZk1pZGRsZU9mT2JqZWN0LCAvLyBtaWRkbGUgb2YgdGhlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGZEaXN0YW5jZUZyb21QbGF5ZXIsIC8vIGRpc3RhbmNlIGJldHdlZW4gcGxheWVyIGFuZCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZEZXB0aEJ1ZmZlciwgLy8gdGhlIGRlcHRoIGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc2hhZGVMZXZlbCkpOyAvLyB0aGUgc2hhZGUgbGV2ZWxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbnRyb2xzKCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBDb250cm9scyh7XHJcbiAgICAgICAgICAgIHBvaW50ZXJMb2NrOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW52YXM6IHRoaXMucmVuZGVyZXIuY2FudmFzLFxyXG4gICAgICAgICAgICBwb2ludGVyQ2FsbGJhY2s6IChlOiBJTW92ZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdXAgYXJyb3cgT1IgXCJXXCIga2V5XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5iaW5kS2V5cyhbXCIzOFwiLCBcIjg3XCJdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JXYWxsKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBkb3duIGFycm93IE9SIFwiU1wiIGtleVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYmluZEtleXMoW1wiNDBcIiwgXCI4M1wiXSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRm9yV2FsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGxlZnQgYXJyb3cgT1IgXCJEXCIga2V5XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5iaW5kS2V5cyhbXCIzN1wiLCBcIjY1XCJdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JXYWxsKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyByaWdodCBhcnJvdyBPUiBcIkFcIiBrZXlcclxuICAgICAgICB0aGlzLmNvbnRyb2xzLmJpbmRLZXlzKFtcIjM5XCIsIFwiNjhcIl0sICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0ZvcldhbGwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRyb2xzLmJpbmRNb3VzZWRvd24oKCkgPT4ge1xyXG5cdFx0XHRsZXQgdng6IG51bWJlciA9IE1hdGguc2luKHRoaXMucGxheWVyLmFuZ2xlKTtcclxuICAgICAgICAgICAgbGV0IHZ5OiBudW1iZXIgPSBNYXRoLmNvcyh0aGlzLnBsYXllci5hbmdsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdHMucHVzaChuZXcgVW5pdCh0aGlzLnBsYXllci5wb3NYLCB0aGlzLnBsYXllci5wb3NYLCB2eCwgdnksIFwicm9ja2V0XCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNpbih0aGlzLnBsYXllci5hbmdsZSkgKiB0aGlzLmZTcGVlZCAqIDAuMTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNvcyh0aGlzLnBsYXllci5hbmdsZSkgKiB0aGlzLmZTcGVlZCAqIDAuMTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0ZvcldhbGwoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnN1cmZhY2VbTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NYKSAqIHRoaXMubWFwLm1hcFdpZHRoICsgTWF0aC5mbG9vcih0aGlzICAucGxheWVyLnBvc1kpXSA9PT0gXCIjXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG9zaXRpb24oZTogSU1vdmVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYoZS5tb3ZlbWVudFggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuZ2xlICs9IChlLm1vdmVtZW50WCkgKiAwLjAwMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS5tb3ZlbWVudFggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuZ2xlICs9ICggZS5tb3ZlbWVudFgpICogMC4wMDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGUubW92ZW1lbnRZID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci55QW5nbGUgKz0gKGUubW92ZW1lbnRZKSAqIDAuNjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS5tb3ZlbWVudFkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnlBbmdsZSArPSAoIGUubW92ZW1lbnRZKSAqIDAuNjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxyXG5uZXcgR2FtZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=