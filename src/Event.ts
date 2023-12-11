/**
 * Az események tulajdonságait leíró osztály
 */
export class Event {
    /**
      * Az esemény id-ja.
      * @type {number}
      */
    id: number;
    /**
     * Az esemény teljes neve.
     * @type {string}
     */
    nev: string;
    /**
    * Az esemény dátuma.
    * @type {string}
    */
    datum: string;
    /**
    * Az esemény időpontja.
    * @type {string}
    */
    ido: string;
    /**
     * Megadja, hogy az esemény egész napos-e.
     * @type {boolean}
     */
    egeszNapos: boolean;
    /**
    * Az esemény prioritása.
    * @type {string}
    */
    prioritas: string;
    /**
    * Az eseményre vonatkozó emlékeztető.
    * @type {string}
    */
    emlekezteto: string;
    /**
   * Az esemény részletei.
   * @type {string}
   */
    reszletek: string;

    /**
    * Konstruktor az Event osztály inicializálásához.
    * @param {number} id - Az esemény id-ja.
    * @param {string} nev - Az esemény teljes neve.
    * @param {string} datum - Az esemény dátuma.
    * @param {string} ido - Az esemény időpontja.
    * @param {boolean} egeszNapos - Megadja, hogy az esemény egész napos-e.
    * @param {string} prioritas - Az esemény prioritása.
    * @param {string} emlekezteto - Az eseményre vonatkozó emlékeztető.
    * @param {string} reszletek - Az esemény részletei.
    */
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
