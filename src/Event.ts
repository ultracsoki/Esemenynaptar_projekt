export class Event {
    id: number;
    nev: string;
    datum: string;
    ido: string;
    egeszNapos: boolean;
    prioritas: string;
    emlekezteto: string;
    reszletek: string;

    constructor(id: number, nev: string, datum: string, ido: string, egeszNapos: boolean, prioritas: string, emlekezteto: string, reszletek: string) {
        this.id = id;
        this.nev = nev;
        this.datum = datum;
        this.ido = ido;
        this.egeszNapos = egeszNapos;
        this.prioritas = prioritas;
        this.emlekezteto = emlekezteto;
        this.reszletek = reszletek;
    }
}
