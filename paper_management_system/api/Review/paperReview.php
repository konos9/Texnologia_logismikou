<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/review.php';

$database = new Database();
$db = $database->getConnection();

$paperReview = new Review($db);
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id)
) {

    $paperReview->paper_id = $data->paper_id;
    $paperReview->conference_id = $data->id;
    $paperReview->pc_member_id = $data->pc_member_id;
    $paperReview->review_score = $data->review_score;
    $paperReview->review_justification = $data->review_justification;

    if ($paperReview->reviewPaper()) {
        http_response_code(200);
        echo json_encode(array("message" => "Paper review was completed."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to complete Paper review ."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to complete Paper review . Data is incomplete."));
}
?>

