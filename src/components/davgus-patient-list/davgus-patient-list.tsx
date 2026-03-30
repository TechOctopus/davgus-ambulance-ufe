import { Component, Event, Prop, State, EventEmitter, Host, h } from '@stencil/core';
import { Patient } from '../../models';
import { getPatients } from '../../utils/dummy-data';

@Component({
  tag: 'davgus-patient-list',
  styleUrl: 'davgus-patient-list.css',
  shadow: true,
})
export class DavgusPatientList {
  @Event({ eventName: 'patient-clicked' }) patientClicked: EventEmitter<string>;
  @Prop() apiBase: string;

  @State() searchQuery: string = '';

  patients: Patient[];

  componentWillLoad() {
    this.patients = getPatients();
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .map(w => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  private getAvatarColor(name: string): string {
    const colors = ['#1565C0', '#0277BD', '#00838F', '#00695C', '#2E7D32', '#558B2F', '#F9A825', '#EF6C00', '#D84315', '#6A1B9A'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }

  render() {
    const filtered = this.patients.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.insuranceId.includes(this.searchQuery));

    return (
      <Host>
        <div class="list-header">
          <h2 class="section-title">Zoznam pacientov</h2>
          <span class="badge">{filtered.length}</span>
        </div>

        <md-filled-text-field
          class="search-field"
          label="Hľadať pacienta..."
          value={this.searchQuery}
          oninput={(ev: InputEvent) => {
            this.searchQuery = (ev.target as HTMLInputElement).value;
          }}
        >
          <md-icon slot="leading-icon">search</md-icon>
        </md-filled-text-field>

        {filtered.length === 0 ? (
          <div class="empty-state">
            <md-icon class="empty-icon">person_off</md-icon>
            <p>Žiadni pacienti nenájdení</p>
          </div>
        ) : (
          <div class="card-list">
            {filtered.map(patient => (
              <div class="patient-card">
                <div class="avatar" style={{ background: this.getAvatarColor(patient.name) }}>
                  {this.getInitials(patient.name)}
                </div>
                <div class="card-info">
                  <div class="card-name">{patient.name}</div>
                  <div class="card-detail">
                    <md-icon class="detail-icon">shield</md-icon>
                    {patient.insuranceCompany} &middot; {patient.insuranceId}
                  </div>
                  <div class="card-detail">
                    <md-icon class="detail-icon">phone</md-icon>
                    {patient.phone || '—'}
                  </div>
                </div>
                <md-icon-button onclick={() => this.patientClicked.emit(`view:${patient.id}`)}>
                  <md-icon>visibility</md-icon>
                </md-icon-button>
                <md-icon-button onclick={() => this.patientClicked.emit(`edit:${patient.id}`)}>
                  <md-icon>edit</md-icon>
                </md-icon-button>
              </div>
            ))}
          </div>
        )}

        <md-filled-icon-button class="fab" onclick={() => this.patientClicked.emit('@new')}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}
