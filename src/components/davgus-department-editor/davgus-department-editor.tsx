import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { Department, Room } from '../../models';
import { getDepartment, updateDepartment } from '../../api/ambulance-api';

@Component({
  tag: 'davgus-department-editor',
  styleUrl: 'davgus-department-editor.css',
  shadow: true,
})
export class DavgusDepartmentEditor {
  @Prop() entryId: string;
  @Prop() apiBase: string;

  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;

  @State() department: Department;
  @State() errorMessage: string;

  async componentWillLoad() {
    try {
      const dept = await getDepartment(this.entryId, this.apiBase);
      if (dept) {
        this.department = { ...dept, rooms: dept.rooms.map(r => ({ ...r })) };
      } else {
        this.errorMessage = `Oddelenie s ID ${this.entryId} nebolo nájdené`;
      }
    } catch {
      this.errorMessage = 'Nepodarilo sa nacitat oddelenie';
    }
  }

  private handleRoomCapacity(room: Room, ev: InputEvent) {
    const val = parseInt((ev.target as HTMLInputElement).value);
    if (!isNaN(val) && val >= 0) {
      room.capacity = val;
      this.department = { ...this.department };
    }
  }

  private handleRoomStatus(room: Room, ev: InputEvent) {
    room.status = (ev.target as HTMLInputElement).value as Room['status'];
    this.department = { ...this.department };
  }

  private async save() {
    try {
      const updated = await updateDepartment(this.department, this.apiBase);
      if (!updated) {
        this.errorMessage = `Oddelenie s ID ${this.entryId} nebolo nájdené`;
        return;
      }
      this.editorClosed.emit('store');
    } catch {
      this.errorMessage = 'Nepodarilo sa ulozit oddelenie';
    }
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'active':
        return 'check_circle';
      case 'maintenance':
        return 'build';
      case 'closed':
        return 'cancel';
      default:
        return 'info';
    }
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return '#2E7D32';
      case 'maintenance':
        return '#F9A825';
      case 'closed':
        return '#D32F2F';
      default:
        return '#73777F';
    }
  }

  render() {
    if (this.errorMessage) {
      return (
        <Host>
          <div class="error-card">
            <md-icon class="error-icon">error</md-icon>
            <p>{this.errorMessage}</p>
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class="editor-header">
          <md-icon class="header-icon">apartment</md-icon>
          <h2>{this.department?.name}</h2>
        </div>

        <div class="rooms-grid">
          {this.department?.rooms.map(room => (
            <div class="room-card">
              <div class="room-card-header">
                <div class="room-number">
                  <md-icon>meeting_room</md-icon>
                  Izba {room.number}
                </div>
                <md-icon class="status-dot" style={{ color: this.getStatusColor(room.status) }}>
                  {this.getStatusIcon(room.status)}
                </md-icon>
              </div>

              <md-filled-text-field label="Kapacita" type="number" value={room.capacity.toString()} oninput={(ev: InputEvent) => this.handleRoomCapacity(room, ev)}>
                <md-icon slot="leading-icon">bed</md-icon>
              </md-filled-text-field>

              <md-filled-select label="Stav" value={room.status} oninput={(ev: InputEvent) => this.handleRoomStatus(room, ev)}>
                <md-select-option value="active" selected={room.status === 'active'}>
                  <div slot="headline">Aktívna</div>
                </md-select-option>
                <md-select-option value="maintenance" selected={room.status === 'maintenance'}>
                  <div slot="headline">Údržba</div>
                </md-select-option>
                <md-select-option value="closed" selected={room.status === 'closed'}>
                  <div slot="headline">Zatvorená</div>
                </md-select-option>
              </md-filled-select>
            </div>
          ))}
        </div>

        <div class="actions">
          <md-outlined-button id="cancel" onClick={() => this.editorClosed.emit('cancel')}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm" onClick={() => this.save()}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
