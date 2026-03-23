import { newSpecPage } from '@stencil/core/testing';
import { DavgusPlacementEditor } from '../davgus-placement-editor';

describe('davgus-placement-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusPlacementEditor],
      html: `<davgus-placement-editor></davgus-placement-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-placement-editor>
        <mock:shadow-root>
          <p>Placement Editor</p>
        </mock:shadow-root>
      </davgus-placement-editor>
    `);
  });
});
