<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/conference.php';

$database = new Database();
$db = $database->getConnection();

$conference = new Conference($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->name) &&
    !empty($data->pc_chair) &&
    !empty($data->pc_member) 
) {
    $conference->name = $data->name;
    $conference->description = $data->description;
    $conference->pc_chair = $data->pc_chair;
    $conference->pc_member = $data->pc_member;
    $conference->paper_id = $data->paper_id;
    $conference->status = $data->status;

    if ($conference->update()) {
        http_response_code(200);
        echo json_encode(array("message" => "conference was updated."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update conference."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update conference. Data is incomplete."));
}
?>

