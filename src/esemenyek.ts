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

    
 
    let cardElement = document.getElementById('eventList')!;
    eventList.forEach((event) => {

        eventList.sort((a,b) => {
            return parseInt(a.datum) - parseInt(b.datum);
        });

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
            <div class="card-body ${cardBodyClass}">
            <h5 class="card-title">${event.nev}</h5>
                <p class="card-text">Dátum: ${event.datum}</p>
                <p class="card-text">Idő: ${event.ido}</p>
                <p class="card-text">Prioritás: ${event.prioritas}</p>
                <p class="card-text">Emlékeztető: ${event.emlekezteto}</p>
                <p class="card-text">Részletek: ${event.reszletek}</p>
                <button class="btn btn-primary delete-button" data-id="${event.id}">Törlés</button>
                <button class="btn btn-primary modify-button" data-id="${event.id}">Módosítás</button>
            </div>
        </div>
        `;
    });
}//<--ha kikommenteled akkor ezt tavolitssd el
   /* document.body.appendChild(cardElement);

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

   
}

async function deleteEvent(eventId: string | null) {
    try {
        // nem e null az id
        if (eventId === null) {
            console.error('Az esemény azonosítója null értékű.');
            return;
        }

        const response = await fetch(`https://retoolapi.dev/dFqFgC/data${eventId}`, {
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
}*/

