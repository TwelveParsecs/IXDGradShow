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
    var f = frames[i];

    // send image data to PHP server
    console.log(f);
  }
}

// http://stackoverflow.com/questions/21926893/sending-an-image-and-json-data-to-server-using-ajax-post-request