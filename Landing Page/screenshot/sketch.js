function setup() {
  createCanvas(640, 480);
}

function draw() {
    fill(255);
  	ellipse(mouseX, mouseY, 80, 80);
}

function mouseClicked() {

 // Save current frame (only saving one frame)
  saveFrames('test','jpg',1,1,processSavedFrames);
}


var processSavedFrames = function(frames) {
  for (var i = 0, len=frames.length; i < len; i++) {
    var savedFrame = frames[i];

    // send image data to PHP server
    sendToPHPServer(savedFrame)
  }
}

function sendToPHPServer(savedFrame) {
	// object with ext, filename, imageData
	console.log(savedFrame);

	var ajax = new XMLHttpRequest();
	ajax.open("POST",'saveimage.php',true);
	// ajax.setRequestHeader('Content-Type', 'canvas/upload');
	ajax.send("savedFrame"+savedFrame );
}