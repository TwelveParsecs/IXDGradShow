function setup() {
  createCanvas(640, 480);
}

function draw() {
    fill(255);
  	ellipse(mouseX, mouseY, 80, 80);
}

function mouseClicked() {
	console.log ("click registered");
  saveCanvas('myCanvas', 'png');
}

// http://stackoverflow.com/questions/21926893/sending-an-image-and-json-data-to-server-using-ajax-post-request