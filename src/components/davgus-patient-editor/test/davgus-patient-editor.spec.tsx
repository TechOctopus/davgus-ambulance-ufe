import { newSpecPage } from '@stencil/core/testing';
import { DavgusPatientEditor } from '../davgus-patient-editor';

describe('davgus-patient-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusPatientEditor],
      html: `<davgus-patient-editor></davgus-patient-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-patient-editor>
        <mock:shadow-root>
          <p>Patient Editor</p>
        </mock:shadow-root>
      </davgus-patient-editor>
    `);
  });
});
