import { home  } from "./lib/views/home.js";
import{ menu } from "./lib/views/menu.js";

export const changeRouter = (hash) => {
    if(hash === '#/') {
        return showTemplate(hash)

    } else if (hash === '#/menu') {
        return showTemplate(hash)

    }else if (hash === '#/Registration') {
        return showTemplate(hash)

    }else {
        return showTemplate(hash)
    }
}

const showTemplate = (hash) => {
    const containerRoot = document.getElementById('root');
    containerRoot.innerHTML = menu();

    switch(hash) {
        case '#/':
        containerRoot.appendChild(home());
        break;
        case '#/Registration':
            containerRoot.appendChild(registrar());
        default:
        containerRoot.innerHTML = `
        <h2>
          No existe
        </h2>
        `
    }
}