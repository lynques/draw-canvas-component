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
   * Setter for fill color attribute
   */
  set fillColor(val: string) {
    this.setAttribute('fill-color', val);
  }

  /**
   * Setter for is filling attribute
   */
  set isFilling(val: boolean) {
    this.setAttribute('is-filling', val?'true':'false');
  }

  /**
   * Getter for is filling attribute
   */
  get isFilling() {
    return this.getAttribute('is-filling')=='true';
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
    return ['stroke-color', 'fill-color', 'stroke-weight', 'is-filling'];
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
      case 'fill-color': {
        this.service.updateFillColor(newVal);
        break;
      }
      case 'stroke-weight': {
        this.service.updateStrokeWeight(newVal);
        break;
      }
      case 'is-filling': {
        this.service.updateFillingStatus(newVal);
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
