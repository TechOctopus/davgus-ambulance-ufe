import { newSpecPage } from '@stencil/core/testing';
import { DavgusDepartmentList } from '../davgus-department-list';
import { resetDummyData } from '../../../utils/dummy-data';

describe('davgus-department-list', () => {
  beforeEach(() => {
    resetDummyData();
  });

  it('renders department items', async () => {
    const page = await newSpecPage({
      components: [DavgusDepartmentList],
      html: `<davgus-department-list></davgus-department-list>`,
    });

    const list = page.rootInstance as DavgusDepartmentList;
    const expectedDepts = list?.departments?.length;

    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('.dept-card');

    expect(expectedDepts).toBeGreaterThanOrEqual(1);
    expect(items.length).toEqual(expectedDepts);
  });
});
