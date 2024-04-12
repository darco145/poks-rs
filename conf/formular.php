<?php
session_start();

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: login.php"); 
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formular za unos podataka</title>
</head>
<body>
    <h1>Formular za unos podataka</h1>

    <form action="conf/vesti.php" method="POST" enctype="multipart/form-data">
        <label for="slika">Putanja do slike:</label>
        <input type="text" name="slika" id="slika" required>

        <label for="naslov">Naslov:</label>
        <textarea name="naslov" id="naslov" rows="4" required></textarea>
        
        <label for="tekst">Tekst:</label>
        <textarea name="tekst" id="tekst" rows="4" required></textarea>
        
        <label for="autor">Autor:</label>
        <input type="text" name="autor" id="autor" required>
        
        <label for="datum">Datum:</label>
        <input type="date" name="datum" id="datum" required>
        
        <button type="submit">Unesi podatke</button>
    </form>
</body>
</html>
