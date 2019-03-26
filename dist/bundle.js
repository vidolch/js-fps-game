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
                i: this.wall
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fzc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9Db250cm9scy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2xvYmFscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90M0QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvSW1hZ2VBc3NldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL1JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXJPcHRpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvVW5pY29kZUFzc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvVmlzdWFsVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VJLnRzIiwid2VicGFjazovLy8uL3NyYy9Vbml0LnRzIiwid2VicGFjazovLy8uL3NyYy9VdGlscy9TdGF0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDekIsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUs7d0JBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSCwyQ0FBMkM7WUFDM0MsT0FBTyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4VTtJQUNMLENBQUM7SUFFTSxrQkFBTSxHQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVcsRUFBRSxDQUFXO1FBQzdDLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNQLElBQUksRUFBRSxHQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFaEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUVILElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZGO1lBRUQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEMsc0NBQXNDO1lBQ3RDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FB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QUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDO0FBQ25ELElBQUksQ0FBQyxPQUFPLElBQUksa0NBQWtDLENBQUM7QUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7Ozs7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TUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUN2SCxDQUFDO0lBRUQsNkJBQWMsR0FBZCxVQUFlLENBQVk7UUFDdkIsSUFBRyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFDRCxJQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMvQztRQUNELElBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBRyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUM7QUFFRCxZQUFZO0FBQ1osOEJBQThCO0FBQ3RCLGdEQUFnRDtBQUNoRCxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ25CLFNBQVM7QUFDVCxRQUFRIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCJleHBvcnQgY2xhc3MgQXNzZXQge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbG9hZGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbnRyb2xPcHRpb25zIH0gZnJvbSBcIi4vQ29udHJvbE9wdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9scyB7XHJcbiAgICBrZXlzQmluZGluZ3M6IEZ1bmN0aW9uW107XHJcbiAgICBtb3VzZWRvd25DYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICB1c2VNb3VzZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDb250cm9sT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMua2V5c0JpbmRpbmdzID0gW107XHJcblxyXG4gICAgICAgIGlmKCEhb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wb2ludGVyTG9jaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmNhbnZhcyB8fCAhb3B0aW9ucy5wb2ludGVyQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkluIG9yZGVyIHRvIHV0aWxpemUgcG9pbnRlciBsb2NrLCBwcm92aWRlIGNhbnZhcyBhbmQgY2FsbGJhY2sgaW4gdGhlIG9wdGlvbnMhXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZU1vdXNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRQb2ludGVyKG9wdGlvbnMuY2FudmFzIGFzIEhUTUxDYW52YXNFbGVtZW50LCBvcHRpb25zLnBvaW50ZXJDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jcmVhdGVFdmVudExpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRLZXlzKGtleXM6IHN0cmluZ1tdLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNCaW5kaW5nc1trZXlzW2ldXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5KGtleTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmtleXNCaW5kaW5nc1trZXldID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZE1vdXNlZG93bihjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vdXNlZG93bkNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgICAgICBpZih0aGlzLmtleXNCaW5kaW5ncy5oYXNPd25Qcm9wZXJ0eShlLmtleUNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleXNCaW5kaW5nc1tlLmtleUNvZGVdKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW91c2Vkb3duQ2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZWRvd25DYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRQb2ludGVyKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHBvaW50ZXJDYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjYW52YXNbXCJyZXF1ZXN0UG9pbnRlckxvY2tcIl0gPSBjYW52YXNbXCJyZXF1ZXN0UG9pbnRlckxvY2tcIl0gfHwgY2FudmFzW1wibW96UmVxdWVzdFBvaW50ZXJMb2NrXCJdO1xyXG5cclxuICAgICAgICBkb2N1bWVudFtcImV4aXRQb2ludGVyTG9ja1wiXSA9IGRvY3VtZW50W1wiZXhpdFBvaW50ZXJMb2NrXCJdIHx8IGRvY3VtZW50W1wibW96RXhpdFBvaW50ZXJMb2NrXCJdO1xyXG5cclxuICAgICAgICBjYW52YXMub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51c2VNb3VzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNhbnZhc1tcInJlcXVlc3RQb2ludGVyTG9ja1wiXSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsb2NrY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja0NoYW5nZShjYW52YXMsIHBvaW50ZXJDYWxsYmFjayk7XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pwb2ludGVybG9ja2NoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tDaGFuZ2UoY2FudmFzLCBwb2ludGVyQ2FsbGJhY2spO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2NrQ2hhbmdlKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHBvaW50ZXJDYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnRbXCJwb2ludGVyTG9ja0VsZW1lbnRcIl0gPT09IGNhbnZhcyB8fFxyXG4gICAgICAgICAgICBkb2N1bWVudFtcIm1velBvaW50ZXJMb2NrRWxlbWVudFwiXSA9PT0gY2FudmFzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIHBvaW50ZXIgbG9jayBzdGF0dXMgaXMgbm93IGxvY2tlZFwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMudXNlTW91c2UpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBwb2ludGVyQ2FsbGJhY2soZSk7XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyB1bmxvY2tlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy51c2VNb3VzZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBGaWxlTG9hZGVyIHtcclxuICAgIHN0YXRpYyBhc3luYyBsb2FkSlNPTihmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBsZXQgcmVzOiBSZXNwb25zZSA9IGF3YWl0IGZldGNoKGZpbGVOYW1lKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgcmVzLnRleHQoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4vQXNzZXRcIjtcclxuXHJcbmV4cG9ydCBsZXQgR0xPQkFMX0FTU0VUUzogQXNzZXRbXSA9IFtdO1xyXG5cclxuZXhwb3J0IGxldCBHZXRBc3NldDogRnVuY3Rpb24gPSAobmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICBsZXQgcmVzdWx0OiBBc3NldFtdID0gR0xPQkFMX0FTU0VUUy5maWx0ZXIoKGFzc2V0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzc2V0Lm5hbWUgPT09IG5hbWU7XHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzdWx0IHx8IHJlc3VsdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRbMF07XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IEFyZUFsbEFzc2V0c0xvYWRlZDogRnVuY3Rpb24gPSAobmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gR0xPQkFMX0FTU0VUUy5maWx0ZXIoKGFzc2V0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGFzc2V0LmlzQ29tcGxldGUoKTtcclxuICAgIH0pLmxlbmd0aCA9PT0gR0xPQkFMX0FTU0VUUy5sZW5ndGg7XHJcbn07XHJcbiIsImltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IEFyZUFsbEFzc2V0c0xvYWRlZCB9IGZyb20gXCIuL0dsb2JhbHNcIjtcclxuaW1wb3J0IHsgU3RhdHMgfSBmcm9tIFwiLi9VdGlscy9TdGF0c1wiO1xyXG5pbXBvcnQgeyBSZW5kZXJlck9wdGlvbnMgfSBmcm9tIFwiLi9SZW5kZXJpbmcvUmVuZGVyZXJPcHRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90M0Qge1xyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gICAgc3RhdHM6IFN0YXRzO1xyXG4gICAgbG9vcENhbGxiYWNrOiBGdW5jdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCwgcmVuZGVyT3B0aW9uczogUmVuZGVyZXJPcHRpb25zLCBzdGF0czogU3RhdHMpIHtcclxuICAgICAgICB0aGlzLnN0YXRzID0gc3RhdHM7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcihwYXJlbnRFbGVtZW50LCByZW5kZXJPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMb29wKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9vcENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgbWFpbkxvb3AoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5zdGF0cykgeyB0aGlzLnN0YXRzLmJlZ2luKCk7IH1cclxuICAgICAgICB0aGlzLmxvb3BDYWxsYmFjaygpO1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdHMpIHsgdGhpcy5zdGF0cy5lbmQoKTsgfVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7IHRoaXMubWFpbkxvb3AoKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYoQXJlQWxsQXNzZXRzTG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgaWYoISFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tYWluTG9vcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFBvaW50IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxufSIsImltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4uL0Fzc2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VBc3NldCBleHRlbmRzIEFzc2V0IHtcclxuICAgIGltYWdlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzcmM6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHNyYztcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdGhpcy5pbWFnZS5jb21wbGV0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBWaXN1YWxVdGlscyB9IGZyb20gXCIuL1Zpc3VhbFV0aWxzXCI7XHJcbmltcG9ydCB7IFVuaWNvZGVBc3NldCB9IGZyb20gXCIuL1VuaWNvZGVBc3NldFwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlck9wdGlvbnMgfSBmcm9tIFwiLi9SZW5kZXJlck9wdGlvbnNcIjtcclxuaW1wb3J0IHsgRHJhd09wdGlvbnMgfSBmcm9tIFwiLi9EcmF3T3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCJzcmMvUG9pbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XHJcbiAgICBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIG9wdGlvbnM6IFJlbmRlcmVyT3B0aW9ucztcclxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xyXG4gICAgbkNlaWxpbmc6IG51bWJlcjtcclxuICAgIG5GbG9vcjogbnVtYmVyO1xyXG4gICAgb2ZmU2NyZWVuOiBib29sZWFuO1xyXG4gICAgeUFuZ2xlOiBudW1iZXI7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcHRpb25zOiBSZW5kZXJlck9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHRcdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLnRvU3RyaW5nKCkpO1xyXG5cdFx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodC50b1N0cmluZygpKTtcclxuXHRcdHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcImlkXCIsICB0aGlzLm9wdGlvbnMuY2FudmFzSWQpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm5DZWlsaW5nID0gMDtcclxuICAgICAgICB0aGlzLm5GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5vZmZTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnlBbmdsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLm9wdGlvbnMucmVzRGVjcmVhc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMub3B0aW9ucy5yZXNEZWNyZWFzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWxsU3R5bGUoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZW5kZXJHbG9iYWxzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1pZGRsZUxpbmU6IG51bWJlciA9IHRoaXMuY2FudmFzLmhlaWdodCAvIDIgKyB0aGlzLnlBbmdsZTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2IoNDQsIDEwNywgMjU1KVwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgbGluZWFyR3JhZGllbnQxOiBDYW52YXNHcmFkaWVudCA9IHRoaXMuY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCB0aGlzLmNhbnZhcy5oZWlnaHQsIDAsIG1pZGRsZUxpbmUpO1xyXG4gICAgICAgIGxpbmVhckdyYWRpZW50MS5hZGRDb2xvclN0b3AoMCwgXCJyZ2IoMTQ3LCA2NywgMilcIik7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgwLjY1LCBWaXN1YWxVdGlscy5zaGFkZUJsZW5kQ29udmVydCgtMC44LCBcInJnYigxNDcsIDY3LCAyKVwiKSk7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgxLCBcInJnYigwLCAwLCAwKVwiKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gbGluZWFyR3JhZGllbnQxO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCBtaWRkbGVMaW5lLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gbWlkZGxlTGluZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZW5kZXJJbWFnZShcclxuICAgICAgICBpbWFnZTogYW55LCBzcGFjZVg6IG51bWJlciwgc3BhY2VZOiBudW1iZXIsIHNwYWNlV2lkdGg6IG51bWJlciwgc3BhY2VIZWlnaHQ6IG51bWJlciwgb3B0aW9uczogRHJhd09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcmVuZGVyQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5nZXRSZW5kZXJDb250ZXh0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkSW1hZ2VCZVJlbmRlcmVkKG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgaW1hZ2UuaS5pbWFnZSxcclxuICAgICAgICAgICAgICAgIGltYWdlLlgsIGltYWdlLlksIGltYWdlLlcsIGltYWdlLkgsXHJcbiAgICAgICAgICAgICAgICBzcGFjZVgsIHNwYWNlWSArIHRoaXMueUFuZ2xlLCBzcGFjZVdpZHRoLCBzcGFjZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5zaGFkZUxldmVsICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDAsIDAsIDAsIFwiICsgb3B0aW9uc1tcInNoYWRlTGV2ZWxcIl0gKyBcIilcIjtcclxuICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsUmVjdChzcGFjZVgsIHNwYWNlWSArIHRoaXMueUFuZ2xlLCBzcGFjZVdpZHRoLCBzcGFjZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlbmRlclVuaWNvZGVBc3NldChcclxuICAgICAgICBhc3NldDogVW5pY29kZUFzc2V0LFxyXG4gICAgICAgIHNwYWNlWDogbnVtYmVyLFxyXG4gICAgICAgIHNwYWNlWTogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgZk1pZGRsZU9mT2JqZWN0OiBudW1iZXIsXHJcbiAgICAgICAgZkRpc3RhbmNlRnJvbVBsYXllcjogbnVtYmVyLFxyXG4gICAgICAgIGZEZXB0aEJ1ZmZlcjogbnVtYmVyW10sXHJcbiAgICAgICAgc2hhZGVMZXZlbDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHJlbmRlckNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IHRoaXMuZ2V0UmVuZGVyQ29udGV4dCgpO1xyXG4gICAgICAgIGZvciAobGV0IGx5OiBudW1iZXIgPSAwOyBseSA8IGFzc2V0LnJvd3M7IGx5KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbHg6IG51bWJlciA9IDA7IGx4IDwgYXNzZXQuY29sczsgbHgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BvcnRpYWxXaWR0aDogbnVtYmVyID0gd2lkdGggLyBhc3NldC5jb2xzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BvcnRpYWxIZWlnaHQ6IG51bWJlciA9IGhlaWdodCAvIGFzc2V0LnJvd3M7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5PYmplY3RDb2x1bW46IG51bWJlciA9IE1hdGgucm91bmQoZk1pZGRsZU9mT2JqZWN0ICsgbHggLSAoYXNzZXQuY29scyAvIDIpKTtcclxuICAgICAgICAgICAgICAgIGlmIChuT2JqZWN0Q29sdW1uID49IDAgJiYgbk9iamVjdENvbHVtbiA8IHRoaXMuZ2V0V2lkdGgoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NldC5nZXRDaGFyQXQobHksIGx4KSAhPT0gXCIuXCIgJiYgZkRlcHRoQnVmZmVyW25PYmplY3RDb2x1bW5dID49IGZEaXN0YW5jZUZyb21QbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZkRlcHRoQnVmZmVyW25PYmplY3RDb2x1bW5dID0gZkRpc3RhbmNlRnJvbVBsYXllcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJYOiBudW1iZXIgPSBzcGFjZVggKyAobHggKiBwcm9wb3J0aWFsV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVuZGVyWTogbnVtYmVyID0gc3BhY2VZICsgKGx5ICogcHJvcG9ydGlhbEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFN0eWxlID0gYXNzZXQuZ2V0Q2hhckF0KGx5LCBseCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJYLCByZW5kZXJZICsgdGhpcy55QW5nbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wb3J0aWFsV2lkdGgsIHByb3BvcnRpYWxIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJDb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgwLCAwLCAwLCBcIiArIHNoYWRlTGV2ZWwgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsUmVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclgsIHJlbmRlclkgKyB0aGlzLnlBbmdsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BvcnRpYWxXaWR0aCwgcHJvcG9ydGlhbEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFJlbmRlckNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vZmZTY3JlZW4gPyB0aGlzLmNhbnZhc1tcIm9mZnNjcmVlbkNvbnRleHRcIl0gOiB0aGlzLmNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdWxkSW1hZ2VCZVJlbmRlcmVkKG9wdGlvbnM6IERyYXdPcHRpb25zKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhKHR5cGVvZiBvcHRpb25zID09PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICAgIHx8ICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvcHRpb25zLnNoYWRlTGV2ZWwgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnNoYWRlTGV2ZWwgPCAwLjk5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4LCB5LCB3LCBoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVuZGVyTGluZShjb29yZGluYXRlczogUG9pbnRbXSwgbGluZUNvbG9yOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIXRoaXMuY29udGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhjb29yZGluYXRlc1swXS54LCBjb29yZGluYXRlc1swXS55KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oXHJcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlc1tpXS54LFxyXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXNbaV0ueVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gbGluZUNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBiZWdpbk9mZlNjcmVlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbnZhc1tcIm9mZnNjcmVlbkNhbnZhc1wiXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXNbXCJvZmZzY3JlZW5DYW52YXNcIl0ud2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5jYW52YXNbXCJvZmZzY3JlZW5DYW52YXNcIl0uaGVpZ2h0ID0gdGhpcy5nZXRXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzW1wib2Zmc2NyZWVuQ29udGV4dFwiXSA9IHRoaXMuY2FudmFzW1wib2Zmc2NyZWVuQ2FudmFzXCJdLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLm9mZlNjcmVlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZW5kT2ZmU2NyZWVuKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNhbnZhc1tcIm9mZnNjcmVlbkNhbnZhc1wiXSwgMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMub2ZmU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFJlbmRlcmVyT3B0aW9ucyB7XHJcbiAgICByZXNEZWNyZWFzZTogbnVtYmVyID0gMTtcclxuICAgIGNhbnZhc0lkOiBzdHJpbmcgPSBcIm1haW5TY3JlZW5cIjtcclxufSIsImltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4uL0Fzc2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVW5pY29kZUFzc2V0IGV4dGVuZHMgQXNzZXQge1xyXG4gICAgY2hhcm1hcDogc3RyaW5nW107XHJcbiAgICByb3dzOiBudW1iZXI7XHJcbiAgICBjb2xzOiBudW1iZXI7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY2hhcm1hcDogc3RyaW5nW10sIHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLmNoYXJtYXAgPSBjaGFybWFwO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJvd3MgPSB0aGlzLmNoYXJtYXAubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuY29scyA9IHRoaXMuY2hhcm1hcFswXS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlIHx8IDEwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJBdChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJtYXBbcm93XVtjb2xdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENoYXJBdChyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIGNoYXI6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hhcm1hcFtyb3ddID0gdGhpcy5jaGFybWFwW3Jvd10uc3Vic3RyKDAsIGNvbCkgKyBjaGFyICsgdGhpcy5jaGFybWFwW3Jvd10uc3Vic3RyKGNvbCArIGNoYXIubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3dzICogdGhpcy5zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbHMgKiB0aGlzLnNjYWxlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZpc3VhbFV0aWxzIHtcclxuICAgIHN0YXRpYyBzaGFkZUJsZW5kQ29udmVydChwOiBudW1iZXIsIGZyb206IHN0cmluZywgdG8/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpOiBGdW5jdGlvbiA9IHBhcnNlSW50O1xyXG4gICAgICAgIGxldCByOiBGdW5jdGlvbiA9IE1hdGgucm91bmQ7XHJcbiAgICAgICAgbGV0IGg6IGJvb2xlYW4gPSBmcm9tLmxlbmd0aCA+IDk7XHJcbiAgICAgICAgaCA9IHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIiA/IHRvLmxlbmd0aCA+IDkgPyB0cnVlIDogdG8gPT09IFwiY1wiID8gIWggOiBmYWxzZSA6IGg7XHJcbiAgICAgICAgbGV0IGI6IGJvb2xlYW4gPSBwIDwgMDtcclxuICAgICAgICBwID0gYiA/IHAgKiAtMSA6IHA7XHJcbiAgICAgICAgdG8gPSB0byAmJiB0byAhPT0gXCJjXCIgPyB0byA6IGIgPyBcIiMwMDAwMDBcIiA6IFwiI0ZGRkZGRlwiO1xyXG4gICAgICAgIGxldCBmOiBudW1iZXJbXSA9IFZpc3VhbFV0aWxzLnNiY1JpcChmcm9tLCBpLCByKTtcclxuICAgICAgICBsZXQgdDogbnVtYmVyW10gPSBWaXN1YWxVdGlscy5zYmNSaXAodG8sIGksIHIpO1xyXG5cclxuICAgICAgICBpZiAoaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJyZ2IoXCIgKyByKCh0WzBdIC0gZlswXSkgKiBwICsgZlswXSkgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiLFwiICsgcigodFsxXSAtIGZbMV0pICogcCArIGZbMV0pICtcclxuICAgICAgICAgICAgICAgICAgICBcIixcIiArIHIoKHRbMl0gLSBmWzJdKSAqIHAgKyBmWzJdKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmWzNdIDwgMCAmJiB0WzNdIDwgMCA/IFwiKVwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLFwiICsgKGZbM10gPiAtMSAmJiB0WzNdID4gLTEgPyByKCgodFszXSAtIGZbM10pICogcCArIGZbM10pICogMTAwMDApIC8gMTAwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRbM10gPCAwID8gZlszXSA6IHRbM10pICsgXCIpXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICAgICAgcmV0dXJuIFwiI1wiICsgKDB4MTAwMDAwMDAwICsgKGZbM10gPiAtMSAmJiB0WzNdID4gLTEgPyByKCgodFszXSAtIGZbM10pICogcCArIGZbM10pICogMjU1KSA6IHRbM10gPiAtMSA/IHIodFszXSAqIDI1NSkgOiBmWzNdID4gLTEgPyByKGZbM10gKiAyNTUpIDogMjU1KSAqIDB4MTAwMDAwMCArIHIoKHRbMF0gLSBmWzBdKSAqIHAgKyBmWzBdKSAqIDB4MTAwMDAgKyByKCh0WzFdIC0gZlsxXSkgKiBwICsgZlsxXSkgKiAweDEwMCArIHIoKHRbMl0gLSBmWzJdKSAqIHAgKyBmWzJdKSkudG9TdHJpbmcoMTYpLnNsaWNlKGZbM10gPiAtMSB8fCB0WzNdID4gLTEgPyAxIDogMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzYmNSaXAoZDogc3RyaW5nLCBpOiBGdW5jdGlvbiwgcjogRnVuY3Rpb24pOiBudW1iZXJbXSB7XHJcbiAgICAgICAgdmFyIGw6IG51bWJlciA9IGQubGVuZ3RoO1xyXG4gICAgICAgIHZhciBSR0I6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgIGlmIChsID4gOSkge1xyXG4gICAgICAgICAgICB2YXIgZHM6IHN0cmluZ1tdID0gZC5zcGxpdChcIixcIik7XHJcblxyXG4gICAgICAgICAgICBSR0JbMF0gPSBpKGRzWzBdLnNsaWNlKDQpKTtcclxuICAgICAgICAgICAgUkdCWzFdID0gaShkc1sxXSksIFJHQlsyXSA9IGkoZHNbMl0pO1xyXG4gICAgICAgICAgICBSR0JbM10gPSBkc1szXSA/IHBhcnNlRmxvYXQoZHNbM10pIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChsIDwgNikge1xyXG4gICAgICAgICAgICAgICAgZCA9IFwiI1wiICsgZFsxXSArIGRbMV0gKyBkWzJdICsgZFsyXSArIGRbM10gKyBkWzNdICsgKGwgPiA0ID8gZFs0XSArIFwiXCIgKyBkWzRdIDogXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBkc2k6IG51bWJlciA9IGkoZC5zbGljZSgxKSwgMTYpO1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxyXG4gICAgICAgICAgICBSR0JbMF0gPSBkc2kgPj4gMTYgJiAyNTU7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXHJcbiAgICAgICAgICAgIFJHQlsxXSA9IGRzaSA+PiA4ICYgMjU1LCBSR0JbMl0gPSBkc2kgJiAyNTU7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXHJcbiAgICAgICAgICAgIFJHQlszXSA9IGwgPT09IDkgfHwgbCA9PT0gNSA/IHIoKChkc2kgPj4gMjQgJiAyNTUpIC8gMjU1KSAqIDEwMDAwKSAvIDEwMDAwIDogLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUkdCO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi9SZW5kZXJpbmcvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCIuL1JlbmRlcmluZy9JbWFnZUFzc2V0XCI7XHJcbmltcG9ydCB7IEdMT0JBTF9BU1NFVFMgfSBmcm9tIFwiLi9HbG9iYWxzXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyT3B0aW9ucyB9IGZyb20gXCIuL1JlbmRlcmluZy9SZW5kZXJlck9wdGlvbnNcIjtcclxuaW1wb3J0IHsgR2FtZU1hcCB9IGZyb20gXCIuL0dhbWVNYXBcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vUG9pbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVSSB7XHJcbiAgICByZW5kZXJlcjogUmVuZGVyZXI7XHJcbiAgICBtYXA6IEdhbWVNYXA7XHJcbiAgICBwbGF5ZXI6IFBsYXllcjtcclxuICAgIG1pbmltYXBPZmZzZXQ6IHsgeDogbnVtYmVyLCB5OiBudW1iZXJ9O1xyXG4gICAgbWluaW1hcFNjYWxlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFwOiBHYW1lTWFwLCBwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgIGxldCBjb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmIChjb250YWluZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3coXCJDb250YWluZXIgZWxlbWVudCBjb3VsZCBub3QgYmUgZm91bmRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVuZGVyZXJPcHRpb25zOiBSZW5kZXJlck9wdGlvbnMgPSBuZXcgUmVuZGVyZXJPcHRpb25zKCk7XHJcbiAgICAgICAgcmVuZGVyZXJPcHRpb25zLmNhbnZhc0lkID0gXCJ1aVNjcmVlblwiO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGNvbnRhaW5lciwgcmVuZGVyZXJPcHRpb25zKTtcclxuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcclxuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLm1pbmltYXBPZmZzZXQgPSB7XHJcbiAgICAgICAgICAgIHg6IDQwLFxyXG4gICAgICAgICAgICB5OiA0MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5taW5pbWFwU2NhbGUgPSA0O1xyXG4gICAgICAgIEdMT0JBTF9BU1NFVFMucHVzaChuZXcgSW1hZ2VBc3NldChcImd1bl9zcHJpdGVcIiwgXCIuL3Nwcml0ZXMvc2hvdGd1bi5wbmdcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNaW5pTWFwKG1pZGRsZUNvcnJkaW5hdGVzOiBQb2ludCwgdW5pdHM6IFBvaW50W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZShcIndoaXRlXCIpO1xyXG4gICAgICAgIGZvciAobGV0IG54OiBudW1iZXIgPSAwOyBueCA8IHRoaXMubWFwLm1hcFdpZHRoOyBueCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG55OiBudW1iZXIgPSAwOyBueSA8IHRoaXMubWFwLm1hcEhlaWdodDsgbnkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwLnN1cmZhY2VbbnkgKiB0aGlzLm1hcC5tYXBXaWR0aCArIG54XSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChueCAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobnkgKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5pbWFwU2NhbGUsIHRoaXMubWluaW1hcFNjYWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHVuaXRzLmZpbHRlcigodSkgPT4gdS54ID09PSBueCAmJiB1LnkgPT09IG55KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRGaWxsU3R5bGUoXCJ5ZWxsb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobnggKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG55ICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWluaW1hcFNjYWxlLCB0aGlzLm1pbmltYXBTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRGaWxsU3R5bGUoXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZShcInJlZFwiKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJlY3QoXHJcbiAgICAgICAgICAgICh0aGlzLnBsYXllci5wb3NYICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LngsXHJcbiAgICAgICAgICAgICh0aGlzLnBsYXllci5wb3NZICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LnksXHJcbiAgICAgICAgICAgIDIsXHJcbiAgICAgICAgICAgIDIpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckxpbmUoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAodGhpcy5wbGF5ZXIucG9zWCAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC54LFxyXG4gICAgICAgICAgICAgICAgeTogKHRoaXMucGxheWVyLnBvc1kgKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKHRoaXMucGxheWVyLnBvc1ggKyBtaWRkbGVDb3JyZGluYXRlcy54ICogNSkgKiB0aGlzLm1pbmltYXBTY2FsZSArIHRoaXMubWluaW1hcE9mZnNldC54LFxyXG4gICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NZICsgbWlkZGxlQ29ycmRpbmF0ZXMueSAqIDUpICogdGhpcy5taW5pbWFwU2NhbGUgKyB0aGlzLm1pbmltYXBPZmZzZXQueSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sIFwicmVkXCIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RmlsbFN0eWxlKFwiYmxhY2tcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZHJhd1VJKG1pZGRsZUNvcnJkaW5hdGVzOiBQb2ludCwgdW5pdHM6IFBvaW50W10pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmNsZWFyQWxsKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3TWluaU1hcChtaWRkbGVDb3JyZGluYXRlcywgdW5pdHMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RmlsbFN0eWxlKFwid2hpdGVcIik7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KHRoaXMucmVuZGVyZXIuZ2V0V2lkdGgoKSAvIDIgLSAxNSwgdGhpcy5yZW5kZXJlci5nZXRIZWlnaHQoKSAvIDIgLSAyLCAzMCwgNCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KHRoaXMucmVuZGVyZXIuZ2V0V2lkdGgoKSAvIDIgLSAyLCB0aGlzLnJlbmRlcmVyLmdldEhlaWdodCgpIC8gMiAtIDE1LCA0LCAzMCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHZXRBc3NldCB9IGZyb20gXCIuL0dsb2JhbHNcIjtcclxuaW1wb3J0IHsgVW5pY29kZUFzc2V0IH0gZnJvbSBcIi4vUmVuZGVyaW5nL1VuaWNvZGVBc3NldFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVuaXQge1xyXG5cdHg6IG51bWJlcjtcclxuXHR5OiBudW1iZXI7XHJcblx0dng6IG51bWJlcjtcclxuXHR2eTogbnVtYmVyO1xyXG5cdHJlbW92ZTogYm9vbGVhbjtcclxuXHRhc3NldDogVW5pY29kZUFzc2V0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB2eDogbnVtYmVyLCB2eTogbnVtYmVyLCBhc3NldDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0XHR0aGlzLnZ4ID0gdng7XHJcblx0XHR0aGlzLnZ5ID0gdnk7XHJcblx0XHR0aGlzLnJlbW92ZSA9IGZhbHNlO1xyXG5cdFx0aWYodHlwZW9mIGFzc2V0ICE9PSBcInVuZGVmaW5lZFwiICYmIGFzc2V0ICE9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuYXNzZXQgPSBHZXRBc3NldChhc3NldCk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwiLyoqXHJcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRzIHtcclxuXHRjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG5cdG1vZGU6IG51bWJlcjtcclxuXHRyZXZpc2lvbjogbnVtYmVyID0gMTY7XHJcblx0YmVnaW5UaW1lOiBudW1iZXI7XHJcblx0ZnJhbWVzOiBudW1iZXI7XHJcblx0ZnBzUGFuZWw6IFBhbmVsO1xyXG5cdG1zUGFuZWw6IFBhbmVsO1xyXG5cdG1lbVBhbmVsOiBQYW5lbDtcclxuXHRwcmV2VGltZTogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMubW9kZSA9IDA7XHJcblxyXG5cdFx0dGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0dGhpcy5jb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MC45O3otaW5kZXg6MTAwMDBcIjtcclxuXHRcdHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IEV2ZW50KSA9PiAge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR0aGlzLnNob3dQYW5lbCgrK3RoaXMubW9kZSAlIHRoaXMuY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCk7XHJcblx0XHR9LCBmYWxzZSApO1xyXG5cclxuXHRcdHRoaXMuYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XHJcblx0XHR0aGlzLnByZXZUaW1lID0gdGhpcy5iZWdpblRpbWU7XHJcblx0XHR0aGlzLmZyYW1lcyA9IDA7XHJcblxyXG5cdFx0dGhpcy5mcHNQYW5lbCA9IHRoaXMuYWRkUGFuZWwoIG5ldyBQYW5lbCggXCJGUFNcIiwgXCIjMGZmXCIsIFwiIzAwMlwiICkgKTtcclxuXHRcdHRoaXMubXNQYW5lbCA9IHRoaXMuYWRkUGFuZWwoIG5ldyBQYW5lbCggXCJNU1wiLCBcIiMwZjBcIiwgXCIjMDIwXCIgKSApO1xyXG5cclxuXHRcdHRoaXMuc2hvd1BhbmVsKDApO1xyXG5cdH1cclxuXHJcblx0YWRkUGFuZWwocGFuZWw6IFBhbmVsKTogUGFuZWwge1xyXG5cdFx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIHBhbmVsLmNhbnZhcyApO1xyXG5cclxuXHRcdHJldHVybiBwYW5lbDtcclxuXHR9XHJcblxyXG5cdHNob3dQYW5lbChpZDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XHJcblx0XHRcdHZhciBlbGVtZW50OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD50aGlzLmNvbnRhaW5lci5jaGlsZHJlbltpXTtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gaSA9PT0gaWQgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1vZGUgPSBpZDtcclxuXHR9XHJcblxyXG5cdGJlZ2luKCk6IHZvaWQge1xyXG5cclxuXHRcdHRoaXMuYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XHJcblxyXG5cdH1cclxuXHJcblx0ZW5kKCk6IG51bWJlciB7XHJcblxyXG5cdFx0dGhpcy5mcmFtZXMrKztcclxuXHJcblx0XHR2YXIgdGltZTogbnVtYmVyID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XHJcblxyXG5cdFx0dGhpcy5tc1BhbmVsLnVwZGF0ZSggdGltZSAtIHRoaXMuYmVnaW5UaW1lLCAyMDAgKTtcclxuXHJcblx0XHRpZiAoIHRpbWUgPj0gdGhpcy5wcmV2VGltZSArIDEwMDAgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmZwc1BhbmVsLnVwZGF0ZSggKCB0aGlzLmZyYW1lcyAqIDEwMDAgKSAvICggdGltZSAtIHRoaXMucHJldlRpbWUgKSwgMTAwICk7XHJcblxyXG5cdFx0XHR0aGlzLnByZXZUaW1lID0gdGltZTtcclxuXHRcdFx0dGhpcy5mcmFtZXMgPSAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGltZTtcclxuXHJcblx0fVxyXG5cclxuXHR1cGRhdGUoKTogdm9pZCB7XHJcblxyXG5cdFx0dGhpcy5iZWdpblRpbWUgPSB0aGlzLmVuZCgpO1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFBhbmVsIHtcclxuXHRtaW46IG51bWJlcjtcclxuXHRtYXg6IG51bWJlcjtcclxuXHRjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xyXG5cdGJnOiBzdHJpbmc7XHJcblx0Zmc6IHN0cmluZztcclxuXHRXSURUSDogbnVtYmVyO1xyXG5cdEhFSUdIVDogbnVtYmVyO1xyXG5cdFRFWFRfWDogbnVtYmVyO1xyXG5cdFRFWFRfWTogbnVtYmVyO1xyXG5cdEdSQVBIX1g6IG51bWJlcjtcclxuXHRHUkFQSF9ZOiBudW1iZXI7XHJcblx0R1JBUEhfV0lEVEg6IG51bWJlcjtcclxuXHRHUkFQSF9IRUlHSFQ6IG51bWJlcjtcclxuXHRjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG5cdFBSOiBudW1iZXI7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGZnOiBzdHJpbmcsIGJnOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMubWluID0gSW5maW5pdHk7XHJcblx0XHR0aGlzLm1heCA9IDA7XHJcblx0XHR0aGlzLmZnID0gZmc7XHJcblx0XHR0aGlzLmJnID0gYmc7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuXHRcdHRoaXMuUFIgPSBNYXRoLnJvdW5kKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxICk7XHJcblxyXG5cdFx0dGhpcy5XSURUSCA9IDgwICogdGhpcy5QUjtcclxuXHRcdHRoaXMuSEVJR0hUID0gNDggKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5URVhUX1ggPSAzICogdGhpcy5QUjtcclxuXHRcdHRoaXMuVEVYVF9ZID0gMiAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkdSQVBIX1ggPSAzICogdGhpcy5QUjtcclxuXHRcdHRoaXMuR1JBUEhfWSA9IDE1ICogdGhpcy5QUjtcclxuXHRcdHRoaXMuR1JBUEhfV0lEVEggPSA3NCAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLkdSQVBIX0hFSUdIVCA9IDMwICogdGhpcy5QUjtcclxuXHJcblx0XHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiY2FudmFzXCIgKTtcclxuXHRcdHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5XSURUSDtcclxuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuSEVJR0hUO1xyXG5cdFx0dGhpcy5jYW52YXMuc3R5bGUuY3NzVGV4dCA9IFwid2lkdGg6ODBweDtoZWlnaHQ6NDhweFwiO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoIFwiMmRcIiApO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbnRleHQgIT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5jb250ZXh0LmZvbnQgPSBcImJvbGQgXCIgKyAoIDkgKiB0aGlzLlBSICkgKyBcInB4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmXCI7XHJcblx0XHRcdHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG5cclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoIDAsIDAsIHRoaXMuV0lEVEgsIHRoaXMuSEVJR0hUICk7XHJcblxyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gZmc7XHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsVGV4dCggbmFtZSwgdGhpcy5URVhUX1gsIHRoaXMuVEVYVF9ZICk7XHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsUmVjdCggdGhpcy5HUkFQSF9YLCB0aGlzLkdSQVBIX1ksIHRoaXMuR1JBUEhfV0lEVEgsIHRoaXMuR1JBUEhfSEVJR0hUICk7XHJcblxyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYmc7XHJcblx0XHRcdHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDAuOTtcclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxSZWN0KCB0aGlzLkdSQVBIX1gsIHRoaXMuR1JBUEhfWSwgdGhpcy5HUkFQSF9XSURUSCwgdGhpcy5HUkFQSF9IRUlHSFQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZSAodmFsdWU6IG51bWJlciwgbWF4VmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuY29udGV4dCA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5taW4gPSBNYXRoLm1pbih0aGlzLm1pbiwgdmFsdWUgKTtcclxuXHRcdHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIHZhbHVlICk7XHJcblxyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmc7XHJcblx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxSZWN0KCAwLCAwLCB0aGlzLldJRFRILCB0aGlzLkdSQVBIX1kgKTtcclxuXHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZnO1xyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxUZXh0KFxyXG5cdFx0XHRNYXRoLnJvdW5kKCB2YWx1ZSApICsgXCIgXCIgKyB0aGlzLm5hbWUgKyBcIiAoXCIgKyBNYXRoLnJvdW5kKCB0aGlzLm1pbiApICsgXCItXCIgKyBNYXRoLnJvdW5kKCB0aGlzLm1heCApICsgXCIpXCIsIHRoaXMuVEVYVF9YLCB0aGlzLlRFWFRfWSApO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXHJcblx0XHRcdHRoaXMuY2FudmFzLCB0aGlzLkdSQVBIX1ggKyB0aGlzLlBSLCB0aGlzLkdSQVBIX1ksIHRoaXMuR1JBUEhfV0lEVEggLSB0aGlzLlBSLCB0aGlzLkdSQVBIX0hFSUdIVCxcclxuXHRcdFx0dGhpcy5HUkFQSF9YLCB0aGlzLkdSQVBIX1ksIHRoaXMuR1JBUEhfV0lEVEggLSB0aGlzLlBSLCB0aGlzLkdSQVBIX0hFSUdIVCApO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dC5maWxsUmVjdCggdGhpcy5HUkFQSF9YICsgdGhpcy5HUkFQSF9XSURUSCAtIHRoaXMuUFIsIHRoaXMuR1JBUEhfWSwgdGhpcy5QUiwgdGhpcy5HUkFQSF9IRUlHSFQgKTtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iZztcclxuXHRcdHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDAuOTtcclxuXHRcdHRoaXMuY29udGV4dC5maWxsUmVjdChcclxuXHRcdFx0dGhpcy5HUkFQSF9YICsgdGhpcy5HUkFQSF9XSURUSCAtIHRoaXMuUFIsIHRoaXMuR1JBUEhfWSwgdGhpcy5QUiwgTWF0aC5yb3VuZCggKCAxIC0gKCB2YWx1ZSAvIG1heFZhbHVlICkgKSAqIHRoaXMuR1JBUEhfSEVJR0hUICkgKTtcclxuXHJcblx0fVxyXG59IiwiaW1wb3J0IHsgR2FtZU1hcCB9IGZyb20gXCIuL0dhbWVNYXBcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXAxIDogR2FtZU1hcCA9IHtcclxuICAgIG1hcEhlaWdodDogMzIsXHJcbiAgICBtYXBXaWR0aDogMzIsXHJcbiAgICBzdXJmYWNlOiBcIlwiXHJcbn07XHJcblxyXG5tYXAxLnN1cmZhY2UgPSAgXCIjIyMjIyMjIyMuLi4uLi4uIyMjIyMjIyMjLi4uLi4uLlwiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4uIy4uLi4uLi4uLi4uLi4uLlwiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLiMjIyMjIyMjIy4uLi4uLi4jIyMjIyMjI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiMjLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiMjLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjIyMuLi4uLi4uLi4uLi4jIyMjLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjIy4uLi4uLi4uLi4uLi4jIyMuLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiMjI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4jIyMjIy4uLi4uLi4uLi4uIyMjI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjIyMuLiMjIyMuLi4uIyMjIyMjIyMuLi4uIyMjIyMjI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjIyMjLiMjIyMuLi4uLi4uIyMjIyMjLi4uLi4uLi4uLlwiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4uIy4uLi4uLi4uLi4uLi4uLlwiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLiMjIyMjIyMjIy4uLi4uLi4jIy4uIyMjI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLi4jLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiMjLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjIyMuLi4uLi4uLi4uLi4jIyMjLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjIy4uLi4uLi4uLi4uLi4jIyMuLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiMjI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uIyMjI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLi4uLi4uLi4uI1wiO1xyXG5tYXAxLnN1cmZhY2UgKz0gXCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1wiOyIsImltcG9ydCB7IENvbnRyb2xzIH0gZnJvbSBcIi4vQ29udHJvbHNcIjtcclxuaW1wb3J0IHsgVUkgfSBmcm9tIFwiLi9VSVwiO1xyXG5cclxuaW1wb3J0IHsgU3RhdHMgfSBmcm9tIFwiLi9VdGlscy9TdGF0c1wiO1xyXG5pbXBvcnQgeyBtYXAxIH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwiLi9SZW5kZXJpbmcvSW1hZ2VBc3NldFwiO1xyXG5pbXBvcnQgeyBHTE9CQUxfQVNTRVRTIH0gZnJvbSBcIi4vR2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBVbml0IH0gZnJvbSBcIi4vVW5pdFwiO1xyXG5pbXBvcnQgeyBVbmljb2RlQXNzZXQgfSBmcm9tIFwiLi9SZW5kZXJpbmcvVW5pY29kZUFzc2V0XCI7XHJcbmltcG9ydCB7IEZpbGVMb2FkZXIgfSBmcm9tIFwiLi9GaWxlTG9hZGVyXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IE5vdDNEIH0gZnJvbSBcIi4vTm90M0RcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XHJcbmltcG9ydCB7IEdhbWVNYXAgfSBmcm9tIFwiLi9HYW1lTWFwXCI7XHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vUG9pbnRcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXJPcHRpb25zIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyT3B0aW9uc1wiO1xyXG5pbXBvcnQgeyBJTW92ZW1lbnQgfSBmcm9tIFwiLi9JTW92ZW1lbnRcIjtcclxuXHJcbmNsYXNzIEdhbWUge1xyXG4gICAgZW5naW5lOiBOb3QzRDtcclxuICAgIHN0YXRzOiBTdGF0cztcclxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjtcclxuICAgIGZGT1Y6IG51bWJlcjtcclxuICAgIGZTcGVlZDogbnVtYmVyO1xyXG4gICAgZkRlcHRoOiBudW1iZXI7XHJcbiAgICBzY3JlZW5XaWR0aDogbnVtYmVyO1xyXG4gICAgc2NyZWVuSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBmRGVwdGhCdWZmZXI6IG51bWJlcltdO1xyXG4gICAgcGxheWVyOiBQbGF5ZXI7XHJcbiAgICBtYXA6IEdhbWVNYXA7XHJcbiAgICB1aTogVUk7XHJcbiAgICBtaWRkbGVDb3JyZGluYXRlczogUG9pbnQ7XHJcbiAgICB1bml0czogVW5pdFtdO1xyXG4gICAgbkNlaWxpbmc6IG51bWJlcjtcclxuICAgIG5GbG9vcjogbnVtYmVyO1xyXG4gICAgY29udHJvbHM6IENvbnRyb2xzO1xyXG4gICAgd2FsbDogSW1hZ2VBc3NldDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKCk7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIik7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93KFwiQ29udGFpbmVyIGVsZW1lbnQgbm90IGZvdW5kIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgTm90M0QoY29udGFpbmVyLCBuZXcgUmVuZGVyZXJPcHRpb25zKCksIHRoaXMuc3RhdHMpO1xyXG4gICAgICAgIC8vIGJlbmNobWFyayBzY3JpcHRcclxuICAgICAgICB0aGlzLnN0YXRzLnNob3dQYW5lbCgwKTsgLy8gMDogZnBzLCAxOiBtcywgMjogbWIsIDMrOiBjdXN0b21cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCB0aGlzLnN0YXRzLmNvbnRhaW5lciApO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gdGhpcy5lbmdpbmUucmVuZGVyZXI7XHJcblxyXG4gICAgICAgIHRoaXMuZkZPViA9IE1hdGguUEkgLyA0LjA7XHQvLyBmaWVsZCBvZiBWaWV3XHJcbiAgICAgICAgdGhpcy5mU3BlZWQgPSAyO1xyXG4gICAgICAgIHRoaXMuZkRlcHRoID0gMjU7XHRcdFx0Ly8gbWF4aW11bSByZW5kZXJpbmcgZGlzdGFuY2VcclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5XaWR0aCA9IHRoaXMucmVuZGVyZXIuZ2V0V2lkdGgoKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkhlaWdodCA9IHRoaXMucmVuZGVyZXIuZ2V0SGVpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5mRGVwdGhCdWZmZXIgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB7XHJcbiAgICAgICAgICAgIHBvc1g6IDcuMTgzODAwNTE3NjI4ODk1LFxyXG4gICAgICAgICAgICBwb3NZOiA5LjkyMDE3MjA1MjcwNjEyNSxcclxuICAgICAgICAgICAgYW5nbGU6IDAuNTAwMDAwMDAwMDAwMDAyMyxcclxuICAgICAgICAgICAgeUFuZ2xlOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSBtYXAxO1xyXG4gICAgICAgIHRoaXMudWkgPSBuZXcgVUkodGhpcy5tYXAsIHRoaXMucGxheWVyKTtcclxuICAgICAgICB0aGlzLm1pZGRsZUNvcnJkaW5hdGVzID0gbmV3IFBvaW50O1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy53YWxsID0gbmV3IEltYWdlQXNzZXQoXCJ3YWxsX3Nwcml0ZVwiLCBcIi4vc3ByaXRlcy93YWxsMy5qcGdcIik7XHJcbiAgICAgICAgR0xPQkFMX0FTU0VUUy5wdXNoKHRoaXMud2FsbCk7XHJcblxyXG4gICAgICAgIHRoaXMudW5pdHMgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IGxhbXBUZXh0OiBzdHJpbmcgPSBhd2FpdCBGaWxlTG9hZGVyLmxvYWRKU09OKFwiLi4vYXNzZXRzL29iamVjdHMvbGFtcC5qc29uXCIpO1xyXG4gICAgICAgIEdMT0JBTF9BU1NFVFMucHVzaChuZXcgVW5pY29kZUFzc2V0KFwibGFtcF9jbVwiLCBKU09OLnBhcnNlKGxhbXBUZXh0KSwgMC41KSk7XHJcbiAgICAgICAgdGhpcy51bml0cy5wdXNoKG5ldyBVbml0KDExLCAxNCwgMCwgMCwgXCJsYW1wX2NtXCIpKTtcclxuXHJcbiAgICAgICAgbGV0IHJvY2tldFRleHQ6IHN0cmluZyA9IGF3YWl0IEZpbGVMb2FkZXIubG9hZEpTT04oXCIuLi9hc3NldHMvb2JqZWN0cy9yb2NrZXQuanNvblwiKTtcclxuICAgICAgICBHTE9CQUxfQVNTRVRTLnB1c2gobmV3IFVuaWNvZGVBc3NldChcInJvY2tldFwiLCBKU09OLnBhcnNlKHJvY2tldFRleHQpLCAwLjUpKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmdpbmUuc2V0TG9vcCgoKSA9PiB7IHRoaXMubW92ZSgpOyB9KTtcclxuICAgICAgICB0aGlzLmVuZ2luZS5zdGFydCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29udHJvbHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYmVnaW5PZmZTY3JlZW4oKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnlBbmdsZSA9IHRoaXMucGxheWVyLnlBbmdsZTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckdsb2JhbHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluU2NyZWVuKDAsIHRoaXMuc2NyZWVuV2lkdGgpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT2JqZWN0cygpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZW5kT2ZmU2NyZWVuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudWkuZHJhd1VJKHRoaXMubWlkZGxlQ29ycmRpbmF0ZXMsIHRoaXMudW5pdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5TY3JlZW4oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogYW55IHtcclxuICAgICAgICBsZXQgZlJheUFuZ2xlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBzdGVwU2l6ZTogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgZGlzdGFuY2VUb1dhbGw6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGJIaXRXYWxsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGV5ZVg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGV5ZVk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG5UZXN0WDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgblRlc3RZOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSBmcm9tOyBpIDwgdG87IGkrKykge1xyXG4gICAgICAgICAgICBmUmF5QW5nbGUgPSAodGhpcy5wbGF5ZXIuYW5nbGUgLSB0aGlzLmZGT1YgLyAyLjApICsgKGkgLyB0aGlzLnNjcmVlbldpZHRoKSAqIHRoaXMuZkZPVjtcclxuICAgICAgICAgICAgc3RlcFNpemUgPSAwLjA1O1xyXG4gICAgICAgICAgICBkaXN0YW5jZVRvV2FsbCA9IDAuMDtcclxuICAgICAgICAgICAgYkhpdFdhbGwgPSBmYWxzZTtcdFx0Ly8gc2V0IHdoZW4gcmF5IGhpdHMgd2FsbCBibG9ja1xyXG4gICAgICAgICAgICBleWVYID0gTWF0aC5zaW4oZlJheUFuZ2xlKTsgLy8gdW5pdCB2ZWN0b3IgZm9yIHJheSBpbiBwbGF5ZXIgc3BhY2VcclxuICAgICAgICAgICAgZXllWSA9IE1hdGguY29zKGZSYXlBbmdsZSk7XHJcbiAgICAgICAgICAgIGlmKGkgPT09IHRvIC8gMikgeyB0aGlzLm1pZGRsZUNvcnJkaW5hdGVzID0ge3g6IGV5ZVgsIHk6IGV5ZVl9OyB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZlNhbXBsZVg6IG51bWJlciA9IDAuMDtcclxuICAgICAgICAgICAgLy8gaW5jcmVtZW50YWxseSBjYXN0IHJheSBmcm9tIHBsYXllciwgYWxvbmcgcmF5IGFuZ2xlLCB0ZXN0aW5nIGZvclxyXG4gICAgICAgICAgICAvLyBpbnRlcnNlY3Rpb24gd2l0aCBhIGJsb2NrXHJcbiAgICAgICAgICAgIHdoaWxlICghYkhpdFdhbGwgJiYgZGlzdGFuY2VUb1dhbGwgPCB0aGlzLmZEZXB0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlVG9XYWxsICs9IHN0ZXBTaXplO1xyXG4gICAgICAgICAgICAgICAgblRlc3RYID0gTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NYICsgZXllWCAqIGRpc3RhbmNlVG9XYWxsKTtcclxuICAgICAgICAgICAgICAgIG5UZXN0WSA9IE1hdGguZmxvb3IodGhpcy5wbGF5ZXIucG9zWSArIGV5ZVkgKiBkaXN0YW5jZVRvV2FsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGVzdCBpZiByYXkgaXMgb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgICAgICAgICAgaWYgKG5UZXN0WCA8IDAgfHwgblRlc3RYID49IHRoaXMubWFwLm1hcFdpZHRoIHx8IG5UZXN0WSA8IDAgfHwgblRlc3RZID49IHRoaXMubWFwLm1hcEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJIaXRXYWxsID0gdHJ1ZTtcdFx0XHQvLyBqdXN0IHNldCBkaXN0YW5jZSB0byBtYXhpbXVtIGRlcHRoXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VUb1dhbGwgPSB0aGlzLmZEZXB0aDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmF5IGlzIGluYm91bmRzIHNvIHRlc3QgdG8gc2VlIGlmIHRoZSByYXkgY2VsbCBpcyBhIHdhbGwgYmxvY2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXAuc3VyZmFjZVtNYXRoLnJvdW5kKG5UZXN0WCAqIHRoaXMubWFwLm1hcFdpZHRoICsgblRlc3RZKV0gPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJheSBoYXMgaGl0IHdhbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYkhpdFdhbGwgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXJlIHJheSBoYXMgaGl0IHdhbGwuIEJyZWFrIEJsb2NrIGJvdW5kYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludCA0IGxpbmUgc2VnbWVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZCbG9ja01pZFg6IG51bWJlciA9IG5UZXN0WCArIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZCbG9ja01pZFk6IG51bWJlciA9IG5UZXN0WSArIDAuNTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmVGVzdFBvaW50WDogbnVtYmVyID0gdGhpcy5wbGF5ZXIucG9zWCArIGV5ZVggKiBkaXN0YW5jZVRvV2FsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZUZXN0UG9pbnRZOiBudW1iZXIgPSB0aGlzLnBsYXllci5wb3NZICsgZXllWSAqIGRpc3RhbmNlVG9XYWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZUZXN0QW5nbGU6IG51bWJlciA9IE1hdGguYXRhbjIoKGZUZXN0UG9pbnRZIC0gZkJsb2NrTWlkWSksIChmVGVzdFBvaW50WCAtIGZCbG9ja01pZFgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmVGVzdEFuZ2xlID49IC0zLjE0MTU5ICogMC4yNSAmJiBmVGVzdEFuZ2xlIDwgMy4xNDE1OSAqIDAuMjUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZTYW1wbGVYID0gZlRlc3RQb2ludFkgLSBuVGVzdFk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZUZXN0QW5nbGUgPj0gMy4xNDE1OSAqIDAuMjUgJiYgZlRlc3RBbmdsZSA8IDMuMTQxNTkgKiAwLjc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmU2FtcGxlWCA9IGZUZXN0UG9pbnRYIC0gblRlc3RYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmVGVzdEFuZ2xlIDwgLTMuMTQxNTkgKiAwLjI1ICYmIGZUZXN0QW5nbGUgPj0gLTMuMTQxNTkgKiAwLjc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmU2FtcGxlWCA9IGZUZXN0UG9pbnRYIC0gblRlc3RYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmVGVzdEFuZ2xlID49IDMuMTQxNTkgKiAwLjc1IHx8IGZUZXN0QW5nbGUgPCAtMy4xNDE1OSAqIDAuNzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZTYW1wbGVYID0gZlRlc3RQb2ludFkgLSBuVGVzdFk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZlNhbXBsZVggKj0gMTAwO1xyXG4gICAgICAgICAgICBmU2FtcGxlWCA9IE1hdGguZmxvb3IoZlNhbXBsZVggLyAoMTAwIC8gMjg4KSk7XHJcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBkaXN0YW5jZSB0byBjZWlsaW5nIGFuZCBmbG9vclxyXG4gICAgICAgICAgICB0aGlzLm5DZWlsaW5nID0gKHRoaXMuc2NyZWVuSGVpZ2h0IC8gMi4wKSAtICh0aGlzLnNjcmVlbkhlaWdodCAvIGRpc3RhbmNlVG9XYWxsKTtcclxuICAgICAgICAgICAgdGhpcy5uRmxvb3IgPSB0aGlzLnNjcmVlbkhlaWdodCAtIHRoaXMubkNlaWxpbmc7XHJcblxyXG4gICAgICAgICAgICAvLyBzaGFkZXIgd2FsbHMgYmFzZWQgb24gZGlzdGFuY2VcclxuICAgICAgICAgICAgbGV0IHNoYWRlTGV2ZWw6IG51bWJlciA9IHBhcnNlRmxvYXQoKGRpc3RhbmNlVG9XYWxsICogMC4xKS50b0ZpeGVkKDIpKTtcclxuXHRcdFx0dGhpcy5mRGVwdGhCdWZmZXJbaV0gPSBkaXN0YW5jZVRvV2FsbDtcclxuXHJcbiAgICAgICAgICAgIGxldCBoZWlnaHRUb0RyYXc6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdFk6IG51bWJlciA9IC0xO1xyXG4gICAgICAgICAgICBmb3IgKGxldCB5OiBudW1iZXIgPSAwOyB5IDwgdGhpcy5zY3JlZW5IZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gZWFjaCBSb3dcclxuICAgICAgICAgICAgICAgIGlmICh5IDw9IHRoaXMubkNlaWxpbmcpIHsgLy8gcm9vZlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh5ID4gdGhpcy5uQ2VpbGluZyAmJiB5IDw9IHRoaXMubkZsb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0VG9EcmF3ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RZID0gZmlyc3RZID09PSAtMSA/IHkgOiBmaXJzdFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVySW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIFg6IGZTYW1wbGVYLCBZOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFc6IDEsIEg6IDI4OCxcclxuICAgICAgICAgICAgICAgICAgICBpOiB0aGlzLndhbGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpLCBmaXJzdFksXHJcbiAgICAgICAgICAgICAgICAxLCBoZWlnaHRUb0RyYXcsIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZUxldmVsOiBzaGFkZUxldmVsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT2JqZWN0cygpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy51bml0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0OiBVbml0ID0gdGhpcy51bml0c1tpXTtcclxuXHRcdFx0Ly8gdXBkYXRlIE9iamVjdCBQaHlzaWNzXHJcblx0XHRcdG9iamVjdC54ICs9IG9iamVjdC52eCAqIDAuNTtcclxuXHRcdFx0b2JqZWN0LnkgKz0gb2JqZWN0LnZ5ICogMC41O1xyXG5cclxuXHRcdFx0Ly8gY2hlY2sgaWYgb2JqZWN0IGlzIGluc2lkZSB3YWxsIC0gc2V0IGZsYWcgZm9yIHJlbW92YWxcclxuXHRcdFx0aWYgKHRoaXMubWFwLnN1cmZhY2Vbb2JqZWN0LnggKiB0aGlzLm1hcC5tYXBXaWR0aCArIG9iamVjdC55XSA9PT0gXCIjXCIpIHtcclxuXHRcdFx0XHRvYmplY3QucmVtb3ZlID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gY2FuIG9iamVjdCBiZSBzZWVuP1xyXG5cdFx0XHRsZXQgZlZlY1g6IG51bWJlciA9IChvYmplY3QueCkgLSB0aGlzLnBsYXllci5wb3NYO1xyXG4gICAgICAgICAgICBsZXQgZlZlY1k6IG51bWJlciA9IChvYmplY3QueSkgLSB0aGlzLnBsYXllci5wb3NZO1xyXG5cdFx0XHRsZXQgZkRpc3RhbmNlRnJvbVBsYXllcjogbnVtYmVyID0gTWF0aC5oeXBvdChmVmVjWCwgZlZlY1kpO1xyXG5cclxuXHRcdFx0bGV0IGZFeWVYOiBudW1iZXIgPSBNYXRoLnNpbih0aGlzLnBsYXllci5hbmdsZSk7XHJcblx0XHRcdGxldCBmRXllWTogbnVtYmVyID0gTWF0aC5jb3ModGhpcy5wbGF5ZXIuYW5nbGUpO1xyXG5cclxuXHRcdFx0Ly8gY2FsY3VsYXRlIGFuZ2xlIGJldHdlZW4gbGFtcCBhbmQgcGxheWVycyBmZWV0LCBhbmQgcGxheWVycyBsb29raW5nIGRpcmVjdGlvblxyXG5cdFx0XHQvLyB0byBkZXRlcm1pbmUgaWYgdGhlIGxhbXAgaXMgaW4gdGhlIHBsYXllcnMgZmllbGQgb2Ygdmlld1xyXG5cdFx0XHRsZXQgZk9iamVjdEFuZ2xlOiBudW1iZXIgPSBNYXRoLmF0YW4yKGZFeWVZLCBmRXllWCkgLSBNYXRoLmF0YW4yKGZWZWNZLCBmVmVjWCk7XHJcblx0XHRcdGlmIChmT2JqZWN0QW5nbGUgPCAtTWF0aC5QSSkge1xyXG5cdFx0XHRcdGZPYmplY3RBbmdsZSArPSAyLjAgKiBNYXRoLlBJO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChmT2JqZWN0QW5nbGUgPiBNYXRoLlBJKSB7XHJcbiAgICAgICAgICAgICAgICBmT2JqZWN0QW5nbGUgLT0gMi4wICogTWF0aC5QSTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGJJblBsYXllckZPVjogYm9vbGVhbiA9IE1hdGguYWJzKGZPYmplY3RBbmdsZSkgPCAodGhpcy5mRk9WKSAvIDI7XHJcbiAgICAgICAgICAgIGxldCBzaGFkZUxldmVsOiBzdHJpbmcgPSAoZkRpc3RhbmNlRnJvbVBsYXllciAqIDAuMSkudG9GaXhlZCgyKTtcclxuXHJcblx0XHRcdGlmIChiSW5QbGF5ZXJGT1YgJiYgZkRpc3RhbmNlRnJvbVBsYXllciA+PSAwLjUgJiYgZkRpc3RhbmNlRnJvbVBsYXllciA8IHRoaXMuZkRlcHRoICYmICFvYmplY3QucmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0T0RPOiBGaXggdGhpc1xyXG4gICAgICAgICAgICAgICAgbGV0IGZPYmplY3RDZWlsaW5nOiBudW1iZXIgPSAodGhpcy5zY3JlZW5IZWlnaHQgLyAyLjApIC0gdGhpcy5zY3JlZW5IZWlnaHQgLyAoZkRpc3RhbmNlRnJvbVBsYXllcik7XHJcblx0XHRcdFx0bGV0IGZPYmplY3RGbG9vcjogbnVtYmVyID0gdGhpcy5zY3JlZW5IZWlnaHQgLSBmT2JqZWN0Q2VpbGluZztcclxuXHRcdFx0XHRsZXQgZk9iamVjdEhlaWdodDogbnVtYmVyID0gZk9iamVjdEZsb29yIC0gZk9iamVjdENlaWxpbmc7XHJcblx0XHRcdFx0bGV0IGZPYmplY3RBc3BlY3RSYXRpbzogbnVtYmVyID0gb2JqZWN0LmFzc2V0LmdldEhlaWdodCgpIC8gb2JqZWN0LmFzc2V0LmdldFdpZHRoKCk7XHJcblx0XHRcdFx0bGV0IGZPYmplY3RXaWR0aDogbnVtYmVyID0gZk9iamVjdEhlaWdodCAvIGZPYmplY3RBc3BlY3RSYXRpbztcclxuICAgICAgICAgICAgICAgIGxldCBmTWlkZGxlT2ZPYmplY3Q6IG51bWJlciA9ICgwLjUgKiAoZk9iamVjdEFuZ2xlIC8gKHRoaXMuZkZPViAvIDIuMCkpICsgMC41KSAqIHRoaXMuc2NyZWVuV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJVbmljb2RlQXNzZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmFzc2V0LCAvLyB0aGUgYXNzZXRcclxuICAgICAgICAgICAgICAgICAgICBmTWlkZGxlT2ZPYmplY3QgLSAoZk9iamVjdFdpZHRoIC8gMi4wKSwgZk9iamVjdENlaWxpbmcsICAvLyB4IGFuZCBZIGNvb3JkaW5hdGVzXHJcbiAgICAgICAgICAgICAgICAgICAgZk9iamVjdFdpZHRoLCBmT2JqZWN0SGVpZ2h0LCAvLyBkaW1lbnRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgZk1pZGRsZU9mT2JqZWN0LCAvLyBtaWRkbGUgb2YgdGhlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGZEaXN0YW5jZUZyb21QbGF5ZXIsIC8vIGRpc3RhbmNlIGJldHdlZW4gcGxheWVyIGFuZCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZEZXB0aEJ1ZmZlciwgLy8gdGhlIGRlcHRoIGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc2hhZGVMZXZlbCkpOyAvLyB0aGUgc2hhZGUgbGV2ZWxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNvbnRyb2xzKCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBDb250cm9scyh7XHJcbiAgICAgICAgICAgIHBvaW50ZXJMb2NrOiB0cnVlLFxyXG4gICAgICAgICAgICBjYW52YXM6IHRoaXMucmVuZGVyZXIuY2FudmFzLFxyXG4gICAgICAgICAgICBwb2ludGVyQ2FsbGJhY2s6IChlOiBJTW92ZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdXAgYXJyb3cgT1IgXCJXXCIga2V5XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5iaW5kS2V5cyhbXCIzOFwiLCBcIjg3XCJdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JXYWxsKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBkb3duIGFycm93IE9SIFwiU1wiIGtleVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYmluZEtleXMoW1wiNDBcIiwgXCI4M1wiXSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRm9yV2FsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGxlZnQgYXJyb3cgT1IgXCJEXCIga2V5XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5iaW5kS2V5cyhbXCIzN1wiLCBcIjY1XCJdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JXYWxsKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyByaWdodCBhcnJvdyBPUiBcIkFcIiBrZXlcclxuICAgICAgICB0aGlzLmNvbnRyb2xzLmJpbmRLZXlzKFtcIjM5XCIsIFwiNjhcIl0sICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0ZvcldhbGwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRyb2xzLmJpbmRNb3VzZWRvd24oKCkgPT4ge1xyXG5cdFx0XHRsZXQgdng6IG51bWJlciA9IE1hdGguc2luKHRoaXMucGxheWVyLmFuZ2xlKSAqIDAuODtcclxuXHRcdFx0bGV0IHZ5OiBudW1iZXIgPSBNYXRoLmNvcyh0aGlzLnBsYXllci5hbmdsZSkgKiAwLjg7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdHMucHVzaChuZXcgVW5pdCh0aGlzLnBsYXllci5wb3NYLCB0aGlzLnBsYXllci5wb3NYLCB2eCwgdnksIFwicm9ja2V0XCIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNpbih0aGlzLnBsYXllci5hbmdsZSkgKiB0aGlzLmZTcGVlZCAqIDAuMTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNvcyh0aGlzLnBsYXllci5hbmdsZSkgKiB0aGlzLmZTcGVlZCAqIDAuMTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0ZvcldhbGwoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwLnN1cmZhY2VbTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NYKSAqIHRoaXMubWFwLm1hcFdpZHRoICsgTWF0aC5mbG9vcih0aGlzICAucGxheWVyLnBvc1kpXSA9PT0gXCIjXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG9zaXRpb24oZTogSU1vdmVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYoZS5tb3ZlbWVudFggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuZ2xlICs9IChlLm1vdmVtZW50WCkgKiAwLjAwNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS5tb3ZlbWVudFggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFuZ2xlICs9ICggZS5tb3ZlbWVudFgpICogMC4wMDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGUubW92ZW1lbnRZID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci55QW5nbGUgKz0gKGUubW92ZW1lbnRZKSAqIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGUubW92ZW1lbnRZIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci55QW5nbGUgKz0gKCBlLm1vdmVtZW50WSkgKiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gKCgpID0+ICB7XHJcbi8vICAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgICAgIG5ldyBHYW1lKCk7XHJcbi8vICAgICB9O1xyXG4vLyB9KSgpOyJdLCJzb3VyY2VSb290IjoiIn0=