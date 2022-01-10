import { errorIf } from "src/app/shared/helpers";
import { Nuclei } from "src/app/shared/nuclei";
import { Disabled } from "../core/disabled";
import { Ospite } from "./ospite";
import { OspiteAssente } from "./ospite-assente";
import { OspiteStato } from "./ospite-stato";

export class OspitePresente implements OspiteStato  {

    constructor(private _ospite: Ospite) {}

    public get presente(): boolean { return true }
    public get progetto(): string { return this._ospite._progetto }

    impostaSchedaSanitaria(scalaDDD:number, progetto:string) {
        this._ospite.scalaDDD = scalaDDD;
        this._ospite._progetto = progetto;
    }

    @Disabled
    impostaPresente() {
        throw new Error(`L'ospite è già presente`);
    }

    impostaAssente() {
        this._ospite._stato = new OspiteAssente(this._ospite);
    }

    trasferisciNucleo(dataTrasferimento: Date, nucleo: string) {
        errorIf(() => !Nuclei.find(n => n === nucleo),
            `Il nucleo '${nucleo}' non esiste` );
        errorIf(() => dataTrasferimento < this._ospite.nucleoCorrente.dataTrasferimento, 
            `La data di trasferimento non può essere anteriore a quella dell'ultimo trasferimento` );
        errorIf(() => nucleo === this._ospite.nucleoCorrente.nucleo, 
            `Il trasferimento non può avvenire nello stesso nucleo in cui è attualmente l'ospite` );
        this._ospite.nuclei.push({ dataTrasferimento, nucleo });  
    }
}