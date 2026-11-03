// Práctica JavaScript · Cine Mirador
// Sigue el manual paso a paso. Escribe aquí tu código.

// ==================================================
// PASO 1 · Datos de la cartelera
// ==================================================

// Butacas ocupadas de cada sesión: fila (letra) + número
// MARK: Paso 1
const peliculas = [
  {
    id: 1,
    titulo: "El valle de las luciérnagas",
    genero: "Animación",
    duracion: 92,
    edad: "TP",
    precio: 6.5,
    icono: "🦋",
    sesiones: [
      { hora: "16:00", ocupadas: ["C4", "C5", "D4", "D5"] },
      { hora: "18:15", ocupadas: ["A1", "A2"] },
    ],
  },
  {
    id: 2,
    titulo: "Rumbo a la isla perdida",
    genero: "Aventura",
    duracion: 118,
    edad: "+7",
    precio: 7.5,
    icono: "🏝️",
    sesiones: [
      { hora: "17:30", ocupadas: ["B3", "B4", "B5", "E7"] },
      { hora: "20:00", ocupadas: [] },
    ],
  },
  {
    id: 3,
    titulo: "Mi suegra y otras catástrofes",
    genero: "Comedia",
    duracion: 101,
    edad: "+12",
    precio: 7.5,
    icono: "😂",
    sesiones: [
      { hora: "19:00", ocupadas: ["D1", "D2", "D3", "D4", "D5", "D6"] },
      { hora: "22:00", ocupadas: ["F8"] },
    ],
  },
  {
    id: 4,
    titulo: "Cartas desde el faro",
    genero: "Drama",
    duracion: 124,
    edad: "+12",
    precio: 7.5,
    icono: "✉️",
    sesiones: [{ hora: "18:00", ocupadas: [] }],
  },
  {
    id: 5,
    titulo: "La casa del fondo del lago",
    genero: "Terror",
    duracion: 97,
    edad: "+16",
    precio: 8.0,
    icono: "👻",
    sesiones: [{ hora: "22:30", ocupadas: ["A4", "A5", "F1", "F2"] }],
  },
  {
    id: 6,
    titulo: "Bigotes al rescate",
    genero: "Animación",
    duracion: 88,
    edad: "TP",
    precio: 6.5,
    icono: "🐱",
    sesiones: [
      { hora: "12:00", ocupadas: ["B1", "B2", "B3"] },
      { hora: "16:30", ocupadas: [] },
    ],
  },
  {
    id: 7,
    titulo: "El último tren a Lisboa",
    genero: "Drama",
    duracion: 110,
    edad: "+7",
    precio: 7.5,
    icono: "🚂",
    sesiones: [{ hora: "20:30", ocupadas: ["C1", "C2"] }],
  },
  {
    id: 8,
    titulo: "Operación tortilla",
    genero: "Comedia",
    duracion: 95,
    edad: "TP",
    precio: 7.0,
    icono: "🍳",
    sesiones: [
      { hora: "17:00", ocupadas: [] },
      { hora: "19:30", ocupadas: ["E3", "E4"] },
    ],
  },
];

console.log("Películas en cartelera:", peliculas.length);
console.table(peliculas);

// MARK: Paso 2

const listaPeliculas = document.querySelector("#lista-peliculas");
const contador = document.querySelector("#contador");

function formatearPrecio(numero) {
  return numero.toFixed(2).replace(".", ",") + "€";
}

function crearTarjeta(pelicula) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");
  tarjeta.innerHTML = `
    <span class="icono">${pelicula.icono}</span>
    <h3>${pelicula.titulo}</h3>
    <p class="datos">${pelicula.genero} · ${pelicula.duracion} min · ${pelicula.edad}</p>
    <p class="precio">${formatearPrecio(pelicula.precio)}</p>
    <button type="button">Reservar</button>
  `;
  tarjeta.querySelector("button").addEventListener("click", () => {
    abrirReserva(pelicula);
  });
  return tarjeta;
}

function pintarCartelera(lista) {
  listaPeliculas.innerHTML = "";
  lista.forEach((pelicula) => listaPeliculas.append(crearTarjeta(pelicula)));

  if (lista.length === 0) {
    contador.textContent = "No hay películas que coincidan con la búsqueda.";
  } else {
    contador.textContent =
      lista.length === 1 ? " 1 película" : `${lista.length} películas`;
  }
}

pintarCartelera(peliculas);

function debounce(fn, delay = 300) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// MARK: Paso 3

const buscador = document.getElementById("buscador");
const filtroGenero = document.getElementById("filtro-genero");

function filtrarPeliculas() {
  const texto = buscador.value.trim().toLowerCase();
  const genero = filtroGenero.value;

  const resultado = peliculas.filter((pelicula) => {
    const coincideTexto = pelicula.titulo.toLowerCase().includes(texto);
    const coincideGenero = genero === "todos" || pelicula.genero === genero;
    return coincideTexto && coincideGenero;
  });

  pintarCartelera(resultado);
}

