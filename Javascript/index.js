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
var birdSpeed;
var betweenTheTuyau = 85;

const loadBackground = () => {
  background.onload = () => {
    ctx.drawImage(background, 0, 0);
  }
  ground.onload = () => {
    ctx.drawImage(ground ,0, canvas.height - ground.height);
  }
  bird.onload = () => {
    ctx.drawImage(bird , birdX, birdY);
  }
}

const Game = () => {
  loadBackground();
}

Game();
