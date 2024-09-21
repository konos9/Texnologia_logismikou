<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->username) &&
    !empty($data->password)
){
    $user->username = $data->username;

    if($user->login($data->password)){
        http_response_code(200);
        echo json_encode(array("message" => "Login successful" ,
        "role" => $user->role_id,
        "userName" => $user->username,
        "userId" => $user->id
    ));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Login failed"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to login. Data is incomplete."));
}
?>
