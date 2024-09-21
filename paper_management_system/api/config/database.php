<?php
// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow the following HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// Allow the following headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");
class Database {
    private $host = "localhost";
    private $db_name = "paper_management";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>

