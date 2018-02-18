import { DrawCanvasService } from "./draw-canvas.service";

export class DrawCanvas extends HTMLElement {

  private _wrapperSelector: string;
  private _height: number;
  private _width: number;
  private _strokeWeight: number;
  private _strokeColor: string;
  private canvas: HTMLCanvasElement;
  private ctx: any;
  private drawing: boolean;
  private service: DrawCanvasService;

  constructor() {
    super();
    this._height = null;
    this._width = null;
    this._strokeColor = '#000';
    this._strokeWeight = 1;
    this.canvas = null;
    this.ctx = null;
    this.drawing = false;
  }

  /* set attribute properties */
  set width(val: string) {
    this.setAttribute('width', val);
  }

  set height(val: string) {
    this.setAttribute('height', val);
  }

  set strokeColor(val: string) {
    this.setAttribute('stroke-color', val);
  }

  set strokeWeight(val: string) {
    this.setAttribute('stroke-weight', val);
  }

  set wrapperSelector(val: string) {
    this.setAttribute('wrapper-selector', val);
  }

  static get observedAttributes() {
    return ['height', 'width', 'stroke-color', 'stroke-weight', 'wrapper-selector'];
  }

  /* custom element lifecycle methods */
  public attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    switch (name) {
      case 'wrapper-selector':
        this._wrapperSelector = newVal;
        this.service = new DrawCanvasService(this._wrapperSelector, this.canvas, this.ctx);
        break;
      case 'width':
        this._width = parseInt(newVal, 10) || 0;
        if (this.canvas && !this._wrapperSelector) {
          this.canvas.width = this._width;
        }
        break;
      case 'height':
        this._height = parseInt(newVal, 10) || 0;
        if (this.canvas && !this._wrapperSelector) {
          this.canvas.height = this._height;
        }
        break;
      case 'stroke-color':
        this._strokeColor = newVal;
        break;
      case 'stroke-weight':
        const weight = parseInt(newVal, 10) || 1;
        this._strokeWeight = weight < 1 ? 1 : weight;
        break;
    }
  }

  public connectedCallback(): void {
    this.style.display = 'block';
    this.style.width = `${this._width}px`;
    this.style.height = `${this._height}px`;
    const canvasElement: HTMLCanvasElement = document.createElement('canvas');
    canvasElement.height = this._height;
    canvasElement.width = this._width;
    this.appendChild(canvasElement);
    this.init();
  }

  /**
   * Initialize canvas and 2d context
   */
  public init(): void {
    this.canvas = this.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseout', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
  }

  /**
   * Handle mousedown events on canvas element
   * @param {MouseEvent} e the mouse event object
   */
  public handleMouseDown(e: MouseEvent): void {
    const posX = e.offsetX;
    const posY = e.offsetY;
    this.drawing = true;
    this.ctx.strokeStyle = this._strokeColor;
    this.ctx.lineWidth = this._strokeWeight;
    this.ctx.beginPath();
    this.ctx.moveTo(posX, posY);
  }

  /**
   * Handle mousemove events on canvas element - does the drawing part
   * @param {MouseEvent} e the mouse event object
   */
  public handleMouseMove(e: MouseEvent): void {
    if (this.drawing) {
      const posX = e.offsetX;
      const posY = e.offsetY;
      this.ctx.lineTo(posX, posY);
      this.ctx.stroke();
    }
  }

  /**
   * Handle mouseup events on canvas element - stop drawing
   */
  public handleMouseUp(): void {
    this.drawing = false;
  }

  /**
   * Wipe the canvas
   */
  public clear(): void {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
