import { expect, fixture, html } from '@open-wc/testing';

describe('my-test', () => {
  it('works', async () => {
    const el = await fixture(html` <draw-canvas></draw-canvas>`);

    expect(el).dom.to.equal('<draw-canvas></draw-canvas>');
  });
});
