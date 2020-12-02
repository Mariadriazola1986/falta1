<?php
require_once("conexion.php");
session_start();

$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

if (isset($_POST["grupoEntrar"])) {
	$conn = getConnection();

	$sql="INSERT INTO solicitudes (ID_SOLICITUD,ID_USUARIO,ESTADO_SOLICITUD,ID_TIPO_S) VALUES (NULL,:idusuario,4,2)";
	$resultado=$conn->prepare($sql);
	$resultado->execute(array(":idusuario"=>$_SESSION["ID_USUARIO"]));

	$idultimasoli=$conn->lastInsertId();

	$sql2="INSERT INTO grupos_solicitudes (ID_SOLICITUD,ID_GRUPO) VALUES (:idsolicitud,:idgrupo)";
	$resultado2=$conn->prepare($sql2);
	$resultado2->execute(array(":idsolicitud"=>$idultimasoli,"idgrupo"=>$_POST["grupoEntrar"]));


	closeConnection($conn);	

}
else{
	$resultados_de_validacion['error']="No se selecciono un grupo al que entrar";
}

echo json_encode($resultados_de_validacion);

?>