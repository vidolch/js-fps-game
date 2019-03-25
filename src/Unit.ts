import { GetAsset } from "./Globals";
import { UnicodeAsset } from "./Rendering/UnicodeAsset";

export class Unit {
	x: number;
	y: number;
	vx: number;
	vy: number;
	remove: boolean;
	asset: UnicodeAsset;

    constructor(x: number, y: number, vx: number, vy: number, asset: string) {
        this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.remove = false;
		if(typeof asset !== "undefined" && asset !== null) {
			this.asset = GetAsset(asset);
		}
	}
}