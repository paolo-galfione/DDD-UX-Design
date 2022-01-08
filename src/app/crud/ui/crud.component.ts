import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ospite } from '../entity/ospite';
import { OspiteManagerService } from '../manager/ospite-manager.service';

@Component({
  selector: 'app-crud',
  templateUrl: 'crud.component.html',
  styles: [],
  providers: [ OspiteManagerService ]
})
export class CRUDComponent implements OnInit {
  ospite!: Ospite;
  form!: FormGroup;

  constructor(public manager: OspiteManagerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ospite = this.manager.leggiOspite();
    this.form = this.fb.group({
      nome: this.ospite.nome,
      cognome: this.ospite.cognome,
      presente: this.ospite.presente,
      scalaDDD: this.ospite.scalaDDD,
      progetto: this.ospite.progetto,
      nucleo: this.manager.nucleoCorrente()
    })
  }

  salva() {
    this.manager.salvaOspite(this.form.value);
  }


}
