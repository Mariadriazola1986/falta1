<?php
require_once("conexion.php");
require_once("../php/verificarSesion.php");
$ruta = '../imagenes/';
$sepuedeCargarDatos=array();
$imagenesCargadasalservidor=array();


if ($_FILES["archivo0"]["size"]<4000000) {
	if ($_FILES["archivo0"]["type"]=="image/jpeg"||$_FILES["archivo0"]["type"]=="image/jpg"||$_FILES["archivo0"]["type"]=="image/png") {

		$NombreOriginal = $_FILES["archivo0"]['name'];

		$temporal = $_FILES["archivo0"]['tmp_name'];

		$Destino = $ruta.$NombreOriginal;

		move_uploaded_file($temporal, $Destino);
		array_push($imagenesCargadasalservidor,$NombreOriginal);
		array_push($sepuedeCargarDatos,true);
	}
	else{
		array_push($sepuedeCargarDatos,false);
	}
}
else{
	array_push($sepuedeCargarDatos,false);
}



if (estaTodoOk($sepuedeCargarDatos)) {
	$conn = getConnection();

	$sqlimagenes="INSERT INTO fotos (ID_FOTO,RUTA) VALUES (NULL,:ruta)";
    $resultadoimagenes=$conn->prepare($sqlimagenes);
    $resultadoimagenes->execute(array(":ruta"=>$_FILES["archivo0"]['name']));

    $idultimo=$conn->lastInsertId();

	$sql="INSERT INTO grupos (ID_GRUPO,ID_USUARIO_CREADOR,NOMBRE,ID_FOTO,CANT_MIEMBROS) VALUES (NULL,:idusuariocreador,:nombre,:idfoto, 1)";
    $resultado=$conn->prepare($sql);
    $resultado->execute(array(":idusuariocreador"=>$_SESSION["ID_USUARIO"],":nombre"=>$_POST["nombre"],":idfoto"=>$idultimo));

    closeConnection($conn);
}


function estaTodoOk($unArray){
	$resultado=true;
	foreach ($unArray as $value) {
		if ($value==false) {
			$resultado=false;
		}
	}
	return $resultado;

}

?>