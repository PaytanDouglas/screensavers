// Daniel Shiffman's : https://youtu.be/CKeyIbT3vXI

//FIREWORKS JS FILE
function Firework() {
  this.hue = random(255);                         //gives fireworks their hue
  this.firework = new Particle(random(width), height, this.hue, true);
  this.exploded = false;
  this.particles = [];

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    }
    else {
      return false;
    }
  };

  this.update = function() {
    if (!this.exploded) {                 //checks to see if firework exploded
      this.firework.applyForce(gravity);  //if yes, make the particles fall
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;             //change the exploded value to true
        this.explode();                   //and explode the particle
      }
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {  //shows how far up
      this.particles[i].applyForce(gravity);                //the fireworks go
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };

  this.explode = function() {           //how to explode the particle
    for (var i = 0; i < 100; i++) {     //how many exploded particles
      var p = new Particle (
        this.firework.pos.x,            //show their position as they fall
        this.firework.pos.y,
        this.hue,                       //fade their color
        false
      );
      this.particles.push(p);           //make them fall
    }
  };

  this.show = function() {              //show the exploded firework
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++) {   //display the tail of the
      this.particles[i].show();                         //firework
    }
  };
}

//PARTICLE JS FILE
function Particle(x, y, hue, firework) {        //make up the firework
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hue;
  this.acc = createVector(0, 0);

  if (this.firework) {
    this.vel = createVector(0, random(-12, -8));    //controls height of firework
  }
  else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 15));          //controls how far the firework explodes
  }

  this.applyForce = function(force) {     //gravity for fireworks
    this.acc.add(force);
  };

  this.update = function() {        //make sure the firework explodes
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.done = function() {        //once the firework explodes, fade it
    if (this.lifespan < 0) {
      return true;
    }
    else {
      return false;
    }
  };

  this.show = function() {      //display the firework
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(hue, 255, 255, this.lifespan);
    }
    else {
      strokeWeight(4);                  //at this size
      stroke(hue, 255, 255);            //in this color
    }
    point(this.pos.x, this.pos.y);      //at this position
  };
}

//SKETCH JS FILE
var fireworks = [];
var gravity;

function setup() {                  //basic setup for the canvas
  createCanvas(1024, 768);
  colorMode(HSB);
  gravity = createVector(0, 0.1);   //how high the particles go
  stroke(255);
  strokeWeight(4);                  //how thick/bold/big the particles are
  background(0);
}

function draw() {                   //make the firework
  colorMode(RGB);                   //their color
  background(0, 0, 0, 25);          //the screen color
  if (random(1) < 0.04) {           //how high they go
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {   //to update the particle
    fireworks[i].update();                            //and show its position
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);                 //make another once one explodes
    }
  }
}
