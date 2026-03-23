import { newE2EPage } from '@stencil/core/testing';

describe('davgus-placement-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-placement-list></davgus-placement-list>');

    const element = await page.find('davgus-placement-list');
    expect(element).toHaveClass('hydrated');
  });
});
