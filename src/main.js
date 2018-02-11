import { VisualUtils } from './VisualUtils.js';
import { Controls } from './Controls.js';

export class Game {
    constructor() {
        this.controls;

        this.step = 40;

        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.fFOV = 3.14159 / 4.0;	// Field of View
        this.fSpeed = 2;
        this.fDepth = 32;			// Maximum rendering distance
        this.mapHeight = 32;
        this.mapWidth = 32;
        this.resDecrease = 1;
        this.tp1 = Date.now();
        this.tp2 = Date.now();
        this.fElapsedTime = 0;
        
        this.mousePositionX = 0;

        this.screenWidth = this.canvas.width / this.resDecrease;
        this.screenHeight = this.canvas.height / this.resDecrease;

        this.player = {
            posX: 8,
            posY: 8,
            angle: 0
        }

        this.map =  "#########.......#########.......";
		this.map += "#...............#...............";
		this.map += "#.......#########.......########";
		this.map += "#..............##..............#";
		this.map += "#......##......##......##......#";
		this.map += "#......##..............##......#";
		this.map += "#..............##..............#";
		this.map += "###............####............#";
		this.map += "##.............###.............#";
		this.map += "#............####............###";
		this.map += "#..............................#";
		this.map += "#..............##..............#";
		this.map += "#..............##..............#";
		this.map += "#...........#####...........####";
		this.map += "#..............................#";
		this.map += "###..####....########....#######";
		this.map += "####.####.......######..........";
		this.map += "#...............#...............";
		this.map += "#.......#########.......##..####";
		this.map += "#..............##..............#";
		this.map += "#......##......##.......#......#";
		this.map += "#......##......##......##......#";
		this.map += "#..............##..............#";
		this.map += "###............####............#";
		this.map += "##.............###.............#";
		this.map += "#............####............###";
		this.map += "#..............................#";
		this.map += "#..............................#";
		this.map += "#..............##..............#";
		this.map += "#...........##..............####";
		this.map += "#..............##..............#";
		this.map += "################################";

        this.nCeiling = 0;
        this.nFloor = 0;
        this.wallTexture = document.getElementById('source');
        this.wallPatern = null;

        this.middleCorrdinates = {};


        this.tracker = document.getElementById('tracker');

        this.animation;

        this.createControls();
        this.move();
    }

