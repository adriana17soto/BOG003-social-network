import { loginUsers, loginGoogle } from '../index.js';

export const loginCuentaGoogle = () => {
  const templateGoogle = `
    <header id="container">
      <div class="nav">
        <h1>Luminar</h1>
      </div>
    </header>
    <section class="welcome">
      <img class="image-woman-login" src="lib/views/img/woman.png" alt="image" />
        <h2 class="text-luminar">Luminar te conecta con mujeres de todo el mundo.</h2>
    </section>
    <form method="post" id="container-login">
      <input type="email" id="email" name="email" placeholder="Correo Electrónico" required/>
        
      <input type="password" id="password" name="password" placeholder="Contraseña" required/>
      <p id="message"></p>
      <button type="sumit" id="boton-ingresar">Ingresar</button>
      <button type="sumit" id="boton-google">
      
      Ingresar con Google
      </button>
    </form>
     
      <button id="boton-go-register" Inicial"><a href="#/registration">Registrarte</a></button>
      <footer>@Luminar 2021</footer>
  `;
  //  setTimeout(() => {
  const divLogin = document.createElement('div');
  divLogin.innerHTML = templateGoogle;

  const emailSignIn = divLogin.querySelector('#email');
  const passwordSignIn = divLogin.querySelector('#password');
  const btnSignIn = divLogin.querySelector('#boton-ingresar');
  const messageContainer = divLogin.querySelector('#message');

  btnSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailSignIn.value;
    const password = passwordSignIn.value;

    loginUsers(email, password)
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((error) => {
        /* validaciones de firebase */
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            messageContainer.setAttribute('class', 'error');
            messageContainer.innerHTML = '❌ Usuario no registrado';
            break;

          case 'auth/wrong-password':
            messageContainer.setAttribute('class', 'error');
            messageContainer.innerHTML = '❌ Contraseña incorrecta';
            break;

          case 'auth/invalid-email':
            messageContainer.setAttribute('class', 'error');
            messageContainer.innerHTML = '❌ Correo inválido';
            break;
          default:
            // ok
        }
      });
  });

  /* Quitar el mensaje de error cuando el usuario escriba */
  const clearErrorMessage = (e) => {
    if (e.target.tagName === 'INPUT') {
      messageContainer.innerHTML = '';
    }
  };

  const form = divLogin.querySelector('form');
  form.addEventListener('keyup', clearErrorMessage);

  const btnGoogle = divLogin.querySelector('#boton-google');

  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginGoogle()
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  return divLogin;
};

/* const ingresoUsuarios = document.querySelector('#boton-ingresar');
ingresoUsuarios.addEventListener('click', () => {
  ingreso();
});

    const registrarUsuarios = document.querySelector('#boton-google');
    registrarUsuarios.addEventListener('click', () => {
      login();
    });
  }, 1000);
  return templateGoogle;
}; */
