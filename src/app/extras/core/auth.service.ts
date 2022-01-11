import { Injectable } from "@angular/core";

export enum Permessi {
    Yes,
    YesWithAudit,
    No
}

const permessi: any = {
    amministrazione: {
        impostaAnagrafica: Permessi.Yes,
        impostaSchedaSanitaria: Permessi.No,
        impostaProgettoDaPunteggio: Permessi.No,
        impostaPresente: Permessi.No,
        impostaAssente: Permessi.No,
        trasferisciNucleo: Permessi.No,
    },
    coordinatore: {
        impostaAnagrafica: Permessi.No,
        impostaSchedaSanitaria: Permessi.YesWithAudit,
        impostaProgettoDaPunteggio: Permessi.Yes,
        impostaPresente: Permessi.Yes,
        impostaAssente: Permessi.Yes,
        trasferisciNucleo: Permessi.Yes,
    },
    infermiere: {
        impostaAnagrafica: Permessi.No,
        impostaSchedaSanitaria: Permessi.No,
        impostaProgettoDaPunteggio: Permessi.Yes,
        impostaPresente: Permessi.No,
        impostaAssente: Permessi.No,
        trasferisciNucleo: Permessi.No,
    },
    medico: {
        impostaAnagrafica: Permessi.No,
        impostaSchedaSanitaria: Permessi.Yes,
        impostaProgettoDaPunteggio: Permessi.No,
        impostaPresente: Permessi.No,
        impostaAssente: Permessi.No,
        trasferisciNucleo: Permessi.No,
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