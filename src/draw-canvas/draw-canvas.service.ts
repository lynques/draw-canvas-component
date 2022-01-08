import { DrawCanvas } from './draw-canvas.component';

export class DrawCanvasService {

  private canvas: HTMLCanvasElement;
  private prevWidth = 0;
  private prevHeight = 0;
  private component: DrawCanvas;
  private ctx?: CanvasRenderingContext2D;

  constructor(
    _component: DrawCanvas,
    _canvas: HTMLCanvasElement,
    _ctx?: CanvasRenderingContext2D
  ) {
    this.component = _component;
    this.canvas = _canvas;
    this.ctx = _ctx;
    requestAnimationFrame(this.resize.bind(this));
  }

  /**
   * Set canvas size based on component size
   */
  public size(): void {
    this.prevWidth = this.component.clientWidth;
    this.prevHeight = this.component.clientHeight;
    this.canvas.width = this.prevWidth;
    this.canvas.height = this.prevHeight;
  }

  /**
   * Resize method used to save image data and repaint after resizing
   * the canvas. Needed since changing size of a canvas will clear it out
   */
  private resize(): void {
    if (this.prevWidth - this.component.clientWidth < 0 || this.prevHeight - this.component.clientHeight < 0) {
      let imageData: ImageData | undefined = undefined;
      if (this.prevWidth > 0) {
        imageData = this.ctx?.getImageData(0, 0, this.prevWidth, this.prevHeight);
      }
      this.size();
      if (imageData) {
        this.ctx?.putImageData(imageData, 0, 0);
      }
    }
    requestAnimationFrame(this.resize.bind(this));
  }
}
