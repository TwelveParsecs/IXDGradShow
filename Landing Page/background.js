//ixd grad show 2017
var setW = 80;
var setH = setW;

var col = Math.ceil(window.innerWidth / setW) + 1;
var row = Math.ceil(window.innerHeight / setH) + 1;

var totalParticles = col * row; //grid layout

var wAdj = (window.innerWidth % setW) / 2;
var hAdj = (window.innerHeight % setH) / 2;

//mouse influence range
var mouseInf = 140;
var canvas, system;

//amount of different icons
var iconCount = 28;
var icons = [];

//cycle through modes
var attractionMode = 0;

function preload(){
	for(var i = 0; i < iconCount; i++){
		var img = loadImage("assets/icon" + (i+1) + ".svg");
		icons.push(img);
	}

}

function setup() {
	// canvas = createCanvas($(window).width(), $(window).height());
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.id("sketch");
	colorMode(HSB, 360, 100, 100);

	//loads particle set
	loadSet();

}

function draw() {
	//change background color, using HSB parameters;
	background(360, 0, 100);
	//centers layout
	translate(-wAdj, -hAdj);
  	system.run();

}

var loadSet = function() {

	system = new ParticleSystem();

	for(var i = 0; i < totalParticles; i++){
		system.addParticle(i);
	}

}

// particle class
var Particle = function(gridPos) {
	  // this.acceleration = createVector(0, 0.05);
	this.velocity = createVector(0, 0);

	//for hexagon layout
	if ((floor(gridPos / col) % 2) == 0) {

		this.position = createVector(setW * (gridPos % col) + .5 * setW,
									   setH * floor(gridPos / col));
		//used for snapback, position origin
		this.positionO = createVector(setW * (gridPos % col) + .5 * setW,
									   setH * floor(gridPos / col));

	} else {

		this.position = createVector(setW * (gridPos % col),
									   setH * floor(gridPos / col));
		//used for snapback, position origin
		this.positionO = createVector(setW * (gridPos % col),
									   setH * floor(gridPos / col));

	}
	this.acceleration = createVector(0, 0);
	//controls icon shown
	this.iconValue = floor(random(iconCount));
};


Particle.prototype.run = function() {
	var temp = dist(this.position.x, this.position.y,
					mouseX, mouseY);

	switch(attractionMode) {
	  	case 0: //with snapback
	  		if (temp < mouseInf) {
			  	this.mouseCheck();
			  } else if (temp >= mouseInf) {
			  	this.decelerator();
			  	if (temp >= mouseInf + 50) {
			  		this.returnO();
			  	}
			  }
	  		break;
	  	case 1: //no snapback
	  		if (temp < mouseInf) {
			  	this.mouseCheck();
			} else {
				this.decelerator();
			}
	  		break;
	  	case 2: //mouse attracts particles
	  		if (temp < mouseInf) {
			  	this.mouseCheckClose();
			} else {
				this.decelerator();
			}
	  		break;
	  	case 3: //no snapback, same as case 1
	  		if (temp < mouseInf) {
			  	this.mouseCheck();
			} else {
				this.decelerator();
			}
	  		break;

	}

	this.update();
	this.display();
	//edge detection
	this.edge();
}

Particle.prototype.mouseCheck = function(){
	var temp = dist(this.position.x, this.position.y,
					mouseX, mouseY);
	if (temp <= mouseInf ){
		var x = this.position.x - mouseX;
		var y = this.position.y - mouseY;

		this.velocity.x = 1.8 * x / temp;
		this.velocity.y = 1.8 * y / temp;
	}
}

Particle.prototype.mouseCheckClose = function(){
	var temp = dist(this.position.x, this.position.y,
					mouseX, mouseY);
	if (temp <= mouseInf ){
		var x = mouseX - this.position.x;
		var y = mouseY - this.position.y;

		this.velocity.x = 1.8 * x / temp;
		this.velocity.y = 1.8 * y / temp;
	}
}

Particle.prototype.returnO = function(){
	var temp = dist(this.position.x, this.position.y,
					this.positionO.x, this.positionO.y);
	if (temp > 2 ){
		var x = this.positionO.x - this.position.x;
		var y = this.positionO.y - this.position.y;

		this.velocity.x = 2.8 * x / temp;
		this.velocity.y = 2.8 * y / temp;
	} else {
		this.velocity.x = 0;
		this.velocity.y = 0;
	}
}

Particle.prototype.decelerator = function(){
	if (mag(this.velocity.x, this.velocity.y) > 2){
		this.acceleration.x = (-1 * this.velocity.x) / 10;
		this.acceleration.y = (-1 * this.velocity.y) / 10;
	} else {
		this.acceleration.x = 0;
		this.acceleration.y = 0;
	}
}

Particle.prototype.update = function(){

	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);

}

//edge detection method
Particle.prototype.edge = function(){
	if (this.position.x >= width-20) {
		this.velocity.x = -1 * Math.abs(this.velocity.x);
	}

	if (this.position.x <= 20) {
		this.velocity.x = Math.abs(this.velocity.x);
	}

	if (this.position.y >= height-20) {
		this.velocity.y = -1 * Math.abs(this.velocity.y);
	}

	if (this.position.y <= 20) {
		this.velocity.y = Math.abs(this.velocity.y);
	}

}

//method to display
Particle.prototype.display = function() {
	imageMode(CENTER);
	push();
	translate(this.position.x, this.position.y);
	// rotate(frameCount*.001 +this.iconValue);
	image(icons[this.iconValue], 0, 0, setW-20, setH-20);
	pop();
}

var ParticleSystem = function() {
	this.particles = [];
}

ParticleSystem.prototype.addParticle = function(gridPos) {
	this.particles.push(new Particle(gridPos));
}

ParticleSystem.prototype.run = function() {
	for (var i = this.particles.length-1; i >= 0; i--) {
		var p = this.particles[i];
		p.run();
	}
}

//toggles if snapback is on or off based off mouse clicks
mouseClicked = function() {
	// snapback = !snapback;
	// if (attractionMode < 3) {
	// 	attractionMode++;
	// }else{
	// 	attractionMode = 0;
	// }
}


//for responsive background, not perfect, but works
window.onresize=function(){
  var w1 = window.innerWidth;
  var h1 = window.innerHeight;
  canvas.size(w1,h1);
  loadSet();
}
