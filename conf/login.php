<?php
session_start();

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    header("Location: formular.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username_db = "root";
    $password_db = "";
    $dbname = "poks";
    $conn = new mysqli($servername, $username_db, $password_db, $dbname);
    
    if ($conn->connect_error) {
        die("Konekcija na bazu nije uspela: " . $conn->connect_error);
    }
    
    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);
    
    $sql = "SELECT * FROM admins WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);
    
    if ($result->num_rows == 1) {
        $_SESSION['logged_in'] = true;
        header("Location: formular.php");
        exit;
    } else {
        $error = "Pogrešno korisničko ime ili lozinka. Molimo pokušajte ponovo.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Prijava</h1>
    <?php if (isset($error)) : ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
    <form action="" method="post">
        <label for="username">Korisničko ime:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Lozinka:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">Prijavi se</button>
    </form>
</body>
</html>
