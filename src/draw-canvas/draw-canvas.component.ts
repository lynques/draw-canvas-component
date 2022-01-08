import { DrawCanvasService } from './draw-canvas.service';

export class DrawCanvas extends HTMLElement {

  private _strokeWeight: number;
  private _strokeColor: string;

  private drawing: boolean;
  private canvas?: HTMLCanvasElement;
  private ctx?: any;
  private service?: DrawCanvasService;

  constructor() {
    super();
    this._strokeColor = '#000';
    this._strokeWeight = 1;
    this.drawing = false;
    this.canvas = undefined;
    this.ctx = undefined;
    this.service = undefined;
  }

  /* set attribute values */
  set strokeColor(val: string) {
    this.setAttribute('stroke-color', val);
  }

  set strokeWeight(val: string) {
    this.setAttribute('stroke-weight', val);
  }

  static get observedAttributes() {
    return ['stroke-color', 'stroke-weight'];
  }

  /**
   * Custom element lifecycle method for changed attribute
   * @param name changed attribute name
   * @param oldVal original value
   * @param newVal changed value
   */
  public attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    switch (name) {
      case 'stroke-color':
        this._strokeColor = newVal;
        break;
      case 'stroke-weight':
        const weight = parseInt(newVal, 10) || 1;
        this._strokeWeight = weight < 1 ? 1 : weight;
        break;
    }
  }

  /**
   * Custom element lifecycle method for when element is inserted into DOM
   */
  public connectedCallback(): void {
    const style = document.createElement('style');
    const shadow = this.attachShadow({ mode: 'open' });
    style.textContent = 'draw-canvas { display: block; overflow: hidden; }';
    this.appendChild(style);
    this.canvas = document.createElement('canvas');
    shadow.appendChild(this.canvas);
    this.init();
  }

  /**
   * Initialize canvas and 2d context
   */
  public init(): void {
    if (!this.canvas) {
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseout', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.width = this.clientWidth;
    this.canvas.height = this.clientHeight;
    this.service = new DrawCanvasService(this, this.canvas, this.ctx);
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
    if (!this.ctx || !this.canvas) {
      return;
    }
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.service) {
      this.service.size();
    }
  }
}
