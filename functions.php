<?php

// Дополнительные поля профиля пользователя
function show_profile_fields($user) { ?>
    <textarea style="display: block; width: 100%; height: 30px; margin-bottom: 15px;" id="json" name="json"><?php echo get_the_author_meta('json',$user->ID ); ?></textarea>
    <textarea style="display: block; width: 100%; height: 30px;" id="token" name="token"><?php echo get_the_author_meta('token',$user->ID ); ?></textarea>
<?php }
function save_profile_fields($user_id) {
    update_user_meta($user_id, 'token', $_POST['token']);
    update_user_meta($user_id, 'json', $_POST['json']);
}
add_action('show_user_profile', 'show_profile_fields');
add_action('edit_user_profile', 'show_profile_fields');


// Энд-поинты приложения
add_action('rest_api_init', function() {

    // Маршрут регистрации
    register_rest_route('api/', 'registation/', [
        'methods' => 'POST',
        'callback' => 'registration',
        'args' => array(
            'login' => array(
                'default' => $login,
                'required' => true
            ),
            'password' => array(
                'default' => $pass,
                'required' => true
            ),
        ),
    ]);

    // Маршрут авторизации
    register_rest_route('api/', 'auth/', [
        'methods' => 'GET',
        'callback' => 'auth',
        'args' => array(
            'login' => array(
                'default' => $login,
                'required' => true
            ),
            'password' => array(
                'default' => $pass,
                'required' => true
            ),
        ),
    ]);

    // Маршрут получения данных
    register_rest_route('api/', 'getdata/', [
        'methods' => 'POST',
        'callback' => 'getdata',
        'args' => array(
            'token' => array(
                'default' => $token,
                'required' => true
            ),
        ),
    ]);

    // Маршрут получения данных
    register_rest_route('api/', 'savedata/', [
        'methods' => 'POST',
        'callback' => 'saveData',
        'args' => array(
            'token' => array(
                'default' => $token,
                'required' => true
            ),
            'data' => array(
                'default' => $data,
                'required' => true
            ),
        ),
    ]);

});


// Функция генерации токена
function createToken($text) {
    return hash('md5', $text);
}


// Функция регистрации пользователя
function registration($request) {
    $login = $request['login'];
    $pass = $request['pass'];

    $user_id = wp_create_user($login, $pass, $login);

    if (is_wp_error($user_id)) {
        $reason = $user_id->get_error_message();
        $response = array(
            "state" => 'error',
            "response" => 'Произошла ошибка и ничего не получилось :(',
            'reason' => $reason
        );
    }
    else {
        $newuser = get_user_by('email', $login);
        $newuser_ID = $newuser->ID;
        $token = createToken($login);
        update_user_meta($newuser_ID, 'token', $token);

        $response = array(
            "state" => 'ok',
            "token" => base64_encode(json_encode(array(
                "id" => $newuser_ID,
                "token" => base64_encode(json_encode(array(
                    "id" => $newuser_ID,
                    "token" => $token
                )))
            )))
        );
    }

    return $response;
}


// Функция авторизации пользователя
function auth($request) {

    // Вытаскиваем в отдельные переменные ключи из запроса
    $login = $request['login'];
    $password = $request['password'];

    // Проверяем пользователя
    $auth = wp_authenticate($login, $password);

    // Если ошибки нет
    if (!is_wp_error($auth)) {

        // Получаем id пользователя по email
        $user = get_user_by('email', $login);
        $user_ID = $user->data->ID;
        $token = createToken($login);
        update_user_meta($user_ID, 'token', $token);

        // Формируем объект ответа
        $response = array(
            "state" => 'ok',
            "token" => base64_encode(json_encode(array(
                "id" => $user_ID,
                "token" => $token
            )))
        );
    
    // В случае ошибки
    } else {
        $response = array(
            "state" => 'error',
            "response" => 'Неправильный логин / пароль'
        );
    }
    
    // Возвращаем объект ответа
    return $response;
}


function getdata($request) {
    $requestData = json_decode(base64_decode($request['token']));
    $id = $requestData->id;
    $token = $requestData->token;
    $verifyToken = get_user_meta($id, 'token', true);

    if($verifyToken === $token) {       
        $response = json_decode(get_user_meta($id, 'json', true));
    } else {
        $response = array(
            "state" => 'error',
            "reason" => 'wrong token'
        );
    }

    return $response;
}


function saveData($request) {
    $data = $request['data'];
    $authData = json_decode(base64_decode($request['token']));
    $id = $authData->id;
    $token = $authData->token;
    $verifyToken = get_user_meta($id, 'token', true);

    if($verifyToken === $token) {
        update_user_meta($id, 'json', $data);
        
        $response = array(
            "state" => 'successful'
        );
    } else {
        $response = array(
            "state" => 'error',
            "reason" => 'wrong token'
        );
    }

    return $response;
}