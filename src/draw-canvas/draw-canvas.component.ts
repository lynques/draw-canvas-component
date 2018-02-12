export class DrawCanvas extends HTMLElement {
  
  private _height: number;
  private _width: number;
  private canvas: HTMLCanvasElement;
  private ctx: any;
  private drawing: boolean;

  constructor() {
    super();
    this._height = null;
    this._width = null;
    this.canvas = null;
    this.ctx = null;
    this.drawing = false;
  }

  set width(val: string) {
    this.setAttribute('width', val);
  }

  set height(val: string) {
    this.setAttribute('height', val);
  }

  static get observedAttributes() {
    return ['dynamic', 'width', 'height'];
  }

  private attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    switch(name) {
      case 'width':
        this._width = parseInt(newVal, 10) || 0;
        if (this.canvas) {
          this.canvas.width = this._width;
        }
        break;
      case 'height':
        this._height = parseInt(newVal, 10) || 0;
        if (this.canvas) {
          this.canvas.height = this._height;
        }
        break;
    }
  }

  private connectedCallback(): void {
    this.style.display = 'block';
    this.style.width = `${this._width}px`;
    this.style.height = `${this._height}px`;
    const canvasElement: HTMLCanvasElement = document.createElement('canvas');
    canvasElement.height = this._height;
    canvasElement.width = this._width;
    this.appendChild(canvasElement);
    this.init();
  }

  // disconnectedCallback(): void {
  // }

  private init(): void {
    this.canvas = this.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseout', this.mouseUp.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUp.bind(this));
  }

  private handleMouseDown(e: MouseEvent): void {
    const posX = e.offsetX;
    const posY = e.offsetY;
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(posX, posY);
  }

  private handleMouseMove(e: MouseEvent): void {
    if (this.drawing) {
      const posX = e.offsetX;
      const posY = e.offsetY;
      this.ctx.lineTo(posX, posY);
      this.ctx.stroke();
    }
  }

  private mouseUp(): void {
    this.drawing = false;
  }
}
