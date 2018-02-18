export class DrawCanvasService {

  private canvas: HTMLCanvasElement;
  private ctx: any;
  private prevWrapperWidth: number = 0;
  private prevWrapperHeight: number = 0;
  private wrapper: HTMLElement;

  constructor(_wrapperSelector: string, _canvas: HTMLCanvasElement, _ctx: any) {
    this.wrapper = document.querySelector(_wrapperSelector);
    this.canvas = _canvas;
    this.ctx = _ctx;
    requestAnimationFrame(this.resize.bind(this));
  }

  resize(): void {
    const wrapperWidth = this.wrapper.clientWidth;
    const wrapperHeight = this.wrapper.clientHeight;
    if (wrapperWidth && wrapperHeight &&
      (this.prevWrapperWidth - wrapperWidth < 0 || this.prevWrapperHeight - wrapperHeight < 0)) {
      let imageData: any;
      if (this.canvas.width && this.canvas.height) {
        imageData = this.ctx.getImageData(0, 0, this.prevWrapperWidth, this.prevWrapperHeight);
      }
      this.prevWrapperWidth = wrapperWidth;
      this.prevWrapperHeight = wrapperHeight;
      this.canvas.width = wrapperWidth;
      this.canvas.height = wrapperHeight;
      if (imageData) {
        this.ctx.putImageData(imageData, 0, 0);
      }
    }
    requestAnimationFrame(this.resize.bind(this));
  }
}
