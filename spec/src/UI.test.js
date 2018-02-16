import { UI } from "../../src/UI";
import { JSDOM } from "JSDOM";

window = JSDOM.jsdom('<html><head></head><body><div id="rondavu_container"></div></body></html>').createWindow();
global.window = window;

global.document = window.document;

describe("Does UI draw MiniMap", function() {
    let uiHandler;

    it("and so is a spec", function() {
        uiHandler = new UI(map1, {
            posX: 10,
            posY: 10,
            angle: 0
        });
        uiHandler.drawMiniMap();
        expect(uiHandler).toBe(true);
    });
});

const map1 = {
    mapHeight: 32,
    mapWidth: 32
}
map1.surface =  "#########.......#########.......";
map1.surface += "#...............#...............";
map1.surface += "#.......#########.......########";
map1.surface += "#..............##..............#";
map1.surface += "#......##......##......##......#";
map1.surface += "#......##..............##......#";
map1.surface += "#..............##..............#";
map1.surface += "###............####............#";
map1.surface += "##.............###.............#";
map1.surface += "#............####............###";
map1.surface += "#..............................#";
map1.surface += "#..............##..............#";
map1.surface += "#..............##..............#";
map1.surface += "#...........#####...........####";
map1.surface += "#..............................#";
map1.surface += "###..####....########....#######";
map1.surface += "####.####.......######..........";
map1.surface += "#...............#...............";
map1.surface += "#.......#########.......##..####";
map1.surface += "#..............##..............#";
map1.surface += "#......##......##.......#......#";
map1.surface += "#......##......##......##......#";
map1.surface += "#..............##..............#";
map1.surface += "###............####............#";
map1.surface += "##.............###.............#";
map1.surface += "#............####............###";
map1.surface += "#..............................#";
map1.surface += "#..............................#";
map1.surface += "#..............##..............#";
map1.surface += "#...........##..............####";
map1.surface += "#..............##..............#";
map1.surface += "################################";