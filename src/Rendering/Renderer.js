import { VisualUtils } from './VisualUtils.js';
import { GLOBAL_ASSETS, GetAsset } from '../Globals';

export class Renderer {
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
        linearGradient1.addColorStop(0.65, VisualUtils.shadeBlendConvert(-0.8, 'rgb(147, 67, 2)'));
        linearGradient1.addColorStop(1, 'rgb(0, 0, 0)');
        this.context.fillStyle = linearGradient1;
        this.context.fillRect(0, middleLine, this.canvas.width, this.canvas.height - middleLine);
        this.context.fillStyle = 'black';
    }
    renderImage(image, spaceX, spaceY, spaceWidth, spaceHeight, options) {
        let renderContext = this.getRenderContext();
        if (this.shouldImageBeRendered(options)) {
            renderContext.drawImage(
                GetAsset(image.i).image,
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