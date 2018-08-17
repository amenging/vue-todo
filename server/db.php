<?php
	$dbhost = 'localhost';
	$dbuser = 'root';
	$dbpass = 'root';

	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	if(!$conn) {
		die('连接错误' . mysqli_error($conn));
	}

?>