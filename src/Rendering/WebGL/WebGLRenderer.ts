import { I3dObject } from "./../../Objects/IObject";
import { Ground } from "./../../Objects/Ground";
// import { map1 } from './../config';
import { IRenderer } from "../IRenderer";
import { DrawOptions } from "../DrawOptions";
import { UnicodeAsset } from "../UnicodeAsset";
import { RendererOptions } from "../RendererOptions";
import { Point } from "src/Point";
import { mat4 } from "gl-matrix";
import { WebGLInfo } from "./WebGLInfo";
import { CombinedBuffer } from "./CombinedBuffer";
import { fsSource } from "./fsSource";
import { vsSource } from "./vsSource";

export class WebGLRenderer implements IRenderer {
    parentElement: HTMLElement;
    options: RendererOptions;
    canvas: HTMLCanvasElement;
    context: WebGLRenderingContext;

    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    programInfo: WebGLInfo;
    fieldOfView: number;
    aspect: number;
    zNear: number;
    zFar: number;
    projectionMatrix: mat4;
    modelViewMatrix: mat4;
    groundBuffers: CombinedBuffer;
    texture: any;


    constructor(parentElement: HTMLElement, options: RendererOptions) {
        this.parentElement = parentElement;
        this.options = options;

        this.canvas = document.createElement("canvas");
		this.canvas.setAttribute("width",  document.body.clientWidth.toString());
		this.canvas.setAttribute("height",  document.body.scrollHeight.toString());
		this.canvas.setAttribute("id",  this.options.canvasId);
        this.parentElement.appendChild(this.canvas);

        let context: WebGLRenderingContext | null = this.canvas.getContext("webgl");
        if (this.context !== null) {
            this.context = context as WebGLRenderingContext;
        }

        this.vertexShader = this.loadShader(this.context.VERTEX_SHADER, vsSource);
        this.fragmentShader = this.loadShader(this.context.FRAGMENT_SHADER, fsSource);

        // // create the shader program
        const shaderProgram: WebGLProgram | null = this.context.createProgram();
        if (shaderProgram === null) {
            throw("Could not create shader program.");
        }
        this.context.attachShader(shaderProgram, this.vertexShader);
        this.context.attachShader(shaderProgram, this.fragmentShader);
        this.context.linkProgram(shaderProgram);

        if (!this.context.getProgramParameter(shaderProgram, this.context.LINK_STATUS)) {
          throw("Unable to initialize the shader program: " + this.context.getProgramInfoLog(shaderProgram));
        }

        this.programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: this.context.getAttribLocation(shaderProgram, "aVertexPosition"),
                textureCoord: this.context.getAttribLocation(shaderProgram, "aTextureCoord")
            },
            uniformLocations: {
                projectionMatrix: this.context.getUniformLocation(shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: this.context.getUniformLocation(shaderProgram, "uModelViewMatrix"),
                uSampler: this.context.getUniformLocation(shaderProgram, "uSampler"),
            },
        };

        this.groundBuffers = this.initBuffers(new Ground());

