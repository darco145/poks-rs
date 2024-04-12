<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    $response = [
        'status' => 'error',
        'message' => 'Greška u dekodiranju JSON-a: ' . json_last_error_msg()
    ];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

$required_fields = ['ime', 'prezime', 'email', 'naslov', 'pitanje'];
foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
        $response = [
            'status' => 'error',
            'message' => 'Nisu svi obavezni podaci poslati.'
        ];
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
}

$host = 'localhost';
$dbname = 'poks';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO pitanja (ime, prezime, email, naslov, pitanje) 
        VALUES (:ime, :prezime, :email, :naslov, :pitanje)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':ime' => $data['ime'],
        ':prezime' => $data['prezime'],
        ':email' => $data['email'],
        ':naslov' => $data['naslov'],
        ':pitanje' => $data['pitanje']
    ]);

    $response = [
        'status' => 'success',
        'message' => 'Podaci su uspešno poslati i obradjeni.'
    ];
} catch (PDOException $e) {
    $response = [
        'status' => 'error',
        'message' => 'Greška u radu sa bazom: ' . $e->getMessage()
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
