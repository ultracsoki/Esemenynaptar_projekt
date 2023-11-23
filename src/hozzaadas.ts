import { Event } from "./Event";
//import { AllEvents } from "./Event";


document.getElementById('buttonAdd')!.addEventListener('click',hozzaAd);

function hozzaAd()
{
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const time = (document.getElementById('time') as HTMLInputElement).value;
    const allDay = (Boolean)((document.getElementById('allDay') as HTMLInputElement).checked);
    const reminder = (document.getElementById('reminder') as HTMLInputElement).value;
    const priority = (document.getElementById('priority') as HTMLInputElement).value;
    const details = (document.getElementById('details') as HTMLInputElement).value;

    //Validáció

    const newEvent = new Event(0,name,date,time,allDay,reminder,priority,details);
    console.log(newEvent);
    alert("Sikeresen Hozzáadtad")
}