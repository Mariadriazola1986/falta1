<?php 
require_once("conexion.php");

if(isset($_GET["link"])){
	$conn = getConnection();
	$code=$_GET['link'];
	$verificar_codigo="select *from usuarios where COD_ACTIVACION=:codigo_recibido";
	$comprobar=$conn->prepare($verificar_codigo);
	$comprobar->execute(array(":codigo_recibido"=>$code));
	$resultado=$comprobar->fetchAll();
	if($resultado){
	$sqlactivar="update usuarios set ESTADO_USUARIO=:estado where COD_ACTIVACION =:codigo";
	$activar=$conn->prepare($sqlactivar);
	$activo=1;
	$activar->execute(array('estado' => $activo,':codigo'=>$code));
	$sqlborrar="UPDATE usuarios SET COD_ACTIVACION = NULL WHERE COD_ACTIVACION =:codigoB";
	$activar=$conn->prepare($sqlborrar);
	$activar->execute(array(':codigoB'=>$code));
	closeConnection($conn);
	header("location:../cuentaActivada.html");


}

}

	

 ?>