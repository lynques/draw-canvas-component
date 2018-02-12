import { DrawCanvas } from './draw-canvas.component';

describe('DrawCanvas', () => {
  let component: DrawCanvas;
  
  beforeEach(() => {
    component = <DrawCanvas>document.createElement('draw-canvas');
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('attributeChangedCallback', () => {
    
  });
});
