import { Injectable } from '@angular/core';
import { Nuclei } from '../../shared/nuclei';
import { Progetti } from '../../shared/progetti';
import { Ospite } from '../domain/ospite';
import { AnagraficaDto } from './anagrafica-dto';
import { SchedaSanitariaDto } from './scheda-sanitaria-dto';
import { TrasferimentoNucleoDto } from './trasferimento-nucleo-dto';

@Injectable({
  providedIn: 'root'
})
export class OspiteDomainService {
  ospite: Ospite;

  constructor() {
    this.ospite = new Ospite(1, 'Paolo', 'Galfione', true, 10,
      Progetti[1], Nuclei[1], new Date(2021, 10, 1));
    this.ospite.trasferisciNucleo(new Date(2021, 12, 31), Nuclei[2]);
      console.log('creato ospite', this.ospite);
  }

  leggiOspite(): Ospite {
    return this.ospite;
  }

  impostaAnagrafica(dto: AnagraficaDto) {
    // recupera ospite da id
    this.ospite.impostaAnagrafica(dto.nome, dto.cognome);
  }

  impostaSchedaSanitaria(dto: SchedaSanitariaDto) {
    // recupera ospite da id
    this.ospite.impostaSchedaSanitaria(dto.scalaDDD, dto.progetto);
  }

  impostaPresente() {
    // recupera ospite da id
    this.ospite.impostaPresente();
  }

  impostaAssente() {
    // recupera ospite da id
    this.ospite.impostaAssente();
  }

  trasferisciNucleo(dto: TrasferimentoNucleoDto) {
    // recupera ospite da id
    this.ospite.trasferisciNucleo(new Date(dto.dataTrasferimento), dto.nucleo);
  }

  nucleoCorrente(): string {
    return this.ospite.nucleoCorrente;
  }

  leggiProgetti(): string[] {
    return Progetti;
  }

  leggiNuclei(): string[] {
    return Nuclei;
  }

}
