// cSpell:disable
const URL_GEO = "https://geocoding-api.open-meteo.com/v1/search";
const URL_TIEMPO = "https://api.open-meteo.com/v1/forecast";

const MAX_CIUDADES = 5;

const formBuscar = document.getElementById("form-buscar");
const campoCiudad = document.getElementById("ciudad");
const estado = document.getElementById("estado");
const resultado = document.getElementById("resultado");
const contador = document.getElementById("contador");
const listaFavoritas = document.getElementById("favoritas");
const btnVaciar = document.getElementById("btn-vaciar");

let ciudadActual = null;
let favoritas = JSON.parse(localStorage.getItem("ciudades") || "[]");

const mostrarEstado = (texto, clase) => {
  estado.textContent = texto;
  estado.classList.remove("cargando", "error", "ok");
  if (clase) {
    estado.classList.add(clase);
  }
};

const buscarCiudad = async (nombre) => {
  const url = `${URL_GEO}?name=${encodeURIComponent(nombre)}&count=1&language=es`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al buscar la ciudad.`);
  }
  const datos = await res.json();
  if (!datos.results || datos.results.length === 0) {
    throw new Error(`No se ha encontrado ninguna ciudad llamada «${nombre}».`);
  }

  const lugar = datos.results[0];
  return {
    id: lugar.id,
    nombre: lugar.name,
    region: lugar.admin1 || "",
    pais: lugar.country || "",
    latitud: lugar.latitude,
    longitud: lugar.longitude,
  };
};

const obtenerTiempo = async (ciudad) => {
  const url =
    `${URL_TIEMPO}?latitude=${ciudad.latitud}&longitude=${ciudad.longitud}` +
    "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al consultar el tiempo.`);
  }
  const datos = await res.json();
  if (!datos.current) {
    throw new Error("La respuesta no contiene datos del tiempo actual.");
  }

  return {
    temperatura: Math.round(datos.current.temperature_2m),
    sensacion: Math.round(datos.current.apparent_temperature),
    humedad: datos.current.relative_humidity_2m,
    viento: Math.round(datos.current.wind_speed_10m),
    codigo: datos.current.weather_code,
  };
};

const mostrarError = (error) => {
  ciudadActual = null;
  resultado.replaceChildren();
  const mensaje =
    error instanceof TypeError
      ? "No se ha podido conectar. Revisa tu conexión."
      : error.message;
  mostrarEstado(mensaje, "error");
};

const describirTiempo = (codigo) => {
  if (codigo === 0) return { texto: "Despejado", icono: "☀️" };
  if (codigo <= 2) return { texto: "Poco nuboso", icono: "🌤️" };
  if (codigo === 3) return { texto: "Nublado", icono: "☁️" };
  if (codigo <= 48) return { texto: "Niebla", icono: "🌫️" };
  if (codigo <= 57) return { texto: "Llovizna", icono: "🌦️" };
  if (codigo <= 67) return { texto: "Lluvia", icono: "🌧️" };
  if (codigo <= 77) return { texto: "Nieve", icono: "❄️" };
  if (codigo <= 82) return { texto: "Chubascos", icono: "🌦️" };
  if (codigo <= 86) return { texto: "Chubascos de nieve", icono: "🌨️" };
  return { texto: "Tormenta", icono: "⛈️" };
};

const guardarFavoritas = () => {
  localStorage.setItem("ciudades", JSON.stringify(favoritas));
};

const guardarCiudad = () => {
  if (favoritas.length >= MAX_CIUDADES) {
    mostrarEstado(
      "Ya tienes 5 ciudades. Quita una para guardar otra.",
      "error",
    );
    return;
  }
  if (favoritas.some((ciudad) => ciudad.id === ciudadActual.id)) {
    mostrarEstado(`${ciudadActual.nombre} ya está en tus ciudades.`, "error");
    return;
  }

  favoritas.push(ciudadActual);
  guardarFavoritas();
  pintarFavoritas();
  mostrarEstado(`${ciudadActual.nombre} se ha guardado en tus ciudades.`, "ok");
};

