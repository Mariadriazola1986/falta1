<?php

require_once("conexion.php");
$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );


if (isset($_POST["usuario"]) && isset($_POST["email"])) {
	$conn = getConnection();

	$sql="UPDATE usuarios SET usuarios.NOMBRE=:newnombre, usuarios.EMAIL=:newmail WHERE usuarios.ID_USUARIO=:usuario";

	$resultadonombre=$conn->prepare($sql);

	$resultadonombre->execute(array(":newnombre"=>$_POST["usuario"],":newmail"=>$_POST["email"],":usuario"=>$_POST["id"]));

	closeConnection($conn);
}
else{
	$resultados_de_validacion['error']="Error al colocar usuario y email nuevo";
}



echo json_encode($resultados_de_validacion);
?>