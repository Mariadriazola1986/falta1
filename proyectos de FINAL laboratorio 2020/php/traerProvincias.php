<?php 
	
	require("conexion.php");

	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );
	$conn=getConnection();
	$sql_listado_provincias="SELECT * FROM provincias ORDER BY provincias.nombre_provincias";
	$resultados=$conn->prepare($sql_listado_provincias);
	$resultados->execute();
	$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
	closeConnection($conn);
	if ($registros) {
		$resultados_de_validacion["datos"]=$registros;
	}
	else{
		$resultados_de_validacion["error"]="No se encontro nigun registro de provincias.";
	}
	echo json_encode($resultados_de_validacion);	
 ?>