import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './szervermuveletek.ts'
import './kliensmuveletek.ts'



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
       
}
