import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-placement-list',
  styleUrl: 'davgus-placement-list.css',
  shadow: true,
})
export class DavgusPlacementList {
  render() {
    return (
      <Host>
        <p>Placement List</p>
      </Host>
    );
  }
}
