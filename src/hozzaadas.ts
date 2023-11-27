import { Event } from "./Event";
//import { AllEvents } from "./Event";

//Sok mindent helyre kéne tenni!!!!!!
//Lehet elrontottam az egészed de a feltöltés működik

document.getElementById('buttonAdd')!.addEventListener('click',addNewEvent);



async function addNewEvent() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;
    const timeInput = document.getElementById('time') as HTMLInputElement;
    const allDayCheckbox = document.getElementById('allDay') as HTMLInputElement;
    const prioritySelect = document.getElementById('priority') as HTMLSelectElement;
    const detailsInput = document.getElementById('details') as HTMLInputElement;
    const reminderInput = document.getElementById('reminder') as HTMLInputElement;
//validácio

    const name = nameInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const allDay = allDayCheckbox.checked;//Már nem False minden esetben
    const priority = prioritySelect.value;
    const details = detailsInput.value;
    const reminder = reminderInput.value
//ha üresenhagyod meghalsz
    if (name.trim() === '') {
        alert('Az esemény nevének kitöltése kötelező.');
        return; 
    }
//egész napos e csóró
    if (allDay) {
        timeInput.value = '00:00';
    } else if (time === '') {
        alert('Az idő mező kitöltése kötelező, kivéve, ha az esemény egész napos.');
        return; 
    }
//dátum validáció
    const currentDate = new Date();
    const eventDate = new Date(date);
    if (reminder !== '' && new Date(reminder) >= currentDate) {
        alert('Az emlékeztető csak a jelenlegi dátum előtti dátum lehet.');
        return; // 
    }
   
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