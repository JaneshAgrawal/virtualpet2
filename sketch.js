
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var food;
var addFood,feed;
var fedTime,lastFed;
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(900,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  food=new Food();

  addFood=createButton("add Food");
  addFood.position (450,70);
  addFood.mousePressed(AddFood)

  feed=createButton("feed Food");
  feed.position (550,70);
}


function draw() {  
  background(46, 139, 87);
    

    fedTime=database.ref("FeedTime")

    fedTime.on("value",function(data){
      lastFed = data.val();
    })

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
  

    if(foodS === 0){
      foodS = 20;
    }

    drawSprites();
   food.display();
  }


function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function AddFood()
{
  foodS++;
  database.ref('/').update({
    Food:foodS,
  })
}