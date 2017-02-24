function setup() {
    var canvas = createCanvas(960, 480);
    canvas.id = 'canvas';
    canvas.parent('canvas-block')
    background(255);
}

function draw() {
    fill(255);
    ellipse(mouseX, mouseY, 80, 80);
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
