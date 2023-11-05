<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "db.inc.php";

/* Connect to MySQL and select the database. */
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

$database = mysqli_select_db($connection, DB_DATABASE);

$n = $_POST["NAME"];
$d = $_POST["DURATION"];

$query = "INSERT INTO SONGS (NAME, DURATION) VALUES ('$n', '$d');";

if (!mysqli_query($connection, $query)) echo ("<p>Error adding song data.</p>");
else echo ("Added Song $n with duration $d");

mysqli_close($connection);

header("Location: songs-database.php");
exit();
