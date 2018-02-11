import { Controls } from './Controls.js';
import { Renderer } from './Rendering/Renderer';
import { Stats } from './Utils/Stats';

import { map1 } from './config';

export class Game {
    constructor() {
        // benchmark script
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.stats.dom );

        this.controls;
        this.renderer = new Renderer(document.getElementById("myCanvas"));

        this.fFOV = 3.14159 / 4.0;	// Field of View
        this.fSpeed = 2;
        this.fDepth = 25;			// Maximum rendering distance
        
        this.screenWidth = this.renderer.getWidth();
        this.screenHeight = this.renderer.getHeight();

        this.player = {
            posX: 8,
            posY: 8,
            angle: 0
        }

        this.map = map1;

        this.middleCorrdinates = {};

        this.createControls();
        this.move();
    }

    move() {
        this.stats.begin();

        this.renderer.renderGlobals();

        this.mainScreen(0, this.screenWidth);

        this.renderer.setFillStyle('white');
        for (let nx = 0; nx < this.map.mapWidth; nx++) {
            for (let ny = 0; ny < this.map.mapHeight; ny++) {
                if (this.map.surface[ny * this.map.mapWidth + nx] === '#') {
                    this.renderer.renderRect((nx * 4) + 10, (ny * 4) + 10, 4, 4);
                }
            }
        }
        this.renderer.setFillStyle('red');
        this.renderer.renderRect((this.player.posY * 4) + 10, (this.player.posX * 4) + 10, 2, 2);

        this.renderer.renderLine([
            {
                x: (this.player.posY * 4) + 10,
                y: (this.player.posX * 4) + 10
            },            
            {
                x: Math.floor(this.player.posX + this.middleCorrdinates.x * 5) * 4 + 10,
                y: Math.floor(this.player.posY + this.middleCorrdinates.y * 5) * 4 + 10,
            }
        ], 'red');
        this.renderer.setFillStyle('black');

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

        this.renderer.beginOffScreen();

        for (let i = from; i < to; i++) {
            fRayAngle = (this.player.angle - this.fFOV / 2.0) + (i / this.screenWidth) * this.fFOV;
            stepSize = 0.01;
            distanceToWall = 0.0;
            bHitWall = false;		// Set when ray hits wall block
            eyeX = Math.sin(fRayAngle); // Unit vector for ray in player space
            eyeY = Math.cos(fRayAngle);
            if(i === this.screenWidth / 2) this.middleCorrdinates = {x: eyeX, y: eyeY}; 

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
            
            this.renderer.renderImage(
                fSampleX, 0,
                1, 288,
                i, firstY,
                1, heightToDraw, {
                    shadeLevel: shadeLevel
                });
        }

        this.renderer.endOffScreen();
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
            console.log("Left " + e.movementX);
        }
        if(e.movementX < 0) {
            this.player.angle += ( e.movementX) * 0.005;
            console.log("Right " + e.movementX);
        }
    }
}

window.onload = function() {
    new Game();
}