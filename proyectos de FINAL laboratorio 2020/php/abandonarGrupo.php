<?php
require_once("conexion.php");
session_start();

$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );

if (perteneceGrupo()) {
	$conn = getConnection();

	$sql="DELETE FROM grupos_usuarios WHERE ID_GRUPO=:estegrupo AND ID_USUARIO=:esteusuario";

	$resultado=$conn->prepare($sql);

	$resultado->execute(array(":estegrupo"=>$_SESSION["GRUPO_ACTUAL"],":esteusuario"=>$_SESSION["ID_USUARIO"]));

	closeConnection($conn);

}
else{
	$resultados_de_validacion['error']="No pertenece al grupo";
}





function perteneceGrupo(){
	$conn = getConnection();

	$sql= "SELECT * FROM grupos_usuarios WHERE grupos_usuarios.ID_USUARIO=:idusuario AND grupos_usuarios.ID_GRUPO=:grupito";
	$resultados=$conn->prepare($sql);

	$resultados->execute(array(":grupito"=>$_SESSION["GRUPO_ACTUAL"],":idusuario"=>$_SESSION["ID_USUARIO"]));


	if ($resultados->rowCount()>0){
		return true;
	}
	else{
		return false;
	}
}


echo json_encode($resultados_de_validacion);
?>