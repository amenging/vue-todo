<?php 
	$action = $_GET['action'];

	if ($action == 'logout') {
		setcookie("username", "", time() - 1);
	} else if ($action == 'login') {
		setcookie("username", $_GET['username']);
	} else if ($action == 'relogin') {
		if (!empty($_COOKIE["username"])) {
			echo json_encode(array("name" => $_COOKIE["username"]));
		}
	}
?>