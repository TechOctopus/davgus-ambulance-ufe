import { newE2EPage } from '@stencil/core/testing';

describe('davgus-placement-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-placement-editor></davgus-placement-editor>');

    const element = await page.find('davgus-placement-editor');
    expect(element).toHaveClass('hydrated');
  });
});
