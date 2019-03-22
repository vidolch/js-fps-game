import { ImageAsset } from "./Rendering/ImageAsset";

export let GLOBAL_ASSETS = [];
export let ALL_LOADED = true;
export let GetAsset = function(name) {
    let result = GLOBAL_ASSETS.filter((asset) => {
        return asset.name === name;
    });
    if (!result || result.length === 0) {
        return null;
    }
    return result[0];
}
export let AreAllAssetsLoaded = function(name) {
    return GLOBAL_ASSETS.filter((asset) => {
        return asset.isComplete();
    }).length === GLOBAL_ASSETS.length && ALL_LOADED;
}
export let SetAllLoaded = function(loaded) {
    ALL_LOADED = loaded;
}