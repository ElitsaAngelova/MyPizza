<?php
class User {
    private $conn;
    private $table_name = "users";
 
    public function __construct($db) {
        $this->conn = $db;
    }

    function getUser($email) {
        $query = "SELECT id, first_name, last_name, email, password, phone_number, role FROM " . $this->table_name . " WHERE email = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);

        $stmt->execute();
     
        return $stmt;
    }

    function getUserById($id) {
        $query = "SELECT  * FROM " . $this->table_name . " AS u JOIN addresses AS a ON u.id = a.user_id WHERE u.id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);

        $stmt->execute();
     
        return $stmt;
    }

    function register($data) {
        $data = json_decode($data);

        $query = "INSERT INTO " . $this->table_name . " (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
     
        $stmt = $this->conn->prepare($query);
     
        $stmt->bindParam(1, $data->first_name);
        $stmt->bindParam(2, $data->last_name);
        $stmt->bindParam(3, $data->email);
        $stmt->bindParam(4, $data->password);
     
        if ($stmt->execute()) {
            return true;
        }
     
        return false;  
    }
}
?>