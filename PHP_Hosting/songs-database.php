<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "db.inc.php"; ?>
<html>

<body>
    <h1>Songs Database</h1>
    <?php

    /* Connect to MySQL and select the database. */
    $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

    if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

    $database = mysqli_select_db($connection, DB_DATABASE);

    /* Ensure that the EMPLOYEES table exists. */
    VerifySongsTable($connection, DB_DATABASE);
    ?>

    <!-- Input form -->
    <form action="addSong.php" method="POST">
        <table border="0">
            <tr>
                <th>NAME</th>
                <th>DURATION</th>
            </tr>
            <tr>
                <td>
                    <input type="text" name="NAME" maxlength="100" size="50" />
                </td>
                <td>
                    <input type="text" name="DURATION" maxlength="50" size="30" />

                </td>
                <td>
                    <input type="submit" value="Add Song" />
                </td </tr>
        </table>

    </form>

    <!-- Display table data. -->
    <table border="1" cellpadding="2" cellspacing="2">
        <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>DURATION</td>
        </tr>

        <?php

        $result = mysqli_query($connection, "SELECT * FROM SONGS");

        while ($query_data = mysqli_fetch_row($result)) {
            echo "<tr>";
            echo "<td>", $query_data[0], "</td>",
            "<td>", $query_data[1], "</td>",
            "<td>", $query_data[2], "</td>";
            echo "</tr>";
        }
        ?>

    </table>
    <form action="clearTable.php" method="POST">
        <input type="submit" value="CLEAR TABLE" />
    </form>
    <!-- Clean up. -->
    <?php

    mysqli_free_result($result);
    mysqli_close($connection);

    ?>

</body>

</html>


<?php

/* Add a song to the table. */
function AddSong($connection, $name, $duration)
{
    $n = mysqli_real_escape_string($connection, $name);
    $d = mysqli_real_escape_string($connection, $duration);

    $query = "INSERT INTO SONGS (NAME, DURATION) VALUES ('$n', '$d');";

    if (!mysqli_query($connection, $query)) echo ("<p>Error adding song data.</p>");
}

/* Check whether the table exists and, if not, create it. */
function VerifySongsTable($connection, $dbName)
{
    if (!TableExists("SONGS", $connection, $dbName)) {
        $query = "CREATE TABLE SONGS (
         ID int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
         NAME VARCHAR(100),
         DURATION VARCHAR(50)
       )";

        if (!mysqli_query($connection, $query)) echo ("<p>Error creating table.</p>");
    }
}

/* Check for the existence of a table. */
function TableExists($tableName, $connection, $dbName)
{
    $t = mysqli_real_escape_string($connection, $tableName);
    $d = mysqli_real_escape_string($connection, $dbName);

    $checktable = mysqli_query(
        $connection,
        "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = '$t' AND TABLE_SCHEMA = '$d'"
    );

    if (mysqli_num_rows($checktable) > 0) return true;

    return false;
}
?>