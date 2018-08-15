<?php 
	# 包含增删改
	include 'db.php';

	$data = file_get_contents("php://input");
	$jsonData = json_decode($data, true)['params'];

	$action = $jsonData['action'];

	$select = mysqli_select_db($conn, 'todo_list');

	if ($action == 'add') {
		// 增加清单
		if (!empty($jsonData['list_name'])) {
			$list_name = $jsonData['list_name'];
			$name = $jsonData['user'];

			$getID = "select user_id from users where user_name = '" . $name . "'";
			$row = mysqli_query($conn, $getID) -> fetch_assoc();
			$user_id = $row['user_id'];

			$sql = "insert into lists (list_name, user_id) values ('" . $list_name . "', '" . $user_id . "')";
			$result = mysqli_query($conn, $sql);
			$id = mysqli_insert_id($conn);

			if ($result) {
				echo json_encode(array('code' => '0', 'message' => '添加清单成功', 'list_id' => $id));
			}
		} else {
			$list_id = $jsonData['list_id'];
			$content = $jsonData['content'];

			$sql = "insert into items (content, list_id, status) values ('" . $content . "', '" . $list_id . "', 0)";
			$result = mysqli_query($conn, $sql);
			$id = mysqli_insert_id($conn);

			if ($result) {
				echo json_encode(array('code' => '0', 'message' => '添加事项成功', 'items_id' => $id));
			}
		}
	} else if ($action == 'del') { // 删除
		if (!empty($jsonData['list_id'])) {
			$list_id = $jsonData['list_id'];

			$deleteList = "delete from lists where list_id='" . $list_id . "'";
			$deleteItem = "delete from items where list_id='" . $list_id . "'";

			$result = mysqli_query($conn, $deleteList);
			$deleteItemResult = mysqli_query($conn, $deleteItem);

			if ($result) {
				echo json_encode(array('code' => '0', 'message' => '删除清单成功'));
			}
		} else {
			$items_id = $jsonData['items_id'];

			$deleteList = "delete from items where items_id='" . $items_id . "'";
			$result = mysqli_query($conn, $deleteList);

			if ($result) {
				echo json_encode(array('code' => '0', 'message' => '删除事项成功'));
			}
		}
	} else if ($action == 'edit') { // 编辑
		if (!empty($jsonData['list_name'])) {
			$list_name = $jsonData['list_name'];
			$list_id = $jsonData['list_id'];


			$updateList = "update lists set list_name='" . $list_name . "' where list_id='" . $list_id . "'";
			$result = mysqli_query($conn, $updateList);

			if ($result) {
				echo json_encode(array('code' => '0', 'message' => '编辑清单成功'));
			}
		} else {
			if (!empty($jsonData['status'])) {
				$status = $jsonData['status'];
				$items_id = $jsonData['items_id'];

				$updateItem = "update items set status='" . $status . "' where items_id='" . $items_id . "'";
				$result = mysqli_query($conn, $updateItem);

				if ($result) {
					echo json_encode(array('code' => '0', 'message' => '修改事项状态'));
				}
			} else {
				$content = $jsonData['content'];
				$items_id = $jsonData['items_id'];

				$updateItem = "update items set content='" . $content . "' where items_id='" . $items_id . "'";
				$result = mysqli_query($conn, $updateItem);

				if ($result) {
					echo json_encode(array('code' => '0', 'message' => '编辑事项成功'));
				}
			}
		}
	}

?>