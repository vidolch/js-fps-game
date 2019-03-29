import { DrawOptions } from "./DrawOptions";
import { UnicodeAsset } from "./UnicodeAsset";
import { Point } from "src/Point";

export interface IRenderer {
    getWidth(): number;
    getHeight(): number;
    setFillStyle(color: string): void;
    clearAll(): void;
    renderGlobals(): Promise<void>;
    renderImage(
        image: any, spaceX: number, spaceY: number, spaceWidth: number, spaceHeight: number, options: DrawOptions): Promise<void>;
        renderUnicodeAsset(
            asset: UnicodeAsset,
            spaceX: number,
            spaceY: number,
            width: number,
            height: number,
            fMiddleOfObject: number,
            fDistanceFromPlayer: number,
            fDepthBuffer: number[],
            shadeLevel: number): Promise<void>;
    renderRect(x: number, y: number, w: number, h: number): void;
    renderLine(coordinates: Point[], lineColor: string): Promise<void>;
    startFrame(): void;
    endFrame(): void;
    getCameraAngle(): number;
    setCameraAngle(angle: number): number;
    getCanvas(): HTMLCanvasElement;
}