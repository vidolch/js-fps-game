class Game {
    constructor() {
        this.step = 40;

        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.fFOV = 3.14159 / 4.0;	// Field of View
        this.fSpeed = 5.0;
        this.fDepth = 32;			// Maximum rendering distance
        this.mapHeight = 16;
        this.mapWidth = 16;
        this.resDecrease = 4;
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
        
        this.createEventListeners();
        this.move();
        
    }

    move() {
		this.tp2 = Date.now();
		this.fElapsedTime = this.tp2 - this.tp1;
        this.tp1 = this.tp2;
        
        this.context.fillStyle = 'rgb(44, 107, 255)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'black';

        for (let i = 0; i < this.screenWidth; i++) {
            let fRayAngle = (this.player.angle - this.fFOV / 2.0) + (i / this.screenWidth) * this.fFOV;
            let stepSize = 0.05;
            let distanceToWall = 0.0;
            let bHitWall = false;		// Set when ray hits wall block

            let eyeX = Math.sin(fRayAngle); // Unit vector for ray in player space
            let eyeY = Math.cos(fRayAngle);

            // Incrementally cast ray from player, along ray angle, testing for 
            // intersection with a block
            while (!bHitWall && distanceToWall < this.fDepth) {

                distanceToWall += stepSize;
                let nTestX = Math.floor(this.player.posX + eyeX * distanceToWall);
                let nTestY = Math.floor(this.player.posY + eyeY * distanceToWall);

                // Test if ray is out of bounds
                if (nTestX < 0 || nTestX >= this.mapWidth || nTestY < 0 || nTestY >= this.mapHeight) {
                    bHitWall = true;			// Just set distance to maximum depth
                    distanceToWall = this.fDepth;
                } else {
                    // Ray is inbounds so test to see if the ray cell is a wall block
                    if (this.map[Math.round(nTestX * this.mapWidth + nTestY)] === '#') {
                        // Ray has hit wall
                        bHitWall = true;
                    }
                }
            }
            // Calculate distance to ceiling and floor
            let nCeiling = (this.screenHeight / 2.0) - (this.screenHeight / distanceToWall);
            let nFloor = this.screenHeight - nCeiling;

            // Shader walls based on distance
            let shadeLevel = (distanceToWall * 0.1).toFixed(2) * -1;
            shadeLevel = shadeLevel < -1 || shadeLevel > 0 ? -1 : shadeLevel;
            let wShade = this.shadeBlendConvert(shadeLevel, 'rgb(119, 119, 119)');
            this.context.fillStyle = wShade;
            
            for (let y = 0; y < this.screenHeight; y++) {
                // Each Row
                let b = 1.0 - ((y - this.screenHeight / 2.0) / (this.screenHeight / 2.0));
                if (y <= nCeiling) {
                } else if (y > nCeiling && y <= nFloor) {
                    // screen[y*this.screenWidth + x] = nShade;
                    this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);//y*this.screenWidth + i
                }
                else // Floor
                {
                    // Shade floor based on distance
                    let gshade = this.shadeBlendConvert((b).toFixed(2) * -1, 'rgb(147, 67, 2)');

                    this.context.fillStyle = gshade;
                    this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);//y*this.screenWidth + i
                    this.context.fillStyle = wShade;
                }
            }
        }
        this.context.fillStyle = 'black';
        //     for(let i = 0; i < 20; i++) {
        //       for(let j = 0; j < 20; j++) {
        //         var this.canvas=document.getElementById("myCanvas");
        //         var this.context=this.canvas.getContext("2d");
        //         if(this.map[i][j] === '#') {
        //             this.context.fillRect(pX,pY,40,40);
        //         }
        //         pX   += step;

        //         if(px === i && py === j) this.context.fillRect(pX,pY,40,40);
        //       } 
        //       pX = 0;
        //       pY+= step;
        //     }
        // Display this.map
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
        this.context.fillRect((this.player.posX * 10) + 10, (this.player.posY * 10) + 10, 10, 10);
        this.context.fillStyle = 'black';

        // Display Frame
        // screen[nScreenWidth * nthis.ScreenHeight - 1] = '\0';
        // WriteConsoleOutputCharacter(hConsole, screen, nScreenWidth * nthis.ScreenHeight, { 0,0 }, &dwBytesWritten);
        this.context.beginPath();
        //this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.context.stroke();
        let self = this;
        setTimeout(self.move.bind(self), 50);
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
                if (self.map[Math.round(self.player.posX) * self.mapWidth + Math.round(self.player.posY)] === '#')
                {
                    self.player.posX -= Math.sin(self.player.angle) * self.fSpeed * fElapsedTime;
                    self.player.posY -= Math.cos(self.player.angle) * self.fSpeed * fElapsedTime;
                }	
            }
            else if (e.keyCode == '40') {
                // down arrow
                self.player.posX -= Math.sin(self.player.angle) * self.fSpeed * fElapsedTime;
                self.player.posY -= Math.cos(self.player.angle) * self.fSpeed * fElapsedTime;
                if (self.map[Math.round(self.player.posX) * self.mapWidth + Math.round(self.player.posY)] === '#')
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