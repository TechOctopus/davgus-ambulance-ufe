import { newSpecPage } from '@stencil/core/testing';
import { DavgusPlacementList } from '../davgus-placement-list';
import { resetDummyData } from '../../../utils/dummy-data';

describe('davgus-placement-list', () => {
  beforeEach(() => {
    resetDummyData();
  });

  it('renders placement items', async () => {
    const page = await newSpecPage({
      components: [DavgusPlacementList],
      html: `<davgus-placement-list></davgus-placement-list>`,
    });

    const list = page.rootInstance as DavgusPlacementList;
    const expectedPlacements = list?.placements?.length;

    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('.placement-card');

    expect(expectedPlacements).toBeGreaterThanOrEqual(1);
    expect(items.length).toEqual(expectedPlacements);
  });
});
