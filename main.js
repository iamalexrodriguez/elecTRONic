var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let startBtn = document.getElementById("startGame");
let frameCount = document.getElementById("frameCount");
let restartGame = document.getElementById("restartGame");

//Global
let interval;
let gameStarted = false;
let isRunning = false;
let frames = 0;
let images = {};
let keys = {};
let intervalIntro;
let playerOneScore = 0;
let playerTwoScore = 0;

//IMP
let GAME_SPEED = 100;
let snakeColor = "#ffcc00";
let snakeBorderColor = "#ffcc00";
let snakeColor2 = "#00ffff";
let snakeBorderColor2 = "#00ffff";

//Snakes
//Player = snake
let snake2 = [{ x: 30, y: 50 }];

//Player 2 = snake
let snake = [{ x: 300, y: 300 }];
//Horizontal and vertical speeds

// When set to true the snake is changing direction
let changingDirection = false;
let changingDirection2 = false;

//Velocidades Iniciales
let dx = 1;
let dy = 0;

let dx2 = 1;
let dy2 = 0;

//Para dibujar el grid

function drawBoard() {
  for (let y = 0; y <= canvas.height; y += 10) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "lightgrey";
    ctx.stroke();
  }

  for (let x = 0; x <= canvas.width; x += 10) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
}

function introScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "60px avenir";
  ctx.fillStyle = "#99ffff";
  ctx.textAlign = "center";
  ctx.fillText("elecTRONic", canvas.width / 2, canvas.height / 2);
  ctx.font = "20px avenir";
  //if (frames % 50 === 0) introScreenTwo();
  setTimeout(introScreenTwo, 500);
}

function introScreenTwo() {
  ctx.fillText("Press START", canvas.width / 2, canvas.height / 2 + 50);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Classes y funciones

//  drawBoard();

introScreen();

//

//limites

//Instances

//Main functions

function start() {
  gameStarted = true;
  isRunning = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (interval) return;
  interval = setInterval(update);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  if (didGameEnd()) return gameOver();

  changingDirection = false;
  changingDirection2 = false;
  //Possible bug with clearCanvas()
  advanceSnake();
  drawSnake();
  advanceSnake2();
  drawSnake2();
}

function gameOver() {
  isRunning = false;
  clearInterval(interval);
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", 200, 200);
  ctx.fillText("Presiona el botón para reiniciar", 200, 300);
  ctx.fillText("Player one score: " + playerOneScore, 600, 200);
  ctx.fillText("Player two score: " + playerTwoScore, 600, 400);
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log(playerOneScore);
}

function didGameEnd() {
  for (let m = 1; m < snake.length; m++) {
    //Cabeza
    if (snake2[0].x === snake[0].x && snake2[0].y === snake[0].y) return true;
    //
    if (snake2[m].x === snake[0].x && snake2[m].y === snake[0].y) return true;
    if (snake[m].x === snake[0].x && snake[m].y === snake[0].y) {
      playerOneScore++;
      return true;
    }
  }

  for (let l = 1; l < snake2.length; l++) {
    if (snake[0].x === snake2[0].x && snake[0].y === snake2[0].y) return true;
    if (snake2[l].x === snake2[0].x && snake2[l].y === snake2[0].y) return true;
    if (snake[l].x === snake2[0].x && snake[l].y === snake2[0].y) return true;
  }

  //To be refactored
  let hitWall =
    snake[0].x < 0 ||
    snake[0].x > canvas.width - 1 ||
    snake[0].y < 0 ||
    snake[0].y > canvas.height - 1;

  let hitWall2 =
    snake2[0].x < 0 ||
    snake2[0].x > canvas.width - 1 ||
    snake2[0].y < 0 ||
    snake2[0].y > canvas.height - 1;

  return hitWall || hitWall2;
}
//Aux Functions

function advanceSnake() {
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
}

function drawSnake() {
  snake.forEach(snakePart => {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorderColor;
    ctx.fillRect(snakePart.x, snakePart.y, 1, 1);
    ctx.strokeRect(snakePart.x, snakePart.y, 1, 1);
  });
}

function advanceSnake2() {
  let head2 = { x: snake2[0].x + dx2, y: snake2[0].y + dy2 };
  snake2.unshift(head2);
}
function drawSnake2() {
  snake2.forEach(snakePart => {
    ctx.fillStyle = snakeColor2;
    ctx.strokeStyle = snakeBorderColor2;
    ctx.fillRect(snakePart.x, snakePart.y, 1, 1);
    ctx.strokeRect(snakePart.x, snakePart.y, 1, 1);
  });
}

//Listeners

startBtn.addEventListener("click", function() {
  console.log("start");
  start();
});

restartGame.addEventListener("click", function() {
  console.log("start");
  location.reload();
  ctx.restore();
  introScreen();
});

// Call changeDirection whenever a key is pressed
document.addEventListener("keydown", changeDirection);
document.addEventListener("keydown", changeDirection2);
/*
document.addEventListener("keydown", e => {
  console.log(e.keyCode);
  if (e.keyCode === 37) {
    dx = -1;
    dy = 0;
  }

  if (e.keyCode === 39) {
    dx = 1;
    dy = 0;
  }

  if (e.keyCode === 38) {
    dx = 0;
    dy = -1;
  }

  if (e.keyCode === 40) {
    dx = 0;
    dy = 1;
  }

  if (e.keyCode === 65) {
    dx2 = -1;
    dy2 = 0;
  }

  if (e.keyCode === 68) {
    dx2 = 1;
    dy2 = 0;
  }

  if (e.keyCode === 87) {
    dx2 = 0;
    dy2 = -1;
  }

  if ((e.keyCode = 83)) {
    dx2 = 0;
    dy2 = 1;
  }
});

addEventListener("keyup", e => {
  keys[e.keyCode] = false;
});
*/

//pass event

//addEventListener()

//Starting the game 8 / before
//drawBoard();

function changeDirection(event) {
  let leftKey = 37;
  let rightKey = 39;
  let upKey = 38;
  let downKey = 40;

  if (changingDirection) return;
  changingDirection = true;

  let keyPressed = event.keyCode;

  let goingUp = dy === 1;
  let goingDown = dy === -1;
  let goingRight = dx === 1;
  let goingLeft = dx === -1;

  if (keyPressed === leftKey && !goingRight) {
    dx = -1;
    dy = 0;
  }

  if (keyPressed === upKey && !goingDown) {
    dx = 0;
    dy = -1;
  }

  if (keyPressed === rightKey && !goingLeft) {
    dx = 1;
    dy = 0;
  }

  if (keyPressed === downKey && !goingUp) {
    dx = 0;
    dy = 1;
  }
}

function changeDirection2(event) {
  let aKey = 65;
  let dKey = 68;
  let wKey = 87;
  let sKey = 83;

  if (changingDirection2) return;
  changingDirection2 = true;

  const keyPressed = event.keyCode;

  let goingUp2 = dy2 === 1;
  let goingDown2 = dy2 === -1;
  let goingRight2 = dx2 === 1;
  let goingLeft2 = dx2 === -1;

  if (keyPressed === aKey && !goingRight2) {
    dx2 = -1;
    dy2 = 0;
  }

  if (keyPressed === wKey && !goingDown2) {
    dx2 = 0;
    dy2 = -1;
  }

  if (keyPressed === dKey && !goingLeft2) {
    dx2 = 1;
    dy2 = 0;
  }

  if (keyPressed === sKey && !goingUp2) {
    dx2 = 0;
    dy2 = 1;
  }
}


