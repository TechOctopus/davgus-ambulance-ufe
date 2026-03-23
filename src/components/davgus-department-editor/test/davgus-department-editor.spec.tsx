import { newSpecPage } from '@stencil/core/testing';
import { DavgusDepartmentEditor } from '../davgus-department-editor';

describe('davgus-department-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusDepartmentEditor],
      html: `<davgus-department-editor></davgus-department-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-department-editor>
        <mock:shadow-root>
          <p>Department Editor</p>
        </mock:shadow-root>
      </davgus-department-editor>
    `);
  });
});
