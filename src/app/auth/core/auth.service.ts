import { Injectable } from "@angular/core";

const permessi: any = {
    amministrazione: {
        impostaAnagrafica: true,
        impostaSchedaSanitaria: false,
        impostaPresente: false,
        impostaAssente: false,
        trasferisciNucleo: false,
    },
    coordinatore: {
        impostaAnagrafica: false,
        impostaSchedaSanitaria: false,
        impostaPresente: true,
        impostaAssente: true,
        trasferisciNucleo: true,
    },
    medico: {
        impostaAnagrafica: false,
        impostaSchedaSanitaria: true,
        impostaPresente: false,
        impostaAssente: false,
        trasferisciNucleo: false,
    }
}

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

      leggiRuoli(): string[] {
          let ruoli: string[] = [];
          for (const ruolo in permessi) {
            ruoli.push(ruolo);
          }
          return ruoli;
      }

      leggiRuolo(ruolo: string): any {
          return permessi[ruolo];
      }
  }