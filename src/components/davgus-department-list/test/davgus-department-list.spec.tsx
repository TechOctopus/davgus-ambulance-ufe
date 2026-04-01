import { newSpecPage } from '@stencil/core/testing';
import { DavgusDepartmentList } from '../davgus-department-list';

describe('davgus-department-list', () => {
  it('renders list shell', async () => {
    const page = await newSpecPage({
      components: [DavgusDepartmentList],
      html: `<davgus-department-list></davgus-department-list>`,
    });

    await page.waitForChanges();

    const title = page.root.shadowRoot.querySelector('.section-title');
    expect(title).not.toBeNull();
  });
});
