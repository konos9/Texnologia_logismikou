<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/paper.php';

$database = new Database();
$db = $database->getConnection();

$paper = new Paper($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->title) &&
    !empty($data->author) &&
    !empty($data->abstract) &&
    !empty($data->publication_date)
) {
    $paper->title = $data->title;
    $paper->author = $data->author;
    $paper->abstract = $data->abstract;
    $paper->publication_date = $data->publication_date;

    if ($paper->create()) {
        http_response_code(201);
        echo json_encode(array("message" => "Paper was created."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create paper."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create paper. Data is incomplete."));
}
?>

