<?php
require_once("conexion.php");
session_start();

$lista=array();

$conn = getConnection();

$sql="SELECT s.ESTADO_SOLICITUD FROM grupos_solicitudes g, solicitudes s WHERE g.ID_GRUPO=:idgrupoactual AND s.ID_SOLICITUD=g.ID_SOLICITUD and s.ID_USUARIO=:idusuario";

$resultado=$conn->prepare($sql);

$resultado->execute(array(":idgrupoactual"=>$_POST["grupo"],":idusuario"=>$_SESSION["ID_USUARIO"]));

$jugadores=$resultado->fetchAll(PDO::FETCH_ASSOC);

if ($resultado->rowCount()==0) {
	array_push($lista, false);
	echo json_encode($lista);
}
else{
	echo json_encode($jugadores);
}

closeConnection($conn);

?>