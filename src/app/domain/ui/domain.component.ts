import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nuclei } from 'src/app/shared/nuclei';
import { Progetti } from 'src/app/shared/progetti';
import { viewError } from 'src/app/shared/helpers';
import { OspiteDomainService } from '../application/ospite-domain.service';
import { Ospite } from '../domain/ospite';

@Component({
  selector: 'app-crud',
  templateUrl: 'domain.component.html',
  styles: [
    '.label { font-size: 0.75rem; text-transform: uppercase; }'
  ],
  providers: [ OspiteDomainService ]
})
export class DomainComponent implements OnInit {
  ospite!: Ospite;
  formAnagrafica!: FormGroup;
  formSchedaSanitaria!: FormGroup;
  progetti = Progetti;
  nuclei = Nuclei;


  constructor(public manager: OspiteDomainService,
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
    console.log(this.formSchedaSanitaria.value);
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

  trasferisciNucleo(nucleo: string) {
    viewError(() => 
      this.manager.trasferisciNucleo({ dataTrasferimento: new Date().toString(), nucleo })
    );
  }

}
