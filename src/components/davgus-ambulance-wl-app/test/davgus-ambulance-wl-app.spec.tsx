import { newSpecPage } from '@stencil/core/testing';
import { DavgusAmbulanceWlApp } from '../davgus-ambulance-wl-app';

describe('davgus-ambulance-wl-app', () => {
  it('renders patient editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/patient/@new`,
      components: [DavgusAmbulanceWlApp],
      html: `<davgus-ambulance-wl-app base-path="/"></davgus-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget();
    const content = page.root.shadowRoot.querySelector('.content');
    const child = content.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual('davgus-patient-editor');
  });

  it('renders patient list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [DavgusAmbulanceWlApp],
      html: `<davgus-ambulance-wl-app base-path="/ambulance-wl/"></davgus-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget();
    const content = page.root.shadowRoot.querySelector('.content');
    const child = content.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual('davgus-patient-list');
  });
});
