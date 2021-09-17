import { loginCuentaGoogle } from './lib/views/login.js';
import { registrar } from './lib/views/registration.js';
import { home } from './lib/views/home.js';

export const changeRouter = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
      containerRoot.appendChild(loginCuentaGoogle());
      break;
    case '#/login':
      containerRoot.appendChild(loginCuentaGoogle());
      break;
    case '#/registration':
      containerRoot.appendChild(registrar());
      break;
    case '#/home':
      containerRoot.appendChild(home());
      break;
    default:
      containerRoot.innerHTML = `
      <h2>
        No existe
      </h2>
      `;
  }
};
