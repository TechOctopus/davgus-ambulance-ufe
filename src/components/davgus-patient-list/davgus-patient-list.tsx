import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-patient-list',
  styleUrl: 'davgus-patient-list.css',
  shadow: true,
})
export class DavgusPatientList {
  render() {
    return (
      <Host>
        <p>Patient List</p>
      </Host>
    );
  }
}
