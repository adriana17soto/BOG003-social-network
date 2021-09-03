export const home = () => {
  const divHome = document.createElement('div');
  const templateHOme = `
    <h1>
      Hola mundirijillo
    </h1>
    `;
  divHome.innerHTML = templateHOme;
  return divHome;
};
