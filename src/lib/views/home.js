import { closeSession, createpost, getPost } from '../index.js';

export const home = () => {
  const divHome = document.createElement('div');
  const templateHome = `
    <header id="container">
      <div class="nav">
        <h1>Luminar</h1>
      </div>
      <nav>
        <button id="boton-close" type="button">Cerrar sesión</button>
        </nav>
    </header>
    <div id="text-name"></div>
    <div id="publicaciones">
      <textarea id="publicar" placeholder="¿Qué quieres compartir?" >
      </textarea>
      <button id="boton-publicar">Publicar</button>
    </div>
    <div id="container-posts"></div>
   </div>
    <footer>@Luminar 2021</footer>
  `;
  divHome.innerHTML = templateHome;

  const user = firebase.auth().currentUser;
  // console.log(user);

  const close = divHome.querySelector('#boton-close');
  close.addEventListener('click', () => {
    closeSession().then(() => {
      window.location.hash = '#/login';
    });
  });

  const textName = divHome.querySelector('#text-name');
  textName.innerHTML = `Bienvenida ${user.displayName}`;

  const inputPost = divHome.querySelector('#boton-publicar');

  inputPost.addEventListener('click', async () => {
    const textcontent = document.getElementById('publicar').value;
    console.log(textcontent);
    const id = firebase.auth().currentUser.uid;
    const nameUs = firebase.auth().currentUser.displayName;

    await createpost(textcontent, id, nameUs)
      .then((docRef) => {
        // getPost();
        divHome.querySelector('#publicar').value = '';
        console.log('Document written with ID: ', docRef.id);
        console.log('el post fue creado con exito');
      })
      .catch((error) => {
        alert('Lo sentimos no pudimos agregar tu post, intenta de nuevo');
        divHome.querySelector('#publicar').value = '';
        console.error('Error adding document: ', error);
      });
    // console.log(view);
  });

  getPost().onSnapshot((response) => {
    response.forEach((doc) => {
   console.log(doc);
    });
  });

  return divHome;
};
