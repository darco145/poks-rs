<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "poks";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Konekcija nije uspela: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = $conn->real_escape_string($_GET['id']);
    $sql = "SELECT * FROM vesti WHERE id = '$id'";
} else {
    $sql = "SELECT * FROM vesti";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $vesti = array();
    while ($row = $result->fetch_assoc()) {
        $vest = [
            "id" => $row["id"],
            "slika" => "images/" . $row["image"],
            "naslov" => $row["tittle"],
            "tekst" => $row["text"],
            "autor" => $row["author"],
            "datum" => $row["date"]
        ];
        $vesti[] = $vest;
    }
    if (isset($_GET['id'])) {
        echo json_encode($vesti[0]);
    } else {
        echo json_encode($vesti);
    }
} else {
    echo "Nema podataka u bazi.";
}

$conn->close();
?>
