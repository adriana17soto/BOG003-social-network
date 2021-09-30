import { changeRouter } from './router.js';// importa la funcion changerouter
import { loginCuentaGoogle } from './lib/views/login.js';// se importa login cuenta vista default

// se crea la funcion init
// que identifica al elemento root y lo muestra mediante el metodo appenchild
const init = () => {
  document.getElementById('root').appendChild(loginCuentaGoogle());
  // se llama a la funcion changerouter con el parametro
  // windows.location que es un objeto que trae la ruta actual en la ventana en que se encuentra
  changeRouter(window.location.hash);
  // cuando la ventana escucha el evento de cambio ejecuta
  // la funcion changerouter pasando el parametro de window location
  window.addEventListener('hashchange', () => {
    changeRouter(window.location.hash);
  });
};
// con elvento de carga inicie la funcion init
window.addEventListener('load', init);
