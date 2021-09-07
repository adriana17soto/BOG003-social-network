import { login } from './configureFirebase.js';

export const loginCuentaGoogle = () => {
  const templateGoogle = `
  <div > 
  <div id='container-login'>
  <input type="email" id="email" placeholder="Correo Electrónico" />
  <input type="password" id="password" placeholder="Contraseña" />  
  <button id="boton-ingresar">Ingresar</button>
  <button id="boton-google">Ingresar con Google</button>  
  </div>
  <button id="boton-registrarInicial"><a href="#/Registration">Registro</a></button>
  </div>
  `;

  setTimeout(() => {
    const registrarUsuarios = document.querySelector('#boton-google');
    registrarUsuarios.addEventListener('click', () => {
      login();
    });
  }, 1000);
  return templateGoogle;
};
