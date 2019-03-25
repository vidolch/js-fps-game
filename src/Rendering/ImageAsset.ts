import { Asset } from "../Asset";

export class ImageAsset extends Asset {
    image: any;

    constructor(name: string, src: string) {
        super(name);
        this.image = new Image();
        this.image.src = src;
    }

    isComplete(): boolean {
        this.loaded = this.image.complete;
        return this.loaded;
    }
}