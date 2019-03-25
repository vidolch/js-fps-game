import { Asset } from "./Asset";

export let GLOBAL_ASSETS: Asset[] = [];

export let GetAsset: Function = (name: string) => {
    let result: Asset[] = GLOBAL_ASSETS.filter((asset) => {
        return asset.name === name;
    });
    if (!result || result.length === 0) {
        return null;
    }
    return result[0];
};

export let AreAllAssetsLoaded: Function = (name: string) => {
    return GLOBAL_ASSETS.filter((asset) => {
        return asset.isComplete();
    }).length === GLOBAL_ASSETS.length;
};
