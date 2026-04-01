import { newSpecPage } from '@stencil/core/testing';
import { DavgusPlacementList } from '../davgus-placement-list';

describe('davgus-placement-list', () => {
  it('renders list shell', async () => {
    const page = await newSpecPage({
      components: [DavgusPlacementList],
      html: `<davgus-placement-list></davgus-placement-list>`,
    });

    await page.waitForChanges();

    const title = page.root.shadowRoot.querySelector('.section-title');
    expect(title).not.toBeNull();
  });
});
