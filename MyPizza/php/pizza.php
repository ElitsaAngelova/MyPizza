<?php
class Pizza {
    private $conn;
    private $table_name = "pizzas";
 
    public function __construct($db) {
        $this->conn = $db;
    }

    function getPizzas() {
        $query = "SELECT id, name, ingredients, calories, price, image_url FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
     
        return $stmt;
    }

    function getPizza($id) {
        $query = "SELECT name, ingredients, calories, price, image_url FROM " . $this->table_name . " WHERE id = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);

        $stmt->execute();
     
        return $stmt;
    }

    function addPizza($data) {
        $data = json_decode($data);

        $query = "INSERT INTO " . $this->table_name . " (name, ingredients, calories, price, image_url) VALUES (?, ?, ?, ?, ?)";
     
        $stmt = $this->conn->prepare($query);
     
        $stmt->bindParam(1, $data->name);
        $stmt->bindParam(2, $data->ingredients);
        $stmt->bindParam(3, $data->calories);
        $stmt->bindParam(4, $data->price);
        $stmt->bindParam(5, $data->image_url);
     
        if ($stmt->execute()) {
            return true;
        }
     
        return false;  
    }

    function changePizza($data) {
        $data = json_decode($data);

        $query = "UPDATE " . $this->table_name . " SET name=?, ingredients=?, calories=?, price=?"; 
        if (array_key_exists("image_url", $data)) {
            $query .= ", image_url=?";
        }
        $query .= " WHERE id = ?";
     
        $stmt = $this->conn->prepare($query);
     
        $stmt->bindParam(1, $data->name);
        $stmt->bindParam(2, $data->ingredients);
        $stmt->bindParam(3, $data->calories);
        $stmt->bindParam(4, $data->price);

        if (array_key_exists("image_url", $data)) {
            $stmt->bindParam(5, $data->image_url);
            $stmt->bindParam(6, $data->id);
        } else {
            $stmt->bindParam(5, $data->id);
        }
        
        if ($stmt->execute()) {
            return true;
        }
     
        return false;  
    }

    function deletePizza($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
     
        $stmt = $this->conn->prepare($query);
     
        $stmt->bindParam(1, $id);
     
        if ($stmt->execute()) {
            return true;
        }
     
        return false;  
    }
}
?>