import { ImageAsset } from "./Rendering/ImageAsset";

export let GLOBAL_ASSETS = [];
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
    }).length === GLOBAL_ASSETS.length;
}

export let sampleSprite;
sampleSprite = [
    '##..##..##',
    '##..##..##',
    '.##.##.##.',
    '..######..',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....',
    '....##....'
];