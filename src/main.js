// Este es el punto de entrada de tu aplicacion
//import {  myFuction } from './lib/index.js';
import { menu } from './lib/views/menu.js';
import { changeRouter } from './router.js';
import { registrar } from './lib/views/Registration.js';
import { home } from './lib/views/home.js';
//import { registrar } from './lib/index.js';

/*const registrarUsuarios = document.getElementById('boton-registrar');
registrarUsuarios.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  registrar(email, password);
});*/
//myFuction();
const init = () => {

  const myFuction = () => {
    document.getElementById('root').innerHTML = menu();
    window.addEventListener('hashchange', () => {
      myFuction();
      console.log(window.location.hash);
      changeRouter(window.location.hash)
    })
  }
  window.addEventListener('load', init)
}

