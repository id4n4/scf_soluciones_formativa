const pequeño = 5;
const mediano = 8;
const grande = 10;
const tablero = document.getElementById("board");
const sizeButtons = document.getElementById("buttons_size_game");
let cells_bomb = [];

//ejecutar funcion al cargar la pagina
window.onload = () => {
  crearTablero(pequeño);
};

//Crear el tablero de juego dependiendo de tamaño
crearTablero = (n) => {
  cells_bomb = [];
  tablero.innerHTML = "";
  const totalCells = n * n;
  tablero.classList.remove("not_event_listeners");
  tablero.classList.add("board_small");

  for (let i = 0; i < totalCells; i++) {
    if (Math.random() < 0.2) {
      // 20% de probabilidad de tener una bomba
      cells_bomb.push(i);
    }
    const celda = document.createElement("div");
    celda.classList.add("cell");
    celda.setAttribute("data-index", i);
    tablero.appendChild(celda);
  }
};

//Agregar evento a los botones de tamaño
sizeButtons.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  sizeButtons.querySelectorAll("button").forEach((button) => {
    button.classList.remove("selected");
  });
  const button = event.target;
  button.classList.add("selected");
  console.log(button.value);
  const size = button.value;
  tablero.classList.remove("board_small", "board_medium", "board_large");
  if (size === pequeño.toString()) {
    tablero.classList.add("board_small");
    crearTablero(pequeño);
  } else if (size === mediano.toString()) {
    tablero.classList.add("board_medium");
    crearTablero(mediano);
  } else if (size === grande.toString()) {
    tablero.classList.add("board_large");
    crearTablero(grande);
  }
});

//Agregar evento a las celdas del tablero
tablero.addEventListener("click", (event) => {
  const cell = event.target;
  if (cell.classList.contains("cell")) {
    const index = parseInt(cell.getAttribute("data-index"));
    if (cells_bomb.includes(index)) {
      cell.classList.add("bomb");
      cell.innerHTML = "💣";
      // alert("¡Has perdido!");
      tablero.classList.add("not_event_listeners");
    } else {
      cell.classList.add("clicked");
    }
  }
});
