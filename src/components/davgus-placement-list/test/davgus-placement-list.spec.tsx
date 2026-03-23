import { newSpecPage } from '@stencil/core/testing';
import { DavgusPlacementList } from '../davgus-placement-list';

describe('davgus-placement-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusPlacementList],
      html: `<davgus-placement-list></davgus-placement-list>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-placement-list>
        <mock:shadow-root>
          <p>Placement List</p>
        </mock:shadow-root>
      </davgus-placement-list>
    `);
  });
});
