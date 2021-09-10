import { registrarse} from './configureFirebase.js';

export const registrar = () => {
  const divRegistrar = document.createElement('div');
  const templateRegistration = `
  <div id="preamble">
  <header id="container">
    <div class="nav">
      <h1>Luminar</h1>

    </div>
  </header>
    <h2>Luminar te conecta con mujeres de todo el mundo.</h2>
    </div>
    <div id="registration">
    <input type="name" id="name" placeholder="Nombre" />
    <input type="email" id="email2" placeholder="Correo Electrónico" />
    <input type="password" id="password2" placeholder="Contraseña" />
    <button id="boton-registrar"><a href="#/home">Registrar</a></button>
    </div>
    `;
  divRegistrar.innerHTML = templateRegistration;
  setTimeout(() => {
    const registrarUsuarios = document.getElementById('boton-registrar');

    registrarUsuarios.addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      registrarse(email, password);
    });
  }, 1000);
  return divRegistrar;
};
