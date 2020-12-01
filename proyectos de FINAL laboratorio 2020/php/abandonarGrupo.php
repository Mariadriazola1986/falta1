<?php
require_once("conexion.php");
session_start();

$conn = getConnection();

$sql="DELETE FROM grupos_usuarios WHERE ID_GRUPO=:estegrupo AND ID_USUARIO=:esteusuario";

$resultado=$conn->prepare($sql);

$resultado->execute(array(":estegrupo"=>$_SESSION["GRUPO_ACTUAL"],":esteusuario"=>$_SESSION["ID_USUARIO"]));


closeConnection($conn);


?>