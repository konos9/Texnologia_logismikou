<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/conference.php';


try {
$database = new Database();
$db = $database->getConnection();

$conference = new Conference($db);

//role = isset($_GET['role']) ? $_GET['role'] : die();
$username = isset($_GET['username']) ? $_GET['username'] : die();   
$stmt = $conference->readBypc_chair($username);
$num = $stmt->rowCount();

if ($num > 0) {
    $conference_arr = array();
    $conference_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $conference_item = array(
            "id" => $id,
            "creation_date" => $creation_date,
            "name" => $name,
            "description" => $description,
            "pc_chair" => $pc_chair,
            "paper_id" => $paper_id,
            "papper_title" => $paper_title,
            "pc_member" => $pc_member,
            "status" => $status
        );

        array_push($conference_arr["records"], $conference_item);
    }

    //http_response_code(200);
    echo json_encode($conference_arr);
} else {
    echo json_encode(array("records" => array()));
}
} catch (Exception $e) {
    echo json_encode(array(
        "error" => "An error occurred.",
        "message" => $e->getMessage()
    ));
}
?>

