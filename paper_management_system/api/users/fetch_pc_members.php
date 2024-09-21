<?php
header("Content-Type: application/json");

// Database connection details
$host = 'localhost';
$db_name = 'paper_management';
$username = 'root';
$password = '';

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare and execute the query
    $query = "SELECT id, username FROM users WHERE role_id = '4' ";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    // Fetch all rows as an associative array
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the users as a JSON response
    echo json_encode(["records" => $users]);

} catch (PDOException $e) {
    // Return an error response
    echo json_encode(["error" => $e->getMessage()]);
}
?>
