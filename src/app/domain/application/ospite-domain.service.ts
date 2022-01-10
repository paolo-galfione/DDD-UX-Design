import { Injectable } from '@angular/core';
import { OspiteNucleo } from 'src/app/crud/entity/ospite-nucleo';
import { Nuclei } from '../../shared/nuclei';
import { Progetti } from '../../shared/progetti';
import { Ospite } from '../domain/ospite';
import { AnagraficaDto } from './dtos/anagrafica-dto';
import { SchedaSanitariaDto } from './dtos/scheda-sanitaria-dto';
import { TrasferimentoNucleoDto } from './dtos/trasferimento-nucleo-dto';

@Injectable({
  providedIn: 'root'
})
export class OspiteDomainService {
  ospite: Ospite;

  constructor() {
    this.ospite = new Ospite(1, 'Paolo', 'Galfione', true, 10,
      Progetti[1], Nuclei[1], new Date(2021, 0, 1));
    this.ospite.trasferisciNucleo(new Date(2021, 11, 31), Nuclei[2]);
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

  get nucleoCorrente(): OspiteNucleo {
    return this.ospite.nucleoCorrente;
  }

}
