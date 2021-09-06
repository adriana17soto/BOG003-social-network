/* import { registrar } from './lib/views/Registration.js'; */

export const registrarse = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      /* console.log(user); */
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      /* console.log(error); */
    });
};

export const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
      let credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      // ...
    })
    .catch((error) => {
    // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
    });
};
