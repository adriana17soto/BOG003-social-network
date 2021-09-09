// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import { changeRouter } from './router.js'; 
import { loginCuentaGoogle } from './lib/views/login.js';

const init = () => {
  console.log('holi');
  document.getElementById('root').innerHTML = loginCuentaGoogle();
  window.addEventListener('hashchange', () => {
    myFunction();
    console.log(window.location.hash);
    changeRouter(window.location.hash);
  });
};
window.addEventListener('load', init);
