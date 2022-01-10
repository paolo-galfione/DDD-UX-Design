import { OspiteNucleo } from "./ospite-nucleo";

export interface OspiteStato {
    presente: boolean;
    progetto: string;
    
    impostaSchedaSanitaria(scalaDDD:number, progetto:string): void;
    impostaPresente(): void;
    impostaAssente(): void;
    trasferisciNucleo(dataTrasferimento: Date, nucleo: string): void;
}