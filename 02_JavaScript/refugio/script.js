// =====================================================
// MINIPROYECTO 2 · REFUGIO DE ANIMALES
// Sigue los pasos del documento. NO hace falta tocar
// index.html ni styles.css: todo se hace en este archivo.
// Abre la consola (F12) para ver los errores.
// =====================================================

// PASO 1 · Selecciona con querySelector / getElementById:
//          #titulo, #resumen, #lista, #nombre y #btn-anadir
const titulo = document.getElementById("titulo");
const resumen = document.getElementById("resumen");
const lista = document.getElementById("lista");
const inputNombre = document.getElementById("nombre");
const btnAdd = document.getElementById("btn-anadir");

// PASO 2 · Cambia el texto del título a "Refugio Patitas"
//          y cámbiale el color y el tamaño de letra
titulo.textContent = "Refugio patitas";
titulo.style.color = "#20211d";
titulo.style.fontSize = "4rem";

// PASO 3 · Este es el array de animales (ya está hecho)
const animales = [
  { nombre: "Toby", tipo: "Perro", edad: 3, adoptado: false },
  { nombre: "Misi", tipo: "Gato", edad: 1, adoptado: true },
  { nombre: "Rocky", tipo: "Perro", edad: 7, adoptado: false },
  { nombre: "Luna", tipo: "Gato", edad: 4, adoptado: false },
];

// PASO 4 · Crea la función crearTarjeta(animal):
//          article.animal con un h2 (nombre) y un p ("Perro · 3 años").
//          Si está adoptado, añade la clase "adoptado".
//          La función devuelve la tarjeta (return).
function crearTarjeta({ nombre, tipo, edad, adoptado }) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("animal");

  const elementoNombre = document.createElement("h2");
  elementoNombre.textContent = nombre;

  const datos = document.createElement("p");
  datos.textContent = `${tipo} · ${edad} años`;

  if (adoptado) tarjeta.classList.add("adoptado");

  const btn = document.createElement("button");
  btn.classList.add("btn-quitar");
  btn.textContent = "Quitar";
  btn.addEventListener("click", () => {
    tarjeta.remove();
    actualizarResumen();
  });

  tarjeta.appendChild(elementoNombre);
  tarjeta.appendChild(datos);
  tarjeta.appendChild(btn);

  return tarjeta;
}

// PASO 5 · Recorre el array con forEach y mete cada tarjeta en #lista
animales.forEach((animal) => {
  const tarjeta = crearTarjeta(animal);
  lista.appendChild(tarjeta);
});

// PASO 6 · Crea la función actualizarResumen() que escriba en #resumen:
//          "Hay X animales · Y adoptados"   y llámala
function actualizarResumen() {
  const totalAnimales = animales.length;
  const totalAdoptados = animales.filter((a) => a.adoptado).length;
  resumen.textContent = `Hay ${totalAnimales} animales · ${totalAdoptados} adoptados`;
}
actualizarResumen();

// PASO 7 · Dentro de crearTarjeta, añade un botón "Quitar"
//          que elimine su tarjeta con remove() y actualice el resumen

// PASO 8 · Al pulsar "Añadir animal", crea una tarjeta nueva
//          con el nombre escrito en la caja de texto
btnAdd.addEventListener("click", () => {
  if (inputNombre.value) {
    const animal = {
      nombre: inputNombre.value,
      tipo: "perro",
      edad: "3",
      adoptado: false,
    };
    const tarjeta = crearTarjeta(animal);
    lista.appendChild(tarjeta);
  }
});
