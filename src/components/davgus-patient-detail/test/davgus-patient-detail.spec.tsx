import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientDetail } from '../davgus-patient-detail';

describe('davgus-patient-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientDetail],
      html: `<davgus-patient-detail></davgus-patient-detail>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-patient-detail>
        <mock:shadow-root>
          <p>Patient Detail</p>
        </mock:shadow-root>
      </davgus-patient-detail>
    `);
  });
});
