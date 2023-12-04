import { Event } from "./Event";

document.getElementById('buttonAdd')!.addEventListener('click', addNewEvent);
document.getElementById('allDay')!.addEventListener('input', egeszNapos);

function egeszNapos() {
    if ((document.getElementById('time')! as HTMLInputElement).disabled == false) {
        (document.getElementById('time')! as HTMLInputElement).disabled = true;
        (document.getElementById('time')! as HTMLInputElement).value = "00:00";
    }
    else {
        (document.getElementById('time')! as HTMLInputElement).disabled = false;
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

    validacio(nameInput,dateInput,timeInput,allDayCheckbox,prioritySelect,detailsInput,reminderInput);

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

function validacio(nameInput: string, dateInput: string, timeInput: string, allDayCheckbox: boolean, prioritySelect: string, detailsInput: string, reminderInput: string)
{
    //ha üresenhagyod meghalsz
    if (nameInput.trim() === '') {
        alert('Az esemény nevének kitöltése kötelező.');
        return;
    }
    //dátum nem lehet 0
    if (dateInput.toString() == "") {
        alert('Az esemény dátumának kitöltése kötelező.');
        return;
    }
    //egész napos e csóró
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
}


//Módosítás gombra történő kattintáskor
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Értékek megkapása
    const nev = params.get('nev')!;
    const datum = params.get('datum')!;
    const ido = params.get('ido')!;
    const prioritas = params.get('prioritas')!;
    const emlekezteto = params.get('emlekezteto')!;
    const reszletek = params.get('reszletek')!;

    // Adatok betöltése megfelelő helyre
    const dateName = document.getElementById('name') as HTMLInputElement;
    dateName.value = nev;
    const dataDate = document.getElementById('date') as HTMLInputElement;
    dataDate.value = datum;
    const dataTime = document.getElementById('time') as HTMLInputElement;
    dataTime.value = ido;
    const dataAllday = document.getElementById('allDay') as HTMLInputElement;
    if (ido == "00:00") {
        dataAllday.checked = true;
        (document.getElementById('time')! as HTMLInputElement).disabled = true;
    }
    else {
        dataAllday.checked = false;
    }
    const dataPriority = document.getElementById('priority') as HTMLInputElement;
    dataPriority.value = prioritas;
    const dataReminder = document.getElementById('reminder') as HTMLInputElement;
    dataReminder.value = emlekezteto;
    const dataDetails = document.getElementById('details') as HTMLInputElement;
    dataDetails.value = reszletek;
}
);
