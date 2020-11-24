<?php
require_once("conexion.php");
session_start();

$libro=array();

$conn = getConnection();

$sql="SELECT grupos.ID_USUARIO_CREADOR FROM grupos WHERE grupos.ID_GRUPO=:elgrupo";

$resultado=$conn->prepare($sql);
$resultado->execute(array(":elgrupo"=>$_POST["grupo"]));

$registros=$resultado->fetchAll(PDO::FETCH_ASSOC);

if ($registros[0]["ID_USUARIO_CREADOR"]==$_SESSION["ID_USUARIO"]) {
	array_push($libro,true);
}
else{
	array_push($libro,false);
}
closeConnection($conn);

echo json_encode($libro);
?>