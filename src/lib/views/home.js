import { closeSession, createpost, getPost, DeletePosts, removeLikes, updateLikes } from '../index.js';

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
  const id = firebase.auth().currentUser.uid;
  inputPost.addEventListener('click', async () => {
    const textcontent = document.getElementById('publicar').value;
    console.log(textcontent);

    const nameUs = firebase.auth().currentUser.displayName;
    // const dataTime = new Date().getTime();
    // const reacDataTime = new Date(dataTime);
    // const timeOk = reacDataTime.toLocaleString();

    // publicar comentrio con contenido
    if (textcontent === '' || textcontent === ' ') {
      divHome.querySelector('#publicar').value = '';
      console.log('hola escribe algo');
    } else {
      await createpost(textcontent, id, nameUs);
      getPost();
      divHome.querySelector('#publicar').value = '';
      console.log('todo esta ok');
    }

    // comente esta  promesa para sustituirla por publicar un cometario con contenido

    // getPost();
    /* .then((docRef) => {
        getPost();
        divHome.querySelector('#publicar').value = '';
        console.log('Document written with ID: ', docRef.id);
        console.log('el post fue creado con exito');
      })
      .catch((error) => {
        alert('Lo sentimos no pudimos agregar tu post, intenta de nuevo');
        divHome.querySelector('#publicar').value = '';
        console.error('Error adding document: ', error);
      }); */
    // console.log(view);
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
        <div id=num-likes class="-likes-count"> </div>       
        
      </div>
      </div>
      `;
      const btnlike= divHome.querySelectorAll('.like-btn');
      btnlike.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const comePost = await getPost(e.target.dataset.id);
          const like = comePost.data().likes;
          console.log(like);
          /* if (like.incluides(id)) {
            removeLikes(id, e.target.dataset.id);
            console.log('dislike');
          } else {
            updateLikes(id, e.target.dataset.id);
            console.log('like');
          } */
        });
      });

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