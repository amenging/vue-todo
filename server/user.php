<?php 
	# 用户登录和注册
	include 'db.php';

	$data = file_get_contents("php://input");
	$jsonData = json_decode($data, true)['params'];

	$name = $jsonData['name'];
	$pass = $jsonData['pass'];
	$action = $jsonData['action'];

	if (!empty($name) && !empty($pass)) {
		$select = mysqli_select_db($conn, 'webuser');

		$findName = "select * from users where user_name='" . $name ."'";
		$nameResult = mysqli_query($conn, $findName) -> fetch_assoc();

		if ($action == 'reg') {
			if ($nameResult['user_name']) {
				echo json_encode(array('code' => '3', 'message' => '用户名已存在'));
			} else {
				$reg = "insert into users (user_name, user_pass) values ('" . $name . "','" . $pass . "')";
				$regReault = mysqli_query($conn, $reg);

				if ($regReault) {
					echo json_encode(array('code' => '0', 'message' => '注册成功'));
				}
			}
		} else if ($action == 'login') {

			if ($nameResult['user_name']) {
				$login = "select * from users where user_name='" . $name ."' and user_pass='" . $pass . "'";
				$row = mysqli_query($conn, $login) -> fetch_assoc();

				if ($row['user_name']) {
					echo json_encode(array('code' => '0', 'message' => '登录成功'));

					setcookie("username", $name);
				} else {
					echo json_encode(array('code' => '2', 'message' => '密码错误'));
				}

			} else {
				echo json_encode(array('code' => '1', 'message' => '用户名不存在'));
			}


		}
	}
?>