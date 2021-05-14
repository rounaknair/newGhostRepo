var tower,towerImg;

var doorGroup,door,doorImg;

var climberGroup,climber,climberImg;

var ghost,ghostImg,ghostStandImg;

var invisibleClimber,invisibleClimberGroup;


var PLAY=1;
var END=0;

var gameState=PLAY;



function preload()
{
towerImg=loadImage("tower.png");
doorImg=loadImage("door.png");
climberImg=loadImage("climber.png");
ghostImg=loadImage("ghost-jumping.png");
ghostStandImg=loadImage("ghost-standing.png");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);

  tower=createSprite(width/2,height/2);
  tower.addImage("background",towerImg);
  tower.scale=1;
  
  
  doorGroup= new Group();
  climberGroup= new Group();
  invisibleClimberGroup=new Group();

  ghost=createSprite(600,200,50,50);
  ghost.addImage("ghost",ghostStandImg);
  ghost.scale=0.35;

  
  
}

function draw()
{
  background("white");
  drawSprites();
 
if(gameState==PLAY)
{
  tower.velocityY=1;

 if(keyDown("left_Arrow"))
 {
   ghost.x=ghost.x-3;
   ghost.addImage("ghost",ghostImg);
 }

 if(keyDown("right_Arrow"))
 {
   ghost.x=ghost.x+3;
   ghost.addImage("ghost",ghostImg);
 }

 if(keyDown("space"))
 {
   ghost.addImage("ghost",ghostImg);
   ghost.velocityY=-5;
   
 }

ghost.velocityY=ghost.velocityY+ 0.8;

  if(tower.y>400)
  {
    tower.y=300;
  }


  spawnDoor();

  if(climberGroup.isTouching(ghost))
  {
    ghost.velocityY=-1;
    ghost.addImage("ghost",ghostStandImg);

  }
if(invisibleClimberGroup.isTouching(ghost) || ghost.y>height-50)
{
  gameState=END;
}
}
else if(gameState==END)
{
  textSize(30);
  fill("black");
  text("GAME OVER",width/2-100,height/2);
  ghost.velocityY=0;
  tower.velocityY=0;
  doorGroup.setVelocityYEach(0);
  climberGroup.setVelocityYEach(0);
  invisibleClimberGroup.setVelocityYEach(0);

  doorGroup.setlifetimeEach(-1);
  climberGroup.setlifetimeEach(-1);
  invisibleClimberGroup.setlifetimeEach(-1);

  //doorGroup.destroyEach();
  //climberGroup.destroyEach();
  //invisibleClimberGroup.destroyEach();
}
}

function spawnDoor()
{
  if(frameCount%240==0)
  {
    door=createSprite(400,-50);
    climber=createSprite(400,15);

    invisibleClimber=createSprite(400,20);
    invisibleClimber.visible=false;
    invisibleClimber.height=2;
    invisibleClimber.width=climber.width;
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    door.scale=1;
    climber.scale=1;
    door.x=Math.round(random(500,800));

    door.lifetime=800;
    climber.lifetime=800;
    invisibleClimber.lifetime=800;

    climber.x=door.x;
    invisibleClimber.x=door.x;

    door.velocityY=1;
    climber.velocityY=1;
    invisibleClimber.velocityY=1;


    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleClimberGroup.add(invisibleClimber);
  }
}

