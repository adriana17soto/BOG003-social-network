import { login } from './configureFirebase.js';

export const loginCuentaGoogle = () => {
  const divlogin = document.createElement('div');
  const templateGoogle = `
  <input type="email" id="email" placeholder="Correo Electrónico" />
  <input type="password" id="password" placeholder="Contraseña" />
  <button id="boton-google">Ingresar con Google</button>
  `;

  divlogin.innerHTML = templateGoogle;
  /* setTimeout(() => { */
  const registrarUsuarios = divlogin.querySelector('#boton-google');
  registrarUsuarios.addEventListener('click', () => {
    login();
  });

  /* }, 1000); */
  return divlogin;
};
