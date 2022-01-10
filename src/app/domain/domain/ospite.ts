import { errorIf } from "src/app/shared/helpers";
import { Nuclei } from "src/app/shared/nuclei";
import { Progetti } from "../../shared/progetti";
import { OspiteNucleo } from "./ospite-nucleo";

export class Ospite {
private _progetto: string = '';
public nuclei: OspiteNucleo[] = [];

constructor(public id: number,
        public nome: string,
        public cognome: string,
        public presente: boolean,
        public scalaDDD: number,
        progetto: string,
        nucleo: string,
        dataTrasferimento: Date
        ) {
          this.progetto = progetto;
          this.nuclei.push({ dataTrasferimento, nucleo });
    }

    public set progetto(value: string) {
        if (!this.presente && value !== Progetti[0]) {
            throw 'Se l\'ospite è assente il progetto è sospeso';
        } else {
            this._progetto = value;
        }
    }

    public get progetto(): string {
        return this.presente ? this._progetto : Progetti[0];
    }

    public get nucleoCorrente() : OspiteNucleo {
        // ritorno il nucleo corrente (OspiteNucleo con data ingresso maggiore)
        return this.nuclei.reduce((acc, nucleo) => 
                    acc = acc.dataTrasferimento > nucleo.dataTrasferimento ? acc : nucleo);
    }

    impostaAnagrafica(nome: string, cognome: string) {
        this.nome = nome;
        this.cognome = cognome;
    }

    impostaSchedaSanitaria(scalaDDD:number, progetto:string) {
        this.scalaDDD = scalaDDD;
        this.progetto = progetto;
    }

    impostaPresente() {
        if (this.presente) {
            throw 'L\'ospite è già presente';
        } else {
            this.presente = true;
        }
    }

    impostaAssente() {
        if (!this.presente) {
            throw 'L\'ospite è già assente';
        } else {
            this.presente = false;
        }
    }

    trasferisciNucleo(dataTrasferimento: Date, nucleo: string) {
        const n = Nuclei.find(n => n === nucleo);
        console.log('nucleo:', this.nuclei, n, nucleo)
        errorIf(() => !this.presente,
            `Non è possibile cambiare nucleo quando l'ospite è assente` );
        errorIf(() => !Nuclei.find(n => n === nucleo),
            `Il nucleo '${nucleo}' non esiste` );
        errorIf(() => dataTrasferimento < this.nucleoCorrente.dataTrasferimento, 
            `La data di trasferimento non può essere anteriore a quella dell'ultimo trasferimento` );
        errorIf(() => nucleo === this.nucleoCorrente.nucleo, 
            `Il trasferimento non può avvenire nello stesso nucleo in cui è attualmente l'ospite` );
        this.nuclei.push({ dataTrasferimento, nucleo });  
    }
}