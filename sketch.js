var wheel_img,knife_img,fruit1_img,monster_img;
var wheel,knife,fruit1,monster;
var startx=300,starty=300,angle=0,radius=150,increment=10;
var startx2=330,starty2=300,angle2=20,radius2=150,increment2=5;
var gameState="play";
var score=0;

function preload() {

 
  wheel_img=loadImage("images/wheel.png");
  knife_img=loadImage("images/sword.png");
  fruit1_img=loadImage("images/apple.png");
  monster_img=loadImage("images/monster.png")
}

function setup() {

  createCanvas(700,700);
wheel=createSprite(300,300);
wheel.scale=1.3;
wheel.addImage(wheel_img);
wheel.rotation=270;
wheel.debug=false;
wheel.setCollider("circle",0,0,105);
  
knife=createSprite(300,650);
knife.addImage(knife_img);
knife.rotation=-45;
knife.debug=false;
knife.setCollider("rectangle",20,-30,50,70);

fruit1=createSprite(startx,starty);
fruit1.addImage(fruit1_img);
fruit1.scale=0.3;
fruit1.debug=false;

monster=createSprite(startx2,starty2);
monster.addImage(monster_img);
monster.scale=0.3;

 }

function draw() {
 background(rgb(38,0,73));

 textSize(20);
 text("SCORE: "+score,50,70);
 
   if(gameState==="play"){
   
    wheel.rotation=wheel.rotation+10;

    angle=angle+increment;
    fruit1.x=startx+radius*Math.cos(angle*Math.PI/180);
    fruit1.y=starty+radius*Math.sin(angle*Math.PI/180);
    fruit1.rotation=60-angle;

    angle2=angle2+increment2;
    monster.x=startx2+radius2*Math.cos(angle2*Math.PI/180);
    monster.y=starty2+radius2*Math.sin(angle2*Math.PI/180);
    monster.rotation=60-angle2;

    if(keyDown("up")){
      knife.velocityY=-10;
    }

     if(knife.isTouching(wheel)){
       knife.velocityY=0;
       wheel.rotation=0;
       fruit1.x=140;
       fruit1.y=300;
       fruit1.rotation=0;
       monster.x=startx2+100;
       monster.y=starty2;
       monster.rotation=0;
     }


    if(knife.isTouching(fruit1)){
       knife.x=300;
       knife.y=650;
       knife.velocityY=0;
       fruit1.destroy();
       score=score+5;
    }

    if(keyDown("space") && knife.y<0){
       knife.y=650;
       knife.x=300;
       knife.velocityY=0;
    }

    if(knife.isTouching(monster)){
      gameState="end";
    }

  }  

  if(gameState==="end"){
    textSize(40);
    text("GAMEOVER!!!",200,100);
    knife.velocityY=0;
  }

 drawSprites();
}