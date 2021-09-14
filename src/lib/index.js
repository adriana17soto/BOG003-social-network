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

export const loginUsers = (email, password) => {
   return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};