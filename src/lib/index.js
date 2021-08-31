// aqui exportaras las funciones que necesites

export const registrar = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  /*  .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    }); */
};
