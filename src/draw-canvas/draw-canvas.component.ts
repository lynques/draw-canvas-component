import { DrawCanvasService } from './draw-canvas.service';

export class DrawCanvas extends HTMLElement {

  private service: DrawCanvasService = new DrawCanvasService();

  /**
   * Setter for stroke color attribute
   */
  set strokeColor(val: string) {
    this.setAttribute('stroke-color', val);
  }

  /**
   * Setter for stroke weight attribute
   */
  set strokeWeight(val: string) {
    this.setAttribute('stroke-weight', val);
  }

  /**
   * List of attributes that are changeable on this component
   * @returns the observed attributes as a list of strings
   */
  static get observedAttributes(): string[] {
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
      case 'stroke-color': {
        this.service.updateStrokeColor(newVal);
        break;
      }
      case 'stroke-weight': {
        this.service.updateStrokeWeight(newVal);
        break;
      }
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

    const canvas = document.createElement('canvas');
    shadow.appendChild(canvas);

    this.service.init(this, canvas);
  }

  /**
   * Exposes canvas clearing functionality as public method on the component
   */
  public clear(): void {
    this.service.clear();
  }
}
