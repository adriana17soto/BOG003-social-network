import { closeSession, createpost, getPost, DeletePosts } from '../index.js';

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
      <img  id="boton-publicar" src="./lib/views/img/publicar1.png" alt="">
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
    // const dataTime = new Date().getTime();
    // const reacDataTime = new Date(dataTime);
    // const timeOk = reacDataTime.toLocaleString();

    await createpost(textcontent, id, nameUs)
      .then((docRef) => {
        getPost();
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
    const containerPosts = divHome.querySelector('#publicar');
    containerPosts.innerHTML = '';
    const divPosts = divHome.querySelector('#container-posts');
    divPosts.innerHTML = '';
    response.forEach((doc) => {
      const conta = doc.data();
      conta.id = doc.id;
      console.log(conta);
      divPosts.innerHTML += ` 
      <div class='card-posts'>
      <h4>${doc.data().userName}</h4>
      <p id='postDescription'>${doc.data().content}</p>
      <p>${transformDate(doc.data().createdAt.toDate())}</p>
      <div>
        <img data-id="${conta.id}" id="edit" class="edit-btn" src="./lib/views/img/editar.png" alt="">
        <img data-id="${conta.id}" id="delete" class="delete-btn" src="./lib/views/img/eliminar.png" alt="">
        <img data-id="${conta.id}" id="like" class="like-btn" src="./lib/views/img/like.png" alt="">
        <img data-id="${conta.id}" id="post" class="post-btn" src="./lib/views/img/compartir.png" alt="">
      </div>
      </div>
      `;

      const btnDelete = divHome.querySelectorAll('.delete-btn');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          console.log(e.target);
          await DeletePosts(e.target.dataset.id);
        });
      });
      console.log(doc);
    });
  });
  /* getPost().get((Response) => {
     Response.forEach((doc) => {
      console.log(doc);
     });
   }); */

  return divHome;
};
function transformDate(date){
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const fecha = new Date(date);
  const year = fecha.getFullYear();
  const month = fecha.getMonth();
  const day = fecha.getDate();

  return year + '/' + months[month] + '/' + day;
}