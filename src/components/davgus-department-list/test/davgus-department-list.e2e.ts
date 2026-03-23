import { newE2EPage } from '@stencil/core/testing';

describe('davgus-department-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-department-list></davgus-department-list>');

    const element = await page.find('davgus-department-list');
    expect(element).toHaveClass('hydrated');
  });
});
