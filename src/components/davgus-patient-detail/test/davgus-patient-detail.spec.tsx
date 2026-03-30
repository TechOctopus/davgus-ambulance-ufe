import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientDetail } from '../davgus-patient-detail';
import { resetDummyData } from '../../../utils/dummy-data';

describe('davgus-patient-detail', () => {
  beforeEach(() => {
    resetDummyData();
  });

  it('renders patient info', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientDetail],
      html: `<davgus-patient-detail entry-id="p1"></davgus-patient-detail>`,
    });

    await page.waitForChanges();

    const name = page.root.shadowRoot.querySelector('.patient-name');
    expect(name).not.toBeNull();
    expect(name.textContent).toContain('Ján Novák');
  });

  it('shows placement info for placed patient', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientDetail],
      html: `<davgus-patient-detail entry-id="p1"></davgus-patient-detail>`,
    });

    await page.waitForChanges();

    const placementCard = page.root.shadowRoot.querySelector('.info-card.placement-active');
    expect(placementCard).not.toBeNull();
  });

  it('shows no placement message for unplaced patient', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientDetail],
      html: `<davgus-patient-detail entry-id="p3"></davgus-patient-detail>`,
    });

    await page.waitForChanges();

    const placementCard = page.root.shadowRoot.querySelector('.info-card.placement-active');
    expect(placementCard).toBeNull();

    const emptyPlacement = page.root.shadowRoot.querySelector('.empty-placement');
    expect(emptyPlacement).not.toBeNull();
  });
});
