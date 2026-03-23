import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientList } from '../davgus-patient-list';

describe('davgus-patient-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientList],
      html: `<davgus-patient-list></davgus-patient-list>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-patient-list>
        <mock:shadow-root>
          <p>Patient List</p>
        </mock:shadow-root>
      </davgus-patient-list>
    `);
  });
});
