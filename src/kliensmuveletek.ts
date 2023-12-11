import { Event } from "./Event";
import { validacio } from "./validacio";
/*
document.getElementById('buttonAdd')!.addEventListener('click', addNewEvent);
document.getElementById('allDay')!.addEventListener('input', egeszNaposParamNelkul);
*/
const elem = document.getElementById('buttonAdd');
elem?.addEventListener('click', addNewEvent);
const elem2 = document.getElementById('allDay');
elem2?.addEventListener('click', egeszNaposParamNelkul);
function egeszNaposParamNelkul()
{
    egeszNapos('time');
}

export function egeszNapos(timeInput: string) {
    if ((document.getElementById(timeInput)! as HTMLInputElement).disabled == false) {
        (document.getElementById(timeInput)! as HTMLInputElement).disabled = true;
        (document.getElementById(timeInput)! as HTMLInputElement).value = "00:00";
    }
    else {
        (document.getElementById(timeInput)! as HTMLInputElement).disabled = false;
    }

}

async function addNewEvent() {
    const nameInput = (document.getElementById('name') as HTMLInputElement).value;
    const dateInput = (document.getElementById('date') as HTMLInputElement).value;
    let timeInput = (document.getElementById('time') as HTMLInputElement).value;
    const allDayCheckbox = (document.getElementById('allDay') as HTMLInputElement).checked;
    const prioritySelect = (document.getElementById('priority') as HTMLSelectElement).value
    const detailsInput = (document.getElementById('details') as HTMLInputElement).value;
    const reminderInput = (document.getElementById('reminder') as HTMLInputElement).value;

    try {
        validacio(nameInput,dateInput,timeInput,allDayCheckbox,reminderInput);
    } catch (error) {
        return;
    }

    const newEvent = new Event(0, nameInput, dateInput, timeInput, allDayCheckbox, prioritySelect, reminderInput, detailsInput); // EMBER A SZERVER ADJA AZ ID-t

    const response = await fetch('https://retoolapi.dev/dFqFgC/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
    });

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

