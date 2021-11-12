<?php
    include_once 'database.php';
    include_once 'pizza.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $database = new Database();
    $db = $database->getConnection();
    
    $pizza = new Pizza($db);

    if ($pizza->deletePizza($data["id"])) {
        http_response_code(200);
        echo json_encode($pizza_data, JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(array("error_description" => "Пицата не беше изтрита"));
    }
?>