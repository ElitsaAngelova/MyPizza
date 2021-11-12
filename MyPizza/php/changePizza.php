<?php
    include_once 'database.php';
    include_once 'pizza.php';

    $database = new Database();
    $db = $database->getConnection();
    
    $pizza = new Pizza($db);

    $id = htmlentities(json_decode($_POST['id']));
    $name = htmlentities(json_decode($_POST['name']));
    $ingredients = htmlentities(json_decode($_POST['ingredients']));
    $calories = htmlentities(json_decode($_POST['calories']));
    $price = htmlentities(json_decode($_POST['price']));

    $user_data = array("id" => $id, "name" => $name, "ingredients" => $ingredients, "calories" => $calories, "price" => $price);

    if (sizeof($_FILES) != 0) {
        $user_data["image_url"] = $_FILES['image']['name'];

        $path = '../images/';

        $all_files = count($_FILES['image']['tmp_name']);

        $file_name = $_FILES['image']['name'];
        $file_tmp = $_FILES['image']['tmp_name'];

        $file = $path . $file_name;

        move_uploaded_file($file_tmp, $file);
    }

    if ($pizza->changePizza(json_encode($user_data))) {
        http_response_code(200);
        echo json_encode("changed");
    } else {
        http_response_code(400);
        echo json_encode(array("error_description" => "Пицата не беше променена"));
    }
?>