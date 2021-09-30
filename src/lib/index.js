// funcion para crear un  nuevo usuario
// recibe 3 parametros

export const createNewUser = (email, password, userName) => {
  // contante que autentifica el e-amil y la contraseña
  // se ejecuta la promesa que recibe como parametro a userCredential dado por firebase
  // y se actualiza el elemto displayName con el parametro userName
  const firebaseUser = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userCredential.user.updateProfile({
        displayName: userName,
      });
    });
  return firebaseUser;
};
// se crea la funcion de cerrar sesion que es dada por firebase
export const closeSession = () => firebase.auth().signOut();
// se crea la funcion login users que verifica si un usuario y contraseña ya esta registrado
export const loginUsers = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);
// se crea una instancia del provedor de google
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  // muestra la ventana emergente con  las cuenta actual de google
  return firebase.auth().signInWithPopup(provider);
};
// se utliza a firestore para crear el objeto
// con el metodo add se añade una nueva coleccion posts
export const createpost = (describe, identuser, username) => firebase.firestore().collection('posts')
  .add({
    content: describe,
    userName: username,
    userId: identuser,
    createdAt: new Date(),
    likes: [],

  });
// se obtienen los todos los documentos de la coleccion posts y se ordenan con el metodo  orderBy
// que recibe el parametro por que se quiere ordenar
// y en que forma se quiere ordenar en este caso la keyword es 'desc'
export const getPost = () => firebase.firestore().collection('posts').orderBy('createdAt', 'desc');

// esta funcion recibe como parametro a el id de cada post
// y mediante el metodo delete dado por firestore se elimina la puplicacion
export const DeletePosts = (id) => firebase.firestore().collection('posts').doc(id).delete();
// recibe como parametros de entrada al id del usuario y el id de la publicacion
// y mendiante el metodo arrayUnion agrega el id de cada usuario al array likes
export const updateLikes = (userId, id) => firebase.firestore().collection('posts').doc(id).update(({
  likes: firebase.firestore.FieldValue.arrayUnion(userId),
}));
// recibe los paramtros del id del usuario y el id del post
// y con el metodo arrayremove, quita el id del usuario del array likes
export const removeLikes = (userId, id) => firebase.firestore().collection('posts').doc(id).update(({
  likes: firebase.firestore.FieldValue.arrayRemove(userId),
}));
// esta funcion llama a mi colección, el documento que quiero actulizar con el id y con el metodo
// update actualizo el valor del string content con el parametro  describe
export const updatepost = (id, describe) => firebase.firestore().collection('posts').doc(id).update({ content: describe });
// con esta funcion obtengo todos los documentos o post de mi coleccion(posts)
export const getPosts = (id) => firebase.firestore().collection('posts').doc(id).get();
