import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { Patient } from '../../models';
import { createPatient, deletePatient, getPatient, updatePatient } from '../../api/ambulance-api';

@Component({
  tag: 'davgus-patient-editor',
  styleUrl: 'davgus-patient-editor.css',
  shadow: true,
})
export class DavgusPatientEditor {
  @Prop() entryId: string;
  @Prop() apiBase: string;

  @Event({ eventName: 'editor-closed' }) editorClosed: EventEmitter<string>;

  @State() entry: Patient;
  @State() isValid: boolean;
  @State() errorMessage: string;

  private formElement: HTMLFormElement;

  async componentWillLoad() {
    if (this.entryId === '@new') {
      this.isValid = false;
      this.entry = {
        id: '@new',
        name: '',
        birthDate: '',
        insuranceId: '',
        insuranceCompany: '',
        phone: '',
        email: '',
        archived: false,
      };
    } else {
      try {
        const patient = await getPatient(this.entryId, this.apiBase);
        if (patient) {
          this.entry = { ...patient };
          this.isValid = true;
        } else {
          this.errorMessage = `Pacient s ID ${this.entryId} nebol nájdený`;
        }
      } catch {
        this.errorMessage = 'Nepodarilo sa nacitat pacienta';
      }
    }
  }

  private handleInputEvent(ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    this.validateForm('silent');
    return target.value;
  }

  private validateForm(mode: 'silent' | 'show-errors'): boolean {
    this.isValid = true;

    for (let i = 0; i < this.formElement.children.length; i++) {
      const element = this.formElement.children[i] as HTMLElement & {
        checkValidity?: () => boolean;
        reportValidity?: () => boolean;
      };

      let valid = true;
      if (mode === 'show-errors' && element.reportValidity) {
        valid = element.reportValidity();
      } else if (element.checkValidity) {
        valid = element.checkValidity();
      }

      this.isValid &&= valid;
    }

    return this.isValid;
  }

  private async saveEntry() {
    if (!this.validateForm('show-errors')) {
      return;
    }

    try {
      if (this.entry.id === '@new') {
        await createPatient(this.entry, this.apiBase);
      } else {
        const updated = await updatePatient(this.entry, this.apiBase);
        if (!updated) {
          this.errorMessage = `Pacient s ID ${this.entry.id} nebol nájdený`;
          return;
        }
      }
      this.editorClosed.emit('store');
    } catch {
      this.errorMessage = 'Nepodarilo sa ulozit pacienta';
    }
  }

  private async deleteEntry() {
    try {
      await deletePatient(this.entry.id, this.apiBase);
      this.editorClosed.emit('delete');
    } catch {
      this.errorMessage = 'Nepodarilo sa zmazat pacienta';
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

    const isNew = this.entry?.id === '@new';

    return (
      <Host>
        <div class="editor-header">
          <md-icon class="header-icon">{isNew ? 'person_add' : 'edit'}</md-icon>
          <h2>{isNew ? 'Nový pacient' : 'Úprava pacienta'}</h2>
        </div>

        <div class="form-card">
          <div class="form-section-title">
            <md-icon>badge</md-icon>
            Osobné údaje
          </div>

          <form ref={el => (this.formElement = el)}>
            <md-filled-text-field
              label="Meno a Priezvisko"
              required
              value={this.entry?.name}
              oninput={(ev: InputEvent) => {
                if (this.entry) this.entry.name = this.handleInputEvent(ev);
              }}
            >
              <md-icon slot="leading-icon">person</md-icon>
            </md-filled-text-field>

            <div class="field-label">Dátum narodenia</div>
            <input
              type="date"
              class="date-input"
              required
              title="Dátum narodenia"
              value={this.entry?.birthDate}
              onInput={(ev: Event) => {
                if (this.entry) {
                  this.entry.birthDate = (ev.target as HTMLInputElement).value;
                  this.validateForm('silent');
                }
              }}
            />

            <md-divider></md-divider>

            <div class="form-section-title">
              <md-icon>shield</md-icon>
              Poistenie
            </div>
            <md-filled-text-field
              label="Číslo poistenca"
              required
              value={this.entry?.insuranceId}
              oninput={(ev: InputEvent) => {
                if (this.entry) this.entry.insuranceId = this.handleInputEvent(ev);
              }}
            >
              <md-icon slot="leading-icon">fingerprint</md-icon>
            </md-filled-text-field>

            <md-filled-text-field
              label="Poisťovňa"
              required
              value={this.entry?.insuranceCompany}
              oninput={(ev: InputEvent) => {
                if (this.entry) this.entry.insuranceCompany = this.handleInputEvent(ev);
              }}
            >
              <md-icon slot="leading-icon">business</md-icon>
            </md-filled-text-field>

            <md-divider></md-divider>

            <div class="form-section-title">
              <md-icon>contact_phone</md-icon>
              Kontaktné údaje
            </div>

            <md-filled-text-field
              label="Telefón"
              type="tel"
              value={this.entry?.phone}
              oninput={(ev: InputEvent) => {
                if (this.entry) this.entry.phone = this.handleInputEvent(ev);
              }}
            >
              <md-icon slot="leading-icon">phone</md-icon>
            </md-filled-text-field>

            <md-filled-text-field
              label="Email"
              type="email"
              value={this.entry?.email}
              oninput={(ev: InputEvent) => {
                if (this.entry) this.entry.email = this.handleInputEvent(ev);
              }}
            >
              <md-icon slot="leading-icon">email</md-icon>
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
          <md-filled-button id="confirm" onClick={() => this.saveEntry()}>
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }
}
