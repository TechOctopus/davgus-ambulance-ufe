import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-patient-editor',
  styleUrl: 'davgus-patient-editor.css',
  shadow: true,
})
export class DavgusPatientEditor {
  render() {
    return (
      <Host>
        <p>Patient Editor</p>
      </Host>
    );
  }
}
