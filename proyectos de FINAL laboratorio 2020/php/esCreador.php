<?php
require_once("conexion.php");
session_start();

$libro=array();

$conn = getConnection();

$sql="SELECT grupos.ID_USUARIO_CREADOR FROM grupos WHERE grupos.ID_GRUPO=:elgrupo";

$resultado=$conn->prepare($sql);
$resultado->execute(":elgrupo"=>$_SESSION["GRUPO_ACTUAL"])

if ($resultado==$_SESSION["ID_USUARIO"]) {
	array_push($libro,true);
}
else{
	array_push($libro,false);
}
closeConnection($conn);
echo ($libro);
?>