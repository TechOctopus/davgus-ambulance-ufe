import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-department-editor',
  styleUrl: 'davgus-department-editor.css',
  shadow: true,
})
export class DavgusDepartmentEditor {
  render() {
    return (
      <Host>
        <p>Department Editor</p>
      </Host>
    );
  }
}
