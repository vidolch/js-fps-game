import { VisualUtils } from "./VisualUtils";
import { UnicodeAsset } from "./UnicodeAsset";
import { RendererOptions } from "./RendererOptions";
import { DrawOptions } from "./DrawOptions";
import { Point } from "src/Point";

export class Renderer {
    parentElement: HTMLElement;
    options: RendererOptions;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    nCeiling: number;
    nFloor: number;
    offScreen: boolean;
    yAngle: number;


    constructor(parentElement: HTMLElement, options: RendererOptions) {
        this.parentElement = parentElement;
        this.options = options;

        this.canvas = document.createElement("canvas");
		this.canvas.setAttribute("width",  document.body.clientWidth.toString());
		this.canvas.setAttribute("height",  document.body.scrollHeight.toString());
		this.canvas.setAttribute("id",  this.options.canvasId);
        this.parentElement.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");

        this.nCeiling = 0;
        this.nFloor = 0;
        this.offScreen = false;
        this.yAngle = 0;
    }

    getWidth(): number {
        return this.canvas.width / this.options.resDecrease;
    }

    getHeight(): number {
        return this.canvas.height / this.options.resDecrease;
    }

    setFillStyle(color: string): void {
        if(this.context) {
            this.context.fillStyle = color;
        }
    }

    clearAll(): void {
        if(this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    async renderGlobals(): Promise<void> {
        if(!this.context) {
            return;
        }

        let middleLine: number = this.canvas.height / 2 + this.yAngle;
        this.context.fillStyle = "rgb(44, 107, 255)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        var linearGradient1: CanvasGradient = this.context.createLinearGradient(0, this.canvas.height, 0, middleLine);
        linearGradient1.addColorStop(0, "rgb(147, 67, 2)");
        linearGradient1.addColorStop(0.65, VisualUtils.shadeBlendConvert(-0.8, "rgb(147, 67, 2)"));
        linearGradient1.addColorStop(1, "rgb(0, 0, 0)");
        this.context.fillStyle = linearGradient1;
        this.context.fillRect(0, middleLine, this.canvas.width, this.canvas.height - middleLine);
        this.context.fillStyle = "black";
    }

    async renderImage(
        image: any, spaceX: number, spaceY: number, spaceWidth: number, spaceHeight: number, options: DrawOptions): Promise<void> {
        let renderContext: CanvasRenderingContext2D = this.getRenderContext();
        if (this.shouldImageBeRendered(options)) {
            renderContext.drawImage(
                image.i.image,
                image.X, image.Y, image.W, image.H,
                spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
        }

        if (options.shadeLevel !== 0) {
            renderContext.fillStyle = "rgba(0, 0, 0, " + options["shadeLevel"] + ")";
            renderContext.fillRect(spaceX, spaceY + this.yAngle, spaceWidth, spaceHeight);
        }
    }

    async renderUnicodeAsset(
        asset: UnicodeAsset,
        spaceX: number,
        spaceY: number,
        width: number,
        height: number,
        fMiddleOfObject: number,
        fDistanceFromPlayer: number,
        fDepthBuffer: number[],
        shadeLevel: number): Promise<void> {
        let renderContext: CanvasRenderingContext2D = this.getRenderContext();
        for (let ly: number = 0; ly < asset.rows; ly++) {
            for (let lx: number = 0; lx < asset.cols; lx++) {
                let proportialWidth: number = width / asset.cols;
                let proportialHeight: number = height / asset.rows;

                let nObjectColumn: number = Math.round(fMiddleOfObject + lx - (asset.cols / 2));
                if (nObjectColumn >= 0 && nObjectColumn < this.getWidth()) {
                    if (asset.getCharAt(ly, lx) !== "." && fDepthBuffer[nObjectColumn] >= fDistanceFromPlayer) {
                        fDepthBuffer[nObjectColumn] = fDistanceFromPlayer;

                        let renderX: number = spaceX + (lx * proportialWidth);
                        let renderY: number = spaceY + (ly * proportialHeight);
                        renderContext.fillStyle = asset.getCharAt(ly, lx);
                        renderContext.fillRect(
                            renderX, renderY + this.yAngle,
                            proportialWidth, proportialHeight);
                        renderContext.fillStyle = "rgba(0, 0, 0, " + shadeLevel + ")";
                        renderContext.fillRect(
                            renderX, renderY + this.yAngle,
                            proportialWidth, proportialHeight);
                    }
                }
            }
        }
    }

    getRenderContext(): CanvasRenderingContext2D {
        return this.offScreen ? this.canvas["offscreenContext"] : this.context;
    }

    shouldImageBeRendered(options: DrawOptions): boolean {
        return !!(typeof options === "undefined"
            || (typeof options !== "undefined" && options.shadeLevel !== undefined && options.shadeLevel < 0.99));
    }

    renderRect(x: number, y: number, w: number, h: number): void {
        if (this.context) {
            this.context.fillRect(x, y, w, h);
        }
    }

    async renderLine(coordinates: Point[], lineColor: string): Promise<void> {
        if (!this.context) {
            return;
        }

        this.context.beginPath();
        this.context.moveTo(coordinates[0].x, coordinates[0].y);

        for (let i: number = 1; i < coordinates.length; i++) {
            this.context.lineTo(
                coordinates[i].x,
                coordinates[i].y
            );
        }

        this.context.strokeStyle = lineColor;
        this.context.stroke();
    }

    beginOffScreen(): void {
        this.canvas["offscreenCanvas"] = document.createElement("canvas");
        this.canvas["offscreenCanvas"].width = this.getWidth();
        this.canvas["offscreenCanvas"].height = this.getWidth();
        this.canvas["offscreenContext"] = this.canvas["offscreenCanvas"].getContext("2d");
        this.offScreen = true;
    }

    endOffScreen(): void {
        if (this.context) {
            this.context.drawImage(this.canvas["offscreenCanvas"], 0, 0);
            this.offScreen = false;
        }
    }
}