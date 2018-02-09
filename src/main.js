class Game {
    constructor() {
        this.step = 40;

        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.fFOV = 3.14159 / 4.0;	// Field of View
        this.fSpeed = 2;
        this.fDepth = 32;			// Maximum rendering distance
        this.mapHeight = 16;
        this.mapWidth = 16;
        this.resDecrease = 1;
        this.tp1 = Date.now();
        this.tp2 = Date.now();
        this.fElapsedTime = 0;

        this.screenWidth = this.canvas.width / this.resDecrease;
        this.screenHeight = this.canvas.height / this.resDecrease;
        
        this.player = {
            posX: 8,
            posY: 8,
            angle: 0
        }
            
        this.map =  "#########.......";
        this.map += "#...............";
        this.map += "#.......########";
        this.map += "#..............#";
        this.map += "#......##......#";
        this.map += "#......##......#";
        this.map += "#..............#";
        this.map += "###............#";
        this.map += "##.............#";
        this.map += "#......####..###";
        this.map += "#......#.......#";
        this.map += "#......#.......#";
        this.map += "#..............#";
        this.map += "#......#########";
        this.map += "#..............#";
        this.map += "################";
        
        this.nCeiling = 0;
        this.nFloor = 0;
        this.wallTexture = document.getElementById('source');
        this.wallPatern = null;

        this.createEventListeners();
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
        linearGradient1.addColorStop(0.65, this.shadeBlendConvert(-0.8, 'rgb(147, 67, 2)'));
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
                let b = 1.0 - ((y - this.screenHeight / 2.0) / (this.screenHeight / 2.0));
                if (y <= this.nCeiling) { // roof
                } else if (y > this.nCeiling && y <= this.nFloor) {
                    // Draw Wall
					if (distanceToWall < this.fDepth)
					{
						let fSampleY = (y - this.nCeiling) / (this.nFloor - this.nCeiling);
                        // Draw(x, y, spriteWall->SampleGlyph(fSampleX, fSampleY), spriteWall->SampleColour(fSampleX, fSampleY));
                        debugger;
                        this.context.fillStyle = this.wallPatern; 
                        this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);
					}
                    else 
                    {
                        this.context.fillStyle = 'rgb(0, 0, 0)';
                        this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);  
                    }

                    // heightToDraw += this.resDecrease;
                    // firstY = firstY === -1 ? y : firstY;
                } else { // Floor
                    // Shade floor based on distance
                    // let gshade = this.shadeBlendConvert((b).toFixed(2) * -1, 'rgb(147, 67, 2)');
                    // this.context.fillStyle = gshade;
                    // this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);
                }
            }
            // this.context.fillStyle = this.wallPatern;    
            // this.context.fillRect(i * this.resDecrease, firstY * this.resDecrease, this.resDecrease, heightToDraw);
            // this.context.fillStyle = 'rgba(0, 0, 0, ' + shadeLevel + ')';    
            // this.context.fillRect(i * this.resDecrease, firstY * this.resDecrease, this.resDecrease, heightToDraw);
        }
        this.context.fillStyle = 'black';
        this.context.fillStyle = 'white';        
        for (let nx = 0; nx < this.mapWidth; nx++) {
        	for (let ny = 0; ny < this.mapHeight; ny++)
        	{
                if(this.map[ny * this.mapWidth + nx] === '#') {
                    this.context.fillRect((nx * 10) + 10, (ny * 10) + 10, 10, 10);
                }
        	}
        }
        this.context.fillStyle = 'red';
        this.context.fillRect((this.player.posY * 10) + 10, (this.player.posX * 10) + 10, 4, 4);
        this.context.fillStyle = 'black';

        let self = this;
        setTimeout(self.move.bind(self), 1);
    }

    createEventListeners() {
        let self = this;
        let fElapsedTime = 0.1
        document.addEventListener("keydown", function (e) {
            e = e || window.event;
            if (e.keyCode == '38') {
                // up arrow
                self.player.posX += Math.sin(self.player.angle) * self.fSpeed * fElapsedTime;
                self.player.posY += Math.cos(self.player.angle) * self.fSpeed * fElapsedTime;
                if (self.map[Math.floor(self.player.posX) * self.mapWidth + Math.floor(self.player.posY)] === '#')
                {
                    self.player.posX -= Math.sin(self.player.angle) * self.fSpeed * fElapsedTime;
                    self.player.posY -= Math.cos(self.player.angle) * self.fSpeed * fElapsedTime;
                }	
            }
            else if (e.keyCode == '40') {
                // down arrow
                self.player.posX -= Math.sin(self.player.angle) * self.fSpeed * fElapsedTime;
                self.player.posY -= Math.cos(self.player.angle) * self.fSpeed * fElapsedTime;
                if (self.map[Math.floor(self.player.posX) * self.mapWidth + Math.floor(self.player.posY)] === '#')
                {
                    self.player.posX += Math.sin(self.player.angle) * self.fSpeed * fElapsedTime;
                    self.player.posY += Math.cos(self.player.angle) * self.fSpeed * fElapsedTime;
                }	
            }
            else if (e.keyCode == '37') {
                // left arrow
                self.player.angle -= 0.1;
            }
            else if (e.keyCode == '39') {
                // right arrow
                self.player.angle += 0.1;
            }
        });
    }
    shadeBlendConvert(p, from, to) {
        if (typeof p != "number" || p < -1 || p > 1 || typeof from != "string" || (from[0] != 'r' && from[0] != '#') || (typeof to != "string" && typeof to != "undefined")) {
            return null;
        }

        var i = parseInt,
            r = Math.round,
            h = from.length > 9,
            h = typeof to == "string" ? to.length > 9 ? true : to == "c" ? !h : false : h,
            b = p < 0,
            p = b ? p * -1 : p,
            to = to && to != "c" ? to : b ? "#000000" : "#FFFFFF",
            f = this.sbcRip(from, i),
            t = this.sbcRip(to, i);
        if (!f || !t) return null;
        if (h) return "rgb(" + r((t[0] - f[0]) * p + f[0]) + "," + r((t[1] - f[1]) * p + f[1]) + "," + r((t[2] - f[2]) * p + f[2]) + (f[3] < 0 && t[3] < 0 ? ")" : "," + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000 : t[3] < 0 ? f[3] : t[3]) + ")");
        else return "#" + (0x100000000 + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255) * 0x1000000 + r((t[0] - f[0]) * p + f[0]) * 0x10000 + r((t[1] - f[1]) * p + f[1]) * 0x100 + r((t[2] - f[2]) * p + f[2])).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
    }
    sbcRip(d, i) {
        var l = d.length,
            RGB = new Object();
        if (l > 9) {
            d = d.split(",");
            if (d.length < 3 || d.length > 4) return null;
            RGB[0] = i(d[0].slice(4)), RGB[1] = i(d[1]), RGB[2] = i(d[2]), RGB[3] = d[3] ? parseFloat(d[3]) : -1;
        } else {
            if (l == 8 || l == 6 || l < 4) return null;
            if (l < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + "" + d[4] : "");
            d = i(d.slice(1), 16), RGB[0] = d >> 16 & 255, RGB[1] = d >> 8 & 255, RGB[2] = d & 255, RGB[3] = l == 9 || l == 5 ? r(((d >> 24 & 255) / 255) * 10000) / 10000 : -1;
        }
        return RGB;
    }
}