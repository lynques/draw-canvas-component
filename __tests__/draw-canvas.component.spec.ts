import { DrawCanvas } from '../src/draw-canvas/draw-canvas.component';

/**
 * DrawCanvas component tests
 */
describe('DrawCanvas', () => {
  beforeAll(() => {
    customElements.define('draw-canvas', DrawCanvas);
    jest.useFakeTimers();
  });

  it('should set styles and attach canvas element', () => {
    document.body.innerHTML = '<draw-canvas></draw-canvas>';
    const drawCanvas = document.querySelector('draw-canvas') as DrawCanvas;

    setTimeout(() => {
      expect(drawCanvas.getAttribute('stroke-color')).toEqual('#000');
      // expect(drawCanvas.style.display).toEqual('inline');
      // expect(drawCanvas.style.overflow).toEqual('hidden');
      // expect(drawCanvas.querySelector('canvas')).toBeTruthy();
    });

    jest.runAllTimers();
  });

  // it('should construct the component with default values', () => {
  //   document.body.innerHTML = '<draw-canvas></draw-canvas>';
  //   const drawCanvas = document.querySelector('draw-canvas');

  //   setTimeout(() => {
  //     expect(drawCanvas).toBeTruthy();
  //     expect(drawCanvas?.getAttribute('stroke-color')).toEqual('#010');
  //     expect(drawCanvas?.getAttribute('stroke-weight')).toEqual(1);
  //   });
  // });

  // describe('stroke-color attribute', () => {
  //   it('should set attribute to provided value', () => {
  //     document.body.innerHTML = '<draw-canvas></draw-canvas>';
  //     const drawCanvas = document.querySelector('draw-canvas');

  //     setTimeout(() => {
  //       drawCanvas?.setAttribute('stroke-color', '#123');

  //       expect(drawCanvas).toBeTruthy();
  //       expect(drawCanvas?.getAttribute('stroke-color')).toEqual('#123');
  //     });
  //   });

  //   it('should take stroke-color as initial value', () => {
  //     document.body.innerHTML = '<draw-canvas stroke-color="#555"></draw-canvas>';
  //     const drawCanvas = document.querySelector('draw-canvas');
  //     setTimeout(() => {
  //       expect(drawCanvas?.getAttribute('stroke-color')).toEqual('#555');
  //     });
  //   });
  // });

  // describe('stroke-weight attribute', () => {
  //   it('should set attribute to provided value', () => {
  //     document.body.innerHTML = '<draw-canvas></draw-canvas>';
  //     const drawCanvas = document.querySelector('draw-canvas');

  //     setTimeout(() => {
  //       drawCanvas?.setAttribute('stroke-weight', '2');

  //       expect(drawCanvas).toBeTruthy();
  //       expect(drawCanvas?.getAttribute('stroke-weight')).toEqual('2');
  //     });
  //   });

  //   it('should take stroke-color as initial value', () => {
  //     document.body.innerHTML = '<draw-canvas stroke-weight="3"></draw-canvas>';
  //     const drawCanvas = document.querySelector('draw-canvas');
  //     setTimeout(() => {
  //       expect(drawCanvas?.getAttribute('stroke-weight')).toEqual('3');
  //     });
  //   });

  //   it('should default the stroke-weight to 1 if value is un-parsable', () => {
  //     document.body.innerHTML = '<draw-canvas></draw-canvas>';
  //     const drawCanvas = document.querySelector('draw-canvas');

  //     setTimeout(() => {
  //       drawCanvas?.setAttribute('stroke-weight', '#246');

  //       expect(drawCanvas).toBeTruthy();
  //       expect(drawCanvas?.getAttribute('stroke-weight')).toEqual('1');
  //     });
  //   });

  //   it('should default the stroke-weight to 1 if negative value', () => {
  //     document.body.innerHTML = '<draw-canvas></draw-canvas>';
  //     const drawCanvas = document.querySelector('draw-canvas');

  //     setTimeout(() => {
  //       drawCanvas?.setAttribute('stroke-weight', '-8');

  //       expect(drawCanvas).toBeTruthy();
  //       expect(drawCanvas?.getAttribute('stroke-weight')).toEqual('1');
  //     });
  //   });
  // });
});
