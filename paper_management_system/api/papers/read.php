<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/paper.php';

$database = new Database();
$db = $database->getConnection();

$paper = new Paper($db);

$stmt = $paper->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $papers_arr = array();
    $papers_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $paper_item = array(
            "id" => $id,
            "title" => $title,
            "author" => $author,
            "abstract" => html_entity_decode($abstract),
            "publication_date" => $publication_date,
            "created_at" => $created_at
        );

        array_push($papers_arr["records"], $paper_item);
    }

    http_response_code(200);
    echo json_encode($papers_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No papers found."));
}
?>

