/**
 * Validációs függvényeket tartalmazó modul.
 * @module validacio
 */

/**
 * Ellenőrzi az esemény adatainak validitását.
 * @param {string} nev - Az esemény neve.
 * @param {string} datum - Az esemény dátuma.
 * @param {string} ido - Az esemény időpontja.
 * @param {boolean} egesznapos - Igaz, ha az esemény egész napos, egyébként hamis.
 * @param {string} emlekezteto - Az esemény emlékeztető szövege.
 * @throws {Error} - Hiba, ha az adatok nem megfelelőek.
 */
export function validacio(nev: string, datum: string, ido :string, egesznapos: boolean, emlekezteto: string)
{
    if (nev.trim() === '') {
        alert('Az esemény nevének kitöltése kötelező.');
        throw new Error("Az esemény nevének kitöltése kötelező.");
    }
    //dátum nem lehet 0
    if (datum.toString() == "") {
        alert('Az esemény dátumának kitöltése kötelező.');
        throw new Error("Az esemény dátumának kitöltése kötelező.");
    }
    //egész napos e 
    if (egesznapos) {
        ido = '00:00';
    } else if (ido === '') {
        alert('Az idő mező kitöltése kötelező, kivéve, ha az esemény egész napos.');
        throw new Error("Az idő mező kitöltése kötelező, kivéve, ha az esemény egész napos.");
    }
    //dátum validáció
    if (emlekezteto != '' && emlekezteto > datum) {
        alert('Az emlékeztető csak a jelenlegi dátum előtti dátum lehet.');
        throw new Error("Az emlékeztető csak a jelenlegi dátum előtti dátum lehet.");
    }
}