    move() {
        this.wallPatern = this.wallPatern === null ? this.context.createPattern(this.wallTexture, 'repeat') : this.wallPatern; // Create a pattern with this image, and set it to "repeat".
        this.tp2 = Date.now();
        this.fElapsedTime = this.tp2 - this.tp1;
        this.tp1 = this.tp2;

        this.context.fillStyle = 'rgb(44, 107, 255)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        var linearGradient1 = this.context.createLinearGradient(0, this.canvas.height, 0, this.canvas.height / 2);
        linearGradient1.addColorStop(0, 'rgb(147, 67, 2)');
        linearGradient1.addColorStop(0.65, VisualUtils.shadeBlendConvert(-0.8, 'rgb(147, 67, 2)'));
        linearGradient1.addColorStop(1, 'rgb(0, 0, 0)');
        this.context.fillStyle = linearGradient1;
        this.context.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
        this.context.fillStyle = 'black';

        let fRayAngle = 0;
        let stepSize = 0;
        let distanceToWall = 0;
        let bHitWall = 0;
        let eyeX = 0;
        let eyeY = 0;
        let nTestX = 0;
        let nTestY = 0;

        for (let i = 0; i < this.screenWidth; i++) {
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
                if (nTestX < 0 || nTestX >= this.mapWidth || nTestY < 0 || nTestY >= this.mapHeight) {
                    bHitWall = true;			// Just set distance to maximum depth
                    distanceToWall = this.fDepth;
                } else {
                    // Ray is inbounds so test to see if the ray cell is a wall block
                    if (this.map[Math.round(nTestX * this.mapWidth + nTestY)] === '#') {
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
            let shadeLevel = (distanceToWall * 0.1).toFixed(2);// * -1;
            // shadeLevel = shadeLevel < -1 || shadeLevel > 0 ? -1 : shadeLevel;
            // let wShade = this.shadeBlendConvert(shadeLevel, 'rgb(119, 119, 119)');    

            let heightToDraw = 0;
            let firstY = -1;
            for (let y = 0; y < this.screenHeight; y++) {
                // Each Row
                // let b = 1.0 - ((y - this.screenHeight / 2.0) / (this.screenHeight / 2.0));
                if (y <= this.nCeiling) { // roof
                } else if (y > this.nCeiling && y <= this.nFloor) {
                    // Draw Wall
                    if (distanceToWall < this.fDepth) {
                        // let fSampleY = (y - this.nCeiling) / (this.nFloor - this.nCeiling);
                        // fSampleY *= 100;
                        // fSampleY = Math.floor(fSampleY / (100 / 36));
                        // Draw(x, y, spriteWall->SampleGlyph(fSampleX, fSampleY), spriteWall->SampleColour(fSampleX, fSampleY));
                        // debugger;
                        // this.wallPaternrotate(60 * Math.PI / 180);
                        // this.context.fillStyle = this.wallPatern; 
                        // this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);
                    }
                    else {
                        // this.context.fillStyle = 'rgb(0, 0, 0)';
                        // this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);  
                    }

                    heightToDraw += this.resDecrease;
                    firstY = firstY === -1 ? y : firstY;
                } else { // Floor
                    // Shade floor based on distance
                    // let gshade = this.shadeBlendConvert((b).toFixed(2) * -1, 'rgb(147, 67, 2)');
                    // this.context.fillStyle = gshade;
                    // this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);
                }
            }
            // this.context.fillStyle = this.wallPatern;    
            // this.context.fillRect(i * this.resDecrease, firstY * this.resDecrease, this.resDecrease, heightToDraw);
            this.context.drawImage(
                this.wallTexture,
                fSampleX,
                0,
                this.resDecrease, 288,
                i * this.resDecrease,
                firstY,
                this.resDecrease, heightToDraw);
            this.context.fillStyle = 'rgba(0, 0, 0, ' + shadeLevel + ')';
            this.context.fillRect(i * this.resDecrease, firstY * this.resDecrease, this.resDecrease, heightToDraw);
        }
        this.context.fillStyle = 'black';
        this.context.fillStyle = 'white';
        for (let nx = 0; nx < this.mapWidth; nx++) {
            for (let ny = 0; ny < this.mapHeight; ny++) {
                if (this.map[ny * this.mapWidth + nx] === '#') {
                    this.context.fillRect((nx * 4) + 10, (ny * 4) + 10, 4, 4);
                }
            }
        }
        this.context.fillStyle = 'red';
        this.context.fillRect((this.player.posY * 4) + 10, (this.player.posX * 4) + 10, 2, 2);
        this.context.beginPath();
        this.context.moveTo((this.player.posY * 4) + 10, (this.player.posX * 4) + 10);
        
        // nTestX = Math.floor(this.player.posX + eyeX * distanceToWall);
        // nTestY = Math.floor(this.player.posY + eyeY * distanceToWall);
        this.context.lineTo(
            Math.floor(this.player.posY + this.middleCorrdinates.y * 5) * 4 + 10,
            // ((this.middleCorrdinates.y * 100) * 10) + 10,
            Math.floor(this.player.posX + this.middleCorrdinates.x * 5) * 4 + 10
            // ((this.middleCorrdinates.x * 100) * 10) + 10
        );
        this.context.strokeStyle = 'red';
        this.context.stroke();
        this.context.fillStyle = 'black';

        let self = this;
        setTimeout(self.move.bind(self), 1);
    }

    createControls() {
        let self = this;
        this.controls = new Controls({
            pointerLock: true,
            canvas: self.canvas,
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
        return this.map[Math.floor(this.player.posX) * this.mapWidth + Math.floor(this  .player.posY)] === '#';
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