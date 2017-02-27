<?php

if (isset($_POST["savedFrame"])) {

    $img = $_POST['savedFrame'];

    echo 'Yay! Server received image data.' . "\n";

} else {
    echo 'Error: No image data received.';
}

$img = str_replace('data:image/octet-stream;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);

// echo "php server image data " . $img;

$file = "img/" . uniqid() . '.jpg';
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';

////////////////////////////////////////////////////////////////
// Read image to work with it
// $file_name = 'test1.png';
// $file_size = strlen($filteredData[1])/1024;

// $fh = fopen('sigs/test1.png', 'r');
// $content = fread($fh, $file_size);
// $content = base64_encode($content);
// fclose($fh);

?>
