//import { cerrar } from "./configureFirebase.js";

export const home = () => {
  const divHome = document.createElement('div');
  const templateHOme = `
    <h1>
      Hola mundirijillo
    </h1>
    <button id="boton-cerrar" onclick = "cerrar()">cerrar sesion</button>
    `;
  divHome.innerHTML = templateHOme;
  return divHome;

 
  
  
  
};
