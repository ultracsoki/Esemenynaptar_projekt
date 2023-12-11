/**
 * Az események kezeléséhez szükséges függvények és eseménykezelők.
 */
import { Event } from "./Event";
import { validacio } from "./validacio";
 /**
 * Az "Add" gomb eseménykezelője. Hozzáad egy új eseményt a szerverhez.
 */
const elem = document.getElementById('buttonAdd');
elem?.addEventListener('click', addNewEvent);
/**
 * Az "All Day" checkbox eseménykezelője. Beállítja az időinputot a "00:00" értékre vagy engedélyezi a szerkesztést.
 */
const elem2 = document.getElementById('allDay');
elem2?.addEventListener('click', egeszNaposParamNelkul);
/**
 * Az időinputot kezeli, beállítja a "00:00" értékre vagy engedélyezi a szerkesztést.
 * @param {string} timeInput - Az időinput elem azonosítója.
 */
function egeszNaposParamNelkul()
{
    egeszNapos('time');
}
/**
 * Beállítja az időinputot a "00:00" értékre vagy engedélyezi a szerkesztést.
 * @param {string} timeInput - Az időinput elem azonosítója.
 * @returns {void}
 */

export function egeszNapos(timeInput: string) {
    if ((document.getElementById(timeInput)! as HTMLInputElement).disabled == false) {
        (document.getElementById(timeInput)! as HTMLInputElement).disabled = true;
        (document.getElementById(timeInput)! as HTMLInputElement).value = "00:00";
    }
    else {
        (document.getElementById(timeInput)! as HTMLInputElement).disabled = false;
    }

}
/**
 * Az új esemény hozzáadását kezelő függvény.
 * @async
 * @returns {Promise<void>} - Az esemény hozzáadás eredményét jelző Promise objektum.
 */
export async function addNewEvent() {
    const nameInput = (document.getElementById('name') as HTMLInputElement).value;
    const dateInput = (document.getElementById('date') as HTMLInputElement).value;
    let timeInput = (document.getElementById('time') as HTMLInputElement).value;
    const allDayCheckbox = (document.getElementById('allDay') as HTMLInputElement).checked;
    const prioritySelect = (document.getElementById('priority') as HTMLSelectElement).value
    const detailsInput = (document.getElementById('details') as HTMLInputElement).value;
    const reminderInput = (document.getElementById('reminder') as HTMLInputElement).value;

    try {
         // Validáció meghívása az inputok ellenőrzésére.
        validacio(nameInput,dateInput,timeInput,allDayCheckbox,reminderInput);
    } catch (error) {
          // Hiba esetén a validáció megszakítja az esemény hozzáadását.
        return;
    }
// Új esemény létrehozása az inputokból.
    const newEvent = new Event(0, nameInput, dateInput, timeInput, allDayCheckbox, prioritySelect, reminderInput, detailsInput); // EMBER A SZERVER ADJA AZ ID-t
 // Szerverrel történő kommunikáció a fetch API segítségével.
    const response = await fetch('https://retoolapi.dev/dFqFgC/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
    });
// Az esemény hozzáadásának eredményének kezelése.
    if (response.ok) {
        (document.getElementById('name') as HTMLInputElement).value = "";
        (document.getElementById('date') as HTMLInputElement).value = "";
        (document.getElementById('time') as HTMLInputElement).value = "";
        (document.getElementById('allDay') as HTMLInputElement).checked = false;
        (document.getElementById('priority') as HTMLInputElement).value = "";
        (document.getElementById('details') as HTMLInputElement).value = "";
        (document.getElementById('reminder') as HTMLInputElement).value = "";
        alert('Az esemény hozzáadva a szerverhez.');
    } else {
        alert('Hiba történt az esemény hozzáadása közben.');
    }

}

