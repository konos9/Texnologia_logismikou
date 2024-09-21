<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/paper.php';


try {
$database = new Database();
$db = $database->getConnection();

$paper = new Paper($db);
$data = json_decode(file_get_contents("php://input"));

$stmt = $paper->searchFOrPapers($data->title,$data->author,$data->abstract);
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
            "abstract" => $abstract,
            "publication_date" => $publication_date
        );

        array_push($papers_arr["records"], $paper_item);
    }

    //http_response_code(200);
    echo json_encode($papers_arr);
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


