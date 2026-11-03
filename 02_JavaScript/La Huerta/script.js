// =====================================================
// PRÁCTICA INTEGRADORA · FRUTERÍA LA HUERTA  (INICIO)
// Sigue el manual: escribe cada paso debajo de su comentario.
// index.html y styles.css ya están hechos.
// =====================================================

// ---------- Datos (ya hechos) ----------
// Catálogo de la tienda: un array de objetos (en una tienda real vendría de un servidor)
const catalogo = [
  {
    id: 1,
    nombre: "Manzana golden",
    categoria: "fruta",
    precio: 2.1,
    unidad: "kg",
    emoji: "🍏",
  },
  {
    id: 2,
    nombre: "Plátano de Canarias",
    categoria: "fruta",
    precio: 2.45,
    unidad: "kg",
    emoji: "🍌",
  },
  {
    id: 3,
    nombre: "Naranja de zumo",
    categoria: "fruta",
    precio: 1.35,
    unidad: "kg",
    emoji: "🍊",
  },
  {
    id: 4,
    nombre: "Fresas",
    categoria: "fruta",
    precio: 3.9,
    unidad: "caja",
    emoji: "🍓",
  },
  {
    id: 5,
    nombre: "Tomate de rama",
    categoria: "verdura",
    precio: 2.8,
    unidad: "kg",
    emoji: "🍅",
  },
  {
    id: 6,
    nombre: "Lechuga",
    categoria: "verdura",
    precio: 0.95,
    unidad: "ud",
    emoji: "🥬",
  },
  {
    id: 7,
    nombre: "Zanahoria",
    categoria: "verdura",
    precio: 1.2,
    unidad: "kg",
    emoji: "🥕",
  },
  {
    id: 8,
    nombre: "Patata",
    categoria: "verdura",
    precio: 1.1,
    unidad: "kg",
    emoji: "🥔",
  },
  {
    id: 9,
    nombre: "Aceite de oliva",
    categoria: "despensa",
    precio: 9.5,
    unidad: "litro",
    emoji: "🫒",
  },
  {
    id: 10,
    nombre: "Huevos camperos",
    categoria: "despensa",
    precio: 3.2,
    unidad: "docena",
    emoji: "🥚",
  },
];

const ENVIO = 3.95; // coste de envío
const ENVIO_GRATIS_DESDE = 30; // a partir de este subtotal, envío gratis

// Función de ayuda: 2.1 → "2,10 €"
const euros = (n) => n.toFixed(2).replace(".", ",") + " €";

// -----------------------------------------------------
// PASO 1 · Pintar el catálogo desde el array
// -----------------------------------------------------
// Selecciona #estado-catalogo y #productos.
// let productos = catalogo;
// crearTarjeta(producto): article.producto con emoji, h3, precio y botón
//   "Añadir a la cesta" (de momento hace console.log).
// pintarProductos(lista) y llámala con productos.
const estadoCatalogo = document.getElementById("estado-catalogo");
const contenedor = document.getElementById("productos");
let productos = catalogo;

function crearTarjeta(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("producto");

  const emoji = document.createElement("p");
  emoji.textContent = producto.emoji;
  emoji.classList.add(emoji);

  const nombre = document.createElement("h3");
  nombre.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.textContent = `${euros(producto.precio)} / ${productos.unidad}`;
  precio.classList.add("precio");

  const btn = document.createElement("button");
  btn.textContent = "añadir a la cesta";
  btn.addEventListener("click", () => {
    console.log(`Añadir a la cesta: ${producto.nombre}`);
  });

  tarjeta.append(emoji, nombre, precio, btn);
  return tarjeta;
}

function pintarProductos(lista) {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    estadoCatalogo.textContent = "no hay productos que mostrar.";
  } else {
    estadoCatalogo.textContent = "";
    lista.forEach((producto) => {
      const tarjeta = crearTarjeta(producto);
      contenedor.appendChild(tarjeta);
    });
  }
}

// -----------------------------------------------------
// PASO 2 · Filtros por categoría y buscador
// -----------------------------------------------------
// Selecciona los botones .filtro y #buscador. let categoriaActual = "todas";
// aplicarFiltros() con filter (categoría Y texto) y los eventos click e input.
const botonesFiltro = document.querySelectorAll(".filtro");
const buscador = document.getElementById("buscador");
let categoriaActual = "todas";

function aplicarFiltros() {
  const texto = buscador.value.toLowerCase();
  const filtrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActual === "todas" || producto.categoria === categoriaActual;
    const coincideTexto = producto.nombre.toLowerCase().includes(texto);
  });
  pintarProductos(filtrados);
}

botonesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {});
});

// -----------------------------------------------------
// PASO 3 · La cesta: añadir y quitar productos
// -----------------------------------------------------
// Selecciona #lista-cesta y #cesta-vacia. let cesta = [];
// anadirALaCesta(producto), quitarDeLaCesta(id) y pintarCesta().
// Cambia el console.log del botón "Añadir" (paso 1) por anadirALaCesta(producto).

// -----------------------------------------------------
// PASO 4 · Totales con reduce y envío gratis
// -----------------------------------------------------
// Selecciona #subtotal, #envio y #total.
// calcularTotales() con reduce; envío gratis desde 30 €.
// Llámala al final de pintarCesta().

// -----------------------------------------------------
// PASO 5 · Formulario del pedido: submit y validación
// -----------------------------------------------------
// Selecciona el formulario, #nombre, #email, #direccion y #mensaje-pedido.
// marcarCampo(), validarPedido() y el evento submit con preventDefault.

// -----------------------------------------------------
// PASO 6 · Cargar el catálogo de forma asíncrona (promesa)
// -----------------------------------------------------
// cargarProductos(): promesa que tarda 1 s y se resuelve con catalogo.
// Cambia let productos = catalogo; por let productos = []; y quita
// la llamada directa a pintarProductos del paso 1. Usa .then() / .catch().

// -----------------------------------------------------
// PASO 7 · Pagar el pedido con async / await
// -----------------------------------------------------
// Selecciona #simular-fallo y #btn-pagar.
// procesarPago(importe): promesa de 2 s que puede fallar.
// Convierte el submit del paso 5 en async y paga con await + try/catch/finally.
