import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { viewError } from 'src/app/shared/viewError';
import { OspiteDomainService } from '../application/ospite-domain.service';
import { Ospite } from '../domain/ospite';

@Component({
  selector: 'app-crud',
  templateUrl: 'domain.component.html',
  styles: [],
  providers: [ OspiteDomainService ]
})
export class DomainComponent implements OnInit {
  ospite!: Ospite;
  formAnagrafica!: FormGroup;
  formSchedaSanitaria!: FormGroup;

  constructor(public manager: OspiteDomainService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ospite = this.manager.leggiOspite();
    // TODO caricare form a apertura modal
    this.formAnagrafica = this.fb.group({
      nome: this.ospite.nome,
      cognome: this.ospite.cognome,
    });
    this.formSchedaSanitaria = this.fb.group({
      scalaDDD: this.ospite.scalaDDD,
      progetto: this.ospite.progetto,
    });

  }

  impostaAnagrafica() {
    this.manager.impostaAnagrafica(this.formAnagrafica.value);
  }

  impostaSchedaSanitaria() {
    this.manager.impostaSchedaSanitaria(this.formSchedaSanitaria.value);
  }

  impostaPresente() {
    viewError(() => this.manager.impostaPresente());
  }

  impostaAssente() {
    viewError(() => this.manager.impostaAssente());
  }

  trasferisciNucleo(nucleo: string) {
    viewError(() => 
      this.manager.trasferisciNucleo({ dataTrasferimento: new Date().toString(), nucleo: nucleo})
    );
  }

}
