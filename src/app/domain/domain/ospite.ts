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

    public get nucleoCorrente() : string {
        return this.nuclei.slice(-1)[0].nucleo;
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
        if (!this.presente) {
            throw 'Non è possibile cambiare nucleo quando l\'ospite è assente';
        } else {
            // controlla che la data di trasferimento non sia inferiore all'ultimo trasferimento
            // controlla che il nuovo nucleo sia diverso da quello corrente
            this.nuclei.push({ dataTrasferimento, nucleo });  
        }
    }
}