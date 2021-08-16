const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var button;
var button1, button2;

let engine;
let world;
var ground;
var fruit,rope,rope2,rope3;
var fruit_con;
var fruit_con1;
var fruit_con2;
var rabbit1;

var eat, blink,sad;
var bg_img;
var food;
var rabbit;
var air, cuttingF, eating,ropeCut, Sad,bgSound;

var isMobile;
var canW, canH;

var mute_button;

var blower;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  eat = loadAnimation('eat_0.png',"eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  air = loadSound("air.wav");
  eating = loadSound("eating_sound.mp3");
  ropeCut = loadSound("rope_cut.mp3");
  Sad = loadSound("sad.wav");
  bgSound = loadSound("sound1.mp3");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() 
{
   var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
   if(isMobile){
      canW = displayWidth
      canH = displayHeight
      createCanvas(displayWidth+80,displayHeight);
   } else{
      canW = windowWidth
      canH = windowHeight
      createCanvas(windowWidth,windowHeight);
   }

  frameRate(80);

  bgSound.play()
  bgSound.setVolume(0.5)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  rabbit1 = createSprite(170,canH-80,100,100)
  rabbit1.addImage("rabbit",rabbit)
  rabbit1.scale = 0.19
  rabbit1.addAnimation("blink",blink)
  rabbit1.addAnimation("eating",eat)
  rabbit1.addAnimation("sad",sad)
  rabbit1.changeAnimation("blink")

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40})
  rope3 = new Rope(4,{x:400,y:225})
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope2,fruit);
  fruit_con2 = new Link(rope3,fruit);


  
  //blower = createImg("balloon.png")
  //blower.position(30,250)
  //blower.size(120,80)
  //blower.mouseClicked(airBlow)
 

  button = createImg("cut-button.png")
  button.position(20,30)
  button.size(50,50)
  button.mouseClicked(drop)

  button1 = createImg("cut-button.png")
  button1.position(330,35)
  button1.size(50,50)
  button1.mouseClicked(drop2)

  button2 = createImg("cut-button.png")
  button2.position(360,200)
  button2.size(50,50)
  button2.mouseClicked(drop3)


  mute_button = createImg("Mute_button.png")
  mute_button.position(450,20)
  mute_button.size(40,40)
  mute_button.mouseClicked(musicOff)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  rabbit1.debug = false;
  
}



function draw() 
{
  background(51);

  image(bg_img,displayWidth/2,displayHeight/2,displayWidth+80,displayHeight);

  if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);
  }
  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,rabbit1)== true){
     rabbit1.changeAnimation("eating")
     eating.play()
  }

  if(fruit != null && fruit.position.y>=650){
     rabbit1.changeAnimation("sad")
     bgSound.stop()
     Sad.play()
     fruit = null;
  }

  drawSprites()
 
   
}

function drop(){
   rope.break();
   fruit_con.detach();
   fruit_con = null;
   ropeCut.play()
}

function drop2(){
   rope2.break()
   fruit_con1.detach()
   fruit_con1 = null;
   ropeCut.play()
}

function drop3(){
   rope3.break()
   fruit_con2.detach()
   fruit_con2 = null;
   ropeCut.play()
}

function collide(body,sprite){
    if(body!= null){
       var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
       if(d<=50){
          World.remove(engine.world,fruit)
          fruit = null;
      
          return true
       }
        else{
          return false
        }
    }
}

function airBlow(){
   Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
}

function musicOff(){
   if(bgSound.isPlaying()){
      bgSound.stop()
   }
   else{
         bgSound.play()
      }
   }
