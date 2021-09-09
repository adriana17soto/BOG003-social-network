import { home } from './lib/views/home.js';
import { registrar } from './lib/views/registration.js';
import { loginCuentaGoogle } from './lib/views/login.js';

export const changeRouter = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = '';

  switch (hash) {
    case '#/':
      console.log('hola');
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
/*export const changeRouter = (hash) => {
  console.log(hash);
  if (hash === '#/') {
    showTemplate(hash);
  } else if (hash === '#/registration') {
    showTemplate(hash);
  } else if (hash === '#/home') {
    showTemplate(hash);
  } else {
    showTemplate(hash);
  }
};*/
