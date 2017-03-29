<?php

$rawData = $_POST['savedFrame'];

echo $rawData;

// $filteredData = explode(',', $rawData);

// $unencoded = base64_decode($filteredData[1]);

// //Create the image 
// $fp = fopen('test1.jpg', 'w');
// fwrite($fp, $unencoded);
// fclose($fp); 



// reading image to work with it

// $file_name = 'test1.png';
// $file_size = strlen($filteredData[1])/1024; 

// $fh = fopen('sigs/test1.png', 'r');
// $content = fread($fh, $file_size);
// $content = base64_encode($content);
// fclose($fh); 

?>