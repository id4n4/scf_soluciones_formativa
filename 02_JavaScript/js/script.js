const productos = [
  {
    nombre: "Portátil",
    precio: 1000,
    stock: 10,
  },
  {
    nombre: "Ratón",
    precio: 20,
    stock: 50,
  },
  {
    nombre: "Teclado",
    precio: 50,
    stock: 0,
  },
  {
    nombre: "Monitor",
    precio: 200,
    stock: 15,
  },
];

const productosConIva = productos.map((producto) => {
  return { ...producto, precioConIva: producto.precio * 1.21 };
});

function pintarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  const productosHTML = lista.map((producto) => {
    return `
      <div class="producto ${producto.stock === 0 ? "sin-stock" : ""}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <p>Stock: ${producto.stock}</p>
        <p>Precio con IVA: $${producto.precioConIva.toFixed(2)}</p>
      </div>
    `;
  });

  contenedor.innerHTML = productosHTML.join("");
}

function mostrarTodo() {
  pintarProductos(productosConIva);
}

function mostrarDisponibles() {
  const disponibles = productosConIva.filter((producto) => producto.stock > 0);
  pintarProductos(disponibles);
}

mostrarTodo();
