import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientDetail } from '../davgus-patient-detail';

describe('davgus-patient-detail', () => {
  it('renders graceful error state when backend is unavailable', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientDetail],
      html: `<davgus-patient-detail entry-id="p1"></davgus-patient-detail>`,
    });

    await page.waitForChanges();

    const errorCard = page.root.shadowRoot.querySelector('.error-card');
    expect(errorCard).not.toBeNull();
  });
});
