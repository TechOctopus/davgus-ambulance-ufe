import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { Patient, Department, Room, Placement } from '../../models';
import {
  getPlacement,
  getPatients,
  getDepartments,
  getDepartment,
  createPlacement,
  updatePlacement,
  deletePlacement,
} from '../../utils/dummy-data';

@Component({
  tag: 'davgus-placement-editor',
  styleUrl: 'davgus-placement-editor.css',
  shadow: true,
})
export class DavgusPlacementEditor {
  @Prop() entryId: string;
  @Prop() apiBase: string;

  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;

  @State() entry: Placement;
  @State() patients: Patient[];
  @State() departments: Department[];
  @State() availableRooms: Room[];
  @State() errorMessage: string;

  componentWillLoad() {
    this.patients = getPatients();
    this.departments = getDepartments();

    if (this.entryId === '@new') {
      this.entry = {
        id: '@new',
        patientId: '',
        patientName: '',
        departmentId: '',
        departmentName: '',
        roomId: '',
        roomNumber: '',
        admissionDate: new Date().toISOString().split('T')[0],
        notes: '',
      };
      this.availableRooms = [];
    } else {
      const placement = getPlacement(this.entryId);
      if (placement) {
        this.entry = { ...placement };
        const dept = getDepartment(placement.departmentId);
        this.availableRooms = dept?.rooms.filter(r => r.status === 'active') || [];
      } else {
        this.errorMessage = `Umiestnenie s ID ${this.entryId} nebolo nájdené`;
      }
    }
  }

  private handlePatientChange(ev: InputEvent) {
    const patientId = (ev.target as HTMLInputElement).value;
    const patient = this.patients.find(p => p.id === patientId);
    if (patient) {
      this.entry = { ...this.entry, patientId: patient.id, patientName: patient.name };
    }
  }

  private handleDepartmentChange(ev: InputEvent) {
    const deptId = (ev.target as HTMLInputElement).value;
    const dept = this.departments.find(d => d.id === deptId);
    if (dept) {
      this.entry = { ...this.entry, departmentId: dept.id, departmentName: dept.name, roomId: '', roomNumber: '' };
      this.availableRooms = dept.rooms.filter(r => r.status === 'active');
    }
  }

  private handleRoomChange(ev: InputEvent) {
    const roomId = (ev.target as HTMLInputElement).value;
    const room = this.availableRooms.find(r => r.id === roomId);
    if (room) {
      this.entry = { ...this.entry, roomId: room.id, roomNumber: room.number };
    }
  }

  private save() {
    if (!this.entry.patientId || !this.entry.departmentId || !this.entry.roomId) {
      return;
    }
    if (this.entry.id === '@new') {
      createPlacement(this.entry);
    } else {
      updatePlacement(this.entry);
    }
    this.editorClosed.emit('store');
  }

  private deleteEntry() {
    deletePlacement(this.entry.id);
    this.editorClosed.emit('delete');
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

    const isNew = this.entry?.id === '@new';

    return (
      <Host>
        <div class="editor-header">
          <md-icon class="header-icon">{isNew ? 'add_location_alt' : 'edit_location_alt'}</md-icon>
          <h2>{isNew ? 'Nové umiestnenie' : 'Úprava umiestnenia'}</h2>
        </div>

        <div class="form-card">
          <div class="form-section-title">
            <md-icon>person</md-icon>
            Pacient a oddelenie
          </div>

          <form>
            <md-filled-select
              label="Pacient"
              display-text={this.entry?.patientName}
              oninput={(ev: InputEvent) => this.handlePatientChange(ev)}
            >
              <md-icon slot="leading-icon">person</md-icon>
              {this.patients.map(p => (
                <md-select-option value={p.id} selected={p.id === this.entry?.patientId}>
                  <div slot="headline">{p.name}</div>
                </md-select-option>
              ))}
            </md-filled-select>

            <md-filled-select
              label="Oddelenie"
              display-text={this.entry?.departmentName}
              oninput={(ev: InputEvent) => this.handleDepartmentChange(ev)}
            >
              <md-icon slot="leading-icon">apartment</md-icon>
              {this.departments.map(d => (
                <md-select-option value={d.id} selected={d.id === this.entry?.departmentId}>
                  <div slot="headline">{d.name}</div>
                </md-select-option>
              ))}
            </md-filled-select>

            <md-filled-select
              label="Izba"
              display-text={this.entry?.roomNumber ? `Izba ${this.entry.roomNumber}` : ''}
              oninput={(ev: InputEvent) => this.handleRoomChange(ev)}
            >
              <md-icon slot="leading-icon">bed</md-icon>
              {this.availableRooms.map(r => (
                <md-select-option value={r.id} selected={r.id === this.entry?.roomId}>
                  <div slot="headline">{`Izba ${r.number} (kapacita: ${r.capacity})`}</div>
                </md-select-option>
              ))}
            </md-filled-select>

            <md-divider></md-divider>

            <div class="form-section-title">
              <md-icon>event</md-icon>
              Podrobnosti
            </div>

            <div class="field-label">Dátum prijatia</div>
            <input
              type="date"
              class="date-input"
              value={this.entry?.admissionDate}
              onInput={(ev: Event) => {
                if (this.entry) this.entry = { ...this.entry, admissionDate: (ev.target as HTMLInputElement).value };
              }}
            />

            <md-filled-text-field
              label="Poznámky"
              value={this.entry?.notes}
              oninput={(ev: InputEvent) => {
                if (this.entry) this.entry = { ...this.entry, notes: (ev.target as HTMLInputElement).value };
              }}
            >
              <md-icon slot="leading-icon">notes</md-icon>
            </md-filled-text-field>
          </form>
        </div>

        <div class="actions">
          <md-filled-tonal-button id="delete" disabled={!this.entry || isNew} onClick={() => this.deleteEntry()}>
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          <span class="stretch-fill"></span>
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
