<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/paper.php';

$database = new Database();
$db = $database->getConnection();

$paper = new Paper($db);

$data = json_decode(file_get_contents("php://input"));

$paper->id = $data->id;

if ($paper->delete()) {
    http_response_code(200);
    echo json_encode(array("message" => "Paper was deleted."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to delete paper."));
}
?>

