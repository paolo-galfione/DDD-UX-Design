import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Nuclei } from 'src/app/shared/nuclei';
import { Progetti } from 'src/app/shared/progetti';
import { viewError } from 'src/app/shared/helpers';
import { Ospite } from '../domain/ospite';
import { AuthService, Permessi } from '../core/auth.service';
import { OspiteExtrasService } from '../application/ospite-extras.service';
import { ProgettoDaPunteggio } from '../application/progetto-da-punteggio';

@Component({
  selector: 'app-crud',
  templateUrl: 'extras.component.html',
  styles: [
    '.label { font-size: 0.75rem; text-transform: uppercase; }'
  ],
  providers: [ OspiteExtrasService, AuthService, ProgettoDaPunteggio ]
})
export class ExtrasComponent implements OnInit {
  ospite!: Ospite;
  formAnagrafica!: FormGroup;
  formSchedaSanitaria!: FormGroup;
  formTrasferimentoNucleo!: FormGroup;
  progetti = Progetti;
  nuclei = Nuclei;
  ruolo: string;
  scalaDDD: number = 0;

  constructor(public manager: OspiteExtrasService,
              public auth: AuthService,
              public progettoService: ProgettoDaPunteggio,
              private fb: FormBuilder) {
    this.ruolo = this.auth.leggiRuoli()[0] || '';
  }
test(){
  console.log('clickkeddd')
}
  ngOnInit(): void {
    this.ospite = this.manager.leggiOspite();
    this.scalaDDD = this.ospite.scalaDDD;
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

  impostaProgettoDaPunteggio() {
    this.manager.impostaSchedaSanitaria({ scalaDDD: this.scalaDDD, 
      progetto: this.progettoService.assegnaProgetto(this.scalaDDD) });
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
    const permesso = this.auth.leggiRuolo(this.ruolo)[comando];
    return this.manager.enabled(comando) && 
          (permesso === Permessi.Yes || permesso === Permessi.YesWithAudit);
  }

}
