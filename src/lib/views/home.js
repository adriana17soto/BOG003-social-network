import { closeSession } from '../index.js';

export const home = () => {
  const divHome = document.createElement('div');
  const templateHome = `
    <header id="container">
      <div class="nav">
        <h1>Luminar</h1>
      </div>
      <nav>
        <button id="boton-logout" type="button">Cerrar sesión</button>
        </nav>
    </header>
    <div id="prueba"></div>
    <div id="publicaciones">
      <input type="text" id="publicar" placeholder="¿Qué quieres compartir?" />
      <button id="boton-publicar">Publicar</button>
    </div>
   </div>
    <footer>@Luminar 2021</footer>
  `;

  divHome.innerHTML = templateHome;

  const user = firebase.auth().currentUser;
  console.log(user);

  const pruebaName = divHome.querySelector('#prueba');
  pruebaName.innerHTML = `Hola ${user.displayName}`;

  const logOut = divHome.querySelector('#boton-logout');
  logOut.addEventListener('click', () => {
    closeSession().then(() => {
      window.location.hash = '#/login';
    });
  });

  return divHome;
};
