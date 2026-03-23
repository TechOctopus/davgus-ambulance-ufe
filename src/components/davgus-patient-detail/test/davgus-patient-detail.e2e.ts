import { newE2EPage } from '@stencil/core/testing';

describe('davgus-patient-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-patient-detail></davgus-patient-detail>');

    const element = await page.find('davgus-patient-detail');
    expect(element).toHaveClass('hydrated');
  });
});
