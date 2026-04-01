import { newSpecPage } from '@stencil/core/testing';
import { DavgusDepartmentEditor } from '../davgus-department-editor';

describe('davgus-department-editor', () => {
  it('renders error state when backend is unavailable', async () => {
    const page = await newSpecPage({
      components: [DavgusDepartmentEditor],
      html: `<davgus-department-editor entry-id="d1"></davgus-department-editor>`,
    });

    await page.waitForChanges();

    const errorCard = page.root.shadowRoot.querySelector('.error-card');
    expect(errorCard).not.toBeNull();
  });
});
