import { Renderer } from "./Rendering/Renderer";
import { AreAllAssetsLoaded } from "./Globals";

export class Not3D {
    constructor(parentElement, driver) {
        this.renderer = new Renderer(parentElement, driver);
        this.callback;
        this.callbackContext;
    }

    mainLoop() {
        let self = this;
        if(self.useStats) self.stats.begin();
        self.callback.call(self.callbackContext);
        if(self.useStats) self.stats.end();
        requestAnimationFrame(self.mainLoop.bind(self));
    }

    start() {
        if(AreAllAssetsLoaded()) {
            this.mainLoop();
        } else {
            setTimeout(() => {
                this.start();
            }, 100);
        }
    }
}