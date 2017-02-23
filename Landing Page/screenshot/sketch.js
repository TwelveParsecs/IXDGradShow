function setup() {
    createCanvas(640, 480);
}

function draw() {
    fill(255);
    ellipse(mouseX, mouseY, 80, 80);
}

function mouseClicked() {

 // Save current frame (only saving one frame)
  saveFrames('test','png',1,1,processSavedFrames);
}


var processSavedFrames = function(frames) {
  for (var i = 0, len=frames.length; i < len; i++) {
    var savedFrame = frames[i];

    // send image data to PHP server

    sendToPHPServer(savedFrame.imageData)
  }
}


function sendToPHPServer(savedFrame) {
    // object with ext, filename, imageData
    // console.log(savedFrame);

    console.log("js image data "+savedFrame);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", "saveimage.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xmlhttp.send("savedFrame=" + savedFrame); // sets variable
}