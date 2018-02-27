import { DrawCanvas } from './draw-canvas.component';

export class DrawCanvasService {

  private canvas: HTMLCanvasElement;
  private ctx: any;
  private prevWidth: number = 0;
  private prevHeight: number = 0;
  private component: DrawCanvas;

  constructor(_component: DrawCanvas, _canvas: HTMLCanvasElement, _ctx: any) {
    this.component = _component;
    this.canvas = _canvas;
    this.ctx = _ctx;
    requestAnimationFrame(this.resize.bind(this));
  }

  public size(): void {
    this.prevWidth = this.component.clientWidth;
    this.prevHeight = this.component.clientHeight;
    this.canvas.width = this.prevWidth;
    this.canvas.height = this.prevHeight;
  }

  private resize(): void {
    if (this.prevWidth - this.component.clientWidth < 0 || this.prevHeight - this.component.clientHeight < 0) {
      let imageData: any;
      if (this.prevWidth > 0) {
        imageData = this.ctx.getImageData(0, 0, this.prevWidth, this.prevHeight);
      }
      this.size();
      if (imageData) {
        this.ctx.putImageData(imageData, 0, 0);
      }
    }
    requestAnimationFrame(this.resize.bind(this));
  }
}
