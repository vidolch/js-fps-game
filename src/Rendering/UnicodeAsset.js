import { Asset } from "../Asset";

export class UnicodeAsset extends Asset {
    constructor(name, charmap) {
        super(name);
        this.charmap = charmap;
    }
    getCharAt(row, col) {
        return this.charmap[row][col];
    }
    setCharAt(row, col, char) {
        this.charmap[row][col] = char;
    }
}