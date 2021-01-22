//Creating variables for path,mainCyclist,player1,player2,player3;
  var path,mainCyclist;
  var player1,player2,player3;

//Creating variables for pathImage,main Racer Images;
  var pathImg,mainRacerImg1,mainRacerImg2;

//Creating variables for opponent's images
  var oppPinkImg1,oppPinkImg2;
  var oppYellowImg1,oppYellowImg2;
  var oppRedImg1,oppRedImg2;
 
//Creating variables for gameover Image, Cycle Bell.
  var gameOverImg,cycleBell;

//Creating variables for pink cg,yellow cg ,Red cg.
  var pinkCG,yellowCG,redCG;

//Creating variables for End state,play state and gamestate.
  var END =0;
  var PLAY =1;
  var gameState = PLAY;

//Creating variables for distance,GameOver and restart.
  var distance=0;
  var gameOver,restart;

function preload(){
  
//Preloading the images.
pathImg       = loadImage("images/Road.png");
 
mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
   
oppPinkImg1   = loadAnimation("images/opponent1.png","images/opponent2.png");
oppPinkImg2   = loadImage("images/opponent3.png");
  
oppYellowImg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
oppYellowImg2 = loadImage("images/opponent6.png");
  
oppRedImg1    = loadAnimation("images/opponent7.png","images/opponent8.png");
oppRedImg2    = loadImage("images/opponent9.png");
 
gameOverImg   = loadImage("images/gameOver.png");
 
cycleBell     = loadSound("sound/bell.mp3");
}

function setup(){
  
//Creating canvas
    createCanvas(1200,300);

// Moving background
    path=createSprite(100,150);
    path.addImage(pathImg);
    path.velocityX =-5;

//creating boy running
    mainCyclist  = createSprite(70,150);
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    mainCyclist.scale=0.07;

//Creating Gameover's sprite
    gameOver = createSprite(390,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.8;
    gameOver.visible=false;

//Creating new groups
    pinkCG = new Group();
    yellowCG = new Group();
    redCG = new Group();
}


function draw() {
  
//background 
    background(0);
  
//To draw sprites.  
    drawSprites();
    
//To text distance on the output area.    
    textSize(20);
    fill(255);
    text("Distance: "+ distance,350,30);
  
//Conditions if gamestate is play:
if(gameState===PLAY){
    
    //score of distance
    distance = distance+Math.round(getFrameRate()/50);
    
    //Increment of moving ground by the increment of distance covered
    path.velocityX = -(6 + 2*distance/150);
    
    //Main racer will move according to the mouse
    mainCyclist.y = World.mouseY;
   
    //Creating Edge sprites
    edges= createEdgeSprites();
    
    //Main cyclist colliding to the edges.
    mainCyclist .collide(edges);
  
    //code to reset the background
    if(path.x < 0 ){
    path.x = width/2;
    }
    
    //To ring the bell if space key is pressed.
    if(keyDown("space")){
      bellSound.play();
    }
    
    //to place the the opponent players randomly.
    var select_oppPlayer = Math.round(random(1,3))
    
    if(World.frameCount % 150 == 0){
      if(select_oppPlayer==1){
        pinkCyclist();
      }else if(select_oppPlayer==2){
        yellowCyclist();
      } else {
        redCyclist();
      }
    }
  
    //if Pinkcg group is touching the main cyclist:-
    if(pinkCG.isTouching(mainCyclist)){
      //Go to gamestate = end
      gameState = END;
      //player1 velocity to 0.
      player1.velocityX=0
      //change player1 animation to opponent image 2.
      player1.addAnimation("opponentplayer1",oppPinkImg2);
    }
    
     //if yellowcg group is touching the main cyclist:-
    if(yellowCG.isTouching(mainCyclist)){
      //Go to gamestate = end
      gameState = END
      //player2 velocity to 0.
      player2.velocityX=0
      //change player2 animation to opponent image 2.
      player2.addAnimation("opponentplayer4",oppYellowImg2);
    }
    
    //if redcg group is touching the main cyclist:-
     if(redCG.isTouching(mainCyclist)){
      //Go to gamestate = end
      gameState = END
      //player3 velocity to 0.
      player3.velocityX=0
      //change player3 animation to opponent image 2.
      player3.addAnimation("opponentplayer7",oppRedImg2);
    }
  
  }//Conditions to be followed if gamestate is end
  else if(gameState === END){
      //GameOver sprite should be visible
      gameOver.visible=true;
      //to text press up arrow to restart 
      textSize(24);
      fill(255);
      text("press up arrow to restart!",250,200);
     
      //path velocity x should be 0
      path.velocityX =0;
      //mainCyclist velocity y should be 0
      mainCyclist.velocityY =0;
      // to change the animation of the main racer
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);    
      
      //pink cg velocityX each should be 0 and lifetime should start from -1
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
    
      //yellow cg velocityX each should be 0 and lifetime should start from -1
      yellowCG.setVelocityXEach(0);
      yellowCG.setLifetimeEach(-1);
    
      //red cg velocityX each should be 0 and lifetime should start from -1
      redCG.setVelocityXEach(0);
      redCG.setLifetimeEach(-1);
      
      // if keydown up arrow is pressed move to the reset function
      if(keyDown("UP_ARROW")){
        reset();
      }
  }

}

//Creating function for pink Cyclist
function pinkCyclist(){
  player1=createSprite(1100,Math.round(random(50,250)));
  player1.scale=0.06;
  player1.addAnimation("opponentplayer1",oppPinkImg1);
  player1.velocityX=-(6 + 2*distance/150);
  player1.lifetime=1200;
  pinkCG.add(player1);
}

//Creating function for yellow cyclist.
function yellowCyclist(){
  player2=createSprite(1100,Math.round(random(50,250)));
  player2.scale=0.06;
  player2.addAnimation("opponentplayer4",oppPinkImg1);
  player2.velocityX=-(6 + 2*distance/150);
  player2.lifetime=1200;
  yellowCG.add(player2);
}

//Creating function for red cyclist
function redCyclist(){
  player3=createSprite(1100,Math.round(random(50,250)));
  player3.scale=0.06;
  player3.addAnimation("opponentplayer7",oppPinkImg1);
  player3.velocityX=-(6 + 2*distance/150);
  player3.lifetime=1200;
  redCG.add(player3);
}

//Creating reset function
function reset(){
  //Gamestate should be play
  gameState=PLAY;
  //gameover visibility should be false
  gameOver.visible=false;
  //main cyclist change animation to main racer image 1
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  //to destroy each of the pinkcg,yellowcg,redcg
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  //to start the distance from 0;
  distance = 0;
  
}
 
