import { DrawCanvas } from './draw-canvas.component';

describe('DrawCanvas', () => {
  let component: DrawCanvas;

  beforeEach(() => {
    component = document.createElement('draw-canvas') as DrawCanvas;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
