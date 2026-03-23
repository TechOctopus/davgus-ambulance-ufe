import { newE2EPage } from '@stencil/core/testing';

describe('davgus-patient-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-patient-list></davgus-patient-list>');

    const element = await page.find('davgus-patient-list');
    expect(element).toHaveClass('hydrated');
  });
});
