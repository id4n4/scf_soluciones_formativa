class SaludoCurso extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hola, bienvenido al curso de desarrollo web</h1>`;
  }
}

customElements.define("saludo-curso", SaludoCurso);

class TarjetaUsuario extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<h1>Usuario 1</h1>`;
  }
}

customElements.define("tarjeta-usuario", TarjetaUsuario);
