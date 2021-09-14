import { changeRouter } from './router.js';
import { loginCuentaGoogle } from './lib/views/login.js';

const init = () => {
  document.getElementById('root').appendChild(loginCuentaGoogle());
  changeRouter(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeRouter(window.location.hash);
  });
};
window.addEventListener('load', init);