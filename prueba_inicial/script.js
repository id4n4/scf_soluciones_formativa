// Elementos del DOM
const canvas = document.getElementById("gameBoard"); // lienzo donde se renderiza el juego
const ctx = canvas.getContext("2d"); // contexto 2D del canvas
const scoreElement = document.getElementById("score"); // elemento donde mostramos la puntuación
const restartButton = document.getElementById("restartButton"); // botón para reiniciar el juego

// Tamaños y rejilla
const gridSize = 20; // tamaño (px) de cada celda
const tileCount = canvas.width / gridSize; // número de celdas por fila/columna

// Estado del juego
let snake = [{ x: 10, y: 10 }]; // array de segmentos de la serpiente; el primero es la cabeza
let velocity = { x: 0, y: 0 }; // dirección actual de movimiento
let apple = { x: 5, y: 5 }; // posición de la manzana (comida)
let score = 0; // puntuación
let gameOver = false; // flag de fin de juego
let paused = false; // flag de pausa
let speed = 8; // actualizaciones por segundo

// Reinicia el juego a su estado inicial
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  velocity = { x: 0, y: 0 };
  placeApple(); // coloca una manzana en una posición aleatoria
  score = 0;
  gameOver = false;
  paused = false;
  scoreElement.textContent = score; // actualiza la UI
  // dibujamos inmediatamente para limpiar cualquier overlay de 'Game Over'
  draw();
}

// Coloca la manzana en una celda aleatoria que no esté ocupada por la serpiente
function placeApple() {
  apple = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };

  // Si la manzana cae encima de la serpiente, reintentar
  if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
    placeApple();
  }
}

// Dibuja el estado actual del juego en el canvas
function draw() {
  // fondo
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // serpiente: dibujamos cada segmento
  ctx.fillStyle = "#8bc34a"; // color del cuerpo
  snake.forEach((segment, index) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    // cabeza con tono distinto
    if (index === 0) {
      ctx.fillStyle = "#cddc39";
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
      ctx.fillStyle = "#8bc34a"; // restaurar color para siguientes segmentos
    }
  });

  // manzana
  ctx.fillStyle = "#ff5252";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);

  // overlay y texto de Game Over
  if (gameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "16px Arial";
    ctx.fillText("Pulsa Reiniciar para jugar otra vez", canvas.width / 2, canvas.height / 2 + 24);
  }
}

// Actualiza la lógica del juego: movimiento, colisiones y puntuación
function update() {
  if (gameOver || paused) return; // no actualizamos si terminó o está en pausa

  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  // colisión con los bordes
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver = true;
    return;
  }

  // colisión con el propio cuerpo
  if (snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
    gameOver = true;
    return;
  }

  // añadimos la nueva cabeza al frente de la serpiente
  snake.unshift(head);

  // comer manzana
  if (head.x === apple.x && head.y === apple.y) {
    score += 10;
    scoreElement.textContent = score;
    placeApple(); // generamos nueva manzana
  } else {
    // si no come, eliminamos la cola para mantener el tamaño
    snake.pop();
  }
}

// Bucle principal: dibuja y actualiza
function gameLoop() {
  draw();
  update();
}

// Cambia la dirección de la serpiente según la tecla pulsada
function changeDirection(key) {
  if (gameOver) return; // no cambiar si terminó

  const directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
  };

  const newVelocity = directions[key];
  if (!newVelocity) return; // tecla no soportada

  // evitar invertir la dirección 180° (colisión instantánea con sí mismo)
  if (velocity.x === -newVelocity.x && velocity.y === -newVelocity.y) return;

  velocity = newVelocity;
}

// Gestión de eventos de teclado
window.addEventListener("keydown", event => {
  const movementKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"];
  if (movementKeys.includes(event.key)) {
    event.preventDefault(); // prevenir scroll en la página
  }

  // pulsar 'p' para pausar/reanudar
  if (event.key === "p" || event.key === "P") {
    if (!gameOver) paused = !paused;
    return;
  }
  changeDirection(event.key);
});

// Reiniciar desde el botón
restartButton.addEventListener("click", () => {
  resetGame();
});

// Iniciar juego
resetGame();
setInterval(gameLoop, 1000 / speed);
