<?php
require_once("conexion.php");
$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

if(isset($_POST["funcion"])){

	$conn = getConnection();

	$sql= "SELECT grupos.ID_GRUPO, grupos.NOMBRE, grupos.CANT_MIEMBROS, fotos.RUTA FROM grupos, fotos WHERE grupos.ID_FOTO=fotos.ID_FOTO";
	$resultados=$conn->prepare($sql);

	$resultados->execute();

	$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
	$registros_coincidentes=array();
	foreach ($registros as $lala){
		array_push($registros_coincidentes, $lala);
	}
	$resultados_de_validacion['datos']=$registros_coincidentes;

	closeConnection($conn);
}
else{
	$resultados_de_validacion['error']="La funcion correspondiente no esta definida.";
}

echo json_encode($resultados_de_validacion);
?>