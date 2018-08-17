<?php
	$dbhost = 'localhost';
	$dbuser = 'root';
	$dbpass = 'root';

	if (file_exists('remote.php')) {
		include 'remote.php';
	}

	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	if(!$conn) {
		die('连接错误' . mysqli_error($conn));
	}

?>