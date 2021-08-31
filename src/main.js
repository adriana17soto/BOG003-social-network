// Este es el punto de entrada de tu aplicacion

import { registrar } from './lib/index.js';

const registrarUsuarios = document.getElementById('boton-registrar');
registrarUsuarios.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  registrar(email, password);
  
});
