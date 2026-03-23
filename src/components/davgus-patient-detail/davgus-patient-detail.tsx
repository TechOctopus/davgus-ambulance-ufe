import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-patient-detail',
  styleUrl: 'davgus-patient-detail.css',
  shadow: true,
})
export class DavgusPatientDetail {
  render() {
    return (
      <Host>
        <p>Patient Detail</p>
      </Host>
    );
  }
}
