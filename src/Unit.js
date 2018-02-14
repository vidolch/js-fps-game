import { GetAsset } from "./Globals";

export class Unit {
    constructor(x, y, vx, vy, asset) {
        this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.remove = false;
		if(typeof asset !== "undefined" && asset !== null){
			this.asset = GetAsset(asset);
		}
	}
	
	remove() {
		this.remove = true;
	}
}