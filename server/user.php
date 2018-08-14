<?php 
	# 用户登录和注册
	include 'db.php';

	$name = $_POST['name'];
	$pass = $_POST['pass'];
	$action = $_POSt['action'];

	if (!empty($name) && !empty($pass)) {
		if ($action == 'reg') {

		}
	}
?>