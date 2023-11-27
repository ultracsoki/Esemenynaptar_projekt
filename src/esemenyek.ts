import { Event } from "./Event";

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
        console.error('Hiba történt a letöltés közben:');
    }
}

function renderEventList(eventList: Event[]) {
    const eventListContainer = document.getElementById('eventList');
    if (!eventListContainer) {
        console.error('A "eventList" elem nem található a DOM-ban.');
        return;
    }

    eventListContainer.innerHTML = '';

    
    eventList.forEach((event) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';

       
        eventElement.innerHTML = `
            <strong>${event.nev}</strong><br>
            Dátum: ${event.datum}<br>
            Idő: ${event.ido}<br>
            Prioritás: ${event.prioritas}<br>
            Emlékeztető: ${event.emlekezteto}<br>
            Részletek: ${event.reszletek}<br>
            <hr>
        `;

        eventListContainer.appendChild(eventElement);
    });
}
