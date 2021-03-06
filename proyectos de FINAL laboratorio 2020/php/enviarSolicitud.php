<?php
require_once("conexion.php");
session_start();

$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

if(isset($_POST["jugador"])){
	$conn = getConnection();

	$sql="INSERT INTO solicitudes (ID_SOLICITUD,ID_USUARIO,ESTADO_SOLICITUD,ID_TIPO_S) VALUES (NULL,:idusuario,4,1)";
	$resultado=$conn->prepare($sql);
	$resultado->execute(array(":idusuario"=>$_POST["jugador"]));

	$idultimasoli=$conn->lastInsertId();

	$sql2="INSERT INTO grupos_solicitudes (ID_SOLICITUD,ID_GRUPO) VALUES (:idsolicitud,:idgrupo)";
	$resultado2=$conn->prepare($sql2);
	$resultado2->execute(array(":idsolicitud"=>$idultimasoli,"idgrupo"=>$_SESSION["GRUPO_ACTUAL"]));


	closeConnection($conn);
}
else{
	$resultados_de_validacion['error']="No se ha seleccionado ningun jugador";
}


echo json_encode($resultados_de_validacion);

?>