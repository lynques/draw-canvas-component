import { DrawCanvas } from './draw-canvas.component';

export class DrawCanvasService {

  private drawing = false;
  private prevWidth = 0;
  private prevHeight = 0;
  private strokeColor: string = '#000';
  private strokeWeight: number = 1;

  private component: DrawCanvas;
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;

  constructor(
    _component: DrawCanvas,
    _canvas?: HTMLCanvasElement,
  ) {
    this.component = _component;
    this.canvas = _canvas;
    this.ctx = this.canvas?.getContext('2d') || undefined;

    requestAnimationFrame(this.resize);
  }

  /**
   * Respond stroke color attribute updates
   * @param color The color set for attribute value
   */
  public updateStrokeColor(color: string): void {
    this.strokeColor = color;
  }

  /**
   * Respond to stroke weight attribute updates
   * @param weight The weight set for attribute value
   */
  public updateStrokeWeight(weight: string): void {
    const strokeWeightInt = parseInt(weight, 10) || 1;
    this.strokeWeight = strokeWeightInt < 1 ? 1 : strokeWeightInt;
  }

  /**
   * Determine if the component has resized
   * @returns true if the component has resized since last animation frame
   */
  hasComponentChangedSize(): boolean {
    return (
      this.prevWidth - this.component.clientWidth < 0 ||
      this.prevHeight - this.component.clientHeight < 0
    );
  }

  /**
   * Set canvas size based on component size
   */
  public size(): void {
    if (!this.canvas) {
      return;
    }
    this.prevWidth = this.component.clientWidth;
    this.prevHeight = this.component.clientHeight;
    this.canvas.width = this.prevWidth;
    this.canvas.height = this.prevHeight;
  }

  /**
   * Resize method used to save image data and repaint after resizing
   * the canvas. Needed since changing size of a canvas will clear it out
   */
  private resize = (): void => {
    if (this.hasComponentChangedSize()) {
      let imageData: ImageData | undefined = undefined;
      if (this.prevWidth > 0) {
        imageData = this.ctx?.getImageData(0, 0, this.prevWidth, this.prevHeight);
      }
      this.size();
      if (imageData) {
        this.ctx?.putImageData(imageData, 0, 0);
      }
    }
    requestAnimationFrame(this.resize);
  }


  /**
   * Handle mousedown events on canvas element
   * @param {MouseEvent} e the mouse event object
   */
  public handleMouseDown = (e: MouseEvent): void => {
    if (!this.ctx) {
      return;
    }
    const posX = e.offsetX;
    const posY = e.offsetY;
    this.drawing = true;
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineWidth = this.strokeWeight;
    this.ctx.beginPath();
    this.ctx.moveTo(posX, posY);
  }

  /**
   * Handle mousemove events on canvas element - does the drawing part
   * @param {MouseEvent} e the mouse event object
   */
  public handleMouseMove = (e: MouseEvent): void => {
    if (!this.ctx) {
      return;
    }
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
  public handleMouseUp = (): void => {
    this.drawing = false;
  }

  /**
 * Clear the canvas by filling with background color
 */
  public clear(): void {
    if (!this.ctx || !this.canvas) {
      return;
    }
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.size();
  }
}
