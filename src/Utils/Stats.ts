/**
 * @author mrdoob / http://mrdoob.com/
 */

export class Stats {
	container: HTMLElement;
	mode: number;
	revision: number = 16;
	beginTime: number;
	frames: number;
	fpsPanel: Panel;
	msPanel: Panel;
	memPanel: Panel;
	prevTime: number;

	constructor() {
		this.mode = 0;

		this.container = document.createElement("div");
		this.container.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
		this.container.addEventListener("click", (event: Event) =>  {
			event.preventDefault();
			this.showPanel(++this.mode % this.container.children.length);
		}, false );

		this.beginTime = ( performance || Date ).now();
		this.prevTime = this.beginTime;
		this.frames = 0;

		this.fpsPanel = this.addPanel( new Panel( "FPS", "#0ff", "#002" ) );
		this.msPanel = this.addPanel( new Panel( "MS", "#0f0", "#020" ) );

		this.showPanel(0);
	}

	addPanel(panel: Panel): Panel {
		this.container.appendChild( panel.canvas );

		return panel;
	}

	showPanel(id: number): void {
		for (var i:number = 0; i < this.container.children.length; i ++ ) {
			var element: HTMLElement = <HTMLElement>this.container.children[i];
			element.style.display = i === id ? "block" : "none";
		}

		this.mode = id;
	}

	begin(): void {

		this.beginTime = ( performance || Date ).now();

	}

	end(): number {

		this.frames++;

		var time: number = ( performance || Date ).now();

		this.msPanel.update( time - this.beginTime, 200 );

		if ( time >= this.prevTime + 1000 ) {

			this.fpsPanel.update( ( this.frames * 1000 ) / ( time - this.prevTime ), 100 );

			this.prevTime = time;
			this.frames = 0;

		}

		return time;

	}

	update(): void {

		this.beginTime = this.end();

	}
}

class Panel {
	min: number;
	max: number;
	context: CanvasRenderingContext2D | null;
	bg: string;
	fg: string;
	WIDTH: number;
	HEIGHT: number;
	TEXT_X: number;
	TEXT_Y: number;
	GRAPH_X: number;
	GRAPH_Y: number;
	GRAPH_WIDTH: number;
	GRAPH_HEIGHT: number;
	canvas: HTMLCanvasElement;
	PR: number;
	name: string;

	constructor(name: string, fg: string, bg: string) {
		this.min = Infinity;
		this.max = 0;
		this.fg = fg;
		this.bg = bg;
		this.name = name;

		this.PR = Math.round( window.devicePixelRatio || 1 );

		this.WIDTH = 80 * this.PR;
		this.HEIGHT = 48 * this.PR;
		this.TEXT_X = 3 * this.PR;
		this.TEXT_Y = 2 * this.PR;
		this.GRAPH_X = 3 * this.PR;
		this.GRAPH_Y = 15 * this.PR;
		this.GRAPH_WIDTH = 74 * this.PR;
		this.GRAPH_HEIGHT = 30 * this.PR;

		this.canvas = document.createElement( "canvas" );
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.canvas.style.cssText = "width:80px;height:48px";

		this.context = this.canvas.getContext( "2d" );

		if (this.context !== null) {
			this.context.font = "bold " + ( 9 * this.PR ) + "px Helvetica,Arial,sans-serif";
			this.context.textBaseline = "top";

			this.context.fillStyle = bg;
			this.context.fillRect( 0, 0, this.WIDTH, this.HEIGHT );

			this.context.fillStyle = fg;
			this.context.fillText( name, this.TEXT_X, this.TEXT_Y );
			this.context.fillRect( this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT );

			this.context.fillStyle = bg;
			this.context.globalAlpha = 0.9;
			this.context.fillRect( this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT );
		}
	}

	update (value: number, maxValue: number): void {
		if (this.context === null) {
			return;
		}

		this.min = Math.min(this.min, value );
		this.max = Math.max(this.max, value );

		this.context.fillStyle = this.bg;
		this.context.globalAlpha = 1;
		this.context.fillRect( 0, 0, this.WIDTH, this.GRAPH_Y );
		this.context.fillStyle = this.fg;
		this.context.fillText(
			Math.round( value ) + " " + this.name + " (" + Math.round( this.min ) + "-" + Math.round( this.max ) + ")", this.TEXT_X, this.TEXT_Y );

		this.context.drawImage(
			this.canvas, this.GRAPH_X + this.PR, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT,
			this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH - this.PR, this.GRAPH_HEIGHT );

		this.context.fillRect( this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, this.GRAPH_HEIGHT );

		this.context.fillStyle = this.bg;
		this.context.globalAlpha = 0.9;
		this.context.fillRect(
			this.GRAPH_X + this.GRAPH_WIDTH - this.PR, this.GRAPH_Y, this.PR, Math.round( ( 1 - ( value / maxValue ) ) * this.GRAPH_HEIGHT ) );

	}
}