import { login, ingreso } from './configureFirebase.js';

export const loginCuentaGoogle = () => {
 
  const templateGoogle = `
  <div > 
  <div id='container-login'>
  <input type="email" id="email" placeholder="Correo Electrónico" />
  <input type="password" id="password" placeholder="Contraseña" />  
  <button id="boton-ingresar"><a href="#/home">Ingresar</a></button>
  <button id="boton-google"><a href="#/home">Ingresar con Google</a></button>
  <h2 id="login"></h2>
  </div>
  <button id="boton-registrarInicial"><a href="#/registration">Registro</a></button>
  </div>
  `;
  
  

  setTimeout(() => {

    const ingresoUsuarios = document.querySelector('#boton-ingresar');
    ingresoUsuarios.addEventListener('click', () => {
      ingreso();
    });

    const registrarUsuarios = document.querySelector('#boton-google');
    registrarUsuarios.addEventListener('click', () => {
      login();
    });
  }, 1000);
  return templateGoogle;
};