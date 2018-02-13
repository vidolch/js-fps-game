export class Controls {
    constructor(options) {
        this.keysBindings = {};

        if(options !== undefined) {
            if(options.hasOwnProperty('pointerLock')) {
                if (!!options['pointerLock']) {
                    if (typeof options['canvas'] === "undefined") {
                        throw "In order to utilize pointer lock, provide convas in options!";
                    }
                    this.useMouse = false;
                    this.bindPointer(options['canvas'], options['pointerCallout']);
                }
            }
        }
        this.createEventListeners();
    }

    bindKeys(keys, callout) {
        if(Array.isArray(keys)) {
            for (let i = 0; i < keys.length; i++) {
                this.keysBindings[keys[i]] = callout;
            }
        } else {
            throw "Keys parameter should be an Array!";
        }
    }

    bindKey(key, callout) {
        if(typeof keys === 'String') {
            this.keysBindings[keys] = callout;
        } else {
            throw "Key parameter should be String!";
        }
    }

    createEventListeners() {
        let self = this;
        let fElapsedTime = 0.1
        document.addEventListener("keydown", function (e) {
            e = e || window.event;
            if(self.keysBindings.hasOwnProperty(e.keyCode)) {
                self.keysBindings[e.keyCode]();
            }
        });
       
    }
    bindPointer(canvas, pointerCallout) {
        let self = this;
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

        canvas.onclick = function () {
            self.useMouse = true;
            canvas.requestPointerLock();
        };
        document.addEventListener('pointerlockchange', function (e) {
            self.lockChange(canvas, pointerCallout);
        }, false);
        document.addEventListener('mozpointerlockchange', function (e) {
            self.lockChange(canvas, pointerCallout);
        }, false);
    }
    lockChange(canvas, pointerCallout) {
        let self = this;
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            console.log('The pointer lock status is now locked');
            document.addEventListener("mousemove", function (e) {
                if(!self.useMouse) return;
                pointerCallout(e);
            }, false);
        } else {
            console.log('The pointer lock status is now unlocked');
            self.useMouse = false;
        }
    }
}