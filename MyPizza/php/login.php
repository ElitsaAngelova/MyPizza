<?php
    include_once 'database.php';
    include_once 'user.php';

    $data = json_decode(file_get_contents('php://input'), true);

    $database = new Database();
    $db = $database->getConnection();
    
    $user = new User($db);

    $stmt = $user->getUser($data["email"]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $user_data = array(
        "id" => $row['id'],
        "password" => $row['password'],
        "role" => $row['role']
    );

    if (password_verify($data["password"], $user_data["password"])) {

        session_start();

        setcookie("userId", $user_data["id"], time() + 24 * 60 * 60, "/");
        setcookie("userRole", $user_data["role"], time() + 24 * 60 * 60, "/");

        unset($user_data["password"]);

        http_response_code(200);
        echo json_encode($user_data);
    } else {
        http_response_code(400);
        echo json_encode(array("error_description" => "Невалидно потребителско име или парола."));
    }
?>