import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './hozzaadas.ts'
import { Event } from './Event.ts'


document.addEventListener('DOMContentLoaded',init);

async function init()
{
    let eredmeny = await fetch('https://retoolapi.dev/dFqFgC/data');
    console.log(eredmeny.status);
    console.log(eredmeny.ok);
    if(!eredmeny.ok)
    {
         throw new Error('Hiba történt a letöltés közben.');
    }
    let tartalom = await eredmeny.json() as Event[];
    const addButton = document.getElementById('buttonAdd');
            addButton!.addEventListener('click', addNewEvent);
}
async function addNewEvent() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;
    const timeInput = document.getElementById('time') as HTMLInputElement;
    const allDayCheckbox = document.getElementById('allDay') as HTMLInputElement;
    const prioritySelect = document.getElementById('priority') as HTMLSelectElement;
    const detailsInput = document.getElementById('details') as HTMLInputElement;
    const reminderInput = document.getElementById('reminder') as HTMLInputElement;

    const name = nameInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const allDay = allDayCheckbox.checked;//Már nem False minden esetben
    const priority = prioritySelect.value;
    const details = detailsInput.value;
    const reminder = reminderInput.value

    const newEvent = new Event(0, name, date, time, allDay, priority, reminder, details); // EMBER A SZERVER ADJA AZ ID-t

    const response = await fetch('https://retoolapi.dev/dFqFgC/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
    });

    /*if (response.ok) {
        console.log('Az esemény hozzáadva a szerverhez.');
    } else {
        console.error('Hiba történt az esemény hozzáadása közben.');
    }*/
}