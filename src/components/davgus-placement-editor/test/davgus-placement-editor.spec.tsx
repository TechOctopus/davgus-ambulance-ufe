import { newSpecPage } from '@stencil/core/testing';
import { DavgusPlacementEditor } from '../davgus-placement-editor';
import { resetDummyData } from '../../../utils/dummy-data';

describe('davgus-placement-editor', () => {
  beforeEach(() => {
    resetDummyData();
  });

  it('renders form for existing placement', async () => {
    const page = await newSpecPage({
      components: [DavgusPlacementEditor],
      html: `<davgus-placement-editor entry-id="pl1"></davgus-placement-editor>`,
    });

    await page.waitForChanges();

    const selects = page.root.shadowRoot.querySelectorAll('md-filled-select');
    expect(selects.length).toBeGreaterThanOrEqual(1);
  });

  it('has save button', async () => {
    const page = await newSpecPage({
      components: [DavgusPlacementEditor],
      html: `<davgus-placement-editor entry-id="pl1"></davgus-placement-editor>`,
    });

    await page.waitForChanges();

    const saveBtn = page.root.shadowRoot.querySelectorAll('md-filled-button');
    expect(saveBtn.length).toEqual(1);
  });
});
