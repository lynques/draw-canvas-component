import { DrawCanvas } from './draw-canvas.component';

export class DrawCanvasService {
  private drawing = false;
  private filling = false;
  private prevHeight = 0;
  private prevWidth = 0;
  private strokeColor = '#000';
  private fillColor = '#000';
  private strokeWeight = 1;

  private component?: DrawCanvas;
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;

  init(_component: DrawCanvas, _canvas: HTMLCanvasElement): void {
    this.component = _component;
    this.canvas = _canvas;
    this.ctx = this.canvas?.getContext('2d') || undefined;

    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseout', this.handleMouseUp);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.width = this.component.clientWidth;
    this.canvas.height = this.component.clientHeight;

    requestAnimationFrame(this.handleResize);
  }

  /**
   * Respond stroke color attribute updates
   * @param color The color set for attribute value
   */
  public updateStrokeColor(color: string): void {
    this.strokeColor = color;
  }

  /**
   * Respond fill color attribute updates
   * @param color The color set for attribute value
   */
  public updateFillColor(color: string): void {
    this.fillColor = color;
  }

  /**
   * Respond is filling attribute updates
   * @param boolean event object
   * @returns void
   */
  public updateFillingStatus = (boolean: string): void => {
    this.filling = boolean.toLowerCase() == 'true';
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
    if (!this.component) {
      return false;
    }
    return (
      this.prevWidth - this.component.clientWidth < 0 ||
      this.prevHeight - this.component.clientHeight < 0
    );
  }

  /**
   * Set canvas size based on component size
   */
  public size(): void {
    if (!this.canvas || !this.component) {
      return;
    }
    this.prevWidth = this.component.clientWidth || this.prevWidth;
    this.prevHeight = this.component.clientHeight || this.prevHeight;
    this.canvas.width = this.prevWidth;
    this.canvas.height = this.prevHeight;
  }

  /**
   * Save image data and repaint after resizing the canvas
   * Needed since changing size of a canvas will clear it out
   */
  private handleResize = (): void => {
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
    requestAnimationFrame(this.handleResize);
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
    if (this.filling) {
      this.handleFill({ x: posX, y: posY })
    } else {
      this.drawing = true;
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineWidth = this.strokeWeight;
      this.ctx.beginPath();
      this.ctx.moveTo(posX, posY);
    }
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
 * Clear the canvas by filling with transparent color
 */
  public clear(): void {
    if (!this.ctx || !this.canvas) {
      return;
    }
    this.ctx.fillStyle = '#00000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.size();
  }

  private handleFill(point: Point) {
    var colorLayer = this.ctx!.getImageData(0, 0, this.canvas!.width, this.canvas!.height);
    const selectedPixel = this.ctx!.getImageData(point.x, point.y, 1, 1).data;
    const selectedColor = { r: selectedPixel[0], g: selectedPixel[1], b: selectedPixel[2], a: selectedPixel[3] };
    const pixelStack = [point];

    while (pixelStack.length) {
      var newPos, x, y, pixelPos, reachLeft, reachRight;
      newPos = pixelStack.pop();
      x = newPos!.x;
      y = newPos!.y;

      pixelPos = (y * this.canvas!.width + x) * 4;
      while (y-- >= 0 && matchStartColor(pixelPos, selectedColor)) {
        pixelPos -= this.canvas!.width * 4;
      }
      pixelPos += this.canvas!.width * 4;
      ++y;
      reachLeft = false;
      reachRight = false;
      while (y++ < this.canvas!.height - 1 && matchStartColor(pixelPos, selectedColor)) {
        colorPixel(pixelPos, this.fillColor);

        if (x > 0) {
          if (matchStartColor(pixelPos - 4, selectedColor)) {
            if (!reachLeft) {
              pixelStack.push({ x: x - 1, y: y });
              reachLeft = true;
            }
          }
          else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < this.canvas!.width - 1) {
          if (matchStartColor(pixelPos + 4, selectedColor)) {
            if (!reachRight) {
              pixelStack.push({ x: x + 1, y: y });
              reachRight = true;
            }
          }
          else if (reachRight) {
            reachRight = false;
          }
        }
        pixelPos += this.canvas!.width * 4;
      }
    }
    this.ctx!.putImageData(colorLayer, 0, 0);

    function matchStartColor(pixelPos: number, startColor: IRGBA) {
      var r = colorLayer.data[pixelPos];
      var g = colorLayer.data[pixelPos + 1];
      var b = colorLayer.data[pixelPos + 2];
      var a = colorLayer.data[pixelPos + 3]
      return (r == startColor.r && g == startColor.g && b == startColor.b && a == startColor.a);
    }

    function colorPixel(pixelPos: number, color: string) {
      const rgba = ParseRgbA(color);
      colorLayer.data[pixelPos] = rgba.r;
      colorLayer.data[pixelPos + 1] = rgba.g;
      colorLayer.data[pixelPos + 2] = rgba.b;
      colorLayer.data[pixelPos + 3] = rgba.a;
    }

    function ParseRgbA(color: string): IRGBA {
      var c;
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
        c = color.substring(1).split('');
        if (c.length == 3) {
          c.splice(0, 0, c[0]);
          c.splice(2, 0, c[2]);
          c.splice(4, 0, c[4]);
        }
        var rgb: IRGBA = {
          r: Number('0x' + c[0] + c[1]),
          g: Number('0x' + c[2] + c[3]),
          b: Number('0x' + c[4] + c[5]),
          a: 255
        };
        if (c.length == 8) {
          rgb.a = Number('0x' + c[6] + c[7]);
        }
        return rgb;
      } else if (/^rgb\((\d+).*?(\d+).*?(\d+)\)$/.test(color)) {
        const obj = /^rgb\((\d+).*?(\d+).*?(\d+)\)$/.exec("rgb(0, 255, 0)");
        if (obj != null) {
          var rgb: IRGBA = {
            r: Number(obj![1]),
            g: Number(obj![2]),
            b: Number(obj![3]),
            a: 255
          };
          return rgb;
        }
      }
      throw new Error('Bad Color Value');
    }
  }
}

interface IRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

class Point {
  public x: number = 0;
  public y: number = 0;
}
