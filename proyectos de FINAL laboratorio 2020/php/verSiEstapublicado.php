<?php
	session_start();
	require("conexion.php");
	$resultados_de_validacion = array( 'error' => 'NO',
                        'datos' => array()   
                    );

	if(isset($_POST["idpartido"]))
	{

		$conn = getConnection();
		$sql="SELECT * FROM publicaciones WHERE publicaciones.ID_PARTIDO=:idpartido";
		$resultados=$conn->prepare($sql);
		$resultados->execute(array(":idpartido" => $_POST["idpartido"]));
		$registros=$resultados->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($conn);
		if ($registros) {
			$resultados_de_validacion['error']="NO";
			$resultados_de_validacion['datos']="publicado";
		}
		else{
			$resultados_de_validacion['error']="NO";
			$resultados_de_validacion['datos']="nopublicado";
		}
	}
	else{
		$resultados_de_validacion['error']="El id del partido no esta definido.";
	}
	echo json_encode($resultados_de_validacion);


 ?>