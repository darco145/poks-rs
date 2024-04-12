<?php
session_start();

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: login.php");
    exit;
}

$servername = "192.168.1.3";
$username = "root";
$password = "your_password";
$dbname = "poks";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Konekcija nije uspela: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $slika = $_POST["slika"]; 
    $naslov = $_POST["naslov"];
    $tekst = $_POST["tekst"];
    $autor = $_POST["autor"];
    $datum = $_POST["datum"];

    $sql = "INSERT INTO vesti (image, tittle, text, author, date)
            VALUES ('$slika', '$naslov', '$tekst', '$autor', '$datum')";

    if ($conn->query($sql) === TRUE) {
        echo "Podaci su uspešno uneti u bazu.";
    } else {
        echo "Greška prilikom unosa podataka: " . $conn->error;
    }
} else {
    echo "Podaci nisu poslati putem POST metode.";
}

$conn->close();
?>
