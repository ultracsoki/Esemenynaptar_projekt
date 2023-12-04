
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
    
});
