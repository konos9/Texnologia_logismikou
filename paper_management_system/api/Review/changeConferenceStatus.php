<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/review.php';

$database = new Database();
$db = $database->getConnection();

$reviewerAssignment = new Review($db);
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id) &&
    !empty($data->status)
) {

    $reviewerAssignment->status = $data->status;
    $reviewerAssignment->conference_id = $data->id;

    if ($reviewerAssignment->changeStatus()) {
        http_response_code(200);
        echo json_encode(array("message" => "Change Status was completed."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to complete Change Status ."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to complete Change Status . Data is incomplete."));
}
?>

