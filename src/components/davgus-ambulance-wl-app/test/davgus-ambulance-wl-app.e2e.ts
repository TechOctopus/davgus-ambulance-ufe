import { newE2EPage } from '@stencil/core/testing';

describe('davgus-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<davgus-ambulance-wl-app></davgus-ambulance-wl-app>');

    const element = await page.find('davgus-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
