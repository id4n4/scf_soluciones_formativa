// =====================================================
// MINIPROYECTO 1 · CAFETERÍA  (versión de INICIO)
// Escribimos el código en clase, paso a paso.
// La versión terminada está en la carpeta "final".
// =====================================================

// PASO 1 · Seleccionar elementos (querySelector, getElementById)
const titulo = document.querySelector("#titulo");
const subtitulo = document.querySelector(".subtitulo");
const carta = document.getElementById("carta");
const contador = document.getElementById("contador");

console.log(titulo);

// PASO 2 · Cambiar texto y estilos (textContent, style, classList)
titulo.textContent = "El Rincón del Café";
titulo.style.color = "#9F026B";
subtitulo.classList.add("destacado");

// PASO 3 · Los datos: un array de objetos con los productos
const productos = [
  { nombre: "Café solo", precio: 1.2 },
  { nombre: "Capuchino", precio: 2.3 },
  { nombre: "Tostada", precio: 1.8 },
  { nombre: "Croissant", precio: 1.5 },
  { nombre: "Zumo de naranja", precio: 2.8 },
];

console.log(productos.length);

// PASO 4 · Crear las tarjetas (createElement + appendChild)
productos.forEach(({ nombre, precio }) => {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("producto");

  const elementoNombre = document.createElement("h2");
  elementoNombre.textContent = nombre;

  const elementoPrecio = document.createElement("p");
  elementoPrecio.classList.add("precio");
  elementoPrecio.textContent = `${precio.toFixed(2)} €`;

  if (precio < 2) {
    tarjeta.classList.add("barato");
  }

  tarjeta.appendChild(elementoNombre);
  tarjeta.appendChild(elementoPrecio);
  carta.appendChild(tarjeta);
});

// PASO 5 · Contar las tarjetas (querySelectorAll)
function actualizarContador() {
  const tarjetas = document.querySelectorAll(".producto");
  contador.textContent = `Hay ${tarjetas.length} productos en la carta`;
}

actualizarContador();

// PASO 6 · Botón "Marcar ofertas" (classList.toggle)
const btnOfertas = document.querySelector("#btn-ofertas");

btnOfertas.addEventListener("click", () => {
  const baratos = document.querySelectorAll(".barato");
  baratos.forEach((tarjeta) => {
    tarjeta.classList.toggle("oferta");
  });
});

// PASO 7 · Botón "Quitar el último" (remove)
const btnQuitar = document.querySelector("#btn-quitar");

btnQuitar.addEventListener("click", () => {
  const ultima = document.querySelector(".producto:last-child");
  if (ultima) {
    ultima.remove();
    actualizarContador();
  }
});
