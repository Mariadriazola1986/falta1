<?php

require_once("conexion.php");

$conn = getConnection();

$sql="UPDATE usuarios SET usuarios.ESTADO_USUARIO=2 WHERE usuarios.ID_USUARIO=:usuariobaja";

$resultadonombre=$conn->prepare($sql);

$resultadonombre->execute(array(":usuariobaja"=>$_POST["id_usuario"]));

closeConnection($conn);


?>