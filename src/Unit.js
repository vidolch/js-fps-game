import { GetAsset } from "./Globals";

export class Unit {
    constructor(x, y, vx, vy, image) {
        this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.remove = false;
		if(typeof image !== "undefined" && image !== null){
			this.image = GetAsset(image);
		}
	}
	
	remove() {
		this.remove = true;
	}
}