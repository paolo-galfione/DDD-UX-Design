import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nuclei } from 'src/app/shared/nuclei';
import { Progetti } from 'src/app/shared/progetti';
import { viewError } from 'src/app/shared/helpers';
import { OspiteStateService } from '../application/ospite-state.service';
import { Ospite } from '../domain/ospite';

@Component({
  selector: 'app-crud',
  templateUrl: 'state.component.html',
  styles: [
    '.label { font-size: 0.75rem; text-transform: uppercase; }'
  ],
  providers: [ OspiteStateService ]
})
export class StateComponent implements OnInit {
  ospite!: Ospite;
  formAnagrafica!: FormGroup;
  formSchedaSanitaria!: FormGroup;
  formTrasferimentoNucleo!: FormGroup;
  progetti = Progetti;
  nuclei = Nuclei;


  constructor(public manager: OspiteStateService,
              private fb: FormBuilder) {}

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

}
