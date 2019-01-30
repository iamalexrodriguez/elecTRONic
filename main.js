var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let restartGame = document.getElementById("restartGame");
//let playerOneHTML = document.getElementById("playerOneScore");
let playerTwoHTML = document.getElementById("playerTwoScore");


//Global
let interval;
let frames = 0;
let images = {};
let score1, score2;
let playerOneScore = 0;
let playerTwoScore = 0;
let sounds = {powerUp: "http://soundbible.com/mp3/Power-Up-KP-1879176533.mp3"}

//IMP
let playerTwoColor = "#ffcc00";
let playerOneColor = "#00ffff";

//Snakes
//Player = snake

//Food constructor
class Food {
  constructor() {
    this.x = 100;
    this.y = 150;
    this.width = 10;
    this.height = 10;
    this.newCubo = false
    }

    draw() {
      if(this.newCubo){
        this.x = generateRandomNumber(50,600);
        this.y = generateRandomNumber(50,400);
        this.newCubo = false
      }
      ctx.fillStyle ="white";
      ctx.fillRect(this.x,this.y,this.width,this.height);
      console.log(this.x)
    }

    checkIfTouch(obstacle) {
      return (
          this.x < obstacle[0].x &&
          this.x + this.width > obstacle[0].x &&
          this.y < obstacle[0].y &&
          this.y + this.height > obstacle[0].y
      )
    }

    erase(){
      ctx.clearRect(this.x,this.y,this.width,this.height)

    }
}



//Instancias
let food = new Food();


let playerOne = [{ x: 30, y: 50 }];

//Player 2 = snake
let playerTwo = [{ x: 200, y: 100 }];

function instances(){
  playerOne = [{ x: 30, y: 50 }];

//Player 2 = snake
  playerTwo = [{ x: 200, y: 100 }];
  dx = 1;
  dy = 0;

  dx2 = 1;
  dy2 = 0;
}

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
  ctx.fillText("Press ENTER to begin..", canvas.width / 2, canvas.height / 2 + 50);
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

  frames++;

  if (didGameEnd()) return gameOver();
  changingDirection = false;
  changingDirection2 = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  food.draw();

  if(food.checkIfTouch(playerTwo)) {

    updateScore(0,20);
    food.newCubo = true
  }


  if(food.checkIfTouch(playerOne)) {
    updateScore(20,0);
    food.newCubo = true
  }

  advancePlayerOne();
  drawPlayerOne();
  advancePlayerTwo();
  drawPlayerTwo();



}

function updateScore(pointsForP1, pointsForP2){
  audioPowerup.play()
    food.erase()
    playerOneScore += pointsForP1;
    playerTwoScore += pointsForP2;
    document.getElementById("playerOneScore").innerHTML = "Current score: " + playerOneScore;
    document.getElementById("playerTwoScore").innerHTML = "Current score: " + playerTwoScore;

}

function gameOver() {
  clearInterval(interval);
  interval = undefined
  document.getElementById("playerOneScore").innerHTML = "Current score: " + playerOneScore;
  document.getElementById("playerTwoScore").innerHTML = "Current score: " + playerTwoScore;
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.fillText("Press reset button", canvas.width / 2, canvas.height / 2 + 30);
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

  //automatic restar
  let num = 3
  let bliss = setInterval(()=>{
    frames++
    if(frames%100===0){
      console.log("si funciono")
      num--
      ctx.fillText("reiniciando en : " + num, 100,100)
      if(num<1) {
        clearInterval(bliss)
        instances()
        introScreen()
        introScreenTwo()
      }
    }


  },1000/60)
  setTimeout(start,7000)

}

function didGameEnd() {
  for (let m = 1; m < playerTwo.length; m++) {
    //Cabeza
    if (
      playerOne[0].x === playerTwo[0].x &&
      playerOne[0].y === playerTwo[0].y
    ) {
      //EMPATE?
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
      //EMPATE?
      return true;
    }
    if (
      playerOne[l].x === playerOne[0].x &&
      playerOne[l].y === playerOne[0].y
    ) {
      playerTwoScore++;
      return true;
    }
    if (
      playerTwo[l].x === playerOne[0].x &&
      playerTwo[l].y === playerOne[0].y
    ) {
      playerTwoScore++;
      return true;
    }
  }

  let hitWall =
    playerTwo[0].x < 0 ||
    playerTwo[0].x > canvas.width - 1 ||
    playerTwo[0].y < 0 ||
    playerTwo[0].y > canvas.height - 1;
  if (hitWall) {
    playerOneScore++;
    console.log(playerOneScore);
  }

  //playerOneScore++;

  let hitWall2 =
    playerOne[0].x < 0 ||
    playerOne[0].x > canvas.width - 1 ||
    playerOne[0].y < 0 ||
    playerOne[0].y > canvas.height - 1;
  if (hitWall2) {
    playerTwoScore++;
  }

  //playerTwoScore++;

  return hitWall || hitWall2;
}
//Aux Functions

function generateRandomNumber(min_value , max_value)
{
  return Math.random() * (max_value-min_value) + min_value;
}

function advancePlayerOne() {
  let headPlayerOne = { x: playerOne[0].x + dx2, y: playerOne[0].y + dy2 };
  playerOne.unshift(headPlayerOne);
  if(playerOne.length > 600) playerOne.pop()
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
  if(playerTwo.length > 600) playerTwo.pop()
}

function drawPlayerTwo() {
  playerTwo.forEach(snakePart => {
    ctx.strokeStyle = playerTwoColor;
    ctx.fillRect(snakePart.x, snakePart.y, 1, 1);
    ctx.strokeRect(snakePart.x, snakePart.y, 1, 1);
  });
}

//Sounds
let audioPowerup = new Audio();
audioPowerup.src = sounds.powerUp;

//Listeners



addEventListener('keydown', e=>{
  if(e.key === 'Enter'){
    start()
  }
})

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
