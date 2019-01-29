var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let startBtn = document.getElementById("startGame");
let frameCount = document.getElementById("frameCount");
let restartGame = document.getElementById("restartGame");
let playerOneHTML = document.getElementById("playerOneHTML");

//Global
let interval;
let frames = 0;
let images = {};
let score1, score2;
let playerOneScore = 0;
let playerTwoScore = 0;

//IMP
let playerTwoColor = "#ffcc00";
let playerOneColor = "#00ffff";

//Snakes
//Player = snake

class Player {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  
}
let playerOne = [{ x: 30, y: 50 }];

//Player 2 = snake
let playerTwo = [{ x: 200, y: 100 }];
//Horizontal and vertical speeds

//Velocidades Iniciales
let dx = 1;
let dy = 0;

let dx2 = 1;
let dy2 = 0;
// When set to true the snake is changing direction
let changingDirection = false;
let changingDirection2 = false;

function introScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "60px avenir";
  ctx.fillStyle = "#99ffff";
  ctx.textAlign = "center";
  ctx.fillText("elecTRONic", canvas.width / 2, canvas.height / 2);
  ctx.font = "20px avenir";
  setTimeout(introScreenTwo, 500);
}

function introScreenTwo() {
  ctx.fillText("Press START", canvas.width / 2, canvas.height / 2 + 50);
}

//Classes y funciones

introScreen();

//Instances

//Main functions

function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (interval) return;
  interval = setInterval(update, 1000 / 120);
}

function nextAttempt() {
  if (playerOneScore == 1) {
    alert("holsa");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect = (20, 20, 150, 100);
  } else {
    alert("perdiste");
  }

  //  PARA NEXT ATTEMPT
  // if (playerOneScore === 5 || playerTwoScore === 5) {
  //   gameOver();
  // }
  // clearInterval(interval);
  // interval = false;
  // ctx.fillStyle = "white";
  // ctx.fillText("GAME OVER", 200, 200);
  // setTimeout(() => {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   start();
  // }, 2000);
  //start();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  if (didGameEnd()) return gameOver();

  changingDirection = false;
  changingDirection2 = false;
  //Possible bug with clearCanvas()
  advancePlayerOne();
  drawPlayerOne();
  advancePlayerTwo();
  drawPlayerTwo();
}

function gameOver() {
  clearInterval(interval);
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.fillText(
    "Presiona el botón para reiniciar",
    canvas.width / 2,
    canvas.height / 2 + 30
  );
  ctx.fillText(
    "Player one score: " + playerOneScore,
    canvas.width / 2,
    canvas.height / 2 + 60
  );
  ctx.fillText(
    "Player two score: " + playerTwoScore,
    canvas.width / 2,
    canvas.height / 2 + 90
  );
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log(playerOneScore);

  document.getElementById("playerOne").innerHTML = "cambio" + playerOneScore;
  //setTimeout(introScreen, 2000);
}

function didGameEnd() {
  for (let m = 1; m < playerTwo.length; m++) {
    //Cabeza
    if (
      playerOne[0].x === playerTwo[0].x &&
      playerOne[0].y === playerTwo[0].y
    ) {
      return true;
    }
    //
    if (
      playerOne[m].x === playerTwo[0].x &&
      playerOne[m].y === playerTwo[0].y
    ) {
      playerOneScore++;
      return true;
    }

    if (
      playerTwo[m].x === playerTwo[0].x &&
      playerTwo[m].y === playerTwo[0].y
    ) {
      playerOneScore++;
      return true;
    }
  }

  for (let l = 1; l < playerOne.length; l++) {
    if (
      playerTwo[0].x === playerOne[0].x &&
      playerTwo[0].y === playerOne[0].y
    ) {
      return true;
    }
    if (
      playerOne[l].x === playerOne[0].x &&
      playerOne[l].y === playerOne[0].y
    ) {
      return true;
    }
    if (
      playerTwo[l].x === playerOne[0].x &&
      playerTwo[l].y === playerOne[0].y
    ) {
      return true;
    }
  }

  let hitWall =
    playerTwo[0].x < 0 ||
    playerTwo[0].x > canvas.width - 1 ||
    playerTwo[0].y < 0 ||
    playerTwo[0].y > canvas.height - 1;

  let hitWall2 =
    playerOne[0].x < 0 ||
    playerOne[0].x > canvas.width - 1 ||
    playerOne[0].y < 0 ||
    playerOne[0].y > canvas.height - 1;

  return hitWall || hitWall2;
}
//Aux Functions

function advancePlayerOne() {
  let headPlayerOne = { x: playerOne[0].x + dx2, y: playerOne[0].y + dy2 };
  playerOne.unshift(headPlayerOne);
}
function drawPlayerOne() {
  playerOne.forEach(snakePart => {
    ctx.strokeStyle = playerOneColor;
    ctx.fillRect(snakePart.x, snakePart.y, 1, 1);
    ctx.strokeRect(snakePart.x, snakePart.y, 1, 1);
  });
}
function advancePlayerTwo() {
  let headPlayerTwo = { x: playerTwo[0].x + dx, y: playerTwo[0].y + dy };
  playerTwo.unshift(headPlayerTwo);
}

function drawPlayerTwo() {
  playerTwo.forEach(snakePart => {
    ctx.strokeStyle = playerTwoColor;
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
