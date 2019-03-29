export class CombinedBuffer {
    position: WebGLBuffer;
    color: WebGLBuffer | null;
    indecies: WebGLBuffer;
    textures: WebGLBuffer | null;
}