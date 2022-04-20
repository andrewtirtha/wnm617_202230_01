<?php

function makeConn() {
	include_once "auth.php";
	try {
		$conn = new PDO(...Auth());
		$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      return $conn;
	} catch(PDOException $e) {
		die('{"error":"'.$e->getMessage().'"}');
	}
}
// $r = PDO result
function fetchAll($r) {
	$a = [];
	while($row = $r->fetch(\PDO::FETCH_OBJ)) $a[] = $row;
	return $a;
}


/*
$c = connection
$ps = prepared statement
$p = parameters
*/
function makeQuery($c,$ps,$p,$makeResults=true) {
	try {
		if(count($p)) {
			$stmt = $c->prepare($ps);
			$stmt->execute($p);
		} else {
			$stmt = $c->query($ps);
		}

		$r = $makeResults ? fetchAll($stmt) : [];

		return [
			// "statement"=>$ps,
			// "params"=>$p,
			"result"=>$r
		];
	} catch(PDOException $e) {
		return ["error"=>"Query Failed: ".$e->getMessage()];

	}
}

function makeStatement($data) {
	$c = makeConn ();
	$t = $data->type;
	$p = $data->params;

	switch($t) {
		case "users_all":
			return makeQuery($c, "SELECT * FROM `golflog_users`", $p);
		case "courses_all":
			return makeQuery($c, "SELECT * FROM `golflog_courses`", $p);
		case "rounds_all":
			return makeQuery($c, "SELECT * FROM `golflog_rounds`", $p);


		case "user_by_id":
			return makeQuery($c, "SELECT  * FROM `golflog_users` WHERE `id` = ?", $p);
		case "course_by_id":
			return makeQuery($c, "SELECT * FROM `golflog_courses` WHERE `id` = ?", $p);
		case "round_by_id":
			return makeQuery($c, "SELECT * FROM `golflog_rounds` WHERE `id` = ?", $p);


		case "courses_by_user_id":
			return makeQuery($c, "SELECT * FROM `golflog_courses` WHERE `user_id` = ?", $p);
		case "rounds_by_course_id":
			return makeQuery($c, "SELECT * FROM `golflog_rounds` WHERE `course_id` = ?", $p);




		case "check_signin":
			return makeQuery($c, "SELECT id from `golflog_users` WHERE `username` = ? AND `password` = md5(?)", $p);
		default:
			return ["error"=>"No Matched Type"];
	}
}


/*
"SELECT * FROM golflog_users",
"SELECT * FROM golflog_courses WHERE id = ?",
"SELECT * FROM golflog_rounds WHERE id = ?",
*/

$data = json_decode(file_get_contents("php://input"));



echo json_encode(
makeStatement($data),
JSON_NUMERIC_CHECK
);



