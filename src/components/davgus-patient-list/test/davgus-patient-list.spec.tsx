import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientList } from '../davgus-patient-list';
import { resetDummyData } from '../../../utils/dummy-data';

describe('davgus-patient-list', () => {
  beforeEach(() => {
    resetDummyData();
  });

  it('renders patient items', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientList],
      html: `<davgus-patient-list></davgus-patient-list>`,
    });

    const wlList = page.rootInstance as DavgusPatientList;
    const expectedPatients = wlList?.patients?.length;

    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('.patient-card');

    expect(expectedPatients).toBeGreaterThanOrEqual(1);
    expect(items.length).toEqual(expectedPatients);
  });
});