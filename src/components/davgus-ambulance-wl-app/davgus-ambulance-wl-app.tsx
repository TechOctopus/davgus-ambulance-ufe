import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-ambulance-wl-app',
  styleUrl: 'davgus-ambulance-wl-app.css',
  shadow: true,
})
export class DavgusAmbulanceWlApp {
  render() {
    return (
      <Host>
        <h1>WAC project</h1>
        <p>Made by Heorhi Davydau and Vladislav Gusiev</p>
        <md-filled-button>Click me</md-filled-button>
      </Host>
    );
  }
}
