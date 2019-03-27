import { Controls } from "./Controls";
import { UI } from "./UI";

import { Stats } from "./Utils/Stats";
import { map1 } from "./config";
import { ImageAsset } from "./Rendering/ImageAsset";
import { GLOBAL_ASSETS } from "./Globals";
import { Unit } from "./Unit";
import { UnicodeAsset } from "./Rendering/UnicodeAsset";
import { FileLoader } from "./FileLoader";
import { Renderer } from "./Rendering/Renderer";
import { Not3D } from "./Not3D";
import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { Point } from "./Point";
import { RendererOptions } from "./Rendering/RendererOptions";
import { IMovement } from "./IMovement";

class Game {
    engine: Not3D;
    stats: Stats;
    renderer: Renderer;
    fFOV: number;
    fSpeed: number;
    fDepth: number;
    screenWidth: number;
    screenHeight: number;
    fDepthBuffer: number[];
    player: Player;
    map: GameMap;
    ui: UI;
    middleCorrdinates: Point;
    units: Unit[];
    nCeiling: number;
    nFloor: number;
    controls: Controls;
    wall: ImageAsset;

    constructor() {
        this.stats = new Stats();
        let container: HTMLElement | null = document.getElementById("container");
        if (container == null) {
            throw("Container element not found!");
        }
        this.engine = new Not3D(container, new RendererOptions(), this.stats);
        // benchmark script
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.stats.container );

        this.renderer = this.engine.renderer;

        this.fFOV = Math.PI / 4.0;	// field of View
        this.fSpeed = 2;
        this.fDepth = 25;			// maximum rendering distance

        this.screenWidth = this.renderer.getWidth();
        this.screenHeight = this.renderer.getHeight();
        this.fDepthBuffer = [];

        this.player = {
            posX: 7.183800517628895,
            posY: 9.920172052706125,
            angle: 0.5000000000000023,
            yAngle: 0
        };

