var coinImg;
var gameOver;
var refresh;
var penguinImg;
var penguin;
var roadImg;
var car_1Img, car_2Img;
var score = 0;
var coin;

//car 1 is the right car, car 2 will be the left one

function preload(){
  car_1Img = loadImage("carright.png");
  car_2Img = loadImage("carleft.png");
  coinImg = loadImage("coin.png")
  penguinImg = loadAnimation("Penguin.png", "penguinleft.png", "penguinright.png");
  gameOver = loadImage("GameOver.png");
  refresh = loadImage("refresh.png");
  roadImg = loadImage("background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  road = createSprite(500, 500, width / 2, 600);
  road.addImage("pathImg", roadImg);
  road.velocityY = 4;
  //road.scale = ;

  penguin = createSprite(width / 2, height - 50, 50, 20);
  penguin.addAnimation("penguin_running", penguinImg);
  penguin.scale = 0.25;

  car1Group = new Group();
  car2Group = new Group();
  coinGroup = new Group();
}



function draw() {
  background(255,255,255);  

  edges = createEdgeSprites();

  if(road.y > height){
    road.y = height / 2;
  }

  if(keyDown("space")){
    penguin.velocityY = -5;
  }

  if(keyDown("right")){
    penguin.velocityX += 1;
  }

  if(keyDown("left")){
    penguin.velocityX -= 1;
  }



  penguin.velocityY = penguin.velocityY + 0.5;
  
  penguin.collide(edges);

  spawnCar1();
  spawnCar2();
  spawnCoins();

  if(coinGroup.isTouching(penguin)){
    score = score + 20;
    coinGroup.destroyEach();
  }

  if(car1Group.isTouching(penguin)){
    penguin.collide(car1Group);
  }

  if(car2Group.isTouching(penguin)){
    score = score - 5;
    penguin.collide(car2Group);
  }

  drawSprites()
 
  
  textSize(20);
  fill(255);
  text("Score: " + score, width - 150, 30);

}

function spawnCar1(){
  if(World.frameCount % 250 == 0){
    var car_1 = createSprite(Math.round(random(50, width - 50), 40, 20, 20));
    car_1.addImage(car_1Img)
    car_1.scale = 0.25;
    car_1.velocityY = 5;
    car_1.lifetime = 200;
    car1Group.add(car_1);
  }
}

function spawnCar2(){
  if(World.frameCount % 280 == 0){
    var car_2 = createSprite(Math.round(random(50, width - 30), 40, 20, 20));
    car_2.addImage(car_2Img)
    car_2.scale = 0.25;
    car_2.velocityY = 5;
    car_2.lifetime = 250;
    car2Group.add(car_2);
  }
}

function spawnCoins(){
  if(World.frameCount % 320 == 0){
    coin = createSprite(Math.round(random(50, width - 50), 40, 20, 20));
    coin.addImage(coinImg)
    coin.scale = 0.15;
    coin.velocityY = 5;
    coin.lifetime = 250;
    coinGroup.add(coin);
  }
}