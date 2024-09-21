<?php
class Paper
{
    private $conn;
    private $table_name = 'papers';

    public $id;
    public $title;
    public $author;
    public $abstract;
    public $publication_date;
    public $created_at;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        $query = 'INSERT INTO ' . $this->table_name . ' SET title=:title, author=:author, abstract=:abstract, publication_date=:publication_date';
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->author = htmlspecialchars(strip_tags($this->author));
        $this->abstract = htmlspecialchars(strip_tags($this->abstract));
        $this->publication_date = htmlspecialchars(strip_tags($this->publication_date));

        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':author', $this->author);
        $stmt->bindParam(':abstract', $this->abstract);
        $stmt->bindParam(':publication_date', $this->publication_date);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read()
    {
        $query = 'SELECT * FROM ' . $this->table_name . ' ORDER BY created_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne()
    {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE id = ? LIMIT 0,1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->title = $row['title'];
        $this->author = $row['author'];
        $this->abstract = $row['abstract'];
        $this->publication_date = $row['publication_date'];
        $this->created_at = $row['created_at'];
    }

    public function update()
    {
        $query = 'UPDATE ' . $this->table_name . ' SET title = :title, author = :author, abstract = :abstract, publication_date = :publication_date WHERE id = :id';
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->author = htmlspecialchars(strip_tags($this->author));
        $this->abstract = htmlspecialchars(strip_tags($this->abstract));
        $this->publication_date = htmlspecialchars(strip_tags($this->publication_date));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':author', $this->author);
        $stmt->bindParam(':abstract', $this->abstract);
        $stmt->bindParam(':publication_date', $this->publication_date);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete()
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

    public function readAll()
    {
        $query = 'SELECT * FROM ' . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByAuthor($author)
    {
        $query = 'SELECT * FROM ' . $this->table_name . ' WHERE author = ?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $author);
        $stmt->execute();
        return $stmt;
    }

    public function searchFOrPapers($title, $author, $abstract)
    {
        $query = 'SELECT * FROM papers WHERE title LIKE ? AND author LIKE ? AND abstract LIKE ?';
        $stmt = $this->conn->prepare($query);

        // Add wildcard characters for partial matching
        $title = '%' . $title . '%';
        $author = '%' . $author . '%';
        $abstract = '%' . $abstract . '%';

        $stmt->bindParam(1, $title);
        $stmt->bindParam(2, $author);
        $stmt->bindParam(3, $abstract);
        $stmt->execute();
        return $stmt;
    }
}
?>

