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
        this.resDecrease = 1;

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

        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

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
                let nTestX = (this.player.posX + eyeX * distanceToWall);
                let nTestY = (this.player.posY + eyeY * distanceToWall);

                // Test if ray is out of bounds
                if (nTestX < 0 || nTestX >= this.mapWidth || nTestY < 0 || nTestY >= this.mapHeight) {
                    bHitWall = true;			// Just set distance to maximum depth
                    distanceToWall = this.fDepth;
                } else {
                    // Ray is inbounds so test to see if the ray cell is a wall block
                    debugger;
                    var v = Math.round(nTestX * this.mapWidth + nTestY);
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
            let wShade = 'rgba(119, 119, 119, ' + (1 - distanceToWall * 0.1).toFixed(2) + ')';
            // if (distanceToWall <= this.fDepth / 4.0)			wShade = 'rgba(119, 119, 119, 1)';	// Very close	
            // else if (distanceToWall < this.fDepth / 3.0)		wShade = 'rgba(119, 119, 119, .7)';
            // else if (distanceToWall < this.fDepth / 2.0)		wShade = 'rgba(119, 119, 119, .6)';
            // else if (distanceToWall < this.fDepth)				wShade = 'rgba(119, 119, 119, .3)';
            // else    								            wShade = 'rgba(119, 119, 119, 0)';		// Too far away

            this.context.fillStyle = wShade;
            
            for (let y = 0; y < this.screenHeight; y++) {
                // Each Row
                let b = 1.0 - ((y - this.screenHeight / 2.0) / (this.screenHeight / 2.0));
                if (y <= nCeiling) {
                    // screen[y*this.screenWidth + x] = ' ';
                    // this.context.fillRect(i,y*this.screenWidth + x,40,40);
                    this.context.fillStyle = 'rgba(44, 107, 255, ' + (b - 1).toFixed(2) + ')';
                    this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);//y*this.screenWidth + i
                    this.context.fillStyle = wShade;
                } else if (y > nCeiling && y <= nFloor) {
                    // screen[y*this.screenWidth + x] = nShade;
                    this.context.fillRect(i * this.resDecrease, y * this.resDecrease, this.resDecrease, this.resDecrease);//y*this.screenWidth + i
                }
                else // Floor
                {
                    // Shade floor based on distance
                    let gshade;
                    // if (b < 0.25)		gshade = 'rgba(131, 131, 131, 1)';
                    // else if (b < 0.5)	gshade = 'rgba(131, 131, 131, .8)';
                    // else if (b < 0.75)	gshade = 'rgba(131, 131, 131, .6)';
                    // else if (b < 0.9)	gshade = 'rgba(131, 131, 131, .3)';
                    // else				gshade = 'rgba(131, 131, 131, 0)';
                    gshade = 'rgba(147, 67, 2, ' + (1 - b).toFixed(2) + ')';
                    // screen[] = nShade;
                    // this.context.fillRect(i,y,40,40); //y*this.screenWidth + i
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
        this.context.fillRect(this.player.posX * 10 + 10, this.player.posY * 10 + 10, 10, 10);
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
}