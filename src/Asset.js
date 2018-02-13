export class Asset {
    constructor(name) {
        this.name = name;
        this.loaded = false;
    }
    isComplete() {
        return this.loaded;
    }
}