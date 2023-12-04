import { updateEvent } from "./szervermuveletek";
import { Event } from "./Event";

let id = 0;
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
    id = parseInt(params.get('id')!);
    nev = params.get('nev')!;
    datum = params.get('datum')!;
    ido = params.get('ido')!;
    prioritas = params.get('prioritas')!;
    emlekezteto = params.get('emlekezteto')!;
    reszletek = params.get('reszletek')!;

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
        egesznapos = false;
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
    nev = (document.getElementById('nameModify') as HTMLInputElement).value;
    datum = (document.getElementById('dateModify') as HTMLInputElement).value;
    ido = (document.getElementById('timeModify') as HTMLInputElement).value;
    prioritas = (document.getElementById('priorityModify') as HTMLInputElement).value;
    emlekezteto = (document.getElementById('reminderModify') as HTMLInputElement).value;
    reszletek = (document.getElementById('detailsModify') as HTMLInputElement).value;
    updateEvent(id.toString(),new Event(id,nev,datum,ido,egesznapos,prioritas,emlekezteto,reszletek));
    
    //window.open("https://localhost:5173/esemenyek.html");
    //location.reload("https://localhost:5173/esemenyek.html");

    //window.location.href = "http://localhost:5173/esemenyek.html";
    //window.close();
});
