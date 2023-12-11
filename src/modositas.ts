
/**
 * Importáljuk a szükséges fájlokat
 */
import { updateEvent } from "./szervermuveletek";
import { Event } from "./Event";
import { egeszNapos } from "./kliensmuveletek";
import { validacio } from "./validacio";
/**
 * Globális változók az esemény módosításához
 */
let id = 0;
let nev = "";
let datum = "";
let egesznapos : boolean = false;
let egeszNaposString = "";
let ido = "";
let prioritas = "";
let emlekezteto = "";
let reszletek = "";
/**
 * Eseménykezelő a "All Day" checkboxra történő kattintáskor.
 * Az időinput szerkesztésének engedélyezése vagy tiltása.
 */
document.getElementById('allDayModify')!.addEventListener('click',egeszNaposParamNelkul);
/**
 * Az időinput szerkesztésének engedélyezése vagy tiltása.
 * @returns {void}
 */
export function egeszNaposParamNelkul()
{
    egeszNapos('timeModify');
}
/**
 * Az oldal betöltődésekor futó eseménykezelő.
 * Beállítja a módosítandó esemény adatait a megfelelő helyekre az űrlapon.
 */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Értékek megkapása
    id = parseInt(params.get('id')!);
    nev = params.get('nev')!;
    datum = params.get('datum')!;
    ido = params.get('ido')!;
    prioritas = params.get('prioritas')!;
    emlekezteto = params.get('emlekezteto')!;
    reszletek = params.get('reszletek')!;
    egeszNaposString = params.get('egeszNapos')!;


    // Adatok betöltése megfelelő helyre
    (document.getElementById('nameModify') as HTMLInputElement).value = nev;
    (document.getElementById('dateModify') as HTMLInputElement).value = datum;
    (document.getElementById('timeModify') as HTMLInputElement).value = ido;
    if (egeszNaposString == "true") {
        (document.getElementById('allDayModify') as HTMLInputElement).checked = true;
        (document.getElementById('timeModify')! as HTMLInputElement).disabled = true;
        egesznapos = true;
    }
    else {
        (document.getElementById('allDayModify') as HTMLInputElement).checked = false;
        (document.getElementById('timeModify')! as HTMLInputElement).disabled = false;
        egesznapos = false;
    }
    (document.getElementById('priorityModify') as HTMLInputElement).value = prioritas;
    (document.getElementById('reminderModify') as HTMLInputElement).value = emlekezteto;
    (document.getElementById('detailsModify') as HTMLInputElement).value = reszletek;
}
);
/**
 * Eseménykezelő a "Módosítás" gombra történő kattintáskor.
 * Frissíti az esemény adatait és küldi a módosítást a szerverre.
 */
document.getElementById('buttonModify')!.addEventListener('click',() => {
    nev = (document.getElementById('nameModify') as HTMLInputElement).value;
    datum = (document.getElementById('dateModify') as HTMLInputElement).value;
    ido = (document.getElementById('timeModify') as HTMLInputElement).value;
    prioritas = (document.getElementById('priorityModify') as HTMLInputElement).value;
    emlekezteto = (document.getElementById('reminderModify') as HTMLInputElement).value;
    reszletek = (document.getElementById('detailsModify') as HTMLInputElement).value;
    egesznapos = (document.getElementById('allDayModify') as HTMLInputElement).checked;

    try {
        validacio(nev,datum,ido,egesznapos,emlekezteto);
    } catch (error) {
        return;
    }

    updateEvent(id.toString(),new Event(id,nev,datum,ido,egesznapos,prioritas,emlekezteto,reszletek));
    alert("Esemény sikeresen módosítva");
    window.location.replace("http://localhost:5173/esemenyek.html");
});
