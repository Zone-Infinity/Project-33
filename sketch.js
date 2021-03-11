const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var plinkos = [];
var divisions = [];
var divisionScores = [];

var divisionHeight = 300;
var score = 0, turns = 5;
var particle;

var PLAY=0,END=1;
var gameState = PLAY;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
    divisionScores.push(round(((random(1))*10)+1)*50);
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  /*
  if (frameCount % 60 === 0) {
    particles.push(new Particle(random(width / 2 - 30, width / 2 + 30), 10, 10));
    score++;
  }

  for (var j = 0; j < particles.length; j++) {
    particles[j].display();
  }
  */

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(particle!=null){
    particle.display();
    
    var pos = particle.body.position;

    if(pos.y > 760){
      
      var div = Math.floor(pos.x / 80)
      score+=divisionScores[div];
      //console.log(div);

      particle = null;
      if(turns <= 0) gameState = END;
    }
  }

  // text("X: "+mouseX+" Y: "+mouseY, 675, 20);

  textSize(30);
  for(var i = 15, j = 0; i<800; i+=80, j++){
    text(divisionScores[j], i, 530);
  }

  if(gameState === END){
    textSize(50);
    text("Game Over", 270, 240);
  }

}

function mousePressed(){
    if(gameState==PLAY){
      turns--;
      particle = new Particle(mouseX, 10, 10);
    }
}
