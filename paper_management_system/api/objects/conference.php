<?php
class Conference {
    private $conn;
    private $table_name = "conference";

    public $id;
    public $name;
    public $description;
    public $creation_date;
    public $pc_chair;
    public $paper_id;
    public $pc_member;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        // Correct the typo in the SQL query
        $query = "INSERT INTO " . $this->table_name . " SET 
                  name=:name, 
                  description=:description, 
                  pc_chair=:pc_chair, 
                  creation_date=:creation_date, 
                  pc_member=:pc_member, 
                  paper_id=:paper_id, 
                  status=:status";
                  
        $stmt = $this->conn->prepare($query);
        
        // Sanitize the input values
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->pc_chair = htmlspecialchars(strip_tags($this->pc_chair));
        $this->pc_member = htmlspecialchars(strip_tags($this->pc_member)); // Corrected here as well
        $this->paper_id = htmlspecialchars(strip_tags($this->paper_id));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->creation_date = htmlspecialchars(strip_tags($this->creation_date));
    
        // Bind the parameters
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":pc_chair", $this->pc_chair);
        $stmt->bindParam(":pc_member", $this->pc_member); // Corrected here
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":paper_id", $this->paper_id);
        $stmt->bindParam(":creation_date", $this->creation_date);
    
        // Execute the query
        if ($stmt->execute()) {
            return true;
        }else
        {
            error_log("SQL Error: " . print_r($stmt->errorInfo(), true));
        }
    
        return false;
    }
    public function read($pc_chair) {

        $findPc_chair = "SELECT * FROM users WHERE username = :pc_chair";
        $stmt2 = $this->conn->prepare($findPc_chair);
        $stmt2->bindParam(':pc_chair', $pc_chair);
        $stmt2->execute();
        
        // Fetch the row data
        $row = $stmt2->fetch(PDO::FETCH_ASSOC);

        $query = "SELECT * FROM " . $this->table_name . " WHERE pc_chair = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $row['id']);
        $stmt->execute();
        return $stmt;
    }


    public function readAll() {
        $query = "SELECT * FROM  conference";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt;
        /*
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $row['name'];
        $this->description = $row['description'];
        $this->pc_chair = $row['pc_chair'];
        $this->pc_member = $row['pc_member'];
        $this->status = $row['status'];
        */
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET  description = :description, pc_chair = :pc_chair, pc_member = :pc_member , status = :status , paper_id = :paper_id  WHERE name = :name";
        $stmt = $this->conn->prepare($query);
        $this->name =  htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->pc_chair = htmlspecialchars(strip_tags($this->pc_chair));
        $this->pc_member = htmlspecialchars(strip_tags($this->pc_member));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->paper_id = htmlspecialchars(strip_tags($this->paper_id));

        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":pc_chair", $this->pc_chair);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":paper_id", $this->paper_id);
        $stmt->bindParam(":pc_member", $this->pc_member);
        $stmt->bindParam(":name", $this->name);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }




   public function readBypc_chair($author) {
        $query = "SELECT 
        c.id, 
        c.creation_date, 
        c.name, 
        c.description, 
        c.pc_chair, 
        c.paper_id, 
        c.pc_member, 
        c.status,
        p.title AS paper_title,  
        p.author AS paper_author 
    FROM 
        conference c
    INNER JOIN 
        papers p ON c.paper_id = p.id 
    WHERE 
        c.pc_chair LIKE ?;";

        $stmt = $this->conn->prepare($query);
        $searchTerm = '%' . $author . '%'; // Surround the parameter with % for partial matching
        $stmt->bindParam(1, $searchTerm);
        $stmt->execute();
        return $stmt;
    }

    public function readBypc_chairAndState($author, $status)
    {
        $query = "SELECT 
        c.id, 
        c.creation_date, 
        c.name, 
        c.description, 
        c.pc_chair, 
        c.paper_id, 
        c.pc_member, 
        c.status,
        p.title AS paper_title,  
        p.author AS paper_author 
    FROM 
        conference c
    INNER JOIN 
        papers p ON c.paper_id = p.id 
    WHERE 
        c.pc_chair LIKE ? AND c.status = ?";

        $stmt = $this->conn->prepare($query);
        $searchTerm = '%' . $author . '%'; // Surround the parameter with % for partial matching
        $stmt->bindParam(1, $searchTerm);
        $stmt->bindParam(2, $status);
        $stmt->execute();
        return $stmt;
    }
}

?>


