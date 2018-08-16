<?php 
	$myfile = fopen('newfile.json', 'w') or die('go die');

	$data = file_get_contents('php://input');
	$jsonData = json_decode($data, true)['params'];

	// print_r($jsonData);

	fwrite($myfile, $jsonData['data']);
	fclose($myfile);

	echo json_encode(array('code' => '0', 'message' => '保存文件成功'));
?>