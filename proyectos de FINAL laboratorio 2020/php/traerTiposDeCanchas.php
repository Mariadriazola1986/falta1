<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["funcion"]))
	{
		$conn = getConnection();
		$sql_canchas="SELECT * FROM tipos_cancha";
		$resultados=$conn->prepare($sql_canchas);
		$resultados->execute();
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);
		if ($registros) {
			$resultados_de_validacion['datos']=$registros;
		}
		else{
			$resultados_de_validacion['error']="No se encontraron los tipos de canchas.";
		}

	}
	else{
		$resultados_de_validacion['error']="La funcion correspondiente no esta definida.";
	}
	echo json_encode($resultados_de_validacion);

 ?>