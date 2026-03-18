import { newSpecPage } from '@stencil/core/testing';
import { DavgusAmbulanceWlApp } from '../davgus-ambulance-wl-app';

describe('davgus-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DavgusAmbulanceWlApp],
      html: `<davgus-ambulance-wl-app></davgus-ambulance-wl-app>`,
    });
    expect(page.root).toEqualHtml(`
      <davgus-ambulance-wl-app>
        <mock:shadow-root>
          <h1>
            WAC project
          </h1>
          <p>
            Made by Heorhi Davydau and Vladislav Gusiev with passion
          </p>
          <md-filled-button>
            Click
          </md-filled-button>
        </mock:shadow-root>
      </davgus-ambulance-wl-app>
    `);
  });
});
