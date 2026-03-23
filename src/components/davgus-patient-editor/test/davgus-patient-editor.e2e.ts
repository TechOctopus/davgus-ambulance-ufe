import { newE2EPage } from '@stencil/core/testing';

describe('davgus-patient-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-patient-editor></davgus-patient-editor>');

    const element = await page.find('davgus-patient-editor');
    expect(element).toHaveClass('hydrated');
  });
});
