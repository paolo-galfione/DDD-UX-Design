import { Injectable } from "@angular/core";
import { Progetti } from "src/app/shared/progetti";

@Injectable({
    providedIn: 'root'
  })
  export class ProgettoDaPunteggio {

        assegnaProgetto(punteggio: number) : string {
            return punteggio <= 10 ? Progetti[1] : punteggio > 20 ? Progetti[3] : Progetti[2];
        }
  }

  