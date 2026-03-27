import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientEditor } from '../davgus-patient-editor';
import { resetDummyData } from '../../../utils/dummy-data';

describe('davgus-patient-editor', () => {
  beforeEach(() => {
    resetDummyData();
  });

  it('buttons shall be of different type', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientEditor],
      html: `<davgus-patient-editor entry-id="p1"></davgus-patient-editor>`,
    });

    await page.waitForChanges();

    const items: any = await page.root.shadowRoot.querySelectorAll('md-filled-button');
    expect(items.length).toEqual(1);
  });

  it('first text field is patient name', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientEditor],
      html: `<davgus-patient-editor entry-id="p1"></davgus-patient-editor>`,
    });

    await page.waitForChanges();

    const items: any = await page.root.shadowRoot.querySelectorAll('md-filled-text-field');
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items[0].getAttribute('value')).toEqual('Ján Novák');
  });
});