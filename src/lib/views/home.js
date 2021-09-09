 import { cerrar } from "./configureFirebase.js";
// import { login } from './configureFirebase.js';
// import { changeRouter } from "";

export const home = () => {
  const divHome = document.createElement('div');
  const templateHOme = `
  <header id="container">
    <div class="nav">
      <h1>Luminar</h1>

    </div>
  </header>
    <h1>
      Hola mundirijillo
    </h1>
    <button id="boton-cerrar">cerrar sesion</button>
    `;
  divHome.innerHTML = templateHOme;
  const cerrarSesion = divHome.querySelector('#boton-cerrar');
  cerrarSesion.addEventListener('click', () => {
    // console.log('home1', window.location.hash);
    cerrar();
    window.location.hash = '#/';
    // changeRouter('#/');
  });

  return divHome;
};
