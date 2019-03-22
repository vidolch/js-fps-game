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

/***/ "./src/Asset.js":
/*!**********************!*\
  !*** ./src/Asset.js ***!
  \**********************/
/*! exports provided: Asset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Asset", function() { return Asset; });
class Asset {
    constructor(name) {
        this.name = name;
        this.loaded = false;
    }
    isComplete() {
        return this.loaded;
    }
}

/***/ }),

/***/ "./src/Controls.js":
/*!*************************!*\
  !*** ./src/Controls.js ***!
  \*************************/
/*! exports provided: Controls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controls", function() { return Controls; });
class Controls {
    constructor(options) {
        this.keysBindings = {};
        this.mousedownCallout = undefined;

        if(options !== undefined) {
            if(options.hasOwnProperty('pointerLock')) {
                if (!!options['pointerLock']) {
                    if (typeof options['canvas'] === "undefined") {
                        throw "In order to utilize pointer lock, provide convas in options!";
                    }
                    this.useMouse = false;
                    this.bindPointer(options['canvas'], options['pointerCallout']);
                }
            }
        }
        this.createEventListeners();
    }

    bindKeys(keys, callout) {
        if(Array.isArray(keys)) {
            for (let i = 0; i < keys.length; i++) {
                this.keysBindings[keys[i]] = callout;
            }
        } else {
            throw "Keys parameter should be an Array!";
        }
    }

    bindKey(key, callout) {
        if(typeof keys === 'String') {
            this.keysBindings[keys] = callout;
        } else {
            throw "Key parameter should be String!";
        }
    }

    bindMousedown(callout) {
        this.mousedownCallout = callout;
    }

    createEventListeners() {
        let self = this;
        let fElapsedTime = 0.1
        document.addEventListener("keydown", function (e) {
            e = e || window.event;
            if(self.keysBindings.hasOwnProperty(e.keyCode)) {
                self.keysBindings[e.keyCode]();
            }
        });
       
        document.addEventListener("mousedown", function (e) {
            e = e || window.event;
            if(self.mousedownCallout !== undefined) {
                self.mousedownCallout();
            }
        });
       
    }
    bindPointer(canvas, pointerCallout) {
        let self = this;
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

        canvas.onclick = function () {
            self.useMouse = true;
            canvas.requestPointerLock();
        };
        document.addEventListener('pointerlockchange', function (e) {
            self.lockChange(canvas, pointerCallout);
        }, false);
        document.addEventListener('mozpointerlockchange', function (e) {
            self.lockChange(canvas, pointerCallout);
        }, false);
    }
    lockChange(canvas, pointerCallout) {
        let self = this;
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            console.log('The pointer lock status is now locked');
            document.addEventListener("mousemove", function (e) {
                if(!self.useMouse) return;
                pointerCallout(e);
            }, false);
        } else {
            console.log('The pointer lock status is now unlocked');
            self.useMouse = false;
        }
    }
}

/***/ }),

/***/ "./src/FileLoader.js":
/*!***************************!*\
  !*** ./src/FileLoader.js ***!
  \***************************/
/*! exports provided: FileLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileLoader", function() { return FileLoader; });
class FileLoader {
    constructor() {

    }

    static loadJSON(fileName, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', fileName, true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {

                // .open will NOT return a value but simply returns undefined in async mode so use a callback
                callback(xobj.responseText);

            }
        }
        xobj.send(null);
    }
}

/***/ }),

/***/ "./src/Globals.js":
/*!************************!*\
  !*** ./src/Globals.js ***!
  \************************/
/*! exports provided: GLOBAL_ASSETS, ALL_LOADED, GetAsset, AreAllAssetsLoaded, SetAllLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL_ASSETS", function() { return GLOBAL_ASSETS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_LOADED", function() { return ALL_LOADED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAsset", function() { return GetAsset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreAllAssetsLoaded", function() { return AreAllAssetsLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetAllLoaded", function() { return SetAllLoaded; });
/* harmony import */ var _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering/ImageAsset */ "./src/Rendering/ImageAsset.js");


let GLOBAL_ASSETS = [];
let ALL_LOADED = true;
let GetAsset = function(name) {
    let result = GLOBAL_ASSETS.filter((asset) => {
        return asset.name === name;
    });
    if (!result || result.length === 0) {
        return null;
    }
    return result[0];
}
let AreAllAssetsLoaded = function(name) {
    return GLOBAL_ASSETS.filter((asset) => {
        return asset.isComplete();
    }).length === GLOBAL_ASSETS.length && ALL_LOADED;
}
let SetAllLoaded = function(loaded) {
    ALL_LOADED = loaded;
}

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
/* harmony import */ var _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.js");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Globals */ "./src/Globals.js");


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

/***/ "./src/Rendering/ImageAsset.js":
/*!*************************************!*\
  !*** ./src/Rendering/ImageAsset.js ***!
  \*************************************/
/*! exports provided: ImageAsset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageAsset", function() { return ImageAsset; });
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Asset */ "./src/Asset.js");


class ImageAsset extends _Asset__WEBPACK_IMPORTED_MODULE_0__["Asset"] {
    constructor(name, src) {
        super(name);
        this.image = new Image();
        this.image.src = src;
    }
    isComplete() {
        this.loaded = this.image.complete;
        return this.loaded;
    }
}

/***/ }),

/***/ "./src/Rendering/Renderer.js":
/*!***********************************!*\
  !*** ./src/Rendering/Renderer.js ***!
  \***********************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony import */ var _VisualUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VisualUtils.js */ "./src/Rendering/VisualUtils.js");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Globals */ "./src/Globals.js");



class Renderer {
    constructor(parentElement, options) {
        this.parentElement = parentElement

        this.options = {
            resDecrease: 1,
            canvasId: 'mainScreen'
        }
        Object.assign(this.options, options);

        this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width',  document.body.clientWidth);
		this.canvas.setAttribute('height',  document.body.scrollHeight);
		this.canvas.setAttribute('id',  this.options.canvasId);
        this.parentElement.appendChild(this.canvas); 
        this.context = this.canvas.getContext("2d");

        this.nCeiling = 0;
        this.nFloor = 0;
        this.offScreen = false;
        this.yAngle = 0;
    }

    getWidth() {
        return this.canvas.width / this.options.resDecrease;
    }

    getHeight() {
        return this.canvas.height / this.options.resDecrease;
    }

    setFillStyle(color) {
        this.context.fillStyle = color;
    }

    clearAll() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderGlobals() {
        let middleLine = this.canvas.height / 2 + this.yAngle;
        this.context.fillStyle = 'rgb(44, 107, 255)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        var linearGradient1 = this.context.createLinearGradient(0, this.canvas.height, 0, middleLine);
        linearGradient1.addColorStop(0, 'rgb(147, 67, 2)');
        linearGradient1.addColorStop(0.65, _VisualUtils_js__WEBPACK_IMPORTED_MODULE_0__["VisualUtils"].shadeBlendConvert(-0.8, 'rgb(147, 67, 2)'));
        linearGradient1.addColorStop(1, 'rgb(0, 0, 0)');
        this.context.fillStyle = linearGradient1;
        this.context.fillRect(0, middleLine, this.canvas.width, this.canvas.height - middleLine);
        this.context.fillStyle = 'black';
    }
    renderImage(image, spaceX, spaceY, spaceWidth, spaceHeight, options) {
        let renderContext = this.getRenderContext();
        if (this.shouldImageBeRendered(options)) {
            renderContext.drawImage(
                Object(_Globals__WEBPACK_IMPORTED_MODULE_1__["GetAsset"])(image.i).image,
                image.X, image.Y, image.W, image.H,
                spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
        }

        if (typeof options !== "undefined") {
            if (options.hasOwnProperty('shadeLevel')) {

                renderContext.fillStyle = 'rgba(0, 0, 0, ' + options['shadeLevel'] + ')';
                renderContext.fillRect(spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
            }
        }
    }

    renderUnicodeAsset(asset, spaceX, spaceY, width, height, fMiddleOfObject, fDistanceFromPlayer, fDepthBuffer, shadeLevel) {
        let renderContext = this.getRenderContext();
        for (let ly = 0; ly < asset.rows; ly++) {
            for (let lx = 0; lx < asset.cols; lx++) {
                let proportialWidth = width / asset.cols;
                let proportialHeight = height / asset.rows;

                let nObjectColumn = Math.round(fMiddleOfObject + lx - (asset.cols / 2));
                if (nObjectColumn >= 0 && nObjectColumn < this.getWidth()) {
                    if (asset.getCharAt(ly, lx) !== '.' && fDepthBuffer[nObjectColumn] >= fDistanceFromPlayer) {
                        fDepthBuffer[nObjectColumn] = fDistanceFromPlayer;
                        
                        let renderX = spaceX + (lx * proportialWidth);
                        let renderY = spaceY + (ly * proportialHeight);
                        renderContext.fillStyle = asset.getCharAt(ly, lx);
                        renderContext.fillRect(
                            renderX, renderY + this.yAngle,
                            proportialWidth, proportialHeight);
                        renderContext.fillStyle = 'rgba(0, 0, 0, ' + shadeLevel + ')';
                        renderContext.fillRect(
                            renderX, renderY + this.yAngle,
                            proportialWidth, proportialHeight);
                    }
                }
            }
        }
    }

    getRenderContext() {
        return this.offScreen ? this.canvas.offscreenContext : this.context;
    }

    shouldImageBeRendered(options) {
        return typeof options === "undefined" || (typeof options !== "undefined" && options.hasOwnProperty('shadeLevel') && options['shadeLevel'] < 0.99);
    }

    renderRect(x, y, w, h) {
        this.context.fillRect(x, y, w, h);
    }

    renderLine(coordinates, lineColor) {
        this.context.beginPath();
        this.context.moveTo(coordinates[0].x, coordinates[0].y);

        for (let i = 1; i < coordinates.length; i++) {
            this.context.lineTo(
                coordinates[i].x,
                coordinates[i].y
            );
        }

        this.context.strokeStyle = lineColor;
        this.context.stroke();
    }

    beginOffScreen() {
        this.canvas.offscreenCanvas = document.createElement('canvas');
        this.canvas.offscreenCanvas.width = this.getWidth();
        this.canvas.offscreenCanvas.height = this.getWidth();
        this.canvas.offscreenContext = this.canvas.offscreenCanvas.getContext('2d');
        this.offScreen = true;
    }

    endOffScreen() {
        this.context.drawImage(this.canvas.offscreenCanvas, 0, 0);
        this.offScreen = false;
    }
}

/***/ }),

/***/ "./src/Rendering/UnicodeAsset.js":
/*!***************************************!*\
  !*** ./src/Rendering/UnicodeAsset.js ***!
  \***************************************/
/*! exports provided: UnicodeAsset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnicodeAsset", function() { return UnicodeAsset; });
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Asset */ "./src/Asset.js");


