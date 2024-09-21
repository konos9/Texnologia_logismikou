<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/conference.php';

$database = new Database();
$db = $database->getConnection();

$conference = new conference($db);
$stmt = $conference->readAll();
$num = $stmt->rowCount();

if ($num > 0) {
    $conferences_arr = array();
    $conferences_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $conference_item = array(
            "id" => $id,
            "name" => $name,
            "description" => $description,
            "pc_chair" => html_entity_decode($pc_chair),
            "paper_id" => $paper_id,
            "pc_member" => $pc_member,
            "status" => $status
        );

        array_push($conferences_arr["records"], $conference_item);
    }

    http_response_code(200);
    echo json_encode($conferences_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No conference found."));
}
?>

