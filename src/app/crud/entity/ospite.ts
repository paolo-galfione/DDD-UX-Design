import { OspiteNucleo } from "./ospite-nucleo";

export interface Ospite {
    id: number;
    nome: string;
    cognome: string;
    presente: boolean;
    scalaDDD: number;
    progetto: string;
    nuclei: OspiteNucleo[];
}