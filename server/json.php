<?php
	$data = file_get_contents("php://input");
	$jsonData = json_decode($data, true)['params'];

	$action = $jsonData['action'];

	// 删除生成的文件
	if ($action == 'del') {
		$name = $jsonData['name'];
		if (!unlink($name)) {
	  	echo ("Error deleting $name");
	  } else {
	  	echo ("Deleted $name");
	  }
		echo $name;
	} else { // 生成文件返回链接
		$name = rand();
		$myfile = fopen($name, 'w') or die('go die');

		$data = file_get_contents('php://input');
		$jsonData = json_decode($data, true)['params'];


		fwrite($myfile, $jsonData['data']);
		fclose($myfile);

		echo json_encode(array('code' => '0', 'message' => '保存文件成功', 'filename' => $name));
	}
?>