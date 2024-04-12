<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$inputJSON = file_get_contents('php://input');
error_log($inputJSON);
$data = json_decode($inputJSON, true);


$required_fields = ['ime', 'prezime', 'datum_rodjenja', 'mesto_rodj', 'drzava_rodj', 'mesto_stan', 'postanski_broj', 'drzava_stan', 'broj', 'email', 'strucna_sprema', 'naziv_skole', 'zvanje', 'specijalizacija', 'radni_status', 'fakultet', 'komentar'];
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

$konvertovanDatumRodjenja = date('Y-m-d', strtotime($data['datum_rodjenja']));

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO clanovi (ime, prezime, datum_rodjenja, mesto_rodj, drzava_rodj, mesto_stan, postanski_broj, drzava_stan, broj, email, strucna_sprema, naziv_skole, zvanje, specijalizacija, radni_status, fakultet, komentar) 
        VALUES (:ime, :prezime, :datum_rodjenja, :mesto_rodj, :drzava_rodj, :mesto_stan, :postanski_broj, :drzava_stan, :broj, :email, :strucna_sprema, :naziv_skole, :zvanje, :specijalizacija, :radni_status, :fakultet, :komentar)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':ime' => $data['ime'],
        ':prezime' => $data['prezime'],
        ':datum_rodjenja' => $konvertovanDatumRodjenja,
        ':mesto_rodj' => $data['mesto_rodj'],
        ':drzava_rodj' => $data['drzava_rodj'],
        ':mesto_stan' => $data['mesto_stan'],
        ':postanski_broj' => $data['postanski_broj'],
        ':drzava_stan' => $data['drzava_stan'],
        ':broj' => $data['broj'],
        ':email' => $data['email'],
        ':strucna_sprema' => $data['strucna_sprema'],
        ':naziv_skole' => $data['naziv_skole'],
        ':zvanje' => $data['zvanje'],
        ':specijalizacija' => $data['specijalizacija'],
        ':radni_status' => $data['radni_status'],
        ':fakultet' => $data['fakultet'],
        ':komentar' => $data['komentar']
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
