import { newE2EPage } from '@stencil/core/testing';

describe('davgus-department-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-department-editor></davgus-department-editor>');

    const element = await page.find('davgus-department-editor');
    expect(element).toHaveClass('hydrated');
  });
});
