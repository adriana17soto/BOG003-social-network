import { loginGoogle, createNewUser } from '../index.js'; // se importan las funciones para el login y creacion de usurio

export const registrar = () => {
  // creacion del templeate para el formulio y botones
  const templateRegistration = `
  <header id="container">
  <div class="nav">
    <h1>Luminar</h1>
  </div>
 </header>
<section class="welcome">
<br/>

        <form method="post" id="container-login">
        <input type="text" id="name" placeholder="Nombre y apellido" required/>
          <input type="email" id="email" placeholder="Correo Electrónico" required/>          
          <input type="password" id="password" placeholder="Contraseña" required/>
          <input type="password" id="passwordConf" placeholder="Confirma tu contraseña" required/>
          <p id="message"></p>
          <button type="sumit" id="boton-registrar">Registrar</button>
          </form>
          <button type="button" id="boton-googleR">Ingresar con Google</button>
          <h2 id="login"></h2>
        <button id="boton-go-ingresar"><a href="#/login">Ingresar</a></button>
      </div>
</section>
      <footer>@Luminar 2021</footer>
    </div>
    `;
    // constante con la creaciacion del elemento div
  const divRegistrar = document.createElement('div');
  // se llama el div para mostrar el template con el innerHTML
  divRegistrar.innerHTML = templateRegistration;

  const btnRegister = divRegistrar.querySelector('#boton-registrar');
  const nameInput = divRegistrar.querySelector('#name');
  const emailInput = divRegistrar.querySelector('#email');
  const passwordInput = divRegistrar.querySelector('#password');
  const passwordInputConfirm = divRegistrar.querySelector('#passwordConf');
  const messageContainer = divRegistrar.querySelector('#message');

  // Evento para enviar el formulario
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordInputConfirm.value;

    // validaciones de campos
    if (userName === '' || email === '' || password === '' || passwordConfirm === '') {
      messageContainer.innerHTML = '❌ Hay campos vacíos';
    } else if (userName.length < 2) {
      messageContainer.innerHTML = '❌ Tu nombre debe tener mínimo 2 caracteres';
    } else if (password !== passwordConfirm) {
      messageContainer.innerHTML = '❌ Tu contraseña no coincide';
    } else {
      createNewUser(email, password, userName)
        .then(() => {
          messageContainer.innerHTML = '✅ Gracias por registrarte';
          setTimeout(() => { window.location.hash = '#/home'; }, 1000);
        }).catch((error) => {
        // validaciones de firebase se sobre ponen a las validaciones que nosotras damos
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/invalid-email':
              messageContainer.innerHTML = '❌ Ingrese un correo válido';
              break;
            case 'auth/weak-password':
              messageContainer.innerHTML = '❌ La contraseña debe tener mínimo 6 caracteres';
              break;
            case 'auth/email-already-in-use':
              messageContainer.innerHTML = '❌ El correo ya está registrado';
              break;
          }
        });
    }
  });

  // Quitar el mensaje de error cuando el usuario escriba
  const clearErrorMessage = (e) => {
    if (e.target.tagName === 'INPUT') {
      messageContainer.innerHTML = '';
    }
  };
  const form = divRegistrar.querySelector('form');
  form.addEventListener('keyup', clearErrorMessage);

  const btnGoogle = divRegistrar.querySelector('#boton-googleR');

  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginGoogle()
      .then(() => {
        window.location.hash = '#/home';
      }).catch((error) => {
        console.log(error.message);
      });
  });

  return divRegistrar;
};
