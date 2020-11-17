<?php
require_once("conexion.php");

$conn = getConnection();

$stm = $conn->query("select * from usuarios where TIPO_USUARIO = 1");

$algo = array();

while ($row= $stm->fetch()) {
	array_unshift($algo, $row['NOMBRE']);	
}

echo json_encode($algo);

closeConnection($conn);

?>