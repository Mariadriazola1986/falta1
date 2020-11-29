<?php

require_once("conexion.php");

$conn = getConnection();

$sql="UPDATE usuarios SET usuarios.ESTADO_USUARIO=1 WHERE usuarios.ID_USUARIO=:usuarioalta";

$resultadonombre=$conn->prepare($sql);

$resultadonombre->execute(array(":usuarioalta"=>$_POST["id_usuario"]));

closeConnection($conn);


?>