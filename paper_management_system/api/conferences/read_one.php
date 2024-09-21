<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/login.php';

$database = new Database();
$db = $database->getConnection();

$conference = new Conference($db);

$conference->id = isset($_GET['id']) ? $_GET['id'] : die();

$conference->readOne();

if ($conference->title != null) {
    $conference_arr = array(
        "id" => $conference->id,
        "title" => $conference->title,
        "author" => $conference->author,
        "abstract" => $conference->abstract,
        "publication_date" => $papconferenceer->publication_date,
        "created_at" => $paconferenceer->created_at
    );

    http_response_code(200);
    echo json_encode($conference_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Conference does not exist."));
}
?>

