import { newSpecPage } from '@stencil/core/testing';
import { DavgusPlacementEditor } from '../davgus-placement-editor';

describe('davgus-placement-editor', () => {
  it('renders error state when backend is unavailable', async () => {
    const page = await newSpecPage({
      components: [DavgusPlacementEditor],
      html: `<davgus-placement-editor entry-id="pl1"></davgus-placement-editor>`,
    });

    await page.waitForChanges();

    const errorCard = page.root.shadowRoot.querySelector('.error-card');
    expect(errorCard).not.toBeNull();
  });
});
