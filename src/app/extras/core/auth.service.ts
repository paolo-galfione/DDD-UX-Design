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

      public ruolo: string = this.leggiRuoli()[0];  

      leggiRuoli(): string[] {
          return Object.keys(permessi);
      }

      leggiPermessiRuolo(): any {
          return permessi[this.ruolo];
      }

      leggiPermessoRuolo(permesso: string): Permessi {
        return permessi[this.ruolo][permesso];
      }

  }