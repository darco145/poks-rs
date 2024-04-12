<?php

$host = 'localhost'; 
$dbname = 'poks';
$username = 'root';
$password = '';

if (isset($_COOKIE['anketa_popunjena'])) {
    echo "popunjena";
    exit;
}

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        foreach ($data as $key => $value) {
            $sql = "UPDATE anketa SET `$value` = `$value` + 1 WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->execute([':id' => str_replace('pitanje', '', $key)]);
        }

        echo "uspesno";
        setcookie('anketa_popunjena', 'true', time() + 10, "/");
    }
} catch(PDOException $e) {
    echo "Greška: " . $e->getMessage();
}

$conn = null;
?>