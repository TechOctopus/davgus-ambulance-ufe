import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientList } from '../davgus-patient-list';

describe('davgus-patient-list', () => {
  it('renders list shell', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientList],
      html: `<davgus-patient-list></davgus-patient-list>`,
    });

    await page.waitForChanges();

    const title = page.root.shadowRoot.querySelector('.section-title');
    expect(title).not.toBeNull();
  });
});
