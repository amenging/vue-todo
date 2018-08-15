<?php 
	# 获取用户对应数据
	include 'db.php';

	$name = $_GET["name"];

	if (!empty($name)) {
		$select = mysqli_select_db($conn, 'todo_list');

		$getID = "select user_id from users where user_name = '" . $name . "'";
		$row = mysqli_query($conn, $getID) -> fetch_assoc();
		$id = $row['user_id'];

		$getList = "select * from lists where user_id = '" . $id . "'";
		$list = mysqli_query($conn, $getList);

		// print_r(count($list));

		while ($row = $list -> fetch_assoc()) {
			$arr1[] = $row;
		}

		$items = array();
		
		for ($i = 0; $i < count($arr1); $i ++) {
			$getItem = "select * from items where list_id = '" . $arr1[$i]['list_id'] . "'";
			$item = mysqli_query($conn, $getItem);

			while ($row = $item -> fetch_assoc()) {
				$items[] = $row;
			}
		}

		$result = array('lists' => $arr1, 'items' => $items);
		echo json_encode($result);
		
	}
?>