import { closeSession, createpost, getPost, DeletePosts, removeLikes, updateLikes,getPosts } from '../index.js';


export const home = () => {
  const divHome = document.createElement('div');
  const templateHome = `
    <header id="container">
      <div class="nav">
        <h1>Luminar</h1>
        <button id="boton-close" type="button">Cerrar sesión</button>
      </div>      
    </header>
    <div id="text-name"></div>
    <div id="publicaciones">
      <textarea rows="5" cols="10" id="publicar" placeholder="¿Qué quieres compartir?" required >
      </textarea>
      <img  id="boton-publicar" src="./lib/views/img/publicar1.png" alt="">
    </div> 
    <div id="container-posts"></div>
   </div>
   <div id="publication-container"></div>
    <footer>@Luminar 2021</footer>
  `;
  divHome.innerHTML = templateHome;

  const user = firebase.auth().currentUser;
  let editStatus = false;
  let postId = '';
  const inPosts = divHome.querySelector('#publicar');
  // console.log(user);

  const close = divHome.querySelector('#boton-close');
  close.addEventListener('click', () => {
    closeSession().then(() => {
      window.location.hash = '#/login';
    });
  });
  // text-name muestra el nombre del usuario
  const textName = divHome.querySelector('#text-name');
  textName.innerHTML = `Bienvenida ${user.displayName}`;

  // empieza el evento publicar
  const inputPost = divHome.querySelector('#boton-publicar');
  const id = firebase.auth().currentUser.uid;
  inputPost.addEventListener('click', async () => {
    const textcontent = document.getElementById('publicar').value;
    console.log(textcontent);
    const nameUs = firebase.auth().currentUser.displayName;

    // publicar comentario no vacio
    if (textcontent === '' || textcontent === ' ') {
      divHome.querySelector('#publicar').value = '';
      console.log('hola escribe algo');
    } else {
      await createpost(textcontent, id, nameUs);
      getPost();
      divHome.querySelector('#publicar').value = '';
      console.log('todo esta ok');
    }
  });

  // obterner los post en tiempo real
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
      <div id = "icon-content">    
        ${id === doc.data().userId ? `
        <img data-id="${conta.id}" id="edit" class="edit-btn" src="./lib/views/img/editar.png" alt="">
        <img data-id="${conta.id}" id="delete" class="delete-btn" src="./lib/views/img/eliminar.png" alt=""> ` : ''}
        <img data-id="${conta.id}" id="like" class="like-btn" src="./lib/views/img/like.png" alt="">
        <div id=num-likes class="-likes-count"> ${doc.data().likes.length}</div>   
      </div>
      </div>
      `;
      // aqui empieza la funcion para darle likes a los comentatios
      const btnlike = divHome.querySelectorAll('.like-btn');
      btnlike.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const comePost = await getPosts(e.target.dataset.id);
          const like = comePost.data().likes;
          if (like.includes(id)) {
            removeLikes(id, e.target.dataset.id);
            console.log(like);
          } else {
            updateLikes(id, e.target.dataset.id);
            console.log(like);
          }
        });
      });
      // boton eliminar funcionalidad ok
      const btnDelete = divHome.querySelectorAll('.delete-btn');
      btnDelete.forEach((btn) => {
        // se va acrear el modal
        btn.addEventListener('click', async (e) => {
          await DeletePosts(e.target.dataset.id);
        });
      });
      // funcionalidad editar post
      const btnEdit = divHome.querySelectorAll('.edit-btn');
      btnEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const docPost = await getPosts(e.target.dataset.id);
          inPosts.value = docPost.data().content;
          // editStatus = true;
          // postId = docPost.id;

          console.log(docPost.data());
        });
      });
    });
  });

  return divHome;
};

function transformDate(date) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const fecha = new Date(date);
  const year = fecha.getFullYear();
  const month = fecha.getMonth();
  const day = fecha.getDate();
  const hour = fecha.getHours();
  const minute = fecha.getMinutes();

  return year + '/' +months[month]+ '/' + day+ '  '+ hour + ':' + minute;
}
