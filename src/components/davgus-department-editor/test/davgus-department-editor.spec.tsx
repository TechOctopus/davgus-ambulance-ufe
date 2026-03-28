import { newSpecPage } from '@stencil/core/testing';
import { DavgusDepartmentEditor } from '../davgus-department-editor';
import { resetDummyData } from '../../../utils/dummy-data';

describe('davgus-department-editor', () => {
  beforeEach(() => {
    resetDummyData();
  });

  it('renders department rooms', async () => {
    const page = await newSpecPage({
      components: [DavgusDepartmentEditor],
      html: `<davgus-department-editor entry-id="d1"></davgus-department-editor>`,
    });

    await page.waitForChanges();

    const fields = page.root.shadowRoot.querySelectorAll('md-filled-text-field');
    expect(fields.length).toBeGreaterThanOrEqual(1);
  });

  it('has save and cancel buttons', async () => {
    const page = await newSpecPage({
      components: [DavgusDepartmentEditor],
      html: `<davgus-department-editor entry-id="d1"></davgus-department-editor>`,
    });

    await page.waitForChanges();

    const saveBtn = page.root.shadowRoot.querySelectorAll('md-filled-button');
    expect(saveBtn.length).toEqual(1);
  });
});
