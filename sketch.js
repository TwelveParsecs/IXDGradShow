// center point
var centerX = 0.0, centerY = 0.0;

var radius = 150, rotAngle = -90;
var accelX = 0.0, accelY = 0.0;
var deltaX = 0.0, deltaY = 0.0;
var springing = 0.0009, damping = 0.98;
var randomPointX = (Math.floor(Math.random() * window.innerWidth));
var randomPointY = (Math.floor(Math.random() * window.innerHeight));
var colorR = 255;
var colorG = 255;
var colorB = 255;
var bgR = 0;
var bgG = 0;
var bgB = 0;

//corner nodes
var nodes = 5;

//zero fill arrays
var nodeStartX = [];
var nodeStartY = [];
var nodeX = [];
var nodeY = [];
var angle = [];
var frequency = [];

// soft-body dynamics
var organicConstant = 1.0;


function setup() {
    var canvas = createCanvas(960, 480);
    canvas.id = 'canvas';
    canvas.parent('canvas-block')
    background(255);

    centerX = width/2;
    centerY = height/2;

    //initialize arrays to 0
    for (var i=0; i<nodes; i++){
    	nodeStartX[i] = 0;
    	nodeStartY[i] = 0;
    	nodeY[i] = 0;
    	nodeY[i] = 0;
    	angle[i] = 0;
    }

    // iniitalize frequencies for corner nodes
    for (var i=0; i<nodes; i++){
    	frequency[i] = random(5, 12);
    }

    noStroke();
    frameRate(60);
}

function draw() {
  //fade background
  fill(bgR, bgG, bgB, 100);
  rect(0,0,width, height);
  drawShape();
  moveShape();
}


function drawShape() {
//  calculate node  starting locations
for (var i=0; i<nodes; i++){
	nodeStartX[i] = centerX+cos(radians(rotAngle))*radius;
	nodeStartY[i] = centerY+sin(radians(rotAngle))*radius;
	rotAngle += 360.0/nodes;
}

// draw polygon
curveTightness(organicConstant);
fill(colorR, colorG, colorB);
beginShape();
for (var i=0; i<nodes; i++){
	curveVertex(nodeX[i], nodeY[i]);
}
for (var i=0; i<nodes-1; i++){
	curveVertex(nodeX[i], nodeY[i]);
}
endShape(CLOSE);
}

function moveShape() {
	radius = document.getElementById("sizeSlider").value * 2;

//move center point
if(frameCount % 180 == 0) {
	randomPointX = (Math.floor(Math.random() * window.innerWidth));
	randomPointY = (Math.floor(Math.random() * window.innerHeight));
}

deltaX = randomPointX-centerX;
deltaY = randomPointY-centerY;

// create springing effect
deltaX *= springing;
deltaY *= springing;
accelX += deltaX;
accelY += deltaY;

// move predator's center
centerX += accelX;
centerY += accelY;

// slow down springing
accelX *= damping;
accelY *= damping;

// change curve tightness
organicConstant = 1-((abs(accelX)+abs(accelY))*0.1);

//move nodes
for (var i=0; i<nodes; i++){
	nodeX[i] = nodeStartX[i]+sin(radians(angle[i]))*(accelX*2);
	nodeY[i] = nodeStartY[i]+sin(radians(angle[i]))*(accelY*2);
	angle[i] += frequency[i];
}
}

function changeColors() {
	colorR = Math.floor(Math.random() * 255);
	colorG = Math.floor(Math.random() * 255);
	colorB = Math.floor(Math.random() * 255);

	bgR = Math.floor(Math.random() * 255);
	bgG = Math.floor(Math.random() * 255);
	bgB = Math.floor(Math.random() * 255);
}


function mouseClicked() {

    // Save current frame (only saving one frame)
    saveFrames('test', 'jpg', 1, 1, processSavedFrames);
}


var processSavedFrames = function(frames) {
    for (var i = 0, len = frames.length; i < len; i++) {
        var savedFrame = frames[0];

        // send image data to PHP server
        sendToPHPServer(savedFrame.imageData)
    }
}

function sendToPHPServer(savedFrame) {
    // sends object with ext, filename, imageData

    // console.log("js image data " + savedFrame);

    var xmlhttp = new XMLHttpRequest();

    // server response
    xmlhttp.onload = function() {
        console.log(xmlhttp.responseText);
    }

    xmlhttp.open("POST", "saveimage.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("savedFrame=" + savedFrame); // sets savedFrame variable
}