class UnicodeAsset extends _Asset__WEBPACK_IMPORTED_MODULE_0__["Asset"] {
    constructor(name, charmap, scale) {
        super(name);
        this.charmap = charmap;
        this.loaded = true;
        this.rows = this.charmap.length;
        this.cols = this.charmap[0].length;
        this.scale = scale || 10;
    }
    getCharAt(row, col) {
        return this.charmap[row][col];
    }
    setCharAt(row, col, char) {
        this.charmap[row][col] = char;
    }
    getHeight() {
        return this.rows * this.scale;
    }
    getWidth() {
        return this.cols * this.scale;
    }
}

/***/ }),

/***/ "./src/Rendering/VisualUtils.js":
/*!**************************************!*\
  !*** ./src/Rendering/VisualUtils.js ***!
  \**************************************/
/*! exports provided: VisualUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualUtils", function() { return VisualUtils; });
class VisualUtils {
    static shadeBlendConvert(p, from, to) {
        if (typeof p != "number" || p < -1 || p > 1 || typeof from != "string" || (from[0] != 'r' && from[0] != '#') || (typeof to != "string" && typeof to != "undefined")) {
            return null;
        }

        var i = parseInt,
            r = Math.round,
            h = from.length > 9,
            h = typeof to == "string" ? to.length > 9 ? true : to == "c" ? !h : false : h,
            b = p < 0,
            p = b ? p * -1 : p,
            to = to && to != "c" ? to : b ? "#000000" : "#FFFFFF",
            f = VisualUtils.sbcRip(from, i),
            t = VisualUtils.sbcRip(to, i);
        if (!f || !t) return null;
        if (h) return "rgb(" + r((t[0] - f[0]) * p + f[0]) + "," + r((t[1] - f[1]) * p + f[1]) + "," + r((t[2] - f[2]) * p + f[2]) + (f[3] < 0 && t[3] < 0 ? ")" : "," + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000 : t[3] < 0 ? f[3] : t[3]) + ")");
        else return "#" + (0x100000000 + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255) * 0x1000000 + r((t[0] - f[0]) * p + f[0]) * 0x10000 + r((t[1] - f[1]) * p + f[1]) * 0x100 + r((t[2] - f[2]) * p + f[2])).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
    }
    static sbcRip(d, i) {
        var l = d.length,
            RGB = new Object();
        if (l > 9) {
            d = d.split(",");
            if (d.length < 3 || d.length > 4) return null;
            RGB[0] = i(d[0].slice(4)), RGB[1] = i(d[1]), RGB[2] = i(d[2]), RGB[3] = d[3] ? parseFloat(d[3]) : -1;
        } else {
            if (l == 8 || l == 6 || l < 4) return null;
            if (l < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + "" + d[4] : "");
            d = i(d.slice(1), 16), RGB[0] = d >> 16 & 255, RGB[1] = d >> 8 & 255, RGB[2] = d & 255, RGB[3] = l == 9 || l == 5 ? r(((d >> 24 & 255) / 255) * 10000) / 10000 : -1;
        }
        return RGB;
    }
}

/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
/* harmony import */ var _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.js");
/* harmony import */ var _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rendering/ImageAsset */ "./src/Rendering/ImageAsset.js");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Globals */ "./src/Globals.js");




class UI {
    constructor(map, player) {
        this.renderer = new _Rendering_Renderer__WEBPACK_IMPORTED_MODULE_0__["Renderer"](document.getElementById("container"), {canvasId:'uiScreen'});
        this.map = map;
        this.player = player;
        this.minimapOffset = {
            x: 40,
            y: 40
        };
        this.minimapScale = 4;
        _Globals__WEBPACK_IMPORTED_MODULE_2__["GLOBAL_ASSETS"].push(new _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_1__["ImageAsset"]('gun_sprite', './sprites/shotgun.png'));
    }
    drawMiniMap(middleCorrdinates, units) {
        this.renderer.setFillStyle('white');
        for (let nx = 0; nx < this.map.mapWidth; nx++) {
            for (let ny = 0; ny < this.map.mapHeight; ny++) {
                if (this.map.surface[ny * this.map.mapWidth + nx] === '#') {
                    this.renderer.renderRect((nx * this.minimapScale) + this.minimapOffset.x, (ny * this.minimapScale) + this.minimapOffset.y, this.minimapScale, this.minimapScale);
                }
                if(units.filter((u) => u.x === nx && u.y === ny).length > 0) {
                    this.renderer.setFillStyle('yellow');
                    this.renderer.renderRect((nx * this.minimapScale) + this.minimapOffset.x, (ny * this.minimapScale) + this.minimapOffset.y, this.minimapScale, this.minimapScale);
                    this.renderer.setFillStyle('white');
                }
            }
        }
        this.renderer.setFillStyle('red');
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
        ], 'red');
        this.renderer.setFillStyle('black');
    }
    async drawUI(middleCorrdinates, units) {
        this.renderer.clearAll();
        this.drawMiniMap(middleCorrdinates, units);
        // this.renderer.renderImage({
        //         X: 0, Y: 0,
        //         W:500, H: 307,
        //         i: 'gun_sprite'
        //     },            
        //     this.renderer.getWidth() / 2 -20, this.renderer.getHeight() - 307,
        //     500, 307);
        this.renderer.setFillStyle('white');
        this.renderer.renderRect(this.renderer.getWidth() / 2 - 15, this.renderer.getHeight() / 2 - 2, 30, 4);
        this.renderer.renderRect(this.renderer.getWidth() / 2 - 2, this.renderer.getHeight() / 2 - 15, 4, 30);
    }
}

/***/ }),

/***/ "./src/Unit.js":
/*!*********************!*\
  !*** ./src/Unit.js ***!
  \*********************/
/*! exports provided: Unit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unit", function() { return Unit; });
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Globals */ "./src/Globals.js");


class Unit {
    constructor(x, y, vx, vy, asset) {
        this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.remove = false;
		if(typeof asset !== "undefined" && asset !== null){
			this.asset = Object(_Globals__WEBPACK_IMPORTED_MODULE_0__["GetAsset"])(asset);
		}
	}
	
	remove() {
		this.remove = true;
	}
}

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

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: map1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map1", function() { return map1; });
const map1 = {
    mapHeight: 32,
    mapWidth: 32,
    surface: ""
}
map1.surface =  "#########.......#########.......";
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
/* harmony import */ var _Controls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controls.js */ "./src/Controls.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");
/* harmony import */ var _Utils_Stats__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/Stats */ "./src/Utils/Stats.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Rendering/ImageAsset */ "./src/Rendering/ImageAsset.js");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Globals */ "./src/Globals.js");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Unit */ "./src/Unit.js");
/* harmony import */ var _Rendering_UnicodeAsset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Rendering/UnicodeAsset */ "./src/Rendering/UnicodeAsset.js");
/* harmony import */ var _FileLoader_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FileLoader.js */ "./src/FileLoader.js");
/* harmony import */ var _Not3D__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Not3D */ "./src/Not3D.ts");










