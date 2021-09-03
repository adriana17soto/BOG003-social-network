// Este es el punto de entrada de tu aplicacion
//import {  myFuction } from './lib/index.js';
import { menu } from './lib/views/menu.js';
import { myFunction } from './lib/index.js';
import { changeRouter } from './router.js';

import { home } from './lib/views/home.js';
//import { registrar } from './lib/index.js';



//myFuction();
const init = () => {

    document.getElementById('root').innerHTML = menu();
 
    window.addEventListener('hashchange', () => {
      myFunction();
      console.log(window.location.hash);
      changeRouter(window.location.hash)
    })
  }
  window.addEventListener('load', init)


