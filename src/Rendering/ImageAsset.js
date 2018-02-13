import { Asset } from "../Asset";

export class ImageAsset extends Asset {
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