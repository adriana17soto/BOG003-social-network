import { login, ingreso } from './configureFirebase.js';

export const loginCuentaGoogle = () => {
  const divLogin = document.createElement('div');
  const templateGoogle = `
  <header id="container">
    <div class="nav">
      <h1>Luminar</h1>

    </div>
  </header>
  <div > 
  <div id='container-login'>
  <input type="email" id="email" placeholder="Correo Electrónico" />
  <input type="password" id="password" placeholder="Contraseña" />  
  <button id="boton-ingresar"><a href="#/home">Ingresar</a></button>
  <button id="boton-google"><a href="#/home">Ingresar con Google</a></button>
  
  </div>
  <button id="boton-registrarInicial"><a href="#/Registration">Registro</a></button>
  </div>
  `;
  divLogin.innerHTML = templateGoogle;

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
