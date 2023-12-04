import { updateEvent } from "./szervermuveletek";
import { Event } from "./Event";

let id = "";
let eventId = 0;
let nev = "";
let datum = "";
let egesznapos : boolean = false;
let ido = "";
let prioritas = "";
let emlekezteto = "";
let reszletek = "";

//Módosítás gombra történő kattintáskor
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Értékek megkapása
    nev = params.get('nev')!;
    datum = params.get('datum')!;
    ido = params.get('ido')!;
    prioritas = params.get('prioritas')!;
    emlekezteto = params.get('emlekezteto')!;
    reszletek = params.get('reszletek')!;
    eventId = parseInt(params.get('id')!);
    //id = 

    // Adatok betöltése megfelelő helyre
    const dateName = document.getElementById('nameModify') as HTMLInputElement;
    dateName.value = nev;
    const dataDate = document.getElementById('dateModify') as HTMLInputElement;
    dataDate.value = datum;
    const dataTime = document.getElementById('timeModify') as HTMLInputElement;
    dataTime.value = ido;
    const dataAllday = document.getElementById('allDayModify') as HTMLInputElement;
    if (ido == "00:00") {
        dataAllday.checked = true;
        (document.getElementById('timeModify')! as HTMLInputElement).disabled = true;
        egesznapos = true;
    }
    else {
        dataAllday.checked = false;
    }
    const dataPriority = document.getElementById('priorityModify') as HTMLInputElement;
    dataPriority.value = prioritas;
    const dataReminder = document.getElementById('reminderModify') as HTMLInputElement;
    dataReminder.value = emlekezteto;
    const dataDetails = document.getElementById('detailsModify') as HTMLInputElement;
    dataDetails.value = reszletek;
}
);

document.getElementById('buttonModify')!.addEventListener('click',() => {
    updateEvent(id,new Event(eventId,"Bukarest",datum,ido,egesznapos,prioritas,emlekezteto,reszletek));
});
