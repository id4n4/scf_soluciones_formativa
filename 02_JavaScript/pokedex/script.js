const form = document.getElementById("form-buscar");
const input = document.getElementById("nombre");
const estado = document.getElementById("estado");
const resultado = document.getElementById("resultado");

const contador = document.getElementById("contador");
const divEquipo = document.getElementById("equipo");
const btnVaciar = document.getElementById("btn-vaciar");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const maximoEquipo = 6;

let pokemonActual = null;
let equipo = JSON.parse(localStorage.getItem("equipo") || "[]");

function mostrarEstado(texto, clase) {
  estado.textContent = texto;
  estado.className = clase;
}

async function buscarPokemon(evento) {
  evento.preventDefault();
  const nombre = input.value.trim().toLowerCase();

  if (nombre === "") {
    mostrarEstado("Escribe un nombre o un número.", "error");
    return;
  }

  mostrarEstado("buscando...", "cargando");
  resultado.innerHTML = "";

  try {
    const res = await fetch(API_URL + nombre);
    if (!res.ok) {
      throw new Error("Error " + res.status);
    }

    const pokemon = await res.json();
    pokemonActual = {
      id: pokemon.id,
      nombre: pokemon.name,
      imagen: pokemon.sprites.front_default,
      tipos: pokemon.types,
      altura: pokemon.height,
      peso: pokemon.weight,
    };

    pintarResultado();
  } catch (error) {
    console.error("Error al cargar:", error);
    mostrarEstado(
      "No se han podido cargar el pokemon. Inténtalo más tarde.",
      "error",
    );
  }
}

form.addEventListener("submit", buscarPokemon);

function pintarResultado() {
  resultado.innerHTML = "";

  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const imagen = document.createElement("img");
  imagen.src = pokemonActual.imagen;
  imagen.alt = pokemonActual.nombre;

  const numero = document.createElement("p");
  numero.textContent = "#" + pokemonActual.id;
  numero.classList.add("numero");

  const name = document.createElement("h3");
  name.textContent = pokemonActual.nombre;

  const tipos = document.createElement("div");
  tipos.classList.add("tipos");

  pokemonActual.tipos.forEach((item) => {
    const span = document.createElement("span");
    span.classList.add("span");
    span.textContent = "tipo-" + item.type.name;
    tipos.appendChild(span);
  });

  const alturaPeso = document.createElement("p");
  alturaPeso.classList.add("datos");
  alturaPeso.textContent = `Altura: ${pokemonActual.altura} m · Peso: ${pokemonActual.peso} kg`;

  const boton = document.createElement("button");
  boton.id = "btn-anadir";
  boton.textContent = "Añadir a mi equipo";
  boton.addEventListener("click", anadirAlEquipo);

  tarjeta.append(imagen, numero, name, tipos, alturaPeso, boton);
  resultado.appendChild(tarjeta);
}

function guardarEquipo() {
  localStorage.setItem("equipo", JSON.stringify(equipo));
}

function anadirAlEquipo() {
  if (!pokemonActual) {
    mostrarEstado("Primero busca un Pokémon.", "error");
    return;
  }

  if (equipo.length >= maximoEquipo) {
    mostrarEstado(
      "Tu equipo ya tiene 6 Pokémon. Quita uno para añadir otro.",
      "error",
    );
    return;
  }

  if (equipo.some((p) => p.id === pokemonActual.id)) {
    mostrarEstado(pokemonActual.nombre + " ya está en tu equipo.", "error");
    return;
  }

  equipo.push(pokemonActual);
  guardarEquipo();
  pintarEquipo();
  mostrarEstado(pokemonActual.nombre + " se ha unido a tu equipo.", "ok");
}

function quitarDelEquipo(id) {
  equipo = equipo.filter((p) => p.id !== id);
  guardarEquipo();
  pintarEquipo();
}

function vaciarEquipo() {
  equipo = [];
  localStorage.removeItem("equipo");
  pintarEquipo();
}

function pintarEquipo() {
  divEquipo.innerHTML = "";
  contador.textContent = equipo.length;

  if (equipo.length === 0) {
    divEquipo.innerHTML =
      '<p class="vacio">Tu equipo está vacío. Busca un Pokémon y añádelo.</p>';
    return;
  }

  equipo.forEach((p) => {
    const miembro = document.createElement("div");
    miembro.classList.add("miembro");

    const imagen = document.createElement("img");
    imagen.src = p.imagen;
    imagen.alt = p.nombre;

    const nombre = document.createElement("p");
    nombre.textContent = p.nombre;

    const btnQuitar = document.createElement("button");
    btnQuitar.textContent = "✕";
    btnQuitar.addEventListener("click", () => quitarDelEquipo(p.id));

    miembro.append(imagen, nombre, btnQuitar);
    divEquipo.appendChild(miembro);
  });
}

btnVaciar.addEventListener("click", vaciarEquipo);

pintarEquipo();
