<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/review.php';

$database = new Database();
$db = $database->getConnection();

$paperStatus = new Review($db);
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id)
) {

    $paperStatus->paper_id = $data->paper_id;
    $paperStatus->conference_id = $data->id;
    $paperStatus->pc_member_id = $data->pc_member_id;
    $paperStatus->setStatus = $data->setStatus;
    
    if ($paperStatus->paperStatus()) {
        http_response_code(200);
        echo json_encode(array("message" => "Paper Status was Changed."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to Change Paper Status ."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to complete Paper Status Change . Data is incomplete."));
}
?>

