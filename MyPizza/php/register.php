<?php
    include_once 'database.php';
    include_once 'user.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $database = new Database();
    $db = $database->getConnection();
    
    $user = new User($db);

    $first_name = htmlentities($data['firstName']);
    $last_name = htmlentities($data['lastName']);
    $email = htmlentities($data['email']);
    $password = htmlentities($data['password']);
    $confirm_password = htmlentities($data['confirmPassword']);

    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $user_data = array("email" => $email, "first_name" => $first_name, "last_name" => $last_name, "password" => $password_hash);

    if ($user->register(json_encode($user_data))) {
        http_response_code(201);
        echo json_encode("created");
    } else {
        http_response_code(400);
        echo json_encode(array("error_description" => "Вече има регистриран потребител с този имейл!"));
    }
    
    function is_valid_email($email) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
          return true;
        }

        return false;
    }
?>