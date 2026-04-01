import { Component, Event, Prop, EventEmitter, Host, State, h } from '@stencil/core';
import { Placement } from '../../models';
import { getPlacements } from '../../api/ambulance-api';

@Component({
  tag: 'davgus-placement-list',
  styleUrl: 'davgus-placement-list.css',
  shadow: true,
})
export class DavgusPlacementList {
  @Event({ eventName: 'placement-clicked' }) placementClicked: EventEmitter<string>;
  @Prop() apiBase: string;

  @State() placements: Placement[] = [];
  @State() errorMessage: string;

  async componentWillLoad() {
    try {
      this.placements = await getPlacements(this.apiBase);
      this.errorMessage = undefined;
    } catch {
      this.placements = [];
      this.errorMessage = 'Nepodarilo sa nacitat umiestnenia';
    }
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  render() {
    return (
      <Host>
        <div class="list-header">
          <h2 class="section-title">Umiestnenie pacientov</h2>
          <span class="badge">{this.placements.length}</span>
        </div>

        {this.errorMessage ? (
          <div class="empty-state">
            <md-icon class="empty-icon">error</md-icon>
            <p>{this.errorMessage}</p>
          </div>
        ) : null}

        {!this.errorMessage && this.placements.length === 0 ? (
          <div class="empty-state">
            <md-icon class="empty-icon">hotel</md-icon>
            <p>Žiadne umiestnenia</p>
          </div>
        ) : !this.errorMessage ? (
          <div class="card-list">
            {this.placements.map(pl => (
              <div class="placement-card" onClick={() => this.placementClicked.emit(pl.id)}>
                <div class="pl-icon-wrap">
                  <md-icon>bed</md-icon>
                </div>
                <div class="pl-info">
                  <div class="pl-patient">{pl.patientName}</div>
                  <div class="pl-detail">
                    <md-icon class="detail-icon">apartment</md-icon>
                    {pl.departmentName} &middot; Izba {pl.roomNumber}
                  </div>
                  <div class="pl-detail">
                    <md-icon class="detail-icon">calendar_today</md-icon>
                    Prijatý: {this.formatDate(pl.admissionDate)}
                  </div>
                </div>
                <md-icon class="chevron">chevron_right</md-icon>
              </div>
            ))}
          </div>
        ) : null}

        <md-filled-icon-button class="fab" onclick={() => this.placementClicked.emit('@new')}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }
}
