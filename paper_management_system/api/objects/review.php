<?php
class Review
{
    private $conn;
    private $table_name = 'rewierAssignment';

    public $conference_id;
    public $paper_id;
    public $pc_member_id;
    public $review_score;
    public $review_justification;
    public $setStatus;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function paperStatus()
    {
        $query = 'INSERT INTO paperStatus SET 
        conference_id=:conference_id, 
        pc_member_id=:pc_member_id,
        setStatus=:setStatus,
        paper_id=:paper_id';

        $stmt = $this->conn->prepare($query);

        $this->pc_member_id = htmlspecialchars(strip_tags($this->pc_member_id));  // Corrected here as well
        $this->paper_id = htmlspecialchars(strip_tags($this->paper_id));
        $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));
        $this->setStatus = htmlspecialchars(strip_tags($this->setStatus));

        // Bind the parameters
        $stmt->bindParam(':pc_member_id', $this->pc_member_id);
        $stmt->bindParam(':paper_id', $this->paper_id);
        $stmt->bindParam(':conference_id', $this->conference_id);
        $stmt->bindParam(':setStatus', $this->setStatus);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        } else {
            error_log('SQL Error: ' . print_r($stmt->errorInfo(), true));
        }

        return false;
    }

    public function reviewPaper()
    {
        $query = 'INSERT INTO reviewPaper SET 
                  conference_id=:conference_id, 
                  pc_member_id=:pc_member_id, 
                  paper_id=:paper_id,
                  review_score=:review_score,
                  review_justification=:review_justification';

        $stmt = $this->conn->prepare($query);

        $this->pc_member_id = htmlspecialchars(strip_tags($this->pc_member_id));  // Corrected here as well
        $this->paper_id = htmlspecialchars(strip_tags($this->paper_id));
        $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));
        $this->review_score = htmlspecialchars(strip_tags($this->review_score));
        $this->review_justification = htmlspecialchars(strip_tags($this->review_justification));

        // Bind the parameters
        $stmt->bindParam(':pc_member_id', $this->pc_member_id);
        $stmt->bindParam(':paper_id', $this->paper_id);
        $stmt->bindParam(':conference_id', $this->conference_id);
        $stmt->bindParam(':review_score', $this->review_score);
        $stmt->bindParam(':review_justification', $this->review_justification);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        } else {
            error_log('SQL Error: ' . print_r($stmt->errorInfo(), true));
        }

        return false;
    }

    public function reviewerAssigment()
    {
        // Correct the typo in the SQL query
        $query = 'INSERT INTO rewierAssignment SET 
                  conference_id=:conference_id, 
                  pc_member_id=:pc_member_id, 
                  paper_id=:paper_id';

        $stmt = $this->conn->prepare($query);

        $this->pc_member_id = htmlspecialchars(strip_tags($this->pc_member_id));  // Corrected here as well
        $this->paper_id = htmlspecialchars(strip_tags($this->paper_id));
        $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));

        // Bind the parameters
        $stmt->bindParam(':pc_member_id', $this->pc_member_id);
        $stmt->bindParam(':paper_id', $this->paper_id);
        $stmt->bindParam(':conference_id', $this->conference_id);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        } else {
            error_log('SQL Error: ' . print_r($stmt->errorInfo(), true));
        }

        return false;
    }

    public function changeStatus()
    {
        $query = 'UPDATE conference SET   status = :status  WHERE id = :conference_id';
        $stmt = $this->conn->prepare($query);
        $this->conference_id = htmlspecialchars(strip_tags($this->conference_id));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':conference_id', $this->conference_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function read($pc_chair)
    {
        $findPc_chair = 'SELECT * FROM users WHERE username = :pc_chair';
        $stmt2 = $this->conn->prepare($findPc_chair);
        $stmt2->bindParam(':pc_chair', $pc_chair);
        $stmt2->execute();

        // Fetch the row data
        $row = $stmt2->fetch(PDO::FETCH_ASSOC);

        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE pc_chair = ?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $row['id']);
        $stmt->execute();
        return $stmt;
    }

    function readAll()
    {
        $query = 'SELECT * FROM  conference';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readOne($id)
    {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE id = ? LIMIT 0,1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt;

        /*
         * $row = $stmt->fetch(PDO::FETCH_ASSOC);
         *
         * $this->name = $row['name'];
         * $this->description = $row['description'];
         * $this->pc_chair = $row['pc_chair'];
         * $this->pc_member = $row['pc_member'];
         * $this->status = $row['status'];
         */
    }

    function update()
    {
        $query = 'UPDATE ' . $this->table_name . ' SET  description = :description, pc_chair = :pc_chair, pc_member = :pc_member , status = :status , paper_id = :paper_id  WHERE name = :name';
        $stmt = $this->conn->prepare($query);
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->pc_chair = htmlspecialchars(strip_tags($this->pc_chair));
        $this->pc_member = htmlspecialchars(strip_tags($this->pc_member));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->paper_id = htmlspecialchars(strip_tags($this->paper_id));

        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':pc_chair', $this->pc_chair);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':paper_id', $this->paper_id);
        $stmt->bindParam(':pc_member', $this->pc_member);
        $stmt->bindParam(':name', $this->name);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function delete()
    {
        $query = 'DELETE FROM ' . $this->table_name . ' WHERE id = ?';
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>