const pintarTarjeta = (ciudad, tiempo) => {
  const descripcion = describirTiempo(tiempo.codigo);
  const lugar = [ciudad.region, ciudad.pais]
    .filter((texto) => texto !== "")
    .join(", ");
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const icono = document.createElement("div");
  icono.className = "icono";
  icono.textContent = descripcion.icono;

  const nombre = document.createElement("h3");
  nombre.textContent = ciudad.nombre;

  const lugarElemento = document.createElement("p");
  lugarElemento.className = "lugar";
  lugarElemento.textContent = lugar;

  const temperatura = document.createElement("p");
  temperatura.className = "temperatura";
  temperatura.textContent = `${tiempo.temperatura} °C`;

  const textoDescripcion = document.createElement("p");
  textoDescripcion.className = "descripcion";
  textoDescripcion.textContent = descripcion.texto;

  const detalles = document.createElement("div");
  detalles.className = "detalles";
  [
    `Sensación: ${tiempo.sensacion} °C`,
    `Humedad: ${tiempo.humedad} %`,
    `Viento: ${tiempo.viento} km/h`,
  ].forEach((texto) => {
    const detalle = document.createElement("span");
    detalle.textContent = texto;
    detalles.appendChild(detalle);
  });

  const botonGuardar = document.createElement("button");
  botonGuardar.type = "button";
  botonGuardar.textContent = "⭐ Guardar en mis ciudades";
  botonGuardar.addEventListener("click", guardarCiudad);

  tarjeta.append(
    icono,
    nombre,
    lugarElemento,
    temperatura,
    textoDescripcion,
    detalles,
    botonGuardar,
  );
  resultado.replaceChildren(tarjeta);
};

const mostrarTiempo = async (ciudad) => {
  mostrarEstado(`Consultando el tiempo de ${ciudad.nombre}…`, "cargando");
  const tiempo = await obtenerTiempo(ciudad);
  ciudadActual = ciudad;
  pintarTarjeta(ciudad, tiempo);
  mostrarEstado("", "");
};

const buscar = async (evento) => {
  evento.preventDefault();
  const nombre = campoCiudad.value.trim();
  if (!nombre) {
    mostrarEstado("Escribe el nombre de una ciudad.", "error");
    return;
  }

  resultado.replaceChildren();
  mostrarEstado("Buscando…", "cargando");
  try {
    const ciudad = await buscarCiudad(nombre);
    await mostrarTiempo(ciudad);
  } catch (error) {
    mostrarError(error);
  }
};

const verFavorita = async (ciudad) => {
  try {
    await mostrarTiempo(ciudad);
  } catch (error) {
    mostrarError(error);
  }
};

const pintarFavoritas = () => {
  listaFavoritas.replaceChildren();
  contador.textContent = favoritas.length;

  if (favoritas.length === 0) {
    const mensaje = document.createElement("li");
    mensaje.className = "vacio";
    mensaje.textContent = "Aún no has guardado ninguna ciudad.";
    listaFavoritas.appendChild(mensaje);
    return;
  }

  favoritas.forEach((ciudad) => {
    const elemento = document.createElement("li");
    const nombre = document.createElement("span");
    nombre.className = "nombre";
    nombre.textContent = ciudad.nombre;
    nombre.addEventListener("click", () => verFavorita(ciudad));

    const pais = document.createElement("span");
    pais.className = "pais";
    pais.textContent = ciudad.pais;

    const botonQuitar = document.createElement("button");
    botonQuitar.type = "button";
    botonQuitar.textContent = "✕";
    botonQuitar.setAttribute("aria-label", `Quitar ${ciudad.nombre}`);
    botonQuitar.addEventListener("click", () => quitarCiudad(ciudad.id));

    elemento.append(nombre, pais, botonQuitar);
    listaFavoritas.appendChild(elemento);
  });
};

const quitarCiudad = (id) => {
  favoritas = favoritas.filter((ciudad) => ciudad.id !== id);
  guardarFavoritas();
  pintarFavoritas();
};

formBuscar.addEventListener("submit", buscar);
btnVaciar.addEventListener("click", () => {
  favoritas = [];
  localStorage.removeItem("ciudades");
  pintarFavoritas();
});

pintarFavoritas();
