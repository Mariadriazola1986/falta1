<?php
require_once("conexion.php");
session_start();

$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()
                    );


if (isset($_POST["elgrupo"])) {

	if (estaenGrupo()) {

		$_SESSION["GRUPO_ACTUAL"]=$_POST["elgrupo"];
	}
	else{
		$resultados_de_validacion['error']="El jugador no pertenece al grupo";
	}

}
else{
	$resultados_de_validacion['error']="El grupo no existe";
}



function estaenGrupo(){
	
		$conn = getConnection();

		$sql= "SELECT * FROM grupos_usuarios WHERE grupos_usuarios.ID_USUARIO=:idusuario AND grupos_usuarios.ID_GRUPO=:grupito";
		$resultados=$conn->prepare($sql);

		$resultados->execute(array(":grupito"=>$_POST["elgrupo"],":idusuario"=>$_SESSION["ID_USUARIO"]));

		closeConnection($conn);

		if ($resultados->rowCount()>0){
			return true;
		}
		else{
			return false;
		}
}

echo(json_encode($resultados_de_validacion));
?>