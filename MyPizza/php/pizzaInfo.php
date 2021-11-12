<?php
    include_once 'database.php';
    include_once 'pizza.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $database = new Database();
    $db = $database->getConnection();
    
    $pizza = new Pizza($db);

    $stmt = $pizza->getPizza($data["id"]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $pizza_data = array(
        "name" => $row['name'],
        "ingredients" => $row['ingredients'],
        "calories" => $row['calories'],
        "price" => $row['price'],
        "image_url" => $row['image_url']
    );

    http_response_code(200);
    echo json_encode($pizza_data, JSON_UNESCAPED_UNICODE);
?>