<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));
if(
    !empty($data->username) &&
    !empty($data->password) &&
    !empty($data->role_id)
)
{
    $user->username = $data->username;
    $user->password = $data->password;
    $user->role_id = $data->role_id;

    if($user->register()){
        http_response_code(201);
        echo json_encode(array("message" => "User was created."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create user."));
    }
} else {
    http_response_code(400);
    //echo json_encode(array("message" => $user->username));
    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}
?>
