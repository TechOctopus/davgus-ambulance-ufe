import { newSpecPage } from '@stencil/core/testing';
import { DavgusDepartmentList } from '../davgus-department-list';

describe('davgus-department-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusDepartmentList],
      html: `<davgus-department-list></davgus-department-list>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-department-list>
        <mock:shadow-root>
          <p>Department List</p>
        </mock:shadow-root>
      </davgus-department-list>
    `);
  });
});
