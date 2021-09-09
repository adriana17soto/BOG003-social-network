import { cerrar } from "./configureFirebase.js";

export const home = () => {
  const divHome = document.createElement('div');
  const templateHOme = `
    <h1>
      Hola mundirijillo
    </h1>
    <button id="boton-cerrar">cerrar sesion</button>
    `;
  divHome.innerHTML = templateHOme;


 // setTimeout(() => {  
    const cerrarUsuarios = divHome.querySelector('#boton-cerrar');
    cerrarUsuarios.addEventListener('click', () => {
      window.location.hash = "#/"
     cerrar();
    });
 // }, 1000);
    return divHome;
};