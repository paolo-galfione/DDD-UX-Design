import { Progetti } from "src/app/shared/progetti";
import { Ospite } from "./ospite";
import { OspitePresente } from "./ospite-presente";
import { OspiteStato } from "./ospite-stato";

export class OspiteAssente implements OspiteStato  {

    constructor(private _ospite: Ospite) {}

    public get presente(): boolean { return false }
    public get progetto(): string { return Progetti[0] } //sospeso

    impostaSchedaSanitaria(scalaDDD:number, progetto:string) {
        throw new Error(`Non è possibile modificare la scheda sanitaria di un ospite assente`)
    }

    impostaPresente() {
        this._ospite._stato = new OspitePresente(this._ospite);
    }

    impostaAssente() {
        throw new Error(`L\'ospite è già assente`);
    }

    trasferisciNucleo(dataTrasferimento: Date, nucleo: string) {
        throw new Error(`Non è possibile cambiare nucleo quando l'ospite è assente`);
    }
}