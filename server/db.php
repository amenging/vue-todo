<?php
	$dbhost = 'localhost';
	$dbuser = 'root';
	$dbpass = 'root';

	try {
		include 'remote.php';
	} catch (Exception $e) {}

	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	if(!$conn) {
		die('连接错误' . mysqli_error($conn));
	}

?>