var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.stats = new _Utils_Stats__WEBPACK_IMPORTED_MODULE_2__["Stats"]();
        this.engine = new _Not3D__WEBPACK_IMPORTED_MODULE_9__["Not3D"](document.getElementById("container"), {}, this.stats);
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
        this.middleCorrdinates = {};
        _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(new _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_4__["ImageAsset"]("wall_sprite", "./sprites/wall3.bmp"));
        _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(new _Rendering_ImageAsset__WEBPACK_IMPORTED_MODULE_4__["ImageAsset"]("lamp", "./sprites/lamp-min2.png"));
        this.units = [];
        Object(_Globals__WEBPACK_IMPORTED_MODULE_5__["SetAllLoaded"])(false);
        _FileLoader_js__WEBPACK_IMPORTED_MODULE_8__["FileLoader"].loadJSON("../assets/objects/lamp.json", function (jsonText) {
            _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(new _Rendering_UnicodeAsset__WEBPACK_IMPORTED_MODULE_7__["UnicodeAsset"]("lamp_cm", JSON.parse(jsonText), 0.5));
            _this.units.push(new _Unit__WEBPACK_IMPORTED_MODULE_6__["Unit"](11, 14, 0, 0, "lamp_cm"));
            _FileLoader_js__WEBPACK_IMPORTED_MODULE_8__["FileLoader"].loadJSON("../assets/objects/rocket.json", function (jsonText) {
                _Globals__WEBPACK_IMPORTED_MODULE_5__["GLOBAL_ASSETS"].push(new _Rendering_UnicodeAsset__WEBPACK_IMPORTED_MODULE_7__["UnicodeAsset"]("rocket", JSON.parse(jsonText), 0.5));
                Object(_Globals__WEBPACK_IMPORTED_MODULE_5__["SetAllLoaded"])(true);
            });
        });
        this.engine.setLoop(function () { _this.move(); });
        this.engine.start(function () {
            _this.createControls();
        });
    }
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
            var shadeLevel = (distanceToWall * 0.1).toFixed(2);
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
                object.remove();
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
                shadeLevel); // the shade level
            }
        }
    };
    Game.prototype.createControls = function () {
        var _this = this;
        this.controls = new _Controls_js__WEBPACK_IMPORTED_MODULE_0__["Controls"]({
            pointerLock: true,
            canvas: this.renderer.canvas,
            pointerCallout: function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Fzc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9Db250cm9scy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRmlsZUxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTm90M0QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9JbWFnZUFzc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9Vbmljb2RlQXNzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9WaXN1YWxVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVUkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1VuaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1V0aWxzL1N0YXRzLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7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IFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImV4cG9ydCBjbGFzcyBBc3NldCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNDb21wbGV0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29udHJvbHMge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMua2V5c0JpbmRpbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5tb3VzZWRvd25DYWxsb3V0ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBpZihvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncG9pbnRlckxvY2snKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhb3B0aW9uc1sncG9pbnRlckxvY2snXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uc1snY2FudmFzJ10gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJJbiBvcmRlciB0byB1dGlsaXplIHBvaW50ZXIgbG9jaywgcHJvdmlkZSBjb252YXMgaW4gb3B0aW9ucyFcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VNb3VzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZFBvaW50ZXIob3B0aW9uc1snY2FudmFzJ10sIG9wdGlvbnNbJ3BvaW50ZXJDYWxsb3V0J10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5cyhrZXlzLCBjYWxsb3V0KSB7XHJcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShrZXlzKSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5c0JpbmRpbmdzW2tleXNbaV1dID0gY2FsbG91dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IFwiS2V5cyBwYXJhbWV0ZXIgc2hvdWxkIGJlIGFuIEFycmF5IVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kS2V5KGtleSwgY2FsbG91dCkge1xyXG4gICAgICAgIGlmKHR5cGVvZiBrZXlzID09PSAnU3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNCaW5kaW5nc1trZXlzXSA9IGNhbGxvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJLZXkgcGFyYW1ldGVyIHNob3VsZCBiZSBTdHJpbmchXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNb3VzZWRvd24oY2FsbG91dCkge1xyXG4gICAgICAgIHRoaXMubW91c2Vkb3duQ2FsbG91dCA9IGNhbGxvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBmRWxhcHNlZFRpbWUgPSAwLjFcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgIGlmKHNlbGYua2V5c0JpbmRpbmdzLmhhc093blByb3BlcnR5KGUua2V5Q29kZSkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYua2V5c0JpbmRpbmdzW2Uua2V5Q29kZV0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgIGlmKHNlbGYubW91c2Vkb3duQ2FsbG91dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm1vdXNlZG93bkNhbGxvdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBiaW5kUG9pbnRlcihjYW52YXMsIHBvaW50ZXJDYWxsb3V0KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2sgPSBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrIHx8IGNhbnZhcy5tb3pSZXF1ZXN0UG9pbnRlckxvY2s7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmV4aXRQb2ludGVyTG9jayA9IGRvY3VtZW50LmV4aXRQb2ludGVyTG9jayB8fCBkb2N1bWVudC5tb3pFeGl0UG9pbnRlckxvY2s7XHJcblxyXG4gICAgICAgIGNhbnZhcy5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnVzZU1vdXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxvY2tjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBzZWxmLmxvY2tDaGFuZ2UoY2FudmFzLCBwb2ludGVyQ2FsbG91dCk7XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21venBvaW50ZXJsb2NrY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgc2VsZi5sb2NrQ2hhbmdlKGNhbnZhcywgcG9pbnRlckNhbGxvdXQpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGxvY2tDaGFuZ2UoY2FudmFzLCBwb2ludGVyQ2FsbG91dCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoZG9jdW1lbnQucG9pbnRlckxvY2tFbGVtZW50ID09PSBjYW52YXMgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnQubW96UG9pbnRlckxvY2tFbGVtZW50ID09PSBjYW52YXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyBsb2NrZWQnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIXNlbGYudXNlTW91c2UpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJDYWxsb3V0KGUpO1xyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBwb2ludGVyIGxvY2sgc3RhdHVzIGlzIG5vdyB1bmxvY2tlZCcpO1xyXG4gICAgICAgICAgICBzZWxmLnVzZU1vdXNlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEZpbGVMb2FkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkSlNPTihmaWxlTmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgeG9iaiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhvYmoub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgeG9iai5vcGVuKCdHRVQnLCBmaWxlTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgeG9iai5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHhvYmoucmVhZHlTdGF0ZSA9PSA0ICYmIHhvYmouc3RhdHVzID09IFwiMjAwXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAub3BlbiB3aWxsIE5PVCByZXR1cm4gYSB2YWx1ZSBidXQgc2ltcGx5IHJldHVybnMgdW5kZWZpbmVkIGluIGFzeW5jIG1vZGUgc28gdXNlIGEgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhvYmoucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeG9iai5zZW5kKG51bGwpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCIuL1JlbmRlcmluZy9JbWFnZUFzc2V0XCI7XHJcblxyXG5leHBvcnQgbGV0IEdMT0JBTF9BU1NFVFMgPSBbXTtcclxuZXhwb3J0IGxldCBBTExfTE9BREVEID0gdHJ1ZTtcclxuZXhwb3J0IGxldCBHZXRBc3NldCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIGxldCByZXN1bHQgPSBHTE9CQUxfQVNTRVRTLmZpbHRlcigoYXNzZXQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXNzZXQubmFtZSA9PT0gbmFtZTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXN1bHQgfHwgcmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdFswXTtcclxufVxyXG5leHBvcnQgbGV0IEFyZUFsbEFzc2V0c0xvYWRlZCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiBHTE9CQUxfQVNTRVRTLmZpbHRlcigoYXNzZXQpID0+IHtcclxuICAgICAgICByZXR1cm4gYXNzZXQuaXNDb21wbGV0ZSgpO1xyXG4gICAgfSkubGVuZ3RoID09PSBHTE9CQUxfQVNTRVRTLmxlbmd0aCAmJiBBTExfTE9BREVEO1xyXG59XHJcbmV4cG9ydCBsZXQgU2V0QWxsTG9hZGVkID0gZnVuY3Rpb24obG9hZGVkKSB7XHJcbiAgICBBTExfTE9BREVEID0gbG9hZGVkO1xyXG59IiwiaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi9SZW5kZXJpbmcvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgQXJlQWxsQXNzZXRzTG9hZGVkIH0gZnJvbSBcIi4vR2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBTdGF0cyB9IGZyb20gXCIuL1V0aWxzL1N0YXRzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90M0Qge1xyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gICAgc3RhdHM6IFN0YXRzO1xyXG4gICAgbG9vcENhbGxiYWNrOiBGdW5jdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwsIHJlbmRlck9wdGlvbnM6IG9iamVjdCwgc3RhdHM6IFN0YXRzKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0cyA9IHN0YXRzO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIocGFyZW50RWxlbWVudCwgcmVuZGVyT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9vcChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvb3BDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1haW5Mb29wKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdHMpIHsgdGhpcy5zdGF0cy5iZWdpbigpOyB9XHJcbiAgICAgICAgdGhpcy5sb29wQ2FsbGJhY2soKTtcclxuICAgICAgICBpZih0aGlzLnN0YXRzKSB7IHRoaXMuc3RhdHMuZW5kKCk7IH1cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4geyB0aGlzLm1haW5Mb29wKCk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmKEFyZUFsbEFzc2V0c0xvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmKCEhY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFpbkxvb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEFzc2V0IH0gZnJvbSBcIi4uL0Fzc2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VBc3NldCBleHRlbmRzIEFzc2V0IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHNyYykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHNyYztcclxuICAgIH1cclxuICAgIGlzQ29tcGxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0aGlzLmltYWdlLmNvbXBsZXRlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFZpc3VhbFV0aWxzIH0gZnJvbSAnLi9WaXN1YWxVdGlscy5qcyc7XHJcbmltcG9ydCB7IEdMT0JBTF9BU1NFVFMsIEdldEFzc2V0IH0gZnJvbSAnLi4vR2xvYmFscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IocGFyZW50RWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnRcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICByZXNEZWNyZWFzZTogMSxcclxuICAgICAgICAgICAgY2FudmFzSWQ6ICdtYWluU2NyZWVuJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcblx0XHR0aGlzLmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpO1xyXG5cdFx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xyXG5cdFx0dGhpcy5jYW52YXMuc2V0QXR0cmlidXRlKCdpZCcsICB0aGlzLm9wdGlvbnMuY2FudmFzSWQpO1xyXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7IFxyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5uQ2VpbGluZyA9IDA7XHJcbiAgICAgICAgdGhpcy5uRmxvb3IgPSAwO1xyXG4gICAgICAgIHRoaXMub2ZmU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy55QW5nbGUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMub3B0aW9ucy5yZXNEZWNyZWFzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZWlnaHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMub3B0aW9ucy5yZXNEZWNyZWFzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWxsU3R5bGUoY29sb3IpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJBbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJHbG9iYWxzKCkge1xyXG4gICAgICAgIGxldCBtaWRkbGVMaW5lID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gMiArIHRoaXMueUFuZ2xlO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiKDQ0LCAxMDcsIDI1NSknO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgbGluZWFyR3JhZGllbnQxID0gdGhpcy5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIHRoaXMuY2FudmFzLmhlaWdodCwgMCwgbWlkZGxlTGluZSk7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgwLCAncmdiKDE0NywgNjcsIDIpJyk7XHJcbiAgICAgICAgbGluZWFyR3JhZGllbnQxLmFkZENvbG9yU3RvcCgwLjY1LCBWaXN1YWxVdGlscy5zaGFkZUJsZW5kQ29udmVydCgtMC44LCAncmdiKDE0NywgNjcsIDIpJykpO1xyXG4gICAgICAgIGxpbmVhckdyYWRpZW50MS5hZGRDb2xvclN0b3AoMSwgJ3JnYigwLCAwLCAwKScpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBsaW5lYXJHcmFkaWVudDE7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIG1pZGRsZUxpbmUsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQgLSBtaWRkbGVMaW5lKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJ2JsYWNrJztcclxuICAgIH1cclxuICAgIHJlbmRlckltYWdlKGltYWdlLCBzcGFjZVgsIHNwYWNlWSwgc3BhY2VXaWR0aCwgc3BhY2VIZWlnaHQsIG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgcmVuZGVyQ29udGV4dCA9IHRoaXMuZ2V0UmVuZGVyQ29udGV4dCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnNob3VsZEltYWdlQmVSZW5kZXJlZChvcHRpb25zKSkge1xyXG4gICAgICAgICAgICByZW5kZXJDb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgIEdldEFzc2V0KGltYWdlLmkpLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2UuWCwgaW1hZ2UuWSwgaW1hZ2UuVywgaW1hZ2UuSCxcclxuICAgICAgICAgICAgICAgIHNwYWNlWCwgc3BhY2VZICsgdGhpcy55QW5nbGUsIHNwYWNlV2lkdGgsIHNwYWNlSGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnc2hhZGVMZXZlbCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAnICsgb3B0aW9uc1snc2hhZGVMZXZlbCddICsgJyknO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsUmVjdChzcGFjZVgsIHNwYWNlWSArIHRoaXMueUFuZ2xlLCBzcGFjZVdpZHRoLCBzcGFjZUhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyVW5pY29kZUFzc2V0KGFzc2V0LCBzcGFjZVgsIHNwYWNlWSwgd2lkdGgsIGhlaWdodCwgZk1pZGRsZU9mT2JqZWN0LCBmRGlzdGFuY2VGcm9tUGxheWVyLCBmRGVwdGhCdWZmZXIsIHNoYWRlTGV2ZWwpIHtcclxuICAgICAgICBsZXQgcmVuZGVyQ29udGV4dCA9IHRoaXMuZ2V0UmVuZGVyQ29udGV4dCgpO1xyXG4gICAgICAgIGZvciAobGV0IGx5ID0gMDsgbHkgPCBhc3NldC5yb3dzOyBseSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGx4ID0gMDsgbHggPCBhc3NldC5jb2xzOyBseCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvcG9ydGlhbFdpZHRoID0gd2lkdGggLyBhc3NldC5jb2xzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BvcnRpYWxIZWlnaHQgPSBoZWlnaHQgLyBhc3NldC5yb3dzO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuT2JqZWN0Q29sdW1uID0gTWF0aC5yb3VuZChmTWlkZGxlT2ZPYmplY3QgKyBseCAtIChhc3NldC5jb2xzIC8gMikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5PYmplY3RDb2x1bW4gPj0gMCAmJiBuT2JqZWN0Q29sdW1uIDwgdGhpcy5nZXRXaWR0aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0LmdldENoYXJBdChseSwgbHgpICE9PSAnLicgJiYgZkRlcHRoQnVmZmVyW25PYmplY3RDb2x1bW5dID49IGZEaXN0YW5jZUZyb21QbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZkRlcHRoQnVmZmVyW25PYmplY3RDb2x1bW5dID0gZkRpc3RhbmNlRnJvbVBsYXllcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZW5kZXJYID0gc3BhY2VYICsgKGx4ICogcHJvcG9ydGlhbFdpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbmRlclkgPSBzcGFjZVkgKyAobHkgKiBwcm9wb3J0aWFsSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsU3R5bGUgPSBhc3NldC5nZXRDaGFyQXQobHksIGx4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29udGV4dC5maWxsUmVjdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclgsIHJlbmRlclkgKyB0aGlzLnlBbmdsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BvcnRpYWxXaWR0aCwgcHJvcG9ydGlhbEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgJyArIHNoYWRlTGV2ZWwgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbnRleHQuZmlsbFJlY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJYLCByZW5kZXJZICsgdGhpcy55QW5nbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wb3J0aWFsV2lkdGgsIHByb3BvcnRpYWxIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRSZW5kZXJDb250ZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9mZlNjcmVlbiA/IHRoaXMuY2FudmFzLm9mZnNjcmVlbkNvbnRleHQgOiB0aGlzLmNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdWxkSW1hZ2VCZVJlbmRlcmVkKG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIG9wdGlvbnMgPT09IFwidW5kZWZpbmVkXCIgfHwgKHR5cGVvZiBvcHRpb25zICE9PSBcInVuZGVmaW5lZFwiICYmIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NoYWRlTGV2ZWwnKSAmJiBvcHRpb25zWydzaGFkZUxldmVsJ10gPCAwLjk5KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJSZWN0KHgsIHksIHcsIGgpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgdywgaCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTGluZShjb29yZGluYXRlcywgbGluZUNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oY29vcmRpbmF0ZXNbMF0ueCwgY29vcmRpbmF0ZXNbMF0ueSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhcclxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzW2ldLngsXHJcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlc1tpXS55XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBsaW5lQ29sb3I7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJlZ2luT2ZmU2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzLm9mZnNjcmVlbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLm9mZnNjcmVlbkNhbnZhcy53aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKTtcclxuICAgICAgICB0aGlzLmNhbnZhcy5vZmZzY3JlZW5DYW52YXMuaGVpZ2h0ID0gdGhpcy5nZXRXaWR0aCgpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLm9mZnNjcmVlbkNvbnRleHQgPSB0aGlzLmNhbnZhcy5vZmZzY3JlZW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLm9mZlNjcmVlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZW5kT2ZmU2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jYW52YXMub2Zmc2NyZWVuQ2FudmFzLCAwLCAwKTtcclxuICAgICAgICB0aGlzLm9mZlNjcmVlbiA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXNzZXQgfSBmcm9tIFwiLi4vQXNzZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbmljb2RlQXNzZXQgZXh0ZW5kcyBBc3NldCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjaGFybWFwLCBzY2FsZSkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hhcm1hcCA9IGNoYXJtYXA7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucm93cyA9IHRoaXMuY2hhcm1hcC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5jb2xzID0gdGhpcy5jaGFybWFwWzBdLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGUgfHwgMTA7XHJcbiAgICB9XHJcbiAgICBnZXRDaGFyQXQocm93LCBjb2wpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFybWFwW3Jvd11bY29sXTtcclxuICAgIH1cclxuICAgIHNldENoYXJBdChyb3csIGNvbCwgY2hhcikge1xyXG4gICAgICAgIHRoaXMuY2hhcm1hcFtyb3ddW2NvbF0gPSBjaGFyO1xyXG4gICAgfVxyXG4gICAgZ2V0SGVpZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvd3MgKiB0aGlzLnNjYWxlO1xyXG4gICAgfVxyXG4gICAgZ2V0V2lkdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scyAqIHRoaXMuc2NhbGU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVmlzdWFsVXRpbHMge1xyXG4gICAgc3RhdGljIHNoYWRlQmxlbmRDb252ZXJ0KHAsIGZyb20sIHRvKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwICE9IFwibnVtYmVyXCIgfHwgcCA8IC0xIHx8IHAgPiAxIHx8IHR5cGVvZiBmcm9tICE9IFwic3RyaW5nXCIgfHwgKGZyb21bMF0gIT0gJ3InICYmIGZyb21bMF0gIT0gJyMnKSB8fCAodHlwZW9mIHRvICE9IFwic3RyaW5nXCIgJiYgdHlwZW9mIHRvICE9IFwidW5kZWZpbmVkXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGkgPSBwYXJzZUludCxcclxuICAgICAgICAgICAgciA9IE1hdGgucm91bmQsXHJcbiAgICAgICAgICAgIGggPSBmcm9tLmxlbmd0aCA+IDksXHJcbiAgICAgICAgICAgIGggPSB0eXBlb2YgdG8gPT0gXCJzdHJpbmdcIiA/IHRvLmxlbmd0aCA+IDkgPyB0cnVlIDogdG8gPT0gXCJjXCIgPyAhaCA6IGZhbHNlIDogaCxcclxuICAgICAgICAgICAgYiA9IHAgPCAwLFxyXG4gICAgICAgICAgICBwID0gYiA/IHAgKiAtMSA6IHAsXHJcbiAgICAgICAgICAgIHRvID0gdG8gJiYgdG8gIT0gXCJjXCIgPyB0byA6IGIgPyBcIiMwMDAwMDBcIiA6IFwiI0ZGRkZGRlwiLFxyXG4gICAgICAgICAgICBmID0gVmlzdWFsVXRpbHMuc2JjUmlwKGZyb20sIGkpLFxyXG4gICAgICAgICAgICB0ID0gVmlzdWFsVXRpbHMuc2JjUmlwKHRvLCBpKTtcclxuICAgICAgICBpZiAoIWYgfHwgIXQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmIChoKSByZXR1cm4gXCJyZ2IoXCIgKyByKCh0WzBdIC0gZlswXSkgKiBwICsgZlswXSkgKyBcIixcIiArIHIoKHRbMV0gLSBmWzFdKSAqIHAgKyBmWzFdKSArIFwiLFwiICsgcigodFsyXSAtIGZbMl0pICogcCArIGZbMl0pICsgKGZbM10gPCAwICYmIHRbM10gPCAwID8gXCIpXCIgOiBcIixcIiArIChmWzNdID4gLTEgJiYgdFszXSA+IC0xID8gcigoKHRbM10gLSBmWzNdKSAqIHAgKyBmWzNdKSAqIDEwMDAwKSAvIDEwMDAwIDogdFszXSA8IDAgPyBmWzNdIDogdFszXSkgKyBcIilcIik7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gXCIjXCIgKyAoMHgxMDAwMDAwMDAgKyAoZlszXSA+IC0xICYmIHRbM10gPiAtMSA/IHIoKCh0WzNdIC0gZlszXSkgKiBwICsgZlszXSkgKiAyNTUpIDogdFszXSA+IC0xID8gcih0WzNdICogMjU1KSA6IGZbM10gPiAtMSA/IHIoZlszXSAqIDI1NSkgOiAyNTUpICogMHgxMDAwMDAwICsgcigodFswXSAtIGZbMF0pICogcCArIGZbMF0pICogMHgxMDAwMCArIHIoKHRbMV0gLSBmWzFdKSAqIHAgKyBmWzFdKSAqIDB4MTAwICsgcigodFsyXSAtIGZbMl0pICogcCArIGZbMl0pKS50b1N0cmluZygxNikuc2xpY2UoZlszXSA+IC0xIHx8IHRbM10gPiAtMSA/IDEgOiAzKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBzYmNSaXAoZCwgaSkge1xyXG4gICAgICAgIHZhciBsID0gZC5sZW5ndGgsXHJcbiAgICAgICAgICAgIFJHQiA9IG5ldyBPYmplY3QoKTtcclxuICAgICAgICBpZiAobCA+IDkpIHtcclxuICAgICAgICAgICAgZCA9IGQuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICBpZiAoZC5sZW5ndGggPCAzIHx8IGQubGVuZ3RoID4gNCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIFJHQlswXSA9IGkoZFswXS5zbGljZSg0KSksIFJHQlsxXSA9IGkoZFsxXSksIFJHQlsyXSA9IGkoZFsyXSksIFJHQlszXSA9IGRbM10gPyBwYXJzZUZsb2F0KGRbM10pIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGwgPT0gOCB8fCBsID09IDYgfHwgbCA8IDQpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBpZiAobCA8IDYpIGQgPSBcIiNcIiArIGRbMV0gKyBkWzFdICsgZFsyXSArIGRbMl0gKyBkWzNdICsgZFszXSArIChsID4gNCA/IGRbNF0gKyBcIlwiICsgZFs0XSA6IFwiXCIpO1xyXG4gICAgICAgICAgICBkID0gaShkLnNsaWNlKDEpLCAxNiksIFJHQlswXSA9IGQgPj4gMTYgJiAyNTUsIFJHQlsxXSA9IGQgPj4gOCAmIDI1NSwgUkdCWzJdID0gZCAmIDI1NSwgUkdCWzNdID0gbCA9PSA5IHx8IGwgPT0gNSA/IHIoKChkID4+IDI0ICYgMjU1KSAvIDI1NSkgKiAxMDAwMCkgLyAxMDAwMCA6IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUkdCO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi9SZW5kZXJpbmcvUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCIuL1JlbmRlcmluZy9JbWFnZUFzc2V0XCI7XHJcbmltcG9ydCB7IEdMT0JBTF9BU1NFVFMgfSBmcm9tIFwiLi9HbG9iYWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVUkge1xyXG4gICAgY29uc3RydWN0b3IobWFwLCBwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLCB7Y2FudmFzSWQ6J3VpU2NyZWVuJ30pO1xyXG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMubWluaW1hcE9mZnNldCA9IHtcclxuICAgICAgICAgICAgeDogNDAsXHJcbiAgICAgICAgICAgIHk6IDQwXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm1pbmltYXBTY2FsZSA9IDQ7XHJcbiAgICAgICAgR0xPQkFMX0FTU0VUUy5wdXNoKG5ldyBJbWFnZUFzc2V0KCdndW5fc3ByaXRlJywgJy4vc3ByaXRlcy9zaG90Z3VuLnBuZycpKTtcclxuICAgIH1cclxuICAgIGRyYXdNaW5pTWFwKG1pZGRsZUNvcnJkaW5hdGVzLCB1bml0cykge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RmlsbFN0eWxlKCd3aGl0ZScpO1xyXG4gICAgICAgIGZvciAobGV0IG54ID0gMDsgbnggPCB0aGlzLm1hcC5tYXBXaWR0aDsgbngrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBueSA9IDA7IG55IDwgdGhpcy5tYXAubWFwSGVpZ2h0OyBueSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXAuc3VyZmFjZVtueSAqIHRoaXMubWFwLm1hcFdpZHRoICsgbnhdID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJlY3QoKG54ICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LngsIChueSAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC55LCB0aGlzLm1pbmltYXBTY2FsZSwgdGhpcy5taW5pbWFwU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodW5pdHMuZmlsdGVyKCh1KSA9PiB1LnggPT09IG54ICYmIHUueSA9PT0gbnkpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZSgneWVsbG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KChueCAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC54LCAobnkgKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueSwgdGhpcy5taW5pbWFwU2NhbGUsIHRoaXMubWluaW1hcFNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZSgnd2hpdGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZSgncmVkJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXJSZWN0KCh0aGlzLnBsYXllci5wb3NYICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LngsICh0aGlzLnBsYXllci5wb3NZICogdGhpcy5taW5pbWFwU2NhbGUpICsgdGhpcy5taW5pbWFwT2Zmc2V0LnksIDIsIDIpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckxpbmUoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAodGhpcy5wbGF5ZXIucG9zWCAqIHRoaXMubWluaW1hcFNjYWxlKSArIHRoaXMubWluaW1hcE9mZnNldC54LFxyXG4gICAgICAgICAgICAgICAgeTogKHRoaXMucGxheWVyLnBvc1kgKiB0aGlzLm1pbmltYXBTY2FsZSkgKyB0aGlzLm1pbmltYXBPZmZzZXQueVxyXG4gICAgICAgICAgICB9LCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiBNYXRoLmZsb29yKHRoaXMucGxheWVyLnBvc1ggKyBtaWRkbGVDb3JyZGluYXRlcy54ICogNSkgKiB0aGlzLm1pbmltYXBTY2FsZSArIHRoaXMubWluaW1hcE9mZnNldC54LFxyXG4gICAgICAgICAgICAgICAgeTogTWF0aC5mbG9vcih0aGlzLnBsYXllci5wb3NZICsgbWlkZGxlQ29ycmRpbmF0ZXMueSAqIDUpICogdGhpcy5taW5pbWFwU2NhbGUgKyB0aGlzLm1pbmltYXBPZmZzZXQueSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sICdyZWQnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZSgnYmxhY2snKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGRyYXdVSShtaWRkbGVDb3JyZGluYXRlcywgdW5pdHMpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmNsZWFyQWxsKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3TWluaU1hcChtaWRkbGVDb3JyZGluYXRlcywgdW5pdHMpO1xyXG4gICAgICAgIC8vIHRoaXMucmVuZGVyZXIucmVuZGVySW1hZ2Uoe1xyXG4gICAgICAgIC8vICAgICAgICAgWDogMCwgWTogMCxcclxuICAgICAgICAvLyAgICAgICAgIFc6NTAwLCBIOiAzMDcsXHJcbiAgICAgICAgLy8gICAgICAgICBpOiAnZ3VuX3Nwcml0ZSdcclxuICAgICAgICAvLyAgICAgfSwgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5nZXRXaWR0aCgpIC8gMiAtMjAsIHRoaXMucmVuZGVyZXIuZ2V0SGVpZ2h0KCkgLSAzMDcsXHJcbiAgICAgICAgLy8gICAgIDUwMCwgMzA3KTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEZpbGxTdHlsZSgnd2hpdGUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJlY3QodGhpcy5yZW5kZXJlci5nZXRXaWR0aCgpIC8gMiAtIDE1LCB0aGlzLnJlbmRlcmVyLmdldEhlaWdodCgpIC8gMiAtIDIsIDMwLCA0KTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJlY3QodGhpcy5yZW5kZXJlci5nZXRXaWR0aCgpIC8gMiAtIDIsIHRoaXMucmVuZGVyZXIuZ2V0SGVpZ2h0KCkgLyAyIC0gMTUsIDQsIDMwKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEdldEFzc2V0IH0gZnJvbSBcIi4vR2xvYmFsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVuaXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdngsIHZ5LCBhc3NldCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cdFx0dGhpcy52eCA9IHZ4O1xyXG5cdFx0dGhpcy52eSA9IHZ5O1xyXG5cdFx0dGhpcy5yZW1vdmUgPSBmYWxzZTtcclxuXHRcdGlmKHR5cGVvZiBhc3NldCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhc3NldCAhPT0gbnVsbCl7XHJcblx0XHRcdHRoaXMuYXNzZXQgPSBHZXRBc3NldChhc3NldCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpIHtcclxuXHRcdHRoaXMucmVtb3ZlID0gdHJ1ZTtcclxuXHR9XHJcbn0iLCIvKipcclxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdHMge1xyXG5cdGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcblx0bW9kZTogbnVtYmVyO1xyXG5cdHJldmlzaW9uOiBudW1iZXIgPSAxNjtcclxuXHRiZWdpblRpbWU6IG51bWJlcjtcclxuXHRmcmFtZXM6IG51bWJlcjtcclxuXHRmcHNQYW5lbDogUGFuZWw7XHJcblx0bXNQYW5lbDogUGFuZWw7XHJcblx0bWVtUGFuZWw6IFBhbmVsO1xyXG5cdHByZXZUaW1lOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5tb2RlID0gMDtcclxuXHJcblx0XHR0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHR0aGlzLmNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMFwiO1xyXG5cdFx0dGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogRXZlbnQpID0+ICB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHRoaXMuc2hvd1BhbmVsKCsrdGhpcy5tb2RlICUgdGhpcy5jb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoKTtcclxuXHRcdH0sIGZhbHNlICk7XHJcblxyXG5cdFx0dGhpcy5iZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcclxuXHRcdHRoaXMucHJldlRpbWUgPSB0aGlzLmJlZ2luVGltZTtcclxuXHRcdHRoaXMuZnJhbWVzID0gMDtcclxuXHJcblx0XHR0aGlzLmZwc1BhbmVsID0gdGhpcy5hZGRQYW5lbCggbmV3IFBhbmVsKCBcIkZQU1wiLCBcIiMwZmZcIiwgXCIjMDAyXCIgKSApO1xyXG5cdFx0dGhpcy5tc1BhbmVsID0gdGhpcy5hZGRQYW5lbCggbmV3IFBhbmVsKCBcIk1TXCIsIFwiIzBmMFwiLCBcIiMwMjBcIiApICk7XHJcblxyXG5cdFx0dGhpcy5zaG93UGFuZWwoMCk7XHJcblx0fVxyXG5cclxuXHRhZGRQYW5lbChwYW5lbDogUGFuZWwpOiBQYW5lbCB7XHJcblx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggcGFuZWwuY2FudmFzICk7XHJcblxyXG5cdFx0cmV0dXJuIHBhbmVsO1xyXG5cdH1cclxuXHJcblx0c2hvd1BhbmVsKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcclxuXHRcdFx0dmFyIGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMuY29udGFpbmVyLmNoaWxkcmVuW2ldO1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBpID09PSBpZCA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMubW9kZSA9IGlkO1xyXG5cdH1cclxuXHJcblx0YmVnaW4oKTogdm9pZCB7XHJcblxyXG5cdFx0dGhpcy5iZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcclxuXHJcblx0fVxyXG5cclxuXHRlbmQoKTogbnVtYmVyIHtcclxuXHJcblx0XHR0aGlzLmZyYW1lcysrO1xyXG5cclxuXHRcdHZhciB0aW1lOiBudW1iZXIgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcclxuXHJcblx0XHR0aGlzLm1zUGFuZWwudXBkYXRlKCB0aW1lIC0gdGhpcy5iZWdpblRpbWUsIDIwMCApO1xyXG5cclxuXHRcdGlmICggdGltZSA+PSB0aGlzLnByZXZUaW1lICsgMTAwMCApIHtcclxuXHJcblx0XHRcdHRoaXMuZnBzUGFuZWwudXBkYXRlKCAoIHRoaXMuZnJhbWVzICogMTAwMCApIC8gKCB0aW1lIC0gdGhpcy5wcmV2VGltZSApLCAxMDAgKTtcclxuXHJcblx0XHRcdHRoaXMucHJldlRpbWUgPSB0aW1lO1xyXG5cdFx0XHR0aGlzLmZyYW1lcyA9IDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aW1lO1xyXG5cclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcblx0XHR0aGlzLmJlZ2luVGltZSA9IHRoaXMuZW5kKCk7XHJcblxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUGFuZWwge1xyXG5cdG1pbjogbnVtYmVyO1xyXG5cdG1heDogbnVtYmVyO1xyXG5cdGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB8IG51bGw7XHJcblx0Ymc6IHN0cmluZztcclxuXHRmZzogc3RyaW5nO1xyXG5cdFdJRFRIOiBudW1iZXI7XHJcblx0SEVJR0hUOiBudW1iZXI7XHJcblx0VEVYVF9YOiBudW1iZXI7XHJcblx0VEVYVF9ZOiBudW1iZXI7XHJcblx0R1JBUEhfWDogbnVtYmVyO1xyXG5cdEdSQVBIX1k6IG51bWJlcjtcclxuXHRHUkFQSF9XSURUSDogbnVtYmVyO1xyXG5cdEdSQVBIX0hFSUdIVDogbnVtYmVyO1xyXG5cdGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcblx0UFI6IG51bWJlcjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZmc6IHN0cmluZywgYmc6IHN0cmluZykge1xyXG5cdFx0dGhpcy5taW4gPSBJbmZpbml0eTtcclxuXHRcdHRoaXMubWF4ID0gMDtcclxuXHRcdHRoaXMuZmcgPSBmZztcclxuXHRcdHRoaXMuYmcgPSBiZztcclxuXHRcdHRoaXMubmFtZSA9IG5hbWU7XHJcblxyXG5cdFx0dGhpcy5QUiA9IE1hdGgucm91bmQoIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEgKTtcclxuXHJcblx0XHR0aGlzLldJRFRIID0gODAgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5IRUlHSFQgPSA0OCAqIHRoaXMuUFI7XHJcblx0XHR0aGlzLlRFWFRfWCA9IDMgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5URVhUX1kgPSAyICogdGhpcy5QUjtcclxuXHRcdHRoaXMuR1JBUEhfWCA9IDMgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5HUkFQSF9ZID0gMTUgKiB0aGlzLlBSO1xyXG5cdFx0dGhpcy5HUkFQSF9XSURUSCA9IDc0ICogdGhpcy5QUjtcclxuXHRcdHRoaXMuR1JBUEhfSEVJR0hUID0gMzAgKiB0aGlzLlBSO1xyXG5cclxuXHRcdHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJjYW52YXNcIiApO1xyXG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSB0aGlzLldJRFRIO1xyXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5IRUlHSFQ7XHJcblx0XHR0aGlzLmNhbnZhcy5zdHlsZS5jc3NUZXh0ID0gXCJ3aWR0aDo4MHB4O2hlaWdodDo0OHB4XCI7XHJcblxyXG5cdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCggXCIyZFwiICk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY29udGV4dCAhPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZm9udCA9IFwiYm9sZCBcIiArICggOSAqIHRoaXMuUFIgKSArIFwicHggSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWZcIjtcclxuXHRcdFx0dGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcblxyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gYmc7XHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsUmVjdCggMCwgMCwgdGhpcy5XSURUSCwgdGhpcy5IRUlHSFQgKTtcclxuXHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBmZztcclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxUZXh0KCBuYW1lLCB0aGlzLlRFWFRfWCwgdGhpcy5URVhUX1kgKTtcclxuXHRcdFx0dGhpcy5jb250ZXh0LmZpbGxSZWN0KCB0aGlzLkdSQVBIX1gsIHRoaXMuR1JBUEhfWSwgdGhpcy5HUkFQSF9XSURUSCwgdGhpcy5HUkFQSF9IRUlHSFQgKTtcclxuXHJcblx0XHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBiZztcclxuXHRcdFx0dGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xyXG5cdFx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoIHRoaXMuR1JBUEhfWCwgdGhpcy5HUkFQSF9ZLCB0aGlzLkdSQVBIX1dJRFRILCB0aGlzLkdSQVBIX0hFSUdIVCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dXBkYXRlICh2YWx1ZTogbnVtYmVyLCBtYXhWYWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5jb250ZXh0ID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1pbiA9IE1hdGgubWluKHRoaXMubWluLCB2YWx1ZSApO1xyXG5cdFx0dGhpcy5tYXggPSBNYXRoLm1heCh0aGlzLm1heCwgdmFsdWUgKTtcclxuXHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iZztcclxuXHRcdHRoaXMuY29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFJlY3QoIDAsIDAsIHRoaXMuV0lEVEgsIHRoaXMuR1JBUEhfWSApO1xyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZmc7XHJcblx0XHR0aGlzLmNvbnRleHQuZmlsbFRleHQoXHJcblx0XHRcdE1hdGgucm91bmQoIHZhbHVlICkgKyBcIiBcIiArIHRoaXMubmFtZSArIFwiIChcIiArIE1hdGgucm91bmQoIHRoaXMubWluICkgKyBcIi1cIiArIE1hdGgucm91bmQoIHRoaXMubWF4ICkgKyBcIilcIiwgdGhpcy5URVhUX1gsIHRoaXMuVEVYVF9ZICk7XHJcblxyXG5cdFx0dGhpcy5jb250ZXh0LmRyYXdJbWFnZShcclxuXHRcdFx0dGhpcy5jYW52YXMsIHRoaXMuR1JBUEhfWCArIHRoaXMuUFIsIHRoaXMuR1JBUEhfWSwgdGhpcy5HUkFQSF9XSURUSCAtIHRoaXMuUFIsIHRoaXMuR1JBUEhfSEVJR0hULFxyXG5cdFx0XHR0aGlzLkdSQVBIX1gsIHRoaXMuR1JBUEhfWSwgdGhpcy5HUkFQSF9XSURUSCAtIHRoaXMuUFIsIHRoaXMuR1JBUEhfSEVJR0hUICk7XHJcblxyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxSZWN0KCB0aGlzLkdSQVBIX1ggKyB0aGlzLkdSQVBIX1dJRFRIIC0gdGhpcy5QUiwgdGhpcy5HUkFQSF9ZLCB0aGlzLlBSLCB0aGlzLkdSQVBIX0hFSUdIVCApO1xyXG5cclxuXHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJnO1xyXG5cdFx0dGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xyXG5cdFx0dGhpcy5jb250ZXh0LmZpbGxSZWN0KFxyXG5cdFx0XHR0aGlzLkdSQVBIX1ggKyB0aGlzLkdSQVBIX1dJRFRIIC0gdGhpcy5QUiwgdGhpcy5HUkFQSF9ZLCB0aGlzLlBSLCBNYXRoLnJvdW5kKCAoIDEgLSAoIHZhbHVlIC8gbWF4VmFsdWUgKSApICogdGhpcy5HUkFQSF9IRUlHSFQgKSApO1xyXG5cclxuXHR9XHJcbn0iLCJleHBvcnQgY29uc3QgbWFwMSA9IHtcclxuICAgIG1hcEhlaWdodDogMzIsXHJcbiAgICBtYXBXaWR0aDogMzIsXHJcbiAgICBzdXJmYWNlOiBcIlwiXHJcbn1cclxubWFwMS5zdXJmYWNlID0gIFwiIyMjIyMjIyMjLi4uLi4uLiMjIyMjIyMjIy4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLiMuLi4uLi4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4jIyMjIyMjIyMuLi4uLi4uIyMjIyMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uLi4uLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMuLi4uLi4uLi4uLi4uIyMjLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLiMjIyMuLi4uLi4uLi4uLi4jIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uIyMjIyMuLi4uLi4uLi4uLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4jIyMjLi4uLiMjIyMjIyMjLi4uLiMjIyMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjIy4jIyMjLi4uLi4uLiMjIyMjIy4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLiMuLi4uLi4uLi4uLi4uLi5cIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4jIyMjIyMjIyMuLi4uLi4uIyMuLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4uIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLiMjLi4uLi4uIyMuLi4uLi4jIy4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjLi4uLi4uLi4uLi4uIyMjIy4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMuLi4uLi4uLi4uLi4uIyMjLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLiMjIyMuLi4uLi4uLi4uLi4jIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiMjIyNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIy4uLi4uLi4uLi4uLi4uIyMuLi4uLi4uLi4uLi4uLiNcIjtcclxubWFwMS5zdXJmYWNlICs9IFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcIjsiLCJpbXBvcnQgeyBDb250cm9scyB9IGZyb20gXCIuL0NvbnRyb2xzLmpzXCI7XHJcbmltcG9ydCB7IFVJIH0gZnJvbSBcIi4vVUlcIjtcclxuXHJcbmltcG9ydCB7IFN0YXRzIH0gZnJvbSBcIi4vVXRpbHMvU3RhdHNcIjtcclxuaW1wb3J0IHsgbWFwMSB9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcIi4vUmVuZGVyaW5nL0ltYWdlQXNzZXRcIjtcclxuaW1wb3J0IHsgR0xPQkFMX0FTU0VUUywgU2V0QWxsTG9hZGVkIH0gZnJvbSBcIi4vR2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBVbml0IH0gZnJvbSBcIi4vVW5pdFwiO1xyXG5pbXBvcnQgeyBVbmljb2RlQXNzZXQgfSBmcm9tIFwiLi9SZW5kZXJpbmcvVW5pY29kZUFzc2V0XCI7XHJcbmltcG9ydCB7IEZpbGVMb2FkZXIgfSBmcm9tIFwiLi9GaWxlTG9hZGVyLmpzXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4vUmVuZGVyaW5nL1JlbmRlcmVyLmpzXCI7XHJcbmltcG9ydCB7IE5vdDNEIH0gZnJvbSBcIi4vTm90M0RcIjtcclxuXHJcbmludGVyZmFjZSBJTW92ZW1lbnQge1xyXG4gICAgbW92ZW1lbnRYOiBudW1iZXI7XHJcbiAgICBtb3ZlbWVudFk6IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgICBlbmdpbmU6IE5vdDNEO1xyXG4gICAgc3RhdHM6IFN0YXRzO1xyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyO1xyXG4gICAgZkZPVjogbnVtYmVyO1xyXG4gICAgZlNwZWVkOiBudW1iZXI7XHJcbiAgICBmRGVwdGg6IG51bWJlcjtcclxuICAgIHNjcmVlbldpZHRoOiBudW1iZXI7XHJcbiAgICBzY3JlZW5IZWlnaHQ6IG51bWJlcjtcclxuICAgIGZEZXB0aEJ1ZmZlcjogbnVtYmVyW107XHJcbiAgICBwbGF5ZXI6IHsgcG9zWDogbnVtYmVyOyBwb3NZOiBudW1iZXI7IGFuZ2xlOiBudW1iZXI7IHlBbmdsZTogbnVtYmVyOyB9O1xyXG4gICAgbWFwOiB7IG1hcEhlaWdodDogbnVtYmVyOyBtYXBXaWR0aDogbnVtYmVyOyBzdXJmYWNlOiBzdHJpbmc7IH07XHJcbiAgICB1aTogVUk7XHJcbiAgICBtaWRkbGVDb3JyZGluYXRlczoge307XHJcbiAgICB1bml0czogVW5pdFtdO1xyXG4gICAgbkNlaWxpbmc6IG51bWJlcjtcclxuICAgIG5GbG9vcjogbnVtYmVyO1xyXG4gICAgY29udHJvbHM6IENvbnRyb2xzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHMoKTtcclxuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBOb3QzRChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKSwge30sIHRoaXMuc3RhdHMpO1xyXG4gICAgICAgIC8vIGJlbmNobWFyayBzY3JpcHRcclxuICAgICAgICB0aGlzLnN0YXRzLnNob3dQYW5lbCgwKTsgLy8gMDogZnBzLCAxOiBtcywgMjogbWIsIDMrOiBjdXN0b21cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCB0aGlzLnN0YXRzLmNvbnRhaW5lciApO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gdGhpcy5lbmdpbmUucmVuZGVyZXI7XHJcblxyXG4gICAgICAgIHRoaXMuZkZPViA9IE1hdGguUEkgLyA0LjA7XHQvLyBmaWVsZCBvZiBWaWV3XHJcbiAgICAgICAgdGhpcy5mU3BlZWQgPSAyO1xyXG4gICAgICAgIHRoaXMuZkRlcHRoID0gMjU7XHRcdFx0Ly8gbWF4aW11bSByZW5kZXJpbmcgZGlzdGFuY2VcclxuXHJcbiAgICAgICAgdGhpcy5zY3JlZW5XaWR0aCA9IHRoaXMucmVuZGVyZXIuZ2V0V2lkdGgoKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkhlaWdodCA9IHRoaXMucmVuZGVyZXIuZ2V0SGVpZ2h0KCk7XHJcblx0XHR0aGlzLmZEZXB0aEJ1ZmZlciA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllciA9IHtcclxuICAgICAgICAgICAgcG9zWDogNy4xODM4MDA1MTc2Mjg4OTUsXHJcbiAgICAgICAgICAgIHBvc1k6IDkuOTIwMTcyMDUyNzA2MTI1LFxyXG4gICAgICAgICAgICBhbmdsZTogMC41MDAwMDAwMDAwMDAwMDIzLFxyXG4gICAgICAgICAgICB5QW5nbGU6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IG1hcDE7XHJcbiAgICAgICAgdGhpcy51aSA9IG5ldyBVSSh0aGlzLm1hcCwgdGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubWlkZGxlQ29ycmRpbmF0ZXMgPSB7fTtcclxuICAgICAgICBHTE9CQUxfQVNTRVRTLnB1c2gobmV3IEltYWdlQXNzZXQoXCJ3YWxsX3Nwcml0ZVwiLCBcIi4vc3ByaXRlcy93YWxsMy5ibXBcIikpO1xyXG4gICAgICAgIEdMT0JBTF9BU1NFVFMucHVzaChuZXcgSW1hZ2VBc3NldChcImxhbXBcIiwgXCIuL3Nwcml0ZXMvbGFtcC1taW4yLnBuZ1wiKSk7XHJcblxyXG4gICAgICAgIHRoaXMudW5pdHMgPSBbXTtcclxuXHJcbiAgICAgICAgU2V0QWxsTG9hZGVkKGZhbHNlKTtcclxuXHJcbiAgICAgICAgRmlsZUxvYWRlci5sb2FkSlNPTihcIi4uL2Fzc2V0cy9vYmplY3RzL2xhbXAuanNvblwiLCAoanNvblRleHQpID0+IHtcclxuICAgICAgICAgICAgR0xPQkFMX0FTU0VUUy5wdXNoKG5ldyBVbmljb2RlQXNzZXQoXCJsYW1wX2NtXCIsIEpTT04ucGFyc2UoanNvblRleHQpLCAwLjUpKTtcclxuICAgICAgICAgICAgdGhpcy51bml0cy5wdXNoKG5ldyBVbml0KDExLCAxNCwgMCwgMCwgXCJsYW1wX2NtXCIpKTtcclxuXHJcbiAgICAgICAgICAgIEZpbGVMb2FkZXIubG9hZEpTT04oXCIuLi9hc3NldHMvb2JqZWN0cy9yb2NrZXQuanNvblwiLCAoanNvblRleHQpID0+IHtcclxuICAgICAgICAgICAgICAgIEdMT0JBTF9BU1NFVFMucHVzaChuZXcgVW5pY29kZUFzc2V0KFwicm9ja2V0XCIsIEpTT04ucGFyc2UoanNvblRleHQpLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgIFNldEFsbExvYWRlZCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZW5naW5lLnNldExvb3AoKCkgPT4geyB0aGlzLm1vdmUoKTsgfSk7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUuc3RhcnQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnlBbmdsZSA9IHRoaXMucGxheWVyLnlBbmdsZTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckdsb2JhbHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5iZWdpbk9mZlNjcmVlbigpO1xyXG4gICAgICAgIHRoaXMubWFpblNjcmVlbigwLCB0aGlzLnNjcmVlbldpZHRoKTtcclxuICAgICAgICB0aGlzLmhhbmRsZU9iamVjdHMoKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmVuZE9mZlNjcmVlbigpO1xyXG5cclxuICAgICAgICB0aGlzLnVpLmRyYXdVSSh0aGlzLm1pZGRsZUNvcnJkaW5hdGVzLCB0aGlzLnVuaXRzKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWluU2NyZWVuKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgbGV0IGZSYXlBbmdsZTogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgc3RlcFNpemU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlVG9XYWxsOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBiSGl0V2FsbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBleWVYOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBleWVZOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBuVGVzdFg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG5UZXN0WTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gZnJvbTsgaSA8IHRvOyBpKyspIHtcclxuICAgICAgICAgICAgZlJheUFuZ2xlID0gKHRoaXMucGxheWVyLmFuZ2xlIC0gdGhpcy5mRk9WIC8gMi4wKSArIChpIC8gdGhpcy5zY3JlZW5XaWR0aCkgKiB0aGlzLmZGT1Y7XHJcbiAgICAgICAgICAgIHN0ZXBTaXplID0gMC4wNTtcclxuICAgICAgICAgICAgZGlzdGFuY2VUb1dhbGwgPSAwLjA7XHJcbiAgICAgICAgICAgIGJIaXRXYWxsID0gZmFsc2U7XHRcdC8vIHNldCB3aGVuIHJheSBoaXRzIHdhbGwgYmxvY2tcclxuICAgICAgICAgICAgZXllWCA9IE1hdGguc2luKGZSYXlBbmdsZSk7IC8vIHVuaXQgdmVjdG9yIGZvciByYXkgaW4gcGxheWVyIHNwYWNlXHJcbiAgICAgICAgICAgIGV5ZVkgPSBNYXRoLmNvcyhmUmF5QW5nbGUpO1xyXG4gICAgICAgICAgICBpZihpID09PSB0byAvIDIpIHsgdGhpcy5taWRkbGVDb3JyZGluYXRlcyA9IHt4OiBleWVYLCB5OiBleWVZfTsgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZTYW1wbGVYOiBudW1iZXIgPSAwLjA7XHJcbiAgICAgICAgICAgIC8vIGluY3JlbWVudGFsbHkgY2FzdCByYXkgZnJvbSBwbGF5ZXIsIGFsb25nIHJheSBhbmdsZSwgdGVzdGluZyBmb3JcclxuICAgICAgICAgICAgLy8gaW50ZXJzZWN0aW9uIHdpdGggYSBibG9ja1xyXG4gICAgICAgICAgICB3aGlsZSAoIWJIaXRXYWxsICYmIGRpc3RhbmNlVG9XYWxsIDwgdGhpcy5mRGVwdGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZVRvV2FsbCArPSBzdGVwU2l6ZTtcclxuICAgICAgICAgICAgICAgIG5UZXN0WCA9IE1hdGguZmxvb3IodGhpcy5wbGF5ZXIucG9zWCArIGV5ZVggKiBkaXN0YW5jZVRvV2FsbCk7XHJcbiAgICAgICAgICAgICAgICBuVGVzdFkgPSBNYXRoLmZsb29yKHRoaXMucGxheWVyLnBvc1kgKyBleWVZICogZGlzdGFuY2VUb1dhbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRlc3QgaWYgcmF5IGlzIG91dCBvZiBib3VuZHNcclxuICAgICAgICAgICAgICAgIGlmIChuVGVzdFggPCAwIHx8IG5UZXN0WCA+PSB0aGlzLm1hcC5tYXBXaWR0aCB8fCBuVGVzdFkgPCAwIHx8IG5UZXN0WSA+PSB0aGlzLm1hcC5tYXBIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBiSGl0V2FsbCA9IHRydWU7XHRcdFx0Ly8ganVzdCBzZXQgZGlzdGFuY2UgdG8gbWF4aW11bSBkZXB0aFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlVG9XYWxsID0gdGhpcy5mRGVwdGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJheSBpcyBpbmJvdW5kcyBzbyB0ZXN0IHRvIHNlZSBpZiB0aGUgcmF5IGNlbGwgaXMgYSB3YWxsIGJsb2NrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFwLnN1cmZhY2VbTWF0aC5yb3VuZChuVGVzdFggKiB0aGlzLm1hcC5tYXBXaWR0aCArIG5UZXN0WSldID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByYXkgaGFzIGhpdCB3YWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJIaXRXYWxsID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGVyZSByYXkgaGFzIGhpdCB3YWxsLiBCcmVhayBCbG9jayBib3VuZGFyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnQgNCBsaW5lIHNlZ21lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmQmxvY2tNaWRYOiBudW1iZXIgPSBuVGVzdFggKyAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmQmxvY2tNaWRZOiBudW1iZXIgPSBuVGVzdFkgKyAwLjU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZlRlc3RQb2ludFg6IG51bWJlciA9IHRoaXMucGxheWVyLnBvc1ggKyBleWVYICogZGlzdGFuY2VUb1dhbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmVGVzdFBvaW50WTogbnVtYmVyID0gdGhpcy5wbGF5ZXIucG9zWSArIGV5ZVkgKiBkaXN0YW5jZVRvV2FsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmVGVzdEFuZ2xlOiBudW1iZXIgPSBNYXRoLmF0YW4yKChmVGVzdFBvaW50WSAtIGZCbG9ja01pZFkpLCAoZlRlc3RQb2ludFggLSBmQmxvY2tNaWRYKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZlRlc3RBbmdsZSA+PSAtMy4xNDE1OSAqIDAuMjUgJiYgZlRlc3RBbmdsZSA8IDMuMTQxNTkgKiAwLjI1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmU2FtcGxlWCA9IGZUZXN0UG9pbnRZIC0gblRlc3RZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmVGVzdEFuZ2xlID49IDMuMTQxNTkgKiAwLjI1ICYmIGZUZXN0QW5nbGUgPCAzLjE0MTU5ICogMC43NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZlNhbXBsZVggPSBmVGVzdFBvaW50WCAtIG5UZXN0WDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZlRlc3RBbmdsZSA8IC0zLjE0MTU5ICogMC4yNSAmJiBmVGVzdEFuZ2xlID49IC0zLjE0MTU5ICogMC43NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZlNhbXBsZVggPSBmVGVzdFBvaW50WCAtIG5UZXN0WDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZlRlc3RBbmdsZSA+PSAzLjE0MTU5ICogMC43NSB8fCBmVGVzdEFuZ2xlIDwgLTMuMTQxNTkgKiAwLjc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmU2FtcGxlWCA9IGZUZXN0UG9pbnRZIC0gblRlc3RZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZTYW1wbGVYICo9IDEwMDtcclxuICAgICAgICAgICAgZlNhbXBsZVggPSBNYXRoLmZsb29yKGZTYW1wbGVYIC8gKDEwMCAvIDI4OCkpO1xyXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgZGlzdGFuY2UgdG8gY2VpbGluZyBhbmQgZmxvb3JcclxuICAgICAgICAgICAgdGhpcy5uQ2VpbGluZyA9ICh0aGlzLnNjcmVlbkhlaWdodCAvIDIuMCkgLSAodGhpcy5zY3JlZW5IZWlnaHQgLyBkaXN0YW5jZVRvV2FsbCk7XHJcbiAgICAgICAgICAgIHRoaXMubkZsb29yID0gdGhpcy5zY3JlZW5IZWlnaHQgLSB0aGlzLm5DZWlsaW5nO1xyXG5cclxuICAgICAgICAgICAgLy8gc2hhZGVyIHdhbGxzIGJhc2VkIG9uIGRpc3RhbmNlXHJcbiAgICAgICAgICAgIGxldCBzaGFkZUxldmVsOiBzdHJpbmcgPSAoZGlzdGFuY2VUb1dhbGwgKiAwLjEpLnRvRml4ZWQoMik7XHJcblx0XHRcdHRoaXMuZkRlcHRoQnVmZmVyW2ldID0gZGlzdGFuY2VUb1dhbGw7XHJcblxyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0VG9EcmF3OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgZmlyc3RZOiBudW1iZXIgPSAtMTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeTogbnVtYmVyID0gMDsgeSA8IHRoaXMuc2NyZWVuSGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIC8vIGVhY2ggUm93XHJcbiAgICAgICAgICAgICAgICBpZiAoeSA8PSB0aGlzLm5DZWlsaW5nKSB7IC8vIHJvb2ZcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeSA+IHRoaXMubkNlaWxpbmcgJiYgeSA8PSB0aGlzLm5GbG9vcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodFRvRHJhdyArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0WSA9IGZpcnN0WSA9PT0gLTEgPyB5IDogZmlyc3RZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlckltYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBYOiBmU2FtcGxlWCwgWTogMCxcclxuICAgICAgICAgICAgICAgICAgICBXOiAxLCBIOiAyODgsXHJcbiAgICAgICAgICAgICAgICAgICAgaTogXCJ3YWxsX3Nwcml0ZVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaSwgZmlyc3RZLFxyXG4gICAgICAgICAgICAgICAgMSwgaGVpZ2h0VG9EcmF3LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVMZXZlbDogc2hhZGVMZXZlbFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU9iamVjdHMoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMudW5pdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iamVjdDogVW5pdCA9IHRoaXMudW5pdHNbaV07XHJcblx0XHRcdC8vIHVwZGF0ZSBPYmplY3QgUGh5c2ljc1xyXG5cdFx0XHRvYmplY3QueCArPSBvYmplY3QudnggKiAwLjU7XHJcblx0XHRcdG9iamVjdC55ICs9IG9iamVjdC52eSAqIDAuNTtcclxuXHJcblx0XHRcdC8vIGNoZWNrIGlmIG9iamVjdCBpcyBpbnNpZGUgd2FsbCAtIHNldCBmbGFnIGZvciByZW1vdmFsXHJcblx0XHRcdGlmICh0aGlzLm1hcC5zdXJmYWNlW29iamVjdC54ICogdGhpcy5tYXAubWFwV2lkdGggKyBvYmplY3QueV0gPT09IFwiI1wiKSB7XHJcblx0XHRcdFx0b2JqZWN0LnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBjYW4gb2JqZWN0IGJlIHNlZW4/XHJcblx0XHRcdGxldCBmVmVjWDogbnVtYmVyID0gKG9iamVjdC54KSAtIHRoaXMucGxheWVyLnBvc1g7XHJcbiAgICAgICAgICAgIGxldCBmVmVjWTogbnVtYmVyID0gKG9iamVjdC55KSAtIHRoaXMucGxheWVyLnBvc1k7XHJcblx0XHRcdGxldCBmRGlzdGFuY2VGcm9tUGxheWVyOiBudW1iZXIgPSBNYXRoLmh5cG90KGZWZWNYLCBmVmVjWSk7XHJcblxyXG5cdFx0XHRsZXQgZkV5ZVg6IG51bWJlciA9IE1hdGguc2luKHRoaXMucGxheWVyLmFuZ2xlKTtcclxuXHRcdFx0bGV0IGZFeWVZOiBudW1iZXIgPSBNYXRoLmNvcyh0aGlzLnBsYXllci5hbmdsZSk7XHJcblxyXG5cdFx0XHQvLyBjYWxjdWxhdGUgYW5nbGUgYmV0d2VlbiBsYW1wIGFuZCBwbGF5ZXJzIGZlZXQsIGFuZCBwbGF5ZXJzIGxvb2tpbmcgZGlyZWN0aW9uXHJcblx0XHRcdC8vIHRvIGRldGVybWluZSBpZiB0aGUgbGFtcCBpcyBpbiB0aGUgcGxheWVycyBmaWVsZCBvZiB2aWV3XHJcblx0XHRcdGxldCBmT2JqZWN0QW5nbGU6IG51bWJlciA9IE1hdGguYXRhbjIoZkV5ZVksIGZFeWVYKSAtIE1hdGguYXRhbjIoZlZlY1ksIGZWZWNYKTtcclxuXHRcdFx0aWYgKGZPYmplY3RBbmdsZSA8IC1NYXRoLlBJKSB7XHJcblx0XHRcdFx0Zk9iamVjdEFuZ2xlICs9IDIuMCAqIE1hdGguUEk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGZPYmplY3RBbmdsZSA+IE1hdGguUEkpIHtcclxuICAgICAgICAgICAgICAgIGZPYmplY3RBbmdsZSAtPSAyLjAgKiBNYXRoLlBJO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgYkluUGxheWVyRk9WOiBib29sZWFuID0gTWF0aC5hYnMoZk9iamVjdEFuZ2xlKSA8ICh0aGlzLmZGT1YpIC8gMjtcclxuICAgICAgICAgICAgbGV0IHNoYWRlTGV2ZWw6IHN0cmluZyA9IChmRGlzdGFuY2VGcm9tUGxheWVyICogMC4xKS50b0ZpeGVkKDIpO1xyXG5cclxuXHRcdFx0aWYgKGJJblBsYXllckZPViAmJiBmRGlzdGFuY2VGcm9tUGxheWVyID49IDAuNSAmJiBmRGlzdGFuY2VGcm9tUGxheWVyIDwgdGhpcy5mRGVwdGggJiYgIW9iamVjdC5yZW1vdmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRPRE86IEZpeCB0aGlzXHJcbiAgICAgICAgICAgICAgICBsZXQgZk9iamVjdENlaWxpbmc6IG51bWJlciA9ICh0aGlzLnNjcmVlbkhlaWdodCAvIDIuMCkgLSB0aGlzLnNjcmVlbkhlaWdodCAvIChmRGlzdGFuY2VGcm9tUGxheWVyKTtcclxuXHRcdFx0XHRsZXQgZk9iamVjdEZsb29yOiBudW1iZXIgPSB0aGlzLnNjcmVlbkhlaWdodCAtIGZPYmplY3RDZWlsaW5nO1xyXG5cdFx0XHRcdGxldCBmT2JqZWN0SGVpZ2h0OiBudW1iZXIgPSBmT2JqZWN0Rmxvb3IgLSBmT2JqZWN0Q2VpbGluZztcclxuXHRcdFx0XHRsZXQgZk9iamVjdEFzcGVjdFJhdGlvOiBudW1iZXIgPSBvYmplY3QuYXNzZXQuZ2V0SGVpZ2h0KCkgLyBvYmplY3QuYXNzZXQuZ2V0V2lkdGgoKTtcclxuXHRcdFx0XHRsZXQgZk9iamVjdFdpZHRoOiBudW1iZXIgPSBmT2JqZWN0SGVpZ2h0IC8gZk9iamVjdEFzcGVjdFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZNaWRkbGVPZk9iamVjdDogbnVtYmVyID0gKDAuNSAqIChmT2JqZWN0QW5nbGUgLyAodGhpcy5mRk9WIC8gMi4wKSkgKyAwLjUpICogdGhpcy5zY3JlZW5XaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclVuaWNvZGVBc3NldChcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuYXNzZXQsIC8vIHRoZSBhc3NldFxyXG4gICAgICAgICAgICAgICAgICAgIGZNaWRkbGVPZk9iamVjdCAtIChmT2JqZWN0V2lkdGggLyAyLjApLCBmT2JqZWN0Q2VpbGluZywgIC8vIHggYW5kIFkgY29vcmRpbmF0ZXNcclxuICAgICAgICAgICAgICAgICAgICBmT2JqZWN0V2lkdGgsIGZPYmplY3RIZWlnaHQsIC8vIGRpbWVudGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBmTWlkZGxlT2ZPYmplY3QsIC8vIG1pZGRsZSBvZiB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgZkRpc3RhbmNlRnJvbVBsYXllciwgLy8gZGlzdGFuY2UgYmV0d2VlbiBwbGF5ZXIgYW5kIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZkRlcHRoQnVmZmVyLCAvLyB0aGUgZGVwdGggYnVmZmVyXHJcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVMZXZlbCk7IC8vIHRoZSBzaGFkZSBsZXZlbFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29udHJvbHMoKTogYW55IHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IENvbnRyb2xzKHtcclxuICAgICAgICAgICAgcG9pbnRlckxvY2s6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbnZhczogdGhpcy5yZW5kZXJlci5jYW52YXMsXHJcbiAgICAgICAgICAgIHBvaW50ZXJDYWxsb3V0OiAoZTogSU1vdmVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHVwIGFycm93IE9SIFwiV1wiIGtleVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYmluZEtleXMoW1wiMzhcIiwgXCI4N1wiXSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRm9yV2FsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gZG93biBhcnJvdyBPUiBcIlNcIiBrZXlcclxuICAgICAgICB0aGlzLmNvbnRyb2xzLmJpbmRLZXlzKFtcIjQwXCIsIFwiODNcIl0sICgpID0+IHtcclxuICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0ZvcldhbGwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWCArPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25YKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBsZWZ0IGFycm93IE9SIFwiRFwiIGtleVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYmluZEtleXMoW1wiMzdcIiwgXCI2NVwiXSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRm9yV2FsbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wb3NYIC09IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1kgKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gcmlnaHQgYXJyb3cgT1IgXCJBXCIga2V5XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5iaW5kS2V5cyhbXCIzOVwiLCBcIjY4XCJdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggLT0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3NZICs9IHRoaXMuY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JXYWxsKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBvc1ggKz0gdGhpcy5jYWxjTmV4dFBsYXllclBvc2l0aW9uWCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zWSAtPSB0aGlzLmNhbGNOZXh0UGxheWVyUG9zaXRpb25ZKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250cm9scy5iaW5kTW91c2Vkb3duKCgpID0+IHtcclxuXHRcdFx0bGV0IHZ4OiBudW1iZXIgPSBNYXRoLnNpbih0aGlzLnBsYXllci5hbmdsZSkgKiAwLjg7XHJcblx0XHRcdGxldCB2eTogbnVtYmVyID0gTWF0aC5jb3ModGhpcy5wbGF5ZXIuYW5nbGUpICogMC44O1xyXG4gICAgICAgICAgICB0aGlzLnVuaXRzLnB1c2gobmV3IFVuaXQodGhpcy5wbGF5ZXIucG9zWCwgdGhpcy5wbGF5ZXIucG9zWCwgdngsIHZ5LCBcInJvY2tldFwiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY05leHRQbGF5ZXJQb3NpdGlvblgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zaW4odGhpcy5wbGF5ZXIuYW5nbGUpICogdGhpcy5mU3BlZWQgKiAwLjE7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY05leHRQbGF5ZXJQb3NpdGlvblkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5jb3ModGhpcy5wbGF5ZXIuYW5nbGUpICogdGhpcy5mU3BlZWQgKiAwLjE7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JXYWxsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5zdXJmYWNlW01hdGguZmxvb3IodGhpcy5wbGF5ZXIucG9zWCkgKiB0aGlzLm1hcC5tYXBXaWR0aCArIE1hdGguZmxvb3IodGhpcyAgLnBsYXllci5wb3NZKV0gPT09IFwiI1wiO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBvc2l0aW9uKGU6IElNb3ZlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmKGUubW92ZW1lbnRYID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmdsZSArPSAoZS5tb3ZlbWVudFgpICogMC4wMDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGUubW92ZW1lbnRYIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmdsZSArPSAoIGUubW92ZW1lbnRYKSAqIDAuMDA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlLm1vdmVtZW50WSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueUFuZ2xlICs9IChlLm1vdmVtZW50WSkgKiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlLm1vdmVtZW50WSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueUFuZ2xlICs9ICggZS5tb3ZlbWVudFkpICogMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vICgoKSA9PiAge1xyXG4vLyAgICAgd2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgICAgICBuZXcgR2FtZSgpO1xyXG4vLyAgICAgfTtcclxuLy8gfSkoKTsiXSwic291cmNlUm9vdCI6IiJ9