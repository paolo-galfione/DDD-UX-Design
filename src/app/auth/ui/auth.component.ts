import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nuclei } from 'src/app/shared/nuclei';
import { Progetti } from 'src/app/shared/progetti';
import { viewError } from 'src/app/shared/helpers';
import { OspiteStateService } from '../application/ospite-auth.service';
import { Ospite } from '../domain/ospite';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-crud',
  templateUrl: 'auth.component.html',
  styles: [
    '.label { font-size: 0.75rem; text-transform: uppercase; }'
  ],
  providers: [ OspiteStateService, AuthService ]
})
export class AuthComponent implements OnInit {
  ospite!: Ospite;
  formAnagrafica!: FormGroup;
  formSchedaSanitaria!: FormGroup;
  formTrasferimentoNucleo!: FormGroup;
  progetti = Progetti;
  nuclei = Nuclei;
  ruolo: string;


  constructor(public manager: OspiteStateService,
              public auth: AuthService,
              private fb: FormBuilder) {
    this.ruolo = this.auth.leggiRuoli()[0] || '';
  }

  ngOnInit(): void {
    this.ospite = this.manager.leggiOspite();
    // le form associate ai comandi andrebbero incapsulate in componenti specifiche
    // ma per lo scopo della demo preferisco tenere il codice unito
    this.formAnagrafica = this.fb.group({
      nome: this.ospite.nome,
      cognome: this.ospite.cognome,
    });
    this.formSchedaSanitaria = this.fb.group({
      scalaDDD: this.ospite.scalaDDD,
      progetto: this.ospite.progetto,
    });
    this.formTrasferimentoNucleo = this.fb.group({
      nuovoNucleo: '',
      dataTrasferimento: new Date().toISOString().substring(0,10)
    });
  }

  impostaAnagrafica() {
    this.manager.impostaAnagrafica(this.formAnagrafica.value);
  }

  impostaSchedaSanitaria() {
    viewError(() => this.manager.impostaSchedaSanitaria(this.formSchedaSanitaria.value));
  }

  impostaPresente() {
    viewError(() => this.manager.impostaPresente());
  }

  impostaAssente() {
    viewError(() => this.manager.impostaAssente());
  }

  trasferisciNucleo() {
    viewError(() => 
      this.manager.trasferisciNucleo({ 
        dataTrasferimento: this.formTrasferimentoNucleo.value.dataTrasferimento, 
        nucleo: this.formTrasferimentoNucleo.value.nuovoNucleo
      }));
  }

  enabled(comando: string): boolean {
    return this.manager.enabled(comando) && this.auth.leggiRuolo(this.ruolo)[comando];
  }

}
