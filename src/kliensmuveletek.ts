import { Event } from "./Event";

document.getElementById('buttonAdd')!.addEventListener('click', addNewEvent);
document.getElementById('allDay')!.addEventListener('input', egeszNaposParamNelkul);

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

    
    if (nameInput.trim() === '') {
        alert('Az esemény nevének kitöltése kötelező.');
        return;
    }
    //dátum nem lehet 0
    if (dateInput.toString() == "") {
        alert('Az esemény dátumának kitöltése kötelező.');
        return;
    }
    //egész napos e 
    if (allDayCheckbox) {
        timeInput = '00:00';
    } else if (timeInput === '') {
        alert('Az idő mező kitöltése kötelező, kivéve, ha az esemény egész napos.');
        return;
    }
    //dátum validáció
    if (reminderInput != '' && reminderInput > dateInput) {
        alert('Az emlékeztető csak a jelenlegi dátum előtti dátum lehet.');
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

