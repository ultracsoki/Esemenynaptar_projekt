import { Event } from './Event';
 
document.addEventListener('DOMContentLoaded', displayAllEvents);
 
async function displayAllEvents() {
    try {
        const response = await fetch('https://retoolapi.dev/dFqFgC/data');
        if (!response.ok) {
            throw new Error('Hiba történt a letöltés közben.');
        }
 
        const events = await response.json();
 
        if (events && Array.isArray(events)) {
            renderEventList(events);
        } else {
            console.error('Hibás válasz a szerverről.');
        }
    } catch (error) {
        console.error('Hiba történt a letöltés közben:', );
    }
}
 
function renderEventList(eventList: Event[]) {
    const eventListContainer = document.getElementById('eventList');
    if (!eventListContainer) {
        console.error('A "eventList" elem nem található a DOM-ban.');
        return;
    }
 
   
    eventListContainer.innerHTML = '';
    
    //EventList sorbarendezése idő szerint
    eventList.sort((a,b) => {
        return a.datum.localeCompare(b.datum);
    });
 
    let cardElement = document.getElementById('eventList')!;
    eventList.forEach((event) => {

        

        let cardBodyClass = "card-body";
        
        
        if(event.prioritas == "Magas")
        {
            cardBodyClass = "card-body piros";
        }
        else if(event.prioritas == "Közepes")
        {
            cardBodyClass = "card-body sarga";
        }
        else if(event.prioritas == "Alacsony")
        {
            cardBodyClass = "card-body zold";
        }

        cardElement.innerHTML += `
        <div class="card">
            <div class="card-body ${cardBodyClass}" id="tbody">
            <h5 class="card-title">${event.nev}</h5>
                <p class="card-text">Dátum: ${event.datum}</p>
                <p class="card-text">Idő: ${event.ido}</p>
                <p class="card-text">Egész napos: ${(event.egeszNapos) ? "✓" : "✘"}</p>
                <p class="card-text">Prioritás: ${event.prioritas}</p>
                <p class="card-text">Emlékeztető: ${event.emlekezteto}</p>
                <p class="card-text">Részletek: ${event.reszletek}</p>
                <button class="btn btn-primary delete-button" data-id="${event.id}">Törlés</button>
                <button class="btn btn-primary modify-button" data-id="${event.id}">Módosítás</button>
            </div>
        </div>
        `;
    });
//}//<--ha kikommenteled akkor ezt tavolitssd el
    document.body.appendChild(cardElement);

    //Elemek törlése
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            //hasonlo mint az alert csak itt vannak gombok
            const confirmDelete = window.confirm('Biztosan törölni szeretné ezt az eseményt?');

            if (confirmDelete) {
                const eventId = button.getAttribute('data-id');
                deleteEvent(eventId);
            }
        });
    });

    //Elemek módosítása
    const modifyButtons = document.querySelectorAll('.modify-button');
    for (let i = 0; i < modifyButtons.length; i++) {
        const button = modifyButtons[i];
        button.addEventListener('click', () => {
            const nev = eventList[i].nev;
            const datum = eventList[i].datum;
            const ido = eventList[i].ido;
            const egeszNapos = eventList[i].egeszNapos;
            const prioritas = eventList[i].prioritas;
            const emlekezteto = eventList[i].emlekezteto;
            const reszletek = eventList[i].reszletek;

            const url = `http://localhost:5173/modositas.html?nev=${encodeURIComponent(nev)}&datum=${encodeURIComponent(datum)}&ido=${encodeURIComponent(ido)}&egeszNapos=${encodeURIComponent(egeszNapos)}&prioritas=${encodeURIComponent(prioritas)}&emlekezteto=${encodeURIComponent(emlekezteto)}&reszletek=${encodeURIComponent(reszletek)}`;

            window.open(url, "_blank");
        });
    }

   
}

async function deleteEvent(eventId: string | null) {
    try {
        // nem e null az id
        if (eventId === null) {
            console.error('Az esemény azonosítója null értékű.');
            return;
        }

        const response = await fetch(`https://retoolapi.dev/dFqFgC/data/${eventId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Hiba történt az esemény törlése közben.');
        }

        // Frissites torles utan
        displayAllEvents();
    } catch (error) {
        console.error('Hiba történt az esemény törlése közben:', error);
    }
}

