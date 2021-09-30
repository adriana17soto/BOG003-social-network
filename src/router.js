import { loginCuentaGoogle } from './lib/views/login.js'; // importa la vista de login
import { registrar } from './lib/views/registration.js'; // importa la vista del template registrar
import { home } from './lib/views/home.js'; // importa el template de la vista home

// se crea la funcion changeRouter que recibe como paramtero a hash
export const changeRouter = (hash) => {
  // se crea una constante que identifica a el id root,
  // que permite la visualizacion de las diferentes vistas
  const containerRoot = document.getElementById('root');
  // con la propiedad innerHTML se limpia el contenido del html por algo vacio
  containerRoot.innerHTML = '';
  // se crea la declaracion switch compara el parametro hash con cada uno de los casos
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
