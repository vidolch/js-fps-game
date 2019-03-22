import { Renderer } from "./Rendering/Renderer";
import { AreAllAssetsLoaded } from "./Globals";

export class Not3D {
    constructor(parentElement, driver, stats) {
        this.stats = !!stats;
        this.renderer = new Renderer(parentElement, driver);
        this.callback;
        this.callbackContext;
        this.callback = undefined;
        this.callbackContext = undefined;
    }

    mainLoop() {
        let self = this;
        if(self.useStats) self.stats.begin();
        self.callback.call(self.callbackContext);
        if(self.useStats) self.stats.end();
        requestAnimationFrame(self.mainLoop.bind(self));
    }

    start(callback) {
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