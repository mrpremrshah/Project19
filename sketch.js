var trex_running_Img, trex_dead_Img, trex;
var coin, coinImg;
var snake, snakeImg;
var road, roadImg;
var coinG, snakeG;
var score;
var gameState;
var gameOverImg, gameOver;
var restartImg, restart;

function preload() {

  trex_dead_Img = loadImage("nhb2013-02383_-removebg-preview.png")
  coinImg = loadImage("gold coin.png")
  roadImg = loadImage("road.jpeg")
  trex_running_Img = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  snakeImg = loadImage("snake clipart.gif")
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

}


function setup() {
 
  gameState = "play";
  
  createCanvas(600, 200);
  
  road = createSprite(300,100);
  road.addImage("roadImage", roadImg);
  road.velocityX = -4;
  
  trex = createSprite(100,100)
  trex.addAnimation("running", trex_running_Img)
  
  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(300,100);
  restart.addImage(restartImg);
  restart.visible = false;
  
  score = 0;
  coinG = createGroup();
  snakeG = createGroup();


}

function draw() {
  background(0);
  
  edges = createEdgeSprites();

  trex.setCollider("rectangle",0,0,70,80);
  
  if(gameState === "play") {
    
    trex.changeAnimation("running");
    trex.scale = 0.8;
    
    trex.y = World.mouseY
    
    if(road.x<200) {
    road.x = road.width/2;
    }
    
    road.velocityX = -4;
    
    
    if(coinG.isTouching(trex)) {
      coinG.destroyEach();
      
      score = score+1;
      console.log("score: "+score)
    }
    
    if(snakeG.isTouching(trex)) {
      gameState = "end";
    }
    
    console.log("score:",score);
    
    trex.bounceOff(edges);
    trex.bounceOff(edges);  
    
    SpawnSnakes();
    SpawnCoins();
  }
  
  if(gameState === "end") {
    trex.addImage("dead", trex_dead_Img);
    trex.changeImage("dead");
    trex.scale = 0.3;
    trex.x = 100;
    trex.y = 140;
    
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)) {
      restartGame();
    }
    
    road.velocityX = 0;
    
    snakeG.destroyEach();
    coinG.destroyEach();
    
  }
  

  

  

  
  drawSprites();
}

function SpawnSnakes() {
  if(frameCount%90 === 0) {
    snake = createSprite(500, Math.round(random(25,175)));
    snake.addImage(snakeImg);
    snake.scale = 0.11;
    snake.velocityX = -8;
    snake.lifetime = 60;
    
    snakeG.add(snake);
  }
}

function SpawnCoins() {
  if(frameCount%120 === 0) {
    coin = createSprite(500, Math.round(random(25,175)));
    coin.addImage(coinImg);
    coin.scale = 0.02;
    coin.velocityX = -7;
    coin.lifetime = 60;
    
    coinG.add(coin);
  }
}

function restartGame(){
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;
  
  snakeG.destroyEach();
  coinG.destroyEach();

  score = 0;
}
  



