import { State } from "../core/state";
import { OspiteAssente } from "./ospite-assente";
import { OspiteNucleo } from "./ospite-nucleo";
import { OspitePresente } from "./ospite-presente";
import { OspiteStato } from "./ospite-stato";

export class Ospite extends State implements OspiteStato {
    public id: number;
    public nome: string;
    public cognome: string;
    public scalaDDD: number;
    public nuclei: OspiteNucleo[];

    public _stato: OspiteStato
    public _progetto: string;

constructor(id: number,
            nome: string,
            cognome: string,
            presente: boolean,
            scalaDDD: number,
            progetto: string,
            nucleo: string,
            dataTrasferimento: Date
        ) {
          super();
          this.id = id;
          this.nome = nome;
          this.cognome = cognome;
          this.scalaDDD = scalaDDD;
          this._progetto = progetto;
          this.nuclei = [];
          this._stato = presente ? new OspitePresente(this) : new OspiteAssente(this);
          this.trasferisciNucleo(dataTrasferimento, nucleo);
    }

    public get progetto(): string { return this._stato.progetto }
    public set progetto(value: string) { this._stato.progetto = value }
    public get presente(): boolean { return this._stato.presente }

    public get nucleoCorrente() : OspiteNucleo {
        // ritorno il nucleo corrente (OspiteNucleo con data ingresso maggiore)
        return this.nuclei.reduce((acc, nucleo) => 
                    acc = acc.dataTrasferimento > nucleo.dataTrasferimento ? acc : nucleo,
                    { dataTrasferimento: new Date(1900, 0, 1), nucleo: ''});
    }

    impostaAnagrafica(nome: string, cognome: string) {
        this.nome = nome;
        this.cognome = cognome;
    }

    impostaSchedaSanitaria(scalaDDD:number, progetto:string) {
        this._stato.impostaSchedaSanitaria( scalaDDD, progetto );
    }

    impostaPresente() {
        this._stato.impostaPresente();
    }

    impostaAssente() {
        this._stato.impostaAssente();
    }

    trasferisciNucleo(dataTrasferimento: Date, nucleo: string) {
        this._stato.trasferisciNucleo( dataTrasferimento, nucleo );
    }
}