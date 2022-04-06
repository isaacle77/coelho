const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var corda,corda2,corda3;
var melancia;
var link,link2,link3;
var bg, melon, blink;
var coelho, sad, eat;
var botao1,botao2, botao3;
var somfundo, somcortando, coelhotriste, coelhocomendo, somsoprador;
var soprador;
var botaomutar;
var larguradocanvas,alturadocanvas;

function preload(){
bg = loadImage("assets/background.png");
melon = loadImage("assets/melon.png");
blink = loadAnimation("assets/blink_1.png", "assets/blink_3.png");
sad = loadAnimation("assets/sad_1.png", "assets/sad_3.png");
eat = loadAnimation("assets/eat_0.png", "assets/eat_4.png");
somfundo = loadSound("assets/sound1.mp3");
somcortando = loadSound("assets/rope_cut.mp3");
coelhotriste = loadSound("assets/sad.wav");
coelhocomendo = loadSound("assets/eating_sound.mp3");
somsoprador = loadSound("assets/air.wav");

blink.playing = true;
sad.playing = true;
eat.playing = true;
eat.looping = false;
sad.looping = false;

}
function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    larguradocanvas = displayWidth;
    alturadocanvas = displayHeight;
  }
  else{
    larguradocanvas = windowWidth;
    alturadocanvas = windowHeight;
  }
  createCanvas(larguradocanvas,alturadocanvas);
  frameRate(80);
  
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  blink.frameDelay = 10;

  coelho = createSprite(170, alturadocanvas-80, 100, 100);
  coelho.addAnimation("piscando",blink);
  coelho.scale = 0.2;
  coelho.addAnimation("eat", eat);
  coelho.addAnimation("sad", sad);
  coelho.changeAnimation("piscando");

  
  botao1 = createImg("assets/cut_btn.png");
  botao1.position(20, 30);
  botao1.size(50, 50);
  botao1.mouseClicked(soltar);

  botao2 = createImg("assets/cut_btn.png");
  botao2.position(330, 35);
  botao2.size(50, 50);
  botao2.mouseClicked(soltar2);

  botao3 = createImg("assets/cut_btn.png");
  botao3.position(360, 200);
  botao3.size(50, 50);
  botao3.mouseClicked(soltar3);
  

  soprador = createImg("assets/balloon.png");
  soprador.position(10,250);
  soprador.size(150,100);
  soprador.mouseClicked(soprar);

  botaomutar = createImg("assets/mute.png");
  botaomutar.position(450,20);
  botaomutar.size(50,50);
  botaomutar.mouseClicked(mutar);

  somfundo.play();
  somfundo.setVolume(0.1);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(larguradocanvas/2,alturadocanvas,larguradocanvas,20);
  
  corda = new Rope(8,{ x : 40, y : 30});
  
  corda2 = new Rope(7,{x:360, y:40});

  corda3 = new Rope(4,{x:400,y:225});
  
  melancia = Bodies.circle(300,300,15);
  Matter.Composite.add(corda.body,melancia);
  link = new Link(corda,melancia);
  link2 = new Link(corda2,melancia);
  link3 = new Link(corda3,melancia);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}
function draw()
{
  background(51);
 if(collide(melancia, coelho)){
   coelho.changeAnimation("eat")
   coelhocomendo.play();
 }
 if(collide(melancia, ground.body)){
   coelho.changeAnimation("sad")
   coelhotriste.play();
 }
  image(bg, width/2, height/2, larguradocanvas, alturadocanvas);
  ground.show();
  corda.show();
  corda2.show();
  corda3.show();
  if(melancia!= null){
    image(melon, melancia.position.x, melancia.position.y, 60, 60);
  }
  Engine.update(engine);
  drawSprites();
 
   
}
function mutar(){
  if(somfundo.isPlaying()){
    somfundo.stop();
  }

  else{
    somfundo.play();
  }
}
function soprar(){
  Body.applyForce(melancia,{x:0,y:0},{x:0.01,y:0});
  somsoprador.play();

}
function soltar(){
  corda.break();
  link.desconectar();
  link = null;
  somcortando.play();
}
function soltar2(){
  corda2.break();
  link2.desconectar();
  link2 = null;
  somcortando.play();
}
function soltar3(){
  corda3.break();
  link3.desconectar();
  link3 = null;
  somcortando.play();
}
function collide(body,sprite){
 if(body!= null){
   var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
 
    if(d <=80){
      World.remove(engine.world, melancia);
      melancia = null
      return true
    }
    else{
      return false
    }
  }
}
