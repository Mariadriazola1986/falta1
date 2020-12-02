<?php

require_once("conexion.php");

$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

if (isset($_POST["id_usuario"])) {
	$conn = getConnection();

	$sql="UPDATE usuarios SET usuarios.ESTADO_USUARIO=1 WHERE usuarios.ID_USUARIO=:usuarioalta";

	$resultadonombre=$conn->prepare($sql);

	$resultadonombre->execute(array(":usuarioalta"=>$_POST["id_usuario"]));

	closeConnection($conn);

}
else{
	$resultados_de_validacion['error']="Usuario invalido";
}
echo json_encode($resultados_de_validacion);

?>