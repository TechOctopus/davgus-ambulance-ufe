import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'davgus-placement-editor',
  styleUrl: 'davgus-placement-editor.css',
  shadow: true,
})
export class DavgusPlacementEditor {
  render() {
    return (
      <Host>
        <p>Placement Editor</p>
      </Host>
    );
  }
}
