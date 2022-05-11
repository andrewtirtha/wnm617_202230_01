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


function makeUpload($file,$folder) {
   $filename = microtime(true) . "_" . $_FILES[$file]['name'];

   if(@move_uploaded_file(
      $_FILES[$file]['tmp_name'],
      $folder.$filename
   )) return ["result"=>$filename];
      else return [
         "error"=> "File Upload Failed",
         "filename"=>$filename
      ];
}

function makeStatement($data) {
   $c = makeConn();
   $t = $data->type;
   $p = $data->params;

   switch($t) {
      case "users_all":
         return makeQuery($c, "SELECT * FROM `doglog_users`", $p);
      case "animals_all":
         return makeQuery($c, "SELECT * FROM `doglog_animals`", $p);
      case "locations_all":
         return makeQuery($c, "SELECT * FROM `doglog_locations`", $p);

      case "user_by_id":
         //return makeQuery($c, "SELECT * FROM `doglog_users` WHERE `id` = ?", $p);
         return makeQuery($c, "SELECT `id`,`name`,`email`,`img`,`username` FROM `doglog_users` WHERE `id` = ?", $p);
      case "animal_by_id":
         return makeQuery($c, "SELECT * FROM `doglog_animals` WHERE `id` = ?", $p);
      case "location_by_id":
         return makeQuery($c, "SELECT * FROM `doglog_locations` WHERE `id` = ?", $p);

      case "animals_by_user_id":
         return makeQuery($c, "SELECT * FROM `doglog_animals` WHERE `user_id` = ?", $p);
      case "locations_by_animal_id":
         return makeQuery($c, "SELECT * FROM `doglog_locations` WHERE `animal_id` = ?", $p);






      case "recent_animal_locations":
         return makeQuery($c,"SELECT *
            FROM `doglog_animals` a
            JOIN (
               SELECT lg.*
               FROM `doglog_locations` lg
               WHERE lg.id = (
                  SELECT lt.id
                  FROM `doglog_locations` lt
                  WHERE lt.animal_id = lg.animal_id
                  ORDER BY lt.date_create DESC
                  LIMIT 1
               )
            ) l
            ON a.id = l.animal_id
            WHERE a.user_id = ?
            ORDER BY l.animal_id, l.date_create DESC
         ", $p);




      /* INSERT */


      case "insert_user":
         $r = makeQuery($c,"SELECT id FROM `doglog_users` WHERE `username`=? OR `email` = ?", [ $p[0], $p[1] ]);
         if(count($r['result']))
            return ["error"=>"Username or Email already exists"];

         makeQuery($c,"INSERT INTO
            `doglog_users`
            (`username`,`email`,`password`,`img`,`date_create`)
            VALUES
            (?, ?, md5(?), 'https://via.placeholder.com/400/?text=USER', NOW())
            ", $p, false);
         return ["id"=>$c->lastInsertId()];

      case "insert_animal":
         makeQuery($c,"INSERT INTO
            `doglog_animals`
            (`user_id`,`name`,`breed`,`color`,`description`,`img`,`date_create`)
            VALUES
            (?, ?, ?, ?, ?, 'https://via.placeholder.com/400/?text=ANIMAL', NOW())
            ", $p, false);
         return ["id"=>$c->lastInsertId()];

      case "insert_location":
         makeQuery($c,"INSERT INTO
            `doglog_locations`
            (`animal_id`,`lat`,`lng`,`description`,`photo`,`icon`,`date_create`)
            VALUES
            (?, ?, ?, ?, 'https://via.placeholder.com/400/?text=PHOTO', 'https://via.placeholder.com/400/?text=ICON', NOW())
            ", $p, false);
         return ["id"=>$c->lastInsertId()];



      case "search_animals":
         $p = ["%$p[0]%", $p[1]];
         return makeQuery($c,"SELECT *
            FROM `doglog_animals`
            WHERE
               `name` LIKE ? AND
               `user_id` = ?
            ",$p);

         case "filter_animals":
         return makeQuery($c,"SELECT *
            FROM `doglog_animals`
            WHERE
               `$p[0]` = ? AND
               `user_id` = ?
            ",[$p[1],$p[2]]);




      /* UPDATE */

      case "update_user":
         $r = makeQuery($c,"UPDATE
            `doglog_users`
            SET
               `name` = ?,
               `username` = ?,
               `email` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];

      case "update_password":
         $r = makeQuery($c,"UPDATE
            `doglog_users`
            SET
               `password` = md5(?)
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];

      case "update_animal":
         $r = makeQuery($c,"UPDATE
            `doglog_animals`
            SET
               `name` = ?,
               `color` = ?,
               `breed` = ?,
               `description` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];

      case "update_location":
         $r = makeQuery($c,"UPDATE
            `doglog_locations`
            SET
               `description` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];


      /* UPLOAD */

      case "update_user_image":
         makeQuery($c,"UPDATE
            `doglog_users
            SET `img` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];

       case "update_animal_image":
         makeQuery($c,"UPDATE
            `doglog_animals
            SET `img` = ?
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];



      /* DELETE */

      case "delete_animal":
         $r = makeQuery($c,"DELETE FROM
            `doglog_animals`
            WHERE `id` = ?
            ",$p,false);
         if(isset($r['error'])) return $r;
         return ["result"=>"Success"];



      case "check_signin":
         return makeQuery($c, "SELECT id from `doglog_users` WHERE `username` = ? AND `password` = md5(?)", $p);

      default:
         return ["error"=>"No Matched color"];
   }
}



/*
"SELECT * FROM doglog_users",
"SELECT * FROM doglog_users WHERE id = ?",
"SELECT * FROM doglog_animals WHERE user_id = ?",
*/

if(!empty($_FILES)) {
   $r = makeUpload("image","../uploads/");
   die(json_encode($r));
}

$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);