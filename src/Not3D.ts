import { WebGLRenderer } from "./Rendering/WebGL/WebGLRenderer";
import { AreAllAssetsLoaded } from "./Globals";
import { Stats } from "./Utils/Stats";
import { RendererOptions } from "./Rendering/RendererOptions";
import { IRenderer } from "./Rendering/IRenderer";

export class Not3D {
    renderer: IRenderer;
    stats: Stats;
    loopCallback: Function;
    paused: boolean;

    constructor(parentElement: HTMLElement, renderOptions: RendererOptions, stats: Stats) {
        this.stats = stats;
        this.renderer = new WebGLRenderer(parentElement, renderOptions);
        this.paused = false;
    }

    setLoop(callback: Function): void {
        this.loopCallback = callback;
    }

    mainLoop(): void {
        if (!this.paused) {
            if(this.stats) { this.stats.begin(); }
            this.loopCallback();
            if(this.stats) { this.stats.end(); }
            requestAnimationFrame(() => { this.mainLoop(); });
        } else {
            setTimeout(() => {
                requestAnimationFrame(() => { this.mainLoop(); });
            }, 300);
        }
    }

    start(callback: Function): void {
        if(AreAllAssetsLoaded()) {
            if(!!callback) {
                callback();
            }

            this.mainLoop();
        } else {
            setTimeout(() => {
                this.start(callback);
            }, 100);
        }
    }

    pause(): void {
        this.paused = !this.paused;
    }
}