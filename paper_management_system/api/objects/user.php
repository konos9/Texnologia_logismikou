<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $username;
    public $password;
    public $role_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register() {
        $query = "INSERT INTO ".$this->table_name." (username, password, role_id) VALUES (:username, :password, :role_id)";
        $stmt = $this->conn->prepare($query);
    
        // Bind parameters using named placeholders
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':role_id', $this->role_id);
    
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function login($password) {
        $query = "SELECT id, username, password, role_id FROM " . $this->table_name . " WHERE username = :username AND password = '$password'";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

if($password = $row['password'])
{   
    $this->id = $row['id'];
    $this->username = $row['username'];
    $this->role_id = $row['role_id'];
    return true;
}
        return false;
    }
}
?>

