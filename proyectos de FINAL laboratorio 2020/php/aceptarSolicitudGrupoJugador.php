<?php
require_once("conexion.php");

$conn = getConnection();

if ($_POST["tipo"]=="Acepto") {
	$sql="UPDATE solicitudes, grupos_solicitudes SET solicitudes.ESTADO_SOLICITUD=1 where grupos_solicitudes.ID_GRUPO=:idgrupo AND solicitudes.ID_SOLICITUD=grupos_solicitudes.ID_SOLICITUD AND solicitudes.ID_USUARIO=:usuario";
	$resultado=$conn->prepare($sql);
	$resultado->execute(array(":idgrupo"=>$_POST["acagrupo"],":usuario"=>$_POST["acajugador"]));


	$sqlgrupousuario="INSERT INTO grupos_usuarios (ID_GRUPO, ID_USUARIO) VALUES (:idgrupo2,:idusuario2)";
	$resultadogrupo=$conn->prepare($sqlgrupousuario);
	$resultadogrupo->execute(array(":idgrupo2"=>$_POST["acagrupo"],"idusuario2"=>$_POST["acajugador"]));

	$sqlcantidad="UPDATE grupos SET CANT_MIEMBROS=CANT_MIEMBROS +1 WHERE ID_GRUPO=:cantgrupo";
	$resultadocantidad=$conn->prepare($sqlcantidad);
	$resultadocantidad->execute(array(":cantgrupo"=>$_POST["acagrupo"]));

	closeConnection($conn);
}
else if ($_POST["tipo"]=="Rechazo") {
	
	$sql2="UPDATE solicitudes, grupos_solicitudes SET solicitudes.ESTADO_SOLICITUD=2 where grupos_solicitudes.ID_GRUPO=:idgrupo AND solicitudes.ID_SOLICITUD=grupos_solicitudes.ID_SOLICITUD AND solicitudes.ID_USUARIO=:usuario";
	$resultado2=$conn->prepare($sql2);
	$resultado2->execute(array(":idgrupo"=>$_POST["acagrupo"],":usuario"=>$_POST["acajugador"]));

	closeConnection($conn);
}


?>