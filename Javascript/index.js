var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var background = new Image();
var ground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fly = new Audio();
var score = new Audio();

bird.src = "./Assets/Images/bird.png";
background.src = "./Assets/Images/background.png";
ground .src = "./Assets/Images/ground.png";
pipeNorth.src = "./Assets/Images/pipeNorth.png";
pipeSouth.src = "./Assets/Images/pipeSouth.png";
fly.src = "./Assets/Audio/fly.mp3";
score.src = "./Assets/Audio/score.mp3";

var birdY = 150;
var birdX = 10;
var betweenThePipe = 90;
var pipeGap = 110;
var velocity = 1;
var constant;
var birdScore = 0;


const letsFly = () => {
  birdY -= 27;
  fly.play();
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

const Game = () => {
  loadBackground();
  for(var x = 0; x < pipe.length; x++){
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
    if(pipe[x].x == -100){
      pipe.splice(x, 1);
    }
    if(birdY >= (canvas.height - ground.height - 22) || (birdY >= pipe[x].y + constant - 20 && birdX >= pipe[x].x - 30  && birdX <= pipe[x].x + pipeNorth.width) ||  (birdY <= pipe[x].y + pipeNorth.height - 10 && birdX >= pipe[x].x - 30  && birdX <= pipe[x].x + pipeNorth.width) ){
      location.reload();
  }
    if(pipe[x].x == 5){
      birdScore++;
      score.play();
    }
  }
  ctx.drawImage(ground ,0, canvas.height - ground.height);
  birdY += velocity;
  ctx.drawImage(bird , birdX, birdY);
  displayScore();
  requestAnimationFrame(Game);
}

Game();
