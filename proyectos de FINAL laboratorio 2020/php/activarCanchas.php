<?php

require_once("conexion.php");

$conn = getConnection();

$sql="UPDATE `canchas` SET canchas.ESTADO_CANCHA=1 WHERE canchas.ID_CANCHA=:canchita";

$resultadonombre=$conn->prepare($sql);

$resultadonombre->execute(array(":canchita"=>$_POST["id_cancha"]));

closeConnection($conn);


?>