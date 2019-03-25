import { Asset } from "../Asset";

export class UnicodeAsset extends Asset {
    charmap: string[];
    rows: number;
    cols: number;
    scale: number;

    constructor(name: string, charmap: string[], scale: number) {
        super(name);
        this.charmap = charmap;
        this.loaded = true;
        this.rows = this.charmap.length;
        this.cols = this.charmap[0].length;
        this.scale = scale || 10;
    }

    getCharAt(row: number, col: number): string {
        return this.charmap[row][col];
    }

    setCharAt(row: number, col: number, char: string): void {
        this.charmap[row] = this.charmap[row].substr(0, col) + char + this.charmap[row].substr(col + char.length);
    }

    getHeight(): number {
        return this.rows * this.scale;
    }

    getWidth(): number {
        return this.cols * this.scale;
    }
}