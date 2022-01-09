import { Injectable } from '@angular/core';
import { Ospite } from '../entity/ospite';
import { OspiteDto } from './ospite-dto';
import { Nuclei } from '../../shared/nuclei';
import { Progetti } from '../../shared/progetti';

@Injectable({
  providedIn: 'root'
})
export class OspiteManagerService {
  ospite: Ospite;

  constructor() {
    this.ospite = {
      id: 1,
      nome: 'Paolo',
      cognome: 'Galfione',
      presente: true,
      scalaDDD: 10,
      progetto: 'Attività di socializzazione',
      nuclei: [
        { dataTrasferimento: new Date(2021,10,1),  nucleo: 'Nucleo Verde'},
        { dataTrasferimento: new Date(2022,1,5),  nucleo: 'Nucleo Blu'},
      ]
    }
  }

  leggiOspite(): Ospite {
    return this.ospite;
  }

  // Qui c'è tutta la logica di Ospite
  salvaOspite(ospite: OspiteDto) {
    this.ospite.nome = ospite.nome;
    this.ospite.cognome = ospite.cognome;
    if(this.ospite.presente && !ospite.presente) {
      // se presente diventa false, il progetto viene sospeso
      this.ospite.progetto = Progetti[0] 
    }
    this.ospite.presente = ospite.presente;
    this.ospite.scalaDDD = ospite.scalaDDD;
    if(this.nucleoCorrente() !== ospite.nucleo) {
      // se è stato impostato un altro nucleo lo aggiungo
      this.ospite.nuclei.push({ dataTrasferimento: new Date(), nucleo: ospite.nucleo });
    }
  }

  nucleoCorrente() : string {
    return this.ospite.nuclei.slice(-1)[0].nucleo;
  }
}