const handleSearch = debounce(filtrarPeliculas);

buscador.addEventListener("input", handleSearch);

filtroGenero.addEventListener("change", filtrarPeliculas);

// MARK: Paso 4

const seccionCartelera = document.getElementById("cartelera");
const seccionReserva = document.getElementById("reserva");
const tituloReserva = document.getElementById("titulo-reserva");
const selectSesion = document.getElementById("sesion");
const botonCancelar = document.getElementById("cancelar");

let peliculaElegida = null;

function abrirReserva(pelicula) {
  peliculaElegida = pelicula;
  tituloReserva.textContent = pelicula.titulo;
  selectSesion.innerHTML = "";
  pelicula.sesiones.forEach((sesion, indice) => {
    const opcion = document.createElement("option");
    opcion.value = indice;
    opcion.textContent = sesion.hora;
    selectSesion.append(opcion);
  });

  seccionCartelera.hidden = true;
  seccionReserva.hidden = false;
  pintarSala();
}

function volverACartelera() {
  mostrarErrores([]);
  seccionReserva.hidden = true;
  seccionCartelera.hidden = false;
}

botonCancelar.addEventListener("click", volverACartelera);

// MARK: Paso 5
const FILAS = ["A", "B", "C", "E", "F"];
const BUTACAS_POR_FILA = 8;

const sala = document.getElementById("sala");
const resumen = document.getElementById("resumen");

let seleccionadas = [];

function sesionElegida() {
  return peliculaElegida.sesiones[selectSesion.value];
}

function pintarSala() {
  sala.innerHTML = "";
  seleccionadas = [];
  const ocupadas = sesionElegida().ocupadas;

  FILAS.forEach((fila) => {
    for (let numero = 1; numero <= BUTACAS_POR_FILA; numero++) {
      const codigo = fila + numero;
      const butaca = document.createElement("button");
      butaca.type = "button";
      butaca.classList.add("butaca");
      butaca.textContent = codigo;
      if (ocupadas.includes(codigo)) {
        butaca.classList.add("ocupada");
        butaca.disabled = true;
      } else {
        butaca.addEventListener("click", () => {
          alternarButaca(butaca, codigo);
        });
      }
      sala.append(butaca);
    }
  });
  actualizarResumen();
}

function alternarButaca(butaca, codigo) {
  butaca.classList.toggle("seleccionada");

  if (seleccionadas.includes(codigo)) {
    seleccionadas = seleccionadas.filter((c) => c !== codigo);
  } else {
    seleccionadas.push(codigo);
  }
  actualizarResumen();
}

function actualizarResumen() {
  const cantidad = seleccionadas.length;
  const total = cantidad * peliculaElegida.precio;
  const texto = cantidad === 1 ? "butaca" : "butacas";
  resumen.textContent = `${cantidad} ${texto} · ${formatearPrecio(total)}`;
}

selectSesion.addEventListener("change", pintarSala);

// MARK: Paso 6

const formReserva = document.getElementById("form-reserva");
const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const listaErrores = document.getElementById("errores");

function validarReserva() {
  const errores = [];
  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();

  if (nombre.length < 3) {
    errores.push("Escribe tu nombre (mínimo 3 letras).");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.push("Escribe un email válido, por ejemplo ana@correo.com");
  }
  if (seleccionadas.length === 0) {
    errores.push("Elige al menos una butaca");
  }

  return errores;
}

function mostrarErrores(errores) {
  listaErrores.innerHTML = "";
  errores.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    listaErrores.append(li);
  });
  listaErrores.hidden = errores.length === 0;
}

formReserva.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const errores = validarReserva();
  mostrarErrores(errores);

  if (errores.length === 0) {
    confirmarReserva();
  }
});

// MARK: Paso 7
const seccionEntrada = document.getElementById("entrada");

function confirmarReserva() {
  const sesion = sesionElegida();
  const total = seleccionadas.length * peliculaElegida.precio;

  sesion.ocupadas.push(...seleccionadas);
  seccionEntrada.innerHTML = `
        <h2>🎟️ Tu entrada</h2>
        <p><strong>${peliculaElegida.titulo}</strong> · sesión de las ${sesion.hora}</p>
        <p>Butacas: ${seleccionadas.join(", ")}</p>
        <p>Total: ${formatearPrecio(total)}</p>
        <p>A nombre de <span id="entrada-nombre"></span></p>
        <button type="button" id="otra-reserva">Hacer otra reserva</button>
    `;
  seccionEntrada.querySelector("#entrada-nombre").textContent =
    `${inputNombre.value.trim()} (${inputEmail.value.trim()})`;

  seccionEntrada
    .querySelector("#otra-reserva")
    .addEventListener("click", () => {
      seccionEntrada.hidden = true;
      volverACartelera();
    });
  formReserva.reset();
  seccionReserva.hidden = true;
  seccionEntrada.hidden = false;
}
