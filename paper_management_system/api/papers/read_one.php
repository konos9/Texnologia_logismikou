<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/login.php';

$database = new Database();
$db = $database->getConnection();

$paper = new Paper($db);

$paper->id = isset($_GET['id']) ? $_GET['id'] : die();

$paper->readOne();

if ($paper->title != null) {
    $paper_arr = array(
        "id" => $paper->id,
        "title" => $paper->title,
        "author" => $paper->author,
        "abstract" => $paper->abstract,
        "publication_date" => $paper->publication_date,
        "created_at" => $paper->created_at
    );

    http_response_code(200);
    echo json_encode($paper_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Paper does not exist."));
}
?>

