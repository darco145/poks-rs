<?php
$host = 'localhost'; 
$dbname = 'poks';
$username = 'root';
$password = '';
$dsn = "mysql:host=$host;dbname=$dbname";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT email FROM clanovi";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $clanovi = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($clanovi);

} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
