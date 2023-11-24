<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "db.inc.php";

/* Connect to MySQL and select the database. */
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

$database = mysqli_select_db($connection, DB_DATABASE);

$query = "TRUNCATE TABLE SONGS;";

if (!mysqli_query($connection, $query)) echo ("<p>Error clearing song table.</p>");
else echo ("Cleared Song Table");

mysqli_close($connection);

header("Location: songs-database.php");
exit();
