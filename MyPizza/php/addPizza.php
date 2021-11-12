<?php
    include_once 'database.php';
    include_once 'pizza.php';

    $database = new Database();
    $db = $database->getConnection();
    
    $pizza = new Pizza($db);

    $name = htmlentities(json_decode($_POST['name']));
    $ingredients = htmlentities(json_decode($_POST['ingredients']));
    $calories = htmlentities(json_decode($_POST['calories']));
    $price = htmlentities(json_decode($_POST['price']));

    $user_data = array("name" => $name, "ingredients" => $ingredients, "calories" => $calories, "price" => $price, "image_url" => $_FILES['file']['name']);

    $path = '../images/';

    $all_files = count($_FILES['file']['tmp_name']);

    $file_name = $_FILES['file']['name'];
    $file_tmp = $_FILES['file']['tmp_name'];

    $file = $path . $file_name;

    if(!move_uploaded_file($file_tmp, $file)) {
        http_response_code(400);
        echo json_encode(array("error_description" => "Моля, добавете снимка!"));
    }

    if ($pizza->addPizza(json_encode($user_data))) {
        http_response_code(201);
        echo json_encode("created");
    } else {
        http_response_code(400);
        echo json_encode(array("error_description" => "Пицата не беше добавена в менюто"));
    }
?>