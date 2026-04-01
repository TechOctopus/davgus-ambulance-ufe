import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { Patient, Placement } from '../../models';
import { getPatient, getPlacementForPatient } from '../../api/ambulance-api';

@Component({
  tag: 'davgus-patient-detail',
  styleUrl: 'davgus-patient-detail.css',
  shadow: true,
})
export class DavgusPatientDetail {
  @Prop() entryId: string;
  @Prop() apiBase: string;

  @Event({ eventName: 'detail-closed' }) detailClosed: EventEmitter<string>;

  @State() patient: Patient;
  @State() placement: Placement;
  @State() errorMessage: string;

  async componentWillLoad() {
    try {
      const patient = await getPatient(this.entryId, this.apiBase);
      if (patient) {
        this.patient = patient;
        this.placement = await getPlacementForPatient(this.entryId, this.apiBase);
      } else {
        this.errorMessage = `Pacient s ID ${this.entryId} nebol nájdený`;
      }
    } catch {
      this.errorMessage = 'Nepodarilo sa nacitat detail pacienta';
    }
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
        <div class="detail-header">
          <div class="avatar">
            {this.patient.name
              .split(' ')
              .map(w => w[0])
              .join('')
              .substring(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <h2 class="patient-name">{this.patient.name}</h2>
            <span class="patient-sub">Narodený/á: {this.formatDate(this.patient.birthDate)}</span>
          </div>
        </div>

        <div class="info-card">
          <div class="card-section-title">
            <md-icon>shield</md-icon>
            Poistenie
          </div>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Poisťovňa</span>
              <span class="info-value">{this.patient.insuranceCompany}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Číslo poistenca</span>
              <span class="info-value">{this.patient.insuranceId}</span>
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="card-section-title">
            <md-icon>contact_phone</md-icon>
            Kontakt
          </div>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Telefón</span>
              <span class="info-value">{this.patient.phone || '—'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">{this.patient.email || '—'}</span>
            </div>
          </div>
        </div>

        <div class={`info-card ${this.placement ? 'placement-active' : ''}`}>
          <div class="card-section-title">
            <md-icon>bed</md-icon>
            Umiestnenie
          </div>

          {this.placement ? (
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Oddelenie</span>
                <span class="info-value">{this.placement.departmentName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Izba</span>
                <span class="info-value">{this.placement.roomNumber}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Dátum prijatia</span>
                <span class="info-value">{this.formatDate(this.placement.admissionDate)}</span>
              </div>
            </div>
          ) : (
            <div class="empty-placement">
              <md-icon>info</md-icon>
              Pacient nie je momentálne umiestnený
            </div>
          )}
        </div>

        <div class="actions">
          <md-outlined-button onClick={() => this.detailClosed.emit('back')}>
            <md-icon slot="icon">arrow_back</md-icon>
            Späť
          </md-outlined-button>
        </div>
      </Host>
    );
  }
}
