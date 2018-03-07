import { Controls } from './Controls.js';
import { Renderer } from './Rendering/Renderer';
import { UI } from './UI';

// Benchmark
import { Stats } from './Utils/Stats';
import { map1 } from './config';
import { ImageAsset } from './Rendering/ImageAsset';
import { GLOBAL_ASSETS, AreAllAssetsLoaded, sampleSprite, ALL_LOADED } from './Globals';
import { Unit } from './Unit';
import { UnicodeAsset } from './Rendering/UnicodeAsset';
import { FileLoader } from './FileLoader.js';

export class Game {
    constructor() {
        // benchmark script
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.stats.dom );

        this.controls;
        this.renderer = new Renderer(document.getElementById("mainScreen"));

        this.fFOV = Math.PI / 4.0;	// Field of View
        this.fSpeed = 2;
        this.fDepth = 25;			// Maximum rendering distance
        
        this.screenWidth = this.renderer.getWidth();
        this.screenHeight = this.renderer.getHeight();
		this.fDepthBuffer = [];

        this.player = {
            posX: 7.183800517628895, posY: 9.920172052706125, 
            angle: 0.5000000000000023,
            yAngle: 0
        }

        this.map = map1;
        this.ui = new UI(this.map, this.player);
        this.middleCorrdinates = {};
        GLOBAL_ASSETS.push(new ImageAsset('wall_sprite', './sprites/wall3.bmp'));
        GLOBAL_ASSETS.push(new ImageAsset('lamp', './sprites/lamp-min2.png'));
        let self = this;
        this.units = [];

        GLOBAL_ASSETS.ALL_LOADED = false;
    
