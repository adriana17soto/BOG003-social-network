// Este es el punto de entrada de tu aplicacion

import { registrar } from './lib/index.js';

const registrarUsuarios = document.getElementById('boton-registrar');
registrarUsuarios.addEventListener('click', () => {
  registrar();
});
