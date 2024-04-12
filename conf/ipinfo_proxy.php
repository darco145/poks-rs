<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$token = 'a9b5daf19ead7d'; 
$url = 'https://ipinfo.io/json?token=' . $token;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true); // Dodajte da biste dobili zaglavlja u odgovoru

$response = curl_exec($ch);

if ($response === false) {
    echo 'cURL Error: ' . curl_error($ch);
    file_put_contents('log.txt', 'cURL Error: ' . curl_error($ch));
} else {
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $header = substr($response, 0, $header_size);
    $body = substr($response, $header_size);
    echo $body;
    file_put_contents('log.txt', "Header: " . $header . "\nBody: " . $body);
}

curl_close($ch);
?>