        FileLoader.loadJSON('../assets/objects/lamp.json', (jsonText) => {
            GLOBAL_ASSETS.push(new UnicodeAsset('lamp_cm', JSON.parse(jsonText), 0.5));
            self.units.push(new Unit(11, 14, 0, 0, 'lamp_cm'));
    
            FileLoader.loadJSON('../assets/objects/lamp.json', (jsonText) => {
                GLOBAL_ASSETS.push(new UnicodeAsset('rocket', JSON.parse(jsonText), 0.5));
                GLOBAL_ASSETS.ALL_LOADED = true;
            });
        });
        
      
        this.createControls();
        this.start();
    }

    start(callback) {
        if(AreAllAssetsLoaded()) {
            this.move();
        } else {
            setTimeout(() => {
                this.start();
            }, 100);
        }
    }

    move() {
        this.stats.begin();
        this.renderer.yAngle = this.player.yAngle;
        this.renderer.renderGlobals();

        this.renderer.beginOffScreen();
        this.mainScreen(0, this.screenWidth);
        this.handleObjects();
        this.renderer.endOffScreen();

        this.ui.drawUI(this.middleCorrdinates, this.units);

        let self = this;
        this.stats.end();
        requestAnimationFrame(self.move.bind(self));
    }

    mainScreen(from, to) {
        let fRayAngle = 0;
        let stepSize = 0;
        let distanceToWall = 0;
        let bHitWall = 0;
        let eyeX = 0;
        let eyeY = 0;
        let nTestX = 0;
        let nTestY = 0;

        for (let i = from; i < to; i++) {
            fRayAngle = (this.player.angle - this.fFOV / 2.0) + (i / this.screenWidth) * this.fFOV;
            stepSize = 0.05;
            distanceToWall = 0.0;
            bHitWall = false;		// Set when ray hits wall block
            eyeX = Math.sin(fRayAngle); // Unit vector for ray in player space
            eyeY = Math.cos(fRayAngle);
            if(i === to / 2) this.middleCorrdinates = {x: eyeX, y: eyeY}; 

            let fSampleX = 0.0;
            // Incrementally cast ray from player, along ray angle, testing for 
            // intersection with a block
            while (!bHitWall && distanceToWall < this.fDepth) {

                distanceToWall += stepSize;
                nTestX = Math.floor(this.player.posX + eyeX * distanceToWall);
                nTestY = Math.floor(this.player.posY + eyeY * distanceToWall);

                // Test if ray is out of bounds
                if (nTestX < 0 || nTestX >= this.map.mapWidth || nTestY < 0 || nTestY >= this.map.mapHeight) {
                    bHitWall = true;			// Just set distance to maximum depth
                    distanceToWall = this.fDepth;
                } else {
                    // Ray is inbounds so test to see if the ray cell is a wall block
                    if (this.map.surface[Math.round(nTestX * this.map.mapWidth + nTestY)] === '#') {
                        // Ray has hit wall
                        bHitWall = true;

                        // Determine where ray has hit wall. Break Block boundary
                        // int 4 line segments
                        let fBlockMidX = nTestX + 0.5;
                        let fBlockMidY = nTestY + 0.5;

                        let fTestPointX = this.player.posX + eyeX * distanceToWall;
                        let fTestPointY = this.player.posY + eyeY * distanceToWall;

                        let fTestAngle = Math.atan2((fTestPointY - fBlockMidY), (fTestPointX - fBlockMidX));

                        if (fTestAngle >= -3.14159 * 0.25 && fTestAngle < 3.14159 * 0.25)
                            fSampleX = fTestPointY - nTestY;
                        if (fTestAngle >= 3.14159 * 0.25 && fTestAngle < 3.14159 * 0.75)
                            fSampleX = fTestPointX - nTestX;
                        if (fTestAngle < -3.14159 * 0.25 && fTestAngle >= -3.14159 * 0.75)
                            fSampleX = fTestPointX - nTestX;
                        if (fTestAngle >= 3.14159 * 0.75 || fTestAngle < -3.14159 * 0.75)
                            fSampleX = fTestPointY - nTestY;
                    }
                }
            }
            fSampleX *= 100;
            fSampleX = Math.floor(fSampleX / (100 / 288));
            // Calculate distance to ceiling and floor
            this.nCeiling = (this.screenHeight / 2.0) - (this.screenHeight / distanceToWall);
            this.nFloor = this.screenHeight - this.nCeiling;

            // Shader walls based on distance
            let shadeLevel = (distanceToWall * 0.1).toFixed(2);
			this.fDepthBuffer[i] = distanceToWall;

            let heightToDraw = 0;
            let firstY = -1;
            for (let y = 0; y < this.screenHeight; y++) {
                // Each Row
                if (y <= this.nCeiling) { // Roof
                } else if (y > this.nCeiling && y <= this.nFloor) {
                    heightToDraw += 1;
                    firstY = firstY === -1 ? y : firstY;
                } else {} // Floor
            }
            
            this.renderer.renderImage({
                    X: fSampleX, Y: 0,
                    W: 1, H: 288,
                    i: 'wall_sprite'
                },
                i, firstY,
                1, heightToDraw, {
                    shadeLevel: shadeLevel
                });
        }
    }

    handleObjects() {

        for (let i = 0; i < this.units.length; i++)
		{
            let object = this.units[i];
			// Update Object Physics
			object.x += object.vx * 0.5;
			object.y += object.vy * 0.5;

			// Check if object is inside wall - set flag for removal
			if (this.map.surface[object.x * this.map.mapWidth + object.y] === '#')
				object.remove = true;
						
			// Can object be seen?
			let fVecX = (object.x) - this.player.posX;
            let fVecY = (object.y) - this.player.posY;
			let fDistanceFromPlayer = Math.hypot(fVecX, fVecY);

			let fEyeX = Math.sin(this.player.angle);
			let fEyeY = Math.cos(this.player.angle);

			// Calculate angle between lamp and players feet, and players looking direction
			// to determine if the lamp is in the players field of view
			let fObjectAngle = Math.atan2(fEyeY, fEyeX) - Math.atan2(fVecY, fVecX);
			if (fObjectAngle < -Math.PI)
				fObjectAngle += 2.0 * Math.PI;
			if (fObjectAngle > Math.PI)
                fObjectAngle -= 2.0 * Math.PI;
                
			let bInPlayerFOV = Math.abs(fObjectAngle) < (this.fFOV) / 2;
            let shadeLevel = (fDistanceFromPlayer * 0.1).toFixed(2);

			if (bInPlayerFOV && fDistanceFromPlayer >= 0.5 && fDistanceFromPlayer < this.fDepth && !object.remove)
			{
                // TODO: Fix this
                let fObjectCeiling = (this.screenHeight / 2.0) - this.screenHeight / (fDistanceFromPlayer);
				let fObjectFloor = this.screenHeight - fObjectCeiling;
				let fObjectHeight = fObjectFloor - fObjectCeiling;
				let fObjectAspectRatio = object.asset.getHeight() / object.asset.getWidth();
				let fObjectWidth = fObjectHeight / fObjectAspectRatio;
                let fMiddleOfObject = (0.5 * (fObjectAngle / (this.fFOV / 2.0)) + 0.5) * this.screenWidth;

                this.renderer.renderUnicodeAsset(
                    object.asset, // the asset
                    fMiddleOfObject - (fObjectWidth / 2.0), fObjectCeiling,  // X and Y coordinates
                    fObjectWidth, fObjectHeight, // Dimentions
                    fMiddleOfObject, // middle of the object
                    fDistanceFromPlayer, // distance between player and object
                    this.fDepthBuffer, // the depth buffer
                    shadeLevel); // the shade level
			}
		}
    }

    createControls() {
        let self = this;
        this.controls = new Controls({
            pointerLock: true,
            canvas: self.renderer.canvas,
            pointerCallout: function(e) {
                self.updatePosition(e);
            }
        });

        // up arrow OR "W" key
        this.controls.bindKeys(['38', '87'], function() {
            self.player.posX += self.calcNextPlayerPositionX();
            self.player.posY += self.calcNextPlayerPositionY();
            if (self.checkForWall()) {
                self.player.posX -= self.calcNextPlayerPositionX();
                self.player.posY -= self.calcNextPlayerPositionY();
            }
        });
        // down arrow OR "S" key
        this.controls.bindKeys(['40', '83'], function() {
             self.player.posX -= self.calcNextPlayerPositionX();
             self.player.posY -= self.calcNextPlayerPositionY();
             if (self.checkForWall()) {
                 self.player.posX += self.calcNextPlayerPositionX();
                 self.player.posY += self.calcNextPlayerPositionY();
             }
        });
        // left arrow OR "D" key
        this.controls.bindKeys(['37', '65'], function() {
            self.player.posX += self.calcNextPlayerPositionX();
            self.player.posY -= self.calcNextPlayerPositionY();
            if (self.checkForWall()) {
                self.player.posX -= self.calcNextPlayerPositionX();
                self.player.posY += self.calcNextPlayerPositionY();
            }
        });
        // right arrow OR "A" key
        this.controls.bindKeys(['39', '68'], function() {
            self.player.posX -= self.calcNextPlayerPositionX();
            self.player.posY += self.calcNextPlayerPositionY();
            if (self.checkForWall()) {
                self.player.posX += self.calcNextPlayerPositionX();
                self.player.posY -= self.calcNextPlayerPositionY();
            }
        });

        this.controls.bindMousedown(function() {
			let vx = Math.sin(self.player.angle) * 8;
			let vy = Math.cos(self.player.angle) * 8;
            self.units.push(new Unit(self.player.posX, self.player.posX, vx, vy, 'rocket'));
        })
    }
    calcNextPlayerPositionX() {
        return Math.sin(this.player.angle) * this.fSpeed * 0.1;
    }
    calcNextPlayerPositionY() {
        return Math.cos(this.player.angle) * this.fSpeed * 0.1;
    }
    checkForWall() {
        return this.map.surface[Math.floor(this.player.posX) * this.map.mapWidth + Math.floor(this  .player.posY)] === '#';
    }
    updatePosition(e) {
        if(e.movementX > 0) {
            this.player.angle += (e.movementX) * 0.005;
        }
        if(e.movementX < 0) {
            this.player.angle += ( e.movementX) * 0.005;
        }
        if(e.movementY > 0) {
            this.player.yAngle += (e.movementY) * 1;
        }
        if(e.movementY < 0) {
            this.player.yAngle += ( e.movementY) * 1;
        }
    }
}

window.onload = function() {
    new Game();
}