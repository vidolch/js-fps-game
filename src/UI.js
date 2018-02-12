export class UI {
    constructor(renderer, map, player) {
        this.renderer = renderer;
        this.map = map;
        this.player = player;
    }
    drawMiniMap(middleCorrdinates) {
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
                x: Math.floor(this.player.posX + middleCorrdinates.x * 5) * 4 + 10,
                y: Math.floor(this.player.posY + middleCorrdinates.y * 5) * 4 + 10,
            }
        ], 'red');
        this.renderer.setFillStyle('black');
    }
    drawUI(middleCorrdinates) {
        this.renderer.renderImage2(
            0, 0,
            198, 165,
            this.renderer.getWidth() / 2 + 30, this.renderer.getHeight() - 165,
            198, 165);
    }
}