<?php
    include_once 'database.php';
    include_once 'pizza.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $database = new Database();
    $db = $database->getConnection();
    
    $pizza = new Pizza($db);

    $stmt = $pizza->getPizzas();
    $rows = $stmt->rowCount();

    if ($rows > 0) {
        $pizzas = array();
    
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $current_pizza = array(
                "id" => $row['id'],
                "name" => $row['name'],
               "ingredients" => $row['ingredients'],
                "image_url" => $row['image_url']
            );

            array_push($pizzas, $current_pizza);
        }

        http_response_code(200);
        echo json_encode($pizzas, JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(["error_description" => "Няма намерени пици!"], JSON_UNESCAPED_UNICODE);
    }
?>