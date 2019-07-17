var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var bird = new Image();
var birdDown = new Image();
var birdMid = new Image();
var background = new Image();
var ground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fly = new Audio();
var score = new Audio();

bird.src = "./Assets/Images/bluebird-upflap.png";
birdDown.src = "./Assets/Images/bluebird-downflap.png";
birdMid.src = "./Assets/Images/bluebird-midflap.png";
background.src = "./Assets/Images/background.png";
ground .src = "./Assets/Images/ground.png";
pipeNorth.src = "./Assets/Images/pipeNorth.png";
pipeSouth.src = "./Assets/Images/pipeSouth.png";
fly.src = "./Assets/Audio/fly.mp3";
score.src = "./Assets/Audio/score.mp3";

var birdY = 150;
var birdX = 10;
var betweenThePipe = 95;
var pipeGap = 110;
var velocity = 1.4;
var constant;
var birdScore = 0;
var start = false;
var animation;
var tickCount = 0;
var compteur = 0;
var oldPosition = 150;

const letsFly = (e) => {
  if(e.key != "Enter"  && start){
    oldPosition = birdY;
    birdY -= 30;
    fly.play();
  }
  if(e.key == "Enter"){
    start = true;
  }
}

var pipe = [];

pipe.push({
  x : canvas.width,
  y : 0
});

document.addEventListener("keydown", letsFly);

const loadBackground = () => {
  ctx.drawImage(background, 0, 0);
}

const displayScore = () => {
  ctx.font = "30px Arial";
  ctx.fillText(birdScore , 10, canvas.height - 20);
}

const intro = () => {
  loadBackground();
  tickCount += 1;
  if(tickCount <= 10){
    ctx.drawImage(bird , canvas.width / 2 - 20, birdY - 3);
  }else if(tickCount <= 20){
    ctx.drawImage(birdMid , canvas.width / 2 - 20, birdY - 5);
  }else{
    ctx.drawImage(birdDown , canvas.width / 2 - 20, birdY - 10);
  }
  ctx.font = "30px Arial";
  ctx.fillText("Ready ?" , canvas.width / 2 - 55 , canvas.height / 2);
  ctx.font = "15px Arial";
  ctx.fillText("Press Enter !" , canvas.width / 2 - 45 , canvas.height / 2 + 30);
  ctx.drawImage(ground ,0, canvas.height - ground.height);

  if(tickCount == 30){
    tickCount = 0;
  }
  if(!start){
    animation = requestAnimationFrame(intro);
  }else{
    cancelAnimationFrame(animation);
    tickCount = 0;
    return Game();
  }
}

const Game = () => {
  console.log(velocity);
  loadBackground();
  for(var x = 0 + compteur; x < pipe.length; x++){
    constant = pipeNorth.height + betweenThePipe;
    ctx.drawImage(pipeNorth, pipe[x].x, pipe[x].y);
    ctx.drawImage(pipeSouth, pipe[x].x, pipe[x].y + constant);
    pipe[x].x--;
    if(pipe[x].x == pipeGap){
      pipe.push({
        x : canvas.width,
        y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }
    if(birdY >= (canvas.height - ground.height - 22) || (birdY >= pipe[x].y + constant - 20 && birdX >= pipe[x].x - 30  && birdX <= pipe[x].x + pipeNorth.width) ||  (birdY <= pipe[x].y + pipeNorth.height - 10 && birdX >= pipe[x].x - 30  && birdX <= pipe[x].x + pipeNorth.width) ){
      location.reload();
    }
    if(pipe[x].x == 5){
      birdScore++;
      score.play();
    }
    if(pipe[x].x == -100){
      compteur++;
    }

  }
  ctx.drawImage(ground ,0, canvas.height - ground.height);
  birdY += velocity;
  oldPosition += velocity;
  tickCount += 1;
  if(tickCount <= 10){
    ctx.drawImage(bird, birdX, birdY);
  }else if(tickCount <= 20){
    ctx.drawImage(birdMid, birdX, birdY);
  }else{
    ctx.drawImage(birdDown, birdX, birdY);
  }
  if(tickCount == 30){
    tickCount = 0;
  }
  displayScore();
  animation = requestAnimationFrame(Game);
}

const startTheGame = () => {
  intro();
}
startTheGame();
