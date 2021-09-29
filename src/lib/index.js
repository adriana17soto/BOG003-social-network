export const createNewUser = (email, password, userName) => {
  const firebaseUser = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userCredential.user.updateProfile({
        displayName: userName,
      });
    });
  return firebaseUser;
};

export const closeSession = () => firebase.auth().signOut();

export const loginUsers = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
export const createpost = (describe, identuser, username) => firebase.firestore().collection('posts')
  .add({
    content: describe,
    userName: username,
    userId: identuser,
    createdAt: new Date(),
    likes: [],

  });

export const getPost = () => firebase.firestore().collection('posts').orderBy('createdAt', 'desc');

export const DeletePosts = (id) => firebase.firestore().collection('posts').doc(id).delete();
// export const deletePost = (postId) => {db.collection('posts').doc(postId).delete();
export const updateLikes = (userId, id) => firebase.firestore().collection('posts').doc(id).update(({
  likes: firebase.firestore.FieldValue.arrayUnion(userId),
}));

export const removeLikes = (userId, id) => firebase.firestore().collection('posts').doc(id).update(({
  likes: firebase.firestore.FieldValue.arrayRemove(userId),
}));

export const updatepost = (postId, describe) => firebase.firestore().collection('post').doc(postId).update(describe);

export const getPosts = (id) => firebase.firestore().collection('posts').doc(id).get();
/* const db = firebase.firestore();
db.collection("users").add({
first: "Ada",
last: "Lovelace",
born: 1815
})
.then((docRef) => {
console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
console.error("Error adding document: ", error);
});

*/
