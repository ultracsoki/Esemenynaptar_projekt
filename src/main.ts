/**
 * @module main
 */
/**
 * Importálja a CSS stíluslapokat és a Bootstrap keretrendszert.
 */
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
/**
 * Importálja a szerver és kliens műveleteket tartalmazó modulokat.
 */
import './szervermuveletek.ts'
import './kliensmuveletek.ts'

/**
 * Az alkalmazás inicializálását végző függvény, amely a DOMContentLoaded eseményre van feliratkozva.
 * Az esemény során letölti az eseményeket a szerverről.
 * @async
 * @returns {Promise<void>} - Az inicializáció eredményét jelző Promise objektum.
 */

 document.addEventListener('DOMContentLoaded',init);
/**
 * Az alkalmazás inicializálását végző függvény. Letölti az eseményeket a szerverről és logolja a válasz státuszát és az "ok" állapotát.
 * Ha a letöltés során hiba történik, kivételt dob.
 * @async
 * @throws {Error} - Hiba történt a letöltés közben.
 * @returns {Promise<void>} - Az inicializáció eredményét jelző Promise objektum.
 */
export async function init()
{
    let eredmeny = await fetch('https://retoolapi.dev/dFqFgC/data');
    console.log(eredmeny.status);
    console.log(eredmeny.ok);
    if(!eredmeny.ok)
    {
         throw new Error('Hiba történt a letöltés közben.');
    }
       
}
