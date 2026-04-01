import { Component, Event, Prop, EventEmitter, Host, State, h } from '@stencil/core';
import { Department, Placement } from '../../models';
import { getDepartments, getPlacements } from '../../api/ambulance-api';

@Component({
  tag: 'davgus-department-list',
  styleUrl: 'davgus-department-list.css',
  shadow: true,
})
export class DavgusDepartmentList {
  @Event({ eventName: 'department-clicked' }) departmentClicked: EventEmitter<string>;
  @Prop() apiBase: string;

  @State() departments: Department[] = [];
  @State() placements: Placement[] = [];
  @State() errorMessage: string;

  async componentWillLoad() {
    try {
      const [departments, placements] = await Promise.all([getDepartments(this.apiBase), getPlacements(this.apiBase)]);
      this.departments = departments;
      this.placements = placements;
      this.errorMessage = undefined;
    } catch {
      this.departments = [];
      this.placements = [];
      this.errorMessage = 'Nepodarilo sa nacitat oddelenia';
    }
  }

  private getOccupiedBeds(departmentId: string): number {
    return this.placements.filter(p => p.departmentId === departmentId).length;
  }

  private getTotalBeds(department: Department): number {
    return department.rooms.filter(r => r.status === 'active').reduce((sum, r) => sum + r.capacity, 0);
  }

  private getOccupancyColor(ratio: number): string {
    if (ratio >= 0.85) return '#D32F2F';
    if (ratio >= 0.6) return '#F9A825';
    return '#2E7D32';
  }

  private getOccupancyLabel(ratio: number): string {
    if (ratio >= 0.85) return 'Vysoká';
    if (ratio >= 0.6) return 'Stredná';
    return 'Nízka';
  }

  render() {
    return (
      <Host>
        <div class="list-header">
          <h2 class="section-title">Oddelenia</h2>
          <span class="badge">{this.departments.length}</span>
        </div>

        {this.errorMessage ? (
          <div class="empty-state">
            <md-icon class="empty-icon">error</md-icon>
            <p>{this.errorMessage}</p>
          </div>
        ) : null}

        <div class="card-list">
          {this.departments.map(dept => {
            const occupied = this.getOccupiedBeds(dept.id);
            const total = this.getTotalBeds(dept);
            const ratio = total > 0 ? occupied / total : 0;
            const color = this.getOccupancyColor(ratio);
            const activeRooms = dept.rooms.filter(r => r.status === 'active').length;
            const totalRooms = dept.rooms.length;

            return (
              <div class="dept-card" onClick={() => this.departmentClicked.emit(dept.id)}>
                <div class="dept-icon-wrap" style={{ background: color + '18' }}>
                  <md-icon style={{ color: color }}>apartment</md-icon>
                </div>
                <div class="dept-info">
                  <div class="dept-name">{dept.name}</div>
                  <div class="dept-meta">
                    {activeRooms}/{totalRooms} izieb aktívnych
                  </div>
                  <div class="occupancy-row">
                    <div class="progress-bar">
                      <div class="progress-fill" style={{ width: `${Math.round(ratio * 100)}%`, background: color }}></div>
                    </div>
                    <span class="occupancy-text" style={{ color: color }}>
                      {occupied}/{total}
                    </span>
                  </div>
                  <div class="occupancy-label" style={{ color: color }}>
                    {this.getOccupancyLabel(ratio)} obsadenosť
                  </div>
                </div>
                <md-icon class="chevron">chevron_right</md-icon>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
