var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let restartGame = document.getElementById("restartGame");
let gameBg = document.getElementsByClassName("backgroundDefault");
let instructionsBtn = document.getElementById("instructionsButton");
let instructionsDiv = document.getElementById("instructions");


//Global
let interval;
let frames = 0;
let images = {};
let playerOneScore = 0;
let playerTwoScore = 0;
let sounds = {powerUp: "http://soundbible.com/mp3/Power-Up-KP-1879176533.mp3", bgmusic: "http://soundimage.org/wp-content/uploads/2016/06/Future-RPG.mp3", pwrup: "http://soundimage.org/wp-content/uploads/2016/04/PowerUp16.mp3", touchWallSound: "http://soundbible.com/grab.php?id=1604&type=mp3", touchSnake: "http://soundimage.org/wp-content/uploads/2016/04/Laser-Shot-3.mp3"};
let numToRestart = 3;
let rounds = 0;
let totalRounds = 3;
let gameOn = false;
//Colors
let playerOneColor = "#00ffff";
let playerTwoColor = "#ffcc00";

//Food constructor
class Food {
  constructor() {
    this.x = canvas.width/2-20;
    this.y = 360;
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
//Velocidades Iniciales
let dx = 1;
let dy = 1;

let dx2 = -1;
let dy2 = 1;

//Instancias
let food = new Food();
let playerOne = [{ x: 200, y: 50 }];
let playerTwo = [{ x: 440, y: 50 }];

function instances(){
  playerOne = [{ x: 200, y: 50 }];
  playerTwo = [{ x: 420, y: 50 }];
  dx = 1;
  dy = 1;
  dx2 = -1;
  dy2 = 1;
}


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

//Main functions

function start() {
  gameOn = true;
  bgmusic.play();
  numToRestart = 3;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (interval) return;
  interval = setInterval(update, 1000 / 120);
}

function update() {
  frames++;
  if (didGameEnd()) {
    rounds++;
    displayRoundsLeft();
    if(rounds === totalRounds)return gameOver();
    return roundOver()
  }

  changingDirection = false;
  changingDirection2 = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  food.draw();

  if(food.checkIfTouch(playerTwo)) {
    pwrup.play();
    updateScore(0,20);
    food.newCubo = true
  }

  if(food.checkIfTouch(playerOne)) {
    pwrup.play()
    updateScore(20,0);
    food.newCubo = true
  }
  advancePlayerOne();
  drawPlayerOne();
  advancePlayerTwo();
  drawPlayerTwo();
}


function updateScore(pointsForP1, pointsForP2){
    //audioPowerup.play();
    food.erase();
    playerOneScore += pointsForP1;
    playerTwoScore += pointsForP2;
    document.getElementById("playerOneScore").innerHTML = playerOneScore;
    document.getElementById("playerTwoScore").innerHTML = playerTwoScore;
}


//Esto hay que pulir

function gameOver(){
  gameOn = true;
  clearInterval(interval);
  if(playerOneScore > playerTwoScore){
    gameBg[0].classList.toggle("backgroundBlue");
    document.getElementsByTagName("h1")[0].innerText = "Player One Won!";
  }
  if(playerOneScore < playerTwoScore){
    gameBg[0].classList.toggle("backgroundOrange")
    document.getElementsByTagName("h1")[0].innerText = "Player Two Won!";
  }
  interval = undefined;
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.fillText("Press RESET button", canvas.width / 2, canvas.height / 2 + 30);
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
}

function roundOver() {
  gameOn = true;
  clearInterval(interval);
  interval = undefined;
  ctx.fillStyle = "white";
  if(playerOneScore > playerTwoScore){
    let csP1 = playerOneScore - playerTwoScore
    ctx.fillText(
        "Player one is winning by " + csP1 + " points!",
        canvas.width / 2,
        canvas.height / 2 + 60
    );
    ctx.fillText(
        "Player two score: " + playerTwoScore,
        canvas.width / 2,
        canvas.height / 2 + 90
    );
  }

  if(playerOneScore < playerTwoScore){
    let csP2 = playerTwoScore - playerOneScore;
    ctx.fillText(
        "Player two is winning by " + csP2 + " points!",
        canvas.width / 2,
        canvas.height / 2 + 60
    );
    ctx.fillText(
        "Player one score: " + playerOneScore,
        canvas.width / 2,
        canvas.height / 2 + 90
    );

  }

  ctx.fillText("This round is over!", canvas.width / 2, canvas.height / 2);
  //automatic restart

  let bliss = setInterval(()=>{
    frames++;
      numToRestart--;
      drawCounter();
      if(numToRestart<1) {
        clearInterval(bliss);
        instances();
        drawCounter();
      }
  },1000);
  setTimeout(start,3000)
}

function drawCounter(){
  ctx.clearRect(canvas.width/2-80, 160, 160,20);
  ctx.fillText("Restarting in : " + numToRestart, canvas.width / 2, canvas.height / 2 -50)
}

function displayRoundsLeft(){
  let roundsLeft = totalRounds - rounds;
  document.getElementsByTagName("h1")[0].innerText = "Rounds left: " + roundsLeft;
  if(roundsLeft === 1){
    document.getElementsByTagName("h1")[0].innerText = "Last round!";
    console.log("Last round!")
  }
  }

function didGameEnd() {
  for (let m = 1; m < playerTwo.length; m++) {
    //Cabeza
    if (
      playerOne[0].x === playerTwo[0].x &&
      playerOne[0].y === playerTwo[0].y
    ) {
      crashSnakeSound.play();
      return true;
    }
    //
    if (
      playerOne[m].x === playerTwo[0].x &&
      playerOne[m].y === playerTwo[0].y
    ) {
      updateScore(10,0);
      crashSnakeSound.play();
      return true;
    }

    if (
      playerTwo[m].x === playerTwo[0].x &&
      playerTwo[m].y === playerTwo[0].y
    ) {
      updateScore(10,0);
      crashSnakeSound.play();
      return true;
    }
  }

  for (let l = 1; l < playerOne.length; l++) {
    if (
      playerTwo[0].x === playerOne[0].x &&
      playerTwo[0].y === playerOne[0].y
    ) {
      crashSnakeSound.play();
      return true;
    }
    if (
      playerOne[l].x === playerOne[0].x &&
      playerOne[l].y === playerOne[0].y
    ) {
      updateScore(0,10);
      crashSnakeSound.play();
      return true;
    }
    if (
      playerTwo[l].x === playerOne[0].x &&
      playerTwo[l].y === playerOne[0].y
    ) {
      updateScore(0,10);
      crashSnakeSound.play();
      return true;
    }
  }

  let hitWall =
    playerTwo[0].x < 0 ||
    playerTwo[0].x > canvas.width - 1 ||
    playerTwo[0].y < 0 ||
    playerTwo[0].y > canvas.height - 1;
  if (hitWall) {
    crashWallSound.play();
    updateScore(10,0);
    //playerOneScore +=20 ;
  }

  let hitWall2 =
    playerOne[0].x < 0 ||
    playerOne[0].x > canvas.width - 1 ||
    playerOne[0].y < 0 ||
    playerOne[0].y > canvas.height - 1;
  if (hitWall2) {
    crashWallSound.play();
    updateScore(0,10);
    //playerTwoScore += 20;
  }

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

let bgmusic =new Audio();
bgmusic.src = sounds.bgmusic;
bgmusic.loop = true;

let pwrup = new Audio();
pwrup.src = sounds.pwrup;

let crashWallSound = new Audio();
crashWallSound.src = sounds.touchWallSound;

let crashSnakeSound = new Audio();
crashSnakeSound.src = sounds.touchSnake;

//Listeners

addEventListener('keydown', e=>{
  if (e.key === 'Enter') {
    console.log(gameOn, interval);
    if(!gameOn && !interval) return start();
  }
});


restartGame.addEventListener("click", function() {
  location.reload();
  ctx.restore();
  introScreen();
});

instructionsBtn.addEventListener("click", function(){
  if (instructionsDiv.style.display === "none"){
    instructionsDiv.style.display = "block";
  } else {
    instructionsDiv.style.display = "none";
  }

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

  let goingUp = dy === -1;
  let goingDown = dy === 1;
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

  let goingUp2 = dy2 === -1;
  let goingDown2 = dy2 ===  1;
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



