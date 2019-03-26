import { Renderer } from "./Rendering/Renderer";
import { ImageAsset } from "./Rendering/ImageAsset";
import { GLOBAL_ASSETS } from "./Globals";
import { RendererOptions } from "./Rendering/RendererOptions";
import { GameMap } from "./GameMap";
import { Player } from "./Player";
import { Point } from "./Point";

export class UI {
    renderer: Renderer;
    map: GameMap;
    player: Player;
    minimapOffset: { x: number, y: number};
    minimapScale: number;

    constructor(map: GameMap, player: Player) {
        let container: HTMLElement | null = document.getElementById("container");
        if (container === null) {
            throw("Container element could not be found");
        }

        let rendererOptions: RendererOptions = new RendererOptions();
        rendererOptions.canvasId = "uiScreen";

        this.renderer = new Renderer(container, rendererOptions);
        this.map = map;
        this.player = player;
        this.minimapOffset = {
            x: 40,
            y: 40
        };
        this.minimapScale = 4;
        GLOBAL_ASSETS.push(new ImageAsset("gun_sprite", "./sprites/shotgun.png"));
    }

    drawMiniMap(middleCorrdinates: Point, units: Point[]): void {
        this.renderer.setFillStyle("white");
        for (let nx: number = 0; nx < this.map.mapWidth; nx++) {
            for (let ny: number = 0; ny < this.map.mapHeight; ny++) {
                if (this.map.surface[ny * this.map.mapWidth + nx] === "#") {
                    this.renderer.renderRect(
                        (nx * this.minimapScale) + this.minimapOffset.x,
                        (ny * this.minimapScale) + this.minimapOffset.y,
                        this.minimapScale, this.minimapScale);
                }
                if(units.filter((u) => u.x === nx && u.y === ny).length > 0) {
                    this.renderer.setFillStyle("yellow");
                    this.renderer.renderRect(
                        (nx * this.minimapScale) + this.minimapOffset.x,
                        (ny * this.minimapScale) + this.minimapOffset.y,
                        this.minimapScale, this.minimapScale);
                    this.renderer.setFillStyle("white");
                }
            }
        }
        this.renderer.setFillStyle("red");
        this.renderer.renderRect(
            (this.player.posX * this.minimapScale) + this.minimapOffset.x,
            (this.player.posY * this.minimapScale) + this.minimapOffset.y,
            2,
            2);

        this.renderer.renderLine([
            {
                x: (this.player.posX * this.minimapScale) + this.minimapOffset.x,
                y: (this.player.posY * this.minimapScale) + this.minimapOffset.y
            },
            {
                x: Math.floor(this.player.posX + middleCorrdinates.x * 5) * this.minimapScale + this.minimapOffset.x,
                y: Math.floor(this.player.posY + middleCorrdinates.y * 5) * this.minimapScale + this.minimapOffset.y,
            }
        ], "red");
        this.renderer.setFillStyle("black");
    }

    async drawUI(middleCorrdinates: Point, units: Point[]): Promise<void> {
        this.renderer.clearAll();
        this.drawMiniMap(middleCorrdinates, units);
        this.renderer.setFillStyle("white");
        this.renderer.renderRect(this.renderer.getWidth() / 2 - 15, this.renderer.getHeight() / 2 - 2, 30, 4);
        this.renderer.renderRect(this.renderer.getWidth() / 2 - 2, this.renderer.getHeight() / 2 - 15, 4, 30);
    }
}