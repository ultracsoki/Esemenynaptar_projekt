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
        //const cardElement = document.createElement('div');
        //cardElement.className = 'card';
        //cardElement.style.width = '18rem';
        
 
        cardElement.innerHTML += `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${event.nev}</h5>
                <p class="card-text">Dátum: ${event.datum}</p>
                <p class="card-text">Idő: ${event.ido}</p>
                <p class="card-text">Prioritás: ${event.prioritas}</p>
                <p class="card-text">Emlékeztető: ${event.emlekezteto}</p>
                <p class="card-text">Részletek: ${event.reszletek}</p>
            </div>
        </div>
        `;
 
        
    });
    console.log(eventList);
    document.body.appendChild(cardElement);
}
 