        // tslint:disable-next-line:max-line-length
        this.texture = this.loadTexture("sprites/wall.png");
    }

    private loadShader(type: number, source: string): WebGLShader {
        const shader: WebGLShader | null = this.context.createShader(type);

        if (shader === null) {
            throw("Could not create shader.");
        }

        // send the source to the shader object
        this.context.shaderSource(shader, source);

        // compile the shader program
        this.context.compileShader(shader);

        // see if it compiled successfully
        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
            this.context.deleteShader(shader);
            throw("An error occurred compiling the shaders: " + this.context.getShaderInfoLog(shader));
        }

        return shader;
    }

    private initBuffers(object: I3dObject): CombinedBuffer {
        // create a buffer for the square's positions.
        const positionBuffer: WebGLBuffer | null = this.context.createBuffer();
        const colorBuffer: WebGLBuffer | null = null;
        let indexBuffer: WebGLBuffer | null = this.context.createBuffer();
        let textureCoordBuffer: WebGLBuffer | null = null;

        if (positionBuffer === null || indexBuffer === null) {
            throw("Could not create a WebGL buffer.");
        }

        // select the positionBuffer as the one to apply buffer
        // operations to from here out.
        this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);
        // now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // javaScript array, then use it to fill the current buffer.
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(object.positions), this.context.STATIC_DRAW);

        if (object.colors) {
            indexBuffer = this.context.createBuffer();
            if (indexBuffer === null) {
                throw("Could not create a WebGL buffer.");
            }

            let colorsVert: number[] = [];

            for (let j: number = 0; j < object.colors.length; ++j) {
                const c: number[] = object.colors[j];
                // repeat each color four times for the four vertices of the face
                colorsVert = colorsVert.concat(c, c, c, c);
            }

            this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(colorsVert), this.context.STATIC_DRAW);
        }

        if (object.textures) {
            textureCoordBuffer = this.context.createBuffer();

            if (textureCoordBuffer === null) {
                throw("Could not create a WebGL buffer.");
            }

            this.context.bindBuffer(this.context.ARRAY_BUFFER, textureCoordBuffer);

            this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(object.textures),
                this.context.STATIC_DRAW);
        }

        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), this.context.STATIC_DRAW);

        return {
            position: positionBuffer,
            color: colorBuffer,
            indecies: indexBuffer,
            textures: textureCoordBuffer
        };
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getCameraAngle(): number {
        return 0;
    }

    setCameraAngle(angle: number): number {
        return 0;
    }

    getWidth(): number {
        return this.canvas.width / this.options.resDecrease;
    }

    getHeight(): number {
        return this.canvas.height / this.options.resDecrease;
    }

    setFillStyle(color: string): void {
        throw("Refactor this.");
    }

    clearAll(): void {
        if(this.context) {
            this.context.clear(this.context.COLOR_BUFFER_BIT);
        }
    }

    async renderGlobals(): Promise<void> {
        if(!this.context) {
            return;
        }

        this.context.clearColor(0.0, 0.0, 0.0, 1.0);  // clear to black, fully opaque
        this.context.clearDepth(1.0);                 // clear everything
        this.context.enable(this.context.DEPTH_TEST); // enable depth testing
        this.context.depthFunc(this.context.LEQUAL);  // near things obscure far things

        this.context.clear(this.context.COLOR_BUFFER_BIT + this.context.DEPTH_BUFFER_BIT);

        this.fieldOfView = 45 * Math.PI / 180;   // in radians
        this.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.zNear = 0.1;
        this.zFar = 100.0;
        this.projectionMatrix = mat4.create();

        mat4.perspective(this.projectionMatrix,
                         this.fieldOfView,
                         this.aspect,
                         this.zNear,
                         this.zFar);

        this.modelViewMatrix = mat4.create();

        mat4.translate(this.modelViewMatrix,     // destination matrix
            this.modelViewMatrix,     // matrix to translate
            [-0.0, 0.0, -6.0]);  // amount to translate

        this.context.useProgram(this.programInfo.program);

        this.context.uniformMatrix4fv(
            this.programInfo.uniformLocations.projectionMatrix,
            false,
            this.projectionMatrix);
        this.context.uniformMatrix4fv(
            this.programInfo.uniformLocations.modelViewMatrix,
            false,
            this.modelViewMatrix);

        this.bindPositions(this.groundBuffers.position);

        if (this.groundBuffers.textures) {
            this.bindTexture(this.groundBuffers.textures);
        }

        this.bindIndeces(this.groundBuffers.indecies);

        // tell WebGL we want to affect texture unit 0
        this.context.activeTexture(this.context.TEXTURE0);

        // bind the texture to texture unit 0
        this.context.bindTexture(this.context.TEXTURE_2D, this.texture);

        // tell the shader we bound the texture to texture unit 0
        this.context.uniform1i(this.programInfo.uniformLocations.uSampler, 0);

        this.drawObject();
    }

    private drawObject(): void {
        const offset: number = 0;
        const vertexCount: number = 36;
        const type: number = this.context.UNSIGNED_SHORT;
        this.context.drawElements(this.context.TRIANGLES, vertexCount, type, offset);
    }

    private bindTexture(texture: WebGLBuffer): void {
        const numComponents: number = 2;
        const type: number = this.context.FLOAT;
        const normalize: boolean = false;
        const stride: number = 0;
        const offset: number = 0;
        this.context.bindBuffer(this.context.ARRAY_BUFFER, texture);
        this.context.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, numComponents, type, normalize, stride, offset);
        this.context.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);
    }

    private bindPositions(position: WebGLBuffer): void {
        const numComponents: number = 3;
        const type: number = this.context.FLOAT;
        const normalize: boolean = false;
        const stride: number = 0;
        const offset: number = 0;
        this.context.bindBuffer(this.context.ARRAY_BUFFER, position);
        this.context.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
        this.context.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }

    private bindIndeces(indeces: WebGLBuffer): void {
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, indeces);
    }

    async renderImage(
        image: any, spaceX: number, spaceY: number, spaceWidth: number, spaceHeight: number, options: DrawOptions): Promise<void> {
        // console.log("Not implemented");
    }

    async renderUnicodeAsset(
        asset: UnicodeAsset,
        spaceX: number,
        spaceY: number,
        width: number,
        height: number,
        fMiddleOfObject: number,
        fDistanceFromPlayer: number,
        fDepthBuffer: number[],
        shadeLevel: number): Promise<void> {
        // console.log("Not implemented");
    }

    renderRect(x: number, y: number, w: number, h: number): void {
        if (this.context) {
            // this.context.fillRect(x, y, w, h);
        }
    }

    async renderLine(coordinates: Point[], lineColor: string): Promise<void> {
        if (!this.context) {
            return;
        }

        // console.log("Not implemented");
    }

    startFrame(): void {
        // console.log("halp");
    }

    endFrame(): void {
        // console.log("Not implemented");
    }

    private loadTexture(url: string): WebGLTexture {
        const texture: WebGLTexture | null = this.context.createTexture();

        if (texture === null) {
            throw("Cannot create a texture.");
        }
        this.context.bindTexture(this.context.TEXTURE_2D, texture);

        // because images have to be download over the internet
        // they might take a moment until they are ready.
        // until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.`
        const level: number = 0;
        const internalFormat: number = this.context.RGBA;
        const width: number = 1;
        const height: number = 1;
        const border: number = 0;
        const srcFormat: number = this.context.RGBA;
        const srcType: number = this.context.UNSIGNED_BYTE;
        const pixel: Uint8Array = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        this.context.texImage2D(this.context.TEXTURE_2D, level, internalFormat,
                        width, height, border, srcFormat, srcType,
                        pixel);

        const image: any = new Image();
        image.onload = () => {
            this.context.bindTexture(this.context.TEXTURE_2D, texture);
            this.context.texImage2D(this.context.TEXTURE_2D, level, internalFormat,
                        srcFormat, srcType, image);

            // webGL1 has different requirements for power of 2 images
            // vs non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
                // yes, it's a power of 2. Generate mips.
                this.context.generateMipmap(this.context.TEXTURE_2D);
            } else {
                // no, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
                this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
                this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.LINEAR);
            }
        };
        image.src = url;

        return texture;
    }

    private isPowerOf2(value: number): boolean {
        // tslint:disable-next-line:no-bitwise
        return (value & (value - 1)) === 0;
    }
}