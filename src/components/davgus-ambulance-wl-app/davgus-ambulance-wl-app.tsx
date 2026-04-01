import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window {
    navigation: any;
  }
}

@Component({
  tag: 'davgus-ambulance-wl-app',
  styleUrl: 'davgus-ambulance-wl-app.css',
  shadow: true,
})
export class DavgusAmbulanceWlApp {
  @State() private relativePath = '';

  @Prop() basePath: string = '';
  @Prop() apiBase: string;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = '';
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }

  private navigate(path: string) {
    const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
    window.navigation.navigate(absolute);
  }

  private getActiveTab(): string {
    if (this.relativePath.startsWith('departments') || this.relativePath.startsWith('department/')) {
      return 'departments';
    }
    if (this.relativePath.startsWith('placements') || this.relativePath.startsWith('placement/')) {
      return 'placements';
    }
    return 'patients';
  }

  private navigateToPatient(ev: CustomEvent<string>) {
    if (ev.detail === '@new') {
      this.navigate('./patient/@new');
    } else if (ev.detail.startsWith('view:')) {
      this.navigate('./patient-view/' + ev.detail.slice(5));
    } else if (ev.detail.startsWith('edit:')) {
      this.navigate('./patient/' + ev.detail.slice(5));
    } else {
      this.navigate('./patient/' + ev.detail);
    }
  }

  private getElement(element: string, entryId: string) {
    const elements = {
      'patient-editor': <davgus-patient-editor entry-id={entryId} api-base={this.apiBase} oneditor-closed={() => this.navigate('./patients')}></davgus-patient-editor>,
      'patient-detail': <davgus-patient-detail entry-id={entryId} api-base={this.apiBase} ondetail-closed={() => this.navigate('./patients')}></davgus-patient-detail>,
      'departments': (
        <davgus-department-list api-base={this.apiBase} ondepartment-clicked={(ev: CustomEvent<string>) => this.navigate('./department/' + ev.detail)}></davgus-department-list>
      ),
      'department-editor': <davgus-department-editor entry-id={entryId} api-base={this.apiBase} oneditor-closed={() => this.navigate('./departments')}></davgus-department-editor>,
      'placements': (
        <davgus-placement-list api-base={this.apiBase} onplacement-clicked={(ev: CustomEvent<string>) => this.navigate('./placement/' + ev.detail)}></davgus-placement-list>
      ),
      'placement-editor': <davgus-placement-editor entry-id={entryId} api-base={this.apiBase} oneditor-closed={() => this.navigate('./placements')}></davgus-placement-editor>,
      'patients': <davgus-patient-list api-base={this.apiBase} onpatient-clicked={(ev: CustomEvent<string>) => this.navigateToPatient(ev)}></davgus-patient-list>,
    };
    return elements[element];
  }

  render() {
    console.debug('davgus-ambulance-wl-app.render() - path: %s', this.relativePath);

    let element = 'patients';
    let entryId = '@new';

    if (this.relativePath.startsWith('patient/')) {
      element = 'patient-editor';
      entryId = this.relativePath.split('/')[1];
    } else if (this.relativePath.startsWith('patient-view/')) {
      element = 'patient-detail';
      entryId = this.relativePath.split('/')[1];
    } else if (this.relativePath.startsWith('departments')) {
      element = 'departments';
    } else if (this.relativePath.startsWith('department/')) {
      element = 'department-editor';
      entryId = this.relativePath.split('/')[1];
    } else if (this.relativePath.startsWith('placements')) {
      element = 'placements';
    } else if (this.relativePath.startsWith('placement/')) {
      element = 'placement-editor';
      entryId = this.relativePath.split('/')[1];
    }

    const activeTab = this.getActiveTab();

    return (
      <Host>
        <header class="app-header">
          <md-icon class="header-icon">local_hospital</md-icon>
          <span class="header-title">Nemocničný systém</span>
        </header>

        <nav class="navbar">
          <md-tabs
            aria-label="Navigácia"
            onchange={(ev: Event) => {
              const tabs = ev.target as any;
              const selected = tabs.activeTabIndex;
              if (selected === 0) this.navigate('./patients');
              else if (selected === 1) this.navigate('./departments');
              else if (selected === 2) this.navigate('./placements');
            }}
          >
            <md-primary-tab active={activeTab === 'patients'}>
              <md-icon slot="icon">person</md-icon>
              Pacienti
            </md-primary-tab>
            <md-primary-tab active={activeTab === 'departments'}>
              <md-icon slot="icon">apartment</md-icon>
              Oddelenia
            </md-primary-tab>
            <md-primary-tab active={activeTab === 'placements'}>
              <md-icon slot="icon">bed</md-icon>
              Umiestnenie
            </md-primary-tab>
          </md-tabs>
        </nav>

        <div class="content">{this.getElement(element, entryId)}</div>
      </Host>
    );
  }
}
