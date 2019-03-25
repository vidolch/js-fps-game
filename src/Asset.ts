export class Asset {
    name: string;
    loaded: boolean;

    constructor(name: string) {
        this.name = name;
        this.loaded = false;
    }

    isComplete(): boolean {
        return this.loaded;
    }
}