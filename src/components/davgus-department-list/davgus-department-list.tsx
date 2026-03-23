import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-department-list',
  styleUrl: 'davgus-department-list.css',
  shadow: true,
})
export class DavgusDepartmentList {
  render() {
    return (
      <Host>
        <p>Department List</p>
      </Host>
    );
  }
}
