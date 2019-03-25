import { Renderer, RendererOptions } from "./Rendering/Renderer";
import { AreAllAssetsLoaded } from "./Globals";
import { Stats } from "./Utils/Stats";

export class Not3D {
    renderer: Renderer;
    stats: Stats;
    loopCallback: Function;

    constructor(parentElement: HTMLElement, renderOptions: RendererOptions, stats: Stats) {
        this.stats = stats;
        this.renderer = new Renderer(parentElement, renderOptions);
    }

    setLoop(callback: Function): void {
        this.loopCallback = callback;
    }

    mainLoop(): void {
        if(this.stats) { this.stats.begin(); }
        this.loopCallback();
        if(this.stats) { this.stats.end(); }
        requestAnimationFrame(() => { this.mainLoop(); });
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
}