        this.map = map1;
        this.ui = new UI(this.map, this.player);
        this.middleCorrdinates = new Point;
        this.init();
    }

    async init(): Promise<void> {
        this.wall = new ImageAsset("wall_sprite", "./sprites/wall3.jpg");
        GLOBAL_ASSETS.push(this.wall);

        this.units = [];

        let lampText: string = await FileLoader.loadJSON("../assets/objects/lamp.json");
        GLOBAL_ASSETS.push(new UnicodeAsset("lamp_cm", JSON.parse(lampText), 0.5));
        this.units.push(new Unit(11, 14, 0, 0, "lamp_cm"));

        let rocketText: string = await FileLoader.loadJSON("../assets/objects/rocket.json");
        GLOBAL_ASSETS.push(new UnicodeAsset("rocket", JSON.parse(rocketText), 0.5));

        this.engine.setLoop(() => { this.move(); });
        this.engine.start(() => {
            this.createControls();
        });
    }

    move(): void {
        this.renderer.beginOffScreen();
        this.renderer.yAngle = this.player.yAngle;
        this.renderer.renderGlobals();

        this.mainScreen(0, this.screenWidth);
        this.handleObjects();
        this.renderer.endOffScreen();

        this.ui.drawUI(this.middleCorrdinates, this.units);
    }

    mainScreen(from: number, to: number): any {
        let fRayAngle: number = 0;
        let stepSize: number = 0;
        let distanceToWall: number = 0;
        let bHitWall: boolean = false;
        let eyeX: number = 0;
        let eyeY: number = 0;
        let nTestX: number = 0;
        let nTestY: number = 0;

        for (let i: number = from; i < to; i += 3) {
            fRayAngle = (this.player.angle - this.fFOV / 2.0) + (i / this.screenWidth) * this.fFOV;
            stepSize = 0.05;
            distanceToWall = 0.0;
            bHitWall = false;		// set when ray hits wall block
            eyeX = Math.sin(fRayAngle); // unit vector for ray in player space
            eyeY = Math.cos(fRayAngle);
            if(i === to / 2) { this.middleCorrdinates = {x: eyeX, y: eyeY}; }

            let fSampleX: number = 0.0;
            // incrementally cast ray from player, along ray angle, testing for
            // intersection with a block
            while (!bHitWall && distanceToWall < this.fDepth) {

                distanceToWall += stepSize;
                nTestX = Math.floor(this.player.posX + eyeX * distanceToWall);
                nTestY = Math.floor(this.player.posY + eyeY * distanceToWall);

                // test if ray is out of bounds
                if (nTestX < 0 || nTestX >= this.map.mapWidth || nTestY < 0 || nTestY >= this.map.mapHeight) {
                    bHitWall = true;			// just set distance to maximum depth
                    distanceToWall = this.fDepth;
                } else {
                    // ray is inbounds so test to see if the ray cell is a wall block
                    if (this.map.surface[Math.round(nTestX * this.map.mapWidth + nTestY)] === "#") {
                        // ray has hit wall
                        bHitWall = true;

                        // determine where ray has hit wall. Break Block boundary
                        // int 4 line segments
                        let fBlockMidX: number = nTestX + 0.5;
                        let fBlockMidY: number = nTestY + 0.5;

                        let fTestPointX: number = this.player.posX + eyeX * distanceToWall;
                        let fTestPointY: number = this.player.posY + eyeY * distanceToWall;

                        let fTestAngle: number = Math.atan2((fTestPointY - fBlockMidY), (fTestPointX - fBlockMidX));

                        if (fTestAngle >= -3.14159 * 0.25 && fTestAngle < 3.14159 * 0.25) {
                            fSampleX = fTestPointY - nTestY;
                        }
                        if (fTestAngle >= 3.14159 * 0.25 && fTestAngle < 3.14159 * 0.75) {
                            fSampleX = fTestPointX - nTestX;
                        }
                        if (fTestAngle < -3.14159 * 0.25 && fTestAngle >= -3.14159 * 0.75) {
                            fSampleX = fTestPointX - nTestX;
                        }
                        if (fTestAngle >= 3.14159 * 0.75 || fTestAngle < -3.14159 * 0.75) {
                            fSampleX = fTestPointY - nTestY;
                        }
                    }
                }
            }
            fSampleX *= 100;
            fSampleX = Math.floor(fSampleX / (100 / 288));
            // calculate distance to ceiling and floor
            this.nCeiling = (this.screenHeight / 2.0) - (this.screenHeight / distanceToWall);
            this.nFloor = this.screenHeight - this.nCeiling;

            // shader walls based on distance
            let shadeLevel: number = parseFloat((distanceToWall * 0.1).toFixed(2));
			this.fDepthBuffer[i] = distanceToWall;
			this.fDepthBuffer[i + 1] = distanceToWall;
			this.fDepthBuffer[i + 2] = distanceToWall;

            let heightToDraw: number = 0;
            let firstY: number = -1;
            for (let y: number = 0; y < this.screenHeight; y++) {
                // each Row
                if (y <= this.nCeiling) { // roof
                } else if (y > this.nCeiling && y <= this.nFloor) {
                    heightToDraw += 1;
                    firstY = firstY === -1 ? y : firstY;
                }
            }

            this.renderer.renderImage({
                    X: fSampleX, Y: 0,
                    W: 3, H: 288,
                    i: this.wall
                },
                i, firstY,
                3, heightToDraw, {
                    shadeLevel: shadeLevel
                });
        }
    }

    handleObjects(): void {
        for (let i: number = 0; i < this.units.length; i++) {
            let object: Unit = this.units[i];
			// update Object Physics
			object.x += object.vx * 0.5;
			object.y += object.vy * 0.5;

			// check if object is inside wall - set flag for removal
			if (this.map.surface[object.x * this.map.mapWidth + object.y] === "#") {
				object.remove = true;
			}

			// can object be seen?
			let fVecX: number = (object.x) - this.player.posX;
            let fVecY: number = (object.y) - this.player.posY;
			let fDistanceFromPlayer: number = Math.hypot(fVecX, fVecY);

			let fEyeX: number = Math.sin(this.player.angle);
			let fEyeY: number = Math.cos(this.player.angle);

			// calculate angle between lamp and players feet, and players looking direction
			// to determine if the lamp is in the players field of view
			let fObjectAngle: number = Math.atan2(fEyeY, fEyeX) - Math.atan2(fVecY, fVecX);
			if (fObjectAngle < -Math.PI) {
				fObjectAngle += 2.0 * Math.PI;
			}
			if (fObjectAngle > Math.PI) {
                fObjectAngle -= 2.0 * Math.PI;
			}

			let bInPlayerFOV: boolean = Math.abs(fObjectAngle) < (this.fFOV) / 2;
            let shadeLevel: string = (fDistanceFromPlayer * 0.1).toFixed(2);

			if (bInPlayerFOV && fDistanceFromPlayer >= 0.5 && fDistanceFromPlayer < this.fDepth && !object.remove) {
                // tODO: Fix this
                let fObjectCeiling: number = (this.screenHeight / 2.0) - this.screenHeight / (fDistanceFromPlayer);
				let fObjectFloor: number = this.screenHeight - fObjectCeiling;
				let fObjectHeight: number = fObjectFloor - fObjectCeiling;
				let fObjectAspectRatio: number = object.asset.getHeight() / object.asset.getWidth();
				let fObjectWidth: number = fObjectHeight / fObjectAspectRatio;
                let fMiddleOfObject: number = (0.5 * (fObjectAngle / (this.fFOV / 2.0)) + 0.5) * this.screenWidth;

                this.renderer.renderUnicodeAsset(
                    object.asset, // the asset
                    fMiddleOfObject - (fObjectWidth / 2.0), fObjectCeiling,  // x and Y coordinates
                    fObjectWidth, fObjectHeight, // dimentions
                    fMiddleOfObject, // middle of the object
                    fDistanceFromPlayer, // distance between player and object
                    this.fDepthBuffer, // the depth buffer
                    parseFloat(shadeLevel)); // the shade level
			}
		}
    }

    createControls(): any {
        this.controls = new Controls({
            pointerLock: true,
            canvas: this.renderer.canvas,
            pointerCallback: (e: IMovement) => {
                this.updatePosition(e);
            }
        });

        // up arrow OR "W" key
        this.controls.bindKeys(["38", "87"], () => {
            this.player.posX += this.calcNextPlayerPositionX();
            this.player.posY += this.calcNextPlayerPositionY();
            if (this.checkForWall()) {
                this.player.posX -= this.calcNextPlayerPositionX();
                this.player.posY -= this.calcNextPlayerPositionY();
            }
        });
        // down arrow OR "S" key
        this.controls.bindKeys(["40", "83"], () => {
             this.player.posX -= this.calcNextPlayerPositionX();
             this.player.posY -= this.calcNextPlayerPositionY();
             if (this.checkForWall()) {
                this.player.posX += this.calcNextPlayerPositionX();
                this.player.posY += this.calcNextPlayerPositionY();
             }
        });
        // left arrow OR "D" key
        this.controls.bindKeys(["37", "65"], () => {
            this.player.posX += this.calcNextPlayerPositionX();
            this.player.posY -= this.calcNextPlayerPositionY();
            if (this.checkForWall()) {
                this.player.posX -= this.calcNextPlayerPositionX();
                this.player.posY += this.calcNextPlayerPositionY();
            }
        });
        // right arrow OR "A" key
        this.controls.bindKeys(["39", "68"], () => {
            this.player.posX -= this.calcNextPlayerPositionX();
            this.player.posY += this.calcNextPlayerPositionY();
            if (this.checkForWall()) {
                this.player.posX += this.calcNextPlayerPositionX();
                this.player.posY -= this.calcNextPlayerPositionY();
            }
        });

        this.controls.bindMousedown(() => {
			let vx: number = Math.sin(this.player.angle);
            let vy: number = Math.cos(this.player.angle);
            this.units.push(new Unit(this.player.posX, this.player.posX, vx, vy, "rocket"));
        });
    }

    calcNextPlayerPositionX(): number {
        return Math.sin(this.player.angle) * this.fSpeed * 0.1;
    }

    calcNextPlayerPositionY(): number {
        return Math.cos(this.player.angle) * this.fSpeed * 0.1;
    }

    checkForWall(): boolean {
        return this.map.surface[Math.floor(this.player.posX) * this.map.mapWidth + Math.floor(this  .player.posY)] === "#";
    }

    updatePosition(e: IMovement): void {
        if(e.movementX > 0) {
            this.player.angle += (e.movementX) * 0.002;
        }
        if(e.movementX < 0) {
            this.player.angle += ( e.movementX) * 0.002;
        }
        if(e.movementY > 0) {
            this.player.yAngle += (e.movementY) * 0.6;
        }
        if(e.movementY < 0) {
            this.player.yAngle += ( e.movementY) * 0.6;
        }
    }
}

// tslint:disable-next-line:no-unused-expression
new Game();