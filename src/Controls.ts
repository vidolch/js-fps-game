import { ControlOptions } from "./ControlOptions";

export class Controls {
    keysBindings: Function[];
    mousedownCallback: Function;
    useMouse: boolean;

    constructor(options: ControlOptions) {
        this.keysBindings = [];

        if(!!options) {
            if (options.pointerLock) {
                if (!options.canvas || !options.pointerCallback) {
                    throw "In order to utilize pointer lock, provide canvas and callback in the options!";
                }
                this.useMouse = false;
                this.bindPointer(options.canvas as HTMLCanvasElement, options.pointerCallback);
            }
        }
        this.createEventListeners();
    }

    bindKeys(keys: string[], callback: Function): void {
        for (let i: number = 0; i < keys.length; i++) {
            this.keysBindings[keys[i]] = callback;
        }
    }

    bindKey(key: string, callback: Function): void {
        this.keysBindings[key] = callback;
    }

    bindMousedown(callback: Function): void {
        this.mousedownCallback = callback;
    }

    createEventListeners(): void {
        document.addEventListener("keydown", (e) => {
            e = e || window.event;
            if(this.keysBindings.hasOwnProperty(e.keyCode)) {
                this.keysBindings[e.keyCode]();
            }
        });

        document.addEventListener("mousedown", (e) => {
            e = e || window.event;
            if(this.mousedownCallback !== undefined) {
                this.mousedownCallback();
            }
        });

    }

    bindPointer(canvas: HTMLCanvasElement, pointerCallback: Function): void {
        canvas["requestPointerLock"] = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"];

        document["exitPointerLock"] = document["exitPointerLock"] || document["mozExitPointerLock"];

        canvas.onclick = () => {
            this.useMouse = true;
            canvas["requestPointerLock"]();
        };
        document.addEventListener("pointerlockchange", (e) => {
            this.lockChange(canvas, pointerCallback);
        }, false);
        document.addEventListener("mozpointerlockchange", (e) => {
            this.lockChange(canvas, pointerCallback);
        }, false);
    }

    lockChange(canvas: HTMLCanvasElement, pointerCallback: Function): void {
        if (document["pointerLockElement"] === canvas ||
            document["mozPointerLockElement"] === canvas) {
            console.log("The pointer lock status is now locked");
            document.addEventListener("mousemove", (e) => {
                if(!this.useMouse) { return; }
                pointerCallback(e);
            }, false);
        } else {
            console.log("The pointer lock status is now unlocked");
            this.useMouse = false;
        }
    }
}