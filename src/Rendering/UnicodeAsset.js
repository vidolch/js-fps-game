import { Asset } from "../Asset";

export class UnicodeAsset extends Asset {
    constructor(name, charmap, scale) {
        super(name);
        this.charmap = charmap;
        this.loaded = true;
        this.height = this.charmap.length;
        this.width = this.charmap[0].length;
        this.scale = scale || 10;
    }
    getCharAt(row, col) {
        return this.charmap[row][col];
    }
    setCharAt(row, col, char) {
        this.charmap[row][col] = char;
    }
    getHeight() {
        return this.height * this.scale;
    }
    getWidth() {
        return this.width * this.scale;
    }
}